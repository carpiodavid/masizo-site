/**
 * POST /api/lead — Cloudflare Pages Function. The loss-proof lead pattern
 * (handoff §5, "lead machine"):
 *
 *   1. Validate fields.
 *   2. Write the lead to KV FIRST — a lead can never be lost to a mail outage.
 *   3. THEN attempt the Resend email notification.
 *   4. Return success whenever the KV write succeeded, even if email failed
 *      (failed sends are recoverable from KV; the record notes emailSent).
 *
 * Field contract (what the form must POST — JSON or form-encoded):
 *   name     string, required
 *   phone    string, required (>= 7 digits)
 *   city     string, optional
 *   service  string, optional
 *   message  string, optional
 *   company  HONEYPOT — must be empty. A hidden input the form renders
 *            off-screen; bots fill it. Non-empty => fake success, no store.
 *
 * FORM BUILDER NOTE — SMS-CONSENT DISCLOSURE (handoff §2/§5): Masizo runs an
 * SMS program (opt-out STOP, 18+, disclosed in their terms). The lead form UI
 * MUST display the same disclosure pattern next to the submit button, e.g.
 * consent language that submitting may result in a call/text to the number
 * provided, msg/data rates may apply, reply STOP to opt out, must be 18+,
 * with a link to /terms-and-conditions and /privacy-policy. Final wording is
 * the content agent's (rewritten fresh, matching their current terms'
 * pattern — never copied).
 *
 * Environment (wrangler.toml / Pages dashboard):
 *   LEADS            KV namespace binding (id placeholder in wrangler.toml)
 *   LEAD_EMAIL_TO    var — owner inbox
 *   LEAD_EMAIL_FROM  var — verified Resend sender (placeholder, [VERIFY])
 *   RESEND_API_KEY   SECRET — dashboard-set only, never committed
 */

// Minimal structural types so this file needs no @cloudflare/workers-types
// dependency (Pages compiles functions/ independently of the Astro build).
interface KVNamespace {
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  LEADS: KVNamespace;
  LEAD_EMAIL_TO: string;
  LEAD_EMAIL_FROM: string;
  RESEND_API_KEY?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

interface LeadFields {
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
  company: string; // honeypot
}

const MAX_FIELD_LENGTH = 2000;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

async function parseBody(request: Request): Promise<LeadFields> {
  const contentType = request.headers.get("content-type") ?? "";
  let raw: Record<string, unknown> = {};
  if (contentType.includes("application/json")) {
    raw = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  } else {
    const form = await request.formData().catch(() => null);
    if (form) raw = Object.fromEntries(form.entries());
  }
  return {
    name: clean(raw.name),
    phone: clean(raw.phone),
    city: clean(raw.city),
    service: clean(raw.service),
    message: clean(raw.message),
    company: clean(raw.company),
  };
}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;
  const lead = await parseBody(request);

  // Honeypot: pretend success so bots learn nothing; store nothing.
  if (lead.company !== "") {
    return json({ ok: true }, 200);
  }

  // Validation.
  const errors: string[] = [];
  if (!lead.name) errors.push("name is required");
  const phoneDigits = lead.phone.replace(/\D/g, "");
  if (phoneDigits.length < 7) errors.push("a valid phone number is required");
  if (errors.length > 0) {
    return json({ ok: false, errors }, 400);
  }

  const receivedAt = new Date().toISOString();
  const record = {
    receivedAt,
    name: lead.name,
    phone: lead.phone,
    city: lead.city,
    service: lead.service,
    message: lead.message,
    userAgent: request.headers.get("user-agent") ?? "",
    emailSent: false,
  };

  // 1) KV FIRST — key sorts chronologically: ISO timestamp + random suffix.
  const key = `${receivedAt}_${crypto.randomUUID()}`;
  try {
    await env.LEADS.put(key, JSON.stringify(record));
  } catch {
    // KV down AND we have a lead in hand: this is the one true failure case.
    return json({ ok: false, errors: ["temporary error, please call instead"] }, 500);
  }

  // 2) THEN email via Resend — best effort; never fails the request.
  let emailSent = false;
  if (env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: env.LEAD_EMAIL_FROM,
          to: [env.LEAD_EMAIL_TO],
          subject: `New website lead: ${lead.name}${lead.service ? ` — ${lead.service}` : ""}`,
          text: [
            `Name: ${lead.name}`,
            `Phone: ${lead.phone}`,
            `City: ${lead.city || "—"}`,
            `Service: ${lead.service || "—"}`,
            `Message: ${lead.message || "—"}`,
            ``,
            `Received: ${receivedAt}`,
            `KV key: ${key}`,
          ].join("\n"),
        }),
      });
      emailSent = response.ok;
    } catch {
      emailSent = false;
    }
    if (emailSent) {
      // Best-effort flag update so unsent notifications are findable in KV.
      try {
        await env.LEADS.put(key, JSON.stringify({ ...record, emailSent: true }));
      } catch {
        /* the lead itself is already safe */
      }
    }
  }

  // 3) KV write succeeded => the lead is safe => success, regardless of email.
  return json({ ok: true, emailSent }, 200);
};

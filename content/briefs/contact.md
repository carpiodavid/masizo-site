# Content brief — `/contact`

Recon of https://www.masizodevelopment.com/contact — fetched 2026-10-23. Companion to docs/REBUILD-HANDOFF.md (§2 factbase; rule 4: zero copied sentences). Live title for reference only: "Contact Masizo Development | Free Estimate in Gilbert, AZ".

## Page job & search intent
- Intent: navigational + transactional — "masizo development contact/phone", "free estimate Gilbert contractor".
- Job: lowest-friction conversion: call, or short form → lead API (handoff §5 lead machine: KV-first, then Resend email, thank-you page event).

## Live page anatomy
1. H1 ("Get in Touch") + one-liner (tell us the project; we reach out on scope/timeline/next steps).
2. Trust line: "Licensed, insured and BBB Accredited." + email address + phone (both tappable).
3. Lead form: Full Name / Email / Phone / Services select (8 services + "Something else") / Message + **SMS consent disclosure**: providing a phone number = agreeing to receive texts from Masizo Development LLC about project updates/scheduling; message+data rates; frequency varies; HELP/STOP keywords; links to privacy + terms.
4. Google Map embed of the GBP listing exists on this page (GBP cid 1086874099717890420 — factbase).
5. Sitewide footer (incl. Gilbert AZ, 24/7 hours).

## Topic checklist
- [ ] Phone (602) 909-7630 tap-to-call, prominent; email office@masizodevelopment.com
- [ ] 24/7 availability statement + distinct emergency-restoration path (handoff §5; 24/7 phone answering [VERIFY] — gate in §7)
- [ ] Short form: name, phone, city, service, message (handoff's field list — note live form has email but NOT city; ours adds city, keeps email optional or present)
- [ ] Service dropdown incl. all 9 services (add Commercial) + "Something else"
- [ ] SMS consent disclosure preserving the live pattern's elements: consent scope (project updates/scheduling), rates, frequency, HELP/STOP, privacy+terms links — required by carriers/A2P and by handoff §2/§5
- [ ] What-happens-next expectation (they reach out to discuss scope/timeline) — keep, fresh words
- [ ] Free estimate framing; no-obligation
- [ ] Trust block: licensed/insured/BBB A+ (+ license numbers in text)
- [ ] Map/GBP presence (embed or link to Maps cid)
- [ ] Service-area mention + link
- [ ] NEW: form posts to `/api/lead` → thank-you page (conversion event); honeypot/spam control; graceful failure keeps phone visible

## FAQ inventory
None live; not needed (homepage FAQ covers estimates/areas).

## Facts cited on live page
- Phone, email, hours, licenses, BBB — factbase.
- SMS program terms — factbase (§2) + terms page.
- No [VERIFY] items beyond the 24/7 answering gate.

## Word count target
Live unique ≈ 110 words (380 with chrome). Target: **≥ 300 words** (intro, what-happens-next, emergency path, trust block) — still a conversion page, not an essay.

## Internal links
- Parity: privacy policy + terms (from the disclosure), sitewide header/footer.
- New: breadcrumb Home › Contact; /services/restoration from the emergency callout; /service-areas.

## Schema today
WebSite + GeneralContractor (full NAP graph). Replicate; optionally ContactPage type.

## Writer notes
- Mobile is the page's real life: sticky call bar, tel: link above the fold, form second.
- The thank-you page (new URL, noindex) needs 2 sentences + "emergency? call now" fallback — write it alongside this page.

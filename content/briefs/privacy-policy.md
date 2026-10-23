# Content brief — `/privacy-policy`

Recon of https://www.masizodevelopment.com/privacy-policy — fetched 2026-10-23. Companion to docs/REBUILD-HANDOFF.md. Live title for reference only: "Privacy Policy | Masizo Development". Legal-template page: rewrite fresh (rule 4 still applies), and UPDATE for the new site's actual data practices.

## Page job
Legal/compliance + A2P SMS program requirement (carriers verify the privacy policy URL and its SMS language). Low search value; high operational value.

## Live page anatomy / clause inventory (cover every clause, fresh drafting)
1. Scope statement: Masizo Development LLC; applies to website + phone/text interactions.
2. Information collected: personal identifiers (name, email, phone); project details from forms/calls; usage data (connection, device, usage).
3. Cookies/tracking: cookies + similar tech across time/sites; browser opt-out note. (NOTE: live site has ZERO actual tracking; the new site adds GA4 + optional ad pixels — the new policy MUST disclose them per handoff §5 tracking spec.)
4. Uses: provide/manage construction-remodeling-restoration services; project updates, consultations, scheduling, invoicing; inquiries/support/feedback; legal compliance.
5. SMS compliance block (duplicated twice on the live page — sloppy; once for us): consent via phone-number submission; informational/transactional messages; STOP opt-out; HELP support + email; rates; frequency varies by project status; carriers not liable for delays.
6. Disclosure: no sale/rent/trade of personal info; **SMS-specific**: no mobile info shared with third parties/affiliates for marketing; opt-in data and consent never shared (this exact commitment is an A2P registration requirement — keep its substance).
7. Security & retention: reasonable measures; retain only as long as needed.
8. User rights: access/update, deletion, consent withdrawal; contact to exercise.
9. Updates: posted with revision date.
10. Contact: email, contact page URL, phone, and mailing address — live page lists **3317 S Higley Rd Ste 114-500, Gilbert, AZ 85297** ([VERIFY] — differs from the 4174 E Sandy Way address in directory listings per handoff §2; the site must state ONE canonical address).

## Topic checklist (new-site additions beyond parity)
- [ ] GA4 analytics disclosure (+ Google Ads / Meta pixel slots, "when active") — handoff §5 requires disclosure
- [ ] Lead-form data flow: stored in Cloudflare KV + emailed via Resend (name processors honestly in plain words)
- [ ] Cloudflare hosting mention if counsel-style completeness is wanted
- [ ] Revision date shown
- [ ] Keep all SMS/A2P commitments (consent scope, STOP/HELP, rates/frequency, no-sharing of opt-in data)

## Facts cited on live page
- Entity: Masizo Development LLC — factbase. (Live page's final paragraph drops "LLC" once and has stray junk characters "m / nn" — template sloppiness; ours will be clean.)
- Mailing address 3317 S Higley Rd Ste 114-500 Gilbert AZ 85297 — **[VERIFY] with owner; not in handoff factbase.**
- Phone/email — factbase.

## Word count target
Live ≈ 730 unique words. Target: **≥ 900** (parity clauses + new tracking/lead-flow disclosures). Substance over length.

## Internal links
- Parity: /contact (contact-method reference), sitewide header/footer; linked FROM every form's SMS disclosure + footer sitewide.
- New: breadcrumb or plain back-link to Home.

## Schema today
WebSite + GeneralContractor graph only. Fine as-is.

## Writer notes
- This is a legal document: fresh drafting, plain English, no copied sentences, and flag to the owner that it is a template needing their counsel's sign-off ([VERIFY] final text with owner).
- Coordinate with terms-and-conditions.md so SMS language matches across both + the form disclosure.

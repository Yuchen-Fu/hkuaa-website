# HKUAA Build Memory

Last updated: 2026-04-15

## Preview

- Local: `http://localhost:3000`
- Admin tools: `http://localhost:3000/admin/ops`

## Version Log

### v0.1.1 - Template Alignment Pass (Completed)

What was done:
- Reworked UI from generic modern card style to a template language closer to HKUAA Dining:
  - centered brand header + horizontal uppercase nav
  - large hero bands
  - section blocks with simple list layout
  - "For details" style links and restrained panel treatment
- Updated public routes to the same visual pattern:
  - `/`, `/about`, `/clubhouse`, `/events`, `/membership`, `/membership/apply`, `/news`, `/contact`
- Kept clubhouse policy unchanged:
  - dining details and reservations remain external links
  - main site keeps overview and routing
- Preserved dynamic backend-driven content:
  - homepage/news/events still read from admin-managed runtime store
  - no hardcoded featured lists in `site-data.ts`
- Verified quality:
  - `npm run lint` passed after redesign

What is still missing:
- No exact asset-level clone yet (same photos/logo treatment still pending).
- No bilingual typography/spacing tuning yet.
- No pixel-level parity for dining template components.

---

### v0.1.2 - Template Refinement Pass (Completed)

What was done:
- Refined navigation into multi-level top menu with hover dropdown items to match template information architecture style.
- Updated header composition to centered brand + uppercase nav tone.
- Refined homepage section naming and bilingual heading style:
  - Upcoming Events 活動
  - News 最新消息
  - About / Clubhouse / Membership blocks with "For details" links
- Tightened visual rhythm to reduce generic UI signals:
  - sharper button corners
  - less card-like spacing
  - longer hero ratio
  - restrained panel styles and list separators
- Preserved dynamic data architecture for events/news from admin tools.

What is still missing:
- Final texture/background/photo assets from real HKUAA or dining visual system.
- Fine-grained typography parity (exact font family/weights and line spacing).
- Mobile menu behavior parity with final selected template behavior.

---

### v0.1 - Foundation Scaffold (Completed)

What was done:
- Created independent project: `HKUAA/hkuaa-website` (isolated from HKFIA site).
- Implemented core public routes:
  - `/`, `/about`, `/clubhouse`, `/events`, `/membership`, `/membership/apply`, `/news`, `/contact`
- Implemented MVP data layer with runtime store (`.runtime/hkuaa-store.json`) for:
  - applications
  - payments
  - events
  - news
- Implemented membership workflow APIs:
  - `/api/applications`
  - `/api/applications/[id]/review`
- Implemented payment bridge APIs:
  - `/api/payments/checkout`
  - `/api/payments/webhook`
  - `/api/payments/mock-success`
- Implemented admin tools APIs:
  - `/api/admin/events`
  - `/api/admin/news`
- Implemented admin tools page:
  - `/admin/ops` (create event/news, review membership applications)
- Set clubhouse/dining strategy:
  - Main site keeps clubhouse overview
  - Dining and booking remain external links (`hkuaadining.hk` + `inline.app`)
- Verified quality:
  - `npm run lint` passed
  - `npm run build` passed

What is still missing:
- No production database yet (currently file-based runtime store).
- No admin authentication/RBAC enforcement yet.
- No Stripe webhook signature verification yet.
- No email notification pipeline yet.
- No media/document upload pipeline yet.

---

### v0.2 - Production Readiness Core (In Progress)

Target:
- Replace file store with PostgreSQL.
- Add admin auth + role gates.
- Add Stripe production webhook verification.
- Add transactional email (application received, approved, payment confirmed).

Planned deliverables:
- DB schema:
  - `membership_applications`, `members`, `payments`, `events`, `news_posts`, `admins`
- Auth:
  - admin login
  - protected `/admin/*`
  - role checks (`content_editor`, `membership_officer`, `finance_officer`)
- Payments:
  - verified Stripe event handling
  - idempotent payment updates
- Ops:
  - migration scripts for seed content
  - basic audit logs for status changes

---

### v0.3 - Launch Hardening (Planned)

Target:
- Cutover + rollback safety.
- Monitoring + alerting.
- Data migration dry-run and parallel run.

Planned deliverables:
- Redirect map from legacy URLs.
- Cutover checklist with timestamps.
- Hypercare dashboard (submission/payment errors).
- Backup/export and replay procedure.

## Environment Settings Needed

Required soon:
- Stripe payment links:
  - `STRIPE_MEMBERSHIP_ORDINARY_PAYMENT_LINK`
  - `STRIPE_MEMBERSHIP_STUDENT_PAYMENT_LINK`
  - `STRIPE_MEMBERSHIP_ASSOCIATE_PAYMENT_LINK`
  - `STRIPE_MEMBERSHIP_LIFE_PAYMENT_LINK`
  - `STRIPE_EVENT_PAYMENT_LINK`
  - `STRIPE_DONATION_PAYMENT_LINK`
- Email provider credentials (for notifications).
- Database connection string (PostgreSQL).
- Admin auth secrets.

## Notes

- HKFIA project was explicitly excluded and restored; HKUAA work is isolated in `HKUAA/hkuaa-website`.
- This memory file should be updated every version bump with:
  - what was implemented
  - what remains
  - blockers/settings required

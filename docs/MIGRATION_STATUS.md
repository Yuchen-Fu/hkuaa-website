# HKUAA Backend Status

_Last updated: 2026-06-09_

## Current scope

This app now handles only HKUAA membership registration and staff review. Public
content pages, news, events, dining pages, and general site content are expected
to live on Wix.

## Status by feature

| Feature | Data store | Read path | Write path | Notes |
|---|---|---|---|---|
| Membership applications | Supabase | `/admin` | `/api/applications` | Canonical intake and review flow |
| Staff roles | Supabase | `user_roles` | Supabase admin/table maintenance | Uses `admin`, `membership_staff`, and `dining_staff` |
| CSV export | Supabase | `/api/admin/export` | — | Admin-only |
| Application delete | Supabase | `/admin/applications/[id]` | `DELETE /api/admin/applications/[id]` | Admin-only |
| Dining verification | Supabase `members` table | `/dining` | — | Dining staff can search active members by code plus name only |
| Member info editing | Supabase `members` table | `/admin/members` | `PATCH /api/admin/members/[id]` | Admin-only |

## Known gaps

1. **Server-side reCAPTCHA verification**: `/api/applications` receives `recaptchaToken` but does not yet verify it with Google `siteverify`.
2. **Approved member directory automation**: approval currently updates the application status only. Add automatic `members` table creation/update when HKUAA is ready.
3. **Member data import**: Dining verification requires active members in the `members` table. See `docs/SUPABASE_MEMBERS.sql`.

## Demo guidance

Walk through: submit `/membership/apply` → sign in at Staff Login. `membership_staff` lands on `/admin` and can view/search/approve/reject applications from the last 30 days. `dining_staff` lands on `/dining` and can verify active members. `admin` can access both plus export/delete and edit member information.

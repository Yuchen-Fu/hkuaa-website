# HKUAA Membership Role Model

This app should stay focused on membership registration and staff verification.
Public content pages live on Wix.

## Roles

### `admin`

HKUAA system owner with full access.

Allowed:

- Sign in to `/admin`.
- Search and view membership applications.
- Approve or reject pending applications.
- Download/export application CSV.
- Delete application records.
- Use future data-management tools.

Not allowed:

- Share one admin account across multiple staff members. Use named Supabase Auth users.

### `membership_staff`

HKUAA office staff who review new applications.

Allowed:

- Sign in to `/admin`.
- Search and view membership applications.
- Approve or reject pending applications.
- Add internal review notes.
- Limited to applications submitted in the last 30 days.

Not allowed:

- Download/export bulk application data.
- Edit member profile or dining verification information.
- Manage Wix content.
- Use dining verification screens.

### `dining_staff`

Dining/front desk staff who need to identify active HKUAA members.

Allowed:

- Sign in to a future `/dining` or `/verify` staff screen.
- Search active members by membership number, email, phone, or name.
- See only the minimum data needed for identification:
  - membership number
  - English name
  - Chinese name
  - membership type
  - membership status
  - expiry date, if applicable
  - optional profile photo, if HKUAA decides to collect it

Not allowed:

- View pending or rejected applications.
- Approve, reject, or edit applications.
- Download/export member data.
- See raw application payloads, review notes, payment records, or documents.

## Supabase Shape

Recommended tables:

- `user_roles`
  - `user_id uuid primary key references auth.users(id)`
  - `role text check (role in ('admin', 'membership_staff', 'dining_staff'))`
  - setup SQL lives in `docs/SUPABASE_ROLES.sql`
- `membership_applications`
  - existing application intake table
  - visible and updateable by `admin` and `membership_staff`
  - delete allowed only by `admin`
  - app code limits `membership_staff` to 30 days
- `members`
  - canonical approved member directory
  - searchable by `dining_staff`, but only through restricted columns
  - setup SQL lives in `docs/SUPABASE_MEMBERS.sql`

Recommended member fields:

- `id uuid primary key`
- `application_id uuid references membership_applications(id)`
- `membership_number text unique`
- `title text`
- `email text`
- `phone text`
- `photo_url text`
- `first_name text`
- `last_name text`
- `chinese_name text`
- `membership_type text`
- `status text check (status in ('active', 'expired', 'suspended'))`
- `expires_at timestamptz`
- `created_at timestamptz default now()`

## RLS Direction

Keep Row Level Security as the source of truth. UI checks are convenience only.

Helper functions:

```sql
create or replace function public.current_user_role()
returns text
language sql
security definer
stable
as $$
  select role from public.user_roles where user_id = auth.uid()
$$;

create or replace function public.has_role(required_role text)
returns boolean
language sql
security definer
stable
as $$
  select public.current_user_role() = required_role
$$;

create or replace function public.has_any_role(required_roles text[])
returns boolean
language sql
security definer
stable
as $$
  select public.current_user_role() = any(required_roles)
$$;
```

Policy intent:

- `membership_applications`
  - insert: anonymous applicant submission endpoint only, or server-side controlled insert
  - select: `has_any_role(array['admin', 'membership_staff'])`
  - update: `has_any_role(array['admin', 'membership_staff'])`
  - delete: `has_role('admin')`
- `members`
  - select restricted verification data for `dining_staff` and active members only
  - select/write full data for `admin`
  - no write access for `membership_staff`
  - bulk export only for `admin`

For dining, prefer a Supabase view or RPC that returns only safe columns:

```sql
create view public.member_verification_view as
select
  membership_number,
  first_name,
  last_name,
  chinese_name,
  membership_type,
  status,
  expires_at
from public.members
where status = 'active';
```

Then grant `dining_staff` select access to the view through RLS/policies, not to the raw application table.

## Product Flow

1. Applicant submits `/membership/apply`.
2. Data is stored in `membership_applications` with `status = 'pending'`.
3. `admin` or `membership_staff` signs in at `/admin`, reviews the application, and approves/rejects.
4. On approval, the system should create or update one row in `members`.
5. `dining_staff` uses `/dining` to search active `members` by membership code plus first/last name, never `membership_applications`.

## Current Code Notes

- `/admin` is now intended for `admin` and `membership_staff`.
- CSV export and delete are admin-only.
- `/admin/members` is admin-only and is where member code, name, phone, email, photo, title, type, status, and expiry can be changed.
- `/dining` is intended for `admin` and `dining_staff`; it only returns basic member verification fields.
- `membership_staff` sees only the last 30 days of application history and can only view, search, approve, or reject.

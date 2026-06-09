create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.membership_applications(id) on delete set null,
  membership_number text not null unique,
  title text,
  first_name text,
  last_name text,
  chinese_name text,
  email text,
  phone text,
  photo_url text,
  membership_type text,
  status text not null default 'active' check (status in ('active', 'expired', 'suspended')),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.members enable row level security;

drop policy if exists "admin full member access" on public.members;
create policy "admin full member access"
on public.members
for all
to authenticated
using (public.has_role('admin'))
with check (public.has_role('admin'));

drop policy if exists "dining staff verify active members" on public.members;
create policy "dining staff verify active members"
on public.members
for select
to authenticated
using (
  status = 'active'
  and public.has_any_role(array['admin', 'dining_staff'])
);

create index if not exists members_membership_number_idx
on public.members (membership_number);

create index if not exists members_name_lookup_idx
on public.members (lower(first_name), lower(last_name));

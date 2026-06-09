create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null,
  created_at timestamptz not null default now()
);

alter table public.user_roles
  drop constraint if exists user_roles_role_check;

alter table public.user_roles
  add constraint user_roles_role_check
  check (role in ('admin', 'membership_staff', 'dining_staff'));

alter table public.user_roles enable row level security;

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

-- Replace these with the actual auth.users.id values from Supabase Dashboard.
-- insert into public.user_roles (user_id, role)
-- values ('00000000-0000-0000-0000-000000000000', 'admin')
-- on conflict (user_id) do update set role = excluded.role;
--
-- insert into public.user_roles (user_id, role)
-- values ('00000000-0000-0000-0000-000000000000', 'membership_staff')
-- on conflict (user_id) do update set role = excluded.role;
--
-- insert into public.user_roles (user_id, role)
-- values ('00000000-0000-0000-0000-000000000000', 'dining_staff')
-- on conflict (user_id) do update set role = excluded.role;

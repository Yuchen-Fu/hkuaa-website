import type { SupabaseClient } from '@supabase/supabase-js'

export type StaffRole = 'admin' | 'membership_staff' | 'dining_staff'

export const ADMIN_ROLES: StaffRole[] = ['admin', 'membership_staff']

export async function getStaffRole(
  supabase: SupabaseClient
): Promise<StaffRole | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  return isStaffRole(data?.role) ? data.role : null
}

export function isAdminRole(role: StaffRole | null): role is 'admin' {
  return role === 'admin'
}

export function canAccessAdmin(role: StaffRole | null) {
  return role === 'admin' || role === 'membership_staff'
}

export function canAccessDining(role: StaffRole | null) {
  return role === 'admin' || role === 'dining_staff'
}

export function dashboardPathForRole(role: StaffRole | null) {
  if (role === 'dining_staff') return '/dining'
  if (role === 'admin' || role === 'membership_staff') return '/admin'
  return '/admin/login?error=not_staff'
}

function isStaffRole(role: unknown): role is StaffRole {
  return role === 'admin' || role === 'membership_staff' || role === 'dining_staff'
}

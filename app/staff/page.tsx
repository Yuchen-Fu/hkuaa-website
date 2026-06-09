import { redirect } from 'next/navigation'
import { dashboardPathForRole, getStaffRole } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'

export default async function StaffEntryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const role = await getStaffRole(supabase)
  redirect(dashboardPathForRole(role))
}

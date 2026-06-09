import { redirect } from 'next/navigation'
import { canAccessDining, getStaffRole } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'
import StaffSignOut from '@/components/StaffSignOut'
import DiningLookup from './lookup'

export default async function DiningPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const role = await getStaffRole(supabase)
  if (!canAccessDining(role)) redirect('/admin/login?error=not_staff')

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f6efe0_0%,#f7faf7_42%,#eef4f0_100%)] text-[#10204b]">
      <nav className="border-b border-[#d8dfd8] bg-white/85 px-5 py-4 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold text-[#214d38]">Member Verification</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#40516b]">
            <span className="hidden opacity-80 sm:inline">{user.email}</span>
            <StaffSignOut />
          </div>
        </div>
      </nav>
      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl items-center justify-center px-5 py-10">
        <div className="w-full">
          <DiningLookup />
        </div>
      </main>
    </div>
  )
}

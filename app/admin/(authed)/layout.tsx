import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { canAccessAdmin, getStaffRole, isAdminRole } from '@/lib/auth/roles'
import SignOut from './sign-out'

/**
 * Route-group layout for /admin/(authed)/*
 * - Non-logged-in -> /admin/login
 * - Non-admin/non-membership-staff -> /admin/login?error=not_staff
 */
export default async function AdminAuthedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const role = await getStaffRole(supabase)
  if (!canAccessAdmin(role)) redirect('/admin/login?error=not_staff')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <Link href="/admin" className="font-semibold">HKUAA Admin</Link>
          <Link href="/admin/applications" className="opacity-80 hover:opacity-100">
            Applications
          </Link>
          {isAdminRole(role) ? (
            <>
              <Link href="/admin/members" className="opacity-80 hover:opacity-100">
                Members
              </Link>
              <Link href="/dining" className="opacity-80 hover:opacity-100">
                Dining Verification
              </Link>
              <a
                href="/api/admin/export"
                className="opacity-80 hover:opacity-100 text-sm"
              >
                Export CSV
              </a>
            </>
          ) : null}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="opacity-80">{user.email}</span>
          <SignOut />
        </div>
      </nav>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  )
}

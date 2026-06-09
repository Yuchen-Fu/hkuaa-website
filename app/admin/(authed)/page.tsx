import { createClient } from '@/lib/supabase/server'
import { getStaffRole, isAdminRole } from '@/lib/auth/roles'
import { getHkuaaStaffHistoryCutoff } from '@/lib/application-history'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const role = await getStaffRole(supabase)
  const canManageData = isAdminRole(role)
  const fifteenDaysAgo = getHkuaaStaffHistoryCutoff()

  let pendingQuery = supabase
    .from('membership_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
  let approvedQuery = supabase
    .from('membership_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved')
  let rejectedQuery = supabase
    .from('membership_applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'rejected')
  let recentQuery = supabase
    .from('membership_applications')
    .select('id, email, first_name, last_name, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  if (!canManageData) {
    pendingQuery = pendingQuery.gte('created_at', fifteenDaysAgo)
    approvedQuery = approvedQuery.gte('created_at', fifteenDaysAgo)
    rejectedQuery = rejectedQuery.gte('created_at', fifteenDaysAgo)
    recentQuery = recentQuery.gte('created_at', fifteenDaysAgo)
  }

  const [pendingRes, approvedRes, rejectedRes, recentRes] = await Promise.all([
    pendingQuery,
    approvedQuery,
    rejectedQuery,
    recentQuery,
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          {canManageData
            ? 'Full membership application pipeline overview'
            : 'Membership applications submitted in the last 30 days'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Pending" value={pendingRes.count ?? 0} tone="yellow" />
        <Stat label="Approved" value={approvedRes.count ?? 0} tone="green" />
        <Stat label="Rejected" value={rejectedRes.count ?? 0} tone="red" />
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Recent applications</h2>
          <Link
            href="/admin/applications"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            View all →
          </Link>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRes.data?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                  No applications yet.
                </td>
              </tr>
            )}
            {recentRes.data?.map((a) => (
              <tr key={a.id} className="border-t text-sm">
                <td className="px-6 py-3">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  <Link
                    href={`/admin/applications/${a.id}`}
                    className="text-slate-900 hover:underline"
                  >
                    {[a.first_name, a.last_name].filter(Boolean).join(' ') || '—'}
                  </Link>
                </td>
                <td className="px-6 py-3 text-gray-600">{a.email}</td>
                <td className="px-6 py-3"><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Stat({
  label, value, tone,
}: {
  label: string
  value: number
  tone: 'yellow' | 'green' | 'red'
}) {
  const ring = {
    yellow: 'border-yellow-200 bg-yellow-50',
    green: 'border-green-200 bg-green-50',
    red: 'border-red-200 bg-red-50',
  }[tone]
  return (
    <div className={`border rounded-lg p-6 ${ring}`}>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-4xl font-bold mt-2">{value}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'pending'
      ? 'bg-yellow-100 text-yellow-800'
      : status === 'approved'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${cls}`}>
      {status}
    </span>
  )
}

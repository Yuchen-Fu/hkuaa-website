import { createClient } from '@/lib/supabase/server'
import { getStaffRole, isAdminRole } from '@/lib/auth/roles'
import { getHkuaaStaffHistoryCutoff } from '@/lib/application-history'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ status?: string; q?: string }>
}

export default async function ApplicationsPage({ searchParams }: Props) {
  const sp = await searchParams
  const status = sp.status ?? 'all'
  const q = sp.q?.trim() ?? ''

  const supabase = await createClient()
  const role = await getStaffRole(supabase)
  const canManageData = isAdminRole(role)
  const fifteenDaysAgo = getHkuaaStaffHistoryCutoff()
  let query = supabase
    .from('membership_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (!canManageData) {
    query = query.gte('created_at', fifteenDaysAgo)
  }

  if (status !== 'all' && ['pending', 'approved', 'rejected'].includes(status)) {
    query = query.eq('status', status)
  }
  if (q) {
    query = query.or(
      `email.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%,chinese_name.ilike.%${q}%`
    )
  }

  const { data: apps, error } = await query

  if (error) {
    return <p className="text-red-600">Error loading applications: {error.message}</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Applications</h1>
        {canManageData ? (
          <a
            href={`/api/admin/export${status !== 'all' ? `?status=${status}` : ''}`}
            className="px-3 py-2 text-sm bg-white border rounded hover:bg-gray-50"
          >
            Export CSV
          </a>
        ) : (
          <p className="text-sm text-gray-500">Review only. Showing the last 30 days.</p>
        )}
      </div>

      <form className="flex gap-3 items-center" method="GET">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
            <Link
              key={s}
              href={`/admin/applications?status=${s}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              className={`px-3 py-1 text-sm rounded capitalize ${
                status === s ? 'bg-white shadow font-medium' : 'text-gray-600'
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
        <input
          type="text"
          name="q"
          placeholder="Search name or email…"
          defaultValue={q}
          className="border rounded px-3 py-1 text-sm flex-1 max-w-xs"
        />
        <input type="hidden" name="status" value={status} />
        <button className="px-3 py-1 text-sm bg-slate-900 text-white rounded">
          Search
        </button>
      </form>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Grad Year</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {apps?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">
                  No applications match your filter.
                </td>
              </tr>
            )}
            {apps?.map((a) => (
              <tr key={a.id} className="border-t text-sm hover:bg-gray-50">
                <td className="px-4 py-3">
                  {new Date(a.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/applications/${a.id}`}
                    className="font-medium hover:underline"
                  >
                    {[a.first_name, a.last_name].filter(Boolean).join(' ') || '—'}
                  </Link>
                  {a.chinese_name && (
                    <span className="text-gray-500 ml-1">({a.chinese_name})</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600">{a.email}</td>
                <td className="px-4 py-3">{a.graduation_year ?? '—'}</td>
                <td className="px-4 py-3 capitalize">{a.membership_type ?? '—'}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/applications/${a.id}`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500">
        Total: {apps?.length ?? 0} {apps?.length === 1 ? 'record' : 'records'}
      </p>
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

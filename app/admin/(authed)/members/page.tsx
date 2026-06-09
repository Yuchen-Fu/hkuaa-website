import { redirect } from 'next/navigation'
import { getStaffRole, isAdminRole } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'
import MemberEditor from './member-editor'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function MembersPage({ searchParams }: Props) {
  const supabase = await createClient()
  const role = await getStaffRole(supabase)
  if (!isAdminRole(role)) redirect('/admin')

  const sp = await searchParams
  const q = sp.q?.trim() ?? ''

  let query = supabase
    .from('members')
    .select('id, membership_number, title, first_name, last_name, chinese_name, email, phone, photo_url, membership_type, status, expires_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (q) {
    query = query.or(
      `membership_number.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%,chinese_name.ilike.%${q}%`
    )
  }

  const { data: members, error } = await query

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Members</h1>
        <p className="text-sm text-gray-500 mt-1">
          Admin-only member information used by Dining Verification.
        </p>
      </div>

      <form method="GET" className="flex gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search code, name, phone, or email"
          className="border rounded px-3 py-2 text-sm flex-1 max-w-md"
        />
        <button className="px-4 py-2 bg-slate-900 text-white rounded text-sm">
          Search
        </button>
      </form>

      {error ? (
        <p className="text-red-600 text-sm">Error loading members: {error.message}</p>
      ) : null}

      <div className="space-y-4">
        {members?.length === 0 ? (
          <div className="bg-white border rounded-lg p-6 text-sm text-gray-500">
            No members found.
          </div>
        ) : null}
        {members?.map((member) => (
          <MemberEditor key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

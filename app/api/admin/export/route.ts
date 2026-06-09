import { getStaffRole, isAdminRole } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const supabase = await createClient()
  const role = await getStaffRole(supabase)
  if (!isAdminRole(role)) return new Response('Forbidden', { status: 403 })

  const url = new URL(req.url)
  const status = url.searchParams.get('status')

  let q = supabase
    .from('membership_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && ['pending', 'approved', 'rejected'].includes(status)) {
    q = q.eq('status', status)
  }

  const { data, error } = await q
  if (error) return new Response(error.message, { status: 500 })
  if (!data || data.length === 0) {
    return new Response('No data', { status: 204 })
  }

  const expanded = data.map((row) => {
    const { raw_data, ...rest } = row
    const flat: Record<string, unknown> = { ...rest }
    if (raw_data && typeof raw_data === 'object') {
      for (const [k, v] of Object.entries(raw_data)) {
        if (!(k in flat)) flat[`raw_${k}`] = v
      }
    }
    return flat
  })

  const columns = Array.from(
    expanded.reduce((set, row) => {
      Object.keys(row).forEach((k) => set.add(k))
      return set
    }, new Set<string>())
  )

  const esc = (v: unknown): string => {
    if (v === null || v === undefined) return ''
    const s = typeof v === 'object' ? JSON.stringify(v) : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }

  const csv = [
    columns.join(','),
    ...expanded.map((row) => columns.map((c) => esc(row[c])).join(',')),
  ].join('\n')

  const filename = `hkuaa-applications-${new Date().toISOString().slice(0, 10)}.csv`

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}

import { NextResponse } from 'next/server'
import { canAccessAdmin, getStaffRole, isAdminRole } from '@/lib/auth/roles'
import { getHkuaaStaffHistoryCutoff } from '@/lib/application-history'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/admin/applications/[id]/reject
 * Flips an application's status to 'rejected' with optional reason.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const role = await getStaffRole(supabase)
  if (!canAccessAdmin(role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const fifteenDaysAgo = getHkuaaStaffHistoryCutoff()

  let notes: string | null = null
  try {
    const body = await req.json()
    if (typeof body?.notes === 'string') notes = body.notes
  } catch {
    // optional
  }

  let query = supabase
    .from('membership_applications')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      review_notes: notes,
    })
    .eq('id', id)
    .eq('status', 'pending')

  if (!isAdminRole(role)) {
    query = query.gte('created_at', fifteenDaysAgo)
  }

  const { data, error } = await query
    .select('id, email, status')
    .single()

  if (error || !data) {
    return NextResponse.json(
      { error: 'Application not found or already processed' },
      { status: 404 }
    )
  }
  return NextResponse.json({ ok: true, ...data })
}

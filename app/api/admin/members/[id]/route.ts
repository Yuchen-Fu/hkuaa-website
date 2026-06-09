import { NextResponse } from 'next/server'
import { getStaffRole, isAdminRole } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'

const EDITABLE_FIELDS = [
  'membership_number',
  'title',
  'first_name',
  'last_name',
  'chinese_name',
  'email',
  'phone',
  'photo_url',
  'membership_type',
  'status',
  'expires_at',
] as const

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const role = await getStaffRole(supabase)
  if (!isAdminRole(role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const update: Record<string, string | null> = {}

  for (const field of EDITABLE_FIELDS) {
    if (field in body) {
      const value = body[field]
      update[field] = typeof value === 'string' && value.trim() !== '' ? value.trim() : null
    }
  }

  if (update.status && !['active', 'expired', 'suspended'].includes(update.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  update.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('members')
    .update(update)
    .eq('id', id)
    .select('id')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Member not found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}

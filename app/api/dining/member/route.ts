import { NextResponse } from 'next/server'
import { canAccessDining, getStaffRole } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'

const BASIC_MEMBER_FIELDS = [
  'membership_number',
  'first_name',
  'last_name',
  'chinese_name',
  'email',
  'phone',
  'title',
  'photo_url',
  'membership_type',
  'status',
  'expires_at',
].join(',')

export async function GET(req: Request) {
  const supabase = await createClient()
  const role = await getStaffRole(supabase)
  if (!canAccessDining(role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const url = new URL(req.url)
  const code = url.searchParams.get('code')?.trim()
  const name = url.searchParams.get('name')?.trim()

  if (!code || !name) {
    return NextResponse.json(
      { error: 'Membership code and first or last name are required.' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('members')
    .select(BASIC_MEMBER_FIELDS)
    .eq('membership_number', code)
    .eq('status', 'active')
    .or(`first_name.ilike.%${escapeLike(name)}%,last_name.ilike.%${escapeLike(name)}%`)
    .limit(1)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  if (!data) {
    return NextResponse.json({ error: 'No active member matched that code and name.' }, { status: 404 })
  }

  return NextResponse.json({ member: data })
}

function escapeLike(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('%', '\\%').replaceAll('_', '\\_')
}

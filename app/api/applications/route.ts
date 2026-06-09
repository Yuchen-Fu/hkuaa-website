import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/applications
 *
 * Receives whatever shape your existing MembershipApplicationForm sends.
 * Strategy:
 *   1. Stash the ENTIRE request body into `raw_data` (jsonb) - nothing is lost.
 *   2. Try to pull out canonical fields (email, first_name, etc.) using a
 *      tolerant key picker that accepts both snake_case and camelCase.
 *   3. Only `email` is strictly required; everything else is optional.
 *
 * This means your form code stays untouched. Field names don't have to match.
 */
export async function POST(req: Request) {
  // TODO: verify recaptchaToken via Google siteverify before production
  try {
    const body = await req.json()

    const email = pick(body, 'email', 'residenceEmail', 'correspondenceEmail', 'emailAddress')
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'email is required' },
        { status: 400 }
      )
    }

    const row = {
      email: email.trim().toLowerCase(),
      first_name:       asString(pick(body, 'first_name', 'firstName', 'givenName', 'englishFirstName')),
      last_name:        asString(pick(body, 'last_name', 'lastName', 'familyName', 'surname', 'englishLastName')),
      chinese_name:     asString(pick(body, 'chinese_name', 'chineseName', 'nameZh')),
      phone:            asString(pick(body, 'phone', 'phoneNumber', 'mobile', 'contactNumber')),
      graduation_year:  asInt(pick(body, 'graduation_year', 'graduationYear', 'gradYear', 'yearOfGraduation', 'yearOfGraduationAssociate', 'expectedYearOfGraduation')),
      membership_type:  asString(pick(body, 'membership_type', 'membershipType', 'type')) ?? 'ordinary',
      raw_data:         body,
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('membership_applications')
      .insert(row)
      .select('id')
      .single()

    if (error) {
      console.error('[applications] insert error:', error)
      return NextResponse.json(
        { error: 'Submission failed' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        application: { id: data.id },
        message: 'Application submitted',
        status: 'pending',
      },
      { status: 201 }
    )
  } catch (e) {
    console.error('[applications] unexpected error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ---------- helpers ----------
function pick(obj: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== '') {
      return obj[k]
    }
  }
  return undefined
}

function asString(v: unknown): string | null {
  if (typeof v === 'string' && v.trim() !== '') return v.trim()
  if (typeof v === 'number') return String(v)
  return null
}

function asInt(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return Math.trunc(v)
  if (typeof v === 'string' && /^\d+$/.test(v.trim())) return parseInt(v, 10)
  return null
}

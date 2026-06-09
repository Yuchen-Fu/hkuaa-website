import { createClient } from '@/lib/supabase/server'
import { getStaffRole, isAdminRole } from '@/lib/auth/roles'
import { getHkuaaStaffHistoryCutoff } from '@/lib/application-history'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReviewActions from './review-actions'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const role = await getStaffRole(supabase)
  const canManageData = isAdminRole(role)
  const fifteenDaysAgo = getHkuaaStaffHistoryCutoff()

  let query = supabase
    .from('membership_applications')
    .select('*')
    .eq('id', id)

  if (!canManageData) {
    query = query.gte('created_at', fifteenDaysAgo)
  }

  const { data: app, error } = await query
    .maybeSingle()

  if (error || !app) notFound()

  const raw = (app.raw_data ?? {}) as Record<string, unknown>
  const canonical = new Set([
    'email', 'first_name', 'last_name', 'firstName', 'lastName',
    'chinese_name', 'chineseName', 'phone', 'phoneNumber',
    'graduation_year', 'graduationYear', 'membership_type', 'membershipType',
    'recaptchaToken',
  ])
  const extraRawKeys = Object.keys(raw).filter((k) => !canonical.has(k)).sort()

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <Link
          href="/admin/applications"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to applications
        </Link>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Application detail
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              {[app.first_name, app.last_name].filter(Boolean).join(' ') || app.email}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Submitted {new Date(app.created_at).toLocaleString()}
            </p>
          </div>
          <StatusBadge status={app.status} />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <SectionHeading
          title="Core information"
          description="Normalized fields used for search, review, and reporting."
        />
        <dl className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Email" value={app.email} />
          <Field label="Membership Type" value={app.membership_type} />
          <Field label="First Name" value={app.first_name} />
          <Field label="Last Name" value={app.last_name} />
          <Field label="Chinese Name" value={app.chinese_name} />
          <Field label="Phone" value={app.phone} />
          <Field label="Graduation Year" value={app.graduation_year?.toString()} />
        </dl>
      </div>

      {extraRawKeys.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <SectionHeading
            title="Additional form fields"
            description="Original form answers stored with the application."
          />
          <dl className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {extraRawKeys.map((k) => (
              <Field
                key={k}
                label={formatLabel(k)}
                value={formatValue(raw[k])}
              />
            ))}
          </dl>
        </div>
      )}

      {app.reviewed_at && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <SectionHeading title="Review history" />
          <dl className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field
              label="Decision"
              value={`${app.status === 'approved' ? 'Approved' : 'Rejected'} on ${new Date(app.reviewed_at).toLocaleString()}`}
            />
            <Field label="Notes" value={app.review_notes} />
          </dl>
        </div>
      )}

      <ReviewActions id={app.id} canDelete={canManageData} showReview={app.status === 'pending'} />
    </div>
  )
}

function SectionHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {description ? <p className="mt-1 text-sm text-gray-500">{description}</p> : null}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/70 px-4 py-3">
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-gray-500">{label}</dt>
      <dd className="mt-1 min-h-5 break-words text-sm font-medium text-slate-900">
        {value || <span className="text-gray-400">—</span>}
      </dd>
    </div>
  )
}

function formatLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'pending'
      ? 'bg-yellow-100 text-yellow-800'
      : status === 'approved'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  return (
    <span className={`px-3 py-1 rounded text-sm font-medium capitalize ${cls}`}>
      {status}
    </span>
  )
}

'use client'

import { useState } from 'react'

type Member = {
  id: string
  membership_number: string | null
  title: string | null
  first_name: string | null
  last_name: string | null
  chinese_name: string | null
  email: string | null
  phone: string | null
  photo_url: string | null
  membership_type: string | null
  status: string | null
  expires_at: string | null
}

export default function MemberEditor({ member }: { member: Member }) {
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    setError(null)

    const fd = new FormData(event.currentTarget)
    const payload = Object.fromEntries(
      Array.from(fd.entries()).map(([key, value]) => [key, typeof value === 'string' ? value.trim() || null : null])
    )

    const res = await fetch(`/api/admin/members/${member.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json().catch(() => ({}))
    setSaving(false)

    if (!res.ok) {
      setError(json.error ?? 'Save failed')
      return
    }
    setMessage('Saved')
  }

  return (
    <form onSubmit={save} className="bg-white border rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold">
            {member.membership_number || 'No code'} · {[member.first_name, member.last_name].filter(Boolean).join(' ') || 'Unnamed'}
          </h2>
          <p className="text-xs text-gray-500">Member ID: {member.id}</p>
        </div>
        <button
          disabled={saving}
          className="px-4 py-2 bg-slate-900 text-white rounded text-sm disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Field name="membership_number" label="Code" defaultValue={member.membership_number} required />
        <Field name="title" label="Title" defaultValue={member.title} />
        <Field name="status" label="Status" defaultValue={member.status} />
        <Field name="first_name" label="First name" defaultValue={member.first_name} />
        <Field name="last_name" label="Last name" defaultValue={member.last_name} />
        <Field name="chinese_name" label="Chinese name" defaultValue={member.chinese_name} />
        <Field name="phone" label="Phone" defaultValue={member.phone} />
        <Field name="email" label="Email" defaultValue={member.email} type="email" />
        <Field name="membership_type" label="Membership type" defaultValue={member.membership_type} />
        <Field name="photo_url" label="Photo URL" defaultValue={member.photo_url} />
        <Field name="expires_at" label="Expiry date/time" defaultValue={member.expires_at} />
      </div>

      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  )
}

function Field({
  name,
  label,
  defaultValue,
  required,
  type = 'text',
}: {
  name: string
  label: string
  defaultValue: string | null
  required?: boolean
  type?: string
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-gray-600">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="border rounded px-3 py-2"
      />
    </label>
  )
}

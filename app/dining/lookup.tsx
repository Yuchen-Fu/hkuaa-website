'use client'

import { useState } from 'react'

type MemberResult = {
  membership_number: string | null
  first_name: string | null
  last_name: string | null
  chinese_name: string | null
  email: string | null
  phone: string | null
  title: string | null
  photo_url: string | null
  membership_type: string | null
  status: string | null
  expires_at: string | null
}

export default function DiningLookup() {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [member, setMember] = useState<MemberResult | null>(null)

  async function lookup(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setMember(null)

    const params = new URLSearchParams({
      code: code.trim(),
      name: name.trim(),
    })
    const res = await fetch(`/api/dining/member?${params}`)
    const json = await res.json().catch(() => ({}))
    setLoading(false)

    if (!res.ok) {
      setError(json.error ?? 'Member not found')
      return
    }
    setMember(json.member)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="overflow-hidden rounded-[1.75rem] border border-[#dbe5dc] bg-white shadow-[0_24px_70px_rgba(28,66,48,0.14)]">
        <div className="border-b border-[#edf1eb] bg-gradient-to-br from-[#24533b] via-[#214d38] to-[#102f23] px-6 py-8 text-center text-white sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight">Member Verification</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/75">
            Enter the membership code and either first or last name to confirm eligibility.
          </p>
        </div>

        <div className="px-6 py-7 sm:px-10">
          <form onSubmit={lookup} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-[#40516b]">
                Membership code
                <input
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. HKUAA-TEST-001"
                  className="rounded-xl border border-[#d9e2dc] bg-[#fbfcfb] px-4 py-3 text-base outline-none transition focus:border-[#b59049] focus:bg-white focus:ring-4 focus:ring-[#b59049]/15"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-[#40516b]">
                First or last name
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ada or Chan"
                  className="rounded-xl border border-[#d9e2dc] bg-[#fbfcfb] px-4 py-3 text-base outline-none transition focus:border-[#b59049] focus:bg-white focus:ring-4 focus:ring-[#b59049]/15"
                />
              </label>
            </div>
            <button
              disabled={loading}
              className="mx-auto mt-2 inline-flex min-w-44 items-center justify-center rounded-full bg-[#214d38] px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#214d38]/20 transition hover:bg-[#193c2b] disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Verify Member'}
            </button>
          </form>

          {error ? (
            <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {error}
            </p>
          ) : null}
        </div>
      </section>

      {member ? (
        <section className="overflow-hidden rounded-[1.5rem] border border-[#dbe5dc] bg-white shadow-[0_18px_55px_rgba(28,66,48,0.11)]">
          <div className="h-2 bg-gradient-to-r from-[#214d38] via-[#b59049] to-[#214d38]" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-[#d8dfd8] bg-[#f4f7f3] shadow-inner">
                {member.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo_url} alt="Member photo" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                    No photo
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b59049]">Verified Member</p>
                    <h3 className="mt-1 text-2xl font-semibold text-[#173d2b]">
                      {[member.title, member.first_name, member.last_name].filter(Boolean).join(' ') || 'Unnamed member'}
                    </h3>
                    {member.chinese_name ? (
                      <p className="mt-1 text-base text-[#5d6a7d]">{member.chinese_name}</p>
                    ) : null}
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    {member.status || 'active'}
                  </span>
                </div>
                <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <Info label="Code" value={member.membership_number} />
                  <Info label="Type" value={member.membership_type} />
                  <Info label="Expiry" value={member.expires_at ? new Date(member.expires_at).toLocaleDateString() : null} />
                  <Info label="Phone" value={member.phone} />
                  <Info label="Email" value={member.email} />
                </dl>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-xl border border-[#edf1eb] bg-[#fbfcfb] px-4 py-3">
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#7a8799]">{label}</dt>
      <dd className="mt-1 break-words font-medium text-[#182b45]">{value || '-'}</dd>
    </div>
  )
}

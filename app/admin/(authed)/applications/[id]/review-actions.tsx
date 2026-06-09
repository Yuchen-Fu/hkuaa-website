'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReviewActions({
  id,
  canDelete,
  showReview,
}: {
  id: string
  canDelete: boolean
  showReview: boolean
}) {
  const router = useRouter()
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState<'approve' | 'reject' | 'delete' | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function act(which: 'approve' | 'reject') {
    if (which === 'reject' && !confirm('Reject this application?')) return
    setLoading(which)
    setErr(null)

    const res = await fetch(`/api/admin/applications/${id}/${which}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notes.trim() || null }),
    })
    const json = await res.json().catch(() => ({}))
    setLoading(null)

    if (!res.ok) {
      setErr(json.error ?? 'Action failed')
      return
    }
    router.refresh()
  }

  async function deleteApplication() {
    if (!confirm('Permanently delete this application? This cannot be undone.')) return
    setLoading('delete')
    setErr(null)

    const res = await fetch(`/api/admin/applications/${id}`, {
      method: 'DELETE',
    })
    const json = await res.json().catch(() => ({}))
    setLoading(null)

    if (!res.ok) {
      setErr(json.error ?? 'Delete failed')
      return
    }
    router.push('/admin/applications')
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {showReview ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Review decision</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add optional internal notes, then approve or reject this application.
            </p>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional review notes (visible to staff only)…"
            rows={3}
            className="mt-5 w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200/70"
          />
          {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => act('approve')}
              disabled={loading !== null}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading === 'approve' ? 'Approving…' : 'Approve'}
            </button>
            <button
              onClick={() => act('reject')}
              disabled={loading !== null}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading === 'reject' ? 'Rejecting…' : 'Reject'}
            </button>
          </div>
        </div>
      ) : null}

      {canDelete ? (
        <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-red-700">Admin controls</h2>
          <p className="mt-1 text-sm text-gray-500">
            Full administrators can permanently remove an application record.
          </p>
          {!showReview && err ? <p className="text-red-600 text-sm mt-2">{err}</p> : null}
          <button
            onClick={deleteApplication}
            disabled={loading !== null}
            className="mt-4 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
          >
            {loading === 'delete' ? 'Deleting…' : 'Delete application'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

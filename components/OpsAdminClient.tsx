"use client";

import { useRouter } from "next/navigation";

type AppRecord = {
  id: string;
  createdAt: string;
  chineseName: string;
  englishName: string;
  email: string;
  membershipType: string;
  status: string;
};

type EventRecord = {
  id: string;
  title: string;
  eventDate: string;
  summary: string;
  status: "draft" | "published";
};

type NewsRecord = {
  id: string;
  title: string;
  summary: string;
  status: "draft" | "published";
};

export default function OpsAdminClient({
  apps,
  events,
  news,
}: {
  apps: AppRecord[];
  events: EventRecord[];
  news: NewsRecord[];
}) {
  const router = useRouter();

  async function review(id: string, action: "under_review" | "approve" | "reject") {
    await fetch(`/api/applications/${id}/review`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action }),
    });
    router.refresh();
  }

  return (
    <>
      <section className="module-card mt-8 p-6">
        <h2 className="text-xl font-semibold">Create Event</h2>
        <form
          className="mt-4 grid gap-3 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
            await fetch("/api/admin/events", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload),
            });
            (event.currentTarget as HTMLFormElement).reset();
            router.refresh();
          }}
        >
          <input name="title" required placeholder="Event title" className="rounded border border-[#cfdbf7] px-3 py-2 text-sm" />
          <input name="eventDate" required type="date" className="rounded border border-[#cfdbf7] px-3 py-2 text-sm" />
          <textarea name="summary" required placeholder="Summary" rows={3} className="rounded border border-[#cfdbf7] px-3 py-2 text-sm md:col-span-2" />
          <select name="status" defaultValue="published" className="rounded border border-[#cfdbf7] px-3 py-2 text-sm">
            <option value="published">published</option>
            <option value="draft">draft</option>
          </select>
          <button className="btn-brand px-4 py-2 text-sm font-semibold">Save Event</button>
        </form>
      </section>

      <section className="module-card mt-6 p-6">
        <h2 className="text-xl font-semibold">Create News</h2>
        <form
          className="mt-4 grid gap-3 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
            await fetch("/api/admin/news", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload),
            });
            (event.currentTarget as HTMLFormElement).reset();
            router.refresh();
          }}
        >
          <input name="title" required placeholder="News title" className="rounded border border-[#cfdbf7] px-3 py-2 text-sm md:col-span-2" />
          <textarea name="summary" required placeholder="Summary" rows={3} className="rounded border border-[#cfdbf7] px-3 py-2 text-sm md:col-span-2" />
          <select name="status" defaultValue="published" className="rounded border border-[#cfdbf7] px-3 py-2 text-sm">
            <option value="published">published</option>
            <option value="draft">draft</option>
          </select>
          <button className="btn-brand px-4 py-2 text-sm font-semibold">Save News</button>
        </form>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="module-card p-6">
          <h2 className="text-xl font-semibold">Membership Applications</h2>
          <div className="mt-3 space-y-3">
            {apps.length === 0 ? (
              <p className="text-sm text-[#566996]">No applications yet.</p>
            ) : (
              apps.map((app) => (
                <div key={app.id} className="rounded border border-[#dbe5fb] p-3">
                  <p className="text-sm font-medium text-[#213666]">
                    {app.chineseName} / {app.englishName}
                  </p>
                  <p className="text-xs text-[#60739e]">
                    {app.membershipType} | {app.status} | {app.email}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button onClick={() => review(app.id, "under_review")} className="rounded border border-[#bed0fb] px-2 py-1 text-xs">
                      Under review
                    </button>
                    <button onClick={() => review(app.id, "approve")} className="rounded border border-emerald-300 px-2 py-1 text-xs text-emerald-700">
                      Approve
                    </button>
                    <button onClick={() => review(app.id, "reject")} className="rounded border border-red-300 px-2 py-1 text-xs text-red-700">
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="module-card p-6">
          <h2 className="text-xl font-semibold">Published Content Snapshot</h2>
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-[#325086]">Events ({events.length})</h3>
            <ul className="mt-2 space-y-1 text-sm text-[#4f628f]">
              {events.slice(0, 5).map((item) => (
                <li key={item.id}>- {item.title} ({item.status})</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-[#325086]">News ({news.length})</h3>
            <ul className="mt-2 space-y-1 text-sm text-[#4f628f]">
              {news.slice(0, 5).map((item) => (
                <li key={item.id}>- {item.title} ({item.status})</li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </>
  );
}

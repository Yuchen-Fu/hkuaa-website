import type { Metadata } from "next";
import { listCurrentAndUpcomingEvents } from "@/lib/server/services";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and recent HKUAA events.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await listCurrentAndUpcomingEvents("published");

  return (
    <>
      <section className="hero-template">
        <div className="container-max">
          <h1>Events</h1>
          <p>Current and upcoming HKUAA programs.</p>
        </div>
      </section>
      <section className="section-template">
        <div className="container-max">
          <div className="list-clean">
            {events.length === 0 ? (
              <p className="text-sm text-[#5e709b]">No current or upcoming events.</p>
            ) : (
              events.map((item) => (
                <article key={item.id} className="list-clean-item">
                  <span className="badge-date">{item.eventDate}</span>
                  <h2 className="mt-2 text-lg font-medium text-[#203563]">{item.title}</h2>
                  <p className="mt-2 text-sm text-[#4d618e]">{item.summary}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

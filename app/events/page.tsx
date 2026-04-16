import type { Metadata } from "next";
import Image from "next/image";
import { listCurrentAndUpcomingEvents } from "@/lib/server/services";
import { PAGE_THEME_IMAGES } from "@/lib/public-page-images";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and recent HKUAA events.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await listCurrentAndUpcomingEvents("published");

  return (
    <>
      <section className="relative min-h-[220px] overflow-hidden sm:min-h-[280px]">
        <Image
          src={PAGE_THEME_IMAGES.eventsHero}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c33]/88 via-[#0f1c33]/45 to-transparent" />
        <div className="relative z-[1] flex min-h-[220px] flex-col justify-end sm:min-h-[280px]">
          <div className="container-max pb-8 pt-16 text-white">
            <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Events</h1>
            <p className="mt-2 max-w-xl text-sm text-white/88">Current and upcoming HKUAA programmes.</p>
          </div>
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

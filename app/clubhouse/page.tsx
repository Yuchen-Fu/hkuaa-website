import type { Metadata } from "next";
import Image from "next/image";
import { contactPoints } from "@/lib/site-data";
import { PAGE_THEME_IMAGES } from "@/lib/public-page-images";

export const metadata: Metadata = {
  title: "Clubhouse",
  description: "HKUAA clubhouse overview and external dining/reservation links.",
};

export default function ClubhousePage() {
  return (
    <>
      <section className="relative min-h-[260px] overflow-hidden sm:min-h-[320px]">
        <Image
          src={PAGE_THEME_IMAGES.clubhouseHero}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c33]/88 via-[#0f1c33]/55 to-[#0f1c33]/35" />
        <div className="relative z-[1] flex min-h-[260px] items-center sm:min-h-[320px]">
          <div className="container-max py-10 text-white">
            <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">HKUAA Clubhouse</h1>
            <p className="mt-3 max-w-xl text-sm text-white/88">
              Main Restaurant and DB Lounge. Menus, terms, and reservations are handled on the affiliated dining and
              booking systems.
            </p>
          </div>
        </div>
      </section>
      <section className="section-template">
        <div className="container-max grid gap-6 md:grid-cols-2">
          <article className="template-panel overflow-hidden p-0">
            <div className="relative h-52 w-full sm:h-56">
              <Image
                src={PAGE_THEME_IMAGES.clubhouseDiningCard}
                alt="HKUAA Clubhouse Chinese restaurant — lobster and fine dining platter"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-[#10204b]">Dining website</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#465a87]">
                Menus, usage terms, banquet information, and day-to-day operations are maintained on the dining site.
              </p>
              <a className="template-link mt-4 inline-flex" href={contactPoints.diningUrl} target="_blank" rel="noreferrer">
                Open dining website
              </a>
            </div>
          </article>
          <article className="template-panel overflow-hidden p-0">
            <div className="relative h-52 w-full sm:h-56">
              <Image
                src={PAGE_THEME_IMAGES.clubhouseLoungeCard}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-[#10204b]">Reservation</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#465a87]">
                Table and venue bookings use the current external booking platform.
              </p>
              <a className="template-link mt-4 inline-flex" href={contactPoints.bookingUrl} target="_blank" rel="noreferrer">
                Online reservation (external)
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { contactPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Clubhouse",
  description: "HKUAA clubhouse overview and external dining/reservation links.",
};

export default function ClubhousePage() {
  return (
    <>
      <section className="hero-template">
        <div className="container-max">
          <h1>HKUAA Clubhouse</h1>
          <p>Main Restaurant and DB Lounge, with reservation and dining operations on affiliated systems.</p>
        </div>
      </section>
      <section className="section-template">
        <div className="container-max grid gap-6 md:grid-cols-2">
          <article className="template-panel">
            <div className="template-image-block" />
            <h2 className="mt-4 text-xl font-semibold">Dining Website</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#465a87]">
            Detailed restaurant menu, usage terms, banquet details, and operations remain
            in the affiliated dining site.
            </p>
            <a className="template-link mt-4 inline-flex" href={contactPoints.diningUrl} target="_blank" rel="noreferrer">
              Open Dining Website
            </a>
          </article>
          <article className="template-panel">
            <div className="template-image-block" />
            <h2 className="mt-4 text-xl font-semibold">Reservation</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#465a87]">
            Reservation flow remains on the current external booking platform to avoid
            disruption during MVP launch.
            </p>
            <a className="template-link mt-4 inline-flex" href={contactPoints.bookingUrl} target="_blank" rel="noreferrer">
              Online Reservation (External)
            </a>
          </article>
        </div>
      </section>
    </>
  );
}

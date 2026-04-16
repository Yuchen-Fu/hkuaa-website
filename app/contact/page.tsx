import type { Metadata } from "next";
import { contactPoints } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact HKUAA membership and clubhouse services.",
};

export default function ContactPage() {
  return (
    <>
      <section className="hero-template">
        <div className="container-max">
          <h1>Contact Us</h1>
          <p>Membership service and clubhouse reservation contacts.</p>
        </div>
      </section>
      <section className="section-template">
        <div className="container-max grid gap-6 md:grid-cols-2">
          <article className="template-panel">
            <h2 className="text-xl font-semibold">Membership Service</h2>
            <p className="mt-3 text-sm text-[#4b5f8c]">Tel: {contactPoints.membershipPhone}</p>
            <p className="mt-1 text-sm text-[#4b5f8c]">Email: {contactPoints.membershipEmail}</p>
            <p className="mt-1 text-sm text-[#4b5f8c]">Fax: {contactPoints.fax}</p>
          </article>
          <article className="template-panel">
            <h2 className="text-xl font-semibold">Clubhouse Reservation</h2>
            <p className="mt-3 text-sm text-[#4b5f8c]">Tel / WhatsApp: {contactPoints.clubhousePhone}</p>
            <p className="mt-1 text-sm text-[#4b5f8c]">Email: {contactPoints.clubhouseEmail}</p>
            <a className="template-link mt-4 inline-flex" href={contactPoints.bookingUrl} target="_blank" rel="noreferrer">
              Reservation (External)
            </a>
          </article>
        </div>
        <div className="container-max mt-6">
          <article className="template-panel">
            <h2 className="text-xl font-semibold">Address</h2>
            <p className="mt-3 text-sm text-[#4b5f8c]">{contactPoints.address}</p>
            <div className="map-embed-card">
              <iframe
                title="HKUAA location map"
                src="https://maps.google.com/maps?q=22.28197,114.15598&z=17&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-embed-frame"
              />
            </div>
            <a className="address-map-link" href={contactPoints.mapUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </article>
        </div>
      </section>
    </>
  );
}

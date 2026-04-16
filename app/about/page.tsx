import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About HKUAA history and mission.",
};

export default function AboutPage() {
  return (
    <>
      <section className="hero-template">
        <div className="container-max">
          <h1>About HKUAA</h1>
          <p>History, governance, and alumni community mission.</p>
        </div>
      </section>
      <section className="section-template">
        <div className="container-max">
          <article className="template-panel">
            <p className="leading-relaxed text-[#415581]">
              Established in the 1920s, Hong Kong University Alumni Association is one of the
              longest-standing alumni bodies of The University of Hong Kong. This MVP site
              modernizes membership, events, and service information while preserving operational continuity.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

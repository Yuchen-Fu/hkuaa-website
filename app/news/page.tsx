import type { Metadata } from "next";
import { listNewsWithExternal } from "@/lib/server/services";

export const metadata: Metadata = {
  title: "News",
  description: "HKUAA announcements and updates.",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await listNewsWithExternal("published", 30);

  return (
    <>
      <section className="hero-template">
        <div className="container-max">
          <h1>News</h1>
          <p>Announcements and updates from HKUAA.</p>
        </div>
      </section>
      <section className="section-template">
        <div className="container-max">
          <div className="list-clean">
            {news.length === 0 ? (
              <p className="text-sm text-[#5e709b]">No published news yet.</p>
            ) : (
              news.map((item) => (
                <article key={item.id} className="list-clean-item">
                  <h2 className="text-lg font-medium text-[#223767]">{item.title}</h2>
                  <p className="mt-2 text-sm text-[#4f638f]">{item.summary}</p>
                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="template-link mt-2 inline-flex"
                    >
                      Read on {item.sourceName || "source"}
                    </a>
                  ) : null}
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

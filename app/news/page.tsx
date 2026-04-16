import type { Metadata } from "next";
import Image from "next/image";
import { listNewsWithExternal } from "@/lib/server/services";
import { PAGE_THEME_IMAGES } from "@/lib/public-page-images";

export const metadata: Metadata = {
  title: "News",
  description: "HKUAA announcements and updates.",
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await listNewsWithExternal("published", 30);

  return (
    <>
      <section className="relative min-h-[220px] overflow-hidden sm:min-h-[280px]">
        <Image
          src={PAGE_THEME_IMAGES.newsHero}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c33]/88 via-[#0f1c33]/45 to-transparent" />
        <div className="relative z-[1] flex min-h-[220px] flex-col justify-end sm:min-h-[280px]">
          <div className="container-max pb-8 pt-16 text-white">
            <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">News</h1>
            <p className="mt-2 max-w-xl text-sm text-white/88">Announcements and updates from HKUAA.</p>
          </div>
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

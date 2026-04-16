import type { Metadata } from "next";
import Image from "next/image";
import AboutSectionNav from "@/components/AboutSectionNav";
import {
  ABOUT_CULTURE,
  ABOUT_CORE_VALUES,
  ABOUT_INTRO,
  ABOUT_PURPOSE_BULLETS,
  ABOUT_PURPOSE_NUMBERED,
  ABOUT_THEME_IMAGES,
  ABOUT_VISION,
} from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About HKUAA",
  description: "HKUAA history, vision, purpose, and culture.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[220px] overflow-hidden sm:min-h-[280px]">
        <Image
          src={ABOUT_THEME_IMAGES.hero}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c33]/88 via-[#0f1c33]/45 to-transparent" />
        <div className="relative z-[1] flex min-h-[220px] flex-col justify-end sm:min-h-[280px]">
          <div className="container-max pb-8 pt-16 text-white">
            <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">About HKUAA</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/85">History, vision, and the way we serve members.</p>
          </div>
        </div>
      </section>

      <section className="section-template !pt-8">
        <div className="container-max max-w-4xl space-y-10">
          <AboutSectionNav current="history" />

          <div className="grid gap-8 md:grid-cols-[1fr_minmax(0,280px)] md:items-start md:gap-10">
            <article className="space-y-6 text-sm leading-relaxed text-[#3d4d66]">
              <section id="about-hkuaa">
                <h2 className="font-serif text-xl font-semibold text-[#10204b]">About HKUAA</h2>
                <p className="mt-3">{ABOUT_INTRO}</p>
              </section>
              <section id="vision">
                <h2 className="font-serif text-xl font-semibold text-[#10204b]">Vision</h2>
                <p className="mt-3">{ABOUT_VISION}</p>
              </section>
              <section id="purpose">
                <h2 className="font-serif text-xl font-semibold text-[#10204b]">Purpose</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-[#2b6cb0]">
                  {ABOUT_PURPOSE_NUMBERED.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[#94a3b8]">
                  {ABOUT_PURPOSE_BULLETS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section id="values">
                <h2 className="font-serif text-xl font-semibold text-[#10204b]">Core values</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ABOUT_CORE_VALUES.map((v) => (
                    <li
                      key={v}
                      className="rounded-full border border-[#dfe6ee] bg-[#f7fafc] px-3 py-1 text-xs font-medium text-[#1e2b45]"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </section>
              <section id="culture">
                <h2 className="font-serif text-xl font-semibold text-[#10204b]">Culture</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-[#94a3b8]">
                  {ABOUT_CULTURE.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </article>
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#e8ecf0] shadow-sm">
                <Image
                  src={ABOUT_THEME_IMAGES.community}
                  alt="Alumni and community (illustrative)"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#e8ecf0] shadow-sm">
                <Image
                  src={ABOUT_THEME_IMAGES.handshake}
                  alt="Partnership and collaboration (illustrative)"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutSectionNav from "@/components/AboutSectionNav";
import { ABOUT_THEME_IMAGES, SUBCOMMITTEES } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "Subcommittees",
  description: "HKUAA subcommittees and interest groups.",
};

export default function SubcommitteesPage() {
  return (
    <>
      <section className="relative min-h-[180px] overflow-hidden sm:min-h-[200px]">
        <Image
          src={ABOUT_THEME_IMAGES.subcommitteesBanner}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0f1c33]/55" />
        <div className="relative z-[1] flex min-h-[180px] items-end sm:min-h-[200px]">
          <div className="container-max pb-6">
            <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">Subcommittees</h1>
          </div>
        </div>
      </section>

      <section className="section-template !pt-8">
        <div className="container-max max-w-2xl space-y-8">
          <AboutSectionNav current="subcommittees" />

          <p className="text-sm text-[#5a6d8f]">Where a public link is available, it opens in a new tab.</p>

          <ul className="divide-y divide-[#eef2f6] rounded-lg border border-[#e8ecf0] bg-white text-sm text-[#334155]">
            {SUBCOMMITTEES.map((item) => (
              <li key={item.name} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3.5">
                <span className="font-medium text-[#1e2b45]">{item.name}</span>
                {item.href ? (
                  <a className="template-link shrink-0 text-xs font-medium sm:text-sm" href={item.href} target="_blank" rel="noreferrer">
                    {item.href.includes("facebook.com") ? "Facebook group" : "External link"}
                  </a>
                ) : (
                  <span className="text-xs text-[#b0bccf]">—</span>
                )}
              </li>
            ))}
          </ul>

          <p className="text-xs text-[#7d8daf]">
            <Link className="template-link" href="/about">
              ← About HKUAA
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

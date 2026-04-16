import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutSectionNav from "@/components/AboutSectionNav";
import { OFFICE_BEARERS_IMAGES, OFFICE_BEARERS_PDF_URL } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "Office Bearers",
  description: "HKUAA Executive Committee list (2024–2025).",
};

export default function OfficeBearersPage() {
  return (
    <section className="section-template !pt-8">
      <div className="container-max max-w-3xl space-y-8">
        <AboutSectionNav current="office-bearers" />

        <header>
          <h1 className="font-serif text-3xl font-semibold text-[#10204b]">Office Bearers for 2024–2025</h1>
          <p className="mt-2 text-sm text-[#5a6d8f]">Executive Committee list and photographs.</p>
        </header>

        <div className="relative h-16 w-full max-w-3xl overflow-hidden rounded-lg border border-[#e8ecf0] sm:h-[4.75rem]">
          <Image
            src={OFFICE_BEARERS_IMAGES.bannerStrip}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 768px"
            unoptimized
          />
        </div>

        <div>
          <a className="btn-brand" href={OFFICE_BEARERS_PDF_URL} target="_blank" rel="noreferrer">
            HKUAA 2024–25 ExCo list (PDF)
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#e8ecf0] shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-[#f0f2f6]">
            <Image
              src={OFFICE_BEARERS_IMAGES.groupPhoto}
              alt="HKUAA Executive Committee group photo"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
        </div>

        <p className="text-xs text-[#7d8daf]">
          <Link className="template-link" href="/about">
            ← Back to About HKUAA
          </Link>
        </p>
      </div>
    </section>
  );
}

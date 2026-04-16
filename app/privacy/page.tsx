import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "HKUAA website privacy information.",
};

export default function PrivacyPage() {
  return (
    <section className="section-template">
      <div className="container-max max-w-3xl">
        <h1 className="text-2xl font-semibold text-[#10204b]">Privacy</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#4d5f7a]">
          This page will set out how the Association handles personal data in connection with this website. Content is
          pending final legal review.
        </p>
        <p className="mt-6 text-sm">
          <Link className="template-link" href="/">
            Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "HKUAA website terms of use.",
};

export default function TermsOfUsePage() {
  return (
    <section className="section-template">
      <div className="container-max max-w-3xl">
        <h1 className="text-2xl font-semibold text-[#10204b]">Terms of Use</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#4d5f7a]">
          This page will describe the terms governing use of this website. Content is pending final legal review.
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

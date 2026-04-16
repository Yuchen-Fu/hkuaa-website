import type { Metadata } from "next";
import Link from "next/link";
import MembershipScheduleExplorer from "@/components/MembershipScheduleExplorer";
import { MEMBERSHIP_HUB_ROWS, MEMBERSHIP_NOTICE_GROUPS } from "@/lib/membership-hub-content";

export const metadata: Metadata = {
  title: "Membership",
  description: "HKUAA official membership categories, fees, registration channels, and eligibility.",
};

export default function MembershipPage() {
  return (
    <>
      <section className="hero-template">
        <div className="container-max max-w-3xl">
          <h1>Membership</h1>
          <p className="text-[#4d618f]">
            This site publishes the Association&apos;s membership schedule. Eligible persons may complete member
            registration online where provided; remaining categories shall use the prescribed application forms
            supplied in PDF format.
          </p>
          <div className="mt-6">
            <Link href="/membership/apply" className="btn-brand">
              Member registration
            </Link>
          </div>
        </div>
      </section>

      <section className="section-template border-t border-[#e8edf5] bg-[#f7fafc] py-8 md:py-10">
        <div className="container-max max-w-4xl">
          <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-[#0c1f3d] md:text-[1.65rem]">
            Membership categories
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#2b6cb0] via-[#4a7ab5] to-[#8b6d30]" />

          <MembershipScheduleExplorer rows={MEMBERSHIP_HUB_ROWS} />
        </div>
      </section>

      <section className="section-template border-t border-[#e2e8f0] bg-[#f0f4fa]">
        <div className="container-max">
          <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-[#0c1f3d] md:text-[1.65rem]">
            Fees, eligibility, and processing
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#2b6cb0] via-[#4a7ab5] to-[#8b6d30]" />

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10">
            {MEMBERSHIP_NOTICE_GROUPS.map((group, index) => (
              <article
                key={group.id}
                className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-[0_12px_40px_-12px_rgba(15,45,77,0.12)] backdrop-blur-sm md:p-8"
              >
                <div className="flex flex-col gap-1 border-b border-[#e8eef6] pb-4">
                  <span
                    className={`text-[0.65rem] font-bold uppercase tracking-[0.22em] ${
                      index === 0 ? "text-[#2b6cb0]" : "text-[#8b6d30]"
                    }`}
                  >
                    {index === 0 ? "Schedule" : "Administration"}
                  </span>
                  <h3 className="font-serif text-xl font-semibold leading-snug text-[#10204b] md:text-2xl">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#3d4d66] md:text-[0.9375rem]">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${index === 0 ? "bg-[#2b6cb0]" : "bg-[#8b6d30]"}`}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-[#5a6d8f]">
            Ordinary membership eligibility is determined in accordance with{" "}
            <a
              className="template-link font-medium text-[#1a4a7a]"
              href="http://www4.hku.hk/pubunit/calendar/2015-2016/a/c/21-2015-2016/328-university-ordinance-statutes"
              target="_blank"
              rel="noreferrer"
            >
              Statutes III of the University of Hong Kong Ordinance and Statutes
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

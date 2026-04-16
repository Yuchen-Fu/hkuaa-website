"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { HubMembershipRow } from "@/lib/membership-hub-content";

type Props = {
  rows: readonly HubMembershipRow[];
};

/** Row label + value share line-height so first lines stay aligned. */
const rowLeading = "leading-snug";

function DetailBlock({
  label,
  labelTone,
  ddClassName,
  children,
}: {
  label: string;
  labelTone?: "default" | "gold";
  /** Extra classes for <dd> (e.g. prose blocks: font-normal). */
  ddClassName?: string;
  children: ReactNode;
}) {
  const labelClass =
    labelTone === "gold"
      ? `text-xs font-medium uppercase tracking-[0.12em] ${rowLeading} text-[#9a7b48]`
      : `text-xs font-medium uppercase tracking-[0.12em] ${rowLeading} text-[#8b97ad]`;
  const ddBase = `min-w-0 text-xs font-medium ${rowLeading} text-[#1a2433] [&_a]:text-xs [&_a]:font-medium [&_a]:leading-[inherit]`;
  return (
    <>
      <dt className={labelClass}>{label}</dt>
      <dd className={`${ddBase} ${ddClassName ?? ""}`.trim()}>{children}</dd>
    </>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 6L8 12l6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navBtnClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4dce8] bg-white text-[#1a3d66] shadow-sm transition hover:border-[#2b6cb0] hover:bg-[#f4f8fc] hover:text-[#10204b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b6cb0] disabled:pointer-events-none disabled:opacity-35";

/** Long copy: same size as row labels for alignment; normal weight for readability. */
const ddProseClass = "text-xs font-normal leading-snug text-[#3d4d66] [&_p+p]:mt-1.5 [&_p+p]:leading-relaxed";

export default function MembershipScheduleExplorer({ rows }: Props) {
  const n = rows.length;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + n * 10) % n);
    },
    [n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const row = rows[index];

  return (
    <div className="mt-6">
      <div className="flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Membership types">
        {rows.map((r, i) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`rounded-full px-2.5 py-1 text-[0.6875rem] font-medium transition sm:px-3 sm:text-xs ${
              i === index
                ? "bg-[#10204b] text-white shadow-sm"
                : "border border-[#dce3ee] bg-white text-[#4d618f] hover:border-[#2b6cb0] hover:text-[#10204b]"
            }`}
            onClick={() => setIndex(i)}
          >
            {r.title.replace(" Member", "")}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col items-stretch gap-3 lg:mt-3 lg:flex-row lg:items-stretch lg:gap-2">
        <button
          type="button"
          className={`${navBtnClass} order-2 hidden self-center lg:inline-flex`}
          aria-label="Previous membership type"
          onClick={() => go(-1)}
          disabled={n <= 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <article
          className="order-1 min-w-0 flex-1 rounded-xl border border-[#e4eaf2] bg-white/95 p-4 shadow-sm sm:p-5 lg:order-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <header className="pb-3">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#7d8daf]">Membership category</p>
            <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg font-semibold tracking-tight text-[#10204b] sm:text-xl">{row.title}</h3>
              <span className="text-xs font-medium tabular-nums text-[#b0bccf]">{index + 1}/{n}</span>
            </div>
          </header>

          <dl className="grid grid-cols-[minmax(8.25rem,9.75rem)_1fr] items-start gap-x-5 gap-y-2.5 sm:grid-cols-[minmax(9rem,10.5rem)_1fr]">
            <DetailBlock label="Entrance fee">{row.entranceFee}</DetailBlock>
            <DetailBlock label="Subscription">{row.subscriptionFee}</DetailBlock>
            <DetailBlock label="Eligibility" ddClassName={ddProseClass}>
              <div>
                {row.requirements.map((t, i) => (
                  <p key={t} className={i > 0 ? "mt-2 leading-relaxed" : "leading-snug"}>
                    {t}
                  </p>
                ))}
              </div>
            </DetailBlock>
            {row.benefits && row.benefits.length > 0 ? (
              <DetailBlock label="Benefits" labelTone="gold" ddClassName={ddProseClass}>
                <div>
                  {row.benefits.map((t, i) => (
                    <p key={t} className={i > 0 ? "mt-2 leading-relaxed" : "leading-snug"}>
                      {t}
                    </p>
                  ))}
                </div>
              </DetailBlock>
            ) : null}
            <DetailBlock label="Application" ddClassName="[&_.application-stack]:flex [&_.application-stack]:flex-col [&_.application-stack]:gap-1.5">
              <div className="application-stack">
                {row.applyHref ? (
                  <Link className="template-link font-medium text-[#1a4a7a] underline-offset-2 hover:underline" href={row.applyHref}>
                    Apply online
                  </Link>
                ) : null}
                {row.pdfHref ? (
                  <a
                    className="template-link font-medium text-[#1a4a7a] underline-offset-2 hover:underline"
                    href={row.pdfHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    PDF form
                  </a>
                ) : null}
                {!row.applyHref && !row.pdfHref ? (
                  <span className="font-normal text-[#94a3b8]">Contact Membership Service.</span>
                ) : null}
              </div>
            </DetailBlock>
          </dl>
        </article>

        <button
          type="button"
          className={`${navBtnClass} order-3 hidden self-center lg:inline-flex`}
          aria-label="Next membership type"
          onClick={() => go(1)}
          disabled={n <= 1}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 lg:hidden">
        <button type="button" className={navBtnClass} aria-label="Previous membership type" onClick={() => go(-1)} disabled={n <= 1}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" className={navBtnClass} aria-label="Next membership type" onClick={() => go(1)} disabled={n <= 1}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

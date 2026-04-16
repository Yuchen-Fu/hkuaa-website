import Link from "next/link";
import { contactPoints } from "@/lib/site-data";

const FRIEND_SITES = [
  { label: "HKU", href: "https://www.hku.hk/" },
  { label: "HKU Alumni", href: "https://www.alumni.hku.hk/" },
  { label: "HKU AA Dining", href: "https://www.hkuaadining.hk/" },
] as const;

function InlineLinks({
  items,
}: {
  items: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-[#3d4d66]">
      {items.map((item, i) => (
        <span key={item.href} className="inline-flex items-center">
          {i > 0 ? <span className="mx-2 text-[#c5cdd9]" aria-hidden>|</span> : null}
          {item.external ? (
            <a className="template-link font-medium text-[#1a4a7a]" href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <Link className="template-link font-medium text-[#1a4a7a]" href={item.href}>
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function Footer() {
  const aboutItems = [
    { label: "About HKUAA", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ] as const;

  const friendNav = FRIEND_SITES.map((s) => ({ ...s, external: true as const }));

  return (
    <footer className="site-footer">
      <div className="container-max border-b border-[#e8ecf0] py-9 md:py-10">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-[#6b7c99]">Friend sites</h3>
              <div className="mt-3">
                <InlineLinks items={friendNav} />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-[#6b7c99]">About this site</h3>
              <div className="mt-3">
                <InlineLinks items={[...aboutItems]} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
            <div className="rounded-lg border border-[#e4eaf0] bg-[#f9fbfd] px-4 py-3.5">
              <p className="text-xs font-semibold text-[#1e2b45]">Membership</p>
              <p className="mt-2 text-xs leading-snug text-[#4d5f7a]">
                <a className="template-link" href={`tel:+852${contactPoints.membershipPhone.replace(/\s/g, "")}`}>
                  {contactPoints.membershipPhone}
                </a>
                <span className="text-[#c5cdd9]"> · </span>
                <a className="template-link" href={`mailto:${contactPoints.membershipEmail}`}>
                  {contactPoints.membershipEmail}
                </a>
              </p>
              <p className="mt-1.5 text-xs text-[#6b7c99]">Fax {contactPoints.fax}</p>
            </div>
            <div className="rounded-lg border border-[#e4eaf0] bg-[#f9fbfd] px-4 py-3.5">
              <p className="text-xs font-semibold text-[#1e2b45]">Clubhouse</p>
              <p className="mt-2 text-xs leading-snug text-[#4d5f7a]">
                <a className="template-link" href={`tel:+852${contactPoints.clubhousePhone.replace(/\s/g, "")}`}>
                  {contactPoints.clubhousePhone}
                </a>
                <span className="text-[#c5cdd9]"> · </span>
                <a className="template-link" href={`mailto:${contactPoints.clubhouseEmail}`}>
                  {contactPoints.clubhouseEmail}
                </a>
              </p>
              <p className="mt-2">
                <a className="template-link text-xs font-medium" href={contactPoints.bookingUrl} target="_blank" rel="noreferrer">
                  Reserve online
                </a>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[#5a6d8a] md:mt-9">
          <span className="font-medium text-[#4d618f]">Address</span>
          <span className="mx-2 text-[#c5cdd9]">·</span>
          {contactPoints.address}
          <span className="mx-2 text-[#c5cdd9]">·</span>
          <a className="template-link font-medium" href={contactPoints.mapUrl} target="_blank" rel="noreferrer">
            Maps
          </a>
        </p>
      </div>
      <div className="py-3.5 text-center text-[0.7rem] text-[#8b96ab]">
        © 2026 Hong Kong University Alumni Association. All Rights Reserved.
      </div>
    </footer>
  );
}

import Link from "next/link";

type Section = "history" | "office-bearers" | "subcommittees";

const LINKS: { id: Section; href: string; label: string }[] = [
  { id: "history", href: "/about", label: "HKUAA History" },
  { id: "office-bearers", href: "/about/office-bearers", label: "Office Bearers" },
  { id: "subcommittees", href: "/about/subcommittees", label: "Subcommittees" },
];

export default function AboutSectionNav({ current }: { current: Section }) {
  return (
    <nav className="flex flex-wrap gap-2 border-b border-[#e4eaf0] pb-4" aria-label="About section">
      {LINKS.map((item) => {
        const active = item.id === current;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-[#10204b] text-white"
                : "border border-[#dce3ee] bg-white text-[#4d618f] hover:border-[#2b6cb0]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

import type { ReactNode } from "react";

export default function MembershipSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-lg border border-[#e3e8f0] bg-[#fafbfd] p-4 md:p-5">
      <legend className="px-1 text-base font-bold text-[#0c3050]">{title}</legend>
      <div className="mt-4 grid gap-4">{children}</div>
    </fieldset>
  );
}

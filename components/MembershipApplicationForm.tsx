"use client";

import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { membershipTypes } from "@/lib/site-data";
import MembershipAssociateAcademicBlock from "@/components/membership/MembershipAssociateAcademicBlock";
import MembershipContactDualFields from "@/components/membership/MembershipContactDualFields";
import MembershipOrdinaryAcademicBlock from "@/components/membership/MembershipOrdinaryAcademicBlock";
import MembershipPersonalCoreFields from "@/components/membership/MembershipPersonalCoreFields";
import MembershipSection from "@/components/membership/MembershipSection";
import MembershipStudentAcademicBlock from "@/components/membership/MembershipStudentAcademicBlock";
import MembershipStudentContactFields from "@/components/membership/MembershipStudentContactFields";
import { inputClass, labelClass } from "@/components/membership/membership-form-styles";

type MembershipKey = (typeof membershipTypes)[number]["key"];

type State =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; appId: string; message: string }
  | { type: "error"; message: string };

export default function MembershipApplicationForm() {
  const [selectedType, setSelectedType] = useState<MembershipKey>(membershipTypes[0].key);
  const [state, setState] = useState<State>({ type: "idle" });
  const [chineseNA, setChineseNA] = useState(false);
  const [contactByMailTo, setContactByMailTo] = useState<"residence" | "correspondence">("residence");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const info = useMemo(
    () => membershipTypes.find((item) => item.key === selectedType),
    [selectedType],
  );

  const isOrdinary = selectedType === "ordinary";
  const isAssociate = selectedType === "associate";
  const isStudent = selectedType === "student";
  const isLife = selectedType === "life";

  return (
    <div className="template-panel">
      <div className="border-b border-[#e4e9f1] pb-4">
        <h2 className="text-2xl font-semibold text-[#10204b]">Online Membership Registration</h2>
        {isOrdinary ? (
          <p className="mt-2 text-sm leading-relaxed text-[#4b5b78]">
            <span className="font-semibold text-[#22314d]">Ordinary members.</span> Items marked (
            <span className="text-red-600">*</span>) are mandatory for online submission. If you wish to submit by
            fax, you may use the{" "}
            <a
              className="template-link font-semibold"
              href="https://www.hkuaa.org.hk/download/Ord_mem_2013.pdf"
              target="_blank"
              rel="noreferrer"
            >
              official PDF form
            </a>{" "}
            on hkuaa.org.hk.
          </p>
        ) : null}
        {isAssociate ? (
          <p className="mt-2 text-sm leading-relaxed text-[#4b5b78]">
            <span className="font-semibold text-[#22314d]">Associate members.</span> If you have attained a first or any
            degree in HKU, you should apply for Ordinary membership instead. Items marked (<span className="text-red-600">*</span>)
            are mandatory. Fax option:{" "}
            <a
              className="template-link font-semibold"
              href="https://www.hkuaa.org.hk/download/Associate_mem_2013.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Associate PDF form
            </a>
            .
          </p>
        ) : null}
        {isStudent ? (
          <p className="mt-2 text-sm leading-relaxed text-[#4b5b78]">
            <span className="font-semibold text-[#22314d]">Student members.</span> If you have attained a degree in
            HKU, apply for Ordinary membership instead. Items marked (<span className="text-red-600">*</span>) are
            mandatory.
          </p>
        ) : null}
        {isLife ? (
          <p className="mt-2 text-sm text-[#566996]">
            Life membership uses a short online request here; full documentation may be requested after review.
          </p>
        ) : null}
      </div>

      <form
        className="mt-6 flex flex-col gap-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const token = siteKey ? recaptchaRef.current?.getValue() : "disabled";
          if (siteKey && !token) {
            setState({ type: "error", message: "Please complete the reCAPTCHA." });
            return;
          }

          const form = event.currentTarget;
          const fd = new FormData(form);
          const payload: Record<string, unknown> = { recaptchaToken: token };

          for (const [k, v] of fd.entries()) {
            if (typeof v === "string") payload[k] = v;
          }

          if (chineseNA) payload.chineseNameNA = "1";

          setState({ type: "submitting" });

          const response = await fetch("/api/applications", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });
          const data = (await response.json().catch(() => ({}))) as {
            error?: string;
            message?: string;
            application?: { id: string };
          };
          if (!response.ok || !data.application) {
            setState({ type: "error", message: data.error ?? "Submission failed." });
            recaptchaRef.current?.reset();
            return;
          }
          setState({
            type: "success",
            appId: data.application.id,
            message: data.message ?? "Submitted.",
          });
          form.reset();
          setChineseNA(false);
          setContactByMailTo("residence");
          recaptchaRef.current?.reset();
        }}
      >
        <div className="grid gap-2">
          <label className={labelClass} htmlFor="membershipTypeSelect">
            Membership category
          </label>
          <select
            id="membershipTypeSelect"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value as MembershipKey);
              setState({ type: "idle" });
            }}
            className={inputClass}
          >
            {membershipTypes.map((type) => (
              <option key={type.key} value={type.key}>
                {type.title}
              </option>
            ))}
          </select>
          <input type="hidden" name="membershipType" value={selectedType} readOnly />
        </div>

        {info ? (
          <p className="rounded-md border border-[#e4eaf4] bg-[#f4f7fc] px-3 py-2 text-xs text-[#496097]">
            {info.eligibility} | {info.fee}
          </p>
        ) : null}

        {isOrdinary ? (
          <>
            <MembershipSection title="Personal Information">
              <div className="grid gap-4 md:grid-cols-2">
                <MembershipPersonalCoreFields
                  chineseNA={chineseNA}
                  onChineseNAChange={setChineseNA}
                  showNameInHku
                />
              </div>
            </MembershipSection>
            <MembershipOrdinaryAcademicBlock />
            <MembershipSection title="Contact information">
              <div className="grid gap-4 md:grid-cols-2">
                <MembershipContactDualFields
                  contactByMailTo={contactByMailTo}
                  onContactByMailToChange={setContactByMailTo}
                />
              </div>
            </MembershipSection>
            <MembershipSection title="Other HKU alumni bodies">
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="otherAlumniBodies">
                  Membership at other HKU alumni bodies
                </label>
                <textarea
                  id="otherAlumniBodies"
                  name="otherAlumniBodies"
                  rows={3}
                  className={`mt-1 ${inputClass}`}
                  placeholder="If applicable, list societies or bodies you are already a member of."
                />
              </div>
            </MembershipSection>
            <div>
              <label className={labelClass} htmlFor="notes">
                Additional remarks (optional)
              </label>
              <textarea id="notes" name="notes" rows={3} className={`mt-1 ${inputClass}`} />
            </div>
          </>
        ) : null}

        {isAssociate ? (
          <>
            <MembershipSection title="Personal Information">
              <div className="grid gap-4 md:grid-cols-2">
                <MembershipPersonalCoreFields chineseNA={chineseNA} onChineseNAChange={setChineseNA} />
              </div>
            </MembershipSection>
            <MembershipAssociateAcademicBlock />
            <MembershipSection title="Contact information">
              <div className="grid gap-4 md:grid-cols-2">
                <MembershipContactDualFields
                  contactByMailTo={contactByMailTo}
                  onContactByMailToChange={setContactByMailTo}
                />
              </div>
            </MembershipSection>
            <div>
              <label className={labelClass} htmlFor="notes">
                Additional remarks (optional)
              </label>
              <textarea id="notes" name="notes" rows={3} className={`mt-1 ${inputClass}`} />
            </div>
          </>
        ) : null}

        {isStudent ? (
          <>
            <MembershipSection title="Personal Information">
              <div className="grid gap-4 md:grid-cols-2">
                <MembershipPersonalCoreFields chineseNA={chineseNA} onChineseNAChange={setChineseNA} />
              </div>
            </MembershipSection>
            <MembershipStudentAcademicBlock />
            <MembershipSection title="Contact information">
              <div className="grid gap-4 md:grid-cols-2">
                <MembershipStudentContactFields />
              </div>
            </MembershipSection>
            <div>
              <label className={labelClass} htmlFor="notes">
                Additional remarks (optional)
              </label>
              <textarea id="notes" name="notes" rows={3} className={`mt-1 ${inputClass}`} />
            </div>
          </>
        ) : null}

        {isLife ? (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input required name="chineseName" placeholder="Chinese name *" className={inputClass} />
              <input required name="englishName" placeholder="English name *" className={inputClass} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input required type="email" name="email" placeholder="Email *" className={inputClass} />
              <input required name="mobile" placeholder="Mobile *" className={inputClass} />
            </div>
            <textarea name="notes" rows={3} placeholder="Notes (optional)" className={inputClass} />
          </div>
        ) : null}

        <div className="rounded-lg border border-[#dfe6ee] bg-white p-4">
          {!siteKey ? (
            <p className="text-sm text-amber-800">
              reCAPTCHA is not configured. Set{" "}
              <code className="rounded bg-amber-100 px-1 py-0.5">NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> and{" "}
              <code className="rounded bg-amber-100 px-1 py-0.5">RECAPTCHA_SECRET_KEY</code> in your environment for
              production.
            </p>
          ) : (
            <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} theme="light" size="normal" />
          )}
        </div>

        <button
          type="submit"
          disabled={state.type === "submitting"}
          className="btn-brand px-6 py-3 text-sm font-semibold disabled:opacity-60"
        >
          {state.type === "submitting" ? "Submitting…" : "Submit application"}
        </button>
      </form>

      {state.type === "success" ? (
        <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {state.message} Reference: {state.appId}
        </div>
      ) : null}
      {state.type === "error" ? (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.message}
        </div>
      ) : null}
    </div>
  );
}

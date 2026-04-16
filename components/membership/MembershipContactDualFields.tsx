import { inputClass, labelClass } from "./membership-form-styles";

type Props = {
  contactByMailTo: "residence" | "correspondence";
  onContactByMailToChange: (v: "residence" | "correspondence") => void;
};

export default function MembershipContactDualFields({ contactByMailTo, onContactByMailToChange }: Props) {
  return (
    <>
      <p className="md:col-span-2 text-sm text-[#5a667e]">
        <span className="font-semibold">Remarks:</span> PO Box address is not acceptable. Please choose where HKUAA
        should primarily send information.
      </p>
      <div className="md:col-span-2">
        <span className={labelClass}>
          Email / mail to <span className="text-red-600">*</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-6 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="contactByMailTo"
              value="residence"
              checked={contactByMailTo === "residence"}
              onChange={() => onContactByMailToChange("residence")}
              required
              className="accent-[#004439]"
            />
            Residence
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="contactByMailTo"
              value="correspondence"
              checked={contactByMailTo === "correspondence"}
              onChange={() => onContactByMailToChange("correspondence")}
              className="accent-[#004439]"
            />
            Correspondence
          </label>
        </div>
      </div>

      <div className="md:col-span-2 grid gap-4 border-t border-[#e4e9f1] pt-4">
        <p className="text-sm font-bold text-[#1e3358]">Residence</p>
        <div>
          <label className={labelClass} htmlFor="residenceAddress">
            Address <span className="text-red-600">*</span>
          </label>
          <textarea id="residenceAddress" name="residenceAddress" required rows={3} className={`mt-1 ${inputClass}`} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="residenceTel">
              Tel <span className="text-red-600">*</span>{" "}
              <span className="font-normal text-[#6f788f]">(no &quot;-&quot; or space)</span>
            </label>
            <input id="residenceTel" name="residenceTel" required className={`mt-1 ${inputClass}`} />
          </div>
          <div>
            <label className={labelClass} htmlFor="residenceFax">
              Fax <span className="font-normal text-[#6f788f]">(no &quot;-&quot; or space)</span>
            </label>
            <input id="residenceFax" name="residenceFax" className={`mt-1 ${inputClass}`} />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="residenceEmail">
            Frequently used email <span className="text-red-600">*</span>
          </label>
          <input id="residenceEmail" name="residenceEmail" type="email" required className={`mt-1 ${inputClass}`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="residenceEmailAlt">
            Alternative email
          </label>
          <input id="residenceEmailAlt" name="residenceEmailAlt" type="email" className={`mt-1 ${inputClass}`} />
        </div>
      </div>

      <div className="md:col-span-2 grid gap-4 border-t border-[#e4e9f1] pt-4">
        <p className="text-sm font-bold text-[#1e3358]">Correspondence</p>
        <div>
          <label className={labelClass} htmlFor="correspondenceAddress">
            Address {contactByMailTo === "correspondence" ? <span className="text-red-600">*</span> : null}
          </label>
          <textarea
            id="correspondenceAddress"
            name="correspondenceAddress"
            required={contactByMailTo === "correspondence"}
            rows={3}
            className={`mt-1 ${inputClass}`}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="correspondenceTel">
              Tel {contactByMailTo === "correspondence" ? <span className="text-red-600">*</span> : null}
            </label>
            <input
              id="correspondenceTel"
              name="correspondenceTel"
              required={contactByMailTo === "correspondence"}
              className={`mt-1 ${inputClass}`}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="correspondenceFax">
              Fax
            </label>
            <input id="correspondenceFax" name="correspondenceFax" className={`mt-1 ${inputClass}`} />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="correspondenceEmail">
            Frequently used email {contactByMailTo === "correspondence" ? <span className="text-red-600">*</span> : null}
          </label>
          <input
            id="correspondenceEmail"
            name="correspondenceEmail"
            type="email"
            required={contactByMailTo === "correspondence"}
            className={`mt-1 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="correspondenceEmailAlt">
            Alternative email
          </label>
          <input id="correspondenceEmailAlt" name="correspondenceEmailAlt" type="email" className={`mt-1 ${inputClass}`} />
        </div>
      </div>

      <div className="md:col-span-2 border-t border-[#e4e9f1] pt-4">
        <label className={labelClass} htmlFor="mobile">
          Mobile <span className="text-red-600">*</span>{" "}
          <span className="font-normal text-[#6f788f]">(no &quot;-&quot; or space)</span>
        </label>
        <input id="mobile" name="mobile" required className={`mt-1 max-w-md ${inputClass}`} />
      </div>
    </>
  );
}

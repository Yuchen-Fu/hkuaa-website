import { inputClass, labelClass } from "./membership-form-styles";

/** Student form: single home block (canonical keys match ordinary residence fields for DB). */
export default function MembershipStudentContactFields() {
  return (
    <>
      <p className="md:col-span-2 text-sm text-[#5a667e]">
        <span className="font-semibold">Remarks:</span> PO Box address and hall address are not acceptable.
      </p>
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="residenceAddress">
          Home address <span className="text-red-600">*</span>
        </label>
        <textarea id="residenceAddress" name="residenceAddress" required rows={3} className={`mt-1 ${inputClass}`} />
      </div>
      <div>
        <label className={labelClass} htmlFor="mobile">
          Mobile <span className="text-red-600">*</span>{" "}
          <span className="font-normal text-[#6f788f]">(no &quot;-&quot; or space)</span>
        </label>
        <input id="mobile" name="mobile" required className={`mt-1 ${inputClass}`} />
      </div>
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
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="residenceEmail">
          Frequently used email <span className="text-red-600">*</span>
        </label>
        <input id="residenceEmail" name="residenceEmail" type="email" required className={`mt-1 ${inputClass}`} />
      </div>
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="residenceEmailAlt">
          Alternative email
        </label>
        <input id="residenceEmailAlt" name="residenceEmailAlt" type="email" className={`mt-1 ${inputClass}`} />
      </div>
    </>
  );
}

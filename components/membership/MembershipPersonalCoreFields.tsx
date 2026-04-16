import { HKU_TITLES } from "@/lib/registration-ordinary-data";
import { inputClass, labelClass } from "./membership-form-styles";

type Props = {
  chineseNA: boolean;
  onChineseNAChange: (v: boolean) => void;
  showNameInHku?: boolean;
};

export default function MembershipPersonalCoreFields({
  chineseNA,
  onChineseNAChange,
  showNameInHku = false,
}: Props) {
  return (
    <>
      <div>
        <label className={labelClass} htmlFor="title">
          Title <span className="text-red-600">*</span>
        </label>
        <select id="title" name="title" required className={`mt-1 ${inputClass}`}>
          <option value="">— Select —</option>
          {HKU_TITLES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2 grid gap-3 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="englishLastName">
            Last name (surname) <span className="text-red-600">*</span>
          </label>
          <input id="englishLastName" name="englishLastName" required className={`mt-1 ${inputClass}`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="englishFirstName">
            First name (given name) <span className="text-red-600">*</span>
          </label>
          <input id="englishFirstName" name="englishFirstName" required className={`mt-1 ${inputClass}`} />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="chineseName">
          Name in Chinese <span className="text-red-600">*</span>
        </label>
        <input
          id="chineseName"
          name="chineseName"
          required={!chineseNA}
          disabled={chineseNA}
          className={`mt-1 ${inputClass} disabled:bg-[#f0f0f0]`}
        />
        <label className="mt-2 inline-flex items-center gap-2 text-sm text-[#415274]">
          <input
            type="checkbox"
            checked={chineseNA}
            onChange={(e) => onChineseNAChange(e.target.checked)}
            className="h-4 w-4 accent-[#004439]"
          />
          Not applicable (no Chinese name)
        </label>
        {chineseNA ? <input type="hidden" name="chineseNameNA" value="1" readOnly /> : null}
      </div>
      <div>
        <span className={labelClass}>
          Gender <span className="text-red-600">*</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="gender" value="M" required className="accent-[#004439]" />M
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="gender" value="F" className="accent-[#004439]" />F
          </label>
        </div>
      </div>
      {showNameInHku ? (
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="nameInHkuIfDifferent">
            Name in HKU (if different)
          </label>
          <input id="nameInHkuIfDifferent" name="nameInHkuIfDifferent" className={`mt-1 ${inputClass}`} />
        </div>
      ) : null}
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="dateOfBirth">
          Date of birth <span className="text-red-600">*</span>{" "}
          <span className="font-normal text-[#6f788f]">(yyyy/mm/dd)</span>
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          required
          placeholder="2000/01/15"
          pattern="\\d{4}/\\d{1,2}/\\d{1,2}"
          className={`mt-1 ${inputClass}`}
        />
      </div>
    </>
  );
}

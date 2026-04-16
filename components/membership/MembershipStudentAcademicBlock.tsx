import { HKU_FACULTIES, HKU_FIRST_DEGREES, HKU_HALLS } from "@/lib/registration-ordinary-data";
import MembershipSection from "./MembershipSection";
import { inputClass, labelClass } from "./membership-form-styles";

export default function MembershipStudentAcademicBlock() {
  return (
    <MembershipSection title="HKU programme">
      <div>
        <label className={labelClass} htmlFor="yearOfEntryToHku">
          Year of entry to HKU <span className="text-red-600">*</span>
        </label>
        <input
          id="yearOfEntryToHku"
          name="yearOfEntryToHku"
          required
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          placeholder="e.g. 2022"
          className={`mt-1 ${inputClass}`}
        />
      </div>
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="firstDegreeHku">
          First degree in HKU <span className="text-red-600">*</span>
        </label>
        <select id="firstDegreeHku" name="firstDegreeHku" required className={`mt-1 ${inputClass}`}>
          <option value="">— Select —</option>
          {HKU_FIRST_DEGREES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="expectedYearOfGraduation">
          Expected year of graduation <span className="text-red-600">*</span>
        </label>
        <input
          id="expectedYearOfGraduation"
          name="expectedYearOfGraduation"
          required
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          placeholder="e.g. 2026"
          className={`mt-1 ${inputClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="faculty">
          Faculty <span className="text-red-600">*</span>
        </label>
        <select id="faculty" name="faculty" required className={`mt-1 ${inputClass}`}>
          <option value="">— Select —</option>
          {HKU_FACULTIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="hall">
          Hall
        </label>
        <select id="hall" name="hall" className={`mt-1 ${inputClass}`}>
          {HKU_HALLS.map((h) => (
            <option key={h || "none"} value={h}>
              {h || "— (not applicable / not listed) —"}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="hkidOrUniversityNumber">
          HKID or University Number <span className="text-red-600">*</span>
        </label>
        <input id="hkidOrUniversityNumber" name="hkidOrUniversityNumber" required className={`mt-1 ${inputClass}`} />
      </div>
    </MembershipSection>
  );
}

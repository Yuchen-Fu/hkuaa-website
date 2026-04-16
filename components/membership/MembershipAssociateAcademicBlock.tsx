import { HKU_ASSOCIATE_CONNECTIONS } from "@/lib/associate-registration-data";
import { HKU_OCCUPATIONS } from "@/lib/registration-ordinary-data";
import MembershipSection from "./MembershipSection";
import { inputClass, labelClass } from "./membership-form-styles";

export default function MembershipAssociateAcademicBlock() {
  return (
    <MembershipSection title="HKU connection & background">
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="hkuConnection">
          HKU connection <span className="text-red-600">*</span>
        </label>
        <select id="hkuConnection" name="hkuConnection" required className={`mt-1 ${inputClass}`}>
          <option value="">— Select —</option>
          {HKU_ASSOCIATE_CONNECTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="jobTitle">
          Job title
        </label>
        <input id="jobTitle" name="jobTitle" className={`mt-1 ${inputClass}`} />
      </div>
      <div>
        <label className={labelClass} htmlFor="firstDegreeDescription">
          First degree
        </label>
        <input id="firstDegreeDescription" name="firstDegreeDescription" className={`mt-1 ${inputClass}`} />
      </div>
      <div>
        <label className={labelClass} htmlFor="yearOfGraduationAssociate">
          Year of graduation
        </label>
        <input
          id="yearOfGraduationAssociate"
          name="yearOfGraduationAssociate"
          inputMode="numeric"
          pattern="[0-9]{0,4}"
          maxLength={4}
          placeholder="e.g. 2010"
          className={`mt-1 ${inputClass}`}
        />
      </div>
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="universityName">
          Name of university <span className="text-red-600">*</span>
        </label>
        <input id="universityName" name="universityName" required className={`mt-1 ${inputClass}`} />
      </div>
      <div>
        <label className={labelClass} htmlFor="occupation">
          Occupation <span className="text-red-600">*</span>
        </label>
        <select id="occupation" name="occupation" required className={`mt-1 ${inputClass}`}>
          <option value="">— Select —</option>
          {HKU_OCCUPATIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className={labelClass} htmlFor="hkidOrPassportNumber">
          HKID or Passport Number <span className="text-red-600">*</span>
        </label>
        <input id="hkidOrPassportNumber" name="hkidOrPassportNumber" required className={`mt-1 ${inputClass}`} />
      </div>
    </MembershipSection>
  );
}

import { HKU_ASSOCIATE_CONNECTIONS } from "@/lib/associate-registration-data";
import { HKU_FIRST_DEGREES, HKU_FACULTIES, HKU_OCCUPATIONS } from "@/lib/registration-ordinary-data";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function validatePersonalCore(payload: Record<string, unknown>): { error?: string } {
  const title = str(payload.title);
  const englishLastName = str(payload.englishLastName);
  const englishFirstName = str(payload.englishFirstName);
  const chineseNameNA = str(payload.chineseNameNA);
  const chineseName = str(payload.chineseName);
  const gender = str(payload.gender);
  const dateOfBirth = str(payload.dateOfBirth);

  if (!title) return { error: "Title is required." };
  if (!englishLastName || !englishFirstName) return { error: "English name (surname and given name) is required." };
  if (chineseNameNA !== "1" && !chineseName) return { error: "Chinese name is required (or tick Not applicable)." };
  if (gender !== "M" && gender !== "F") return { error: "Gender is required." };
  if (!dateOfBirth) return { error: "Date of birth is required." };
  return {};
}

function validateContactDual(payload: Record<string, unknown>): { error?: string } {
  const contactByMailTo = str(payload.contactByMailTo);
  const mobile = str(payload.mobile);
  const residenceAddress = str(payload.residenceAddress);
  const residenceTel = str(payload.residenceTel);
  const residenceEmail = str(payload.residenceEmail);
  const correspondenceAddress = str(payload.correspondenceAddress);
  const correspondenceTel = str(payload.correspondenceTel);
  const correspondenceEmail = str(payload.correspondenceEmail);

  if (contactByMailTo !== "residence" && contactByMailTo !== "correspondence") {
    return { error: "Please choose residence or correspondence for HKUAA mailings." };
  }
  if (!residenceAddress || !residenceTel || !residenceEmail) {
    return { error: "Residence address, telephone and frequently used email are required." };
  }
  if (contactByMailTo === "correspondence") {
    if (!correspondenceAddress || !correspondenceTel || !correspondenceEmail) {
      return {
        error:
          "Correspondence address, telephone and frequently used email are required when correspondence is selected for mailings.",
      };
    }
  }
  if (!mobile) return { error: "Mobile is required." };
  return {};
}

export function validateOrdinaryApplication(payload: Record<string, unknown>): { error?: string } {
  const core = validatePersonalCore(payload);
  if (core.error) return core;

  const firstDegreeHku = str(payload.firstDegreeHku);
  const graduationYear = str(payload.graduationYear);
  const faculty = str(payload.faculty);
  const occupation = str(payload.occupation);
  const hkidOrUniversityNumber = str(payload.hkidOrUniversityNumber);

  if (!firstDegreeHku) return { error: "First degree in HKU is required." };
  if (!HKU_FIRST_DEGREES.includes(firstDegreeHku)) return { error: "Invalid first degree selection." };
  if (!graduationYear) return { error: "Year of graduation is required." };
  if (!faculty) return { error: "Faculty is required." };
  if (!HKU_FACULTIES.includes(faculty as (typeof HKU_FACULTIES)[number])) return { error: "Invalid faculty." };
  if (!occupation) return { error: "Occupation is required." };
  if (!HKU_OCCUPATIONS.includes(occupation as (typeof HKU_OCCUPATIONS)[number])) return { error: "Invalid occupation." };
  if (!hkidOrUniversityNumber) return { error: "HKID or University Number is required." };

  return validateContactDual(payload);
}

export function validateAssociateApplication(payload: Record<string, unknown>): { error?: string } {
  const core = validatePersonalCore(payload);
  if (core.error) return core;

  const hkuConnection = str(payload.hkuConnection);
  const universityName = str(payload.universityName);
  const occupation = str(payload.occupation);
  const hkidOrPassportNumber = str(payload.hkidOrPassportNumber);

  if (!hkuConnection) return { error: "HKU connection is required." };
  if (!HKU_ASSOCIATE_CONNECTIONS.includes(hkuConnection as (typeof HKU_ASSOCIATE_CONNECTIONS)[number])) {
    return { error: "Invalid HKU connection." };
  }
  if (!universityName) return { error: "Name of university is required." };
  if (!occupation) return { error: "Occupation is required." };
  if (!HKU_OCCUPATIONS.includes(occupation as (typeof HKU_OCCUPATIONS)[number])) return { error: "Invalid occupation." };
  if (!hkidOrPassportNumber) return { error: "HKID or Passport Number is required." };

  return validateContactDual(payload);
}

export function validateStudentApplication(payload: Record<string, unknown>): { error?: string } {
  const core = validatePersonalCore(payload);
  if (core.error) return core;

  const yearOfEntryToHku = str(payload.yearOfEntryToHku);
  const firstDegreeHku = str(payload.firstDegreeHku);
  const expectedYearOfGraduation = str(payload.expectedYearOfGraduation);
  const faculty = str(payload.faculty);
  const hkidOrUniversityNumber = str(payload.hkidOrUniversityNumber);
  const residenceAddress = str(payload.residenceAddress);
  const mobile = str(payload.mobile);
  const residenceTel = str(payload.residenceTel);
  const residenceEmail = str(payload.residenceEmail);

  if (!yearOfEntryToHku) return { error: "Year of entry to HKU is required." };
  if (!/^\d{4}$/.test(yearOfEntryToHku)) return { error: "Year of entry must be a 4-digit year." };
  if (!firstDegreeHku) return { error: "First degree in HKU is required." };
  if (!HKU_FIRST_DEGREES.includes(firstDegreeHku)) return { error: "Invalid first degree selection." };
  if (!expectedYearOfGraduation) return { error: "Expected year of graduation is required." };
  if (!/^\d{4}$/.test(expectedYearOfGraduation)) return { error: "Expected graduation must be a 4-digit year." };
  if (!faculty) return { error: "Faculty is required." };
  if (!HKU_FACULTIES.includes(faculty as (typeof HKU_FACULTIES)[number])) return { error: "Invalid faculty." };
  if (!hkidOrUniversityNumber) return { error: "HKID or University Number is required." };
  if (!residenceAddress) return { error: "Home address is required." };
  if (!mobile) return { error: "Mobile is required." };
  if (!residenceTel) return { error: "Tel is required." };
  if (!residenceEmail) return { error: "Frequently used email is required." };

  return {};
}

/** Primary login / notification email from canonical contact fields */
export function derivePrimaryEmail(payload: Record<string, unknown>, mode: "dual" | "student"): string {
  if (mode === "student") return str(payload.residenceEmail);
  const contactByMailTo = str(payload.contactByMailTo);
  return contactByMailTo === "correspondence" ? str(payload.correspondenceEmail) : str(payload.residenceEmail);
}

export function deriveEnglishFullName(payload: Record<string, unknown>): string {
  const last = str(payload.englishLastName);
  const first = str(payload.englishFirstName);
  if (last || first) return `${last} ${first}`.trim();
  return str(payload.englishName);
}

export function deriveChineseName(payload: Record<string, unknown>): string {
  if (str(payload.chineseNameNA) === "1") return "Not applicable";
  return str(payload.chineseName);
}

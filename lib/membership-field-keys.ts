/**
 * Canonical `MembershipApplication.details` keys shared across online forms.
 * Use these names in HTML `name=""` and in API validation so future DB columns map 1:1.
 *
 * @see https://www.hkuaa.org.hk/registration_ordinary.asp
 * @see https://www.hkuaa.org.hk/registration_associate.asp
 * @see https://www.hkuaa.org.hk/registration_student.asp
 */
export const MEMBERSHIP_FIELDS = {
  title: "title",
  englishLastName: "englishLastName",
  englishFirstName: "englishFirstName",
  chineseName: "chineseName",
  chineseNameNA: "chineseNameNA",
  gender: "gender",
  dateOfBirth: "dateOfBirth",
  /** Ordinary only */
  nameInHkuIfDifferent: "nameInHkuIfDifferent",
  /** Ordinary + student (dropdown) */
  firstDegreeHku: "firstDegreeHku",
  /** Ordinary */
  graduationYear: "graduationYear",
  /** Student */
  yearOfEntryToHku: "yearOfEntryToHku",
  expectedYearOfGraduation: "expectedYearOfGraduation",
  /** Ordinary + student */
  faculty: "faculty",
  hall: "hall",
  /** Ordinary + student (HKID or HKU university number) */
  hkidOrUniversityNumber: "hkidOrUniversityNumber",
  /** Associate: same purpose as government ID; store separately from ordinary for clarity when migrating to DB */
  hkuConnection: "hkuConnection",
  jobTitle: "jobTitle",
  firstDegreeDescription: "firstDegreeDescription",
  yearOfGraduationAssociate: "yearOfGraduationAssociate",
  universityName: "universityName",
  hkidOrPassportNumber: "hkidOrPassportNumber",
  occupation: "occupation",
  otherAlumniBodies: "otherAlumniBodies",
  contactByMailTo: "contactByMailTo",
  residenceAddress: "residenceAddress",
  residenceTel: "residenceTel",
  residenceFax: "residenceFax",
  residenceEmail: "residenceEmail",
  residenceEmailAlt: "residenceEmailAlt",
  correspondenceAddress: "correspondenceAddress",
  correspondenceTel: "correspondenceTel",
  correspondenceFax: "correspondenceFax",
  correspondenceEmail: "correspondenceEmail",
  correspondenceEmailAlt: "correspondenceEmailAlt",
  mobile: "mobile",
  notes: "notes",
} as const;

export type MembershipDetailKey = (typeof MEMBERSHIP_FIELDS)[keyof typeof MEMBERSHIP_FIELDS];

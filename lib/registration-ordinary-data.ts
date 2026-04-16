import degreesJson from "./registration-ordinary-degrees.json";

export const HKU_TITLES = ["Prof.", "Dr.", "Mr.", "Mrs.", "Ms."] as const;

export const HKU_FACULTIES = [
  "Architecture",
  "Arts",
  "Business & Economics",
  "Dentistry",
  "Education",
  "Engineering",
  "Law",
  "Medicine",
  "Sciences",
  "Social Sciences",
] as const;

export const HKU_OCCUPATIONS = [
  "Accounting / Auditing",
  "Administration / Human Resources / Operations",
  "Banking",
  "Investment Bank",
  "Marketing",
  "Airline / Hotel / Travel / Tourism",
  "Architecture",
  "Education",
  "Engineering",
  "Government",
  "IT",
  "Insurance",
  "Journalism",
  "Legal",
  "Manufacturing / Logistics / Transportation / Shipping",
  "Doctor",
  "Dentist",
  "Nurses / Pharmaceutical / Other Medical",
  "Sales",
  "Student",
  "Social Services",
  "Others",
] as const;

export const HKU_HALLS = [
  "",
  "Duchess of Kent Hall",
  "Elliot Hall",
  "Hornell Hall",
  "Lady Ho Tung Hall",
  "Lee Chi Hung Hall",
  "Lee Hysan Hall",
  "Lee Shau Kee Hall",
  "Lugard Hall",
  "May Hall",
  "Morrison Hall",
  "Old Halls",
  "R. C. Lee Hall",
  "Ricci Hall",
  "Simon K. Y. Lee Hall",
  "St. John's College",
  "Starr Hall",
  "Suen Chi Sun Hall",
  "Swire Hall",
  "University Hall",
  "Wei Lun Hall",
] as const;

/** First degree in HKU (from legacy registration_ordinary.asp). */
export const HKU_FIRST_DEGREES: string[] = degreesJson.filter(
  (d): d is string => typeof d === "string" && d.length > 8,
);

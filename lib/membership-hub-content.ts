/**
 * Membership categories overview (from HKUAA registration hub).
 * Excludes the deprecated “Please DO NOT download the forms below” list.
 * @see https://www.hkuaa.org.hk/registration.asp
 */
export type HubMembershipRow = {
  id: string;
  title: string;
  entranceFee: string;
  subscriptionFee: string;
  /** Plain text bullets (no HTML). */
  requirements: string[];
  applyHref?: string;
  pdfHref?: string;
};

/** Grouped notices for the membership overview page (same facts as the official hub). */
export type MembershipNoticeGroup = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly string[];
};

export const MEMBERSHIP_NOTICE_GROUPS: readonly MembershipNoticeGroup[] = [
  {
    id: "fees-eligibility",
    title: "Fees and eligibility",
    items: [
      "Ordinary, Associate, and Student membership are free for eligible graduates, Court and Foundation members, Term 1 and 2 staff, Bands B–J staff, and current HKU students. Others may apply as Subscribing members. Memberships may be upgraded to Life status.",
      "HKU SPACE graduates and courses do not qualify for Ordinary membership.",
      "From 1 January 2025: Life membership HK$15,000; Associate Life membership HK$25,000.",
      "Ordinary applicants shall submit a soft copy of the HKU graduation document.",
      "Student applicants shall submit a soft copy of the HKU student card.",
      "Associate applicants shall submit a soft copy of the HKU staff card.",
    ],
  },
  {
    id: "processing",
    title: "Processing time",
    items: ["Application review typically requires approximately three to six weeks during peak periods."],
  },
] as const;

export const MEMBERSHIP_HUB_ROWS: HubMembershipRow[] = [
  {
    id: "ordinary",
    title: "Ordinary Member",
    entranceFee: "Free",
    subscriptionFee: "Free",
    requirements: [
      "Graduates of The University of Hong Kong and past students registered as internal students.",
      "Only qualifications listed under Statutes III of the University Ordinance and Statutes, conferred by HKU, qualify (see the official HKU calendar / ordinance page).",
      "HKU SPACE qualifications are not eligible.",
    ],
    applyHref: "/membership/apply",
  },
  {
    id: "life",
    title: "Life Member",
    entranceFee: "$15,000",
    subscriptionFee: "Free",
    requirements: [
      "Any Ordinary Member upon payment and Executive Committee approval.",
      "Life members and spouse may enjoy privileges as determined by the Executive Committee.",
      "Submit HKU graduation document with the application.",
    ],
    applyHref: "/membership/apply",
    pdfHref: "https://www.hkuaa.org.hk/photo/2021%20Events/Life_Member_Application_form_2025.pdf",
  },
  {
    id: "student",
    title: "Student Member",
    entranceFee: "Free",
    subscriptionFee: "Free",
    requirements: [
      "Current students of The University of Hong Kong.",
      "Prepare a soft copy of your HKU student card before the e-form.",
    ],
    applyHref: "/membership/apply",
  },
  {
    id: "associate",
    title: "Associate Member",
    entranceFee: "Free",
    subscriptionFee: "Free",
    requirements: [
      "Past and present Court, Council and HKU Foundation (in propria persona) members, and Term I/II and/or Bands B–J staff who are not eligible as Ordinary or Student members.",
      "Prepare a soft copy of your HKU staff card before the e-form.",
    ],
    applyHref: "/membership/apply",
  },
  {
    id: "associate-life",
    title: "Associate Life Member",
    entranceFee: "$25,000",
    subscriptionFee: "Free",
    requirements: [
      "Associate members or other eligible persons upon payment and Executive Committee approval.",
      "Submit HKU staff card with the application.",
    ],
    pdfHref: "https://www.hkuaa.org.hk/photo/2021%20Events/Associate_Life_Member_Application_form_2025.pdf",
  },
  {
    id: "subscribing",
    title: "Subscribing Member",
    entranceFee: "$3,000",
    subscriptionFee: "$2,400 p.a.",
    requirements: [
      "Respectable permanent residents of Hong Kong who support the Association.",
      "Subject to Executive Committee approval; graduate certificate and employment reference or business certificate required.",
    ],
    pdfHref: "https://www.hkuaa.org.hk/photo/2021%20Events/Subscribing_Member_Application_form_2025.pdf",
  },
];

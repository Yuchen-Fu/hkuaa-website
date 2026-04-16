export type MembershipType = {
  key: "ordinary" | "student" | "associate" | "life";
  title: string;
  fee: string;
  eligibility: string;
  note: string;
};

export type NavItem = {
  href: string;
  label: string;
  children?: Array<{ href: string; label: string }>;
};

export const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    children: [
      { href: "/about", label: "HKUAA History" },
      { href: "/about", label: "Office Bearers" },
      { href: "/about", label: "Subcommittees" },
    ],
  },
  {
    href: "/clubhouse",
    label: "Clubhouse",
  },
  {
    href: "/events",
    label: "Events",
  },
  {
    href: "/membership",
    label: "Membership",
  },
  {
    href: "/news",
    label: "News",
  },
  { href: "/contact", label: "Contact" },
];

export const membershipTypes: MembershipType[] = [
  {
    key: "ordinary",
    title: "Ordinary Member",
    fee: "HKD 600 / year",
    eligibility: "HKU graduate with required supporting documents.",
    note: "Application review is required before payment request.",
  },
  {
    key: "student",
    title: "Student Member",
    fee: "HKD 200 / year",
    eligibility: "Current HKU student with valid student proof.",
    note: "Application review is required before payment request.",
  },
  {
    key: "associate",
    title: "Associate Member",
    fee: "HKD 800 / year",
    eligibility: "Applicants eligible under HKUAA associate criteria.",
    note: "Approval criteria may include additional references.",
  },
  {
    key: "life",
    title: "Life Member",
    fee: "One-off (as approved by HKUAA)",
    eligibility: "Eligible applicants under HKUAA life member rules.",
    note: "Activation after approval and payment confirmation.",
  },
];

export const contactPoints = {
  membershipPhone: "3421 1218",
  membershipEmail: "membership@hkuaa.hk",
  clubhousePhone: "2522 7968",
  clubhouseEmail: "info@hkuaadining.hk",
  fax: "(852)25232660",
  address: "ROOM 101, 1/F., Yip Fung Building, 2 D'Aguilar Street, Central, Hong Kong",
  mapUrl: "https://maps.google.com/?q=Room%20101,%20Yip%20Fung%20Building,%202%20D'Aguilar%20Street,%20Central,%20Hong%20Kong",
  diningUrl: "https://www.hkuaadining.hk/",
  bookingUrl: "https://inline.app/booking/HKUAA/Clubhouse",
};

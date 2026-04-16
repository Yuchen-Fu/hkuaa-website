/**
 * About section copy and official assets.
 */

/** HKUAA 2024–25 ExCo list (PDF on Wix static files). */
export const OFFICE_BEARERS_PDF_URL =
  "https://c15fa93d-5470-4bf4-acaa-44e3b3bd641a.filesusr.com/ugd/ce60b9_b77b65118015461db78b268372b0dd34.pdf";

/** Imagery published on the Office Bearers page (Wix CDN). */
export const OFFICE_BEARERS_IMAGES = {
  bannerStrip:
    "https://static.wixstatic.com/media/cbad7d_7878094a19e44f969ee9707723e2a918~mv2.jpg/v1/fill/w_980,h_117,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240731152207.jpg",
  groupPhoto:
    "https://static.wixstatic.com/media/cbad7d_f422e693b2c34de293afd7e25e9c882c~mv2.jpg/v1/crop/x_0,y_4,w_2048,h_1089/fill/w_1200,h_630,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cbad7d_f422e693b2c34de293afd7e25e9c882c~mv2.jpg",
} as const;

/** Thematic stock images (Unsplash) — placeholders until HKUAA supplies final assets. */
export const ABOUT_THEME_IMAGES = {
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80",
  community: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  handshake: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  subcommitteesBanner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
} as const;

export const ABOUT_INTRO =
  "Established in the 1920s, the Hong Kong University Alumni Association (HKUAA) is the longest standing alumni body of the University of Hong Kong with thousands of members and is linked to an extensive network of HKUAA bodies worldwide. Located in Central near Lan Kwai Fong, the association hosts a popular clubhouse and a members lounge that offers a rotating menu of fine Chinese cuisine and a venue for members to host a variety of social activities. Overall, we foster connections between alumni and students, providing networking opportunities for generations of HKU students and build a community that comes together for a common cause.";

export const ABOUT_VISION =
  "Our association operates as a sustainable and well managed entity constantly seeking to provide valuable opportunities and services to members. We strive to facilitate and enable alumni to develop and maintain close linkages with the university while fostering respect and leadership within the community. We are committed to creating a platform for our members to foster mutually beneficial, meaningful, lasting fellowship, and create a sense of pride for members of the association that also contributes to the lasting success of the university.";

export const ABOUT_PURPOSE_NUMBERED = [
  "Establish and maintain an effective communication infrastructure among members",
  "Cultivate a strong sense of belonging and ownership",
] as const;

export const ABOUT_PURPOSE_BULLETS = [
  "Create value for members by utilizing to its full advantage the power of mass participation/purchase",
  "Promote professional and personal development opportunities for the benefit of members (career planning, skill development, further study)",
  "Enhance bonding and fellowship via social, cultural, educational, sports, scientific and special interests activities.",
  "Contribute to HKU’s vision to sustain its excellence and status as a pre-eminent international university in Asia and support its activities including fund raising and sponsorship programs",
  "Encourage and facilitate members to contribute to the society as leaders and responsible citizens",
] as const;

export const ABOUT_CORE_VALUES = ["Wisdom", "Integrity", "Synergy", "Equality", "Respect"] as const;

export const ABOUT_CULTURE = [
  "Expand on HKU heritage",
  "Excel from harmony",
  "Prosper by synergy",
  "Thrive on mutual respect",
  "Blossom through transparency and fair play",
  "Flourish upon uncompromising ethics",
  "Comfort amidst peaceful enjoyment",
] as const;

export type SubcommitteeItem = {
  name: string;
  href?: string;
};

export const SUBCOMMITTEES: SubcommitteeItem[] = [
  { name: "Education and Community Services Sub-Committee" },
  { name: "Golf Interest Group Sub-Committee" },
  { name: "Green and Culture Sub-Committee", href: "https://www.facebook.com/groups/greenandculture/" },
  { name: "HKUAA Choir Sub-Committee" },
  { name: "House & Bar Sub-Committee" },
  { name: "Membership Sub-Committee" },
  { name: "PR & Communications Sub-Committee" },
  { name: "Professional Alumni Get-Together Sub-Committee" },
  { name: "Social & Events Sub-Committee" },
  { name: "Technology and Operations Sub-Committee" },
  { name: "University Liaison Sub-Committee" },
  { name: "Young Alumni and Students Group Sub-Committee", href: "https://www.facebook.com/groups/hkualumni" },
];

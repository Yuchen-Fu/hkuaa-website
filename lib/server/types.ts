export type MembershipTypeKey = "ordinary" | "student" | "associate" | "life";

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "awaiting_payment"
  | "paid";

export type MembershipApplication = {
  id: string;
  createdAt: string;
  updatedAt: string;
  membershipType: MembershipTypeKey;
  chineseName: string;
  englishName: string;
  email: string;
  mobile: string;
  facultyOrDegree?: string;
  graduationYear?: string;
  notes?: string;
  /** Full ordinary-registration field map (and future extended forms). */
  details?: Record<string, string>;
  status: ApplicationStatus;
  reviewNote?: string;
};

export type PaymentRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  applicationId?: string;
  purpose: "membership" | "event" | "donation";
  amount: number;
  currency: "HKD";
  status: "pending" | "succeeded" | "failed" | "manual_confirmed";
  providerReference?: string;
};

export type ContentStatus = "draft" | "published";

export type EventItem = {
  id: string;
  title: string;
  eventDate: string;
  summary: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  sourceName?: string;
  sourceUrl?: string;
  isExternal?: boolean;
};

export type RuntimeStore = {
  applications: MembershipApplication[];
  payments: PaymentRecord[];
  events: EventItem[];
  news: NewsItem[];
};

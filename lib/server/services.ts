import { createId, readStore, writeStore } from "@/lib/server/storage";
import type {
  ApplicationStatus,
  ContentStatus,
  EventItem,
  MembershipApplication,
  MembershipTypeKey,
  NewsItem,
  PaymentRecord,
} from "@/lib/server/types";

const HKU_ALUMNI_NETWORK_FEED_URL = "https://www.alumni.hku.hk/category/alumni-network/feed/";

function stripHtml(input: string) {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(input: string, max = 180) {
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1).trim()}...`;
}

function pickTag(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
}

function parseRssItems(xml: string) {
  const matches = xml.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];
  return matches.map((itemXml) => {
    const title = stripHtml(pickTag(itemXml, "title"));
    const link = stripHtml(pickTag(itemXml, "link"));
    const description = stripHtml(pickTag(itemXml, "description"));
    const pubDateRaw = stripHtml(pickTag(itemXml, "pubDate"));
    const publishedAt = pubDateRaw ? new Date(pubDateRaw).toISOString() : new Date().toISOString();
    return { title, link, description, publishedAt };
  });
}

type NewApplicationInput = {
  membershipType: MembershipTypeKey;
  chineseName: string;
  englishName: string;
  email: string;
  mobile: string;
  facultyOrDegree?: string;
  graduationYear?: string;
  notes?: string;
  details?: Record<string, string>;
};

export async function listApplications() {
  const store = await readStore();
  return store.applications;
}

export async function createApplication(input: NewApplicationInput): Promise<MembershipApplication> {
  const now = new Date().toISOString();
  const app: MembershipApplication = {
    id: createId("app"),
    createdAt: now,
    updatedAt: now,
    membershipType: input.membershipType,
    chineseName: input.chineseName.trim(),
    englishName: input.englishName.trim(),
    email: input.email.trim().toLowerCase(),
    mobile: input.mobile.trim(),
    facultyOrDegree: input.facultyOrDegree?.trim(),
    graduationYear: input.graduationYear?.trim(),
    notes: input.notes?.trim(),
    details: input.details,
    status: "submitted",
  };
  const store = await readStore();
  store.applications.unshift(app);
  await writeStore(store);
  return app;
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus, reviewNote?: string) {
  const store = await readStore();
  const item = store.applications.find((app) => app.id === id);
  if (!item) return null;
  item.status = status;
  item.updatedAt = new Date().toISOString();
  if (reviewNote) item.reviewNote = reviewNote;
  await writeStore(store);
  return item;
}

export async function listPayments() {
  const store = await readStore();
  return store.payments;
}

export async function createPayment(input: {
  purpose: "membership" | "event" | "donation";
  amount: number;
  applicationId?: string;
}) {
  const now = new Date().toISOString();
  const payment: PaymentRecord = {
    id: createId("pay"),
    createdAt: now,
    updatedAt: now,
    purpose: input.purpose,
    amount: input.amount,
    currency: "HKD",
    status: "pending",
    applicationId: input.applicationId,
  };
  const store = await readStore();
  store.payments.unshift(payment);
  await writeStore(store);
  return payment;
}

export async function markPaymentSuccess(paymentId: string, providerReference = "manual_test") {
  const store = await readStore();
  const payment = store.payments.find((item) => item.id === paymentId);
  if (!payment) return null;
  payment.status = "succeeded";
  payment.providerReference = providerReference;
  payment.updatedAt = new Date().toISOString();

  if (payment.applicationId) {
    const app = store.applications.find((item) => item.id === payment.applicationId);
    if (app) {
      app.status = "paid";
      app.updatedAt = new Date().toISOString();
    }
  }
  await writeStore(store);
  return payment;
}

export async function listEvents(status?: ContentStatus) {
  const store = await readStore();
  if (!status) return store.events;
  return store.events.filter((item) => item.status === status);
}

export async function listCurrentAndUpcomingEvents(status: ContentStatus = "published") {
  const events = await listEvents(status);
  const today = new Date().toISOString().slice(0, 10);

  return events
    .filter((item) => item.eventDate >= today)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
}

export async function listNews(status?: ContentStatus) {
  const store = await readStore();
  if (!status) return store.news;
  return store.news.filter((item) => item.status === status);
}

export async function listExternalAlumniNetworkNews(limit = 20): Promise<NewsItem[]> {
  try {
    const response = await fetch(HKU_ALUMNI_NETWORK_FEED_URL, {
      next: { revalidate: 1800 },
      headers: {
        accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    const items = parseRssItems(xml).filter((item) => item.title && item.link).slice(0, limit);
    return items.map((item) => ({
      id: `ext_${encodeURIComponent(item.link)}`,
      title: item.title,
      summary: truncate(item.description || "Read this update from HKU Alumni Network."),
      status: "published",
      createdAt: item.publishedAt,
      updatedAt: item.publishedAt,
      publishedAt: item.publishedAt,
      sourceName: "HKU Alumni Office",
      sourceUrl: item.link,
      isExternal: true,
    }));
  } catch {
    return [];
  }
}

export async function listNewsWithExternal(status: ContentStatus = "published", externalLimit = 20) {
  const internal = await listNews(status);
  if (status !== "published") return internal;

  const external = await listExternalAlumniNetworkNews(externalLimit);
  const deduped = new Map<string, NewsItem>();

  [...external, ...internal].forEach((item) => {
    const key = item.sourceUrl || item.title.toLowerCase();
    if (!deduped.has(key)) deduped.set(key, item);
  });

  return Array.from(deduped.values()).sort((a, b) => {
    const da = new Date(a.publishedAt || a.createdAt).getTime();
    const db = new Date(b.publishedAt || b.createdAt).getTime();
    return db - da;
  });
}

export async function createEvent(input: {
  title: string;
  eventDate: string;
  summary: string;
  status: ContentStatus;
}) {
  const now = new Date().toISOString();
  const item: EventItem = {
    id: createId("evt"),
    title: input.title.trim(),
    eventDate: input.eventDate,
    summary: input.summary.trim(),
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };
  const store = await readStore();
  store.events.unshift(item);
  await writeStore(store);
  return item;
}

export async function createNews(input: {
  title: string;
  summary: string;
  status: ContentStatus;
}) {
  const now = new Date().toISOString();
  const item: NewsItem = {
    id: createId("news"),
    title: input.title.trim(),
    summary: input.summary.trim(),
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };
  const store = await readStore();
  store.news.unshift(item);
  await writeStore(store);
  return item;
}

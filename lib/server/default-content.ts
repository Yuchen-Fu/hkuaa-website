import type { EventItem, NewsItem } from "@/lib/server/types";

const now = new Date().toISOString();

export const defaultEvents: EventItem[] = [
  {
    id: "evt_seed_20260530",
    title: "Countries in Pictures – Travel Talk Series Costa Rica",
    eventDate: "2026-05-30",
    summary: "Travel Talk Series event from current HKUAA operations listing.",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "evt_seed_20260502",
    title: "導賞參觀：魯班先師廟 by Professional Alumni Group",
    eventDate: "2026-05-02",
    summary: "Guided visit program currently promoted on HKUAA site.",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
];

export const defaultNews: NewsItem[] = [
  {
    id: "news_seed_1",
    title: "HKUAA Clubhouse Presents Mooncake Gift Boxes!",
    summary: "Seasonal clubhouse promotion announcement.",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "news_seed_2",
    title: "Taste of Hakka New Menu and Extended Discounts Await!",
    summary: "Dining-related announcement linked from HKUAA ecosystem.",
    status: "published",
    createdAt: now,
    updatedAt: now,
  },
];

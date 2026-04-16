import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import type { RuntimeStore } from "@/lib/server/types";
import { defaultEvents, defaultNews } from "@/lib/server/default-content";

const STORE_DIR = path.join(process.cwd(), ".runtime");
const STORE_FILE = path.join(STORE_DIR, "hkuaa-store.json");

const EMPTY_STORE: RuntimeStore = {
  applications: [],
  payments: [],
  events: defaultEvents,
  news: defaultNews,
};

async function ensureStore() {
  await mkdir(STORE_DIR, { recursive: true });
  try {
    await readFile(STORE_FILE, "utf8");
  } catch {
    await writeFile(STORE_FILE, JSON.stringify(EMPTY_STORE, null, 2), "utf8");
  }
}

export async function readStore(): Promise<RuntimeStore> {
  await ensureStore();
  const raw = await readFile(STORE_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw) as Partial<RuntimeStore>;
    return {
      applications: parsed.applications ?? [],
      payments: parsed.payments ?? [],
      events: parsed.events ?? defaultEvents,
      news: parsed.news ?? defaultNews,
    };
  } catch {
    return { ...EMPTY_STORE };
  }
}

export async function writeStore(next: RuntimeStore) {
  await ensureStore();
  await writeFile(STORE_FILE, JSON.stringify(next, null, 2), "utf8");
}

export function createId(prefix: string) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now()}_${random}`;
}

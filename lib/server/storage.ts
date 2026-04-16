import path from "node:path";
import os from "node:os";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import type { RuntimeStore } from "@/lib/server/types";
import { defaultEvents, defaultNews } from "@/lib/server/default-content";

function storeDir(): string {
  if (process.env.HKUAA_STORE_DIR) {
    return process.env.HKUAA_STORE_DIR;
  }
  /* Vercel serverless: project dir is read-only; only os.tmpdir() is writable. */
  if (process.env.VERCEL) {
    return path.join(os.tmpdir(), "hkuaa-website-runtime");
  }
  return path.join(process.cwd(), ".runtime");
}

const STORE_FILE = () => path.join(storeDir(), "hkuaa-store.json");

const EMPTY_STORE: RuntimeStore = {
  applications: [],
  payments: [],
  events: defaultEvents,
  news: defaultNews,
};

async function ensureStore() {
  const dir = storeDir();
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "hkuaa-store.json");
  try {
    await readFile(file, "utf8");
  } catch {
    await writeFile(file, JSON.stringify(EMPTY_STORE, null, 2), "utf8");
  }
}

export async function readStore(): Promise<RuntimeStore> {
  try {
    await ensureStore();
    const raw = await readFile(STORE_FILE(), "utf8");
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
  } catch (err) {
    console.error("[hkuaa storage] readStore failed, using defaults:", err);
    return { ...EMPTY_STORE };
  }
}

export async function writeStore(next: RuntimeStore) {
  await ensureStore();
  await writeFile(STORE_FILE(), JSON.stringify(next, null, 2), "utf8");
}

export function createId(prefix: string) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now()}_${random}`;
}

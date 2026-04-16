import { NextRequest } from "next/server";
import { createNews, listNews } from "@/lib/server/services";

export const runtime = "nodejs";

export async function GET() {
  const news = await listNews();
  return Response.json({ news });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const title = String(payload.title ?? "");
  const summary = String(payload.summary ?? "");
  const status = String(payload.status ?? "draft");

  if (!title || !summary || !["draft", "published"].includes(status)) {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  const item = await createNews({
    title,
    summary,
    status: status as "draft" | "published",
  });

  return Response.json({ ok: true, news: item });
}

import { NextRequest } from "next/server";
import { createEvent, listEvents } from "@/lib/server/services";

export const runtime = "nodejs";

export async function GET() {
  const events = await listEvents();
  return Response.json({ events });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const title = String(payload.title ?? "");
  const eventDate = String(payload.eventDate ?? "");
  const summary = String(payload.summary ?? "");
  const status = String(payload.status ?? "draft");

  if (!title || !eventDate || !summary || !["draft", "published"].includes(status)) {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  const event = await createEvent({
    title,
    eventDate,
    summary,
    status: status as "draft" | "published",
  });
  return Response.json({ ok: true, event });
}

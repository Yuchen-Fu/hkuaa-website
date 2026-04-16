import { NextRequest } from "next/server";
import { updateApplicationStatus } from "@/lib/server/services";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const payload = await request.json();
  const action = String(payload.action ?? "");
  const note = payload.note ? String(payload.note) : undefined;

  if (!["under_review", "approve", "reject"].includes(action)) {
    return Response.json({ error: "Invalid action" }, { status: 400 });
  }

  if (action === "under_review") {
    const app = await updateApplicationStatus(id, "under_review", note);
    if (!app) return Response.json({ error: "Application not found" }, { status: 404 });
    return Response.json({ ok: true, application: app });
  }
  if (action === "reject") {
    const app = await updateApplicationStatus(id, "rejected", note);
    if (!app) return Response.json({ error: "Application not found" }, { status: 404 });
    return Response.json({ ok: true, application: app });
  }

  const approved = await updateApplicationStatus(id, "approved", note);
  if (!approved) return Response.json({ error: "Application not found" }, { status: 404 });
  const awaiting = await updateApplicationStatus(id, "awaiting_payment");
  return Response.json({
    ok: true,
    application: awaiting,
    message: "Approved. Payment request can be issued.",
  });
}

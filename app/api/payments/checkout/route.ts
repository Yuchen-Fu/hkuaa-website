import { NextRequest } from "next/server";
import { createPayment, listApplications } from "@/lib/server/services";

export const runtime = "nodejs";

const MEMBERSHIP_LINKS: Record<string, string | undefined> = {
  ordinary: process.env.STRIPE_MEMBERSHIP_ORDINARY_PAYMENT_LINK,
  student: process.env.STRIPE_MEMBERSHIP_STUDENT_PAYMENT_LINK,
  associate: process.env.STRIPE_MEMBERSHIP_ASSOCIATE_PAYMENT_LINK,
  life: process.env.STRIPE_MEMBERSHIP_LIFE_PAYMENT_LINK,
};

const PURPOSE_LINKS: Record<string, string | undefined> = {
  event: process.env.STRIPE_EVENT_PAYMENT_LINK,
  donation: process.env.STRIPE_DONATION_PAYMENT_LINK,
};

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const purpose = String(payload.purpose ?? "");
  const amount = Number(payload.amount ?? 0);
  const applicationId = payload.applicationId ? String(payload.applicationId) : undefined;

  if (!["membership", "event", "donation"].includes(purpose) || !Number.isFinite(amount) || amount <= 0) {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  let checkoutUrl: string | undefined;

  if (purpose === "membership") {
    if (!applicationId) {
      return Response.json({ error: "applicationId is required." }, { status: 400 });
    }
    const apps = await listApplications();
    const app = apps.find((item) => item.id === applicationId);
    if (!app) return Response.json({ error: "Application not found." }, { status: 404 });
    if (app.status !== "awaiting_payment" && app.status !== "approved") {
      return Response.json({ error: "Application is not payment-ready." }, { status: 409 });
    }
    checkoutUrl = MEMBERSHIP_LINKS[app.membershipType];
  } else {
    checkoutUrl = PURPOSE_LINKS[purpose];
  }

  const payment = await createPayment({
    purpose: purpose as "membership" | "event" | "donation",
    amount,
    applicationId,
  });

  return Response.json({
    ok: true,
    payment,
    checkoutUrl: checkoutUrl ?? `/api/payments/mock-success?paymentId=${encodeURIComponent(payment.id)}`,
  });
}

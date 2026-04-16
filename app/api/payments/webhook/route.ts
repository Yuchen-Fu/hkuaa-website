import { NextRequest } from "next/server";
import { markPaymentSuccess } from "@/lib/server/services";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const paymentId = payload.paymentId ? String(payload.paymentId) : "";
  const providerReference = payload.providerReference ? String(payload.providerReference) : "stripe_webhook";

  if (!paymentId) {
    return Response.json({ error: "paymentId is required." }, { status: 400 });
  }

  const payment = await markPaymentSuccess(paymentId, providerReference);
  if (!payment) {
    return Response.json({ error: "Payment not found." }, { status: 404 });
  }
  return Response.json({ ok: true, payment });
}

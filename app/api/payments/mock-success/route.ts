import { NextRequest } from "next/server";
import { markPaymentSuccess } from "@/lib/server/services";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const paymentId = request.nextUrl.searchParams.get("paymentId");
  if (!paymentId) {
    return Response.json({ error: "paymentId is required." }, { status: 400 });
  }
  const payment = await markPaymentSuccess(paymentId, "mock_success");
  if (!payment) {
    return Response.json({ error: "Payment not found." }, { status: 404 });
  }
  return Response.json({ ok: true, payment });
}

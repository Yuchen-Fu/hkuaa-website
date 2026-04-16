/**
 * Verifies a Google reCAPTCHA v2 checkbox token (siteverify API).
 * If RECAPTCHA_SECRET_KEY is unset, returns false in production and true in development (with a warning).
 */
export async function verifyRecaptchaV2(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("RECAPTCHA_SECRET_KEY is required in production.");
      return false;
    }
    console.warn("RECAPTCHA_SECRET_KEY not set; skipping reCAPTCHA verification (development only).");
    if (token === "disabled") return true;
    return typeof token === "string" && token.length > 8;
  }
  if (token === "disabled") return false;
  if (!token || token.length < 10) return false;

  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
  if (!data.success) {
    console.warn("reCAPTCHA verification failed:", data["error-codes"]);
  }
  return data.success === true;
}

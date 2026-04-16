import { NextRequest } from "next/server";
import { createApplication, listApplications } from "@/lib/server/services";
import { verifyRecaptchaV2 } from "@/lib/server/recaptcha";
import type { MembershipTypeKey } from "@/lib/server/types";
import {
  deriveChineseName,
  deriveEnglishFullName,
  derivePrimaryEmail,
  validateAssociateApplication,
  validateOrdinaryApplication,
  validateStudentApplication,
} from "@/lib/membership-application-validate";

export const runtime = "nodejs";

function isType(value: string): value is MembershipTypeKey {
  return ["ordinary", "student", "associate", "life"].includes(value);
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function GET() {
  const applications = await listApplications();
  return Response.json({ applications });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Record<string, unknown>;
  const membershipType = str(payload.membershipType);
  const recaptchaToken = str(payload.recaptchaToken);

  if (!(await verifyRecaptchaV2(recaptchaToken))) {
    return Response.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
  }

  if (!isType(membershipType)) {
    return Response.json({ error: "Invalid membership type." }, { status: 400 });
  }

  if (membershipType === "ordinary") {
    const check = validateOrdinaryApplication(payload);
    if (check.error) return Response.json({ error: check.error }, { status: 400 });
  } else if (membershipType === "associate") {
    const check = validateAssociateApplication(payload);
    if (check.error) return Response.json({ error: check.error }, { status: 400 });
  } else if (membershipType === "student") {
    const check = validateStudentApplication(payload);
    if (check.error) return Response.json({ error: check.error }, { status: 400 });
  } else {
    const chineseName = str(payload.chineseName);
    const englishName = str(payload.englishName);
    const email = str(payload.email);
    const mobile = str(payload.mobile);
    if (!chineseName || !englishName || !email || !mobile) {
      return Response.json({ error: "Invalid payload." }, { status: 400 });
    }
  }

  const chineseName =
    membershipType === "life"
      ? str(payload.chineseName)
      : deriveChineseName(payload);

  const englishName =
    membershipType === "life" ? str(payload.englishName) : deriveEnglishFullName(payload);

  const email =
    membershipType === "life"
      ? str(payload.email)
      : membershipType === "student"
        ? derivePrimaryEmail(payload, "student")
        : derivePrimaryEmail(payload, "dual");

  const mobile = str(payload.mobile);

  if (!chineseName || !englishName || !email || !mobile) {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  const details: Record<string, string> = {};
  for (const [key, val] of Object.entries(payload)) {
    if (key === "recaptchaToken") continue;
    if (typeof val !== "string") continue;
    const t = val.trim();
    if (!t) continue;
    details[key] = t;
  }

  let facultyOrDegree: string | undefined;
  let graduationYear: string | undefined;

  if (membershipType === "ordinary") {
    facultyOrDegree = `${str(payload.faculty)} — ${str(payload.firstDegreeHku)}`.slice(0, 800);
    graduationYear = str(payload.graduationYear) || undefined;
  } else if (membershipType === "associate") {
    facultyOrDegree =
      `${str(payload.hkuConnection)} | ${str(payload.universityName)} | ${str(payload.firstDegreeDescription)}`.slice(
        0,
        800,
      );
    graduationYear = str(payload.yearOfGraduationAssociate) || undefined;
  } else if (membershipType === "student") {
    facultyOrDegree = `${str(payload.faculty)} — ${str(payload.firstDegreeHku)}`.slice(0, 800);
    graduationYear = str(payload.expectedYearOfGraduation) || undefined;
  } else {
    facultyOrDegree = str(payload.facultyOrDegree) || undefined;
    graduationYear = str(payload.graduationYear) || undefined;
  }

  const application = await createApplication({
    membershipType,
    chineseName,
    englishName,
    email,
    mobile,
    facultyOrDegree: facultyOrDegree || undefined,
    graduationYear,
    notes: str(payload.notes) || undefined,
    details: Object.keys(details).length ? details : undefined,
  });

  return Response.json({
    ok: true,
    application,
    message: "Submitted. Membership team will review before payment request.",
  });
}

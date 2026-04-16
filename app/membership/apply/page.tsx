import type { Metadata } from "next";
import MembershipApplicationForm from "@/components/MembershipApplicationForm";

export const metadata: Metadata = {
  title: "Membership Application",
  description: "Apply for HKUAA membership.",
};

export default function MembershipApplyPage() {
  return (
    <>
      <section className="hero-template">
        <div className="container-max">
          <h1>Membership Application</h1>
          <p>Complete and submit the form below. HKUAA will contact you after review.</p>
        </div>
      </section>
      <section className="section-template">
        <div className="container-max">
          <MembershipApplicationForm />
        </div>
      </section>
    </>
  );
}

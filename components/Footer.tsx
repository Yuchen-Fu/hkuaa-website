import Image from "next/image";
import Link from "next/link";
import { contactPoints } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-max grid gap-8 py-12 md:grid-cols-3">
        <div>
          <Image
            src="/assets/HKUAA_emblem_logo.avif"
            alt="HKUAA emblem"
            width={64}
            height={64}
            className="mb-3 h-12 w-12 object-contain"
          />
          <h3 className="text-lg font-semibold text-[#1e2b45]">Social Media</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#5d6578]">
            <a className="template-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            <a className="template-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="template-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="template-link" href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1e2b45]">Get Help</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#5d6578]">
            <Link className="template-link" href="/contact">
              Contact the alumni service desk
            </Link>
            <Link className="template-link" href="/membership/apply">Join HKUAA</Link>
            <Link className="template-link" href="/events">View all events</Link>
            <a className="template-link" href={contactPoints.mapUrl} target="_blank" rel="noreferrer">Maps & Facilities</a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1e2b45]">About This Site</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#5d6578]">
            <Link className="template-link" href="/about">About HKUAA</Link>
            <Link className="template-link" href="/news">News</Link>
            <Link className="template-link" href="/contact">Privacy</Link>
            <Link className="template-link" href="/contact">Terms of Use</Link>
            <a className="template-link" href={contactPoints.diningUrl} target="_blank" rel="noreferrer">Go to Dining Site</a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#ececec] py-4 text-center text-xs text-[#7a8398]">
        © 2026 Hong Kong University Alumni Association. All Rights Reserved.
      </div>
    </footer>
  );
}

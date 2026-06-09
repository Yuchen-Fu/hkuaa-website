"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header site-header-portal sticky top-0 z-40">
      <div className="site-utility-bar">
        <div className="container-max site-utility-inner">
          <div className="site-utility-links">
            <Link href="/admin/login">Staff Login</Link>
          </div>
        </div>
      </div>
      <div className="container-max site-header-top">
        <div className="site-brand-link inline-flex items-center justify-center">
          <Image
            src="/assets/HKUAA_Logo_Green_2023.png"
            alt="HKUAA logo"
            width={820}
            height={162}
            priority
            className="h-auto w-[220px] sm:w-[280px] md:w-[340px]"
          />
        </div>
      </div>
    </header>
  );
}

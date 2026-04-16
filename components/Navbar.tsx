"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site-data";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header site-header-portal sticky top-0 z-40">
      <div className="site-utility-bar">
        <div className="container-max site-utility-inner">
          <div className="site-utility-links">
            <Link href="/contact">Community Login</Link>
            <Link href="/membership/apply">Register</Link>
            <Link href="/membership">My Community</Link>
          </div>
        </div>
      </div>
      <div className="container-max site-header-top">
        <Link href="/" className="site-brand-link inline-flex items-center justify-center">
          <Image
            src="/assets/HKUAA_Logo_Green_2023.png"
            alt="HKUAA logo"
            width={820}
            height={162}
            priority
            className="h-auto w-[220px] sm:w-[280px] md:w-[340px]"
          />
        </Link>
        <Link href="/membership/apply" className="member-registration-link">
          Member Registration
        </Link>
      </div>
      <nav className="container-max">
        <div className="site-nav">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <div key={link.href} className="nav-item-group">
                <Link href={link.href} className={`site-nav-link ${active ? "active" : ""}`}>
                  {link.label}
                </Link>
                {link.children && link.children.length > 0 ? (
                  <div className="nav-dropdown" aria-label={`${link.label} submenu`}>
                    {link.children.map((child) => (
                      <Link key={`${link.href}-${child.label}`} href={child.href} className="nav-dropdown-link">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

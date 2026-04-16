"use client";

import { useEffect, type ReactNode } from "react";

const HTML_CLASS = "home-scroll-snap-active";

type Props = {
  children: ReactNode;
};

/**
 * Enables viewport scroll-snap on the homepage only (class on <html>).
 * Cleans up on route change / unmount.
 */
export default function HomeFullPageScroll({ children }: Props) {
  useEffect(() => {
    document.documentElement.classList.add(HTML_CLASS);
    return () => {
      document.documentElement.classList.remove(HTML_CLASS);
    };
  }, []);

  return <div className="home-fullpage-root">{children}</div>;
}

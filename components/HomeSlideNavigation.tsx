"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SECTION_IDS = [
  "home-slide-welcome",
  "home-slide-event",
  "home-slide-youtube",
  "home-slide-rest",
] as const;

function readScrollPaddingTop(): number {
  if (typeof document === "undefined") return 0;
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

export default function HomeSlideNavigation() {
  const [active, setActive] = useState(0);
  const [tailHasMore, setTailHasMore] = useState(false);
  const rafRef = useRef<number | null>(null);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const updateTailOverflow = useCallback(() => {
    const section = document.getElementById("home-slide-rest");
    if (!section) {
      setTailHasMore(false);
      return;
    }
    const pad = readScrollPaddingTop();
    const rect = section.getBoundingClientRect();
    const tailStarted = rect.top <= pad + 80;
    const moreBelow =
      tailStarted && (rect.bottom > window.innerHeight + 12 || document.documentElement.scrollHeight > window.scrollY + window.innerHeight + 8);
    setTailHasMore(moreBelow);
  }, []);

  const updateActiveFromViewport = useCallback(() => {
    const pad = readScrollPaddingTop();
    let current = 0;
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const el = document.getElementById(SECTION_IDS[i]);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= pad + 56) current = i;
    }
    setActive(current);
  }, []);

  const tick = useCallback(() => {
    updateActiveFromViewport();
    updateTailOverflow();
    rafRef.current = null;
  }, [updateActiveFromViewport, updateTailOverflow]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const section = document.getElementById("home-slide-rest");
    const ro =
      section && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            onScroll();
          })
        : null;
    if (section) ro?.observe(section);

    const initId = requestAnimationFrame(() => {
      tick();
    });

    return () => {
      cancelAnimationFrame(initId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro?.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  const goNext = useCallback(() => {
    if (active === 0) scrollToId("home-slide-event");
    else if (active === 1) scrollToId("home-slide-youtube");
    else if (active === 2) scrollToId("home-slide-rest");
    else if (active === 3 && tailHasMore) {
      window.scrollBy({ top: Math.round(window.innerHeight * 0.82), behavior: "smooth" });
    }
  }, [active, scrollToId, tailHasMore]);

  const showDownArrow =
    active === 0 || active === 1 || active === 2 || (active === 3 && tailHasMore);

  return (
    <>
      <nav className="home-scroll-dots" aria-label="Home page sections">
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            type="button"
            className={`home-scroll-dot ${i === active ? "is-active" : ""}`}
            onClick={() => scrollToId(id)}
            aria-label={`Go to section ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </nav>

      {showDownArrow ? (
        <button
          type="button"
          className="home-scroll-arrow"
          onClick={goNext}
          aria-label={active === 3 ? "Scroll down for more content" : "Next section"}
        >
          <span className="home-scroll-arrow-ring" aria-hidden>
            <svg className="home-scroll-arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M7 10.5L12 15.5 17 10.5"
                stroke="currentColor"
                strokeWidth="1.85"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      ) : null}
    </>
  );
}

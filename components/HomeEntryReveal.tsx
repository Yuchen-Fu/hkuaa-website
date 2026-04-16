"use client";

import { useEffect, useRef, useState, type ReactNode, type TransitionEvent } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Full-screen veil that slides up on first paint (homepage entry).
 * Respects `prefers-reduced-motion: reduce` (no animation, no overlay).
 */
export default function HomeEntryReveal({ children }: Props) {
  const [renderOverlay, setRenderOverlay] = useState(true);
  const [slideOut, setSlideOut] = useState(false);
  const reducedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    if (mq.matches) {
      queueMicrotask(() => {
        setRenderOverlay(false);
      });
      return;
    }

    document.body.style.overflow = "hidden";

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };

    const startSlide = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSlideOut(true));
      });
    };

    const t1 = window.setTimeout(startSlide, 140);
    timersRef.current.push(t1);

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, []);

  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (!slideOut) return;
    setRenderOverlay(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!slideOut || reducedRef.current) return;
    const fallback = window.setTimeout(() => {
      setRenderOverlay(false);
      document.body.style.overflow = "";
    }, 1400);
    return () => window.clearTimeout(fallback);
  }, [slideOut]);

  return (
    <>
      {children}
      {renderOverlay ? (
        <div
          className={`home-entry-reveal fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-b from-[#0c1a2e] via-[#0a1528] to-[#071018] transition-[transform] duration-[900ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform ${
            slideOut ? "pointer-events-none -translate-y-full" : "translate-y-0"
          }`}
          onTransitionEnd={onTransitionEnd}
          aria-hidden
        >
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.38em] text-white/35">HKUAA</p>
        </div>
      ) : null}
    </>
  );
}

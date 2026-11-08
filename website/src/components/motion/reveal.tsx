"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index inside a group; multiplies the base delay. */
  index?: number;
  as?: "div" | "li" | "section" | "header";
  className?: string;
};

/**
 * Adds data-inview once the element enters the viewport. CSS owns the
 * animation (see .reveal in home.css) and disables it under reduced motion.
 */
export function Reveal({ children, index = 0, as = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.inview = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.inview = "true";
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["reveal", className ?? ""].filter(Boolean).join(" ");
  const style = { "--reveal-index": index } as CSSProperties;

  switch (as) {
    case "li":
      return (
        <li className={cls} ref={ref as unknown as RefObject<HTMLLIElement>} style={style}>
          {children}
        </li>
      );
    case "section":
      return (
        <section className={cls} ref={ref as unknown as RefObject<HTMLElement>} style={style}>
          {children}
        </section>
      );
    case "header":
      return (
        <header className={cls} ref={ref as unknown as RefObject<HTMLElement>} style={style}>
          {children}
        </header>
      );
    default:
      return (
        <div className={cls} ref={ref as unknown as RefObject<HTMLDivElement>} style={style}>
          {children}
        </div>
      );
  }
}

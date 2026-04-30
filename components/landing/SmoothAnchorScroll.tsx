"use client";

import { useEffect } from "react";

/**
 * Same-document #hash links: smooth scroll + correct offset under sticky header.
 * (CSS scroll-behavior alone is inconsistent across browsers / Next hydration.)
 */
export function SmoothAnchorScroll() {
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const targetEl = e.target as Element | null;
      const anchor =
        targetEl?.closest("a[href^='#']") ??
        targetEl?.closest("a[href^='/#']");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      let id: string | null = null;
      if (href.startsWith("#") && href.length > 1) {
        id = href.slice(1);
      } else if (href.startsWith("/#") && href.length > 2) {
        try {
          const u = new URL(href, window.location.origin);
          if (
            u.pathname === window.location.pathname &&
            u.hash.length > 1
          ) {
            id = u.hash.slice(1);
          }
        } catch {
          return;
        }
      }
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  return null;
}

"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Where a layer would sit with no sticky offset: container top + the heights of the layers above it. */
function naturalTop(target: HTMLElement): number {
  const layer = target.closest<HTMLElement>("[data-layer]");
  if (!layer) return target.getBoundingClientRect().top + window.scrollY;
  const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-layer]"));
  const stackTop = layers[0].parentElement!.getBoundingClientRect().top + window.scrollY;
  let y = stackTop;
  for (let i = 0; i < layers.indexOf(layer); i++) y += layers[i].offsetHeight;
  return y;
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Smooth (eased) scrolling only when motion is allowed; the stacked layers work either way.
    const lenis = reduce ? null : new Lenis({ lerp: 0.09, anchors: false });
    let tick: ((t: number) => void) | undefined;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Sticky layers report a shifted position, so anchors are scrolled to by hand.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id && id !== "top" ? document.getElementById(id) : null;
      if (id && id !== "top" && !target) return;
      e.preventDefault();
      const y = target ? naturalTop(target) : 0;
      if (lenis) lenis.scrollTo(y, { duration: 1.6 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);
  return null;
}

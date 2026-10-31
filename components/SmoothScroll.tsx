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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Anchors are handled below: sticky layers report a shifted position, so native/Lenis anchors would land wrong.
    const lenis = new Lenis({ lerp: 0.09, anchors: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id && id !== "top" ? document.getElementById(id) : null;
      if (id && id !== "top" && !target) return;
      e.preventDefault();
      lenis.scrollTo(target ? naturalTop(target) : 0, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}

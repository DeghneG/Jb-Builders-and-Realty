"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Scroll-reveal for a section. Attach the returned ref to a container and mark
 * children with data-reveal ("up" by default, or "image" for a mask reveal).
 *
 * Uses IntersectionObserver (not scroll maths) so text can never stay hidden because of a
 * layout shift, and a failsafe reveals anything already on screen after a few seconds.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]"));
        const isImg = (el: HTMLElement) => el.dataset.reveal === "image";

        items.forEach((el) =>
          isImg(el)
            ? gsap.set(el, { clipPath: "inset(10% 10% 10% 10%)", autoAlpha: 0 })
            : gsap.set(el, { autoAlpha: 0, y: 36 })
        );

        const shown = new WeakSet<HTMLElement>();
        const show = (el: HTMLElement, delay = 0) => {
          if (shown.has(el)) return;
          shown.add(el);
          if (isImg(el)) {
            gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.4, ease: "power3.out", delay });
            const inner = el.querySelector("img");
            if (inner) gsap.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "power3.out", delay });
          } else {
            gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", delay });
          }
        };

        const io = new IntersectionObserver(
          (entries) => {
            let n = 0;
            entries
              .filter((e) => e.isIntersecting)
              .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
              .forEach((e) => {
                show(e.target as HTMLElement, n++ * 0.09);
                io.unobserve(e.target);
              });
          },
          { rootMargin: "0px 0px -6% 0px", threshold: 0 }
        );
        items.forEach((el) => io.observe(el));

        // Failsafe: anything already within the viewport after 4s must be visible.
        const guard = gsap.delayedCall(4, () =>
          items.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) show(el);
          })
        );

        // Parallax on images that opt in
        gsap.utils.toArray<HTMLElement>(root.querySelectorAll("img[data-parallax]")).forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        return () => {
          io.disconnect();
          guard.kill();
          // Never leave anything hidden if this effect is torn down.
          items.forEach((el) => gsap.set(el, { clearProps: "opacity,visibility,transform,clipPath" }));
        };
      });

      // Refresh trigger positions once everything (fonts, images) has settled
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: ref }
  );

  return ref;
}

"use client";
import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * One "page" in the scroll stack. It sticks in place (bottom-aligned if taller than the screen) while the
 * next layer slowly slides up over it; the covered layer dims and settles back as it disappears.
 */
export default function Layer({
  children,
  z,
  bg = "",
  round = true,
}: {
  children: React.ReactNode;
  z: number;
  bg?: string;
  round?: boolean;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);

  // Stick at the top if shorter than the screen, otherwise stick with the layer's BOTTOM at the screen bottom,
  // so the whole layer can be read before the next one covers it.
  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const set = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);

  // The layer slides under the next one: slight shrink + dim, scrubbed to the scroll position
  useGSAP(
    () => {
      const next = outer.current?.nextElementSibling as HTMLElement | null;
      if (!next) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } })
          .to(inner.current, { scale: 0.94, transformOrigin: "50% 100%", ease: "none" }, 0)
          .to(shade.current, { opacity: 0.62, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: outer }
  );

  return (
    <div ref={outer} data-layer className="sticky motion-reduce:static" style={{ zIndex: z }}>
      <div
        ref={inner}
        className={`relative overflow-hidden ${bg} ${
          round ? "rounded-t-[1.5rem] shadow-[0_-30px_70px_-30px_rgba(0,0,0,0.45)] md:rounded-t-[2.25rem]" : ""
        }`}
      >
        {children}
        <div ref={shade} aria-hidden className="pointer-events-none absolute inset-0 z-[60] bg-ink opacity-0" />
      </div>
    </div>
  );
}

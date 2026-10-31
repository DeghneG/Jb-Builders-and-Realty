"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** Custom cursor (fine pointers only) with a label on [data-cursor] items, plus magnetic buttons. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const el = dot.current;
    if (!el) return;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(t?.dataset.cursor ?? "");
      const b = (e.target as HTMLElement).closest<HTMLElement>(".btn");
      if (b) {
        const r = b.getBoundingClientRect();
        gsap.to(b, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.35,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };
    const out = (e: PointerEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".btn");
      if (b) gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerout", out);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <div ref={dot} className={`pointer-events-none fixed left-0 top-0 z-[90] ${on ? "" : "hidden"}`} aria-hidden>
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-sand text-ink transition-all duration-300 ${
          label ? "h-24 w-24 opacity-100" : "h-3 w-3 opacity-80"
        }`}
      >
        <span className="eyebrow !text-[0.65rem]">{label}</span>
      </div>
    </div>
  );
}

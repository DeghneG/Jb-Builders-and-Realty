"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PAIRS = [
  {
    key: "building",
    title: "Three-Storey Commercial Building",
    place: "Enriquez St., Brgy. 1, Lucena City",
    before: "/images/building-2.jpg",
    after: "/images/building-1.jpg",
    beforeLabel: "Scaffolding up",
    afterLabel: "Completed",
    note: "Same street, same view: from scaffolding and bare walls to a finished three-storey facade.",
  },
  {
    key: "road",
    title: "Farm-to-Market Road",
    place: "Isabang, Tayabas City",
    before: "/images/road-4.jpg",
    after: "/images/road-after.jpg",
    beforeLabel: "Forms and base laid",
    afterLabel: "Concrete poured",
    note: "Forms set and the base prepared, then the slab poured so farmers can get their produce to market.",
  },
  {
    key: "home",
    title: "Residence with Roof Deck",
    place: "Dapdap, Tayabas City",
    before: "/images/home-3.jpg",
    after: "/images/home-2.jpg",
    beforeLabel: "Floor tiling underway",
    afterLabel: "Finished interior",
    note: "The living space as tiling goes down, and the same room with the floor and finishes complete.",
  },
];

export default function BeforeAfter() {
  const ref = useReveal<HTMLElement>();
  const box = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [pos, setPos] = useState(50);
  const drag = useRef(false);
  const pair = PAIRS[i];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const o = { v: 92 };
      setPos(92);
      ScrollTrigger.create({
        trigger: box.current,
        start: "top 75%",
        once: true,
        onEnter: () => gsap.to(o, { v: 50, duration: 2.2, ease: "power3.inOut", delay: 0.2, onUpdate: () => setPos(o.v) }),
      });
    },
    { scope: ref }
  );

  const move = useCallback((clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const pick = (n: number) => {
    setI(n);
    gsap.fromTo(box.current, { opacity: 0.4 }, { opacity: 1, duration: 0.6 });
    const o = { v: 95 };
    setPos(95);
    gsap.to(o, { v: 50, duration: 1.4, ease: "power3.inOut", onUpdate: () => setPos(o.v) });
  };

  return (
    <section id="built" ref={ref} className="bg-ink py-28 text-bone md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-y-14 px-6 md:grid-cols-12 md:gap-x-6 md:px-10 lg:gap-x-16">
        <div className="md:col-span-5">
          <p data-reveal className="eyebrow mb-6 text-sand">
            Before and after
          </p>
          <h2 data-reveal className="display text-[clamp(2.6rem,5.6vw,5.4rem)]">
            Raw site to <span className="italic text-sand">finished building.</span>
          </h2>
          <p data-reveal className="mt-7 max-w-md leading-relaxed text-bone/70">
            Drag the line, or pick a project. Every pair below is the same site, photographed by our team
            before and after the work.
          </p>

          <div data-reveal className="mt-10 divide-y divide-bone/15 border-y border-bone/15" role="tablist" aria-label="Choose a project">
            {PAIRS.map((p, n) => (
              <button
                key={p.key}
                role="tab"
                aria-selected={n === i}
                onClick={() => pick(n)}
                className={`group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors ${
                  n === i ? "text-bone" : "text-bone/65 hover:text-bone"
                }`}
              >
                <span>
                  <span className="eyebrow mr-4 !text-[0.66rem] text-sand">{String(n + 1).padStart(2, "0")}</span>
                  <span className="display text-2xl">{p.title}</span>
                  <span className="mt-1 block pl-9 text-sm text-bone/65">{p.place}</span>
                </span>
                <span aria-hidden className={`h-px transition-all duration-500 ${n === i ? "w-10 bg-sand" : "w-4 bg-bone/30 group-hover:w-8"}`} />
              </button>
            ))}
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/60" aria-live="polite">
            {pair.note}
          </p>
        </div>

        <div data-reveal className="md:col-span-7">
          <div
            ref={box}
            data-cursor="Drag"
            className="relative mx-auto aspect-[4/5] w-full max-w-[640px] touch-pan-y select-none overflow-hidden bg-ink-2 md:mx-0 md:ml-auto"
            onPointerDown={(e) => {
              drag.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => drag.current && move(e.clientX)}
            onPointerUp={() => (drag.current = false)}
            onPointerCancel={() => (drag.current = false)}
          >
            <Image key={pair.after} src={pair.after} alt={`${pair.title}: ${pair.afterLabel}`} fill sizes="(min-width: 768px) 45vw, 100vw" quality={85} className="object-cover" draggable={false} />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image key={pair.before} src={pair.before} alt={`${pair.title}: ${pair.beforeLabel}`} fill sizes="(min-width: 768px) 45vw, 100vw" quality={85} className="object-cover" draggable={false} />
              <div className="absolute inset-0 bg-ink/10" />
            </div>

            <span className="eyebrow absolute left-3 top-3 bg-ink/85 px-3 py-2 !text-[0.64rem] text-bone md:left-4 md:top-4">
              Before<span className="hidden sm:inline"> · {pair.beforeLabel}</span>
            </span>
            <span className="eyebrow absolute bottom-3 right-3 bg-sand px-3 py-2 !text-[0.64rem] text-ink md:right-4 md:top-4 md:bottom-auto">
              After<span className="hidden sm:inline"> · {pair.afterLabel}</span>
            </span>

            <div className="pointer-events-none absolute inset-y-0 w-px bg-bone shadow-[0_0_0_1px_rgba(18,32,31,0.25)]" style={{ left: `${pos}%` }} />
            <button
              role="slider"
              aria-label="Before and after comparison"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
                if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
              }}
              className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone text-ink shadow-xl"
              style={{ left: `${pos}%` }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

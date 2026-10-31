"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { CATEGORIES, PROJECTS, type Category, type Project } from "@/lib/data";
import dynamic from "next/dynamic";

// The gallery is only needed after a click, so it is fetched on demand.
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

/** Card with a quiet photo preview: hover (or keyboard focus) to flip through the project's photos. */
function ProjectCard({ p, big, onOpen }: { p: Project; big: boolean; onOpen: () => void }) {
  const [n, setN] = useState(0);
  // The extra preview photos are only requested after the first hover, so phones (no hover) never download them.
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  const preview = p.images.slice(0, armed ? 4 : 1);
  const total = Math.min(4, p.images.length);

  const start = () => {
    setArmed(true);
    if (total < 2 || timer.current) return;
    setN(1);
    timer.current = setInterval(() => setN((c) => (c + 1) % total), 1100);
  };
  const stop = () => {
    clearInterval(timer.current);
    timer.current = undefined;
    setN(0);
  };
  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <button
      onClick={onOpen}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      data-cursor="View"
      className={`group text-left ${big ? "lg:col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden bg-bone ${big ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        {preview.map((src, k) => (
          <Image
            key={src}
            src={src}
            alt={k === 0 ? p.title : ""}
            fill
            sizes={big ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            quality={85}
            className={`object-cover transition-opacity duration-700 ${k === n ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <span className="eyebrow absolute left-4 top-4 bg-paper px-3 py-2 text-ink">{p.category}</span>
        <span className="eyebrow absolute bottom-4 right-4 bg-sand px-3 py-2 text-ink">
          {p.images.length} {p.images.length === 1 ? "photo" : "photos"} →
        </span>
        {total > 1 && (
          <span className="absolute inset-x-4 bottom-0 flex gap-1.5 pb-2" aria-hidden>
            {Array.from({ length: total }).map((_, k) => (
              <span key={k} className={`h-[2px] flex-1 transition-colors duration-500 ${k === n ? "bg-bone" : "bg-bone/30"}`} />
            ))}
          </span>
        )}
      </div>
      <h3 className="display mt-6 text-3xl md:text-4xl">{p.title}</h3>
      <p className="mt-1 text-sm text-ink/70">{p.place}</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">{p.blurb}</p>
    </button>
  );
}

export default function Projects() {
  const ref = useReveal<HTMLElement>();
  const grid = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [active, setActive] = useState<Project | null>(null);

  const shown = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        grid.current!.children,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" }
      );
    },
    { dependencies: [filter], scope: grid }
  );

  return (
    <section id="projects" ref={ref} className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
      <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p data-reveal className="eyebrow mb-6 text-sand-deep">
            Selected work
          </p>
          <h2 data-reveal className="display text-[clamp(2.4rem,6vw,6rem)]">
            Projects we are proud to have built.
          </h2>
        </div>
        <div
          data-reveal
          className="-mx-6 flex gap-x-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:col-span-4 md:mx-0 md:flex-wrap md:justify-end md:gap-y-3 md:overflow-visible md:px-0 [&>button]:shrink-0"
          role="tablist"
          aria-label="Filter projects"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`eyebrow min-h-11 min-w-11 border-b pb-1 transition-colors ${
                filter === c ? "border-ink text-ink" : "border-transparent text-ink/70 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div ref={grid} className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, idx) => (
          <ProjectCard key={p.slug} p={p} big={filter === "All" && idx === 0} onOpen={() => setActive(p)} />
        ))}
      </div>

      {active && <Lightbox project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import ServiceMap, { PLACES } from "./ServiceMap";

export default function Areas() {
  const ref = useReveal<HTMLElement>();
  const [active, setActiveRaw] = useState<string | null>(null);
  const [fly, setFly] = useState(false);
  // fromMap = hovered a pin (don't move the map); otherwise the list was hovered (pan the map)
  const setActive = (key: string | null, fromMap = false) => {
    setFly(!fromMap);
    setActiveRaw(key);
  };

  return (
    <section ref={ref} className="bg-bone py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-y-14 px-6 md:grid-cols-12 md:gap-x-6 md:px-10 lg:gap-x-12">
        <div className="md:col-span-5">
          <p data-reveal className="eyebrow mb-6 text-sand-deep">
            Where we work
          </p>
          <h2 data-reveal className="display text-[clamp(2.4rem,5vw,4.8rem)]">
            Based in Tayabas. Building across Quezon.
          </h2>
          <ul data-reveal className="mt-10 border-y border-line" onMouseLeave={() => setActive(null)}>
            {PLACES.map((p) => (
              <li key={p.key} className="border-b border-line last:border-b-0">
                <button
                  onMouseEnter={() => setActive(p.key)}
                  onFocus={() => setActive(p.key)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(p.key)}
                  aria-pressed={active === p.key}
                  className={`flex w-full items-center justify-between px-0 py-4 text-left transition-all duration-300 ${
                    active === p.key ? "bg-ink px-4 text-bone" : "hover:px-2"
                  }`}
                >
                  <span>{p.name}</span>
                  <span className={`eyebrow transition-colors ${active === p.key ? "text-sand" : "text-sand-deep"}`}>{p.detail}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink/70">
            <span className="hidden md:inline">Hover</span>
            <span className="md:hidden">Tap</span> a place, or a pin on the map.
          </p>
        </div>
        <div data-reveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[520px]">
          <ServiceMap active={active} fly={fly} onActive={setActive} />
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import ServiceMap, { PLACES } from "./ServiceMap";

export default function Areas() {
  const ref = useReveal<HTMLElement>();
  const [active, setActiveRaw] = useState<string | null>(null);
  const [fly, setFly] = useState(false);
  const [mode, setMode] = useState<"map" | "street">("map");
  const [sv, setSv] = useState<string>(PLACES[0].key);
  const place = PLACES.find((p) => p.key === sv) ?? PLACES[0];
  // Keyless Google Street View embed (no API key). Google snaps to the nearest street with coverage.
  const svSrc = `https://maps.google.com/maps?layer=c&cbll=${place.lat},${place.lng}&cbp=12,0,0,0,0&source=embed&output=svembed`;
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
                  onClick={() => {
                    setActive(p.key);
                    setSv(p.key);
                  }}
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
            {mode === "map" ? (
              <>
                <span className="hidden md:inline">Hover</span>
                <span className="md:hidden">Tap</span> a place, or a pin on the map.
              </>
            ) : (
              <>Pick a place to look around its streets. Drag to turn, scroll to move.</>
            )}
          </p>
        </div>
        <div data-reveal className="md:col-span-7">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div role="tablist" aria-label="Map view" className="inline-flex border border-line">
              {(["map", "street"] as const).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`eyebrow min-h-11 px-5 transition-colors ${mode === m ? "bg-ink text-bone" : "text-ink/75 hover:text-ink"}`}
                >
                  {m === "map" ? "Map" : "Street view"}
                </button>
              ))}
            </div>
            {mode === "street" && <span className="eyebrow hidden !text-[0.66rem] text-sand-deep sm:block">{place.name}</span>}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] md:aspect-auto md:h-[520px]">
            <ServiceMap active={active} fly={fly} onActive={setActive} />
            {mode === "street" && (
              <iframe
                key={place.key}
                title={`Google Street View near ${place.name}`}
                src={svSrc}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-10 h-full w-full border-0 bg-bone"
              />
            )}
          </div>
          {mode === "street" && (
            <p className="mt-3 text-xs text-ink/65">Street imagery by Google. Coverage and the exact view depend on Google; the pin is at the centre of {place.name}.</p>
          )}
        </div>
      </div>
    </section>
  );
}

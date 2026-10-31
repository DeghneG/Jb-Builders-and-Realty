"use client";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import ScrubText from "./ScrubText";

const FACTS = [
  { k: "2017", v: "Building in Quezon since" },
  { k: "1", v: "Team for design, permits and construction" },
  { k: "2", v: "Cities served: Lucena and Tayabas" },
];

export default function Intro() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
      <p data-reveal className="eyebrow mb-10 text-sand-deep">
        About us
      </p>
      <ScrubText
        className="display text-[clamp(2.4rem,6.6vw,6.4rem)]"
        text="One accountable team from the first sketch to the final handover. We design, permit and build homes, commercial buildings, schools, municipal halls and roads across Quezon."
      />

      <div className="mt-24 grid items-end gap-y-12 md:grid-cols-12 md:gap-x-6 lg:gap-x-10">
        <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden md:col-span-5" data-cursor="">
          <Image
            src="/images/home-1.jpg"
            alt="Three-storey residence with roof deck in Dapdap, Tayabas City"
            data-parallax
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            quality={85}
            className="h-[118%]! -top-[9%]! object-cover"
          />
        </div>
        <dl className="space-y-12 md:col-span-6 md:col-start-7">
          {FACTS.map((f) => (
            <div key={f.v} data-reveal className="flex items-baseline gap-8 border-t border-line pt-6">
              <dt className="display w-40 shrink-0 text-7xl text-ink md:text-8xl">{f.k}</dt>
              <dd className="max-w-[16rem] text-sm leading-relaxed text-ink/75">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

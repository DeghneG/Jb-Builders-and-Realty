"use client";
import { useReveal } from "@/hooks/useReveal";
import { SERVICES } from "@/lib/data";

export default function Services() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="services" ref={ref} className="bg-ink py-28 text-bone md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-20 grid gap-8 md:grid-cols-12">
          <p data-reveal className="eyebrow text-sand md:col-span-3">
            What we do
          </p>
          <h2 data-reveal className="display text-[clamp(2.4rem,6vw,6rem)] md:col-span-9">
            Everything a project needs, under one roof.
          </h2>
        </div>

        <ul>
          {SERVICES.map((s) => (
            <li
              key={s.n}
              data-reveal
              className="group -mx-6 grid cursor-default gap-6 border-t border-bone/15 px-6 py-10 transition-colors duration-500 hover:bg-bone/[0.05] md:-mx-10 md:grid-cols-12 md:gap-10 md:px-10 md:py-14"
            >
              <span className="eyebrow text-sand transition-colors duration-500 group-hover:text-sand md:col-span-1">
                {s.n}
              </span>
              <div className="transition-transform duration-500 group-hover:translate-x-3 md:col-span-4">
                <h3 className="display text-5xl transition-colors duration-500 group-hover:text-sand md:text-7xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/60 transition-colors duration-500 group-hover:text-bone/80">
                  {s.blurb}
                </p>
              </div>
              <ul className="space-y-3 md:col-span-7 md:columns-2 md:space-y-0 md:[&>li]:mb-3">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-bone/85 transition-colors duration-500 group-hover:text-sand"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-px w-4 shrink-0 bg-sand transition-all duration-500 group-hover:w-8 group-hover:bg-sand"
                    />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="border-t border-bone/15" aria-hidden />
        </ul>
      </div>
    </section>
  );
}


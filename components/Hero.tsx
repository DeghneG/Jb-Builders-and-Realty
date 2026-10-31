"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

const SLIDES = [
  { src: "/images/hall-1.jpg", title: "Lucban Municipal Hall", place: "Lucban, Quezon", word: "hall" },
  { src: "/images/commercial-render-1.jpg", title: "Two-Storey Commercial Building", place: "Lucena City · Design", word: "office" },
  { src: "/images/school-1.jpg", title: "Isabang Elementary School", place: "Tayabas City", word: "school" },
  { src: "/images/home-1.jpg", title: "Three-Storey Residence", place: "Dapdap, Tayabas City", word: "home" },
  { src: "/images/bridge-1.jpg", title: "Concrete Bridge", place: "Quezon Province", word: "bridge" },
];
const WORDS = SLIDES.map((s) => s.word);
const HOLD = 3.5;
const HEX = "50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  useGSAP(
    () => {
      const el = root.current!;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", el);
      const imgs = slides.map((s) => s.querySelector("img")!);
      const mm = gsap.matchMedia();

      mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const reduce = !!ctx.conditions?.reduce;
        gsap.set(slides, { autoAlpha: 0 });
        gsap.set(slides[0], { autoAlpha: 1 });
        if (!reduce) gsap.fromTo(imgs[0], { scale: 1.3 }, { scale: 1.05, duration: 8, ease: "power2.out" });

        // Intro: outline draws itself, headline rises, hex photo opens
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo("[data-outline] polygon", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: 0.25 }, 0)
          .from("[data-note]", { autoAlpha: 0, duration: 1.2, stagger: 0.15 }, 1.6);
        // NOTE: the headline, paragraph and buttons use CSS entrance animations (.rise / .rise-line),
        // so no script can ever leave them hidden.

        // Slideshow + rolling word
        let i = 0;
        const words = el.querySelector("[data-words]");
        const next = () => {
          const n = (i + 1) % SLIDES.length;
          const cur = slides[i];
          const nxt = slides[n];
          gsap.set(cur, { zIndex: 1 });
          if (reduce) {
            gsap.set(nxt, { zIndex: 2, autoAlpha: 0 });
            gsap.to(nxt, { autoAlpha: 1, duration: 1.2 });
            gsap.to(cur, { autoAlpha: 0, delay: 1.3, duration: 0.01 });
          } else {
            gsap.set(nxt, { autoAlpha: 1, zIndex: 2, clipPath: "inset(100% 0% 0% 0%)" });
            gsap.to(nxt, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" });
            gsap.fromTo(imgs[n], { scale: 1.3 }, { scale: 1.05, duration: 8, ease: "power2.out" });
            gsap.to(cur, { autoAlpha: 0, delay: 1.6, duration: 0.01 });
          }
          gsap.to(words, {
            yPercent: -(100 / (WORDS.length + 1)) * (i + 1),
            duration: 1.1,
            ease: "power4.inOut",
            onComplete: () => {
              if (n === 0) gsap.set(words, { yPercent: 0 });
            },
          });
          gsap.fromTo("[data-cap]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.7 });
          i = n;
          setIdx(n);
          call = gsap.delayedCall(HOLD, next);
        };
        let call = gsap.delayedCall(HOLD, next);

        let onMove: ((e: MouseEvent) => void) | undefined;
        if (!reduce) {
          const hx = gsap.quickTo("[data-hexwrap]", "x", { duration: 1.4, ease: "power3" });
          const hy = gsap.quickTo("[data-hexwrap]", "y", { duration: 1.4, ease: "power3" });
          const ox = gsap.quickTo("[data-outline]", "x", { duration: 1.8, ease: "power3" });
          const oy = gsap.quickTo("[data-outline]", "y", { duration: 1.8, ease: "power3" });
          const gx = gsap.quickTo("[data-grid]", "x", { duration: 2, ease: "power3" });
          const gy = gsap.quickTo("[data-grid]", "y", { duration: 2, ease: "power3" });
          onMove = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            hx(nx * -26);
            hy(ny * -18);
            ox(nx * 14);
            oy(ny * 10);
            gx(nx * 18);
            gy(ny * 12);
          };
          el.addEventListener("mousemove", onMove);

          gsap.to("[data-hexwrap]", {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
          });
        }

        return () => {
          call.kill();
          if (onMove) el.removeEventListener("mousemove", onMove);
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink text-bone">
      <div data-grid className="absolute -inset-16" aria-hidden>
        <div className="grid-bg grid-drift absolute -inset-16" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" aria-hidden />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-10 px-6 pb-20 pt-28 md:px-10 lg:grid-cols-12 lg:pb-28">
        {/* Copy */}
        <div data-content className="min-w-0 lg:col-span-7">
          <p className="eyebrow rise mb-7 flex items-center gap-3 text-sand" style={{ ["--d" as string]: "0.3s" }}>
            <span className="h-px w-10 bg-sand" />
            Architects · Designers · Builders
          </p>

          <h1 className="display text-[clamp(3rem,min(8.4vw,15.5svh),8.6rem)] leading-[0.95]">
            <span className="line-mask">
              <span className="rise-line block" style={{ ["--d" as string]: "0.4s" }}>
                We build the
              </span>
            </span>
            <span className="line-mask">
              <span className="rise-line block" style={{ ["--d" as string]: "0.54s" }}>
                <span className="block h-[1.12em] overflow-hidden italic text-sand">
                  <span className="sr-only">{WORDS.join(", ")}</span>
                  <span data-words className="block" aria-hidden>
                    {[...WORDS, WORDS[0]].map((w, k) => (
                      <span key={k} className="block h-[1.12em] leading-[1.12]">
                        {w}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </span>
            <span className="line-mask">
              <span className="rise-line block" style={{ ["--d" as string]: "0.68s" }}>
                you want.
              </span>
            </span>
          </h1>

          <p className="rise mt-8 max-w-md text-base leading-relaxed text-bone/75" style={{ ["--d" as string]: "1s" }}>
            A design and build firm in Tayabas and Lucena. We sketch it, render it, draw the plans and
            build it, since 2017.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-4" style={{ ["--d" as string]: "1.15s" }}>
            <a href="#projects" className="btn btn-sand">
              View our work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Request a quote
            </a>
          </div>
        </div>

        {/* Hexagon window, taken from the logo */}
        <div className="flex min-w-0 flex-col items-center lg:col-span-5">
          <div data-hexwrap className="relative will-change-transform" style={{ width: "min(88%, calc(min(62svh, 600px) * 0.866))", aspectRatio: "0.866" }}>
            <svg
              data-outline
              viewBox="0 0 100 115.47"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
              fill="none"
              aria-hidden
            >
              <polygon points={HEX} pathLength={1} stroke="#d9b98a" strokeWidth="0.35" strokeDasharray="1" strokeDashoffset="0" />
              <g className="spin-slow">
                <polygon points={HEX} pathLength={1} stroke="#d9b98a" strokeOpacity="0.45" strokeWidth="0.25" strokeDasharray="1.2 1.8" transform="translate(50 57.735) scale(1.07) translate(-50 -57.735)" />
              </g>
            </svg>

            <div data-hex className="hex hex-open absolute inset-0 overflow-hidden bg-ink-2">
              {SLIDES.map((s, k) => (
                <div key={s.src} data-slide className="absolute inset-0" style={{ opacity: k === 0 ? 1 : 0 }}>
                  <div className="kb absolute inset-0">
                    <Image
                      src={s.src}
                      alt={`${s.title}, ${s.place}`}
                      fill
                      priority={k === 0}
                      fetchPriority={k === 0 ? "high" : "low"}
                      loading="eager"
                      sizes="(min-width: 768px) 40vw, 80vw"
                      quality={85}
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="scan absolute inset-x-0 top-0" aria-hidden />
            </div>

            {/* Drafting notes */}
            <span data-note className="eyebrow absolute -left-2 top-[14%] hidden -rotate-90 origin-left whitespace-nowrap !text-[0.62rem] text-sand md:block">
              Elevation · A-101
            </span>
            <span data-note className="eyebrow absolute -right-3 bottom-[10%] hidden !text-[0.62rem] text-sand md:block">
              Scale 1:100
            </span>
          </div>

          {/* Caption styled like a dimension line */}
          <div data-cap className="mt-8 w-full max-w-[420px] text-center">
            <div className="flex items-center gap-3 text-bone/40" aria-hidden>
              <span className="h-2 w-px bg-current" />
              <span className="h-px flex-1 bg-current" />
              <span className="eyebrow !text-[0.62rem] text-sand">
                {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-current" />
              <span className="h-2 w-px bg-current" />
            </div>
            <p className="display mt-3 text-2xl">{SLIDES[idx].title}</p>
            <p className="mt-1 text-sm text-bone/60">{SLIDES[idx].place}</p>
          </div>
        </div>
      </div>

    </section>
  );
}


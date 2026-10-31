"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/lib/data";

/**
 * Photo gallery. A native scroll-snap carousel: swipe on touch, trackpad or drag the scrollbar,
 * arrow keys, buttons, or click a thumbnail. Everything stays in sync through the scroll position.
 */
export default function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const n = project.images.length;

  const go = useCallback(
    (to: number) => {
      const t = track.current;
      if (!t) return;
      const k = (to + n) % n;
      t.scrollTo({ left: k * t.clientWidth, behavior: "smooth" });
    },
    [n]
  );

  // Track the current slide from the scroll position, at most once per frame
  const raf = useRef(0);
  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const t = track.current;
      if (!t) return;
      const k = Math.round(t.scrollLeft / t.clientWidth);
      setI((cur) => (cur === k ? cur : k));
    });
  };

  // Keep the active thumbnail centred by scrolling only the thumbnail strip (never the page)
  useEffect(() => {
    const strip = thumbs.current;
    const b = strip?.children[i] as HTMLElement | undefined;
    if (!strip || !b) return;
    strip.scrollTo({ left: b.offsetLeft - strip.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
  }, [i]);

  // Keyboard handler reads the latest values through refs so it is bound once
  const live = useRef({ i, go, onClose });
  live.current = { i, go, onClose };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { i, go, onClose } = live.current;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    root.current?.focus();
    // Fade in ONCE when opened (this used to re-run on every photo change and caused the flash)
    gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, []);

  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} photo gallery`}
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col bg-ink text-bone outline-none"
    >
      <div className="flex items-start justify-between gap-6 px-5 py-4 md:px-10 md:py-6">
        <div className="min-w-0">
          <p className="eyebrow !text-[0.66rem] text-sand">{project.category}</p>
          <h3 className="display mt-1 truncate text-2xl md:text-4xl">{project.title}</h3>
          <p className="mt-1 text-sm text-bone/60">{project.place}</p>
        </div>
        <button onClick={onClose} className="eyebrow shrink-0 border border-bone/30 px-4 py-2.5 transition-colors hover:bg-bone hover:text-ink">
          Close ✕
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={track}
          onScroll={onScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]"
        >
          {project.images.map((src, k) => (
            <div key={src} className="relative h-full w-full shrink-0 snap-center px-4 md:px-24">
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`${project.title}, photo ${k + 1} of ${n}`}
                  fill
                  priority={k < 2}
                  loading="eager"
                  sizes="(min-width: 768px) 80vw, 100vw"
                  quality={85}
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {n > 1 && (
          <>
            <button
              onClick={() => go(i - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 backdrop-blur transition-colors hover:bg-sand hover:text-ink md:flex md:left-6"
            >
              ←
            </button>
            <button
              onClick={() => go(i + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-bone/10 backdrop-blur transition-colors hover:bg-sand hover:text-ink md:flex md:right-6"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-5 px-5 py-4 md:px-10 md:py-6">
        <span className="eyebrow w-14 shrink-0 !text-[0.66rem] text-bone/60">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div ref={thumbs} className="flex flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {project.images.map((src, k) => (
            <button
              key={src}
              onClick={() => go(k)}
              aria-label={`Show photo ${k + 1}`}
              aria-current={k === i}
              className={`relative h-14 w-20 shrink-0 overflow-hidden transition-all duration-300 md:h-16 md:w-24 ${
                k === i ? "opacity-100 ring-2 ring-sand" : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" quality={60} className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/data";

const LINKS = [
  { href: "#built", label: "Built" },
  { href: "#projects", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pay-later", label: "Pay later" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        dark ? "border-b border-bone/10 bg-ink/85 text-bone backdrop-blur-md" : "border-b border-transparent text-bone"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="JB Builders & Realty, back to top">
          <Image
            src="/brand/mark-light.png"
            alt=""
            width={320} height={350}
            className="h-11 w-auto"
            priority
          />
          <span className="leading-tight">
            <span className="block text-[0.95rem] font-semibold tracking-[0.12em] uppercase">
              JB Builders
            </span>
            <span className="block text-[0.62rem] tracking-[0.3em] uppercase opacity-70">
              & Realty
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="eyebrow relative py-3 opacity-80 transition-opacity hover:opacity-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-ghost !py-2.5"
          >
            Get a quote
          </a>
        </nav>

        <button
          className="eyebrow -mr-3 min-h-11 min-w-11 px-3 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-[76px] h-[calc(100vh-76px)] bg-ink px-6 pt-10 text-bone md:hidden"
        >
          <ul className="display space-y-6 text-4xl">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm opacity-70">{SITE.phone1}</p>
        </div>
      )}
    </header>
  );
}



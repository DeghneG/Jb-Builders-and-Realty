"use client";
import Image from "next/image";
import { SITE } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

export default function Footer() {
  const ref = useReveal<HTMLElement>();
  return (
    <footer ref={ref} className="bg-ink text-bone">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 border-t border-bone/15 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <Image
          data-reveal
          src="/brand/logo-light.png"
          alt="JB Builders and Realty Development, since 2017"
          width={610}
          height={430}
          className="h-24 w-auto"
        />
        <p data-reveal className="text-sm text-bone/70">
          © {new Date().getFullYear()} {SITE.name}. Lucena City & Tayabas City, Quezon Province.
        </p>
        <a data-reveal href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="eyebrow -m-3 p-3 hover:text-sand">
          Facebook ↗
        </a>
      </div>
    </footer>
  );
}

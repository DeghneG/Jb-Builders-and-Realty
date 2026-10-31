"use client";
import Image from "next/image";
import { SITE, SERVICES } from "@/lib/data";
import { useReveal } from "@/hooks/useReveal";

const NAV = [
  { href: "#built", label: "Before & after" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#pay-later", label: "Build now, pay later" },
  { href: "#contact", label: "Contact" },
];

const AREAS = ["Tayabas City (home office)", "Lucena City", "Lucban", "Across Quezon Province"];

const col = "eyebrow mb-5 !text-[0.68rem] text-sand";
const link = "inline-block py-1.5 text-bone/75 transition-colors hover:text-sand";

export default function Footer() {
  const ref = useReveal<HTMLElement>();
  return (
    <footer ref={ref} className="relative isolate overflow-hidden bg-ink text-bone">
      {/* Background photo: dimmed, with a dark wash that gets stronger behind the text */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image src="/images/footer.jpg" alt="" fill sizes="100vw" quality={80} className="object-cover object-center opacity-[0.3]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink/85" />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 pt-20 md:px-10 md:pt-28">
        {/* Call to action */}
        <div className="grid gap-10 border-b border-bone/15 pb-16 md:grid-cols-12 md:items-end md:pb-20">
          <h2 data-reveal className="display text-[clamp(2.2rem,5.4vw,5rem)] md:col-span-8">
            Ready to build the <span className="italic text-sand">home you want?</span>
          </h2>
          <div data-reveal className="flex flex-wrap gap-4 md:col-span-4 md:justify-end">
            <a href="#contact" className="btn btn-sand">
              Request a quote
            </a>
            <a href={SITE.phone1Href} className="btn btn-ghost">
              Call {SITE.phone1}
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-x-8 gap-y-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-12">
          <div data-reveal className="sm:col-span-2 lg:col-span-4">
            <Image src="/brand/logo-light.png" alt="JB Builders and Realty Development, since 2017" width={610} height={430} className="h-24 w-auto" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/70">
              {SITE.tagline} Architectural design, construction and real estate development in Quezon Province, since {SITE.founded}.
            </p>
          </div>

          <nav data-reveal aria-label="Footer" className="lg:col-span-2">
            <p className={col}>Explore</p>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal className="lg:col-span-2">
            <p className={col}>What we do</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.n}>
                  <a href="#services" className={link}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className={`${col} mt-8`}>Where we work</p>
            <ul className="text-sm text-bone/75">
              {AREAS.map((a) => (
                <li key={a} className="py-1">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="lg:col-span-4">
            <p className={col}>Get in touch</p>
            <ul className="space-y-1">
              <li>
                <a href={SITE.phone1Href} className={link}>
                  {SITE.phone1}
                </a>
              </li>
              <li>
                <a href={SITE.phone2Href} className={link}>
                  {SITE.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={link}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className={link}>
                  Facebook: Jb Builders and Realty ↗
                </a>
              </li>
            </ul>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/70">Office: {SITE.base}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-bone/70">Services: building and occupancy permits, site supervision and cost estimates.</p>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="overflow-hidden" aria-hidden>
        <p data-reveal className="display select-none whitespace-nowrap px-4 pb-[0.16em] text-center text-[11.7vw] leading-[0.95] tracking-[-0.045em] text-bone/95">
          JB Builders <span className="italic text-sand">and Realty</span>
        </p>
      </div>
      <h2 className="sr-only">{SITE.name}</h2>

      {/* Legal bar */}
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 border-t border-bone/15 px-6 py-8 text-sm text-bone/70 md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Lucena City & Tayabas City, Quezon Province.
        </p>
        <a href="#top" className="eyebrow -m-3 p-3 !text-[0.68rem] text-bone hover:text-sand">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

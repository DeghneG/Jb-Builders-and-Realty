"use client";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { SITE } from "@/lib/data";

const TYPES = ["New home", "Commercial building", "Renovation / repair", "Road or infrastructure", "Design only", "Other"];

const field =
  "w-full border-0 border-b border-bone/30 bg-transparent py-3 text-bone placeholder:text-bone/40 focus:border-sand focus:outline-none";

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const [status, setStatus] = useState<"idle" | "mailto">("idle");

  // Proposal build: no backend. The form opens the visitor's email app with the message filled in.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Project type: ${d.get("type")}`,
      "",
      `${d.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      "Project inquiry from " + d.get("name")
    )}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  return (
    <section id="contact" ref={ref} className="bg-ink py-28 text-bone md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-y-16 px-6 md:grid-cols-12 md:gap-x-6 md:px-10 lg:gap-x-16">
        <div className="md:col-span-5">
          <p data-reveal className="eyebrow mb-6 text-sand">
            Start a project
          </p>
          <h2 data-reveal className="display text-[clamp(2.4rem,5vw,4.6rem)]">
            Let&rsquo;s build the home you want.
          </h2>
          <dl data-reveal className="mt-12 space-y-6 text-bone/80">
            <div>
              <dt className="eyebrow mb-1 text-sand">Call</dt>
              <dd>
                <a href={SITE.phone1Href} className="hover:text-sand">{SITE.phone1}</a>
                <span className="mx-2 opacity-40">/</span>
                <a href={SITE.phone2Href} className="hover:text-sand">{SITE.phone2}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-1 text-sand">Email</dt>
              <dd><a href={`mailto:${SITE.email}`} className="hover:text-sand">{SITE.email}</a></dd>
            </div>
            <div>
              <dt className="eyebrow mb-1 text-sand">Message us</dt>
              <dd>
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                  Facebook: Jb Builders and Realty ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-1 text-sand">Office</dt>
              <dd>{SITE.base}</dd>
            </div>
          </dl>
        </div>

        <form data-reveal onSubmit={onSubmit} className="space-y-8 md:col-span-6 md:col-start-7">
          <label className="block">
            <span className="eyebrow text-bone/60">Your name</span>
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="block">
            <span className="eyebrow text-bone/60">Phone number</span>
            <input name="phone" type="tel" required autoComplete="tel" className={field} />
          </label>
          <label className="block">
            <span className="eyebrow text-bone/60">Project type</span>
            <select name="type" className={`${field} [&>option]:text-ink`} defaultValue={TYPES[0]}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="eyebrow text-bone/60">Tell us about it</span>
            <textarea name="message" rows={4} required className={field} />
          </label>
          <button type="submit" className="btn btn-sand">
            Send inquiry
          </button>
          <p role="status" className="min-h-6 text-sm text-bone/70">
            {status === "mailto" &&
              "Your email app should open with the message ready to send. You can also call or message us on Facebook."}
          </p>
        </form>
      </div>
    </section>
  );
}

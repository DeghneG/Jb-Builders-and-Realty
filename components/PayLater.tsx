"use client";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

export default function PayLater() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="pay-later" ref={ref} className="bg-sand text-ink">
      <div className="mx-auto grid max-w-[1400px] items-center gap-y-12 px-6 py-24 md:grid-cols-12 md:gap-x-6 md:px-10 md:py-36 lg:gap-x-10">
        <div data-reveal="image" className="relative overflow-hidden aspect-[5/4] md:col-span-5">
          <Image
            src="/images/home-3.jpg"
            alt="Finished interior of a residence built by JB Builders"
            fill
            data-parallax
            sizes="(min-width: 768px) 40vw, 100vw"
            quality={85}
            className="h-[118%]! -top-[9%]! object-cover"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="eyebrow mb-6">
            Flexible financing
          </p>
          <h2 data-reveal className="display text-[clamp(3rem,8vw,8rem)] leading-[0.95]">
            Build now, <span className="italic">pay later.</span>
          </h2>
          <p data-reveal className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">
            Start building your home or commercial space without waiting until you have
            everything saved up. Message us with your project and we will walk you through how
            it works.
          </p>
          <a data-reveal href="#contact" className="btn btn-ink mt-10">
            Ask about it
          </a>
        </div>
      </div>
    </section>
  );
}


import SmoothScroll from "@/components/SmoothScroll";
import { Cursor, Chatbot } from "@/components/Lazy";
import Layer from "@/components/Layer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import BeforeAfter from "@/components/BeforeAfter";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import PayLater from "@/components/PayLater";
import Areas from "@/components/Areas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Header />
      {/* Each section is a "page" that slowly slides up over the previous one */}
      <main className="relative bg-ink">
        <Layer z={1} round={false}>
          <Hero />
        </Layer>
        <Layer z={2} bg="bg-paper">
          <Intro />
        </Layer>
        <Layer z={3} bg="bg-ink">
          <BeforeAfter />
        </Layer>
        <Layer z={4} bg="bg-paper">
          <Projects />
        </Layer>
        <Layer z={5} bg="bg-ink">
          <Services />
        </Layer>
        <Layer z={6} bg="bg-sand">
          <PayLater />
        </Layer>
        <Layer z={7} bg="bg-bone">
          <Areas />
        </Layer>
        <Layer z={8} bg="bg-ink">
          <Contact />
        </Layer>
        <Layer z={9} bg="bg-ink">
          <Footer />
        </Layer>
      </main>
      <Chatbot />
    </>
  );
}

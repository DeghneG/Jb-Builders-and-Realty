import SmoothScroll from "@/components/SmoothScroll";
import { Cursor, Chatbot } from "@/components/Lazy";
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
      <main>
        <Hero />
        <Intro />
        <BeforeAfter />
        <Projects />
        <Services />
        <PayLater />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

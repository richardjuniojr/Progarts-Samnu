import Banner from "../components/sections/home/Banner";
import About from "../components/sections/home/About";
import Projects from "../components/sections/home/Projects";
import Gallery from "../components/sections/home/Gallery";
import Contact from "../components/sections/home/Contact";
import AnimatedSection from "../components/ui/AnimatedSection";

export default function HomePage() {
  return (
    <>
      <AnimatedSection>
        <Banner />
      </AnimatedSection>
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Projects />
      </AnimatedSection>
      <AnimatedSection>
        <Gallery />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
    </>
  );
}

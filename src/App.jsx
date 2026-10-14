import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Marquee from './components/Marquee.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import Seo from './components/Seo.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Services from './sections/Services.jsx'
import Portfolio from './sections/Portfolio.jsx'
import WhyChooseUs from './sections/WhyChooseUs.jsx'
import Contact from './sections/Contact.jsx'
import { services } from './data/services.js'

// Decorative strip — only client-approved service categories.
const MARQUEE_WORDS = services.map((service) => service.title)

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Seo />
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <SmoothScroll>
        {/* Top offset lives INSIDE the smoother content — ScrollSmoother pins
            #smooth-wrapper to the viewport, so padding on an outer element
            would never move the page content. */}
        <main id="main" className="pt-16 sm:pt-[4.5rem]">
          <Hero />
          <About />
          <Marquee words={MARQUEE_WORDS} />
          <Services />
          <Portfolio />
          <WhyChooseUs />
          <Contact />
        </main>

        <Footer />
      </SmoothScroll>
    </div>
  )
}

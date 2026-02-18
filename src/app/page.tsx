'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Components
import Navigation from '@/components/Navigation'
import BurgerSequenceCanvas from '@/components/BurgerSequenceCanvas'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import ScrollIndicator from '@/components/ScrollIndicator'
import ShowcaseSection, { burgerMenuItems, milkshakeItems, coffeeDessertItems } from '@/components/ShowcaseSection'
import Footer from '@/components/Footer'
import LocationCard from '@/components/LocationCard'

// Location data
const locations = [
  { city: 'Stockholm', address: 'Gallerian, Sergelgatan', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gallerian+Sergelgatan+Stockholm' },
  { city: 'Göteborg', address: 'Nordstan, Östra Hamngatan', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nordstan+%C3%96stra+Hamngatan+G%C3%B6teborg' },
  { city: 'Malmö', address: 'Triangeln, Malmö Centrum', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Triangeln+Malm%C3%B6+Centrum' },
]

export default function Home() {
  // Shared scroll container ref for all scroll-linked animations
  const containerRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Prevent scrolling while images are loading
  useEffect(() => {
    if (!imagesLoaded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [imagesLoaded])

  // Shared scroll progress - all components use this
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring for buttery animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // DYNAMIC HEADLINES - Reduced to 4 headlines for better readability
  // Each headline now gets 25% of scroll time (vs 12.5% before)

  // Headline texts - Swedish, following competitive analysis insights
  const headlines = [
    {
      title: "SMASH. STACK. REPEAT.",
      subtitle: "Den nya generationens burgare",
      cta: "Scrolla för att bygga din burgare"
    },
    {
      title: "Svenskt kött. Bakat idag.",
      subtitle: "Inga mellanhand. Bara kvalitet från gård till container.",
      cta: "Färskt varje dag"
    },
    {
      title: "Smashad till perfektion.",
      subtitle: "Enkelt. Äkta. Gott.",
      cta: "Från food truck till hela Sverige"
    },
    {
      title: "Premium smak.",
      subtitle: "Utan premium-pris.",
      cta: "Burgare för folket."
    }
  ]

  return (
    <main id="main-content" className="relative bg-deep-black">
      {/* Navigation */}
      <Navigation />

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* MAIN SCROLL CONTAINER - 1000vh for extended animation journey on web */}
      <div ref={containerRef} className="relative h-screen md:h-[1000vh]">

        {/* Sticky viewport - contains canvas/video and fixed text overlays */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

          {/* Mobile Video - Hidden on md+ screens */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-contain md:hidden bg-deep-black -translate-y-[12.5%]"
            poster="/HomePageImages/frame_0001.jpg"
          >
            <source src="/HomePageImages/MisterYorkVid.mp4" type="video/mp4" />
          </video>

          {/* Burger Animation Canvas - Hidden on mobile, shown on md+ */}
          <div className="hidden md:block absolute inset-0">
            <BurgerSequenceCanvas
              scrollProgress={scrollYProgress}
              onImagesLoaded={() => setImagesLoaded(true)}
            />
          </div>

          {/* TEXT OVERLAYS - Dynamic headlines synchronized with burger animation */}

          {/* MOBILE HEADLINE - Always visible, first headline only */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none md:hidden -translate-y-[12.5%]">
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-deep-black/60 to-deep-black/80 pointer-events-none" />

            <div className="relative max-w-5xl text-center px-4">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}>
                {headlines[0].title}
              </h1>
              <p className="text-xl text-white mb-3 tracking-wide drop-shadow-xl font-medium" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)' }}>
                {headlines[0].subtitle}
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-york-gold drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {headlines[0].cta}
              </p>
            </div>
          </div>

          {/* DESKTOP DYNAMIC HEADLINE SECTION - 4 headlines positioned absolutely, hidden on mobile */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none hidden md:flex">
            {headlines.map((headline, index) => {
              // Calculate opacity range for this headline (4 headlines = 25% each)
              const startProgress = index * 0.25
              const endProgress = (index + 1) * 0.25
              const midProgress = startProgress + (endProgress - startProgress) / 2

              const opacity = useTransform(smoothProgress, [startProgress, midProgress, endProgress], [0, 1, 0])
              const y = useTransform(smoothProgress, [startProgress, midProgress], [20, 0])
              

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-deep-black/80 via-deep-black/60 to-deep-black/80 pointer-events-none" />

                  <div className="relative max-w-5xl text-center px-4 md:px-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-8 text-white drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}>
                      {headline.title}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-4xl text-white mb-3 md:mb-6 tracking-wide drop-shadow-xl font-medium" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)' }}>
                      {headline.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm md:text-lg uppercase tracking-widest text-york-gold drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                      {headline.cta}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>

      {/* SECTIONS AFTER ANIMATION - Normal scrollable content */}

      {/* BURGER MENU SHOWCASE */}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 sm:px-6 lg:px-12 pt-8 md:pt-16 pb-4 bg-deep-black"
      >
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-york-gold tracking-widest">MENY</p>
        <h2 className="text-heading mb-4 text-white">
          Tillverkat med omsorg
        </h2>
        <p className="text-body text-white/60">
          Varje burgare är ett konstverk – från briochebrödet som är bakat från grunden med surdeg, till perfekt kryddskött kött som är smashad till precis rätt texturen. Det är konst.
        </p>
      </motion.div>

      <ShowcaseSection
        items={burgerMenuItems}
        imageSrc="/HomePageImages/Burger_Menu.png"
        imageAlt="Mister York Burger Menu"
        ctaText="Se hela menyn"
        ctaHref="https://order.misteryork.se/se/sv-se"
      />

      {/* MILKSHAKES SHOWCASE */}
      <ShowcaseSection
        items={milkshakeItems}
        imageSrc="/HomePageImages/ThreeMilkShakes-removebg-preview.png"
        imageAlt="Mister York Milkshakes - Chocolate, Oreo, Strawberry"
        ctaText="Beställ shakes nu"
        ctaHref="https://order.misteryork.se/se/sv-se"
      />

      {/* COFFEE & DESSERT SHOWCASE */}
      <ShowcaseSection
        items={coffeeDessertItems}
        imageSrc="/HomePageImages/KaffeDessert.png"
        imageAlt="Mister York Coffee and Dessert - Latte, Oreo Swirl, Daim Swirl"
        ctaText="Beställ kaffe & dessert"
        ctaHref="https://order.misteryork.se/se/sv-se"
      />

      {/* SECTION 5: TESTIMONIALS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-deep-black">
        <Testimonials />
      </section>

      {/* SECTION 6: CTA */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-deep-black">
        <div className="mx-auto max-w-4xl">
          <CTASection />
        </div>
      </section>

      {/* SECTION 7: HITTA OSS */}
      <section id="hitta-oss" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-deep-black">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-york-gold tracking-widest">HITTA OSS</p>
            <h2 className="text-heading mb-4 text-white">
              20+ restauranger i Sverige
            </h2>
            <p className="text-body text-white/60">
              Hitta din närmaste Mister York och smaka på den bästa smash-burgaren i Sverige.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <LocationCard
                key={location.city}
                city={location.city}
                address={location.address}
                mapUrl={location.mapUrl}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <a
              href="https://www.misteryork.se/hitta-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Se alla restauranger
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

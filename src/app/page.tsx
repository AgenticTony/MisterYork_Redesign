'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'

// Components
import Navigation from '@/components/Navigation'
import BurgerSequenceCanvas from '@/components/BurgerSequenceCanvas'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import ScrollIndicator from '@/components/ScrollIndicator'

// Animation variants
import { fadeInUp, scaleIn, slideInRight, createFadeInUp } from '@/lib/animations'

export default function Home() {
  // Shared scroll container ref for all scroll-linked animations
  const containerRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentYear, setCurrentYear] = useState(2026)

  // Set current year on client side only
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

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
    <main className="relative bg-deep-black">
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
      <section className="relative pt-2 pb-8 md:pb-16 px-4 sm:px-6 lg:px-12 bg-deep-black">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-york-gold tracking-widest">MENY</p>
            <h2 className="text-heading mb-4 text-white">
              Tillverkat med omsorg
            </h2>
            <p className="text-body text-white/60">
              Varje burgare är ett konstverk – från briochebrödet som är bakat från grunden med surdeg, till perfekt kryddskött kött som är smashad till precis rätt texturen. Det är konst.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:h-[500px]">
            {/* Burger Menu Image */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="order-1 md:order-1"
            >
              <img
                src="/HomePageImages/Burger_Menu.png"
                alt="Mister York Burger Menu"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Menu Highlights */}
            <div className="flex flex-col space-y-4 order-2 md:order-2">
              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Signature Smash</h3>
                <p className="text-white/70">
                  Vår signaturburger med 100% svenskt nötkött, cheddarost, sallad, och hemgjord sås. Den som startade allt.
                </p>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Bacon Double Smash</h3>
                <p className="text-white/70">
                  Dubbel smashad, bacon, cheddar, sallad och sås. För den som vill ha mer av det goda.
                </p>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Chicken Smash</h3>
                <p className="text-white/70">
                Marinerad kyckling med knappt sallad, bacon och cheddar. Ett lättare alternativ för den som föredrar kyckling.
                </p>
              </motion.div>

              {/* CTA Button - Hidden on mobile (has sticky bottom button) */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 hidden md:block"
              >
                <a
                  href="https://order.misteryork.se/se/sv-se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center w-full py-4"
                >
                  Se hela menyn
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MILKSHAKES SHOWCASE */}
      <section className="relative py-8 md:py-16 px-4 sm:px-6 lg:px-12 bg-deep-black">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:h-[500px]">
            {/* Milkshake Image - First on mobile */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="order-1 md:order-1 h-full"
            >
              <img
                src="/HomePageImages/ThreeMilkShakes-removebg-preview.png"
                alt="Mister York Milkshakes - Chocolate, Oreo, Strawberry"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Flavors List - Second on mobile */}
            <div className="flex flex-col space-y-4 order-2 md:order-2">
              {/* Chocolate Shake */}
              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Chocolate Shake</h3>
                <p className="text-white/70">
                  Krämig chokladsmash gjord på premium belgisk choklad. Silky smooth med en intens kakaosmak som tar dig tillbaka till barndomsminnen.
                </p>
              </motion.div>

              {/* Oreo Crunch Shake */}
              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Crunchy Oreo med Grädd</h3>
                <p className="text-white/70">
                  Den perfekta kombinationen: krossar Oreo-kex med krämig vaniljgrädd. Knasig crunch i varje slurk tillsammans med lenmande choklad- och oreo-smak.
                </p>
              </motion.div>

              {/* Strawberry Shake */}
              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Sweet Strawberry</h3>
                <p className="text-white/70">
                  Söt och frisk jordgubbssmooth gjord på svenska jordgubbar. En klassiker som aldrig går ur stil – naturlig sötma med frisk syrlighet.
                </p>
              </motion.div>

              {/* CTA Button - Hidden on mobile (has sticky bottom button) */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 hidden md:block"
              >
                <a
                  href="https://order.misteryork.se/se/sv-se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center w-full py-4"
                >
                  Beställ shakes nu
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* COFFEE & DESSERT SHOWCASE */}
      <section className="relative py-8 md:py-16 px-4 sm:px-6 lg:px-12 bg-deep-black">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:h-[500px]">
            {/* Coffee & Dessert Image */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="order-1 md:order-1"
            >
              <img
                src="/HomePageImages/KaffeDessert.png"
                alt="Mister York Coffee and Dessert - Latte, Oreo Swirl, Daim Swirl"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-4 order-2 md:order-2">
              {/* Latte */}
              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Latte</h3>
                <p className="text-white/70">
                  Nybryggd espressoblandad med silkeslen ångad mjölk. Perfekt balans mellan stark kaffe och krämig mjölk.
                </p>
              </motion.div>

              {/* Oreo Swirl */}
              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Oreo Swirl</h3>
                <p className="text-white/70">
                  Hemgjord vaniljglass swirlad med krossat Oreo-kex. Krämig, knasig och helt underbar.
                </p>
              </motion.div>

              {/* Daim Swirl */}
              <motion.div
                variants={slideInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Daim Swirl</h3>
                <p className="text-white/70">
                  Svensk karamellglass med bitar av Daim. Salt karamell möter chokladkrunch i varje tugga.
                </p>
              </motion.div>

              {/* CTA Button - Hidden on mobile (has sticky bottom button) */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 hidden md:block"
              >
                <a
                  href="https://order.misteryork.se/se/sv-se"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center w-full py-4"
                >
                  Beställ kaffe & dessert
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 2: QUALITY}
      <section className="relative py-8 md:py-16 px-4 sm:px-6 lg:px-12 bg-deep-black">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="text-label mb-4 text-york-gold">01 / KVALITET</p>
            <h2 className="text-heading mb-6 text-white">
              Bra kött. Bra bröd. Inga hemligheter.
            </h2>
            <p className="text-body text-white/60 mb-4">
              Svenskt nötkött. Briochebröd bakat dagligen. Vår signatur-sås gjord från grunden. Inga genvägar, inga kompromisser.
            </p>
            <p className="text-sm text-white/40 italic">
              Swedish beef. Brioche buns baked daily. Our signature sauce made from scratch. No shortcuts, no compromises.
            </p>
          </div>
        </div>
      </section>

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
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
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
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <h3 className="text-xl font-bold text-york-gold mb-2">Stockholm</h3>
              <p className="text-white/70 text-sm mb-4">Gallerian, Sergelgatan</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-york-gold text-sm transition-colors inline-flex items-center gap-2"
              >
                <span>Visa på karta</span>
                <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <h3 className="text-xl font-bold text-york-gold mb-2">Göteborg</h3>
              <p className="text-white/70 text-sm mb-4">Nordstan, Östra Hamngatan</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-york-gold text-sm transition-colors inline-flex items-center gap-2"
              >
                <span>Visa på karta</span>
                <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <h3 className="text-xl font-bold text-york-gold mb-2">Malmö</h3>
              <p className="text-white/70 text-sm mb-4">Triangeln, Malmö Centrum</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-york-gold text-sm transition-colors inline-flex items-center gap-2"
              >
                <span>Visa på karta</span>
                <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
      <footer className="relative z-10 bg-deep-black border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.svg"
                  alt="Mister York"
                  className="h-10 w-auto"
                />
                <h3 className="text-2xl font-bold text-white">MISTER YORK</h3>
              </div>
              <p className="text-white/60 max-w-md">
                Den nya generationens burgare. Premium smash burgers utan premium-priser.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-label mb-4">Snabblänkar</h4>
              <ul className="space-y-2">
                <li><a href="#meny" className="text-white/60 hover:text-white transition-colors">Meny</a></li>
                <li><a href="#hitta-oss" className="text-white/60 hover:text-white transition-colors">Hitta oss</a></li>
                <li><Link href="/om-oss" className="text-white/60 hover:text-white transition-colors">Om oss</Link></li>
                <li><a href="https://www.misteryork.se/karriar" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Karriär</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-label mb-4">Nyhetsbrev</h4>
              <p className="text-sm text-white/60 mb-4">Bli en York-insider</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="din@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-york-red"
                />
                <button className="btn-primary px-4 py-2 text-sm">
                  Gå med
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} Mister York. Alla rättigheter förbehållna.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { fadeInUp, slideInLeft, slideInRight, scaleIn, createScaleIn, hoverTap, mobileMenuItem } from '@/lib/animations'

export default function OmOssPage() {
  const [currentYear, setCurrentYear] = useState(2026)

  // Set current year on client side only
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])
  return (
    <main className="relative bg-deep-black min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="/OmOss/hero_image.JPG"
          alt="Mister York Food Truck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-deep-black/30 via-deep-black/50 to-deep-black" />
      </section>

      {/* Hero Title Section */}
      <section className="py-12 pb-4 px-6 sm:px-8 lg:px-12 bg-deep-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              OM OSS
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              En hemmasnickrad food truck och ett brinnande intresse för riktigt bra burgare var startskottet för Mister York under pandemin 2020.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="pt-8 pb-12 px-6 sm:px-8 lg:px-12 bg-deep-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={mobileMenuItem}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-body text-white/80 leading-relaxed text-lg">
              Vad som då var en aningslös satsning i svåra tider påvisade en stark efterfrågan efter lättillgänglig take away-mat av hög kvalitét. Konceptet har sedan dess utvecklats och expanderat vidare i landet men kärleken till produkten kvarstår och York-kulturen växer sig starkare för varje dag som går. Det är våra medarbetare som gör det vi står för möjligt och vi blir ständigt inspirerade av hur många som delar samma förkärlek som vi gör till riktigt bra burgare, service och arbetskultur. Vi ska vara nytänkande, autentiska och alltid ödmjuka inför självförbättring.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section with Image */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-deep-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <p className="text-label mb-4 text-york-gold">HISTORIA</p>
              <h2 className="text-heading mb-6 text-white">Vår historia</h2>
              <p className="text-body text-white/70 mb-4 leading-relaxed">
                En hemmasnickrad food truck och ett brinnande intresse hos två grabbar att skapa den bästa burgaren var startskottet för Mister York. Mitt i pandemin ökade behovet av lättillgänglig take away-mat, arbetslösheten steg och Gustav Haglund tillsammans med Gustav Larsson bestämde sig för att gå sin egen väg.
              </p>
              <p className="text-body text-white/70 leading-relaxed">
                Food trucken studsade fram över Kalmars gator strax före lunch. Kön var lång redan före öppning. En overklig känsla. Efter första veckan hade det byggts upp en familj av stammisar som besökte food trucken flera gånger i veckan. Trycket i luckan ökade för varje dag som gick och det dröjde inte länge förrän de första medarbetarna anställdes för att klara kapaciteten som krävdes för att möta efterfrågan.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/OmOss/2a1b8216-d0fc-42ad-9757-c5db718c7964_image_6483441-2.JPG"
                alt="Vår historia"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-deep-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.img
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              src="/OmOss/2001e139-949f-49ad-98fd-16bf619634ee_image_6483441-8.JPG"
              alt="Mister York"
              className="w-full h-auto object-cover rounded-lg"
            />
            <motion.img
              variants={createScaleIn(0.1)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              src="/OmOss/499ab4f9-fcb4-40f9-973f-df019c158c27_image_6483441-5.JPG"
              alt="Mister York"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-deep-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={mobileMenuItem}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-label mb-4 text-york-gold">VÅR VISION</p>
            <h2 className="text-heading mb-6 text-white">York-kulturen</h2>
            <p className="text-body text-white/70 leading-relaxed mb-6">
              Idag har konceptet förändrats: burgarna har utvecklats, medarbetare och kunder har blivit fler. Kvarstår gör kärleken till maten, de som dagligen besöker oss och hantverket bakom den perfekta street food-burgaren. På Mister York samlas människor med samma kärlek till burgare som vi. Medarbetare som kund, nörd som icke nörd, alla är välkomna oavsett bakgrund.
            </p>
            <p className="text-body text-white/70 leading-relaxed">
              Vi nöjer oss inte med att bli bäst i vår region, vi ska sätta Mister York på kartan för övriga delar av världen genom att förändra synen på fast food och visa hur god en burgare kan vara. I vår värld är det inte omöjligt att ta en högkvalitativ burgare tillagad från grunden och servera på kort tid med bra service. Vi vill bevisa att det går att kombinera det bästa från fast food-världen med en grym produkt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Växjö Enhet Image */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-deep-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-label mb-4 text-york-gold">VÅRA ENHETER</p>
            <h2 className="text-heading text-white">Från container till hela Sverige</h2>
          </motion.div>
          <motion.img
            variants={scaleIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            src="/OmOss/vaxjo_enhet.jpg"
            alt="Växjö Enhet"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-deep-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <img
                src="/OmOss/9ae13c0b-f5a3-43ca-8297-1e00e0e18fb7_misteryork_2023_profil_case4.jpg"
                alt="Mister York Team"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <p className="text-label mb-4 text-york-gold">KARRIÄR</p>
              <h2 className="text-heading mb-6 text-white">Bli en del av Mister York</h2>
              <p className="text-body text-white/70 mb-4 leading-relaxed">
                Var med på vår expansion. Vi söker nu flera nya medarbetare med olika tjänster till teamet.
              </p>
              <p className="text-body text-white/70 mb-6 leading-relaxed">
                På Mister York så rekryterar vi utifrån personlighet och potential och inte endast utifrån tidigare erfarenheter. Vi erbjuder er full utbildning på plats. Tveka inte på att höra av dig!
              </p>
              <motion.a
                href="https://career.misteryork.se/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
                variants={hoverTap}
                whileHover="hover"
                whileTap="tap"
              >
                Jobba med oss
              </motion.a>
            </motion.div>
          </div>
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
                <li><Link href="/#meny" className="text-white/60 hover:text-white transition-colors">Meny</Link></li>
                <li><Link href="/#hitta-oss" className="text-white/60 hover:text-white transition-colors">Hitta oss</Link></li>
                <li><Link href="/om-oss" className="text-white/60 hover:text-white transition-colors">Om oss</Link></li>
                <li><Link href="/#karriar" className="text-white/60 hover:text-white transition-colors">Karriär</Link></li>
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
              <a href="https://www.facebook.com/misteryorkburgers/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
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

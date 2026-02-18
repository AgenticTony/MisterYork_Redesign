'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function OmOssPage() {
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="/OmOss/2001e139-949f-49ad-98fd-16bf619634ee_image_6483441-8.JPG"
              alt="Mister York"
              className="w-full h-auto object-cover rounded-lg"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-label mb-4 text-york-gold">VÅRA ENHETER</p>
            <h2 className="text-heading text-white">Från container till hela Sverige</h2>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <img
                src="/OmOss/9ae13c0b-f5a3-43ca-8297-1e00e0e18fb7_misteryork_2023_profil_case4.jpg"
                alt="Mister York Team"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Jobba med oss
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

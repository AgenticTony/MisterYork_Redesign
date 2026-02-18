'use client'

import { motion } from 'framer-motion'

interface ShowcaseItem {
  id: number
  title: string
  description: string
}

export const burgerMenuItems: ShowcaseItem[] = [
  {
    id: 1,
    title: 'Signature Smash',
    description: 'Vår signaturburger med 100% svenskt nötkött, cheddarost, sallad, och hemgjord sås. Den som startade allt.',
  },
  {
    id: 2,
    title: 'Bacon Double Smash',
    description: 'Dubbel smashad, bacon, cheddar, sallad och sås. För den som vill ha mer av det goda.',
  },
  {
    id: 3,
    title: 'Chicken Smash',
    description: 'Marinerad kyckling med knappt sallad, bacon och cheddar. Ett lättare alternativ för den som föredrar kyckling.',
  },
]

export const milkshakeItems: ShowcaseItem[] = [
  {
    id: 1,
    title: 'Chocolate Shake',
    description: 'Krämig chokladsmash gjord på premium belgisk choklad. Silky smooth med en intens kakaosmak som tar dig tillbaka till barndomsminnen.',
  },
  {
    id: 2,
    title: 'Crunchy Oreo med Grädd',
    description: 'Den perfekta kombinationen: krossar Oreo-kex med krämig vaniljgrädd. Knasig crunch i varje slurk tillsammans med lenmande choklad- och oreo-smak.',
  },
  {
    id: 3,
    title: 'Sweet Strawberry',
    description: 'Söt och frisk jordgubbssmooth gjord på svenska jordgubbar. En klassiker som aldrig går ur stil – naturlig sötma med frisk syrlighet.',
  },
]

export const coffeeDessertItems: ShowcaseItem[] = [
  {
    id: 1,
    title: 'Latte',
    description: 'Nybryggd espressoblandad med silkeslen ångad mjölk. Perfekt balans mellan stark kaffe och krämig mjölk.',
  },
  {
    id: 2,
    title: 'Oreo Swirl',
    description: 'Hemgjord vaniljglass swirlad med krossat Oreo-kex. Krämig, knasig och helt underbar.',
  },
  {
    id: 3,
    title: 'Daim Swirl',
    description: 'Svensk karamellglass med bitar av Daim. Salt karamell möter chokladkrunch i varje tugga.',
  },
]

interface ShowcaseSectionProps {
  items: ShowcaseItem[]
  imageSrc: string
  imageAlt: string
  ctaText: string
  ctaHref: string
  reverseOrder?: boolean
}

export default function ShowcaseSection({
  items,
  imageSrc,
  imageAlt,
  ctaText,
  ctaHref,
  reverseOrder = false,
}: ShowcaseSectionProps) {
  return (
    <section className="relative py-8 md:py-16 px-4 sm:px-6 lg:px-12 bg-deep-black">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:h-[500px]">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-1"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </motion.div>

          {/* Items List */}
          <div className="flex flex-col space-y-4 order-2 md:order-2">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </motion.div>
            ))}

            {/* CTA Button - Hidden on mobile (has sticky bottom button) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: items.length * 0.1 }}
              className="mt-8 hidden md:block"
            >
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center w-full py-4"
              >
                {ctaText}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

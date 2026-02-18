'use client'

import { motion } from 'framer-motion'

interface ShowcaseItem {
  id: number
  title: string
  description: string
}

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

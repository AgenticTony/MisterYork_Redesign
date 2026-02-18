'use client'

import { motion } from 'framer-motion'

interface LocationCardProps {
  city: string
  address: string
  mapUrl: string
  delay?: number
}

export default function LocationCard({ city, address, mapUrl, delay = 0 }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
    >
      <h3 className="text-xl font-bold text-york-gold mb-2">{city}</h3>
      <p className="text-white/70 text-sm mb-4">{address}</p>
      <a
        href={mapUrl}
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
  )
}

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollIndicator() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-12 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <p className="text-xs uppercase tracking-widest text-white/40">
        Scrolla för att utforska
      </p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-white/60"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

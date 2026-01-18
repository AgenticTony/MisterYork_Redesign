'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(5, 5, 5, 0)', 'rgba(5, 5, 5, 0.95)']
  )

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
    })
    return unsubscribe
  }, [scrollY])

  return (
    <motion.header
      style={{ backgroundColor }}
      className="fixed left-0 right-0 top-0 z-40 transition-all duration-300"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/logo.svg"
            alt="Mister York"
            className="h-10 w-auto"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 sm:flex">
          <a
            href="#meny"
            className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Meny
          </a>
          <a
            href="#hitta-oss"
            className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Hitta oss
          </a>
          <Link
            href="/om-oss"
            className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Om oss
          </Link>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Beställ
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button className="sm:hidden text-white p-2">
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Bottom CTA Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: scrolled ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-deep-black/95 backdrop-blur-sm border-t border-white/10 p-4"
      >
        <button className="btn-primary w-full text-center">
          Beställ nu
        </button>
      </motion.div>
    </motion.header>
  )
}

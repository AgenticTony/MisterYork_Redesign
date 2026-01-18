'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
          <motion.a
            href="https://order.misteryork.se/se/sv-se"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Beställ
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white p-2 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={mobileMenuOpen ? "open" : "closed"}
          >
            <motion.path
              variants={{
                closed: { d: "M4 6h16" },
                open: { d: "M4 18h16" }
              }}
            />
            <motion.path
              variants={{
                closed: { d: "M4 12h16", opacity: 1 },
                open: { d: "M4 12h16", opacity: 0 }
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.path
              variants={{
                closed: { d: "M4 18h16" },
                open: { d: "M4 6h16" }
              }}
            />
          </motion.svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%" }
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-40 sm:hidden bg-deep-black/98 backdrop-blur-lg"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <motion.a
            href="#meny"
            onClick={() => setMobileMenuOpen(false)}
            className="text-3xl font-bold text-white hover:text-york-gold transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            Meny
          </motion.a>
          <motion.a
            href="#hitta-oss"
            onClick={() => setMobileMenuOpen(false)}
            className="text-3xl font-bold text-white hover:text-york-gold transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Hitta oss
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/om-oss"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-york-gold transition-colors"
            >
              Om oss
            </Link>
          </motion.div>
          <motion.a
            href="https://order.misteryork.se/se/sv-se"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary text-xl px-12 py-4 mt-4 inline-block text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
          >
            Beställ
          </motion.a>
        </div>
      </motion.div>

      {/* Mobile Bottom CTA Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: scrolled ? 0 : 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-deep-black/95 backdrop-blur-sm border-t border-white/10 p-4"
      >
        <a
          href="https://order.misteryork.se/se/sv-se"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center inline-block"
        >
          Beställ nu
        </a>
      </motion.div>
    </motion.header>
  )
}

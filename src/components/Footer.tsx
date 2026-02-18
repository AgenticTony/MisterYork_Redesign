'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
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
            <a href="https://www.facebook.com/misteryorkburgers/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

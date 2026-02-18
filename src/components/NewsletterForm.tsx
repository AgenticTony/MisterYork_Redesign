'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CsrfTokenResponse {
  success: boolean
  token: string
  expiresAt: string
}

interface NewsletterResponse {
  success: boolean
  message: string
  error?: string
}

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf-token')
        const data: CsrfTokenResponse = await response.json()
        if (data.success && data.token) {
          setCsrfToken(data.token)
        } else {
          setMessage({ type: 'error', text: 'Kunde inte hämta säkerhetstoken. Ladda om sidan.' })
        }
      } catch {
        setMessage({ type: 'error', text: 'Kunde inte ansluta till servern. Försök igen.' })
      }
    }

    fetchCsrfToken()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous messages
    setMessage(null)

    // Check if CSRF token is available
    if (!csrfToken) {
      setMessage({ type: 'error', text: 'Kunde inte hämta säkerhetstoken. Försök igen.' })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Vänligen ange en giltig e-postadress.' })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          csrfToken,
        }),
      })

      const data: NewsletterResponse = await response.json()

      if (response.ok && data.success) {
        setMessage({ type: 'success', text: 'Tack för att du går med!' })
        setEmail('')
        // Fetch a new CSRF token for the next submission
        const tokenResponse = await fetch('/api/csrf-token')
        const tokenData: CsrfTokenResponse = await tokenResponse.json()
        if (tokenData.success && tokenData.token) {
          setCsrfToken(tokenData.token)
        }
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Något gick fel. Försök igen senare.',
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Kunde inte ansluta till servern. Försök igen.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h4 className="text-label mb-4">Nyhetsbrev</h4>
      <p className="text-sm text-white/60 mb-4">Bli en York-insider</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="din@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-york-red disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
        <motion.button
          type="submit"
          disabled={isSubmitting || !csrfToken}
          className="btn-primary relative px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: !isSubmitting && csrfToken ? 1.02 : 1 }}
          whileTap={{ scale: !isSubmitting && csrfToken ? 0.98 : 1 }}
          transition={{ duration: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Skickar...
              </motion.span>
            ) : (
              <motion.span
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!csrfToken ? 'Laddar...' : 'Gå med'}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      {/* Success/Error Messages with Animation */}
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={message.type}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`text-sm mt-3 ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

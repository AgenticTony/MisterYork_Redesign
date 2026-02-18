'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { validateEmail } from '@/lib/validation'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate email
    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Vänligen ange en giltig e-postadress')
      return
    }

    // Set loading state
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Tack för att du går med i vårt nyhetsbrev!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Något gick fel. Försök igen senare.')
      }
    } catch {
      setStatus('error')
      setMessage('Något gick fel. Försök igen senare.')
    }
  }

  return (
    <div>
      <h4 className="text-label mb-4">Nyhetsbrev</h4>
      <p className="text-sm text-white/60 mb-4">Bli en York-insider</p>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/40 rounded-lg px-4 py-3"
        >
          <p className="text-sm text-green-400">{message}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="din@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-york-red disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: status === 'loading' ? 1 : 1.05 }}
            whileTap={{ scale: status === 'loading' ? 1 : 0.95 }}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Skickar...
              </span>
            ) : (
              'Gå med'
            )}
          </motion.button>
        </form>
      )}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 mt-2"
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

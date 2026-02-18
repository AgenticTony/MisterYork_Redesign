'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission will be implemented in subtask-3-2
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
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-york-red"
          required
        />
        <button type="submit" className="btn-primary px-4 py-2 text-sm">
          Gå med
        </button>
      </form>
    </div>
  )
}

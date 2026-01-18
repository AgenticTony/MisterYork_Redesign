'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  id: number
  quote: string
  author: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'Bästa burgaren i Sverige. Punkt.',
    author: 'Burgerdudes',
    rating: 5,
    image: '/HomePageImages/Testimonial1.jpeg',
  },
  {
    id: 2,
    quote: 'Finally, someone who understands what a smash burger should be.',
    author: 'Stockholm Food Guide',
    rating: 5,
    image: '/HomePageImages/Testimonial2.png',
  },
  {
    id: 3,
    quote: 'Container-konceptet är genialt. Maten? Ännu bättre.',
    author: 'SvD Mat',
    rating: 5,
    image: '/HomePageImages/Testimonial3.jpeg',
  },
]

export default function Testimonials() {
  return (
    <div className="section-content relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
      <div className="grid gap-12 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            {/* Header with Image and Stars */}
            <div className="mb-6 flex items-center gap-4">
              {/* Circular Image */}
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="h-16 w-16 rounded-full object-cover border-2 border-york-gold"
              />
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-york-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="mb-6 text-xl font-medium text-white/90">
              "{testimonial.quote}"
            </blockquote>

            {/* Author */}
            <cite className="not-italic">
              <p className="text-sm uppercase tracking-wider text-york-gold">
                {testimonial.author}
              </p>
            </cite>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

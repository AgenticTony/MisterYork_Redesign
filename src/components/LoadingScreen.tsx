'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  progress: number
  onComplete: () => void
  totalFrames: number
  loadedFrames: number
}

export default function LoadingScreen({
  progress,
  onComplete,
  totalFrames,
  loadedFrames,
}: LoadingScreenProps) {
  const [showExit, setShowExit] = useState(false)

  useEffect(() => {
    if (progress >= 100 && !showExit) {
      setShowExit(true)
      setTimeout(onComplete, 800)
    }
  }, [progress, showExit, onComplete])

  return (
    <AnimatePresence>
      {!showExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black"
        >
          <div className="flex flex-col items-center gap-8 px-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: 0.2,
              }}
              className="animate-pulse-glow"
            >
              <h1 className="text-display text-white">
                MR YORK
              </h1>
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-body text-center"
            >
              Laddar din upplevelse...
            </motion.p>

            {/* Progress Bar */}
            <div className="w-full max-w-md space-y-2">
              {/* Bar Container */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-york-red"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Progress Info */}
              <div className="flex justify-between text-sm text-white/40">
                <span>{loadedFrames} / {totalFrames} bilder</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Subtle Brand Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1 }}
              className="text-xs uppercase tracking-widest text-york-gold"
            >
              Inga hemligheter. Bara kvalitet.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

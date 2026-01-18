'use client'

import { useEffect, useRef, useState } from 'react'
import { useTransform, MotionValue } from 'framer-motion'

interface BurgerSequenceCanvasProps {
  scrollProgress: MotionValue<number>
  onImagesLoaded?: () => void
}

export default function BurgerSequenceCanvas({
  scrollProgress,
  onImagesLoaded,
}: BurgerSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)

  // Total frames (reduced from 192 to 48 by skipping every 4th frame)
  const TOTAL_FRAMES = 48
  const FRAME_START = 0

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollProgress, [0, 1], [FRAME_START, TOTAL_FRAMES - 1])

  // Preload all images with progress tracking
  useEffect(() => {
    const loadImages = async () => {
      const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null)
      let loaded = 0

      const loadImageForIndex = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image()
          // Skip every 4th frame by multiplying index by 4
          const actualFrameNumber = index * 4
          const frameNumber = String(actualFrameNumber).padStart(3, '0')

          // Pattern: frames 1, 4, 7, 10, 13... (frame % 3 === 1) use delay-0.041s
          // All other frames use delay-0.042s
          const delay = (actualFrameNumber % 3 === 1) ? '041' : '042'

          img.src = `/frames/frame_${frameNumber}_delay-0.${delay}s.jpg`

          img.onload = () => {
            images[index] = img
            loaded++
            // Update progress (0-100)
            setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
            resolve()
          }

          img.onerror = () => {
            // If image fails to load, still increment loaded to prevent infinite loading
            console.warn(`Failed to load frame ${index}`)
            loaded++
            setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
            resolve()
          }
        })
      }

      const loadFrame = async (index: number) => {
        await loadImageForIndex(index)
      }

      // Load all frames
      for (let i = FRAME_START; i < TOTAL_FRAMES; i++) {
        await loadFrame(i)
      }

      // Keep the array with same indices (null frames will be skipped during draw)
      imagesRef.current = images as HTMLImageElement[]
      setImagesLoaded(true)
      // Notify parent that images are loaded
      onImagesLoaded?.()
    }

    loadImages()
  }, [TOTAL_FRAMES, FRAME_START, onImagesLoaded])

  // Draw current frame to canvas
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let currentFrame = Math.round(frameIndex.get())

    const drawFrame = (frame: number) => {
      const img = imagesRef.current[frame]
      if (!img || !img.complete) return

      // Get canvas display size
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      // Set canvas actual size (scaled by DPR)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      // Clear and fill background
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate scale to fit canvas (contain logic)
      const canvasAspect = canvas.width / canvas.height
      const imgAspect = img.width / img.height

      let drawWidth: number
      let drawHeight: number
      let offsetX: number
      let offsetY: number

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas
        drawWidth = canvas.width
        drawHeight = canvas.width / imgAspect
        offsetX = 0
        offsetY = (canvas.height - drawHeight) / 2
      } else {
        // Image is taller than canvas
        drawHeight = canvas.height
        drawWidth = canvas.height * imgAspect
        offsetX = (canvas.width - drawWidth) / 2
        offsetY = 0
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Initial draw
    drawFrame(currentFrame)

    // Subscribe to frame changes
    const unsubscribe = frameIndex.on('change', (latest) => {
      const frame = Math.round(latest)
      if (frame !== currentFrame) {
        currentFrame = frame
        requestAnimationFrame(() => drawFrame(frame))
      }
    })

    return unsubscribe
  }, [imagesLoaded, frameIndex])

  // Handle resize
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return

    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const currentFrame = Math.round(frameIndex.get())
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      // Redraw current frame
      const img = imagesRef.current[currentFrame]
      if (img && img.complete) {
        const ctx = canvas.getContext('2d', { alpha: false })
        if (ctx) {
          ctx.fillStyle = '#050505'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          const canvasAspect = canvas.width / canvas.height
          const imgAspect = img.width / img.height

          let drawWidth: number
          let drawHeight: number
          let offsetX: number
          let offsetY: number

          if (imgAspect > canvasAspect) {
            drawWidth = canvas.width
            drawHeight = canvas.width / imgAspect
            offsetX = 0
            offsetY = (canvas.height - drawHeight) / 2
          } else {
            drawHeight = canvas.height
            drawWidth = canvas.height * imgAspect
            offsetX = (canvas.width - drawWidth) / 2
            offsetY = 0
          }

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [imagesLoaded, frameIndex])

  return (
    <>
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-deep-black z-30">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-york-gold border-t-transparent animate-spin"
                style={{ transform: `rotate(${loadProgress * 3.6}deg)` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{loadProgress}%</span>
              </div>
            </div>
            <p className="text-white/60 text-sm">Laddar burgare...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-contain"
        style={{ imageRendering: 'crisp-edges' as any }}
      />
    </>
  )
}

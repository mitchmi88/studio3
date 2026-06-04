'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

export interface LightboxImage {
  src: string
  alt: string
  category?: string
}

interface LightboxProps {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    if (index === null) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [index, handleKeyDown])

  if (typeof window === 'undefined') return null

  const image = index !== null ? images[index] : null

  return createPortal(
    <AnimatePresence>
      {index !== null && image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie-Vollbild"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-bg/95 backdrop-blur-lg cursor-pointer"
            onClick={onClose}
          />

          {/* Image panel */}
          <motion.div
            key={index}
            className="relative z-10 max-w-5xl w-full mx-6 aspect-[4/3] max-h-[85vh]"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Galerie schließen"
            className="absolute top-5 right-5 z-20 w-11 h-11 flex items-center justify-center text-muted hover:text-text transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="3" y1="3" x2="17" y2="17" />
              <line x1="17" y1="3" x2="3" y2="17" />
            </svg>
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                aria-label="Vorheriges Bild"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-muted hover:text-text transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={onNext}
                aria-label="Nächstes Bild"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-muted hover:text-text transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Caption */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
            <p className="label-track text-muted/70">
              {image.category && <span className="text-accent mr-3">{image.category}</span>}
              {index + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

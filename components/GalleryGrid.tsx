'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/gsapUtils'
import { Lightbox, type LightboxImage } from './Lightbox'

const ALL_IMAGES: LightboxImage[] = [
  { src: "https://images.pexels.com/photos/3688664/pexels-photo-3688664.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Detailreiches Geometric-Tattoo-Design", category: "Fine Line" },
  { src: "https://images.pexels.com/photos/5339685/pexels-photo-5339685.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Professioneller Tätowierer bei Präzisionsarbeit", category: "Custom Design" },
  { src: "https://images.pexels.com/photos/1493111/pexels-photo-1493111.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Künstlerische schwarze Linie am Unterarm", category: "Fine Line" },
  { src: "https://images.pexels.com/photos/2364187/pexels-photo-2364187.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Realistisches großflächiges Rücken-Tattoo", category: "Realismus" },
  { src: "https://images.pexels.com/photos/2183130/pexels-photo-2183130.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Feines Detail-Tattoo mit hoher Präzision", category: "Fine Line" },
  { src: "https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Professionelle Tattoowerkstatt-Szene", category: "Custom Design" },
  { src: "https://images.pexels.com/photos/4056538/pexels-photo-4056538.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Farbiges Tattoo-Design mit Tiefenwirkung", category: "Custom Design" },
  { src: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Schwarze Tinte Arm-Tattoo mit Motiv-Details", category: "Realismus" },
]

const CATEGORIES = ['Alle', 'Fine Line', 'Realismus', 'Custom Design', 'Cover-Up']

// Asymmetric slot classes (cycles mod 9)
const GRID_SLOTS = [
  'lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:row-end-3',
  'lg:col-start-7 lg:col-end-10 lg:row-start-1 lg:row-end-3',
  'lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-2',
  'lg:col-start-10 lg:col-end-13 lg:row-start-2 lg:row-end-3',
  'lg:col-start-1 lg:col-end-5 lg:row-start-3 lg:row-end-4',
  'lg:col-start-5 lg:col-end-9 lg:row-start-3 lg:row-end-5',
  'lg:col-start-9 lg:col-end-13 lg:row-start-3 lg:row-end-5',
  'lg:col-start-1 lg:col-end-5 lg:row-start-4 lg:row-end-5',
  'lg:col-start-1 lg:col-end-7 lg:row-start-5 lg:row-end-7',
]

export function GalleryGrid() {
  const gridRef  = useRef<HTMLDivElement>(null)
  const [activeFilter,   setActiveFilter]   = useState('Alle')
  const [lightboxIndex,  setLightboxIndex]  = useState<number | null>(null)

  const filtered = useMemo(
    () => (activeFilter === 'Alle' ? ALL_IMAGES : ALL_IMAGES.filter((img) => img.category === activeFilter)),
    [activeFilter]
  )

  // — Effect 10: Clip-path reveal as you scroll through grid —
  useEffect(() => {
    if (prefersReducedMotion()) return
    const grid = gridRef.current
    if (!grid) return

    // Slight delay so React has painted the new items
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const items = grid.querySelectorAll<HTMLElement>('.gallery-item')
        items.forEach((item) => {
          const rect = item.getBoundingClientRect()
          const alreadyVisible = rect.top < window.innerHeight * 0.85

          if (alreadyVisible) {
            gsap.set(item, { clipPath: 'inset(0% 0% 0% 0%)' })
            return
          }

          gsap.from(item, {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          })
        })
        ScrollTrigger.refresh()
      }, grid)

      return () => ctx.revert()
    }, 50)

    return () => clearTimeout(timer)
  }, [activeFilter])

  const openLightbox = useCallback((filteredIdx: number) => {
    const img = filtered[filteredIdx]
    const globalIdx = ALL_IMAGES.findIndex((i) => i.src === img.src)
    setLightboxIndex(globalIdx)
  }, [filtered])

  function closeLightbox()  { setLightboxIndex(null) }
  function prevImage()      { setLightboxIndex((i) => i === null ? null : (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length) }
  function nextImage()      { setLightboxIndex((i) => i === null ? null : (i + 1) % ALL_IMAGES.length) }

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Kategorie-Filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`font-body text-xs tracking-widest uppercase px-5 py-2 border transition-colors duration-300 ${
              activeFilter === cat
                ? 'border-accent bg-accent text-bg'
                : 'border-border text-muted hover:text-text hover:border-muted'
            }`}
            aria-pressed={activeFilter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 auto-rows-[280px] sm:auto-rows-[200px] gap-3 lg:grid-cols-[repeat(12,1fr)] lg:auto-rows-[220px]"
      >
        {filtered.map((img, i) => (
          <button
            key={`${activeFilter}-${img.src}`}
            onClick={() => openLightbox(i)}
            className={`gallery-item group relative overflow-hidden bg-surface cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${GRID_SLOTS[i % GRID_SLOTS.length]}`}
            aria-label={img.alt}
            style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/50 transition-colors duration-500 flex items-end p-4">
              <span className="label-track text-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={ALL_IMAGES}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  )
}

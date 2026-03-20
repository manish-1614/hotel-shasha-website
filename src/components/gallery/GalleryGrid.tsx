'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import {
  galleryImages,
  galleryCategories,
  type GalleryCategory,
  type GalleryImage,
} from '@/data/gallery'

const aspectMap = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    filter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter)

  const openLightbox = (index: number) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)

  const goPrev = useCallback(() => {
    if (lightbox === null) return
    setLightbox((lightbox - 1 + filtered.length) % filtered.length)
  }, [lightbox, filtered.length])

  const goNext = useCallback(() => {
    if (lightbox === null) return
    setLightbox((lightbox + 1) % filtered.length)
  }, [lightbox, filtered.length])

  useEffect(() => {
    if (lightbox === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightbox, goPrev, goNext])

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {galleryCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat.value
                ? 'bg-forest text-white shadow-sm'
                : 'bg-ivory text-midnight/60 hover:text-forest hover:bg-forest/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <GalleryItem
              key={img.id}
              image={img}
              index={i}
              onClick={() => openLightbox(i)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mx-16 sm:mx-24 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative w-full ${aspectMap[filtered[lightbox].aspectRatio]} bg-gradient-to-br ${filtered[lightbox].gradient} rounded-xl overflow-hidden`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20">
                  <ImageIcon size={48} strokeWidth={1} />
                  <span className="font-accent text-xl">
                    {filtered[lightbox].alt}
                  </span>
                </div>
              </div>
              <p className="text-center text-white/60 text-sm mt-4">
                {filtered[lightbox].alt}
              </p>
              <p className="text-center text-white/30 text-xs mt-1">
                {lightbox + 1} / {filtered.length}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function GalleryItem({
  image,
  index,
  onClick,
}: {
  image: GalleryImage
  index: number
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="break-inside-avoid"
    >
      <button
        onClick={onClick}
        className={`relative w-full ${aspectMap[image.aspectRatio]} bg-gradient-to-br ${image.gradient} rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer`}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center text-forest/15 group-hover:text-forest/25 transition-colors">
          <span className="font-accent text-sm sm:text-base text-center px-4">
            {image.alt}
          </span>
        </div>
      </button>
    </motion.div>
  )
}

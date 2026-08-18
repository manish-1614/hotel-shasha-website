'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface RoomGalleryProps {
  images: string[]
  roomName: string
}

export default function RoomGallery({ images, roomName }: RoomGalleryProps) {
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visibleImages = expanded ? images : images.slice(0, 4)

  const openLightbox = (index: number) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)

  const goPrev = useCallback(() => {
    if (lightbox === null) return
    setLightbox((lightbox - 1 + visibleImages.length) % visibleImages.length)
  }, [lightbox, visibleImages.length])

  const goNext = useCallback(() => {
    if (lightbox === null) return
    setLightbox((lightbox + 1) % visibleImages.length)
  }, [lightbox, visibleImages.length])

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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleImages.map((img, i) => (
          <div
            key={img}
            className="aspect-4/3 rounded-xl relative overflow-hidden shadow-soft group animate-gallery-fade-in opacity-0"
            style={{ animationDelay: `${(i % 4) * 0.05}s` }}
          >
            <button
              onClick={() => openLightbox(i)}
              className="absolute inset-0 w-full h-full text-left overflow-hidden cursor-pointer"
            >
              <Image
                src={img}
                alt={`${roomName} - Photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
            </button>
          </div>
        ))}
      </div>

      {images.length > 4 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-6 py-2.5 rounded-full border border-forest/30 hover:border-forest text-forest hover:bg-forest/5 font-medium text-sm transition-all duration-300 cursor-pointer"
          >
            {expanded ? 'Show Less' : `View All Photos (${images.length})`}
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && visibleImages[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all z-10 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              key={visibleImages[lightbox]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mx-16 sm:mx-24 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden">
                <Image
                  src={visibleImages[lightbox]}
                  alt={`${roomName} - Expanded Photo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-center text-white/30 text-xs mt-4">
                {lightbox + 1} / {visibleImages.length}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all z-10 cursor-pointer"
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

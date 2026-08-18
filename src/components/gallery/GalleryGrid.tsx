'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [visibleCount, setVisibleCount] = useState(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const filtered =
    filter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter)

  const visibleImages = filtered.slice(0, visibleCount)

  const openLightbox = (index: number) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)

  const handleFilterChange = (cat: GalleryCategory) => {
    setFilter(cat)
    setVisibleCount(12)
  }

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 12, filtered.length))
      setIsLoadingMore(false)
    }, 400)
  }

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
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {galleryCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleFilterChange(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
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
        {visibleImages.map((img, i) => (
          <GalleryItem
            key={`${filter}-${img.id}`}
            image={img}
            index={i}
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center justify-center mt-12 mb-6">
        {visibleCount < filtered.length ? (
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 rounded-full bg-forest hover:bg-forest-dark text-white font-medium text-sm transition-all duration-300 shadow-soft hover:shadow-card disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {isLoadingMore ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        ) : (
          <p className="text-sm font-medium text-midnight/50">
            Showing all {filtered.length} photos
          </p>
        )}
      </div>

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
              key={visibleImages[lightbox].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mx-16 sm:mx-24 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative w-full ${aspectMap[visibleImages[lightbox].aspectRatio]} rounded-xl overflow-hidden`}
              >
                <Image
                  src={visibleImages[lightbox].srcLightbox}
                  alt={visibleImages[lightbox].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-center text-white/60 text-sm mt-4">
                {visibleImages[lightbox].alt}
              </p>
              <p className="text-center text-white/30 text-xs mt-1">
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
    <div
      className="break-inside-avoid animate-gallery-fade-in opacity-0"
      style={{ animationDelay: `${(index % 12) * 0.03}s` }}
    >
      <button
        onClick={onClick}
        className={`relative w-full ${aspectMap[image.aspectRatio]} rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 group cursor-pointer`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-accent text-white text-sm sm:text-base text-center px-4 drop-shadow-md">
            {image.alt}
          </span>
        </div>
      </button>
    </div>
  )
}


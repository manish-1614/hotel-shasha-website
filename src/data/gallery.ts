export type GalleryCategory =
  | 'all'
  | 'rooms'
  | 'food'
  | 'exterior'
  | 'experiences'

export interface GalleryImage {
  id: string
  alt: string
  category: Exclude<GalleryCategory, 'all'>
  gradient: string
  aspectRatio: 'portrait' | 'landscape' | 'square'
}

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'rooms', label: 'Rooms' },
  { value: 'food', label: 'Food' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'experiences', label: 'Experiences' },
]

export const galleryImages: GalleryImage[] = [
  { id: 'g1', alt: 'Duplex Cottage skylight interior', category: 'rooms', gradient: 'from-forest-dark/40 to-forest/20', aspectRatio: 'portrait' },
  { id: 'g2', alt: 'Wood-fired pizza on the terrace', category: 'food', gradient: 'from-amber/30 to-warm-wood/20', aspectRatio: 'landscape' },
  { id: 'g3', alt: 'Aerial view of Shasha in cedar forest', category: 'exterior', gradient: 'from-forest/30 to-forest-light/20', aspectRatio: 'landscape' },
  { id: 'g4', alt: 'Morning chai with valley views', category: 'experiences', gradient: 'from-amber-light/30 to-parchment-dark/20', aspectRatio: 'square' },
  { id: 'g5', alt: 'Private Room with mountain decor', category: 'rooms', gradient: 'from-warm-wood/30 to-amber/20', aspectRatio: 'landscape' },
  { id: 'g6', alt: 'Bonfire night under the stars', category: 'experiences', gradient: 'from-midnight/40 to-forest-dark/30', aspectRatio: 'portrait' },
  { id: 'g7', alt: 'Himachali siddu and local dishes', category: 'food', gradient: 'from-forest/20 to-amber/20', aspectRatio: 'square' },
  { id: 'g8', alt: 'Dorm attic library', category: 'rooms', gradient: 'from-forest/25 to-forest-light/15', aspectRatio: 'landscape' },
  { id: 'g9', alt: 'Cedar forest trail near Shasha', category: 'exterior', gradient: 'from-forest-dark/30 to-forest/20', aspectRatio: 'portrait' },
  { id: 'g10', alt: 'Pasta night at Shasha kitchen', category: 'food', gradient: 'from-amber/25 to-warm-wood/15', aspectRatio: 'landscape' },
  { id: 'g11', alt: 'Valley panorama from the balcony', category: 'exterior', gradient: 'from-forest-light/30 to-mist/40', aspectRatio: 'landscape' },
  { id: 'g12', alt: 'Trekking to Jalori Pass', category: 'experiences', gradient: 'from-forest/30 to-amber/10', aspectRatio: 'portrait' },
  { id: 'g13', alt: 'Duplex Cottage glass window', category: 'rooms', gradient: 'from-forest-dark/35 to-forest/15', aspectRatio: 'square' },
  { id: 'g14', alt: 'Pancake breakfast spread', category: 'food', gradient: 'from-amber-light/30 to-amber/20', aspectRatio: 'landscape' },
  { id: 'g15', alt: 'Shasha entrance path through pines', category: 'exterior', gradient: 'from-forest/25 to-forest-dark/20', aspectRatio: 'landscape' },
  { id: 'g16', alt: 'Riverside picnic spot', category: 'experiences', gradient: 'from-forest-light/25 to-amber/15', aspectRatio: 'square' },
]

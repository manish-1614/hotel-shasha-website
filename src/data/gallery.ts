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
  aspectRatio: 'portrait' | 'landscape' | 'square'
  src: string          // tablet variant for grid thumbnails
  srcLightbox: string  // desktop variant for lightbox
}

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'rooms', label: 'Rooms' },
  { value: 'food', label: 'Food' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'experiences', label: 'Experiences' },
]

const basePath = '/hotel-shasha-website'

export const galleryImages: GalleryImage[] = [
  // ROOMS (including bathrooms)
  { 
    id: 'g1', 
    alt: 'Cozy Wooden Homestay Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/room/cozy-wooden-homestay-room-tablet.webp`,
    srcLightbox: `${basePath}/images/room/cozy-wooden-homestay-room-desktop.webp`
  },
  { 
    id: 'g2', 
    alt: 'Modern Tiled Bathroom', 
    category: 'rooms', 
    aspectRatio: 'portrait',
    src: `${basePath}/images/bathroom/modern-tiled-bathroom-homestay-tablet.webp`,
    srcLightbox: `${basePath}/images/bathroom/modern-tiled-bathroom-homestay-desktop.webp`
  },
  { 
    id: 'g3', 
    alt: 'Homestay Lounge Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/room/homestay-lounge-room-tablet.webp`,
    srcLightbox: `${basePath}/images/room/homestay-lounge-room-desktop.webp`
  },
  { 
    id: 'g4', 
    alt: 'Rustic Room with Mountain View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/room/rustic-room-mountain-view-tablet.webp`,
    srcLightbox: `${basePath}/images/room/rustic-room-mountain-view-desktop.webp`
  },
  { 
    id: 'g5', 
    alt: 'Wooden Bunk Beds Room', 
    category: 'rooms', 
    aspectRatio: 'portrait',
    src: `${basePath}/images/room/wooden-bunk-beds-room-tablet.webp`,
    srcLightbox: `${basePath}/images/room/wooden-bunk-beds-room-desktop.webp`
  },
  { 
    id: 'g6', 
    alt: 'Rustic Homestay Bedroom Loft', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/room/rustic-homestay-bedroom-loft-tablet.webp`,
    srcLightbox: `${basePath}/images/room/rustic-homestay-bedroom-loft-desktop.webp`
  },

  // FOOD
  { 
    id: 'g7', 
    alt: 'Traditional Dosa and Sambar', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/food/dosa-sambar-chutney-tablet.webp`,
    srcLightbox: `${basePath}/images/food/dosa-sambar-chutney-desktop.webp`
  },
  { 
    id: 'g8', 
    alt: 'Indian Homestay Breakfast Spread', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/food/indian-homestay-breakfast-tablet.webp`,
    srcLightbox: `${basePath}/images/food/indian-homestay-breakfast-desktop.webp`
  },
  { 
    id: 'g9', 
    alt: 'Fresh Pizza and Garlic Bread', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/food/pizza-garlic-bread-table-tablet.webp`,
    srcLightbox: `${basePath}/images/food/pizza-garlic-bread-table-desktop.webp`
  },
  { 
    id: 'g10', 
    alt: 'Stir Fried Noodles', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/food/stir-fried-noodles-table-tablet.webp`,
    srcLightbox: `${basePath}/images/food/stir-fried-noodles-table-desktop.webp`
  },
  { 
    id: 'g11', 
    alt: 'Chicken Biryani Meal Set', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/food/chicken-biryani-meal-set-tablet.webp`,
    srcLightbox: `${basePath}/images/food/chicken-biryani-meal-set-desktop.webp`
  },
  { 
    id: 'g12', 
    alt: 'Asian Food Variety Meal', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/food/asian-food-variety-meal-tablet.webp`,
    srcLightbox: `${basePath}/images/food/asian-food-variety-meal-desktop.webp`
  },

  // EXTERIOR (including views)
  { 
    id: 'g13', 
    alt: 'Homestay Exterior with Forest View', 
    category: 'exterior', 
    aspectRatio: 'portrait',
    src: `${basePath}/images/exterior/homestay-exterior-forest-view-tablet.webp`,
    srcLightbox: `${basePath}/images/exterior/homestay-exterior-forest-view-desktop.webp`
  },
  { 
    id: 'g14', 
    alt: 'Mountain Homestay Scenic Exterior', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/exterior/mountain-homestay-exterior-tablet.webp`,
    srcLightbox: `${basePath}/images/exterior/mountain-homestay-exterior-desktop.webp`
  },
  { 
    id: 'g15', 
    alt: 'Hillside Village Himalayan View', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/exterior/hillside-village-himalayan-view-tablet.webp`,
    srcLightbox: `${basePath}/images/exterior/hillside-village-himalayan-view-desktop.webp`
  },
  { 
    id: 'g16', 
    alt: 'Misty Mountain Valley View', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/view/misty-mountain-view-tablet.webp`,
    srcLightbox: `${basePath}/images/view/misty-mountain-view-desktop.webp`
  },

  // EXPERIENCES (including amenities)
  { 
    id: 'g17', 
    alt: 'Outdoor Pergola Seating in Forest', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/amenities/outdoor-pergola-seating-forest-tablet.webp`,
    srcLightbox: `${basePath}/images/amenities/outdoor-pergola-seating-forest-desktop.webp`
  },
  { 
    id: 'g18', 
    alt: 'Fully Equipped Homestay Kitchen', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/amenities/homestay-equipped-kitchen-tablet.webp`,
    srcLightbox: `${basePath}/images/amenities/homestay-equipped-kitchen-desktop.webp`
  },
  { 
    id: 'g19', 
    alt: 'Outdoor Dining with Garden View', 
    category: 'experiences', 
    aspectRatio: 'portrait',
    src: `${basePath}/images/food/outdoor-dining-garden-view-tablet.webp`,
    srcLightbox: `${basePath}/images/food/outdoor-dining-garden-view-desktop.webp`
  },
  { 
    id: 'g20', 
    alt: 'Hazy Mountain Sunrise View', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/view/hazy-mountain-view-tablet.webp`,
    srcLightbox: `${basePath}/images/view/hazy-mountain-view-desktop.webp`
  },
  { 
    id: 'g21', 
    alt: 'Rustic Wash Area Interior', 
    category: 'experiences', 
    aspectRatio: 'portrait',
    src: `${basePath}/images/bathroom/homestay-rustic-wash-area-tablet.webp`,
    srcLightbox: `${basePath}/images/bathroom/homestay-rustic-wash-area-desktop.webp`
  },
  { 
    id: 'g22', 
    alt: 'Asian Dishes Served at Shasha', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/food/homestay-asian-dishes-tablet.webp`,
    srcLightbox: `${basePath}/images/food/homestay-asian-dishes-desktop.webp`
  },
  { 
    id: 'g23', 
    alt: 'Homestay Exterior Pine Forest', 
    category: 'exterior', 
    aspectRatio: 'portrait',
    src: `${basePath}/images/exterior/homestay-exterior-pine-forest-tablet.webp`,
    srcLightbox: `${basePath}/images/exterior/homestay-exterior-pine-forest-desktop.webp`
  },
  { 
    id: 'g24', 
    alt: 'Breakfast Amenities at Shasha', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: `${basePath}/images/amenities/homestay-breakfast-amenities-tablet.webp`,
    srcLightbox: `${basePath}/images/amenities/homestay-breakfast-amenities-desktop.webp`
  },
]

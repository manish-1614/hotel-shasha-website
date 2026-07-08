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

export const galleryImages: GalleryImage[] = [
  // ROOMS (including bathrooms)
  { 
    id: 'g1', 
    alt: 'Cozy Wooden Homestay Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-homestay-room-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-homestay-room-desktop.webp'
  },
  { 
    id: 'g2', 
    alt: 'Modern Tiled Bathroom', 
    category: 'rooms', 
    aspectRatio: 'portrait',
    src: '/images/bathroom/modern-tiled-bathroom-homestay-tablet.webp',
    srcLightbox: '/images/bathroom/modern-tiled-bathroom-homestay-desktop.webp'
  },
  { 
    id: 'g3', 
    alt: 'Homestay Lounge Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-lounge-room-tablet.webp',
    srcLightbox: '/images/room/homestay-lounge-room-desktop.webp'
  },
  { 
    id: 'g4', 
    alt: 'Rustic Room with Mountain View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/rustic-room-mountain-view-tablet.webp',
    srcLightbox: '/images/room/rustic-room-mountain-view-desktop.webp'
  },
  { 
    id: 'g5', 
    alt: 'Wooden Bunk Beds Room', 
    category: 'rooms', 
    aspectRatio: 'portrait',
    src: '/images/room/wooden-bunk-beds-room-tablet.webp',
    srcLightbox: '/images/room/wooden-bunk-beds-room-desktop.webp'
  },
  { 
    id: 'g6', 
    alt: 'Rustic Homestay Bedroom Loft', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/rustic-homestay-bedroom-loft-tablet.webp',
    srcLightbox: '/images/room/rustic-homestay-bedroom-loft-desktop.webp'
  },

  // FOOD
  { 
    id: 'g7', 
    alt: 'Traditional Dosa and Sambar', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/indian-homestay-food-platter-tablet.webp',
    srcLightbox: '/images/food/indian-homestay-food-platter-desktop.webp'
  },
  { 
    id: 'g8', 
    alt: 'Indian Homestay Breakfast Spread', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/indian-homestay-breakfast-tablet.webp',
    srcLightbox: '/images/food/indian-homestay-breakfast-desktop.webp'
  },
  { 
    id: 'g9', 
    alt: 'Fresh Pizza and Garlic Bread', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/pizza-garlic-bread-table-tablet.webp',
    srcLightbox: '/images/food/pizza-garlic-bread-table-desktop.webp'
  },
  { 
    id: 'g10', 
    alt: 'Stir Fried Noodles', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/stir-fried-noodles-table-tablet.webp',
    srcLightbox: '/images/food/stir-fried-noodles-table-desktop.webp'
  },
  { 
    id: 'g11', 
    alt: 'Chicken Biryani Meal Set', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chicken-biryani-meal-set-tablet.webp',
    srcLightbox: '/images/food/chicken-biryani-meal-set-desktop.webp'
  },
  { 
    id: 'g12', 
    alt: 'Shawarma Platter Meal', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/shawarma-platter-meal-tablet.webp',
    srcLightbox: '/images/food/shawarma-platter-meal-desktop.webp'
  },

  // EXTERIOR (including views)
  { 
    id: 'g13', 
    alt: 'Homestay Exterior with Forest View', 
    category: 'exterior', 
    aspectRatio: 'portrait',
    src: '/images/exterior/homestay-exterior-forest-view-tablet.webp',
    srcLightbox: '/images/exterior/homestay-exterior-forest-view-desktop.webp'
  },
  { 
    id: 'g14', 
    alt: 'Mountain Homestay Scenic Exterior', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: '/images/exterior/mountain-homestay-exterior-tablet.webp',
    srcLightbox: '/images/exterior/mountain-homestay-exterior-desktop.webp'
  },
  { 
    id: 'g15', 
    alt: 'Hillside Village Himalayan View', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: '/images/exterior/hillside-village-himalayan-view-tablet.webp',
    srcLightbox: '/images/exterior/hillside-village-himalayan-view-desktop.webp'
  },
  { 
    id: 'g16', 
    alt: 'Misty Mountain Valley View', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: '/images/view/misty-mountain-view-tablet.webp',
    srcLightbox: '/images/view/misty-mountain-view-desktop.webp'
  },

  // EXPERIENCES (including amenities)
  { 
    id: 'g17', 
    alt: 'Outdoor Pergola Seating in Forest', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/amenities/outdoor-pergola-seating-forest-tablet.webp',
    srcLightbox: '/images/amenities/outdoor-pergola-seating-forest-desktop.webp'
  },
  { 
    id: 'g18', 
    alt: 'Fully Equipped Homestay Kitchen', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/amenities/homestay-equipped-kitchen-tablet.webp',
    srcLightbox: '/images/amenities/homestay-equipped-kitchen-desktop.webp'
  },
  { 
    id: 'g19', 
    alt: 'Outdoor Dining with Garden View', 
    category: 'experiences', 
    aspectRatio: 'portrait',
    src: '/images/food/outdoor-dining-garden-view-tablet.webp',
    srcLightbox: '/images/food/outdoor-dining-garden-view-desktop.webp'
  },
  { 
    id: 'g20', 
    alt: 'Hazy Mountain Sunrise View', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/view/hazy-mountain-view-tablet.webp',
    srcLightbox: '/images/view/hazy-mountain-view-desktop.webp'
  },
  { 
    id: 'g21', 
    alt: 'Rustic Wash Area Interior', 
    category: 'experiences', 
    aspectRatio: 'portrait',
    src: '/images/bathroom/homestay-rustic-wash-area-tablet.webp',
    srcLightbox: '/images/bathroom/homestay-rustic-wash-area-desktop.webp'
  },
  { 
    id: 'g22', 
    alt: 'Steamed Dumplings and Stir Fry', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/steamed-dumplings-stir-fry-tablet.webp',
    srcLightbox: '/images/food/steamed-dumplings-stir-fry-desktop.webp'
  },
  { 
    id: 'g23', 
    alt: 'Homestay Exterior Pine Forest', 
    category: 'exterior', 
    aspectRatio: 'portrait',
    src: '/images/exterior/homestay-exterior-pine-forest-tablet.webp',
    srcLightbox: '/images/exterior/homestay-exterior-pine-forest-desktop.webp'
  },
  { 
    id: 'g24', 
    alt: 'Breakfast Amenities at Shasha', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/amenities/homestay-breakfast-amenities-tablet.webp',
    srcLightbox: '/images/amenities/homestay-breakfast-amenities-desktop.webp'
  },
  // NEW IMAGES ADDED
  { 
    id: 'g25', 
    alt: 'Eco Friendly Hotel Amenities Kit Homestay', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/amenities/eco-friendly-hotel-amenities-kit-homestay-tablet.webp',
    srcLightbox: '/images/amenities/eco-friendly-hotel-amenities-kit-homestay-desktop.webp'
  },
  { 
    id: 'g26', 
    alt: 'Homestay Kitchen Amenities', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/amenities/homestay-kitchen-amenities-tablet.webp',
    srcLightbox: '/images/amenities/homestay-kitchen-amenities-desktop.webp'
  },
  { 
    id: 'g27', 
    alt: 'Bathroom Western Toilet Shower', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/bathroom/bathroom-western-toilet-shower-tablet.webp',
    srcLightbox: '/images/bathroom/bathroom-western-toilet-shower-desktop.webp'
  },
  { 
    id: 'g28', 
    alt: 'Homestay Bathroom Interior 1', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/bathroom/homestay-bathroom-interior-1-tablet.webp',
    srcLightbox: '/images/bathroom/homestay-bathroom-interior-1-desktop.webp'
  },
  { 
    id: 'g29', 
    alt: 'Homestay Bathroom Interior', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/bathroom/homestay-bathroom-interior-tablet.webp',
    srcLightbox: '/images/bathroom/homestay-bathroom-interior-desktop.webp'
  },
  { 
    id: 'g30', 
    alt: 'Homestay Bathroom Toilet Sink', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/bathroom/homestay-bathroom-toilet-sink-tablet.webp',
    srcLightbox: '/images/bathroom/homestay-bathroom-toilet-sink-desktop.webp'
  },
  { 
    id: 'g31', 
    alt: 'Cozy Himalayan Homestay Traditional Dining Area', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/dining-area/cozy-himalayan-homestay-traditional-dining-area-tablet.webp',
    srcLightbox: '/images/dining-area/cozy-himalayan-homestay-traditional-dining-area-desktop.webp'
  },
  { 
    id: 'g32', 
    alt: 'Cozy Wooden Dining Area Himalayan Homestay', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/dining-area/cozy-wooden-dining-area-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/dining-area/cozy-wooden-dining-area-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g33', 
    alt: 'Traditional Floor Seating Himalayan Restaurant Interiors', 
    category: 'experiences', 
    aspectRatio: 'landscape',
    src: '/images/dining-area/traditional-floor-seating-himalayan-restaurant-interiors-tablet.webp',
    srcLightbox: '/images/dining-area/traditional-floor-seating-himalayan-restaurant-interiors-desktop.webp'
  },
  { 
    id: 'g34', 
    alt: 'Mountain Homestay Exterior 1', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: '/images/exterior/mountain-homestay-exterior-1-tablet.webp',
    srcLightbox: '/images/exterior/mountain-homestay-exterior-1-desktop.webp'
  },
  { 
    id: 'g35', 
    alt: 'Rustic Wooden Cottage Himalayan Forest Homestay', 
    category: 'exterior', 
    aspectRatio: 'landscape',
    src: '/images/exterior/rustic-wooden-cottage-himalayan-forest-homestay-tablet.webp',
    srcLightbox: '/images/exterior/rustic-wooden-cottage-himalayan-forest-homestay-desktop.webp'
  },
  { 
    id: 'g36', 
    alt: 'Appetizers Outdoor Table Food', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/appetizers-outdoor-table-food-tablet.webp',
    srcLightbox: '/images/food/appetizers-outdoor-table-food-desktop.webp'
  },
  { 
    id: 'g37', 
    alt: 'Asian Food Variety Meal', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/asian-food-variety-meal-tablet.webp',
    srcLightbox: '/images/food/asian-food-variety-meal-desktop.webp'
  },
  { 
    id: 'g38', 
    alt: 'Chicken Biryani Served With Sides Restaurant', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chicken-biryani-served-with-sides-restaurant-tablet.webp',
    srcLightbox: '/images/food/chicken-biryani-served-with-sides-restaurant-desktop.webp'
  },
  { 
    id: 'g39', 
    alt: 'Chicken Biryani With Raita Side Dishes', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chicken-biryani-with-raita-side-dishes-tablet.webp',
    srcLightbox: '/images/food/chicken-biryani-with-raita-side-dishes-desktop.webp'
  },
  { 
    id: 'g40', 
    alt: 'Chicken Shawarma Wrap', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chicken-shawarma-wrap-tablet.webp',
    srcLightbox: '/images/food/chicken-shawarma-wrap-desktop.webp'
  },
  { 
    id: 'g41', 
    alt: 'Chole Bhature Himalayan Homestay Outdoor Dining', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chole-bhature-himalayan-homestay-outdoor-dining-tablet.webp',
    srcLightbox: '/images/food/chole-bhature-himalayan-homestay-outdoor-dining-desktop.webp'
  },
  { 
    id: 'g42', 
    alt: 'Chole Bhature Served Himalayan Homestay', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chole-bhature-served-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/food/chole-bhature-served-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g43', 
    alt: 'Chole Bhature Served In Himalayan Cafe', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chole-bhature-served-in-himalayan-cafe-tablet.webp',
    srcLightbox: '/images/food/chole-bhature-served-in-himalayan-cafe-desktop.webp'
  },
  { 
    id: 'g44', 
    alt: 'Chole Bhature Served Outdoor Himalayan Cafe', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/chole-bhature-served-outdoor-himalayan-cafe-tablet.webp',
    srcLightbox: '/images/food/chole-bhature-served-outdoor-himalayan-cafe-desktop.webp'
  },
  { 
    id: 'g45', 
    alt: 'Creamy Homestay Curry', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/creamy-homestay-curry-tablet.webp',
    srcLightbox: '/images/food/creamy-homestay-curry-desktop.webp'
  },
  { 
    id: 'g46', 
    alt: 'Croissants And Coffee Himalayan Homestay Garden', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/croissants-and-coffee-himalayan-homestay-garden-tablet.webp',
    srcLightbox: '/images/food/croissants-and-coffee-himalayan-homestay-garden-desktop.webp'
  },
  { 
    id: 'g47', 
    alt: 'Dosa Sambar Chutney Outdoor Dining Himalayan', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/dosa-sambar-chutney-outdoor-dining-himalayan-tablet.webp',
    srcLightbox: '/images/food/dosa-sambar-chutney-outdoor-dining-himalayan-desktop.webp'
  },
  { 
    id: 'g48', 
    alt: 'Dosa Sambar Chutney', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/dosa-sambar-chutney-tablet.webp',
    srcLightbox: '/images/food/dosa-sambar-chutney-desktop.webp'
  },
  { 
    id: 'g49', 
    alt: 'Egg Biryani Served At Himalayan Restaurant', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/egg-biryani-served-at-himalayan-restaurant-tablet.webp',
    srcLightbox: '/images/food/egg-biryani-served-at-himalayan-restaurant-desktop.webp'
  },
  { 
    id: 'g50', 
    alt: 'Egg Biryani With Dips Himalayan Restaurant', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/egg-biryani-with-dips-himalayan-restaurant-tablet.webp',
    srcLightbox: '/images/food/egg-biryani-with-dips-himalayan-restaurant-desktop.webp'
  },
  { 
    id: 'g51', 
    alt: 'Fresh Croissants And Coffee Setup Himalayan Homestay', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/fresh-croissants-and-coffee-setup-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/food/fresh-croissants-and-coffee-setup-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g52', 
    alt: 'Grilled Chicken Creamy Pasta', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/grilled-chicken-creamy-pasta-tablet.webp',
    srcLightbox: '/images/food/grilled-chicken-creamy-pasta-desktop.webp'
  },
  { 
    id: 'g53', 
    alt: 'Grilled Chicken Pasta Dish', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/grilled-chicken-pasta-dish-tablet.webp',
    srcLightbox: '/images/food/grilled-chicken-pasta-dish-desktop.webp'
  },
  { 
    id: 'g54', 
    alt: 'Homestay Asian Dishes', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/homestay-asian-dishes-tablet.webp',
    srcLightbox: '/images/food/homestay-asian-dishes-desktop.webp'
  },
  { 
    id: 'g55', 
    alt: 'Homestay Indian Breakfast', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/homestay-indian-breakfast-tablet.webp',
    srcLightbox: '/images/food/homestay-indian-breakfast-desktop.webp'
  },
  { 
    id: 'g56', 
    alt: 'Homestay Pasta Dish', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/homestay-pasta-dish-tablet.webp',
    srcLightbox: '/images/food/homestay-pasta-dish-desktop.webp'
  },
  { 
    id: 'g57', 
    alt: 'Homestay Pizza Garlic Bread', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/homestay-pizza-garlic-bread-tablet.webp',
    srcLightbox: '/images/food/homestay-pizza-garlic-bread-desktop.webp'
  },
  { 
    id: 'g58', 
    alt: 'Indian Breakfast Platter', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/indian-breakfast-platter-tablet.webp',
    srcLightbox: '/images/food/indian-breakfast-platter-desktop.webp'
  },
  { 
    id: 'g59', 
    alt: 'Indian Dal Roti Meal', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/indian-dal-roti-meal-tablet.webp',
    srcLightbox: '/images/food/indian-dal-roti-meal-desktop.webp'
  },
  { 
    id: 'g60', 
    alt: 'Indian Puri Chole Breakfast', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/indian-puri-chole-breakfast-tablet.webp',
    srcLightbox: '/images/food/indian-puri-chole-breakfast-desktop.webp'
  },
  { 
    id: 'g61', 
    alt: 'Mixed Vegetable Pizza Dining', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/mixed-vegetable-pizza-dining-tablet.webp',
    srcLightbox: '/images/food/mixed-vegetable-pizza-dining-desktop.webp'
  },
  { 
    id: 'g62', 
    alt: 'Pan Fried Dumplings Bamboo Steamer', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/pan-fried-dumplings-bamboo-steamer-tablet.webp',
    srcLightbox: '/images/food/pan-fried-dumplings-bamboo-steamer-desktop.webp'
  },
  { 
    id: 'g63', 
    alt: 'Paneer Kathi Roll With Chutney Cafe', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/paneer-kathi-roll-with-chutney-cafe-tablet.webp',
    srcLightbox: '/images/food/paneer-kathi-roll-with-chutney-cafe-desktop.webp'
  },
  { 
    id: 'g64', 
    alt: 'Pizza Garlic Bread Meal', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/pizza-garlic-bread-meal-tablet.webp',
    srcLightbox: '/images/food/pizza-garlic-bread-meal-desktop.webp'
  },
  { 
    id: 'g65', 
    alt: 'Shawarma Roll Dish', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/shawarma-roll-dish-tablet.webp',
    srcLightbox: '/images/food/shawarma-roll-dish-desktop.webp'
  },
  { 
    id: 'g66', 
    alt: 'Shawarma Roll Rattan Table', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/shawarma-roll-rattan-table-tablet.webp',
    srcLightbox: '/images/food/shawarma-roll-rattan-table-desktop.webp'
  },
  { 
    id: 'g67', 
    alt: 'Steamed Momos And Noodles Himalayan Restaurant', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/steamed-momos-and-noodles-himalayan-restaurant-tablet.webp',
    srcLightbox: '/images/food/steamed-momos-and-noodles-himalayan-restaurant-desktop.webp'
  },
  { 
    id: 'g68', 
    alt: 'Stir Fried Noodles Meal', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/stir-fried-noodles-meal-tablet.webp',
    srcLightbox: '/images/food/stir-fried-noodles-meal-desktop.webp'
  },
  { 
    id: 'g69', 
    alt: 'Veg Hakka Noodles Served Himalayan Cafe', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/veg-hakka-noodles-served-himalayan-cafe-tablet.webp',
    srcLightbox: '/images/food/veg-hakka-noodles-served-himalayan-cafe-desktop.webp'
  },
  { 
    id: 'g70', 
    alt: 'Vegetable Pasta Bowl', 
    category: 'food', 
    aspectRatio: 'landscape',
    src: '/images/food/vegetable-pasta-bowl-tablet.webp',
    srcLightbox: '/images/food/vegetable-pasta-bowl-desktop.webp'
  },
  { 
    id: 'g71', 
    alt: 'Comfortable Bedroom With Golden Curtains Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/comfortable-bedroom-with-golden-curtains-homestay-tablet.webp',
    srcLightbox: '/images/room/comfortable-bedroom-with-golden-curtains-homestay-desktop.webp'
  },
  { 
    id: 'g72', 
    alt: 'Cozy Bedroom Interior Himalayan Homestay Minimalist', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-bedroom-interior-himalayan-homestay-minimalist-tablet.webp',
    srcLightbox: '/images/room/cozy-bedroom-interior-himalayan-homestay-minimalist-desktop.webp'
  },
  { 
    id: 'g73', 
    alt: 'Cozy Bedroom With Bright Blue Windows Himalayan Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-bedroom-with-bright-blue-windows-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/room/cozy-bedroom-with-bright-blue-windows-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g74', 
    alt: 'Cozy Himalayan Homestay Room Mountain View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-himalayan-homestay-room-mountain-view-tablet.webp',
    srcLightbox: '/images/room/cozy-himalayan-homestay-room-mountain-view-desktop.webp'
  },
  { 
    id: 'g75', 
    alt: 'Cozy Homestay Bedroom Stairs', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-homestay-bedroom-stairs-tablet.webp',
    srcLightbox: '/images/room/cozy-homestay-bedroom-stairs-desktop.webp'
  },
  { 
    id: 'g76', 
    alt: 'Cozy Homestay Window View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-homestay-window-view-tablet.webp',
    srcLightbox: '/images/room/cozy-homestay-window-view-desktop.webp'
  },
  { 
    id: 'g77', 
    alt: 'Cozy Hotel Bedroom With Paisley Bedding', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-hotel-bedroom-with-paisley-bedding-tablet.webp',
    srcLightbox: '/images/room/cozy-hotel-bedroom-with-paisley-bedding-desktop.webp'
  },
  { 
    id: 'g78', 
    alt: 'Cozy Window Seat Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-window-seat-room-tablet.webp',
    srcLightbox: '/images/room/cozy-window-seat-room-desktop.webp'
  },
  { 
    id: 'g79', 
    alt: 'Cozy Wooden Bedroom Duplex Himalayan Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-bedroom-duplex-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-bedroom-duplex-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g80', 
    alt: 'Cozy Wooden Bedroom Himalayan Homestay Skylight', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-bedroom-himalayan-homestay-skylight-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-bedroom-himalayan-homestay-skylight-desktop.webp'
  },
  { 
    id: 'g81', 
    alt: 'Cozy Wooden Bedroom Loft Himalayan Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-bedroom-loft-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-bedroom-loft-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g82', 
    alt: 'Cozy Wooden Living Room Himalayan Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-living-room-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-living-room-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g83', 
    alt: 'Cozy Wooden Loft Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-loft-room-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-loft-room-desktop.webp'
  },
  { 
    id: 'g84', 
    alt: 'Cozy Wooden Room Forest View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-room-forest-view-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-room-forest-view-desktop.webp'
  },
  { 
    id: 'g85', 
    alt: 'Cozy Wooden Room Loft Himalayan Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/cozy-wooden-room-loft-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/room/cozy-wooden-room-loft-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g86', 
    alt: 'Homestay Bedroom Forest View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-bedroom-forest-view-tablet.webp',
    srcLightbox: '/images/room/homestay-bedroom-forest-view-desktop.webp'
  },
  { 
    id: 'g87', 
    alt: 'Homestay Bedroom Garden View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-bedroom-garden-view-tablet.webp',
    srcLightbox: '/images/room/homestay-bedroom-garden-view-desktop.webp'
  },
  { 
    id: 'g88', 
    alt: 'Homestay Bedroom Interior 1', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-bedroom-interior-1-tablet.webp',
    srcLightbox: '/images/room/homestay-bedroom-interior-1-desktop.webp'
  },
  { 
    id: 'g89', 
    alt: 'Homestay Bedroom Interior', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-bedroom-interior-tablet.webp',
    srcLightbox: '/images/room/homestay-bedroom-interior-desktop.webp'
  },
  { 
    id: 'g90', 
    alt: 'Homestay Bedroom', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-bedroom-tablet.webp',
    srcLightbox: '/images/room/homestay-bedroom-desktop.webp'
  },
  { 
    id: 'g91', 
    alt: 'Homestay Dorm Bunk Beds Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-dorm-bunk-beds-room-tablet.webp',
    srcLightbox: '/images/room/homestay-dorm-bunk-beds-room-desktop.webp'
  },
  { 
    id: 'g92', 
    alt: 'Homestay Room Forest View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-room-forest-view-tablet.webp',
    srcLightbox: '/images/room/homestay-room-forest-view-desktop.webp'
  },
  { 
    id: 'g93', 
    alt: 'Homestay Room Mountain View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-room-mountain-view-tablet.webp',
    srcLightbox: '/images/room/homestay-room-mountain-view-desktop.webp'
  },
  { 
    id: 'g94', 
    alt: 'Homestay Wooden Staircase Interior', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/homestay-wooden-staircase-interior-tablet.webp',
    srcLightbox: '/images/room/homestay-wooden-staircase-interior-desktop.webp'
  },
  { 
    id: 'g95', 
    alt: 'Rustic Himalayan Homestay Wooden Interiors', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/rustic-himalayan-homestay-wooden-interiors-tablet.webp',
    srcLightbox: '/images/room/rustic-himalayan-homestay-wooden-interiors-desktop.webp'
  },
  { 
    id: 'g96', 
    alt: 'Rustic Room Interior', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/rustic-room-interior-tablet.webp',
    srcLightbox: '/images/room/rustic-room-interior-desktop.webp'
  },
  { 
    id: 'g97', 
    alt: 'Rustic Wooden Bedroom Homestay 1', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/rustic-wooden-bedroom-homestay-1-tablet.webp',
    srcLightbox: '/images/room/rustic-wooden-bedroom-homestay-1-desktop.webp'
  },
  { 
    id: 'g98', 
    alt: 'Rustic Wooden Bedroom Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/rustic-wooden-bedroom-homestay-tablet.webp',
    srcLightbox: '/images/room/rustic-wooden-bedroom-homestay-desktop.webp'
  },
  { 
    id: 'g99', 
    alt: 'Simple Cozy Homestay Bedroom Himalayan Mountains', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/simple-cozy-homestay-bedroom-himalayan-mountains-tablet.webp',
    srcLightbox: '/images/room/simple-cozy-homestay-bedroom-himalayan-mountains-desktop.webp'
  },
  { 
    id: 'g100', 
    alt: 'Traditional Homestay Lounge Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/traditional-homestay-lounge-room-tablet.webp',
    srcLightbox: '/images/room/traditional-homestay-lounge-room-desktop.webp'
  },
  { 
    id: 'g101', 
    alt: 'Wooden Attic Room With Skylight View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-attic-room-with-skylight-view-tablet.webp',
    srcLightbox: '/images/room/wooden-attic-room-with-skylight-view-desktop.webp'
  },
  { 
    id: 'g102', 
    alt: 'Wooden Bedroom Forest View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-bedroom-forest-view-tablet.webp',
    srcLightbox: '/images/room/wooden-bedroom-forest-view-desktop.webp'
  },
  { 
    id: 'g103', 
    alt: 'Wooden Bunk Beds Cozy Himalayan Homestay Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-bunk-beds-cozy-himalayan-homestay-room-tablet.webp',
    srcLightbox: '/images/room/wooden-bunk-beds-cozy-himalayan-homestay-room-desktop.webp'
  },
  { 
    id: 'g104', 
    alt: 'Wooden Bunk Beds Cozy Himalayan Homestay', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-bunk-beds-cozy-himalayan-homestay-tablet.webp',
    srcLightbox: '/images/room/wooden-bunk-beds-cozy-himalayan-homestay-desktop.webp'
  },
  { 
    id: 'g105', 
    alt: 'Wooden Bunk Beds Cozy Himalayan Hostel Room 1', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-bunk-beds-cozy-himalayan-hostel-room-1-tablet.webp',
    srcLightbox: '/images/room/wooden-bunk-beds-cozy-himalayan-hostel-room-1-desktop.webp'
  },
  { 
    id: 'g106', 
    alt: 'Wooden Bunk Beds Cozy Himalayan Hostel Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-bunk-beds-cozy-himalayan-hostel-room-tablet.webp',
    srcLightbox: '/images/room/wooden-bunk-beds-cozy-himalayan-hostel-room-desktop.webp'
  },
  { 
    id: 'g107', 
    alt: 'Wooden Homestay Bedroom View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-homestay-bedroom-view-tablet.webp',
    srcLightbox: '/images/room/wooden-homestay-bedroom-view-desktop.webp'
  },
  { 
    id: 'g108', 
    alt: 'Wooden Homestay Room', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-homestay-room-tablet.webp',
    srcLightbox: '/images/room/wooden-homestay-room-desktop.webp'
  },
  { 
    id: 'g109', 
    alt: 'Wooden Room Forest View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-room-forest-view-tablet.webp',
    srcLightbox: '/images/room/wooden-room-forest-view-desktop.webp'
  },
  { 
    id: 'g110', 
    alt: 'Wooden Room Mountain View', 
    category: 'rooms', 
    aspectRatio: 'landscape',
    src: '/images/room/wooden-room-mountain-view-tablet.webp',
    srcLightbox: '/images/room/wooden-room-mountain-view-desktop.webp'
  },
]

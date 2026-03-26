export interface Dish {
  name: string
  description: string
  category: string
  gradient: string
  image: string
}

export interface MealPlan {
  name: string
  code: string
  description: string
  priceNote: string
}

export const cuisinePhilosophy = {
  title: 'Global Flavours, Mountain Soul',
  subtitle: 'Where pasta meets parathas',
  description: [
    "At Shasha, food is not just sustenance — it's an experience crafted with love by our explorer-chef brother who brings global flavours to the mountains. From hand-rolled pasta to Himachali siddu, every meal tells a story.",
    'We source locally wherever possible: fresh vegetables from valley farms, trout from the Tirthan River, and spices from the Kullu bazaar. The result? A menu that\'s uniquely Shasha — familiar yet surprising, comforting yet adventurous.',
  ],
}

export const dishes: Dish[] = [
  {
    name: 'Wood-Fired Pizza',
    description: 'Artisan dough, mountain herbs, local cheese',
    category: 'International',
    gradient: 'from-amber/30 to-warm-wood/20',
    image: '/images/food/homestay-pizza-dinner.webp',
  },
  {
    name: 'Himachali Siddu',
    description: 'Steamed bread stuffed with walnut & poppy seeds',
    category: 'Local',
    gradient: 'from-forest/20 to-forest-light/20',
    image: '/images/food/indian-homestay-food-spread.webp',
  },
  {
    name: 'Pasta Arrabbiata',
    description: 'Hand-rolled pasta with spicy tomato sauce',
    category: 'International',
    gradient: 'from-amber/20 to-amber-light/20',
    image: '/images/food/homestay-vegetable-pasta-meal.webp',
  },
  {
    name: 'Dal Chawal & Sabzi',
    description: 'Comfort food done right, every single day',
    category: 'Indian',
    gradient: 'from-warm-wood/20 to-amber/20',
    image: '/images/food/dal-makhani-paratha-meal.webp',
  },
  {
    name: 'Trout Fry',
    description: 'Fresh Tirthan River trout with valley spices',
    category: 'Local',
    gradient: 'from-forest/20 to-amber/20',
    image: '/images/food/creamy-indian-curry-dish.webp',
  },
  {
    name: 'Pancake Stack',
    description: 'Fluffy pancakes with maple syrup & mountain honey',
    category: 'Breakfast',
    gradient: 'from-amber-light/20 to-parchment-dark/30',
    image: '/images/food/outdoor-breakfast-coffee-croissants.webp',
  },
  {
    name: 'Chai & Pakoras',
    description: 'Rainy-day essential — masala chai with crispy fritters',
    category: 'Indian',
    gradient: 'from-warm-wood/30 to-forest/10',
    image: '/images/food/indian-breakfast-outdoor-meal.webp',
  },
  {
    name: 'Bonfire BBQ',
    description: 'Grilled meats & veggies under the stars',
    category: 'Specials',
    gradient: 'from-midnight/20 to-forest-dark/20',
    image: '/images/food/chicken-biryani-meal.webp',
  },
]

export const mealPlans: MealPlan[] = [
  {
    name: 'Room Only',
    code: 'room-only',
    description:
      'Accommodation only. Explore local eateries or request meals à la carte.',
    priceNote: 'Base room rate',
  },
  {
    name: 'CP Plan (Breakfast)',
    code: 'cp-plan',
    description:
      'Accommodation + daily breakfast. Start your mountain mornings with a hearty spread.',
    priceNote: '₹1,300–1,800 per person/night added to room rate',
  },
  {
    name: 'Full Board',
    code: 'full-board',
    description:
      'All meals included: breakfast, lunch, evening chai & snacks, and dinner.',
    priceNote: 'Available on request — contact us for pricing',
  },
]

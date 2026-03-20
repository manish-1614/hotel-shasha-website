export interface Testimonial {
  name: string
  location: string
  rating: number
  quote: string
  stayType: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Anika Mehra',
    location: 'Delhi',
    rating: 5,
    quote:
      'The skylight duplex is hands down the most magical room I have ever stayed in. Waking up to the stars, then to the sun — pure magic. And the food! The brothers cook like Michelin-star chefs who just happen to live in the mountains.',
    stayType: 'Duplex Cottage',
  },
  {
    name: 'Rajat Khanna',
    location: 'Mumbai',
    rating: 5,
    quote:
      'I came for 2 nights, stayed for 5. Shasha is not a homestay — it is an experience. The bonfire conversations, the treks, the endless chai. I left with a full heart and a promise to return.',
    stayType: 'Private Room',
  },
  {
    name: 'Sarah & Tom',
    location: 'London',
    rating: 5,
    quote:
      'We have backpacked across 30 countries, and Shasha is in our top 3 stays ever. The dorm has an actual library in the attic! And the hosts — honestly, they became our friends. Already planning our next trip.',
    stayType: 'Dorm',
  },
]

// Hotel Information Types
export interface HotelInfo {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  contact: {
    phone: string[];
    email: string[];
    website: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Room Types
export interface Room {
  id: string;
  name: string;
  description: string;
  images: string[];
  amenities: string[];
  maxOccupancy: number;
  size: string;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  features: string[];
}

// Dining Information
export interface DiningInfo {
  restaurantName: string;
  cuisineType: string[];
  description: string;
  images: string[];
  specialties: string[];
  mealTimes: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  features: string[];
}

// Amenities
export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
  isComplimentary: boolean;
  operatingHours?: string;
  bookingRequired?: boolean;
}

// Local Attractions
export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  distance: string;
  category: 'nature' | 'adventure' | 'cultural' | 'religious';
  activities: string[];
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  inquiryType: 'booking' | 'general' | 'events' | 'dining';
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// Map Types
export interface MapLocation {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: 'hotel' | 'attraction' | 'landmark';
  description?: string;
  icon?: string;
}

export interface MapConfig {
  center: {
    latitude: number;
    longitude: number;
  };
  zoom: number;
  markers: MapLocation[];
}

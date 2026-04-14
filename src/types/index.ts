export interface Temple {
  id: string;
  name: string;
  slug: string;
  description: string;
  history?: string;
  religiousSignificance?: string;
  type: "HINDU" | "BUDDHIST" | "SACRED";
  address: string;
  city: string;
  district: string;
  region: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  mainDeity?: string;
  establishedYear?: number;
  phone?: string;
  website?: string;
  openingHours?: string;
  entryFee?: number;
  amenities?: string[];
  isFeatured: boolean;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  itinerary: string[];
  includes: string[];
  excludes: string[];
  price: number;
  discountPrice?: number;
  maxPeople: number;
  minPeople: number;
  templeId: string;
  temple?: Temple;
  category: string;
  isFeatured: boolean;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  package?: Package;
  travelDate: string;
  passengers: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  templeId: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "ADMIN" | "AGENT" | "USER";
  createdAt: string;
}
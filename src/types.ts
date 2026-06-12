export interface MassageService {
  id: string;
  name: string;
  description: string;
  category: 'massage' | 'aromatherapy' | 'express' | 'couples';
  durationOptions: {
    duration: number; // in minutes
    price: number; // in UGX
  }[];
  benefits: string[];
  image: string;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number; // in UGX
  description: string;
}

export interface Therapist {
  id: string;
  name: string;
  gender: 'female' | 'male';
  bio: string;
  specialties: string[];
  rating: number;
  completedSessions: number;
  avatar: string;
}

export interface KampalaNeighborhood {
  id: string;
  name: string;
  transportFee: number; // in UGX
  description: string;
}

export interface NewBooking {
  serviceId: string;
  duration: number; // in minutes
  addOns: string[]; // AddOnOption ids
  therapistPreference: 'any' | 'female' | 'male' | string; // 'string' is specific therapist id
  neighborhoodId: string;
  addressDetails: string; // building, apartment, hotel room No.
  clientName: string;
  clientPhone: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:MM
  specialInstructions?: string;
}

export interface ConfirmedBooking extends NewBooking {
  id: string;
  createdAt: string;
  totalCost: number;
  status: 'pending_confirmation' | 'confirmed' | 'completed' | 'cancelled';
}

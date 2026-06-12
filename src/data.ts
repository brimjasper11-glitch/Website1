import { MassageService, AddOnOption, Therapist, KampalaNeighborhood } from './types';

// Let's import the custom generated image files from the assets directory.
// These are absolute paths relative to the host, or we can resolve them.
// In a standard Vite setup, importing them returns their resolved URL, but since they are in /src/assets/images/,
// we can also import them as module assets. Let's import these directly to avoid any broken path errors.
import heroImg from './assets/images/kampala_luxury_massage_hero_1781260045057.jpg';
import experienceImg from './assets/images/massage_wellness_experience_1781260063961.jpg';
import sheaButterImg from './assets/images/ugandan_shea_butter_oils_1781260077476.jpg';

export const SERVICES: MassageService[] = [
  {
    id: 'nile-signature',
    name: 'Nile Signature Relaxer (Swedish)',
    description: 'A deeply soothing Swedish massage using long, gliding strokes to improve blood circulation, ease muscle tension, and melt away daily mental exhaustion. Designed to restore harmonized energy.',
    category: 'massage',
    durationOptions: [
      { duration: 60, price: 100000 },
      { duration: 90, price: 140000 },
      { duration: 120, price: 180000 }
    ],
    benefits: [
      'Reduces levels of the stress hormone cortisol',
      'Enhances circulation and skin elasticity',
      'Promotes deeply restorative night sleep',
      'Provides customizable pressure (Light to Medium)'
    ],
    image: experienceImg
  },
  {
    id: 'shea-butter-aromatherapy',
    name: 'Ugandan Shea Butter Aromatherapy',
    description: 'A local organic luxury experience. Combining skin-loving organic Shea Butter sourced directly from Northern Uganda with warm therapeutic essential oils (Lavender and Eucalyptus) to deliver unparalleled skin hydration and deep sensory calm.',
    category: 'aromatherapy',
    durationOptions: [
      { duration: 60, price: 130000 },
      { duration: 90, price: 170000 },
      { duration: 120, price: 210000 }
    ],
    benefits: [
      'Incredibly rich moisturization from organic Ugandan Shea Butter',
      'Aromatherapy extracts clear respiration and soothe the mind',
      'Gentle head and scalp stress relief massage included',
      'Excellent for dry or sun-exposed skin'
    ],
    image: sheaButterImg
  },
  {
    id: 'ruwenzori-deep-tissue',
    name: 'Ruwenzori Deep Muscle Reliever',
    description: 'A powerful, structural massage focusing on deeper layers of muscle tissue. Our certified therapist uses firm, slow strokes, elbows, and forearms to ease chronic muscle knots, athletic stiffness, and lower back aches.',
    category: 'massage',
    durationOptions: [
      { duration: 60, price: 120000 },
      { duration: 90, price: 160000 },
      { duration: 120, price: 200000 }
    ],
    benefits: [
      'Releases deep-seated chronic muscle tension and stiff knots',
      'Highly recommended for athletic bodies and active lifestyles',
      'Alleviates postural stiffness from desk work',
      'Incorporates organic pain-relief herbal oils'
    ],
    image: heroImg // Using the majestic hero room setup as standard
  },
  {
    id: 'kampala-couples-bliss',
    name: 'Kampala Couples Sanctuary',
    description: 'A majestic side-by-side luxurious massage for you and a partner or friend. We dispatch a professional duo of certified therapists with adjacent tables, candles, and Bluetooth speakers playing customized calming nature sounds.',
    category: 'couples',
    durationOptions: [
      { duration: 60, price: 220000 },
      { duration: 90, price: 300000 },
      { duration: 120, price: 380000 }
    ],
    benefits: [
      'Two highly trained therapists dispatched together',
      'Complimentary lavender botanical foot scrubs',
      'Create memorable bonding moments in absolute luxury',
      'Includes beautiful aromatherapy candles lit in your room'
    ],
    image: experienceImg
  },
  {
    id: 'nakasero-desk-relief',
    name: 'Express Nakasero Desk Relief',
    description: 'For busy professionals in Kololo, Nakasero, and Kampala CBD who can only spare brief moments. A targeted chair-massage over light clothing focusing immediately on your neck, shoulders, and upper back. Perfect for the office!',
    category: 'express',
    durationOptions: [
      { duration: 30, price: 60000 },
      { duration: 45, price: 85000 }
    ],
    benefits: [
      'No oil used; no need to undress',
      'Requires minimal workspace (we bring a specialized professional massage chair)',
      'Relieves screen-time headaches and neck tension instantly',
      'Quick and highly effective midday reset'
    ],
    image: sheaButterImg
  }
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'hot-stone',
    name: 'Warm Basalt Hot Stones',
    price: 30000,
    description: 'Volcanic hot stones placed along key meridians to penetrate deep muscle layers and induce profound relaxation.'
  },
  {
    id: 'face-massage',
    name: 'Organic Shea Facial Massage',
    price: 20000,
    description: 'A 15-minute facial acupressure lift of pure shea butter and rosehip oil to rejuvenate sensitive facial muscles.'
  },
  {
    id: 'extra-30',
    name: 'Extend Session (+30 Mins)',
    price: 40000,
    description: 'Add an extra 30 minutes of deep-focus therapy on your troubled areas (e.g., lower back or feet).'
  },
  {
    id: 'calming-tea',
    name: 'Premium Lugazi Herbal Tea Set',
    price: 15000,
    description: 'Two cups of hot, fresh chamomile-ginger tea brewed by your therapist right after the session.'
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'therapist-sharon',
    name: 'Sharon Namubiru',
    gender: 'female',
    bio: 'Sharon has over 6 years of professional spa experience in top East African hotels. She specializes in deep-kneading Ugandan Shea Aromatherapy and Swedish relaxation techniques. Her clients love her calming, respectful energy.',
    specialties: ['Swedish Massage', 'Shea Aromatherapy', 'Facial acupressure'],
    rating: 4.9,
    completedSessions: 820,
    avatar: '👩‍⚕️'
  },
  {
    id: 'therapist-brian',
    name: 'Brian Mugisha',
    gender: 'male',
    bio: 'Brian is a certified physical therapist and deep tissue expert. Having worked with sports squads in Kampala, he is your go-to expert for sports strain, stubborn muscle knots, posture improvement, and targeted back acupressure.',
    specialties: ['Deep Tissue', 'Sports stretching', 'Office Chair Massage'],
    rating: 4.9,
    completedSessions: 940,
    avatar: '👨‍⚕️'
  },
  {
    id: 'therapist-diana',
    name: 'Diana Atwine',
    gender: 'female',
    bio: 'Diana is known for her therapeutic bedside manner and detail-oriented approach. She brings an entire sensory experience including soundscapes and organic essential oils, perfect for couples sanctuaries and stress therapy.',
    specialties: ['Swedish Massage', 'Hot Stone Massage', 'Couples Bliss'],
    rating: 5.0,
    completedSessions: 450,
    avatar: '👩‍⚕️'
  }
];

export const NEIGHBORHOODS: KampalaNeighborhood[] = [
  {
    id: 'kololo-nakasero',
    name: 'Central Kampala (Kololo, Nakasero, Kitante, CBD)',
    transportFee: 10000,
    description: 'Premium central priority zone. Rapid dispatch available 24/7.'
  },
  {
    id: 'muyenga-bugolobi',
    name: 'Eastern Kampala (Bugolobi, Muyenga, Naguru, Bukoto, Kisementi)',
    transportFee: 15000,
    description: 'Fast mobilization. Certified staff fully equipped and dispatched within 45 minutes.'
  },
  {
    id: 'ntinda-luzira',
    name: 'Suburbs (Ntinda, Luzira, Kiwatule, Naalya, Kamwokya)',
    transportFee: 20000,
    description: 'Suburban coverage. Includes dedicated mobile travel packaging.'
  },
  {
    id: 'munyonyo-ggaba',
    name: 'Lakeside & Outer (Munyonyo, Ggaba, Lubowa, Kireka)',
    transportFee: 25000,
    description: 'Includes extended transport support for hotels and private lakeside resorts.'
  },
  {
    id: 'entebbe-route',
    name: 'Greater Kampala & Entebbe Corridor',
    transportFee: 35000,
    description: 'Includes out-of-boundary transport. Advance booking highly recommended.'
  }
];

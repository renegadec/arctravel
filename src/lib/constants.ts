import {
  Plane,
  Building2,
  Bus,
  Helicopter,
  Car,
  Compass,
  ShieldCheck,
  FileText,
  Sun,
  Users,
  Building,
  Ship,
  CarFront,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const services: Service[] = [
  {
    title: "Flight Booking & Itinerary Curation",
    description:
      "Domestic and international flights with expertly curated itineraries that maximise your time and experience.",
    icon: Plane,
    href: "/services/flight-booking",
  },
  {
    title: "Hotel, Lodge & Resort Accommodations",
    description:
      "Curated stays from boutique lodges to luxury resorts — handpicked for quality, location, and value.",
    icon: Building2,
    href: "/services/accommodation",
  },
  {
    title: "Ground Transportation",
    description:
      "Reliable and comfortable road transport for transfers, intercity travel, and group movements.",
    icon: Bus,
    href: "/services/ground-transportation",
  },
  {
    title: "Private Charter Flights",
    description:
      "Private air charters for executive travel, emergency evacuation, or accessing remote destinations on your schedule.",
    icon: Helicopter,
    href: "/services/private-charter",
  },
  {
    title: "Airport Transfers",
    description:
      "Hassle-free meet-and-greet airport transfers with professional drivers. We track your flight so we're always on time.",
    icon: Car,
    href: "/services/airport-transfers",
  },
  {
    title: "Guided Tours",
    description:
      "Expert-led tours across Zimbabwe, Southern Africa, and beyond — from wildlife safaris to cultural experiences.",
    icon: Compass,
    href: "/services/guided-tours",
  },
  {
    title: "Travel Insurance",
    description:
      "Comprehensive travel insurance covering medical emergencies, trip cancellation, lost luggage, and more.",
    icon: ShieldCheck,
    href: "/services/travel-insurance",
  },
  {
    title: "Visa Assistance",
    description:
      "End-to-end visa application support including document review, appointment booking, and submission guidance.",
    icon: FileText,
    href: "/services/visa-assistance",
  },
  {
    title: "Day Trip Packages",
    description:
      "Curated one-day experiences — Victoria Falls, Great Zimbabwe, Eastern Highlands, and more.",
    icon: Sun,
    href: "/services/day-trips",
  },
  {
    title: "Group Tour Packages",
    description:
      "Tailored group travel for families, friends, corporates, and organisations — we handle everything.",
    icon: Users,
    href: "/services/group-tours",
  },
  {
    title: "Corporate Events",
    description:
      "End-to-end corporate event travel management — conferences, retreats, incentive trips, and team building.",
    icon: Building,
    href: "/services/corporate-events",
  },
  {
    title: "Cruise Bookings",
    description:
      "Luxury and expedition cruises across Africa, the Indian Ocean, Mediterranean, and worldwide destinations.",
    icon: Ship,
    href: "/services/cruise-bookings",
  },
  {
    title: "Car Rentals",
    description:
      "Self-drive or chauffeur-driven rentals — sedans, SUVs, 4x4s, and minibuses for any itinerary.",
    icon: CarFront,
    href: "/services/car-rentals",
  },
];

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      { label: "Visa Assistance", href: "/services/visa-assistance", description: "Search visa requirements for any destination" },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SITE_URL = "https://arctravel.co.zw";

export const contactInfo = {
  phone: "078 657 7594",
  email: "info@arctravel.co.zw",
  address: "Harare, Zimbabwe",
};

export const socialLinks = {
  instagram: "#",
  facebook: "#",
  linkedin: "#",
  whatsapp: "https://wa.me/263786577594",
};

export const destinations: {
  name: string;
  country: string;
  region: string;
  description: string;
  href: string;
  image: string;
}[] = [
  // Zimbabwe
  {
    name: "Victoria Falls",
    country: "Zimbabwe",
    region: "domestic",
    description:
      "One of the Seven Natural Wonders of the World — a must-visit for every traveller.",
    href: "/destinations/victoria-falls",
    image: "/images/vic-falls.jpg",
  },
  {
    name: "Great Zimbabwe",
    country: "Zimbabwe",
    region: "domestic",
    description:
      "Ancient stone ruins and UNESCO World Heritage site, rich with history and culture.",
    href: "/destinations/great-zimbabwe",
    image: "/images/great-zimbabwe.jpg",
  },
  {
    name: "Eastern Highlands",
    country: "Zimbabwe",
    region: "domestic",
    description:
      "Lush mountains, waterfalls, and tea estates — perfect for nature lovers and hikers.",
    href: "/destinations/eastern-highlands",
    image: "/images/eastern-highlands.jpg",
  },
  {
    name: "Hwange National Park",
    country: "Zimbabwe",
    region: "domestic",
    description:
      "Zimbabwe's largest game reserve, home to over 100 mammal species and 400 bird species.",
    href: "/destinations/hwange-national-park",
    image: "/images/hwange.jpg",
  },
  // Regional SADC
  {
    name: "Cape Town",
    country: "South Africa",
    region: "regional",
    description:
      "Stunning coastal city with Table Mountain, vibrant waterfront, wine country, and incredible beaches.",
    href: "/destinations/cape-town",
    image: "/images/cape-town.jpg",
  },
  {
    name: "Okavango Delta",
    country: "Botswana",
    region: "regional",
    description:
      "UNESCO World Heritage site and one of Africa's last great wilderness areas — explore by mokoro and game drive.",
    href: "/destinations/okavango-delta",
    image: "/images/okavango.jpg",
  },
  {
    name: "Zanzibar",
    country: "Tanzania",
    region: "regional",
    description:
      "Tropical paradise with white-sand beaches, turquoise waters, spice farms, and Stone Town's rich history.",
    href: "/destinations/zanzibar",
    image: "/images/zanzibar.jpg",
  },
  {
    name: "Johannesburg & Kruger",
    country: "South Africa",
    region: "regional",
    description:
      "Africa's economic hub paired with Kruger National Park — one of the best safari destinations on the continent.",
    href: "/destinations/johannesburg-kruger",
    image: "/images/johannesburg.jpg",
  },
  // International
  {
    name: "Dubai",
    country: "UAE",
    region: "international",
    description:
      "Ultra-modern city with world-class shopping, dining, desert safaris, and architectural wonders.",
    href: "/destinations/dubai",
    image: "/images/dubai.jpg",
  },
  {
    name: "London",
    country: "United Kingdom",
    region: "international",
    description:
      "Historic and vibrant — royal landmarks, world-class museums, theatre, and diverse neighbourhoods to explore.",
    href: "/destinations/london",
    image: "/images/london.jpg",
  },
  {
    name: "Bali",
    country: "Indonesia",
    region: "international",
    description:
      "Tropical island paradise with ancient temples, rice terraces, surf beaches, and rich spiritual culture.",
    href: "/destinations/bali",
    image: "/images/bali.jpg",
  },
  {
    name: "Nairobi & Maasai Mara",
    country: "Kenya",
    region: "international",
    description:
      "East Africa's safari capital — the Great Migration, Maasai culture, and Nairobi's vibrant urban energy.",
    href: "/destinations/nairobi-maasai-mara",
    image: "/images/nairobi.jpg",
  },
];

export interface Package {
  title: string;
  description: string;
  duration: string;
  price: string;
  location: string;
  highlights: string[];
  included: string[];
  href: string;
  popular?: boolean;
}

export const packages: Package[] = [
  {
    title: "Victoria Falls Weekend",
    description:
      "A perfect long weekend at Victoria Falls — see the falls, enjoy a sunset cruise, and experience the adventure activities.",
    duration: "3 days / 2 nights",
    price: "From US$450",
    location: "Victoria Falls, Zimbabwe",
    highlights: [
      "Guided tour of the Victoria Falls (Zimbabwe side)",
      "Zambezi sunset cruise with drinks",
      "Optional bungee jump or helicopter flip",
      "Luxury lodge accommodation",
    ],
    included: ["Return airport transfers", "2 nights accommodation", "Breakfast daily", "Falls entry fee", "Sunset cruise"],
    href: "/packages/vic-falls-weekend",
    popular: true,
  },
  {
    title: "Hwange Safari Escape",
    description:
      "Three days in Zimbabwe's largest national park — game drives, wildlife viewing, and starlit dinners.",
    duration: "4 days / 3 nights",
    price: "From US$780",
    location: "Hwange National Park, Zimbabwe",
    highlights: [
      "Full-day game drive in Hwange",
      "Elephant herds at waterholes",
      "Walking safari with armed ranger",
      "Sundowners overlooking the bush",
    ],
    included: ["Park entry fees", "3 nights safari lodge", "All meals", "Game drives in open vehicle", "Walking safari"],
    href: "/packages/hwange-safari",
    popular: true,
  },
  {
    title: "Eastern Highlands Getaway",
    description:
      "Escape to the cool mountains of Nyanga and Chimanimani for hiking, waterfalls, and forest retreats.",
    duration: "3 days / 2 nights",
    price: "From US$350",
    location: "Eastern Highlands, Zimbabwe",
    highlights: [
      "Hike up Mount Nyangani",
      "Visit tea estates and botanical gardens",
      "Waterfall walks and trout fishing",
      "Mountain lodge accommodation",
    ],
    included: ["Transport from Harare", "2 nights mountain lodge", "Breakfast & dinner", "Guided hikes", "Park fees"],
    href: "/packages/eastern-highlands-getaway",
  },
  {
    title: "Cape Town Explorer",
    description:
      "Discover the Mother City — Table Mountain, Cape Point, the Winelands, and stunning beaches.",
    duration: "5 days / 4 nights",
    price: "From US$1,250",
    location: "Cape Town, South Africa",
    highlights: [
      "Table Mountain cableway",
      "Cape Point & Cape of Good Hope",
      "Stellenbosch & Franschhoek wine tasting",
      "Boulders Beach penguins",
    ],
    included: ["Return flights from Harare", "4 nights hotel", "Breakfast daily", "2 guided tours", "Airport transfers"],
    href: "/packages/cape-town-explorer",
    popular: true,
  },
  {
    title: "Zanzibar Beach Holiday",
    description:
      "White sands, crystal waters, and spice-scented air — unwind on Tanzania's paradise island.",
    duration: "5 days / 4 nights",
    price: "From US$980",
    location: "Zanzibar, Tanzania",
    highlights: [
      "Beachfront resort on the east coast",
      "Stone Town walking tour",
      "Spice plantation visit",
      "Snorkelling at Mnemba Atoll",
    ],
    included: ["Return flights from Harare", "4 nights beach resort", "Half-board meals", "Stone Town tour", "Airport transfers"],
    href: "/packages/zanzibar-beach",
  },
  {
    title: "Dubai Stopover",
    description:
      "Turn your layover into a mini-holiday — shopping, desert safaris, and iconic city sights.",
    duration: "4 days / 3 nights",
    price: "From US$1,100",
    location: "Dubai, UAE",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with dune bashing",
      "Dubai Mall & fountain show",
      "Abra ride on Dubai Creek",
    ],
    included: ["Return flights from Harare", "3 nights hotel", "Breakfast daily", "Desert safari", "Airport transfers"],
    href: "/packages/dubai-stopover",
  },
];

export const testimonials = [
  {
    name: "Tendai M.",
    location: "Harare",
    text: "ArcTravel handled our entire family holiday to Victoria Falls. Every detail was perfect — from the flights to the lodge. Will definitely book again.",
  },
  {
    name: "Rachel K.",
    location: "Bulawayo",
    text: "I needed a last-minute visa for a business trip. ArcTravel got it sorted in 48 hours. Professional and reliable.",
  },
];

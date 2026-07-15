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

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const contactInfo = {
  phone: "+263 772 660 362",
  email: "info@arctravel.co.zw",
  address: "Harare, Zimbabwe",
};

export const socialLinks = {
  instagram: "#",
  facebook: "#",
  linkedin: "#",
  whatsapp: "#",
};

export const destinations = [
  {
    name: "Victoria Falls",
    country: "Zimbabwe",
    description:
      "One of the Seven Natural Wonders of the World — a must-visit for every traveller.",
    image: "/images/vic-falls.jpg",
  },
  {
    name: "Great Zimbabwe",
    country: "Zimbabwe",
    description:
      "Ancient stone ruins and UNESCO World Heritage site, rich with history and culture.",
    image: "/images/great-zimbabwe.jpg",
  },
  {
    name: "Eastern Highlands",
    country: "Zimbabwe",
    description:
      "Lush mountains, waterfalls, and tea estates — perfect for nature lovers and hikers.",
    image: "/images/eastern-highlands.jpg",
  },
  {
    name: "Hwange National Park",
    country: "Zimbabwe",
    description:
      "Zimbabwe's largest game reserve, home to over 100 mammal species and 400 bird species.",
    image: "/images/hwange.jpg",
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

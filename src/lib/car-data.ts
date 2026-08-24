// ============================================================
// CAR HIRE FLEET
// One file driving the /services/car-rentals page.
// 🔁 IMAGES: Unsplash placeholders — swap with real photos of
// your actual fleet. Drop files in /public/images/ and use
// e.g. image: "/images/cars/toyota-hilux.jpg"
// ============================================================

export type CarCategory = "4x4 & SUV" | "Sedan" | "Hatchback" | "Minibus";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  /** Daily hire price in US dollars. */
  pricePerDay: number;
  description: string;
  /** Total distance driven, in kilometres. */
  mileage: number;
  color: string;
  /** Hex value used to render the colour swatch. */
  colorHex: string;
  category: CarCategory;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel";
  image: string;
  popular?: boolean;
}

export const cars: Car[] = [
  {
    id: "toyota-hilux-double-cab",
    brand: "Toyota",
    model: "Hilux Double Cab 4x4",
    year: 2023,
    pricePerDay: 95,
    description:
      "Rugged and reliable double-cab 4x4 — ideal for game parks, rural roads, and long cross-country trips. Roof rack and tow bar included.",
    mileage: 38500,
    color: "White",
    colorHex: "#e6e6e6",
    category: "4x4 & SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
    popular: true,
  },
  {
    id: "toyota-fortuner-28-gd6",
    brand: "Toyota",
    model: "Fortuner 2.8 GD-6",
    year: 2022,
    pricePerDay: 85,
    description:
      "Spacious seven-seater SUV with excellent ground clearance — perfect for family safaris and business travel alike.",
    mileage: 52000,
    color: "Silver",
    colorHex: "#c0c0c0",
    category: "4x4 & SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    popular: true,
  },
  {
    id: "land-rover-defender-110",
    brand: "Land Rover",
    model: "Defender 110",
    year: 2021,
    pricePerDay: 150,
    description:
      "Iconic luxury 4x4 built for premium overland adventures without compromising on comfort.",
    mileage: 41000,
    color: "Black",
    colorHex: "#1a1a1a",
    category: "4x4 & SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "toyota-corolla-quest",
    brand: "Toyota",
    model: "Corolla Quest",
    year: 2023,
    pricePerDay: 55,
    description:
      "The dependable city runabout — economical, comfortable, and easy to park for meetings and errands around town.",
    mileage: 29000,
    color: "Pearl White",
    colorHex: "#f2f0ea",
    category: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mercedes-benz-c200",
    brand: "Mercedes-Benz",
    model: "C200",
    year: 2022,
    pricePerDay: 110,
    description:
      "Executive sedan for business travellers who want to arrive in style. Leather interior and climate control included.",
    mileage: 44000,
    color: "Obsidian Black",
    colorHex: "#0d0d0d",
    category: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bmw-320i",
    brand: "BMW",
    model: "320i",
    year: 2022,
    pricePerDay: 105,
    description:
      "Sporty yet refined sedan — a balanced drive for both city commutes and weekend getaways.",
    mileage: 46000,
    color: "Tanzanite Blue",
    colorHex: "#1f3a5f",
    category: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "honda-fit",
    brand: "Honda",
    model: "Fit",
    year: 2021,
    pricePerDay: 45,
    description:
      "Compact, fuel-efficient hatchback that's surprisingly roomy — a favourite for city hops and budget hire.",
    mileage: 58000,
    color: "Graphite Grey",
    colorHex: "#4a4f57",
    category: "Hatchback",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "suzuki-swift",
    brand: "Suzuki",
    model: "Swift",
    year: 2022,
    pricePerDay: 40,
    description:
      "Nimble and fun little hatchback — great on fuel and easy to manoeuvre through Harare traffic.",
    mileage: 33000,
    color: "Sunshine Yellow",
    colorHex: "#f4c20d",
    category: "Hatchback",
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "toyota-quantum",
    brand: "Toyota",
    model: "Quantum",
    year: 2020,
    pricePerDay: 120,
    description:
      "Ten-seater minibus for group transfers, church trips, and family outings — with plenty of luggage space.",
    mileage: 96000,
    color: "White",
    colorHex: "#e6e6e6",
    category: "Minibus",
    seats: 10,
    transmission: "Manual",
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
  },
];

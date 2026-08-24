// ============================================================
// CAR HIRE FLEET
// One file driving the /services/car-rentals page.
// 📸 IMAGES: real photos in /public/images/cars/*.png (1200×900).
// 💰 PRICES + mileage policy + transmissions confirmed by the owner (Aug 2025).
// ⚠️ Still to confirm: year, colour.
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
  /** Kilometres per day included in the daily rate. */
  includedKmPerDay: number;
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
    id: "toyota-hilux-d4d",
    brand: "Toyota",
    model: "Hilux D4D",
    year: 2019, // ⚠️ CONFIRM
    pricePerDay: 120,
    description:
      "Tough double-cab 4x4 built for game parks and rough roads — ideal for safaris and long cross-country trips.",
    includedKmPerDay: 300,
    color: "White", // ⚠️ CONFIRM
    colorHex: "#e6e6e6",
    category: "4x4 & SUV",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    image: "/images/cars/toyota_hilux_d4d.png",
    popular: true,
  },
  {
    id: "toyota-fortuner-d4d",
    brand: "Toyota",
    model: "Fortuner D4D",
    year: 2018, // ⚠️ CONFIRM
    pricePerDay: 120,
    description:
      "Reliable seven-seater diesel SUV with strong ground clearance — a favourite for family trips and group travel.",
    includedKmPerDay: 300,
    color: "Silver", // ⚠️ CONFIRM
    colorHex: "#c0c0c0",
    category: "4x4 & SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    image: "/images/cars/toyota_fortuner_d4d.png",
  },
  {
    id: "toyota-fortuner-gd6",
    brand: "Toyota",
    model: "Fortuner GD-6",
    year: 2021, // ⚠️ CONFIRM
    pricePerDay: 150,
    description:
      "The newer Fortuner — smoother and more refined, yet just as capable for safaris and business travel.",
    includedKmPerDay: 300,
    color: "White", // ⚠️ CONFIRM
    colorHex: "#e6e6e6",
    category: "4x4 & SUV",
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    image: "/images/cars/toyota_fortuner_gd6.png",
    popular: true,
  },
  {
    id: "toyota-allion",
    brand: "Toyota",
    model: "Allion",
    year: 2017, // ⚠️ CONFIRM
    pricePerDay: 60,
    description:
      "Comfortable, economical sedan — a dependable choice for city driving and business travel.",
    includedKmPerDay: 200,
    color: "Silver", // ⚠️ CONFIRM
    colorHex: "#c0c0c0",
    category: "Sedan",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    image: "/images/cars/toyota_alion.png",
  },
  {
    id: "toyota-aqua",
    brand: "Toyota",
    model: "Aqua",
    year: 2018, // ⚠️ CONFIRM
    pricePerDay: 45,
    description:
      "Fuel-sipping hybrid hatchback — cheap to run and easy to park, perfect for Harare city hops.",
    includedKmPerDay: 200,
    color: "Blue", // ⚠️ CONFIRM
    colorHex: "#2f5d8a",
    category: "Hatchback",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    image: "/images/cars/toyota_aqua.png",
  },
  {
    id: "honda-fit",
    brand: "Honda",
    model: "Fit",
    year: 2019, // ⚠️ CONFIRM
    pricePerDay: 45,
    description:
      "Compact, surprisingly roomy hatchback — great on fuel and a popular budget hire.",
    includedKmPerDay: 200,
    color: "White", // ⚠️ CONFIRM
    colorHex: "#e6e6e6",
    category: "Hatchback",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    image: "/images/cars/honda_fit.png",
  },
  {
    id: "toyota-hiace",
    brand: "Toyota",
    model: "Hiace",
    year: 2019, // ⚠️ CONFIRM
    pricePerDay: 120,
    description:
      "Spacious van for group transfers, airport shuttles, church trips, and family outings.",
    includedKmPerDay: 300,
    color: "White", // ⚠️ CONFIRM
    colorHex: "#e6e6e6",
    category: "Minibus",
    seats: 8,
    transmission: "Automatic",
    fuel: "Diesel",
    image: "/images/cars/toyota_hiace.png",
  },
];

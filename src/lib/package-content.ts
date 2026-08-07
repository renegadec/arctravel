// ============================================================
// PACKAGE DETAIL CONTENT
// One file driving all /packages/[slug] pages.
// Core package data (title, price, highlights...) lives in
// src/lib/constants.ts `packages` array; this file adds the
// visuals + itinerary layer.
// 🔁 IMAGES: Unsplash placeholders — swap with real photos.
// ============================================================

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
}

export interface PackageContent {
  slug: string;
  heroImage: string;
  gallery: string[];
  itinerary: ItineraryDay[];
  relatedDestination: string; // /destinations/[slug] or ""
  bookUrl: string;
}

export const packageContent: Record<string, PackageContent> = {
  "vic-falls-weekend": {
    slug: "vic-falls-weekend",
    heroImage:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Sunset Cruise",
        description:
          "Meet-and-greet at Victoria Falls airport, transfer to your lodge, then board a classic Zambezi sunset cruise with drinks and snacks.",
      },
      {
        day: "Day 2",
        title: "The Falls & Adventure",
        description:
          "Guided tour of the Victoria Falls (Zimbabwe side) in the morning. Afternoon free for optional bungee, helicopter flip, or gorge swing.",
      },
      {
        day: "Day 3",
        title: "Leisure & Departure",
        description:
          "Sleep in, enjoy a relaxed breakfast, and squeeze in a visit to the local craft market before your airport transfer.",
      },
    ],
    relatedDestination: "/destinations/victoria-falls",
    bookUrl:
      "/book?service=Guided+Tours&destination=Victoria+Falls&budget=Mid-Range&travellers=2&notes=Victoria+Falls+Weekend+package",
  },

  "hwange-safari": {
    slug: "hwange-safari",
    heroImage:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Afternoon Game Drive",
        description:
          "Transfer from Hwange or Victoria Falls to your safari lodge. Settle in, then head out for your first game drive as the light softens.",
      },
      {
        day: "Day 2",
        title: "Full-Day Safari",
        description:
          "A full-day game drive through the park's mopane woodland — elephant herds at waterholes, lions, and wild dog if you're lucky. Sundowners overlooking the bush.",
      },
      {
        day: "Day 3",
        title: "Walking Safari",
        description:
          "Experience the bush on foot with an armed ranger — track wildlife, learn bushcraft, and connect with the wilderness.",
      },
      {
        day: "Day 4",
        title: "Morning Drive & Departure",
        description:
          "One last sunrise game drive before breakfast and your transfer back to Hwange or Victoria Falls.",
      },
    ],
    relatedDestination: "/destinations/hwange-national-park",
    bookUrl:
      "/book?service=Guided+Tours&destination=Hwange+National+Park&budget=Premium&travellers=2&notes=Hwange+Safari+Escape+package",
  },

  "eastern-highlands-getaway": {
    slug: "eastern-highlands-getaway",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Depart Harare & Nyanga",
        description:
          "Road transfer from Harare through Mutare to Nyanga. Afternoon at leisure — trout fishing or a stroll through the botanical gardens.",
      },
      {
        day: "Day 2",
        title: "Mount Nyangani & Tea Estates",
        description:
          "Guided hike up Mount Nyangani, Zimbabwe's highest peak, followed by a tour of the rolling tea estates.",
      },
      {
        day: "Day 3",
        title: "Waterfalls & Return",
        description:
          "Morning waterfall walks and viewpoints before the scenic drive back to Harare.",
      },
    ],
    relatedDestination: "/destinations/eastern-highlands",
    bookUrl:
      "/book?service=Guided+Tours&destination=Eastern+Highlands&budget=Budget&travellers=2&notes=Eastern+Highlands+Getaway+package",
  },

  "cape-town-explorer": {
    slug: "cape-town-explorer",
    heroImage:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520110112025-678cbc9ba056?auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Waterfront",
        description:
          "Fly into Cape Town, transfer to your hotel, and spend the evening exploring the V&A Waterfront.",
      },
      {
        day: "Day 2",
        title: "Table Mountain & City",
        description:
          "Cableway up Table Mountain for panoramic views, then the Bo-Kaap and Company's Garden in the afternoon.",
      },
      {
        day: "Day 3",
        title: "Cape Peninsula",
        description:
          "Drive Chapman's Peak to Cape Point, with penguins at Boulders Beach and lunch in Simon's Town.",
      },
      {
        day: "Day 4",
        title: "Winelands",
        description:
          "Full-day Stellenbosch & Franschhoek wine tasting with cellar tours and farm-to-table lunch.",
      },
      {
        day: "Day 5",
        title: "Leisure & Departure",
        description:
          "Free morning on the beach or last-minute shopping before your flight home.",
      },
    ],
    relatedDestination: "/destinations/cape-town",
    bookUrl:
      "/book?service=Flight+Booking+%26+Itinerary+Curation&destination=Cape+Town&budget=Premium&travellers=2&notes=Cape+Town+Explorer+package",
  },

  "zanzibar-beach": {
    slug: "zanzibar-beach",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Beach Check-In",
        description:
          "Fly into Zanzibar, transfer to your beachfront resort on the east coast, and settle in with a sunset swim.",
      },
      {
        day: "Day 2",
        title: "Stone Town & Spices",
        description:
          "Morning walking tour of Stone Town's alleys and carved doors, then a spice plantation visit with fresh fruit tastings.",
      },
      {
        day: "Day 3",
        title: "Mnemba Atoll Snorkelling",
        description:
          "Boat trip to Mnemba Atoll marine reserve — snorkel with turtles, rays, and reef fish over lunch on the sandbank.",
      },
      {
        day: "Day 4",
        title: "Beach Leisure",
        description:
          "A full free day — dhow cruise, kitesurfing at Paje, spa treatment, or simply nothing at all.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Breakfast, souvenir shopping, and transfer to the airport for your flight home.",
      },
    ],
    relatedDestination: "/destinations/zanzibar",
    bookUrl:
      "/book?service=Flight+Booking+%26+Itinerary+Curation&destination=Zanzibar&budget=Mid-Range&travellers=2&notes=Zanzibar+Beach+Holiday+package",
  },

  "dubai-stopover": {
    slug: "dubai-stopover",
    heroImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533364978476-58e0c16e8f39?auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Downtown",
        description:
          "Transfer to your hotel, then explore Dubai Mall, the Dubai Fountain, and see the Burj Khalifa lit up at night.",
      },
      {
        day: "Day 2",
        title: "Burj Khalifa & Old Dubai",
        description:
          "Morning at the Burj Khalifa observation deck, then the Gold and Spice Souks with an abra ride across Dubai Creek.",
      },
      {
        day: "Day 3",
        title: "Desert Safari",
        description:
          "Afternoon desert safari — dune bashing, camel rides, sandboarding, and a BBQ dinner under the stars.",
      },
      {
        day: "Day 4",
        title: "Leisure & Departure",
        description:
          "Free morning at the beach or mall before your transfer to the airport.",
      },
    ],
    relatedDestination: "/destinations/dubai",
    bookUrl:
      "/book?service=Flight+Booking+%26+Itinerary+Curation&destination=Dubai&budget=Premium&travellers=2&notes=Dubai+Stopover+package",
  },
};

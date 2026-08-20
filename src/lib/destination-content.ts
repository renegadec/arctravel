// ============================================================
// DESTINATION DETAIL CONTENT
// One file driving all /destinations/[slug] pages.
// 🔁 IMAGES: Unsplash placeholders — swap with real photos.
// Best crops: hero ~16:9, highlight cards 4:3, gallery mixed.
// Drop files in /public/images/ and use e.g. "/images/vic-falls.jpg"
// ============================================================

export interface DestinationFact {
  label: string;
  value: string;
}

export interface DestinationHighlight {
  title: string;
  description: string;
  image: string;
}

export interface DestinationContent {
  slug: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  heroImage: string;
  bookUrl: string;
  facts: DestinationFact[];
  highlights: DestinationHighlight[];
  gallery: string[];
  tips: string[];
  relatedPackages: string[]; // package hrefs
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

export const destinationContent: Record<string, DestinationContent> = {
  "victoria-falls": {
    slug: "victoria-falls",
    name: "Victoria Falls",
    location: "Zimbabwe — Matabeleland North",
    tagline: "One of the Seven Natural Wonders of the World",
    description:
      "The world's largest sheet of falling water, surrounded by adventure, wildlife, and one of Africa's most iconic sunsets.",
    heroImage: "/images/destinations/victoria-falls.jpg",
    bookUrl: "/book?destination=Victoria+Falls&notes=Victoria+Falls+destination+page",
    facts: [
      { label: "Best time to visit", value: "Mar–May (high water) or Jun–Aug (clear views)" },
      { label: "Ideal for", value: "Couples, families & adventure seekers" },
      { label: "Suggested stay", value: "2–3 nights" },
      { label: "Getting there", value: "Fly into Victoria Falls (VFA) or road from Bulawayo" },
    ],
    highlights: [
      {
        title: "The Falls",
        description:
          "View the world's largest sheet of falling water from multiple vantage points — including the iconic Knife Edge Bridge and Boiling Pot.",
        image:
          "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Zambezi Sunset Cruise",
        description:
          "A classic Vic Falls experience. Cruise the Zambezi with drinks, snacks, and Africa's best sunset.",
        image:
          "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Adventure Activities",
        description:
          "Bungee jumping, white-water rafting, zip-lining, helicopter flips, and gorge swings — for the thrill-seekers.",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Wildlife & Safari",
        description:
          "Game drives in Zambezi National Park, walking safaris, and rhino tracking — all within reach of town.",
        image:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "/images/destinations/victoria-falls.jpg",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time to visit: March to May (high water — dramatic falls) or June to August (clear views, moderate water)",
      "Visa required on arrival for most nationalities (US$50 single entry, US$75 multiple)",
      "Pack light clothing and a raincoat — the spray from the falls soaks everything",
      "Book activities in advance during peak season (July-October)",
      "Both Zimbabwe and Zambia sides offer different views — we can arrange both",
    ],
    relatedPackages: ["/packages/vic-falls-weekend", "/packages/hwange-safari"],
    ctaTitle: "Ready to Experience the Falls?",
    ctaText:
      "Tell us your dates, group size, and interests. We'll build the perfect Victoria Falls itinerary.",
    ctaButton: "Start Planning",
  },

  "great-zimbabwe": {
    slug: "great-zimbabwe",
    name: "Great Zimbabwe",
    location: "Zimbabwe — Masvingo Province",
    tagline: "A UNESCO World Heritage site and a thousand years of history",
    description:
      "Walk through the ancient stone ruins of a medieval city that once ruled a vast trading empire.",
    heroImage: "/images/destinations/great-zimbabwe.jpg",
    bookUrl: "/book?destination=Great+Zimbabwe&notes=Great+Zimbabwe+destination+page",
    facts: [
      { label: "Best time to visit", value: "May–September (cool, dry weather)" },
      { label: "Ideal for", value: "History & culture lovers" },
      { label: "Suggested stay", value: "1–2 nights (base: Masvingo)" },
      { label: "Getting there", value: "~4 hours' drive from Harare or Bulawayo" },
    ],
    highlights: [
      {
        title: "The Great Enclosure",
        description:
          "The largest ancient stone structure in sub-Saharan Africa — a magnificent dry-stone wall complex dating to the 11th century.",
        image:
          "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Hill Complex",
        description:
          "The oldest part of the ruins, perched on a granite hill with panoramic views and evidence of early Shona civilisation.",
        image:
          "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Museum & Interpretive Centre",
        description:
          "Learn about the history, artefacts, and significance of Great Zimbabwe through well-curated exhibits.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Guided Cultural Tours",
        description:
          "Walk the site with a local guide who brings the history to life — stories of kings, trade routes, and daily life.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "/images/destinations/great-zimbabwe.jpg",
      "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Located near Masvingo city — approximately 4 hours' drive from Harare or Bulawayo",
      "Best visited between May and September (cool, dry weather)",
      "Wear comfortable walking shoes — the site covers a large area with uneven terrain",
      "Guided tours are strongly recommended to fully appreciate the history",
      "Combine with a trip to Lake Mutirikwi or Kyle Dam for a full weekend",
    ],
    relatedPackages: [],
    ctaTitle: "Step Into History",
    ctaText:
      "Tell us when you'd like to visit and whether you need transport and accommodation arranged.",
    ctaButton: "Plan Your Visit",
  },

  "eastern-highlands": {
    slug: "eastern-highlands",
    name: "Eastern Highlands",
    location: "Zimbabwe — Manicaland Province",
    tagline: "Lush mountains, waterfalls, and rolling tea estates",
    description:
      "Zimbabwe's cool green escape — misty peaks, trout rivers, botanical gardens, and some of the best hiking in the country.",
    heroImage: "/images/destinations/eastern-highlands.jpg",
    bookUrl: "/book?destination=Eastern+Highlands&notes=Eastern+Highlands+destination+page",
    facts: [
      { label: "Best time to visit", value: "April–September (cool, dry, clear skies)" },
      { label: "Ideal for", value: "Hikers, nature lovers & weekenders" },
      { label: "Suggested stay", value: "2–4 nights" },
      { label: "Getting there", value: "3–4 hours' drive from Harare" },
    ],
    highlights: [
      {
        title: "Nyanga National Park",
        description:
          "Zimbabwe's highest terrain — Mount Nyangani, trout-filled rivers, montane forest, and spectacular viewpoints.",
        image:
          "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Tea Estates & Botanical Gardens",
        description:
          "Visit rolling tea plantations, the historic Bvumba Botanical Gardens, and forest reserves.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Chimanimani Mountains",
        description:
          "Rugged peaks, crystal-clear rivers, and lush valleys — a paradise for serious hikers and photographers.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Lodges & Retreats",
        description:
          "Cozy mountain lodges, forest cottages, and trout-fishing resorts — perfect for a weekend getaway.",
        image:
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "/images/destinations/eastern-highlands.jpg",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time to visit: April to September (cool, dry, clear skies)",
      "Pack warm clothing — the highlands can get chilly, especially in winter (June-August)",
      "Hiking boots essential for Nyanga and Chimanimani trails",
      "Book accommodation in advance during school holidays and public holidays",
      "Perfect for a long weekend — 3 to 4 hours drive from Harare",
    ],
    relatedPackages: ["/packages/eastern-highlands-getaway"],
    ctaTitle: "Ready to Escape to the Mountains?",
    ctaText:
      "Tell us your dates and preferences — we'll arrange transport, accommodation, and trail guides.",
    ctaButton: "Book Your Getaway",
  },

  "hwange-national-park": {
    slug: "hwange-national-park",
    name: "Hwange National Park",
    location: "Zimbabwe — Matabeleland North",
    tagline: "Zimbabwe's largest game reserve — over 100 mammal species",
    description:
      "One of Africa's great safari destinations, famous for its enormous elephant herds and more than 400 bird species.",
    heroImage: "/images/destinations/hwange.jpg",
    bookUrl: "/book?destination=Hwange+National+Park&notes=Hwange+destination+page",
    facts: [
      { label: "Best time to visit", value: "July–October (dry season — wildlife at waterholes)" },
      { label: "Ideal for", value: "Safari & wildlife enthusiasts" },
      { label: "Suggested stay", value: "2–4 nights" },
      { label: "Getting there", value: "Fly to Hwange/Victoria Falls, then road transfer" },
    ],
    highlights: [
      {
        title: "Elephant & Wildlife Viewing",
        description:
          "Hwange has one of Africa's largest elephant populations — plus lion, leopard, buffalo, wild dog, and over 400 bird species.",
        image:
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Game Drives & Walking Safaris",
        description:
          "Morning, afternoon, and full-day game drives in open vehicles, plus guided walking safaris with experienced rangers.",
        image:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Photographic Safaris",
        description:
          "Scheduled around the best light — sunrise and sunset drives offer incredible photography opportunities.",
        image:
          "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Lodges & Camping",
        description:
          "From luxury safari lodges to bush camps and self-catering chalets — options for every budget and style.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "/images/destinations/hwange.jpg",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time to visit: July to October (dry season — animals concentrate around waterholes)",
      "Green season (November-March) offers lush scenery, migrant birds, and fewer crowds",
      "Pack neutral-coloured clothing, a good hat, sunscreen, and insect repellent",
      "Book accommodation well in advance for peak season (August-October)",
      "Malaria prophylaxis recommended — consult your doctor before travelling",
    ],
    relatedPackages: ["/packages/hwange-safari", "/packages/vic-falls-weekend"],
    ctaTitle: "Ready for a Safari?",
    ctaText:
      "Tell us your dates, group size, and preferred accommodation style. We'll arrange everything.",
    ctaButton: "Book a Safari",
  },

  "kariba": {
    slug: "kariba",
    name: "Lake Kariba",
    location: "Zimbabwe — Zambezi Valley (Kariba)",
    tagline: "The world's largest man-made lake by volume — houseboats, tiger fish, and endless sunsets",
    description:
      "A vast inland sea created by the Kariba Dam, where houseboat safaris, world-class tiger fishing, and wildlife meet on the Zambezi.",
    heroImage: "/images/destinations/kariba.jpg",
    bookUrl: "/book?destination=Lake+Kariba&notes=Lake+Kariba+destination+page",
    facts: [
      { label: "Best time to visit", value: "April–October (dry season; Aug–Oct prime for tiger fishing)" },
      { label: "Ideal for", value: "Families, anglers & slow travellers" },
      { label: "Suggested stay", value: "2–3 nights" },
      { label: "Getting there", value: "~5 hours' drive from Harare, or fly into Kariba (KAB)" },
    ],
    highlights: [
      {
        title: "Houseboat Safaris",
        description:
          "Sleep on the water and wake to sunrise over the lake — houseboats cruise the shoreline with decks for wildlife spotting, fishing, and stargazing.",
        image:
          "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Tiger Fishing",
        description:
          "Kariba is world-famous for tigerfish — one of Africa's hardest-fighting freshwater fish. Peak season runs August to October.",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Matusadona & Wildlife",
        description:
          "Game drives and boating safaris in Matusadona National Park — elephants, lions, buffalo, and hippos along the lake's southern shore.",
        image:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Sunset Cruises & the Dam Wall",
        description:
          "Cruise the lake at golden hour, watch the Kapenta fishing boats light up at night, and visit the Kariba Dam wall — one of Africa's great engineering feats.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "/images/destinations/kariba.jpg",
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time to visit: April to October; book houseboats well ahead for December–January and August–October",
      "Tiger fishing peaks August–October — the tigerfish is a spectacular fighter",
      "Hippos and crocodiles are common — always follow your guide's instructions around the water",
      "Pack strong sun protection and light clothing; evenings on the water can be breezy",
      "Carry cash — ATM and card options are limited in Kariba town",
    ],
    relatedPackages: [],
    ctaTitle: "Sleep on the Lake",
    ctaText:
      "Tell us your dates and group size — we'll arrange houseboat hire, transfers, and activities.",
    ctaButton: "Plan a Kariba Escape",
  },

  "cape-town": {
    slug: "cape-town",
    name: "Cape Town",
    location: "South Africa — Western Cape",
    tagline: "Table Mountain, wild coastlines, and world-class wine",
    description:
      "A stunning coastal city where mountains meet the ocean — vibrant waterfronts, vineyards, and incredible beaches.",
    heroImage:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Cape+Town&notes=Cape+Town+destination+page",
    facts: [
      { label: "Best time to visit", value: "November–March (summer — warm & sunny)" },
      { label: "Ideal for", value: "Couples, foodies & adventurers" },
      { label: "Suggested stay", value: "4–6 nights" },
      { label: "Getting there", value: "Direct flights from Harare to Cape Town (CPT)" },
    ],
    highlights: [
      {
        title: "Table Mountain & the Peaks",
        description:
          "Ride the cableway or hike up Table Mountain, Lion's Head, or Signal Hill for panoramic views of the city and ocean.",
        image:
          "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Cape Point & the Peninsula",
        description:
          "Drive the scenic Chapman's Peak route to Cape Point, where the Atlantic and Indian Oceans meet. Penguins at Boulders Beach included.",
        image:
          "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Winelands Tour",
        description:
          "Explore Stellenbosch, Franschhoek, and Paarl — world-class wine estates, cellar tours, and farm-to-table dining.",
        image:
          "https://images.unsplash.com/photo-1520110112025-678cbc9ba056?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Waterfront & City Life",
        description:
          "The V&A Waterfront offers shopping, dining, museums, and harbour cruises. Don't miss the Zeitz MOCAA art museum.",
        image:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520110112025-678cbc9ba056?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time: November to March (summer — warm, sunny, perfect beach weather)",
      "Book Table Mountain cableway tickets online in advance to avoid queues",
      "Rent a car for the Cape Peninsula — it's the best way to explore at your own pace",
      "Try a Cape Malay cooking class in the Bo-Kaap neighbourhood",
      "South Africa requires a valid passport with at least 2 blank pages",
    ],
    relatedPackages: ["/packages/cape-town-explorer"],
    ctaTitle: "Ready for Cape Town?",
    ctaText:
      "Tell us your dates and interests — we'll arrange flights, accommodation, tours, and transport.",
    ctaButton: "Start Planning",
  },

  "okavango-delta": {
    slug: "okavango-delta",
    name: "Okavango Delta",
    location: "Botswana — Ngamiland",
    tagline: "One of Africa's last great wilderness areas",
    description:
      "A UNESCO World Heritage site where the Okavango River spreads into a maze of lagoons, islands, and floodplains teeming with wildlife.",
    heroImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Okavango+Delta&notes=Okavango+Delta+destination+page",
    facts: [
      { label: "Best time to visit", value: "June–October (dry season, peak wildlife)" },
      { label: "Ideal for", value: "Wildlife & wilderness lovers" },
      { label: "Suggested stay", value: "3–4 nights" },
      { label: "Getting there", value: "Light aircraft from Maun (arranged in your package)" },
    ],
    highlights: [
      {
        title: "Mokoro Safaris",
        description:
          "Glide through papyrus-lined channels in a traditional dugout canoe — the quintessential Okavango experience.",
        image:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Game Drives",
        description:
          "Open-vehicle game drives across the delta's islands and floodplains. Elephant, lion, leopard, wild dog, and buffalo.",
        image:
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Walking Safaris",
        description:
          "Explore on foot with an armed ranger — track animals, learn bushcraft, and connect with the wilderness.",
        image:
          "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Luxury & Camping",
        description:
          "From tented camps under the stars to exclusive fly-camp lodges — stay right in the heart of the delta.",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time: June to October (dry season, peak wildlife viewing)",
      "Access is by light aircraft from Maun (flights arranged in your package)",
      "Malaria prophylaxis is recommended — consult your doctor",
      "Pack light, neutral clothing, a sun hat, and good binoculars",
      "Botswana visas are visa-free for most African passport holders for up to 90 days",
    ],
    relatedPackages: [],
    ctaTitle: "Ready for the Delta?",
    ctaText: "Tell us your preferred dates and group size — we'll tailor a safari that fits.",
    ctaButton: "Plan Your Safari",
  },

  zanzibar: {
    slug: "zanzibar",
    name: "Zanzibar",
    location: "Tanzania — Zanzibar Archipelago",
    tagline: "White sands, turquoise waters, and spice-scented air",
    description:
      "Tropical paradise with pristine beaches, a UNESCO-listed Stone Town, spice plantations, and world-class snorkelling.",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Zanzibar&notes=Zanzibar+destination+page",
    facts: [
      { label: "Best time to visit", value: "June–October or December–February" },
      { label: "Ideal for", value: "Beach holidays, honeymoons & divers" },
      { label: "Suggested stay", value: "4–6 nights" },
      { label: "Getting there", value: "Fly via Dar es Salaam or direct into Zanzibar (ZNZ)" },
    ],
    highlights: [
      {
        title: "Beaches & Resorts",
        description:
          "Pristine white-sand beaches on the east coast — Nungwi, Kendwa, and Paje. Swim, snorkel, dhow cruises, and chill.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Stone Town",
        description:
          "A UNESCO World Heritage site — narrow alleyways, carved doors, spice markets, and centuries of Swahili culture.",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Spice Tours",
        description:
          "Zanzibar is the Spice Island. Visit plantations for cloves, nutmeg, cinnamon, and vanilla — with fresh fruit tastings.",
        image:
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Mnemba Atoll",
        description:
          "A protected marine reserve off the northeast coast. World-class snorkelling and diving with turtles, rays, and reef fish.",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time: June to October (dry, cool) or December to February (warm, clear)",
      "Visa on arrival for most nationalities (US$50 single entry)",
      "Dress modestly in Stone Town out of respect for the local culture",
      "Try Zanzibari cuisine — seafood curries, biryani, and fresh sugarcane juice",
      "Combine with a Tanzania safari (Serengeti / Ngorongoro) for the ultimate trip",
    ],
    relatedPackages: ["/packages/zanzibar-beach"],
    ctaTitle: "Paradise Awaits",
    ctaText: "Tell us your dates — we'll handle flights, resort, transfers, and excursions.",
    ctaButton: "Book Your Escape",
  },

  "johannesburg-kruger": {
    slug: "johannesburg-kruger",
    name: "Johannesburg & Kruger",
    location: "South Africa — Gauteng & Mpumalanga",
    tagline: "Africa's economic hub meets one of its greatest parks",
    description:
      "City energy and world-class safari in one trip — Soweto and Sandton paired with Kruger National Park's Big Five.",
    heroImage:
      "https://images.unsplash.com/photo-1536081784351-6a2f2ba35b57?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Johannesburg+%26+Kruger&notes=Joburg+and+Kruger+destination+page",
    facts: [
      { label: "Best time to visit", value: "May–October (dry season, best Kruger viewing)" },
      { label: "Ideal for", value: "City + safari combos" },
      { label: "Suggested stay", value: "4–6 nights" },
      { label: "Getting there", value: "Fly to Johannesburg (JNB); road or flight to Kruger" },
    ],
    highlights: [
      {
        title: "Joburg City Life",
        description:
          "Explore Maboneng, Soweto, the Apartheid Museum, and the vibrant arts and food scene of South Africa's largest city.",
        image:
          "https://images.unsplash.com/photo-1536081784351-6a2f2ba35b57?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Kruger National Park",
        description:
          "One of Africa's premier game reserves — self-drive or guided safaris with incredible wildlife viewing year-round.",
        image:
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Panorama Route",
        description:
          "Blyde River Canyon, Bourke's Luck Potholes, and God's Window — spectacular scenery on the drive to Kruger.",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Sandton & Shopping",
        description:
          "Africa's richest square mile — luxury malls, fine dining, and the stock exchange. Great for business travellers.",
        image:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1536081784351-6a2f2ba35b57?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time for Kruger: May to October (dry season, best wildlife viewing)",
      "Joburg is a driving city — arrange a car or driver for convenience",
      "Kruger is about 4-5 hours' drive from Joburg; we can arrange flights to Skukuza",
      "Malaria prophylaxis recommended for Kruger visits",
      "South Africa requires a valid passport with 2 blank pages",
    ],
    relatedPackages: [],
    ctaTitle: "City + Safari Combo?",
    ctaText: "Tell us how many days and what you want to prioritise — we'll build the perfect itinerary.",
    ctaButton: "Get Started",
  },

  dubai: {
    slug: "dubai",
    name: "Dubai",
    location: "United Arab Emirates",
    tagline: "Modern marvels meet Arabian tradition",
    description:
      "The world's tallest building, desert safaris, gold souks, and beach resorts — Dubai does everything at maximum scale.",
    heroImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Dubai&notes=Dubai+destination+page",
    facts: [
      { label: "Best time to visit", value: "November–March (cooler, 20–30°C)" },
      { label: "Ideal for", value: "Shopping, families & stopovers" },
      { label: "Suggested stay", value: "3–5 nights" },
      { label: "Getting there", value: "Direct flights from Harare to Dubai (DXB)" },
    ],
    highlights: [
      {
        title: "Burj Khalifa & Downtown",
        description:
          "Stand atop the world's tallest building. Explore Dubai Mall, the Dubai Fountain, and the Souk Al Bahar.",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Desert Safari",
        description:
          "Dune bashing, camel rides, sandboarding, and a BBQ dinner under the stars in the Arabian desert.",
        image:
          "https://images.unsplash.com/photo-1533364978476-58e0c16e8f39?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Gold Souk & Traditional Dubai",
        description:
          "Visit the Gold Souk, Spice Souk, and take an abra (water taxi) across Dubai Creek to the old quarter.",
        image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Beaches & Resorts",
        description:
          "Jumeirah Beach, Palm Jumeirah, and Atlantis — world-class beach clubs, waterparks, and luxury resorts.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533364978476-58e0c16e8f39?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time: November to March (cooler, 20-30°C)",
      "Visa on arrival for many nationalities (check before travel)",
      "Dubai is conservative — dress modestly in public areas and malls",
      "Weekend is Friday-Saturday; Sunday is a working day",
      "Uber and Careem are widely available and affordable",
    ],
    relatedPackages: ["/packages/dubai-stopover"],
    ctaTitle: "Dubai Calling?",
    ctaText:
      "A stopover or a full holiday — we'll handle flights, hotels, transfers, and activities.",
    ctaButton: "Book Now",
  },

  london: {
    slug: "london",
    name: "London",
    location: "United Kingdom — England",
    tagline: "Royal landmarks, world-class museums, and West End theatre",
    description:
      "Historic and endlessly vibrant — palaces, free museums, iconic markets, and a food scene that spans the globe.",
    heroImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=London&notes=London+destination+page",
    facts: [
      { label: "Best time to visit", value: "May–September (warmer, longer days)" },
      { label: "Ideal for", value: "Culture, history & theatre lovers" },
      { label: "Suggested stay", value: "5–7 nights" },
      { label: "Getting there", value: "Direct flights from Harare to London (LHR)" },
    ],
    highlights: [
      {
        title: "Royal London",
        description:
          "Buckingham Palace, Westminster Abbey, the Tower of London, and the Changing of the Guard.",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Museums & Galleries",
        description:
          "The British Museum, Natural History Museum, Tate Modern, and the V&A — most are free to enter.",
        image:
          "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Neighbourhoods & Markets",
        description:
          "Camden Market, Borough Market, Notting Hill, Shoreditch, and Covent Garden — each with its own character.",
        image:
          "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Theatre & Nightlife",
        description:
          "West End theatre, comedy clubs, rooftop bars, and live music venues across Soho and the South Bank.",
        image:
          "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time: May to September (warmer, longer days, outdoor events)",
      "UK Standard Visitor visa required for Zimbabwe passport holders (apply well in advance)",
      "The Tube is the fastest way around — get an Oyster card for cheaper fares",
      "Book West End shows and popular restaurants in advance",
      "Many museums are free — plan which ones you want to prioritise",
    ],
    relatedPackages: [],
    ctaTitle: "London Calling?",
    ctaText:
      "Flights, hotels, visa assistance, and a custom itinerary — we've got London covered.",
    ctaButton: "Start Planning",
  },

  bali: {
    slug: "bali",
    name: "Bali",
    location: "Indonesia",
    tagline: "Temples, rice terraces, surf beaches, and spiritual culture",
    description:
      "The Island of the Gods — ancient temples, emerald rice paddies, world-class surf, and a wellness scene like nowhere else.",
    heroImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Bali&notes=Bali+destination+page",
    facts: [
      { label: "Best time to visit", value: "April–October (dry season, sunny)" },
      { label: "Ideal for", value: "Honeymoons, surfers & wellness seekers" },
      { label: "Suggested stay", value: "5–7 nights" },
      { label: "Getting there", value: "Fly via Doha/Dubai to Denpasar (DPS)" },
    ],
    highlights: [
      {
        title: "Ubud & Rice Terraces",
        description:
          "The spiritual heart of Bali — monkey forest, Tegallalang rice terraces, yoga retreats, and traditional crafts.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Temples & Culture",
        description:
          "Tanah Lot, Uluwatu, Besakih — ancient sea temples perched on cliffs, with mesmerising kecak fire dances.",
        image:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Beaches & Surf",
        description:
          "Seminyak, Canggu, Uluwatu — world-class surf breaks, beach clubs, sunsets, and coastal dining.",
        image:
          "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Wellness & Retreats",
        description:
          "Bali is a global wellness destination — yoga, meditation, spa treatments, and plant-based cuisine.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time: April to October (dry season, sunny)",
      "Visa on arrival for many nationalities (US$35, 30 days, extendable)",
      "Rent a scooter or hire a driver — it's the best way to get around",
      "Dress modestly when visiting temples (sarong and sash required)",
      "Bali is more affordable than you think — great value for accommodation and food",
    ],
    relatedPackages: [],
    ctaTitle: "Island of the Gods",
    ctaText: "Flights, villas, drivers, and experiences — we'll create your perfect Bali itinerary.",
    ctaButton: "Book Bali",
  },

  "nairobi-maasai-mara": {
    slug: "nairobi-maasai-mara",
    name: "Nairobi & Maasai Mara",
    location: "Kenya",
    tagline: "The Great Migration, Maasai culture, and safari capital energy",
    description:
      "East Africa's safari heartland — witness the Great Migration, meet the Maasai, and explore Nairobi's vibrant urban scene.",
    heroImage:
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Nairobi+%26+Maasai+Mara&notes=Nairobi+and+Maasai+Mara+destination+page",
    facts: [
      { label: "Best time to visit", value: "July–October (Great Migration river crossings)" },
      { label: "Ideal for", value: "Safari & cultural experiences" },
      { label: "Suggested stay", value: "3–5 nights" },
      { label: "Getting there", value: "Fly to Nairobi (NBO); road or light aircraft to the Mara" },
    ],
    highlights: [
      {
        title: "Maasai Mara Safari",
        description:
          "Witness the Great Migration (July-October), the Big Five, and vast open plains that define the African safari experience.",
        image:
          "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Maasai Village Visit",
        description:
          "Meet the Maasai people in their manyattas — learn about their traditions, dancing, and way of life.",
        image:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Nairobi City",
        description:
          "The Green City in the Sun — Nairobi National Park (safari with city skyline), Giraffe Centre, Karen Blixen Museum, and great restaurants.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Amboseli & Other Parks",
        description:
          "Extensions to Amboseli (Mt Kilimanjaro views), Lake Nakuru (flamingos), and Tsavo — endless safari combinations.",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time for Mara: July to October (Great Migration river crossings)",
      "Visa on arrival or e-visa available (apply online before travel)",
      "Nairobi is high altitude — stays cool year-round; pack a jacket",
      "Combine with a Zanzibar beach extension for the perfect Kenya + beach holiday",
      "Book safari camps well in advance for peak migration season",
    ],
    relatedPackages: [],
    ctaTitle: "Witness the Mara?",
    ctaText:
      "The Great Migration is one of nature's greatest spectacles. Let us plan your Kenyan adventure.",
    ctaButton: "Start Planning",
  },

  "diani-beach": {
    slug: "diani-beach",
    name: "Diani Beach",
    location: "Kenya — Kwale County, south coast",
    tagline: "White sands and turquoise Indian Ocean on Kenya's south coast",
    description:
      "17 km of powder-white sand, palm-fringed shores, and warm coral-filled waters — consistently rated among Africa's best beaches.",
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    bookUrl: "/book?destination=Diani+Beach&notes=Diani+Beach+destination+page",
    facts: [
      { label: "Best time to visit", value: "Dec–Mar (hot & dry) or Jul–Oct (cooler dry season)" },
      { label: "Ideal for", value: "Honeymooners, divers & beach lovers" },
      { label: "Suggested stay", value: "4–7 nights" },
      { label: "Getting there", value: "Fly to Mombasa (MBA) or Ukunda (UKA), then a 30–60 min drive" },
    ],
    highlights: [
      {
        title: "The Beach",
        description:
          "Kilometres of white sand and warm, shallow water — perfect for swimming, long walks, and beachfront sundowners.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Snorkelling & Diving",
        description:
          "Coral gardens, dolphins, turtles, and reef fish at Kisite-Mpunguti Marine Park — a short dhow ride from Diani.",
        image:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Dhow Trips & Wasini Island",
        description:
          "Sail a traditional dhow to Wasini Island for lunch, snorkelling, and a visit to the sea turtle sanctuary.",
        image:
          "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Shimba Hills & Forest Walks",
        description:
          "Elephants, sable antelope, and the rare Angolan colobus monkey in the rainforest of Shimba Hills National Reserve.",
        image:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    ],
    tips: [
      "Best time to visit: December to March (hot, dry) or July to October (cooler); avoid the long rains (April–June)",
      "Kenya now uses an eTA — apply online before you travel (from about US$34)",
      "ATMs are limited in Diani — carry some cash; USD and M-Pesa are widely accepted",
      "Don't miss the dhow trip to Wasini Island — dolphins are common on the crossing",
      "Combine with a safari: Tsavo East/West and Shimba Hills are close enough for day trips",
    ],
    relatedPackages: ["/packages/zanzibar-beach"],
    ctaTitle: "Diani Days Await",
    ctaText:
      "Tell us your dates and we'll put together flights, beachfront stays, and day trips to Wasini and the marine park.",
    ctaButton: "Plan My Beach Escape",
  },
};

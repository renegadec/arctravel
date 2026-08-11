import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ui/chatbot";
import { SITE_URL } from "@/lib/constants";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: "/arctravel_logo.svg",
  title: {
    default: "Arc Travel & Tours — Your Trusted Travel Agency in Zimbabwe",
    template: "%s | Arc Travel & Tours",
  },
  description:
    "Full-service travel agency in Zimbabwe — flights, hotels, tours, visas, airport transfers, corporate travel, and more. Let us plan your next journey.",
  keywords: [
    "travel agency Zimbabwe",
    "flight booking Harare",
    "Victoria Falls tours",
    "visa assistance Zimbabwe",
    "corporate travel Zimbabwe",
    "holiday packages Zimbabwe",
    "Arc Travel & Tours",
    "Arc Travel & Tours",
  ],
  openGraph: {
    title: "Arc Travel & Tours — Your Trusted Travel Agency in Zimbabwe",
    description:
      "Flights, hotels, tours, visas, airport transfers, corporate travel — tell us where you're going and we'll take care of the rest.",
    url: SITE_URL,
    siteName: "Arc Travel & Tours",
    locale: "en_ZW",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arc Travel & Tours — Your Next Adventure Starts Here",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arc Travel & Tours — Your Trusted Travel Agency in Zimbabwe",
    description:
      "Flights, hotels, tours, visas, airport transfers, corporate travel — let us plan your next journey.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Arc Travel & Tours",
  url: SITE_URL,
  logo: `${SITE_URL}/arctravel_logo.svg`,
  image: `${SITE_URL}/og-image.png`,
  telephone: "+263 78 657 7594",
  email: "info@arctravel.co.zw",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "ZW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -17.8252,
    longitude: 31.0335,
  },
  areaServed: ["Zimbabwe", "Southern Africa", "International"],
  sameAs: [SITE_URL],
  openingHours: "Mo-Fr 08:00-17:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}

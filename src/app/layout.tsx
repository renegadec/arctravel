import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ui/chatbot";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  icons: "/arctravel_logo.svg",
  title: "ArcTravel — Your Trusted Travel Agency",
  description:
    "Full-service travel agency in Zimbabwe — flights, hotels, tours, visas, airport transfers, corporate travel, and more. Let us plan your next journey.",
  openGraph: {
    title: "ArcTravel — Your Trusted Travel Agency",
    description:
      "Full-service travel agency in Zimbabwe — flights, hotels, tours, visas, airport transfers, corporate travel, and more.",
    type: "website",
  },
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}

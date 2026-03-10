import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Toronto Robotics — Robot News, Reviews & Buying Guide",
    template: "%s | Toronto Robotics",
  },
  description:
    "Your source for robot news, reviews, and how to buy a robot in Toronto. Updated daily.",
  keywords: [
    "robots Toronto",
    "robot news",
    "robot reviews",
    "buy robot Toronto",
    "robotics Canada",
    "home robots",
    "robot buying guide",
  ],
  authors: [{ name: "Toronto Robotics" }],
  creator: "Toronto Robotics",
  metadataBase: new URL("https://torontorobotics.carapaceos.com"),
  alternates: { canonical: "https://torontorobotics.carapaceos.com" },
  openGraph: {
    title: "Toronto Robotics",
    description: "Robot news, reviews, and buying guide for Toronto.",
    url: "https://torontorobotics.carapaceos.com",
    siteName: "Toronto Robotics",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

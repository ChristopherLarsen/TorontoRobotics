import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Toronto Robotics — Premium Robot Reviews & Buying Guide",
    template: "%s | Toronto Robotics",
  },
  description:
    "Your definitive guide to finding the best robots in Toronto. Premium reviews, comparisons, and news.",
  keywords: [
    "robots Toronto",
    "robot reviews",
    "best robots",
    "buy robot Toronto",
    "robotics Canada",
    "home robots",
    "robot buying guide",
  ],
  authors: [{ name: "Toronto Robotics" }],
  creator: "Toronto Robotics",
  metadataBase: new URL("https://robots.deadratgames.com"),
  alternates: { canonical: "https://robots.deadratgames.com" },
  openGraph: {
    title: "Toronto Robotics",
    description: "Premium robot reviews and buying guide for Toronto.",
    url: "https://robots.deadratgames.com",
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
      <body className={`${inter.variable} ${lora.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

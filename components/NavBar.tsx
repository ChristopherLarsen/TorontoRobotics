"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <nav className="border-b border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Tagline */}
          <div className="flex-shrink-0 flex flex-col justify-center">
            <Link href="/" className="font-serif text-2xl font-black tracking-tight text-[var(--color-brand-text)] hover:opacity-80 transition-opacity leading-none">
              TORONTO<span className="text-[var(--color-brand-accent)] ml-1">ROBOTICS</span>
            </Link>
            <span className="text-[9px] font-bold tracking-widest text-[var(--color-brand-muted)] mt-1">
              INTELLIGENT HUMANOID ROBOTS
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/news" className="text-sm font-semibold tracking-wide text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] uppercase transition-colors">
              News
            </Link>
            <Link href="/reviews" className="text-sm font-semibold tracking-wide text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] uppercase transition-colors">
              Reviews
            </Link>
            
            {/* Dropdown for Categories */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="text-sm font-semibold tracking-wide text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] uppercase transition-colors flex items-center gap-1">
                Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {isCategoriesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-64 pt-6 pb-2">
                  <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-xl rounded-sm overflow-hidden py-2">
                    <Link href="/categories/home" className="block px-6 py-3 text-sm text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-accent)] transition-colors">Home Robots</Link>
                    <Link href="/categories/companion" className="block px-6 py-3 text-sm text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-accent)] transition-colors">Companion Robots</Link>
                    <Link href="/categories/educational" className="block px-6 py-3 text-sm text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-accent)] transition-colors">Educational Robots</Link>
                    <Link href="/categories/industrial" className="block px-6 py-3 text-sm text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-accent)] transition-colors">Industrial / Business</Link>
                    <Link href="/categories/lawn" className="block px-6 py-3 text-sm text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-accent)] transition-colors">Lawn / Cleaning</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/buy" className="text-sm font-semibold tracking-wide text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] uppercase transition-colors">
              Buying Guides
            </Link>
            <Link href="/about" className="text-sm font-semibold tracking-wide text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] uppercase transition-colors">
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-[var(--color-brand-text)] hover:text-[var(--color-brand-accent)] focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

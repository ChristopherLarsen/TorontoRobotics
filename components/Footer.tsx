import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-surface)] border-t border-[var(--color-brand-border)] mt-24 py-16 text-[var(--color-brand-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-serif text-xl font-black tracking-tight mb-4 block">
              TORONTO<span className="text-[var(--color-brand-accent)]">ROBOTICS</span>
            </Link>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mt-4 max-w-xs">
              A premium product review magazine for robotics in Toronto. Independent, rigorous, and beautifully presented.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs mb-6 text-[var(--color-brand-text)]">Explore</h4>
            <ul className="space-y-4 text-sm text-[var(--color-brand-muted)]">
              <li><Link href="/news" className="hover:text-[var(--color-brand-accent)] transition-colors">Robot News</Link></li>
              <li><Link href="/reviews" className="hover:text-[var(--color-brand-accent)] transition-colors">Robot Reviews</Link></li>
              <li><Link href="/buy" className="hover:text-[var(--color-brand-accent)] transition-colors">Buying Guides</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs mb-6 text-[var(--color-brand-text)]">Categories</h4>
            <ul className="space-y-4 text-sm text-[var(--color-brand-muted)]">
              <li><Link href="/categories/home" className="hover:text-[var(--color-brand-accent)] transition-colors">Home & Cleaning</Link></li>
              <li><Link href="/categories/companion" className="hover:text-[var(--color-brand-accent)] transition-colors">Companion Robots</Link></li>
              <li><Link href="/categories/educational" className="hover:text-[var(--color-brand-accent)] transition-colors">Educational</Link></li>
              <li><Link href="/categories/industrial" className="hover:text-[var(--color-brand-accent)] transition-colors">Industrial & Business</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-xs mb-6 text-[var(--color-brand-text)]">About Us</h4>
            <ul className="space-y-4 text-sm text-[var(--color-brand-muted)]">
              <li><Link href="/about" className="hover:text-[var(--color-brand-accent)] transition-colors">Our Methodology</Link></li>
              <li><Link href="/about#team" className="hover:text-[var(--color-brand-accent)] transition-colors">Editorial Team</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-brand-border)] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-brand-muted)]">
          <p>© {new Date().getFullYear()} Toronto Robotics. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[var(--color-brand-text)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-brand-text)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

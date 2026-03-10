import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Toronto <span style={{ color: "var(--tr-red)" }}>Robotics</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/news" className="hover:text-black transition-colors">News</Link>
          <Link href="/reviews" className="hover:text-black transition-colors">Reviews</Link>
          <Link href="/buy" className="hover:text-black transition-colors">Buy a Robot</Link>
          <Link href="/about" className="hover:text-black transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
}

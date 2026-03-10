import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 py-8 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <span>© {new Date().getFullYear()} Toronto Robotics</span>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/buy" className="hover:text-black">Buy a Robot</Link>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Toronto Robotics.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-6">About Toronto Robotics</h1>
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
        <p>
          Toronto Robotics is a daily robot news and review site for Canadians who care about
          the future of robotics — whether you&apos;re a researcher, enthusiast, or just curious
          about what&apos;s coming.
        </p>
        <p>
          Every morning, our AI editor scans the world&apos;s robot news and writes one great
          article about the most important story of the day. No filler. No aggregation. Just
          one well-written piece that matters.
        </p>
        <p>
          We also publish robot reviews and a buying guide to help Torontonians figure out
          which robot is right for them.
        </p>
        <p className="text-gray-400 text-sm pt-4">
          Built in Toronto. Powered by OpenClaw.
        </p>
      </div>
    </div>
  );
}

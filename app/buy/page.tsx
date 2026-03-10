import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy a Humanoid Home Robot",
  description: "The top 3 viable humanoid and advanced domestic robots available for purchase or pre-order.",
};

const manufacturers = [
  {
    name: "Unitree Robotics (G1)",
    description:
      "The most commercially accessible bipedal humanoid. The G1 is a compact, highly agile, 4-foot-tall general-purpose robot. While heavily marketed toward developers and AI researchers, there is no corporate gatekeeping—anyone with a credit card can buy one.",
    url: "https://unitree.com",
    category: "Bipedal Humanoid",
    price: "From ~$16,000 USD",
  },
  {
    name: "1X Technologies (NEO)",
    description:
      "The safest, purpose-built 'true home' beta. NEO is a lightweight, padded humanoid designed from the ground up to safely interact with humans using soft robotics and gearless actuation. It yields physically if bumped.",
    url: "https://1x.tech",
    category: "Home Humanoid (Beta)",
    price: "TBD / Waitlist",
  },
  {
    name: "Stardust Intelligence (Astribot S1)",
    description:
      "A dexterous domestic assistant. By sacrificing bipedal walking for a wheeled base, the Astribot S1 delivers astonishing speed, precision, and human-level arm and hand dexterity for complex domestic chores.",
    url: "https://astribot.com",
    category: "Domestic Assistant",
    price: "Commercial Access",
  },
];

export default function BuyPage() {
  return (
    <div className="bg-[var(--color-brand-bg)] min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[var(--color-brand-text)] leading-tight mb-6">
            Buy a Home Robot
          </h1>
          <p className="text-xl text-[var(--color-brand-muted)] leading-relaxed max-w-3xl">
            While a true autonomous "Rosie the Robot" doesn&apos;t exist quite yet, the consumer market is cracking open. Here are the top three viable humanoid and advanced domestic robots you can reserve or buy right now.
          </p>
        </div>

        <div className="space-y-6">
          {manufacturers.map((m, i) => (
            <a
              key={m.name}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-sm p-8 hover:border-[var(--color-brand-accent)] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-black tracking-widest text-[var(--color-brand-surface)] bg-[var(--color-brand-text)] rounded-sm px-3 py-1">
                      #{i + 1}
                    </span>
                    <h2 className="text-2xl font-serif font-black text-[var(--color-brand-text)] group-hover:text-[var(--color-brand-accent)] transition-colors">
                      {m.name}
                    </h2>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">{m.category}</p>
                  <p className="text-[var(--color-brand-muted)] leading-relaxed">{m.description}</p>
                </div>
                
                <div className="md:text-right shrink-0 flex flex-row md:flex-col justify-between items-center md:items-end border-t border-[var(--color-brand-border)] md:border-none pt-4 md:pt-0 mt-4 md:mt-0">
                  <p className="text-sm font-bold text-[var(--color-brand-text)] tracking-wide">{m.price}</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 mt-0 md:mt-4 bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)] rounded-sm text-xs font-bold uppercase tracking-widest text-[var(--color-brand-text)] group-hover:text-[var(--color-brand-accent)] group-hover:border-[var(--color-brand-accent)] transition-all">
                    Visit site <span className="text-sm">→</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

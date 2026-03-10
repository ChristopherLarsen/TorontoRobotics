import Link from "next/link";

const humanoids = [
  {
    name: "1X NEO",
    slug: "1x-neo",
    badge: "Top Home Choice",
    description: "Explicitly marketed as a consumer-ready home robot with chores, voice interface, and self-charging capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Unitree R1",
    slug: "unitree-r1",
    badge: "Best Value",
    description: "Far cheaper than most humanoids, the R1 is one of the few you can actually preorder at a consumer-friendly price point.",
    imageUrl: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Unitree G1",
    slug: "unitree-g1",
    badge: "Prosumer Pick",
    description: "A developer/prosumer platform that stands out as one of the strongest general-purpose humanoids you can buy today.",
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Figure 03",
    slug: "figure-03",
    badge: "Most Anticipated",
    description: "High on promise for laundry, cleaning, and dishes, though general retail availability is still limited.",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Pepper",
    slug: "pepper",
    badge: "Social Pioneer",
    description: "The best-known social humanoid, offering a people-facing experience geared more toward interaction than physical chores.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
  }
];

export default function RobotCarousel() {
  return (
    <section className="mb-24 w-full">
      <div className="flex justify-between items-baseline mb-8 border-b-2 border-[var(--color-brand-border)] pb-4">
        <h2 className="text-2xl font-serif font-black tracking-tight text-[var(--color-brand-text)]">
          The Humanoid Frontier
        </h2>
      </div>
      
      {/* Carousel Container */}
      <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {humanoids.map((robot) => (
          <Link 
            key={robot.slug} 
            href={`/robots/${robot.slug}`}
            className="snap-start shrink-0 w-72 md:w-80 group flex flex-col h-full bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)] rounded-sm hover:border-[var(--color-brand-accent)] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-sm bg-gray-100 relative">
              <img 
                src={robot.imageUrl} 
                alt={robot.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[var(--color-brand-surface)]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-accent)] rounded-sm">
                {robot.badge}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-serif font-black text-[var(--color-brand-text)] leading-tight mb-3 group-hover:text-[var(--color-brand-accent)] transition-colors duration-300">
                {robot.name}
              </h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed flex-grow">
                {robot.description}
              </p>
              
              <div className="mt-6 pt-4 border-t border-[var(--color-brand-border)] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-text)]">Explore</span>
                <span className="text-[var(--color-brand-accent)] transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style dangerouslySetContent={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}

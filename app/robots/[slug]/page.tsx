import { notFound } from "next/navigation";
import type { Metadata } from "next";

const humanoids = {
  "1x-neo": {
    name: "1X NEO",
    badge: "Top Home Choice",
    description: "Explicitly marketed as a consumer-ready home robot with chores, voice interface, and self-charging capabilities.",
    longBody: "NEO is explicitly marketed as a home robot, with chores, voice interface, app control, self-charging, and a live order page. 1X says it is taking orders and describes NEO as a “consumer-ready humanoid robot” for the home, which makes it the clearest fit for a dedicated home assistant.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1920&auto=format&fit=crop",
  },
  "unitree-r1": {
    name: "Unitree R1",
    badge: "Best Value",
    description: "Far cheaper than most humanoids, the R1 is one of the few you can actually preorder at a consumer-friendly price point.",
    longBody: "The R1 is far cheaper than most humanoids, listed from $4,900 USD, and Unitree says shipments begin in April 2026. It is not as clearly a polished household helper as NEO, but it is one of the few humanoids you can actually preorder directly at a consumer-ish price.",
    imageUrl: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=1920&auto=format&fit=crop",
  },
  "unitree-g1": {
    name: "Unitree G1",
    badge: "Prosumer Pick",
    description: "A developer/prosumer platform that stands out as one of the strongest general-purpose humanoids you can buy today.",
    longBody: "The G1 is listed for direct sale by Unitree, starting around $13,500 USD on Unitree’s store. It looks more like a developer/prosumer platform than a plug-and-play home butler, but among humanoids you can actually buy, it is one of the strongest real options.",
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1920&auto=format&fit=crop",
  },
  "figure-03": {
    name: "Figure 03",
    badge: "Most Anticipated",
    description: "High on promise for laundry, cleaning, and dishes, though general retail availability is still limited.",
    longBody: "Figure markets Figure 03 as a home robot that can handle laundry, cleaning, and dishes, and says it is designed for the home. But we currently lack a public purchase or preorder page; third-party reporting says home deployments are still limited rather than generally available. So it ranks high on promise, lower on actual buyability.",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1920&auto=format&fit=crop",
  },
  "pepper": {
    name: "Pepper",
    badge: "Social Pioneer",
    description: "The best-known social humanoid, offering a people-facing experience geared more toward interaction than physical chores.",
    longBody: "Pepper is still relevant historically and is explicitly a people-facing humanoid, but SoftBank’s current official positioning is business-focused, not home-focused. So it acts as a broader “home/social humanoid” rather than a strict “household chore robot”.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1920&auto=format&fit=crop",
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const robot = humanoids[slug as keyof typeof humanoids];
  if (!robot) return { title: "Not Found" };
  return {
    title: `${robot.name} | Robot Overview`,
    description: robot.description,
  };
}

export default async function RobotPage({ params }: Props) {
  const { slug } = await params;
  const robot = humanoids[slug as keyof typeof humanoids];
  
  if (!robot) {
    notFound();
  }

  return (
    <div className="bg-[var(--color-brand-surface)] min-h-screen">
      <div className="w-full bg-[var(--color-brand-bg)] border-b border-[var(--color-brand-border)]">
        <div className="aspect-[21/9] w-full max-w-7xl mx-auto overflow-hidden bg-[var(--color-brand-bg)] relative">
          <img src={robot.imageUrl} alt={robot.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 md:p-16">
              <span className="inline-block px-3 py-1 bg-[var(--color-brand-accent)] text-white text-xs font-bold uppercase tracking-widest rounded-sm mb-4">
                {robot.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight">
                {robot.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        <div className="prose prose-lg md:prose-xl max-w-none text-[var(--color-brand-text)] font-serif leading-relaxed whitespace-pre-wrap">
          <p className="text-2xl lg:text-3xl font-serif font-normal text-[var(--color-brand-muted)] leading-relaxed mb-12 border-l-4 border-[var(--color-brand-accent)] pl-6">
            {robot.description}
          </p>
          <p>{robot.longBody}</p>
        </div>
      </div>
    </div>
  );
}

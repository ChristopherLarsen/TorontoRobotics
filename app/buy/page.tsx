import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy a Robot in Toronto",
  description: "How to buy a robot in Toronto — top manufacturers and where to get them in Canada.",
};

const manufacturers = [
  {
    name: "Boston Dynamics",
    description:
      "The world leader in advanced robotics. Spot and Stretch are available for business and research customers in Canada.",
    url: "https://bostondynamics.com",
    category: "Industrial / Research",
    price: "From ~$75,000 USD",
  },
  {
    name: "iRobot",
    description:
      "Home robots for everyday life. The Roomba lineup is widely available at Best Buy, Costco, and Amazon Canada.",
    url: "https://irobot.ca",
    category: "Home / Consumer",
    price: "From ~$300 CAD",
  },
  {
    name: "Unitree Robotics",
    description:
      "Affordable quadruped robots for research and developers. Ships to Canada direct. The Go2 is a popular entry-level research platform.",
    url: "https://unitree.com",
    category: "Research / Developer",
    price: "From ~$1,600 USD",
  },
];

export default function BuyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black mb-2">Buy a Robot in Toronto</h1>
      <p className="text-gray-500 mb-10">
        Whether you&apos;re a business, researcher, or just want a robot at home — here are
        the top three places to start.
      </p>

      <div className="space-y-8">
        {manufacturers.map((m, i) => (
          <a
            key={m.name}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-gray-200 rounded-xl p-6 hover:border-[var(--tr-red)] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-white bg-[var(--tr-red)] rounded px-2 py-0.5">
                    #{i + 1}
                  </span>
                  <h2 className="text-xl font-bold group-hover:text-[var(--tr-red)] transition-colors">
                    {m.name}
                  </h2>
                </div>
                <p className="text-sm text-[var(--tr-red)] font-medium mb-2">{m.category}</p>
                <p className="text-gray-600">{m.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold text-gray-700">{m.price}</p>
                <span className="text-xs text-[var(--tr-red)] mt-1 block">Visit site →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const verticals = [
  { vertical: "Research institutions", accounts: "University of Toronto, Vector Institute", year1: "Yes" },
  { vertical: "Automotive manufacturing", accounts: "Magna, Martinrea, Linamar", year1: "Pipeline only \u2014 Year 2" },
  { vertical: "Logistics / warehousing", accounts: "Amazon fulfillment, Loblaw distribution", year1: "Pipeline only \u2014 Year 2" },
  { vertical: "Healthcare", accounts: "Research hospitals, rehab tech programs", year1: "Possible Year 1 (research framing)" },
  { vertical: "Construction", accounts: "Large GC firms", year1: "Year 2+" },
];

const buyerTypes = [
  {
    title: "Year 1: Research-first buyers",
    detail:
      "The near-term pitch is platform access, Canadian invoicing, import handling, and technical onboarding for teams that actually want to work with the hardware.",
  },
  {
    title: "Later: Industrial buyers",
    detail:
      "The longer-term pitch is a clearer ROI story, deployment support, and eventually paid integration once we have references and operating proof.",
  },
];

const barriers = [
  {
    problem: "No local support",
    status: "Year 1 plan",
    solution:
      "The initial offer is depot repair and first-line remote support. Broader field service coverage would need to be built as the installed base grows.",
  },
  {
    problem: "Import / customs friction",
    status: "Near-term capability",
    solution:
      "We expect to handle import, customs coordination, and Canadian invoicing so the buyer is not purchasing directly from overseas.",
  },
  {
    problem: "No integration",
    status: "Paid engagement only",
    solution:
      "Custom workflows would be offered only on confirmed paid engagements. This is not a turnkey day-one capability.",
  },
  {
    problem: "No ROI visibility",
    status: "Available now",
    solution:
      "We can build an ROI model and show incentive scenarios, but only as informational guidance, not formal tax or grant advice.",
  },
  {
    problem: "No proof it works",
    status: "Still to be earned",
    solution:
      "The first real proof will come from reference deployments. Early customers may get sharper pricing in exchange for helping create that proof.",
  },
  {
    problem: "Regulatory uncertainty",
    status: "Planned",
    solution:
      "A workplace deployment playbook with legal and safety input is part of the roadmap, but it is not yet a finished operating asset.",
  },
  {
    problem: "China relationship risk",
    status: "Mitigable, not erasable",
    solution:
      "A Canadian supplier-of-record model plus network isolation can reduce risk, but security and procurement concerns will still need to be handled directly with customers.",
  },
];

const competitors = [
  {
    name: "RobotShop",
    gap: "Canadian web only \u2014 no enterprise sales, no local support",
  },
  { name: "RoboStore", gap: "US-focused, no Canadian operations" },
  { name: "US resellers", gap: "Customs friction, no local presence, no support" },
];

const incentives = [
  {
    name: "SR&ED Credit",
    detail:
      "35% refundable for CCPCs \u2014 on a ~$60K CAD unit, ~$21K potential recovery",
  },
  {
    name: "Accelerated CCA (Bill C-15, 2026)",
    detail: "100% first-year writeoff on manufacturing equipment",
  },
  {
    name: "NRC IRAP",
    detail: "Up to 80% of salary costs for qualifying R&D deployments",
  },
  {
    name: "AMIC (Ontario)",
    detail: "Up to 15% grant on capital equipment, up to $1.5M per project",
  },
  {
    name: "CIT Program (Ontario)",
    detail: "$50M fund, robotics explicitly named",
  },
];

export default function MarketPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!checkBusinessAuth()) {
      router.push("/");
      return;
    }
    setAuthed(true);
  }, [router]);

  if (!authed) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/business"
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors inline-flex items-center gap-1 mb-6"
      >
        &larr; Back to Our Business
      </Link>

      <h1 className="text-4xl font-black tracking-tight mb-8">
        Market &amp; Customers
      </h1>

      {/* The Opportunity */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          The Opportunity
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed">
          The global humanoid robotics market is growing quickly, but local
          demand still has to be proven account by account. Our thesis is that a
          Canadian buyer may prefer a local partner for import, onboarding, and
          first-line support if we execute well enough to make that value real.
        </p>
      </section>

      {/* Target Verticals */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Target Verticals
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Vertical
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Example Accounts
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Year 1 Realistic?
                </th>
              </tr>
            </thead>
            <tbody>
              {verticals.map((row) => (
                <tr
                  key={row.vertical}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.vertical}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.accounts}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.year1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Why Customers Buy */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Why Customers Buy
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed mb-4">
          The near-term case is not the same for every buyer. Research buyers
          are the most realistic first customers; industrial buyers become more
          credible once there are references, deployment proof, and a clearer
          support model.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {buyerTypes.map((buyer) => (
            <div
              key={buyer.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <h3 className="font-bold text-sm mb-2">{buyer.title}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {buyer.detail}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[var(--color-brand-text)] leading-relaxed mb-4">
          Incentives can strengthen the case, especially for qualifying
          research-heavy or R&amp;D-led projects, but they should support the
          decision rather than carry the whole argument.
        </p>
        <div className="space-y-3">
          {incentives.map((item) => (
            <div
              key={item.name}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
            >
              <span className="font-bold text-sm">{item.name}</span>
              <span className="text-sm text-[var(--color-brand-muted)] ml-2">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] italic mt-3 leading-relaxed">
          Incentive eligibility varies by customer type and project structure.
          TorontoRobots provides informational guidance only &mdash; customers
          should consult a qualified SR&amp;ED advisor.
        </p>
      </section>

      {/* Why Customers Aren't Buying Direct */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Why Some Customers May Not Buy Direct
        </h2>
        <p className="text-[var(--color-brand-muted)] text-sm mb-4">
          These are the barriers we believe matter most. Some are solvable in
          the near term; others require execution and proof.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {barriers.map((b, i) => (
            <div
              key={i}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
                Barrier {i + 1}
              </p>
              <p className="font-bold text-sm mb-1">{b.problem}</p>
              <p className="text-xs uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
                {b.status}
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {b.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitive Landscape */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Competitive Landscape
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4">
          Current read only: existing sellers appear stronger on product access
          than on local enterprise deployment and support, but that positioning
          needs ongoing validation as the market develops.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Competitor
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Gap
                </th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.gap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../components/PasswordModal";

const phases = [
  {
    phase: "Phase 1",
    title: "Authorized Reseller",
    description:
      "Secure written reseller terms, stand up import and onboarding workflows, and win the first reference customers.",
  },
  {
    phase: "Phase 2",
    title: "Regional Distributor",
    description:
      "Pursue broader territory, inventory control, and stronger channel rights if demand and supplier terms support it.",
  },
  {
    phase: "Phase 3",
    title: "Value-Added Reseller",
    description:
      "Add paid integration, deployment, and maintenance services once the installed base and support model are proven.",
  },
];

const economics = [
  {
    scenario: "Conservative",
    units: "5 units",
    revenue: "~$240\u2013260K",
    margin: "~$60\u201380K (~25\u201330%)",
  },
  {
    scenario: "Base",
    units: "10 units",
    revenue: "~$480\u2013520K",
    margin: "~$120\u2013160K (~25\u201330%)",
  },
  {
    scenario: "Upside",
    units: "25 units",
    revenue: "~$1.2\u20131.3M",
    margin: "~$300\u2013400K (~25\u201330%)",
  },
];

const currentState = [
  "Pre-revenue as of April 2026.",
  "Research institutions and early-adopter commercial buyers are the most realistic first customers.",
  "Unitree relationship and discount discussions are real, but key channel terms still need to be formalised in writing.",
  "Import workflow, support process, and deployment standards are being defined now rather than presented as fully mature operations.",
];

const navLinks = [
  {
    title: "Market & Customers",
    href: "/business/market",
    description: "Target verticals, competitive landscape, and the demand thesis we still need to validate.",
  },
  {
    title: "Economics",
    href: "/business/economics",
    description: "Illustrative economics for a higher-volume distributor case, including what 10 premium G1 sales per month would require.",
  },
  {
    title: "Financing & Funding",
    href: "/business/financing",
    description: "Candidate funding sources, timelines, and the assumptions behind the launch plan.",
  },
  {
    title: "Potential Investor Appeal",
    href: "/business/investors",
    description: "What could attract investors, what still blocks investability, and what evidence would change the picture.",
  },
  {
    title: "NVIDIA & Technology",
    href: "/business/nvidia",
    description: "G-1 platform assumptions, the NVIDIA stack, and the technology roadmap behind the plan.",
  },
  {
    title: "Partnerships & Distribution",
    href: "/business/partnerships",
    description: "Unitree deal terms, negotiation targets, and strategic partners.",
  },
  {
    title: "Use Case Blueprints",
    href: "/business/use-cases",
    description: "Candidate solution blueprints that would require customer pull and paid implementation.",
  },
  {
    title: "Maintenance & Recurring Revenue",
    href: "/business/maintenance",
    description: "Proposed repair model, security posture, and the longer-term services thesis.",
  },
];

const feasibilityLink = {
  title: "Use Case Feasibility",
  href: "/business/feasibility",
  description:
    "Tech gap analyses for specific applications \u2014 starting with autonomous bathroom cleaning.",
};

const concernsLink = {
  title: "Open Concerns",
  href: "/business/concerns",
  description: "17 unresolved items requiring founder action.",
};

export default function BusinessHub() {
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
      {/* Header */}
      <h1 className="text-4xl font-black tracking-tight mb-2">Our Business</h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        Internal strategy &mdash; authorised partners only.
      </p>

      {/* Company Snapshot */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Company Snapshot
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed">
          TorontoRobots is building a Toronto-based commercial robotics resale
          and support business, starting with Unitree hardware in Ontario.
          Current status: pre-revenue as of April 2026.
        </p>
      </section>

      {/* Current State */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Current State
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentState.map((item) => (
            <div
              key={item}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Opening */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          The Opening
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed">
          We believe there is an opening for a local Canadian partner who can
          simplify import, onboarding, and first-line support for buyers
          evaluating Unitree robots. That thesis still needs to be validated
          through signed channel terms and early customer demand.
        </p>
      </section>

      {/* Phase Roadmap */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Phase Roadmap
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((p) => (
            <div
              key={p.phase}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
                {p.phase}
              </p>
              <h3 className="font-bold text-base mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Unit Economics */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Illustrative Year 1 Scenarios
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Scenario
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Units
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Revenue (CAD)
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Gross Margin
                </th>
              </tr>
            </thead>
            <tbody>
              {economics.map((row) => (
                <tr
                  key={row.scenario}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.scenario}</td>
                  <td className="px-4 py-3">{row.units}</td>
                  <td className="px-4 py-3">{row.revenue}</td>
                  <td className="px-4 py-3">{row.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] mt-3 leading-relaxed">
          Directional only. Assumes roughly ~$50K CAD average sell price per
          unit and preliminary discount terms; excludes the full landed cost
          model, FX, brokerage, warranty burden, support time, and operating
          expenses.
        </p>
      </section>

      {/* Navigation Cards */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Explore
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-[var(--color-brand-surface)] border border-[var(--color-brand-accent)]/30 hover:border-[var(--color-brand-accent)] p-5 rounded-sm transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base">{link.title}</h3>
                <span className="text-[var(--color-brand-accent)] group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {link.description}
              </p>
            </Link>
          ))}
          <Link
            href={feasibilityLink.href}
            className="group sm:col-span-2 bg-[var(--color-brand-surface)] border border-teal-800/50 hover:border-teal-500 p-5 rounded-sm transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-teal-400">
                {feasibilityLink.title}
              </h3>
              <span className="text-teal-400 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </div>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              {feasibilityLink.description}
            </p>
          </Link>
          <Link
            href={concernsLink.href}
            className="group sm:col-span-2 bg-[var(--color-brand-surface)] border border-red-800/50 hover:border-red-600 p-5 rounded-sm transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-sm bg-red-900/40 text-red-400 text-xs font-bold">
                  17
                </span>
                <h3 className="font-bold text-base text-red-400">
                  {concernsLink.title}
                </h3>
              </div>
              <span className="text-red-400 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </div>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              {concernsLink.description}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const pricing = [
  { label: "G-1 EDU retail (base SKU)", value: "~$43,900 USD (~$60,500 CAD)" },
  { label: "TR cost (40% off)", value: "~$26,300 USD (~$36,300 CAD)" },
  { label: "Estimated sell price", value: "~$48,000\u2013$52,000 CAD" },
  { label: "Nominal gross profit", value: "~$12,000\u2013$16,000 CAD (~25\u201330% margin)" },
];

const negotiationTargets = [
  {
    term: "Territory",
    target: "Canada-wide exclusive arrangement",
    floor:
      "Ontario-focused rights with a written path to expand if sales targets are met",
  },
  {
    term: "Year 1 minimum",
    target: "5\u201310 units",
    floor: "Negotiate down from whatever they ask",
  },
  {
    term: "Margin",
    target: "20% on hardware",
    floor: "15% minimum if the rest of the economics and support obligations are workable",
  },
  {
    term: "Services",
    target: "Clear right to provide local integration and support services",
    floor: "Must not be blocked from offering paid services around the hardware",
  },
  {
    term: "Escalation path",
    target: "Defined milestones for deeper channel rights",
    floor: "Must be in writing",
  },
];

const leverage = [
  "A focused local sales effort in Ontario could give Unitree better enterprise coverage than a pure ecommerce relationship.",
  "A Canadian partner who handles import, onboarding, and first-line support may help reduce friction for serious buyers.",
  "Guidance on incentives and procurement may help qualified buyers get to a decision faster, even if formal advisory work sits with specialists.",
  "If TorontoRobots can win reference deployments and clear rights in writing, the relationship becomes materially more defensible.",
];

const competitors = [
  {
    name: "RobotShop",
    detail: "Canadian web presence, Net 30 to institutions, zero enterprise sales capability",
  },
  {
    name: "RoboStore",
    detail: "Positioned as North American partner \u2014 US-focused",
  },
  {
    name: "DronePlusRobotics, Top3DShop, Futurology",
    detail: "US resellers, no Canadian operations",
  },
];

const strategicPartners = [
  {
    name: "University of Toronto Robotics Institute",
    detail: "Priority research relationship target for early deployments and possible student talent pipeline.",
  },
  {
    name: "Vector Institute",
    detail: "Potential technical credibility and talent relationship if the software roadmap becomes real.",
  },
  {
    name: "Magna / Martinrea",
    detail: "Target enterprise accounts for eventual reference deployments, not current partners.",
  },
  {
    name: "NRC",
    detail: "Important institutional relationship for IRAP discussions and future program access.",
  },
];

export default function PartnershipsPage() {
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

      <h1 className="text-4xl font-black tracking-tight mb-2">
        Partnerships &amp; Distribution
      </h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        Unitree channel discussions, negotiation priorities, and the partner targets that could strengthen the business.
      </p>

      {/* Current Status */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Current Status
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed">
          Unitree has discussed a 40% discount structure, but the terms are not
          yet in writing. No exclusivity is in place, and the existing Canadian
          channel landscape still needs to be fully mapped. Formalising this
          relationship remains a top priority.
        </p>
      </section>

      {/* Pricing Model */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Illustrative Pricing Model
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4">
          Useful for negotiation framing only. These numbers are still
          provisional until discount terms, landed costs, and support burden are
          fully modeled.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  &nbsp;
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Per Unit
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.label}</td>
                  <td className="px-4 py-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] italic mt-3 leading-relaxed">
          Preliminary model. 40% discount is verbal, not yet in writing. Full
          landed cost model (freight, duties, FX, warranty) has not been built.
          Figures are directional only.
        </p>
      </section>

      {/* Negotiation Targets */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Negotiation Targets
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Term
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Ideal Ask
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Minimum Acceptable
                </th>
              </tr>
            </thead>
            <tbody>
              {negotiationTargets.map((row) => (
                <tr
                  key={row.term}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.term}</td>
                  <td className="px-4 py-3">{row.target}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.floor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Our Leverage */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Our Best Arguments
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4">
          These are negotiating arguments, not facts we should assume Unitree or
          the market will automatically grant us.
        </p>
        <ul className="space-y-3">
          {leverage.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[var(--color-brand-text)] leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)] shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Competitive Distributors */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Competitive Distributors
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4">
          Current read only. Formal rights, real support scope, and practical
          coverage in Canada still need validation.
        </p>
        <div className="space-y-3">
          {competitors.map((c) => (
            <div
              key={c.name}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
            >
              <span className="font-bold text-sm">{c.name}</span>
              <span className="text-sm text-[var(--color-brand-muted)] ml-2">
                &mdash; {c.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Target Strategic Partners */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Priority Relationship Targets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {strategicPartners.map((p) => (
            <div
              key={p.name}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <p className="font-bold text-sm mb-1">{p.name}</p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

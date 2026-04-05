"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const strengths = [
  {
    title: "Directionally credible market thesis",
    detail:
      "A local Canadian importer, reseller, onboarding partner, and first-line support layer for advanced robotics is a plausible opening if the founders can make the value tangible.",
  },
  {
    title: "Unusually self-aware internal strategy",
    detail:
      "The business materials are more honest than typical pre-seed plans about sequencing, supplier risk, research-first buyers, and the fact that current economics still need proof.",
  },
  {
    title: "Reasonable initial wedge",
    detail:
      "Starting with research institutions and early adopters is more credible than leading with Fortune 500-style industrial adoption claims.",
  },
  {
    title: "Potentially asymmetric upside",
    detail:
      "If the company secures terms, reference deployments, and real support credibility, it could grow from reseller revenue into a harder-to-displace service and deployment business.",
  },
];

const blockers = [
  {
    title: "No proof of demand",
    detail:
      "There is not yet visible evidence of signed pilots, deposits, LOIs, or a named pipeline with budget owners willing to buy through TorontoRobots instead of direct.",
  },
  {
    title: "Supplier dependency is still unresolved",
    detail:
      "The business depends heavily on Unitree pricing, availability, parts access, and channel rights. If those terms are not formalized in writing, investors will treat the model as fragile.",
  },
  {
    title: "Unit economics are still directional",
    detail:
      "Landed cost, service burden, warranty exposure, FX risk, carrying cost, and bad debt risk still need to be modeled in a decision-grade way.",
  },
  {
    title: "Sales cycles may be longer than the plan assumes",
    detail:
      "Research and enterprise robotics purchases can both move slowly, especially for a new product category with procurement, safety, and security review overhead.",
  },
  {
    title: "Operational readiness is still thin",
    detail:
      "An investor will look for logistics, support process, contracts, insurance, service ownership, and deployment discipline. Most of that appears to be planned rather than already operating.",
  },
  {
    title: "Security and procurement objections remain material",
    detail:
      "China-origin hardware, documented security issues, and enterprise procurement sensitivity can kill deals even if the technical mitigations are sound.",
  },
  {
    title: "Defensibility is still weak",
    detail:
      "Until TorontoRobots has exclusivity, strong local service depth, or reference deployments that create switching cost, it remains vulnerable to direct sales and competing channels.",
  },
];

const milestones = [
  "Written reseller or distributor agreement with Unitree",
  "At least three serious prospects with identified buyer, use case, and next step",
  "At least one signed LOI, pilot, or paid design engagement",
  "A rebuilt landed margin model with realistic support assumptions",
  "A defined support model with named owner and escalation path",
  "Insurance, contract, and compliance basics in place before live deployment",
];

const positiveSignals = [
  "A Canadian research institution willing to serve as a reference customer",
  "A demo unit already in-country and being shown to prospects",
  "Clear evidence buyers prefer a Canadian intermediary over direct overseas purchase",
  "Proof that support and security hardening can be sold as paid value rather than absorbed into thin hardware margin",
];

export default function InvestorsPage() {
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
        POTENTIAL Investor Appeal
      </h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        What a serious investor may find attractive, and what still blocks confidence today.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Why It Could Attract Interest
        </h2>
        <div className="space-y-3">
          {strengths.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-4 rounded-sm"
            >
              <p className="font-bold text-sm mb-1">{item.title}</p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          What Still Blocks Investability
        </h2>
        <div className="space-y-3">
          {blockers.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-4 rounded-sm"
            >
              <p className="font-bold text-sm mb-1">{item.title}</p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Evidence That Would Change The Picture
        </h2>
        <div className="space-y-3">
          {milestones.map((item) => (
            <div
              key={item}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
            >
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Strong Positive Signals
        </h2>
        <div className="space-y-3">
          {positiveSignals.map((item) => (
            <div
              key={item}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
            >
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

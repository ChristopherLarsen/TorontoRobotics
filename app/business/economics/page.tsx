"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const assumptions = [
  {
    label: "Product",
    value: "Top-end Unitree G1 EDU configuration",
  },
  {
    label: "Retail price",
    value: "$73,900 USD per unit",
  },
  {
    label: "FX assumption",
    value: "1.38 CAD / USD",
  },
  {
    label: "Illustrative Canadian sell price",
    value: "~$102,000 CAD per unit",
  },
  {
    label: "Illustrative distributor cost",
    value: "~$61,200 CAD per unit (assuming 40% discount)",
  },
  {
    label: "Important note",
    value:
      "Directional only. Excludes freight, brokerage, duties, warranty reserve, field support, financing cost, and operating expenses.",
  },
];

const snapshotRows = [
  {
    period: "Per unit",
    units: "1",
    revenue: "~$102,000",
    cogs: "~$61,200",
    grossProfit: "~$40,800",
  },
  {
    period: "Per month",
    units: "10",
    revenue: "~$1,020,000",
    cogs: "~$612,000",
    grossProfit: "~$408,000",
  },
  {
    period: "Per year",
    units: "120",
    revenue: "~$12,240,000",
    cogs: "~$7,344,000",
    grossProfit: "~$4,896,000",
  },
];

const implications = [
  {
    title: "This stops being a lightweight reseller",
    detail:
      "At 10 premium units per month, TorontoRobots is no longer a founder-led brokerage. It becomes a real distribution and service business with repeatable sales, operations, and support requirements.",
  },
  {
    title: "Working capital becomes a major issue",
    detail:
      "One month of unit cost alone is roughly $612K CAD before freight and spares. If the company carries inventory, it needs a meaningful line of credit or customer deposits. Even a partially pre-sold model still needs cash discipline.",
  },
  {
    title: "The installed base compounds quickly",
    detail:
      "At this pace the company would place roughly 120 high-end robots per year into the field. That means support burden, spare parts planning, warranty handling, and customer success all become core functions, not side tasks.",
  },
];

const teamShape = [
  "Founder / GM to run supplier relationship, pricing, and key accounts",
  "Technical sales or applications engineer to support demos, buyer qualification, and deployment scoping",
  "Operations and import coordinator to handle purchase orders, freight, customs, invoicing, and scheduling",
  "Depot repair technician or robotics service lead for diagnostics, parts, and returns",
  "Field deployment engineer as reference deployments expand beyond simple delivery and onboarding",
];

const requirements = [
  {
    title: "Sales engine",
    detail:
      "10 premium units per month likely requires a real pipeline, not sporadic wins. That implies named accounts, forecast discipline, procurement follow-up, and a tighter target segment than 'anyone interested in humanoids.'",
  },
  {
    title: "Support system",
    detail:
      "The company needs ticketing, documented escalation paths, spares inventory, a repair bench, and service scope defined in contracts. Otherwise each sale creates unmanaged liability.",
  },
  {
    title: "Finance discipline",
    detail:
      "A business moving more than $1M CAD of hardware per month needs credit control, deposit policies, FX management, and a plan for bad debt and delayed customer payment.",
  },
  {
    title: "Legal and insurance base",
    detail:
      "At this volume, product liability, deployment terms, customer disclaimers, and security posture can no longer sit in planning docs. They need to be part of normal operations.",
  },
];

const realityChecks = [
  "If the 40% Unitree discount is not secured in writing, this model is not dependable.",
  "If per-unit landed and support cost is materially higher than expected, gross profit compresses quickly.",
  "If sales are concentrated in one or two accounts, the business becomes vulnerable to procurement delays or one cancelled program.",
  "If support promises are made without staffing, the model can create revenue and operational failure at the same time.",
];

export default function EconomicsPage() {
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

      <h1 className="text-4xl font-black tracking-tight mb-2">Economics</h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        What the business would look like if TorontoRobots sold 10 top-tier G1 EDU units per month.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Core Assumptions
        </h2>
        <div className="space-y-3">
          {assumptions.map((item) => (
            <div
              key={item.label}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
            >
              <p className="font-bold text-sm mb-1">{item.label}</p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Revenue Snapshot
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Period
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Units
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Revenue (CAD)
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Hardware Cost
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Gross Profit
                </th>
              </tr>
            </thead>
            <tbody>
              {snapshotRows.map((row) => (
                <tr
                  key={row.period}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.period}</td>
                  <td className="px-4 py-3">{row.units}</td>
                  <td className="px-4 py-3">{row.revenue}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.cogs}
                  </td>
                  <td className="px-4 py-3">{row.grossProfit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] mt-3 leading-relaxed">
          Directional hardware economics only. This is not yet a landed gross margin model.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          What That Business Actually Is
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {implications.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Likely Team Shape
        </h2>
        <div className="space-y-3">
          {teamShape.map((item) => (
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

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Operating Requirements
        </h2>
        <div className="space-y-3">
          {requirements.map((item) => (
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

      <section>
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Reality Checks
        </h2>
        <div className="space-y-3">
          {realityChecks.map((item) => (
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

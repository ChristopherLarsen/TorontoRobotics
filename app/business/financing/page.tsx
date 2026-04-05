"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const fastPath = [
  { source: "CSBFP loan (via bank)", amount: "Up to ~$150,000", timeline: "4\u20136 weeks if approved" },
  {
    source: "Futurpreneur loan (if eligible)",
    amount: "Up to $75,000",
    timeline: "4\u20136 weeks if eligible and approved",
  },
  {
    source: "Ontario Starter Company Plus",
    amount: "Up to $5,000",
    timeline: "Program-dependent",
  },
  {
    source: "NRC IRAP (if technical project qualifies)",
    amount: "Project-dependent",
    timeline: "Typically months, not immediate launch cash",
  },
];

const fundingBuckets = [
  {
    title: "Near-term launch capital",
    detail:
      "Debt and founder-executable applications are the most realistic sources for getting moving in the next 30 to 90 days.",
  },
  {
    title: "Follow-on reimbursement",
    detail:
      "Programs like SR&ED can materially improve economics later, but they do not replace the need for working cash up front.",
  },
  {
    title: "Conditional upside",
    detail:
      "IRAP, OCI, and other larger programs become more credible once there is a defined technical scope, customer pull, or a co-investor.",
  },
];

const priorityPrograms = [
  {
    name: "CSBFP",
    detail:
      "Primary near-term debt path. Government-guaranteed loan through a bank, subject to lender approval and use-of-funds rules.",
  },
  {
    name: "NRC IRAP",
    detail:
      "Important follow-on program for real technical work. Worth building the relationship early, but not something to count as immediate launch cash.",
  },
  {
    name: "SR&ED + OITC",
    detail:
      "Potentially valuable tax-credit recovery on qualifying R&D labour. Best treated as later reimbursement, not upfront funding.",
  },
  {
    name: "Futurpreneur",
    detail:
      "Strong near-term supplement if a founder qualifies by age and the application is approved.",
  },
  {
    name: "OCI Ready 4 Market",
    detail:
      "Relevant later if the company has investor backing and a stronger commercialization case. Not a day-one assumption.",
  },
];

const ontarioPrograms = [
  {
    name: "Ontario Together Trade Fund",
    detail:
      "Large upside program, but only if the project clearly fits the tariff-impact criteria and program intent.",
  },
  {
    name: "AMIC",
    detail:
      "Future-stage program only. Not relevant to initial launch.",
  },
  {
    name: "Ontario Starter Company Plus",
    detail: "Small but useful if available locally. Treat as helpful support, not core financing.",
  },
];

const nextSteps = [
  "Start with bank conversations on CSBFP and confirm what debt is actually accessible in the next 30 to 90 days.",
  "Apply to Futurpreneur if a founder is eligible; treat it as additive, not guaranteed.",
  "Apply to Ontario Starter Company Plus if the local intake is open.",
  "Build the IRAP relationship early, but frame it around a real technical project rather than generic startup funding.",
  "Engage a SR&ED advisor before significant technical work begins so qualifying work is documented properly.",
  "Use DMZ and MaRS to strengthen the network and future financing path rather than assuming direct launch cash.",
];

export default function FinancingPage() {
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
        Financing &amp; Funding
      </h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        Target: assemble a realistic launch funding mix, starting with debt and founder-executable programs.
      </p>

      {/* The Stack Play */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Funding Strategy
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed mb-4">
          The practical approach is to separate what may be available soon from
          what is delayed, conditional, or reimbursement-based. The minimum
          launch plan should still work even if grants move slowly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {fundingBuckets.map((bucket) => (
            <div
              key={bucket.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <h3 className="font-bold text-sm mb-2">{bucket.title}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {bucket.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fast-Path Table */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Illustrative Launch Path
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4">
          This is a planning sketch, not committed cash. Timelines, amounts, and
          eligibility vary by lender, founder profile, and project scope.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Source
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Amount
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Timeline
                </th>
              </tr>
            </thead>
            <tbody>
              {fastPath.map((row) => (
                <tr
                  key={row.source}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.source}</td>
                  <td className="px-4 py-3">{row.amount}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.timeline}
                  </td>
                </tr>
              ))}
              <tr className="bg-[var(--color-brand-surface)] font-bold">
                <td className="px-4 py-3">Planning range</td>
                <td className="px-4 py-3">Varies</td>
                <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                  Depends on approval and program fit
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Priority Programs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Priority Programs
        </h2>
        <div className="space-y-3">
          {priorityPrograms.map((p, i) => (
            <div
              key={p.name}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-4 rounded-sm"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold bg-[var(--color-brand-accent)] text-white w-6 h-6 flex items-center justify-center rounded-full shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-sm">{p.name}</p>
                  <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mt-1">
                    {p.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ontario Programs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Ontario Programs
        </h2>
        <div className="space-y-3">
          {ontarioPrograms.map((p) => (
            <div
              key={p.name}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
            >
              <span className="font-bold text-sm">{p.name}</span>
              <span className="text-sm text-[var(--color-brand-muted)] ml-2">
                {p.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Next Steps
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-sm text-[var(--color-brand-text)]">
          {nextSteps.map((step, i) => (
            <li key={i} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

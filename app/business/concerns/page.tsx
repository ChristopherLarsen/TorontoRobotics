"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

interface Concern {
  number: number;
  title: string;
  summary: string;
  deliverables: string[];
}

const concerns: Concern[] = [
  {
    number: 1,
    title: "Demand is still hypothetical",
    summary:
      "The plan names attractive customers but has no confirmed pipeline. The market can be large while near-term willingness to buy is low.",
    deliverables: [
      "A named prospect list with stage, use case, budget owner, and next step",
      "At least one account with confirmed budget and an internal champion",
      "One specific use case where a buyer has agreed to a pilot within 90 days",
      "A realistic account of what would cause a prospect to say no even at an attractive price",
    ],
  },
  {
    number: 2,
    title: "Willingness to pay for a middleman is unproven",
    summary:
      "Seven barriers to buying direct have been identified, but it has not been proven that Canadian buyers will pay a premium to have them removed.",
    deliverables: [
      "Evidence that at least one customer segment feels the pain acutely enough to pay above direct Unitree pricing",
      "Customer interviews documenting which barriers are actually blocking purchase",
      "A price ceiling test \u2014 how much markup will target segments tolerate",
    ],
  },
  {
    number: 3,
    title: "Formal competitive position in Canada is unknown",
    summary:
      "The plan assumes a white space, but the formal rights held by RobotShop and other current Unitree partners in Canada have not been established.",
    deliverables: [
      "Confirmation of what channel agreements Unitree currently has in Canada",
      "An understanding of whether TorontoRobots would face channel conflict before exclusivity is in place",
      "An answer to why no one has built a durable Canadian enterprise Unitree channel already",
    ],
  },
  {
    number: 6,
    title: "True landed margin has not been modeled",
    summary:
      "The plan shows 33% gross margin on hardware, but the full cost stack is incomplete. Missing items include: freight and brokerage, duties and tariffs, FX exposure, demo inventory carrying cost, spare parts, field service travel, installation labour, insurance per unit, and financing cost of holding inventory.",
    deliverables: [
      "A landed margin model per unit under realistic support assumptions",
      "A stress test: margin impact if one in five units requires multiple field visits in year one",
      "A break-even analysis at different support burden levels",
    ],
  },
  {
    number: 7,
    title: "The support promise is operationally undefined",
    summary:
      "The plan repeatedly commits to owning local support, warranty, and field service. That commitment is the core sales differentiator \u2014 and the highest-risk operational item.",
    deliverables: [
      "Who actually does field support in year one (named, with role)",
      "What response time commitment will be made to customers, in writing",
      "What TorontoRobots can resolve versus what requires Unitree escalation",
      "How many service incidents per installed robot are assumed in the model",
      "What happens when support demand exceeds founder bandwidth",
    ],
  },
  {
    number: 8,
    title: "Funding plan mixes near-certain and speculative sources",
    summary:
      "The funding memo reads as if multiple programs are accessible and additive. In practice: CSBFP and Futurpreneur are debt; NRC IRAP and SR&ED require technical activity that does not yet exist; OCI Ready 4 Market requires a private co-investor; OTTF requires documented tariff impact.",
    deliverables: [
      "A funding timeline in three columns: cash available in 90 days / debt accessible this year / grants uncertain or delayed",
      "Total founder capital at risk before any reimbursement arrives",
      "A minimum viable launch plan executable on debt only if grants are delayed 12 months",
    ],
  },
  {
    number: 9,
    title: "Incentive eligibility claims need validation",
    summary:
      "The plan uses stacked incentives to present a significant effective cost reduction on a ~$60K EDU unit. If any claim is wrong for a customer archetype, trust is damaged immediately.",
    deliverables: [
      "Confirmation that SR&ED applies to hardware capital for CCPCs as stated (post-2025 rules)",
      "Identification of which incentives apply to large enterprises versus CCPCs",
      "Written claims TorontoRobots will make in sales materials, validated by a qualified SR&ED advisor or tax counsel",
      "A policy on how incentive discussion is framed \u2014 informational vs. advisory, with disclaimers",
    ],
  },
  {
    number: 10,
    title: "Regulatory and safety competence is claimed but not yet real",
    summary:
      "The plan says TorontoRobots will navigate MOL, WSIB, ESA, and union consultation processes. That playbook does not exist yet.",
    deliverables: [
      "A named legal or safety partner who will build and own the deployment compliance framework",
      "A first-pass deployment checklist covering Ontario ESA, WSIB, and MOL requirements",
      "An insurance policy in place before any live deployment",
      "A decision on what safety claims will be withheld from sales materials until compliance capability is real",
    ],
  },
  {
    number: 12,
    title: "Use case competitive analysis has not been completed",
    summary:
      "The proposed use cases (shelf audit, parts kitting, quality inspection, safety monitoring) have not been compared against simpler alternatives on cost and reliability.",
    deliverables: [
      "For each proposed use case: the incumbent solution, its price, its reliability, and the specific dimension on which a G-1 deployment wins",
      "A ranked list of use cases by probability of winning versus alternatives in year one",
      "An honest assessment of which use cases are 2025-ready on G-1 hardware versus requiring future improvements",
    ],
  },
  {
    number: 13,
    title: "Battery life and uptime assumptions have not been validated",
    summary:
      "G-1 EDU runtime is approximately two hours under ideal conditions. The ROI models assume shift-level productivity. That gap has not been closed.",
    deliverables: [
      "Real-world uptime estimate per use case, accounting for charging cycles and downtime",
      "Labour required per deployed robot for charging, supervision, recovery, and retraining",
      "Net effective productivity after those deductions, compared against the ROI model",
      "Confirmation of whether any proposed use case hits its ROI target under realistic uptime",
    ],
  },
  {
    number: 14,
    title: "Year-one sales volume may not match enterprise sales cycle reality",
    summary:
      "The plan targets 5\u201310 units in year one and one enterprise integration contract. Enterprise robotics sales cycles \u2014 especially new-category purchases \u2014 can run 9\u201318 months.",
    deliverables: [
      "An assumed sales cycle by segment (research, manufacturing, logistics)",
      "The number of qualified opportunities needed to close 5\u201310 units at realistic conversion rates",
      "A plan if year one produces signed pilots but not production purchase orders",
      "A clear split: how many units are expected from research versus enterprise",
    ],
  },
  {
    number: 16,
    title: "Geopolitical and procurement risk is underweighted",
    summary:
      "This business depends on importing advanced robotics hardware from China into Canadian enterprise environments. Some buyers may reject the vendor on origin-risk grounds alone.",
    deliverables: [
      "A segment-by-segment assessment of which customer categories will reject China-origin hardware (especially defence-adjacent, government-funded, or IP-sensitive automotive buyers)",
      "A cybersecurity and data architecture position: commitments regarding data flows, network isolation, and software update provenance",
      "A contingency scenario: what happens if tariffs or import restrictions change after inventory is ordered",
    ],
  },
  {
    number: 17,
    title: "Liability exposure is unresolved",
    summary:
      "A humanoid robot operating in a live industrial environment creates product liability, property damage, and workplace injury exposure. TorontoRobots is positioned as the Canadian face of these deployments.",
    deliverables: [
      "A list of required insurance policies (product liability, CGL, professional indemnity, E&O) with target coverage levels",
      "A template commercial contract with defined limits of liability before the first deployment",
      "A named person or advisor responsible for signing off that a deployment environment meets minimum safety criteria",
    ],
  },
  {
    number: 18,
    title: "Capital adequacy under realistic assumptions is unknown",
    summary:
      "$250K may not be sufficient once real support infrastructure, demo inventory, field operations, and enterprise sales are running simultaneously.",
    deliverables: [
      "A 12-month cash burn model under realistic staffing and support assumptions (not best-case)",
      "A runway analysis: how long the company survives if no enterprise sale closes for nine months",
      "A minimum viable launch version of the business that preserves maximum cash \u2014 identifying what gets cut or deferred until after first revenue",
    ],
  },
  {
    number: 22,
    title: "Research offer is undefined",
    summary:
      "The plan sequences research institutions as the Year 1 priority, but there is no defined research offer \u2014 no package, price, or value proposition built for how research buyers actually make decisions.",
    deliverables: [
      "A defined Year 1 research offer: what a research buyer receives, at what price, with what support terms",
      "A value proposition written for the research buyer archetype (lab director, procurement officer, PI)",
      "3\u20135 specific research applications that would be compelling to UofT Robotics, Vector Institute, or a research hospital",
      "Confirmation that NRC IRAP and Mitacs Accelerate are accessible to these institutions for G-1 research work",
    ],
  },
  {
    number: 23,
    title: "First contract terms are undefined",
    summary:
      "The differentiation story has been corrected to separate current vs. future capabilities, but no first contract template exists. Without defined terms, a buyer who asks \u201Cwhat exactly are you committing to?\u201D has no answer.",
    deliverables: [
      "A draft first customer contract or letter of intent: what is delivered, what support is provided, what is explicitly not covered, price, payment terms, liability limits",
      "No more than three claims TorontoRobots will make in the first sales conversation \u2014 all true today",
      "A list of claims withheld until the underlying capability is operational",
    ],
  },
  {
    number: 24,
    title: "Unreachable segments and insurance are unresolved",
    summary:
      "Even with a serious security deployment standard, two questions still need clear founder answers before the first deployment: which customer segments remain unreachable due to China-origin procurement rules, and what insurance package is required to operate responsibly.",
    deliverables: [
      "A tighter list of customer archetypes that remain unreachable regardless of security mitigation",
      "An insurance broker engaged to quote: product liability, cyber liability, CGL, and professional indemnity",
      "Legal review of liability limitation language in the deployment contract before any customer signs",
      "Confirmation from Unitree on patch status for the September 2025 BLE and telemetry vulnerabilities",
    ],
  },
];

const priorityHomework = [
  "Rebuild full financial model on correct EDU pricing with landed costs.",
  "Named prospect pipeline with stage, use case, budget owner.",
  "Written Unitree terms.",
  "Define the Year 1 research offer \u2014 package, price, support scope.",
  "Draft first customer contract scoped to current capabilities only.",
  "Insurance broker engaged \u2014 product liability, cyber, CGL, E&O.",
  "Funding timeline in three columns.",
  "Confirm which segments are unreachable due to China-origin procurement rules.",
];

export default function ConcernsPage() {
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
      {/* Back link */}
      <Link
        href="/business"
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] transition-colors mb-8 inline-block"
      >
        &larr; Back to Our Business
      </Link>

      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          Open Questions
        </h1>
        <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
          Founder checklist for turning the plan into an executable business
        </p>
        <div className="mt-4 border-l-4 border-red-600 pl-4 py-2">
          <p className="text-[var(--color-brand-text)] leading-relaxed">
            These are the highest-priority gaps between the current plan and
            what has been validated so far. They are the work required to turn
            the plan into a business we can confidently sell, support, and
            finance.
          </p>
        </div>
      </header>

      {/* Concern cards */}
      <div className="space-y-6 mb-14">
        {concerns.map((c) => (
          <article
            key={c.number}
            className="bg-[var(--color-brand-surface)] border border-red-800/40 rounded-sm overflow-hidden"
          >
            <div className="p-5">
              {/* Number badge + title */}
              <div className="flex items-start gap-4 mb-3">
                <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-sm bg-red-900/40 text-red-400 text-sm font-bold">
                  {c.number}
                </span>
                <h2 className="text-base font-bold text-[var(--color-brand-text)] leading-snug pt-0.5">
                  {c.title}
                </h2>
              </div>

              {/* Summary */}
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4 ml-12">
                {c.summary}
              </p>

              {/* Deliverables */}
              <div className="ml-12">
                <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">
                  What founders must produce
                </p>
                <ul className="space-y-1.5">
                  {c.deliverables.map((d, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--color-brand-text)] leading-relaxed flex items-start gap-2"
                    >
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Priority Homework */}
      <section className="border-2 border-[var(--color-brand-accent)] rounded-sm p-6 mb-10 bg-[var(--color-brand-surface)]">
        <h2 className="text-xl font-bold mb-1 text-[var(--color-brand-accent)]">
          Immediate Founder Work
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] mb-5">
          The minimum set of deliverables required before making bigger
          commercial commitments.
        </p>
        <ol className="space-y-3">
          {priorityHomework.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
              <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-sm bg-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)] text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-[var(--color-brand-text)]">{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

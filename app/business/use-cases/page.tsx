"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

type Feasibility = "Best Near-Term" | "Near-Term" | "Longer-Term";
type Complexity = "Low" | "Medium" | "High";

interface UseCase {
  title: string;
  industry: string;
  feasibility: Feasibility;
  problem: string;
  actions: string[];
  whyG1: string;
  roi: string;
  complexity: Complexity;
  exampleCustomers: string;
}

const useCases: UseCase[] = [
  {
    title: "Store Inventory Audit",
    industry: "Retail / Grocery",
    feasibility: "Best Near-Term",
    problem:
      "Manual shelf audits are slow, inconsistent, and done too infrequently. Out-of-stock items are discovered hours after the fact.",
    actions: [
      "Navigates store aisles autonomously on a scheduled route",
      "Scans shelf barcodes and QR codes using onboard cameras",
      "Detects out-of-stock, misplaced, and mispriced items via visual recognition",
      "Generates an inventory accuracy report delivered to the store management system",
    ],
    whyG1:
      "Walking, LiDAR navigation, and the EDU vision stack line up well here. No complex manipulation is required, which makes this one of the better near-term fits for current G-1 capabilities.",
    roi: "Reduced out-of-stocks, faster replenishment, elimination of manual audit labour",
    complexity: "Medium",
    exampleCustomers: "Loblaws, Sobeys, Canadian Tire",
  },
  {
    title: "Facility Security & Inspection Patrol",
    industry: "Commercial Real Estate / Manufacturing / Logistics",
    feasibility: "Best Near-Term",
    problem:
      "Overnight security patrols are expensive, inconsistent, and can\u2019t be everywhere at once. Equipment inspections miss anomalies between scheduled visits.",
    actions: [
      "Follows programmed patrol routes through the facility",
      "Captures continuous video and flags anomalies (people, open doors, unusual heat signatures)",
      "Performs visual equipment checks \u2014 gauges, indicator lights, fluid levels",
      "Alerts security personnel in real time via dashboard",
    ],
    whyG1:
      "Navigation, LiDAR mapping, and cameras are the core requirement. No manipulation is needed. Best suited to flat indoor environments, with multi-floor operation only where building systems and integrations allow.",
    roi: "Reduced overnight security headcount, faster anomaly detection, documented compliance record",
    complexity: "Low",
    exampleCustomers: "Brookfield Properties, distribution centres, manufacturing plants",
  },
  {
    title: "Hospitality Room Service & Corridor Delivery",
    industry: "Hotels / Hospitality",
    feasibility: "Near-Term",
    problem:
      "Labour shortages in hospitality have made routine deliveries (towels, amenities, food) slow and expensive. Guests wait.",
    actions: [
      "Accepts delivery tasks from front desk or room service system",
      "Navigates to guest room via elevator and corridors",
      "Carries items in a tray or compartment attached to its frame",
      "Notifies guest on arrival, hands off items",
    ],
    whyG1:
      "Navigation, elevator API integration (Unitree + elevator vendor SDK), carrying capacity (~10kg). Manipulation required is simple: holding a tray or compartment, not fine grasping.",
    roi: "Reduced labour cost per delivery, faster service times, novelty/brand differentiation",
    complexity: "Medium",
    exampleCustomers: "Marriott, Hilton, boutique urban hotels",
  },
  {
    title: "Coffee Shop & Quick Service Table Service",
    industry: "Food & Beverage / QSR",
    feasibility: "Near-Term",
    problem:
      "Front-of-house labour is the highest cost in QSR. Bussing tables, wiping surfaces, and running food from counter to table is repetitive and hard to staff.",
    actions: [
      "Navigates the floor and identifies tables that need clearing",
      "Carries food and drinks from counter to table using tray attachment",
      "Collects empty cups and plates from tables (structured pickup \u2014 items placed in designated zone)",
      "Wipes table surfaces with mounted cleaning attachment",
    ],
    whyG1:
      "Navigation is solid. The key constraint is manipulation \u2014 wiping and pickup work if the environment is structured (items placed in a specific zone). Fine grasping of arbitrary cups is still developing. Near-term means this works with some environmental design (tray zones, dedicated pickup spots).",
    roi: "Reduced front-of-house headcount, consistent table turnover time, reduced slip/trip incidents",
    complexity: "Medium",
    exampleCustomers: "Starbucks franchise operators, Tim Hortons, fast casual restaurants",
  },
  {
    title: "Grocery & Retail Shelf Restocking",
    industry: "Grocery / Retail",
    feasibility: "Near-Term",
    problem:
      "Restocking shelves during store hours requires staff on the floor constantly. After-hours restocking is a labour cost that compounds with turnover.",
    actions: [
      "Retrieves product cartons from the back room using a carry frame",
      "Navigates to the correct aisle and shelf location",
      "Places product in designated shelf slots (structured placement \u2014 known position)",
      "Reports completion back to inventory system",
    ],
    whyG1:
      "Navigation and carrying are the foundation here. Structured shelf placement may become feasible in tightly controlled environments, but this would still require careful workflow design and proof on the actual hardware.",
    roi: "Reduced after-hours labour, faster replenishment cycle, less out-of-stock time",
    complexity: "High",
    exampleCustomers: "Loblaws, Metro, Walmart Canada",
  },
  {
    title: "Hospital Supply & Medication Delivery",
    industry: "Healthcare",
    feasibility: "Near-Term",
    problem:
      "Nurses spend significant time on supply logistics \u2014 retrieving items from central stores, delivering to wards. That time comes directly from patient care.",
    actions: [
      "Accepts supply requests from nursing stations via the hospital CMMS",
      "Retrieves standard supply items from the central storeroom",
      "Navigates hospital corridors and elevators to the requesting ward",
      "Hands off to nursing staff \u2014 no autonomous administration of medications",
    ],
    whyG1:
      "Navigation + carrying. Hospital environments are controlled, indoor, and well-mapped. The robot never makes clinical decisions \u2014 it moves supplies.",
    roi: "Nursing hours redirected to patient care, reduced supply retrieval time, documented chain of custody",
    complexity: "High",
    exampleCustomers: "UHN (Toronto General), Sunnybrook, St. Michael\u2019s Hospital",
  },
  {
    title: "Manufacturing Quality Inspection Walk",
    industry: "Manufacturing / Automotive",
    feasibility: "Near-Term",
    problem:
      "Visual quality inspection on production lines is manual, fatiguing, and subjective. Defects get through. Inspectors miss things on repetitive shifts.",
    actions: [
      "Walks the production line on a scheduled or triggered route",
      "Uses onboard cameras and AI vision to inspect components against reference images",
      "Flags deviations, dimensional anomalies, or surface defects",
      "Logs inspection results with timestamps and images to the quality management system",
    ],
    whyG1:
      "Navigation and the EDU vision stack are the key fit. The robot does not need to touch the parts; it observes them. Any useful inspection model would still need to be trained and validated for the specific part and environment.",
    roi: "Reduced defect escape rate, inspector hours reallocated to complex decisions, documented QMS records",
    complexity: "Medium",
    exampleCustomers: "Magna, Martinrea, Linamar, Tier-1 automotive suppliers",
  },
  {
    title: "Warehouse Receiving & Sortation Assist",
    industry: "Logistics / Warehousing",
    feasibility: "Longer-Term",
    problem:
      "Inbound receiving and sortation is labour-intensive and prone to error. Misrouted items create downstream chaos.",
    actions: [
      "Scans inbound packages at the receiving dock",
      "Carries individual packages to the correct sortation zone",
      "Verifies placement and updates WMS",
    ],
    whyG1:
      "Navigation and carrying are promising. The constraint is package handling \u2014 arbitrary packages of varied sizes, weights, and surfaces push current Dex3 hand capability. This is more realistic for standardised packaging in controlled environments than for general receiving.",
    roi: "Reduced receiving headcount, lower sortation error rate",
    complexity: "High",
    exampleCustomers: "Amazon fulfillment, Loblaw distribution, DHL",
  },
];

const feasibilityStyles: Record<Feasibility, string> = {
  "Best Near-Term": "bg-green-100 text-green-800",
  "Near-Term": "bg-amber-100 text-amber-800",
  "Longer-Term": "bg-gray-100 text-gray-600",
};

const complexityDot: Record<Complexity, string> = {
  Low: "bg-green-500",
  Medium: "bg-amber-500",
  High: "bg-red-500",
};

const criteria = [
  {
    question: "Does G-1\u2019s current hardware actually support this?",
    answer:
      "Navigation and sensing are solid today. Fine manipulation of arbitrary objects is still developing. We only promise what the hardware can deliver.",
  },
  {
    question: "Is the environment controllable?",
    answer:
      "The robot performs best in structured, indoor, mapped environments. The more we can design the environment to work with the robot, the more reliable the outcome.",
  },
  {
    question: "Is the ROI measurable?",
    answer:
      "Labour replaced, errors reduced, throughput improved \u2014 the customer needs to be able to measure it. If there\u2019s no measurable outcome, there\u2019s no business case.",
  },
];

export default function UseCasesPage() {
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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href="/business"
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors inline-flex items-center gap-1 mb-6"
      >
        &larr; Back to Our Business
      </Link>

      {/* Page Header */}
      <h1 className="text-4xl font-black tracking-tight mb-2">
        Use Case Blueprints
      </h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        Our customers buy outcomes, not robots. These are candidate solution
        blueprints that still require customer-specific scoping, integration
        work, and proof.
      </p>

      {/* Integration Partner Callout */}
      <section className="mb-12">
        <div className="bg-[var(--color-brand-surface)] border-l-4 border-teal-500 border-r border-t border-b border-r-[var(--color-brand-border)] border-t-[var(--color-brand-border)] border-b-[var(--color-brand-border)] p-6 rounded-sm">
          <h2 className="text-lg font-bold mb-3">
            The Application Partner Model
          </h2>
          <p className="text-[var(--color-brand-text)] leading-relaxed mb-4">
            The G-1 is a platform. Building production-ready applications on it
            requires serious software expertise. One proposed delivery model is
            to work with a software partner such as{" "}
            <span className="font-bold text-[var(--color-brand-accent)]">
              Thoughtworks
            </span>{" "}
            &mdash; or a comparable consultancy &mdash; to help build and
            maintain the application layer for selected customer engagements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
                TorontoRobots would lead
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                Hardware procurement, deployment, customer success, government
                incentive navigation, and ongoing support.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
                A delivery partner could build
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                The application software, task policies, integrations with
                customer systems (WMS, POS, CMMS), and deployment tooling.
              </p>
            </div>
          </div>
          <p className="text-sm font-medium text-[var(--color-brand-text)]">
            The goal is to sell a scoped business result, not just a robot in a
            box.
          </p>
        </div>
      </section>

      {/* Use Case Cards */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-sm p-6 flex flex-col"
            >
              {/* Tags row */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]">
                  {uc.industry}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${feasibilityStyles[uc.feasibility]}`}
                >
                  {uc.feasibility}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-2">{uc.title}</h3>

              {/* Customer problem */}
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4">
                {uc.problem}
              </p>

              {/* What the robot does */}
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
                  What the robot does
                </p>
                <ul className="space-y-1.5">
                  {uc.actions.map((action, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--color-brand-text)] leading-relaxed flex gap-2"
                    >
                      <span className="text-[var(--color-brand-accent)] mt-0.5 shrink-0">
                        &bull;
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why G-1 works */}
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
                  Why G-1 works here
                </p>
                <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                  {uc.whyG1}
                </p>
              </div>

              {/* ROI angle */}
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
                  ROI angle
                </p>
                <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                  {uc.roi}
                </p>
              </div>

              {/* Footer: complexity + example customers */}
              <div className="mt-auto pt-4 border-t border-[var(--color-brand-border)] flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${complexityDot[uc.complexity]}`}
                  />
                  <span className="text-xs text-[var(--color-brand-muted)]">
                    Integration: {uc.complexity}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-brand-muted)]">
                  {uc.exampleCustomers}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes a Use Case Work */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-2 text-[var(--color-brand-accent)]">
          What Makes a Use Case Work
        </h2>
        <p className="text-[var(--color-brand-muted)] text-sm mb-6">
          The three questions we ask before committing to a customer
          opportunity:
        </p>
        <div className="space-y-4">
          {criteria.map((c, i) => (
            <div
              key={i}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <p className="font-bold text-sm mb-1">
                {i + 1}. {c.question}
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {c.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

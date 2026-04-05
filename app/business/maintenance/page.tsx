"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const securityRules = [
  {
    number: 1,
    title: "Network Isolation",
    description:
      "Deploy each G-1 on a dedicated VLAN with no outbound internet where the customer environment allows. The goal is to keep traffic limited to approved internal systems rather than open internet access.",
  },
  {
    number: 2,
    title: "Telemetry Blocked",
    description:
      "Block known Unitree cloud endpoints at the customer firewall. TorontoRobots can provide the blocklist, but effective enforcement depends on the customer network being configured to the agreed standard.",
  },
  {
    number: 3,
    title: "BLE Disabled",
    description:
      "Bluetooth disabled in all production deployments. Closes the documented wormable BLE exploit (September 2025). No wireless entry point other than managed WiFi on the isolated VLAN.",
  },
  {
    number: 4,
    title: "Firmware Under Our Control",
    description:
      "Disable Unitree auto-updates wherever possible. Updates should be reviewed, tested, and scheduled rather than pushed blindly into customer environments.",
  },
];

const repairSteps = [
  { step: "1", label: "Customer reports issue", detail: "Email or phone. The intended Year 1 model is remote triage first, so software issues can be resolved without moving the robot where possible." },
  { step: "2", label: "Hardware diagnosis", detail: "If physical repair is needed, the planned support flow is for the customer to ship the unit to a Toronto depot location." },
  { step: "3", label: "Repair & test", detail: "Diagnose the issue, source the needed parts, repair the unit, and run a functional test before shipping it back." },
  { step: "4", label: "Return & invoice", detail: "Return the robot and bill labour plus parts. Final pricing should be confirmed once typical repair time and parts usage are better understood." },
];

const partsInventory = [
  { component: "48V battery pack", failure: "Cycle degradation — most common consumable", lead: "3–4 weeks", stock: "2 units" },
  { component: "Dex3-1 hand assembly", failure: "Impact and actuator damage", lead: "4–6 weeks", stock: "2 units" },
  { component: "Depth camera module", failure: "Lens and impact damage", lead: "3–4 weeks", stock: "2 units" },
  { component: "3D LiDAR unit", failure: "Environmental and impact damage", lead: "4–6 weeks", stock: "1 unit" },
  { component: "Charging cable & connector", failure: "Daily wear", lead: "1–2 weeks", stock: "4 units" },
  { component: "Foot pad assemblies", failure: "Floor surface wear", lead: "2–3 weeks", stock: "4 sets" },
  { component: "MCU board", failure: "Electronic failure", lead: "6–8 weeks", stock: "1 spare" },
];

const pipelineSteps = [
  { step: "Train", description: "If policy work becomes part of a paid engagement, updated models would be trained on the agreed development infrastructure." },
  { step: "Validate", description: "Candidate updates would be tested in simulation or controlled internal environments before touching customer hardware." },
  { step: "Stage", description: "Where practical, updates would be staged on a TorontoRobots-controlled test unit first." },
  { step: "Push", description: "Only validated updates would be distributed to customer units, with release notes and rollback planning." },
];

export default function MaintenancePage() {
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
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors mb-6 inline-block"
      >
        &larr; Back to Our Business
      </Link>

      {/* Page header */}
      <h1 className="text-4xl font-black tracking-tight mb-2">
        Repairs, Security &amp; Software Updates
      </h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-2 italic">
        Intended Year 1 support model: depot-based repair, controlled security configuration, and no SLA contracts we cannot yet staff.
      </p>
      <p className="text-sm text-[var(--color-brand-muted)] mb-12">
        Annual maintenance contracts are a Year 2+ consideration once we have the installed base and staffing to back them up.
      </p>

      {/* Section 1 — Repair Process */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          How Repairs Work
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-6">
          This is the operating model we intend to use in Year 1. It is designed
          to be simple enough to execute without overpromising field support.
        </p>

        <div className="flex flex-col md:flex-row items-stretch gap-0 mb-6">
          {repairSteps.map((s, i) => (
            <div key={s.step} className="flex items-stretch md:flex-1">
              <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
                  Step {s.step}
                </p>
                <h3 className="font-bold text-sm mb-2">{s.label}</h3>
                <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                  {s.detail}
                </p>
              </div>
              {i < repairSteps.length - 1 && (
                <>
                  <div className="hidden md:flex items-center px-2 text-[var(--color-brand-accent)] text-lg">&rarr;</div>
                  <div className="flex md:hidden justify-center py-2 text-[var(--color-brand-accent)] text-lg">&darr;</div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* What we can fix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <h3 className="font-bold text-sm mb-3">What we fix in-depot</h3>
            <ul className="space-y-1.5 text-sm text-[var(--color-brand-muted)]">
              {[
                "Software issues and policy resets (remote — no depot needed)",
                "Battery replacement",
                "Dex3 hand repair or replacement",
                "Sensor replacement (cameras, LiDAR)",
                "Connector and cable repair",
                "Firmware recovery",
                "Physical damage (case by case)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[var(--color-brand-accent)] shrink-0 mt-0.5">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <h3 className="font-bold text-sm mb-3">What we escalate to Unitree</h3>
            <ul className="space-y-1.5 text-sm text-[var(--color-brand-muted)]">
              {[
                "Major structural damage beyond our capability",
                "MCU or core compute failure",
                "Warranty claims within the Unitree warranty period (Year 1)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[var(--color-brand-muted)] shrink-0 mt-0.5">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-[var(--color-brand-border)]">
              <p className="text-xs text-[var(--color-brand-muted)]">
                Turnaround target: <span className="font-semibold text-[var(--color-brand-text)]">5–7 business days</span> from receipt, assuming parts availability and issue complexity cooperate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Parts Inventory */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-2 text-[var(--color-brand-accent)]">
          Parts Inventory
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] mb-5">
          Lead times from Hangzhou run 3–8 weeks. These are initial stocking
          targets for the highest-failure components so repairs do not always
          wait on international shipping.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                {["Component", "Failure Mode", "Lead Time", "Stock Target"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {partsInventory.map((part) => (
                <tr key={part.component} className="border-b border-[var(--color-brand-border)] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{part.component}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">{part.failure}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">{part.lead}</td>
                  <td className="px-4 py-3 font-medium text-[var(--color-brand-accent)]">{part.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] mt-3">
          Parts sourced as part of the Unitree distribution agreement — distributor spare parts programme is a negotiating point.
        </p>
      </section>

      {/* Section 3 — Security */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Security Deployment Standard
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed mb-6">
          The intended standard is to deploy every G-1 with a fixed security
          configuration documented in customer agreements. It exists because of
          two confirmed vulnerabilities in the G-1 (September 2025 disclosure):
          a wormable BLE exploit with a hardcoded root key, and default sensor
          exfiltration to Chinese servers every 5 minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {securityRules.map((rule) => (
            <div
              key={rule.number}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] border-l-4 border-l-[var(--color-brand-muted)]/40 p-5 rounded-sm"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)]">
                  Rule {rule.number}
                </span>
                <h3 className="font-bold text-sm">{rule.title}</h3>
              </div>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-sm p-5">
          <p className="text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Proactive disclosure policy:</span> The G-1&rsquo;s security vulnerabilities are disclosed to every customer before purchase. A customer who discovers this independently after the fact loses trust. A customer we brief in advance sees us as the expert protecting them.
          </p>
        </div>
      </section>

      {/* Section 4 — Software Updates */}
      <section className="mb-14">
        <div className="border-l-4 border-l-[var(--color-brand-accent)] pl-6">
          <h2 className="text-xl font-bold mb-2 text-[var(--color-brand-accent)]">
            Software &amp; Policy Updates
          </h2>
          <p className="text-[var(--color-brand-text)] leading-relaxed mb-6">
            If policy and application updates become part of a paid engagement,
            they should be delivered over the network where the customer
            environment allows it, rather than requiring a depot visit for every
            software change. This is a future service model, not yet a routine
            operating line.
          </p>

          <div className="flex flex-col md:flex-row items-stretch gap-0 mb-6">
            {pipelineSteps.map((s, i) => (
              <div key={s.step} className="flex items-stretch md:flex-1">
                <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-4 rounded-sm flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
                    {s.step}
                  </p>
                  <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                    {s.description}
                  </p>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <>
                    <div className="hidden md:flex items-center px-2 text-[var(--color-brand-accent)] text-lg">&rarr;</div>
                    <div className="flex md:hidden justify-center py-2 text-[var(--color-brand-accent)] text-lg">&darr;</div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <h3 className="font-bold text-sm mb-2">Reusable deployment assets</h3>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              If repeated deployments generate useful data, tooling, and tested
              workflows, TorontoRobots could gradually build reusable internal
              assets around specific applications. That potential is part of the
              long-term thesis, not something we should claim as current
              advantage before multiple deployments exist.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — Year 2 note */}
      <section>
        <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-6 rounded-sm">
          <h2 className="font-bold text-base mb-2">Year 2 — When Contracts Make Sense</h2>
          <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
            Once we have 10+ units in the field and repair volume justifies it: hire a dedicated repair technician (~$65–80K CAD), publish a formal pricing schedule, and introduce optional annual service agreements with defined turnaround times. Annual contracts at ~$4,000–$7,500 CAD/unit/year become a real recurring revenue line — but only once we can staff the promise.
          </p>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const tasks = [
  {
    number: 1,
    name: "Navigate to bathroom",
    status: "Ready" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote: "No change — navigation is already solved. Isaac ROS handles mapping and path planning on the Jetson Orin NX today.",
    description:
      "Walk to the bathroom, enter through a standard doorway, orient to the space. G-1's navigation and LiDAR mapping handle this reliably on flat indoor surfaces.",
  },
  {
    number: 2,
    name: "Environmental assessment",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote: "GR00T vision + Cosmos-generated synthetic training data for bathroom environments. The 'bathroom state' model is trainable at scale without needing thousands of real annotated rooms.",
    description:
      "Scan the space to identify what needs attention: dirty surfaces, objects to move, consumables to check. Requires a trained \"bathroom state\" vision model \u2014 detectable with the EDU's camera stack, but the model must be built and trained for this environment.",
  },
  {
    number: 3,
    name: "Object relocation",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote: "GR00T N1.6 fine-tuned on bathroom object categories (soap dispensers, bottles, cups) with Isaac Lab sim training. Known geometry + fine-tuned policy = production-ready.",
    description:
      "Move soap dispensers, shampoo bottles, cups off counters to clear cleaning surfaces. Objects are known geometry in a structured environment. Dex3 hands can handle this for typical bathroom items with some environmental design (standardised product placement).",
  },
  {
    number: 4,
    name: "Surface spraying",
    status: "Near-Term" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote: "GR00T can be fine-tuned for trigger actuation policies on a standardised dispenser. Hardware variability across trigger types remains. Standardise the dispenser and this becomes Ready.",
    description:
      "Pick up a spray bottle, point it at a surface, and actuate the trigger. The grip on a spray bottle is feasible with Dex3 hands. Trigger actuation requires precise force control that is developing but not yet reliable across all trigger types. Standardising the cleaning product dispenser would remove this gap.",
  },
  {
    number: 5,
    name: "Wiping flat surfaces",
    status: "Near-Term" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote: "Isaac Lab trains consistent force-controlled wiping trajectories. GR00T improves pressure policy. Real-world reliability still requires hardware-level force sensing improvement in the Dex3 hands.",
    description:
      "Apply a cloth or pad to a flat surface and wipe with consistent pressure. Possible in structured environments with known surface geometry. Pressure consistency across the full stroke is the limiting factor \u2014 current manipulation control allows it in principle but reliability in production is unproven.",
  },
  {
    number: 6,
    name: "Mirror cleaning",
    status: "Not Ready" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote: "Cosmos generates synthetic glass-cleaning scenarios at scale. GR00T fine-tuned on this data closes the policy gap. The remaining constraint is Dex3 force sensing precision — a hardware iteration away, not an AI problem.",
    description:
      "Streak-free glass cleaning requires extremely precise and consistent pressure, a specific wiping motion, and the ability to assess the result. The assessment problem (is this streak-free?) is as hard as the manipulation problem. Not achievable with current hardware and perception.",
  },
  {
    number: 7,
    name: "Toilet bowl cleaning",
    status: "Not Ready" as const,
    nvidiaStatus: "Not Ready" as const,
    nvidiaNote: "NVIDIA stack cannot fix confined geometry, below-waterline force requirements, or chemical exposure to Dex3 materials. This is a hardware problem, not an AI problem. No model closes it.",
    description:
      "Insert a brush into the bowl, apply force against curved porcelain surfaces below the waterline, scrub with sufficient force to remove contamination, and verify removal. The geometry is confined, the forces required are high and variable, chemical exposure is significant, and the verification problem (is this clean?) is unsolved. This is the hardest sub-task in the sequence.",
  },
  {
    number: 8,
    name: "Floor mopping",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote: "GR00T locomotion policies + Isaac Lab-trained mopping trajectories. Vision-based wet floor detection (NVIDIA models) enables adaptive gait. This is one of the clearest NVIDIA upgrades on the list.",
    description:
      "With a mop or pad attachment designed for the robot's hands or foot, clean the floor surface. Straight-line and patterned mopping motions are achievable. The critical risk: wet floors create a fall hazard for the G-1. Operational protocols (mop in sections, dry before repositioning) can mitigate this but require careful engineering.",
  },
  {
    number: 9,
    name: "Consumable restocking",
    status: "Near-Term" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote: "NVIDIA vision models dramatically improve low-level detection accuracy. GR00T helps with purpose-designed dispenser refill. Physical manipulation of legacy holders (spring-loaded TP axle) remains the limiter regardless of AI quality.",
    description:
      "Check and replace toilet paper, paper towels, and soap. Detecting low levels is a vision task. Replacing a toilet paper roll (threading the holder) is extremely dexterous \u2014 not ready. Placing a pre-loaded roll on a purpose-designed holder is near-term. Refilling soap dispensers (pump bottles, not cartridge systems) is near-term.",
  },
  {
    number: 10,
    name: "Trash removal",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote: "GR00T fine-tuned on standardised bin grasping + liner replacement. Trained in Isaac Sim with known bin geometry. High confidence this is deployable today with environmental standardisation.",
    description:
      "Lift a bin liner from a standardised waste bin and replace it with a fresh liner. Feasible with Dex3 hands if the bin is standardised (same model, same placement, same liner type). Non-standardised bins are not ready.",
  },
  {
    number: 11,
    name: "Completion verification",
    status: "Not Ready" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote: "This is the single biggest NVIDIA unlock. Cosmos generates thousands of 'clean vs. dirty' surface examples across every bathroom surface type. A TensorRT-optimised cleanliness assessment model running on the Jetson becomes the robot's quality gate. Still requires real-world validation, but the training path is clear.",
    description:
      "Assess whether the bathroom is actually clean before leaving. This requires a trained model that can evaluate surface cleanliness, detect missed spots, and confirm consumables are stocked. No production-grade \"cleanliness assessment\" model exists for this application. This is arguably the deepest gap \u2014 without verification, the robot can complete tasks but cannot confirm a quality outcome.",
  },
];

const gaps = [
  {
    gap: "Cleanliness verification",
    why: "No production \"clean vs. dirty\" perception model. The robot cannot assess its own work.",
    required:
      "Train a multi-surface cleanliness assessment model on annotated image data. Likely requires 10,000+ labelled samples per surface type.",
    nvidiaImpact: "Cosmos generates synthetic 'clean vs. dirty' training data at scale — eliminates the 10,000+ manual annotation requirement. TensorRT-optimised model runs on Jetson Orin NX. This gap goes from fundamental to near-term.",
    severity: "fundamental" as const,
  },
  {
    gap: "Toilet bowl cleaning",
    why: "Confined geometry, high variable force, chemical exposure, below-waterline operation, no verification.",
    required:
      "Hardware improvement (force-torque sensors in hands), specialised cleaning tool attachment, and a purpose-built manipulation policy. 2\u20133 years.",
    nvidiaImpact: "No AI fix. The constraint is hardware geometry, force sensing, and chemical resistance — not model capability. Isaac Lab can train a policy for it, but there is no hardware to execute it on yet.",
    severity: "fundamental" as const,
  },
  {
    gap: "Mirror / glass cleaning",
    why: "Streak-free requires <1N pressure variance across the entire stroke. Current force control is not that precise.",
    required:
      "Improved force-torque sensing in end effectors. Near-term hardware iteration from Unitree or third-party hand upgrade.",
    nvidiaImpact: "Cosmos + Isaac Lab close the training gap entirely. GR00T fine-tuned on glass-cleaning trajectories is achievable. What remains is a Dex3 hardware iteration — expected in the next generation. NVIDIA moves this from fundamental to development.",
    severity: "fundamental" as const,
  },
  {
    gap: "Wet floor stability",
    why: "G-1 footpads on wet ceramic tile create fall risk. A fall in a customer bathroom is a safety and liability event.",
    required:
      "Non-slip foot attachment design, slower gait mode on wet surfaces, wet floor detection via floor contact sensing or vision. Engineering solvable.",
    nvidiaImpact: "NVIDIA vision models detect wet floor conditions in real-time. Isaac Lab trains adaptive gait policies for low-friction surfaces. This gap is largely solvable with the NVIDIA stack + non-slip foot hardware.",
    severity: "development" as const,
  },
  {
    gap: "Chemical compatibility",
    why: "Spray cleaners (bleach, acid-based descalers) will degrade Dex3 hand materials over time. The robot's hands are not rated for chemical exposure.",
    required:
      "Chemical-resistant glove attachment or purpose-built chemical-handling end effector. Materials engineering problem.",
    nvidiaImpact: "No AI impact. This is a materials science and mechanical engineering problem. NVIDIA cannot help here.",
    severity: "development" as const,
  },
  {
    gap: "Trigger actuation",
    why: "Spray bottle triggers vary widely in stiffness and travel. A standardised cleaning dispenser removes this gap entirely.",
    required:
      "Either standardise the cleaning dispensing system (wall-mounted pump, not handheld bottle) or train a trigger-specific grasping policy.",
    nvidiaImpact: "GR00T can be fine-tuned on a standardised dispenser's actuation profile with relatively little data. Isaac Sim can generate training scenarios for different trigger geometries. Combined with environmental standardisation, this is solved.",
    severity: "close" as const,
  },
  {
    gap: "Toilet paper replacement",
    why: "Threading a cardboard roll onto a spring-loaded holder is one of the most mechanically demanding fine motor tasks in the environment.",
    required:
      "Redesign the holder for robot access (horizontal slot instead of spring axle) or use pre-loaded cartridge dispensers. Environmental design solves this faster than hardware improvement.",
    nvidiaImpact: "GR00T + Isaac Lab can train a policy for a purpose-designed holder. Environmental redesign remains the fastest path — but once the holder is standardised, the NVIDIA stack makes the manipulation policy straightforward.",
    severity: "close" as const,
  },
];

const statusBadge = (status: "Ready" | "Near-Term" | "Not Ready", label?: string) => {
  const styles = {
    Ready: "bg-green-100 text-green-800 border border-green-200",
    "Near-Term": "bg-amber-100 text-amber-800 border border-amber-200",
    "Not Ready": "bg-red-100 text-red-800 border border-red-200",
  };
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[status]}`}
    >
      {label ? `${label}: ` : ""}{status}
    </span>
  );
};

const nvidiaBadge = (status: "Ready" | "Near-Term" | "Not Ready") => {
  const styles = {
    Ready: "bg-green-900/40 text-green-300 border border-green-700/50",
    "Near-Term": "bg-violet-900/40 text-violet-300 border border-violet-700/50",
    "Not Ready": "bg-red-900/40 text-red-300 border border-red-700/50",
  };
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const severityBorder = {
  fundamental: "border-l-red-400",
  development: "border-l-amber-400",
  close: "border-l-green-400",
};

export default function FeasibilityPage() {
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
      {/* Back link */}
      <Link
        href="/business"
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors mb-6 inline-block"
      >
        &larr; Back to Our Business
      </Link>

      {/* Page header */}
      <h1 className="text-3xl font-black tracking-tight mb-2">
        Use Case Feasibility &mdash; Autonomous Bathroom Cleaning
      </h1>
      <p className="text-lg text-[var(--color-brand-muted)] italic mb-3">
        A structured tech gap analysis: can a G-1 clean a bathroom today, and
        what would it take?
      </p>
      <p className="text-sm text-[var(--color-brand-muted)]/70 leading-relaxed mb-10">
        This is the first in a series of feasibility analyses. Each one breaks
        down a proposed use case against current G-1 hardware capabilities,
        identifies the specific gaps, and estimates the development path to
        commercial viability.
      </p>

      {/* Section 1 — Why This Use Case Matters */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Why This Use Case Matters
        </h2>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
          The commercial opportunity
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              Hospitality
            </p>
            <p className="text-sm text-[var(--color-brand-text)] leading-relaxed">
              Hotel room attendants: ~$18&ndash;22/hr, 45 min per room,
              properties clean 100s of rooms daily.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              Commercial
            </p>
            <p className="text-sm text-[var(--color-brand-text)] leading-relaxed">
              Commercial cleaning contracts: $40&ndash;80/hr for janitorial
              services in office buildings and healthcare.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              Healthcare
            </p>
            <p className="text-sm text-[var(--color-brand-text)] leading-relaxed">
              Hospital bathroom hygiene is a regulated requirement with
              documented audit trails.
            </p>
          </div>
        </div>
        <p className="text-[var(--color-brand-text)] leading-relaxed italic mb-2">
          If a G-1 can clean a bathroom reliably and autonomously, it unlocks one
          of the highest-frequency, highest-turnover labour categories in
          hospitality, healthcare, and commercial real estate. The task is
          unpleasant, expensive, and consistent &mdash; exactly the profile that
          justifies automation.
        </p>
        <p className="text-[var(--color-brand-text)] leading-relaxed italic">
          The question is not whether the market exists. It is whether the
          technology is ready.
        </p>
      </section>

      {/* Section 2 — Task Decomposition */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-1 text-[var(--color-brand-accent)]">
          What &ldquo;Clean a Bathroom&rdquo; Actually Means
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] italic mb-4">
          Broken into 11 discrete sub-tasks. Each one has different capability
          requirements.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-6 p-4 bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">G-1 Today</p>
            <div className="flex gap-2 flex-wrap">
              {statusBadge("Ready")}
              {statusBadge("Near-Term")}
              {statusBadge("Not Ready")}
            </div>
          </div>
          <div className="border-l border-[var(--color-brand-border)] pl-6">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">With Full NVIDIA Stack</p>
            <div className="flex gap-2 flex-wrap">
              {nvidiaBadge("Ready")}
              {nvidiaBadge("Near-Term")}
              {nvidiaBadge("Not Ready")}
            </div>
          </div>
          <div className="border-l border-[var(--color-brand-border)] pl-6 text-xs text-[var(--color-brand-muted)] leading-relaxed max-w-xs self-center">
            NVIDIA stack = GR00T N1.6 fine-tuning + Cosmos synthetic data + Isaac Lab sim training + TensorRT on Jetson Orin NX
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task.number}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              {/* Task header */}
              <div className="flex items-start gap-2 mb-3">
                <span className="text-xs font-bold text-[var(--color-brand-muted)] tabular-nums mt-0.5 shrink-0">
                  {String(task.number).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-sm leading-tight">{task.name}</h3>
              </div>

              {/* Status row */}
              <div className="flex flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[var(--color-brand-muted)]">Today:</span>
                  {statusBadge(task.status)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-violet-400 font-medium">NVIDIA:</span>
                  {nvidiaBadge(task.nvidiaStatus)}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-3">
                {task.description}
              </p>

              {/* NVIDIA note — only show if it changes anything or is interesting */}
              <div className="border-t border-violet-900/30 pt-3">
                <p className="text-xs text-violet-400/70 font-semibold uppercase tracking-widest mb-1">NVIDIA Impact</p>
                <p className="text-xs text-[var(--color-brand-muted)] leading-relaxed">
                  {task.nvidiaNote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Tech Gap Summary */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-accent)]">
          The Gaps &mdash; Ranked by Difficulty
        </h2>
        <div className="space-y-3">
          {gaps.map((g) => (
            <div
              key={g.gap}
              className={`border-l-4 ${severityBorder[g.severity]} bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)] mb-1">
                    Gap
                  </p>
                  <p className="font-bold text-sm">{g.gap}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)] mb-1">
                    Why It&rsquo;s Hard
                  </p>
                  <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                    {g.why}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)] mb-1">
                    What&rsquo;s Required
                  </p>
                  <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                    {g.required}
                  </p>
                </div>
                <div className="border-l border-violet-900/40 pl-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-1">
                    NVIDIA Impact
                  </p>
                  <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                    {g.nvidiaImpact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Environmental Design Principle */}
      <section className="mb-12">
        <div className="border-l-4 border-l-teal-400 bg-teal-950/20 border border-teal-800/30 p-6 rounded-sm">
          <h2 className="text-lg font-bold mb-3">
            The Robot Doesn&rsquo;t Have to Fit the Human Bathroom. The Bathroom
            Can Be Designed for the Robot.
          </h2>
          <div className="space-y-3 text-sm text-[var(--color-brand-text)] leading-relaxed italic">
            <p>
              Many of the gaps above are not hardware problems &mdash; they are
              environment problems. A spring-loaded toilet paper holder is hard
              for a robot. A slot-mount holder designed for robot access is not.
              A spray bottle trigger is hard. A wall-mounted pump dispenser
              actuated by pressing a flat surface is not. A non-standard bin is
              hard. A standardised bin with a known liner type is not.
            </p>
            <p>
              For new construction and major renovation projects &mdash; hotels
              under development, new healthcare facilities, commercial office
              builds &mdash; specifying a robot-compatible bathroom is an
              architectural decision, not a technology breakthrough.
              TorontoRobots&rsquo; role is to define the specification.
            </p>
            <p>
              This is the wedge: new-build hospitality and healthcare facilities
              can design for autonomous cleaning from day one. That market is
              accessible years before the technology can handle an existing,
              unmodified bathroom.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — Development Path */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-accent)]">
          What Gets Built and When
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phase 1 */}
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 1 &mdash; Year 1&ndash;2
            </p>
            <h3 className="font-bold text-base mb-3">
              Structured Environment, Partial Automation
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What&rsquo;s possible now
            </p>
            <ul className="text-sm text-[var(--color-brand-muted)] leading-relaxed space-y-1 mb-4 list-disc list-inside">
              <li>Counter wiping in a standardised layout</li>
              <li>Trash removal (standardised bins)</li>
              <li>
                Consumable status detection and reporting (the robot tells the
                human what needs restocking rather than doing it)
              </li>
              <li>Floor mopping with wet-floor protocols</li>
              <li>Object relocation off counters</li>
            </ul>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What this requires
            </p>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              One robot, one standardised bathroom environment, 3&ndash;6 months
              of policy development using Isaac Lab + GR00T fine-tuning. This is
              a real product that could be deployed in a hotel pilot.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 2 &mdash; Year 2&ndash;3
            </p>
            <h3 className="font-bold text-base mb-3">
              Robot-Compatible Facilities
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What&rsquo;s possible
            </p>
            <ul className="text-sm text-[var(--color-brand-muted)] leading-relaxed space-y-1 mb-4 list-disc list-inside">
              <li>All Phase 1 capabilities</li>
              <li>
                Toilet exterior cleaning (tank, seat, base) &mdash; not bowl
              </li>
              <li>
                Consumable replacement via purpose-designed dispensers
              </li>
              <li>
                Mirror cleaning (with improved force control from Unitree
                hardware iteration)
              </li>
              <li>Wet floor operation with non-slip attachments</li>
            </ul>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What this requires
            </p>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Unitree Dex3 hand force-torque improvement (expected in hardware
              iteration), custom cleaning tool attachments, cleanliness
              assessment model v1.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 3 &mdash; Year 3+
            </p>
            <h3 className="font-bold text-base mb-3">
              Full Autonomous Cleaning
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What requires fundamental advances
            </p>
            <ul className="text-sm text-[var(--color-brand-muted)] leading-relaxed space-y-1 mb-4 list-disc list-inside">
              <li>Toilet bowl cleaning with verification</li>
              <li>Streak-free glass</li>
              <li>Fully unstructured bathroom environments</li>
              <li>Complete quality verification before exit</li>
            </ul>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What this requires
            </p>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Production-grade cleanliness perception model, improved
              end-effector force sensing, chemical-resistant manipulation
              hardware. This is not a TorontoRobots development problem &mdash;
              it is a robotics industry problem that will be solved by Unitree
              and NVIDIA ecosystem advancement. Our role is to deploy it when it
              arrives.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 — Commercial Viability */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-accent)]">
          The Business Case &mdash; When Does This Pencil?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phase 1 */}
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 1
            </p>
            <h3 className="font-bold text-base mb-3">
              Partial Automation (Available Now with Development)
            </h3>
            <div className="space-y-3 text-sm text-[var(--color-brand-muted)] leading-relaxed">
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Target:
                </span>{" "}
                Hotels and healthcare facilities open to piloting structured
                partial automation.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Value:
                </span>{" "}
                Counter cleaning, floor mopping, trash removal, consumable
                reporting.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Labour replaced:
                </span>{" "}
                ~20&ndash;25 minutes of a 45-minute room clean.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  ROI framing:
                </span>{" "}
                Reduce room attendant time per room, redeploy to higher-value
                tasks (linen, beds).
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Price point:
                </span>{" "}
                Integration contract + hardware at full EDU pricing. First
                deployments as reference sites.
              </p>
              <p className="font-semibold text-[var(--color-brand-text)] pt-2 border-t border-[var(--color-brand-border)]">
                Verdict: Viable as a pilot product today. Not a mass-market
                solution.
              </p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 2
            </p>
            <h3 className="font-bold text-base mb-3">
              Robot-Compatible Facilities (Year 2&ndash;3)
            </h3>
            <div className="space-y-3 text-sm text-[var(--color-brand-muted)] leading-relaxed">
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Target:
                </span>{" "}
                New-build hospitality (hotel chains under development), new
                healthcare construction.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Value:
                </span>{" "}
                35&ndash;40 minutes of a 45-minute clean. Human oversight, not
                replacement.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Labour replaced:
                </span>{" "}
                1 robot per floor replacing ~0.5 FTE per shift.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  ROI framing:
                </span>{" "}
                At $20/hr labour and 3 shifts, one robot on one floor replaces
                ~$110K/year in labour cost. Hardware + maintenance at $60K +
                $7K/year is a clear payback.
              </p>
              <p className="font-semibold text-[var(--color-brand-text)] pt-2 border-t border-[var(--color-brand-border)]">
                Verdict: Strong commercial case in the right facilities.
              </p>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 3
            </p>
            <h3 className="font-bold text-base mb-3">
              Full Autonomous (Year 3+)
            </h3>
            <div className="space-y-3 text-sm text-[var(--color-brand-muted)] leading-relaxed">
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Target:
                </span>{" "}
                Entire hospitality, healthcare, commercial real estate sector.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Value:
                </span>{" "}
                Full bathroom cleaning at consistent quality, documented
                compliance record.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Labour replaced:
                </span>{" "}
                Near-complete for routine cleaning.
              </p>
              <p className="font-semibold text-[var(--color-brand-text)] pt-2 border-t border-[var(--color-brand-border)]">
                Verdict: Transformational market. Not the near-term business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — What TorontoRobots Does */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-accent)]">
          Our Role in Making This Happen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              1
            </p>
            <h3 className="font-bold text-base mb-2">
              Build the Phase 1 application
            </h3>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Develop the partial automation package (counter wipe, mop, trash,
              consumable check) using our NVIDIA stack (GR00T fine-tuning, Isaac
              Lab). First customer is a reference site. Thoughtworks partnership
              for the application layer.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              2
            </p>
            <h3 className="font-bold text-base mb-2">
              Define the robot-compatible bathroom specification
            </h3>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Work with architects and hotel developers to specify fixtures,
              dispensers, bin standards, and floor materials that enable Phase 2
              deployment. This is a professional services engagement, not just a
              hardware sale.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              3
            </p>
            <h3 className="font-bold text-base mb-2">
              Deploy when Phase 3 arrives
            </h3>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              We don&rsquo;t build the toilet bowl cleaning breakthrough
              &mdash; Unitree and NVIDIA do. When the hardware and models are
              ready, we have the customer relationships, the deployment
              experience, and the policy library to be first to market in
              Canada.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

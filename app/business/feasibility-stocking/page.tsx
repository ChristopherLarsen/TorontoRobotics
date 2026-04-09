"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const tasks = [
  {
    number: 1,
    name: "Navigate the aisle",
    status: "Ready" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "Isaac ROS Nav2 handles grocery-aisle navigation on the Jetson Orin NX today. Aisles are flat, well-lit, and mapped once.",
    description:
      "Walk down a supermarket aisle, avoid shoppers and carts, stop at the correct bay. LiDAR + cameras handle this reliably. Store-hours operation raises a human-safety bar but the navigation itself is solved.",
  },
  {
    number: 2,
    name: "Locate target SKU bay",
    status: "Ready" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "Planogram lookup + shelf-edge label OCR with a TensorRT-optimised text model on Jetson. Standard computer vision — high confidence.",
    description:
      "Read shelf-edge labels or match against a store planogram to find the exact bay where a given SKU belongs. OCR + planogram lookup is mature. Ready today.",
  },
  {
    number: 3,
    name: "Detect empty / low stock",
    status: "Ready" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "This is the shelf-audit use case — the clearest Year 1 NVIDIA win. Cosmos generates synthetic shelf states for every SKU. Vision-only, no manipulation.",
    description:
      "Visually assess how much product is on the shelf, how deep it goes, how many facings are empty. This is a vision task with no manipulation — the most mature capability on the entire list.",
  },
  {
    number: 4,
    name: "Retrieve case from pallet / cart",
    status: "Not Ready" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote:
      "GR00T + Isaac Lab can train a case-picking policy for known case geometry, but the G-1 payload envelope (~3 kg/arm, ~6 kg dual-arm) is below a typical 24-pack case of cans (8–10 kg). NVIDIA cannot fix payload — this is a hardware constraint.",
    description:
      "Lift a sealed case off a stocking cart or pallet and bring it to the shelf. A 24-count case of soup cans weighs 8–10 kg — above the G-1's reliable dual-arm payload. Chip cases are light enough but bulky. This is a hardware gap, not an AI gap.",
  },
  {
    number: 5,
    name: "Open cardboard case",
    status: "Not Ready" as const,
    nvidiaStatus: "Not Ready" as const,
    nvidiaNote:
      "No current foundation model reliably handles variable box-opening: perforated strips, taped seams, glue tabs, shrink-wrap. Each packaging format is a different policy. Cosmos can generate training data, but verification is the hard part — cut depth on a box cutter has zero tolerance for error.",
    description:
      "Cases arrive in many formats: perforated tear strips, tape-sealed flaps, glue-bonded tabs, shrink-wrapped trays. Opening them requires either a box cutter (a sharp tool swung near product and humans) or fingernail-level dexterity on tear strips. Dex3 hands cannot do either reliably. This is the single hardest sub-task.",
  },
  {
    number: 6,
    name: "Assess existing shelf contents",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "Depth cameras + a GR00T-trained scene model count and localise existing items on a shelf with high accuracy. Synthetic training data from Cosmos covers the long tail of partial occlusions and mixed-SKU states.",
    description:
      "Before placing new product, the robot has to know what's already on the shelf: how many units, where they sit, whether any are pushed to the back, whether the wrong SKU is there. Mixed-SKU detection is the hardest part. Achievable with the NVIDIA stack.",
  },
  {
    number: 7,
    name: "Pick-and-place rigid cans",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "Cylindrical rigid objects with a known grasp point are the sweet spot of GR00T N1.6. Fine-tuned on can geometry in Isaac Lab, this is among the most reliable manipulation tasks in the foundation-model literature.",
    description:
      "Grasp a single can, move it to the shelf, place it in the correct slot. Cylindrical rigid geometry is the easiest class of object for humanoid manipulation. Near-term with a fine-tuned policy.",
  },
  {
    number: 8,
    name: "Pick-and-place chip bags",
    status: "Not Ready" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote:
      "Deformable thin-film objects (chip bags, pillow bags) are an open research problem. GR00T does not yet have a strong deformable-object prior. Isaac Sim deformable simulation is improving but sim-to-real for chip bags is unproven. NVIDIA moves this forward but not to production.",
    description:
      "Chip bags are light, deformable, easily crushed, and have no rigid grasp point. The Dex3 hand can grip them, but placing them without crushing, and achieving a face-up orientation on shelf, is an unsolved deformable-manipulation problem.",
  },
  {
    number: 9,
    name: "Label-facing orientation",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "Vision-guided rotation to align a brand label forward is well within GR00T's capability once the grasp is stable. For cans, this is a solved problem with a fine-tuned policy. For bags, it depends on deformable manipulation.",
    description:
      "Cans and bags have to face forward with the brand label visible to the customer. For cans, this is a terminal rotation in the grasp pose — achievable. For bags, it compounds the deformable-manipulation gap.",
  },
  {
    number: 10,
    name: "Front-face / pull product forward",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "A sweeping motion to pull rear inventory forward is a straightforward locomanipulation trajectory. Isaac Lab trains this easily. High confidence near-term.",
    description:
      "Pull existing inventory from the back of the shelf forward to fill the facing. A simple sweeping motion with a known end-pose. Near-term for rigid goods, harder for chip bags.",
  },
  {
    number: 11,
    name: "Case breakdown and disposal",
    status: "Not Ready" as const,
    nvidiaStatus: "Near-Term" as const,
    nvidiaNote:
      "Flattening a cardboard box and carrying it to a compactor is a trainable motion sequence, but it compounds the payload and tool-handling gaps above. Low priority for NVIDIA effort in Year 1.",
    description:
      "After emptying a case, fold or flatten it and deposit it in a baler or recycling bin. Folding cardboard requires force and bimanual coordination beyond current reliability.",
  },
  {
    number: 12,
    name: "Stocking completion verification",
    status: "Near-Term" as const,
    nvidiaStatus: "Ready" as const,
    nvidiaNote:
      "'Is this bay fully faced and full?' is a direct computer-vision problem — the same model that handles empty-shelf detection handles completion verification. This is the NVIDIA stack's strongest contribution to the use case.",
    description:
      "Confirm the bay is fully stocked, correctly faced, and matches the planogram before moving on. This is a vision problem the robot can solve well — provided the earlier manipulation steps succeeded.",
  },
];

const gaps = [
  {
    gap: "Case payload",
    why: "A 24-pack case of canned goods weighs 8–10 kg. G-1 dual-arm reliable payload is ~6 kg. The robot physically cannot lift a typical case.",
    required:
      "Either (a) break cases at the back room so only lighter half-cases or loose product reach the aisle, or (b) wait for a higher-payload Unitree platform. Environmental workaround is faster.",
    nvidiaImpact:
      "No AI fix. Payload is a hardware constraint. NVIDIA cannot help.",
    severity: "fundamental" as const,
  },
  {
    gap: "Box opening (variable packaging)",
    why: "Perforated strips, tape-sealed flaps, glue tabs, and shrink wrap all need different strategies. Using a box cutter near product and humans is a safety problem on its own.",
    required:
      "Pre-open cases upstream (the back-room staging workflow) or standardise on a single robot-friendly case format with a tear pull. Environmental redesign solves it.",
    nvidiaImpact:
      "Cosmos can generate training scenarios, but cut-depth tolerance on a blade tool is zero — there is no safe training path to a box cutter policy. The fastest NVIDIA-era solution is a fine-tuned tear-strip policy on a standardised case.",
    severity: "fundamental" as const,
  },
  {
    gap: "Deformable object manipulation (chip bags)",
    why: "Thin-film deformable goods with no rigid grasp point are an open research problem. Crush, slip, and orientation are all unsolved.",
    required:
      "Better soft-object priors in foundation models, possibly specialised end-effectors (gentle suction cup or gripper pad). 2–3 years.",
    nvidiaImpact:
      "GR00T and Isaac Sim deformable physics are improving but sim-to-real is not there yet. Moves from fundamental toward development over 2–3 years.",
    severity: "fundamental" as const,
  },
  {
    gap: "Mixed-SKU shelf state",
    why: "Shelves often have a stray wrong-SKU, faced-backwards, or knocked-over unit. The robot must detect and decide what to do with it.",
    required:
      "A shelf-state perception model trained on messy real-world shelves, not just clean planogram states.",
    nvidiaImpact:
      "Cosmos generates the messy training data at scale. This is a near-term NVIDIA win — the perception layer is where the stack is strongest.",
    severity: "development" as const,
  },
  {
    gap: "Store-hours human safety",
    why: "A humanoid operating near shoppers — especially children — is a liability event waiting to happen. Current G-1 safety certification does not cover public-facing retail.",
    required:
      "Off-hours restocking (night shift) as the Year 1 operating window. Full safety certification is a multi-year regulatory path.",
    nvidiaImpact:
      "NVIDIA vision models improve pedestrian detection and reaction time, but certification is a regulatory problem, not an AI problem.",
    severity: "development" as const,
  },
  {
    gap: "Shelf geometry variation",
    why: "Shelf heights, depths, and lip profiles vary between stores and between categories. The robot must adapt its placement strategy to each.",
    required:
      "Per-store calibration pass + a parametric placement policy. Engineering solvable.",
    nvidiaImpact:
      "GR00T fine-tuned per chain + Isaac Lab sim training across shelf variants. Solvable.",
    severity: "close" as const,
  },
  {
    gap: "Case format standardisation",
    why: "If grocers agree to pre-opened cases or robot-friendly packaging, several fundamental gaps collapse at once.",
    required:
      "Procurement specification work with grocery chains and CPG suppliers. Non-technical.",
    nvidiaImpact:
      "No AI component — this is a supply-chain specification decision. Once standardised, the NVIDIA stack handles the remaining manipulation easily.",
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

export default function FeasibilityStockingPage() {
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
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors mb-6 inline-block"
      >
        &larr; Back to Our Business
      </Link>

      <h1 className="text-3xl font-black tracking-tight mb-2">
        Use Case Feasibility &mdash; Supermarket Shelf Restocking
      </h1>
      <p className="text-lg text-[var(--color-brand-muted)] italic mb-3">
        Can a G-1 open a case of soup and stock a supermarket shelf? A structured
        tech gap analysis against current hardware.
      </p>
      <p className="text-sm text-[var(--color-brand-muted)]/70 leading-relaxed mb-10">
        Second in our feasibility series. The task: receive a sealed cardboard
        case of canned goods or chip bags, open it, and place the product on a
        shelf that already contains an unknown quantity of pre-existing stock —
        correctly faced, correctly oriented, correctly fronted.
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
              Grocery
            </p>
            <p className="text-sm text-[var(--color-brand-text)] leading-relaxed">
              Canadian grocery chains (Loblaw, Sobeys, Metro) run thousands of
              stores. Night-shift stockers cost $18&ndash;24/hr and turnover is
              brutal.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              Convenience &amp; Club
            </p>
            <p className="text-sm text-[var(--color-brand-text)] leading-relaxed">
              Costco, 7-Eleven, pharmacy chains &mdash; same restocking burden,
              fewer SKUs, more repetition. Better fit for early automation.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              CPG / DSD
            </p>
            <p className="text-sm text-[var(--color-brand-text)] leading-relaxed">
              Direct-store-delivery vendors (Frito-Lay, Coca-Cola) employ
              dedicated merchandisers per chain. Automating their work is a
              direct B2B contract.
            </p>
          </div>
        </div>
        <p className="text-[var(--color-brand-text)] leading-relaxed italic mb-2">
          Restocking is a dull, physical, high-turnover job. If a G-1 can do even
          a fraction of a night-shift stocker's workload, it unlocks one of the
          largest repeat-task labour categories in retail.
        </p>
        <p className="text-[var(--color-brand-text)] leading-relaxed italic">
          The question, again, is not market &mdash; it is readiness.
        </p>
      </section>

      {/* Section 2 — Task Decomposition */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-1 text-[var(--color-brand-accent)]">
          What &ldquo;Restock a Shelf&rdquo; Actually Means
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] italic mb-4">
          Broken into 12 discrete sub-tasks. Each one has different capability
          requirements.
        </p>

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
              <div className="flex items-start gap-2 mb-3">
                <span className="text-xs font-bold text-[var(--color-brand-muted)] tabular-nums mt-0.5 shrink-0">
                  {String(task.number).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-sm leading-tight">{task.name}</h3>
              </div>

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

              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-3">
                {task.description}
              </p>

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

      {/* Section 3 — Gaps */}
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

      {/* Section 4 — Environmental Design */}
      <section className="mb-12">
        <div className="border-l-4 border-l-teal-400 bg-teal-950/20 border border-teal-800/30 p-6 rounded-sm">
          <h2 className="text-lg font-bold mb-3">
            The Robot Doesn&rsquo;t Stock the Grocery Store You Have. It Stocks
            the One You Stage for It.
          </h2>
          <div className="space-y-3 text-sm text-[var(--color-brand-text)] leading-relaxed italic">
            <p>
              A sealed 24-pack of soup cans on a pallet is hard. A plastic tote
              of loose cans, pre-opened and weighed for the robot in the back
              room, is easy. A randomly-tossed chip bag bin is hard. A tray of
              chip bags in labelled orientation is easy. Nearly every
              &ldquo;Not Ready&rdquo; gap on this page is a back-room staging
              problem, not an AI problem.
            </p>
            <p>
              This is the wedge. The Year 1 deployment is not a robot that walks
              to a pallet with a box cutter. It is a robot that walks to a
              pre-staged cart of loose product, picks rigid items, and places
              them on known shelves during off-hours. Humans open the cases. The
              robot does the repetitive motion.
            </p>
            <p>
              TorontoRobots&rsquo; role is to design the staging workflow
              alongside the retail partner. That is a professional services
              engagement on top of the hardware sale.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — Honest Year 1 Answer */}
      <section className="mb-12">
        <div className="border-l-4 border-l-amber-400 bg-amber-950/20 border border-amber-800/30 p-6 rounded-sm">
          <h2 className="text-lg font-bold mb-3">
            The Honest Year 1 Answer: Shelf Audit, Not Shelf Stocking
          </h2>
          <div className="space-y-3 text-sm text-[var(--color-brand-text)] leading-relaxed">
            <p>
              Restocking is a manipulation-heavy task. The G-1 has a ~2-hour
              battery that drains faster under sustained motor load, a ~6&nbsp;kg
              dual-arm payload ceiling, and Dex3 hands that cannot reliably open
              variable cardboard packaging. Committing to full autonomous
              restocking in Year 1 is not viable.
            </p>
            <p>
              The Year 1 product for grocery is the{" "}
              <span className="font-semibold">shelf audit</span>: the robot walks
              the aisles overnight, detects out-of-stock, low-stock, misfaced,
              and mispriced conditions, and generates a work list for the human
              night crew. Zero manipulation. All of the perception gains, none of
              the payload or packaging problems.
            </p>
            <p>
              Shelf stocking itself becomes viable in Phase 2 (Year 2&ndash;3)
              with (a) pre-staged loose product, (b) rigid-only SKUs like cans
              and boxes, and (c) a NVIDIA-fine-tuned placement policy. Chip bags
              and full case-open wait for Phase 3.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 — Development Path */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-accent)]">
          What Gets Built and When
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 1 &mdash; Year 1
            </p>
            <h3 className="font-bold text-base mb-3">
              Shelf Audit (Vision-Only)
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What&rsquo;s possible now
            </p>
            <ul className="text-sm text-[var(--color-brand-muted)] leading-relaxed space-y-1 mb-4 list-disc list-inside">
              <li>Autonomous aisle walk on a schedule</li>
              <li>Out-of-stock / low-stock detection</li>
              <li>Planogram compliance check</li>
              <li>Price tag audit</li>
              <li>Work-list generation for human crew</li>
            </ul>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What this requires
            </p>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              One robot per store, store map, chain-specific planogram data, and
              3&ndash;6 months of perception fine-tuning. This is the deployable
              Year 1 product.
            </p>
          </div>

          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 2 &mdash; Year 2&ndash;3
            </p>
            <h3 className="font-bold text-base mb-3">
              Rigid-Only Staged Restocking
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What&rsquo;s possible
            </p>
            <ul className="text-sm text-[var(--color-brand-muted)] leading-relaxed space-y-1 mb-4 list-disc list-inside">
              <li>All Phase 1 capabilities</li>
              <li>
                Place rigid SKUs (cans, boxed goods) from a pre-staged cart
              </li>
              <li>Label-forward orientation for cans</li>
              <li>Front-facing / pulling rigid product forward</li>
              <li>Completion verification of the placed work</li>
            </ul>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What this requires
            </p>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Back-room staging workflow, GR00T fine-tuned on chain-specific SKU
              set, completed chain pilot. No hardware change required.
            </p>
          </div>

          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 3 &mdash; Year 3+
            </p>
            <h3 className="font-bold text-base mb-3">
              Full Autonomous Restock
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What requires fundamental advances
            </p>
            <ul className="text-sm text-[var(--color-brand-muted)] leading-relaxed space-y-1 mb-4 list-disc list-inside">
              <li>Case lifting (needs higher-payload platform)</li>
              <li>Variable packaging opening</li>
              <li>Deformable bags and soft goods</li>
              <li>In-hours public-facing operation</li>
            </ul>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
              What this requires
            </p>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Next-generation Unitree hardware (higher payload, better force
              sensing), mature deformable-manipulation foundation models, and
              retail safety certification. Not a TorontoRobots development
              problem &mdash; we deploy it when it arrives.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7 — Commercial Viability */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 text-[var(--color-brand-accent)]">
          The Business Case &mdash; When Does This Pencil?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 1
            </p>
            <h3 className="font-bold text-base mb-3">
              Shelf Audit (Deployable Now)
            </h3>
            <div className="space-y-3 text-sm text-[var(--color-brand-muted)] leading-relaxed">
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Target:
                </span>{" "}
                Canadian grocery or pharmacy chain willing to pilot one robot in
                one store.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Value:
                </span>{" "}
                Replaces 1&ndash;2 hours/day of a human auditor walking the
                store with a clipboard or RF gun.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  ROI framing:
                </span>{" "}
                Fewer out-of-stock events = direct sales recovery. Typical
                out-of-stock loss is 4&ndash;8% of sales &mdash; a 1% recovery
                pays for the robot.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Price point:
                </span>{" "}
                Hardware + integration + ongoing perception service. First
                deployment as a reference site.
              </p>
              <p className="font-semibold text-[var(--color-brand-text)] pt-2 border-t border-[var(--color-brand-border)]">
                Verdict: Viable today. Our Year 1 grocery product.
              </p>
            </div>
          </div>

          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
              Phase 2
            </p>
            <h3 className="font-bold text-base mb-3">
              Staged Restocking (Year 2&ndash;3)
            </h3>
            <div className="space-y-3 text-sm text-[var(--color-brand-muted)] leading-relaxed">
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Target:
                </span>{" "}
                Chains with a strong overnight restock operation and willingness
                to change the back-room workflow.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Value:
                </span>{" "}
                Replaces ~40&ndash;60% of a night-shift stocker&rsquo;s rigid-SKU
                placement work. Humans still handle case-opening and soft goods.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  ROI framing:
                </span>{" "}
                Night-shift labour at ~$22/hr &times; 8 hours &times; 350 nights
                ~= $62K/year per shift replaced. Hardware + service at $60K +
                $7K/year is single-year payback.
              </p>
              <p className="font-semibold text-[var(--color-brand-text)] pt-2 border-t border-[var(--color-brand-border)]">
                Verdict: Strong case once staging workflow is designed.
              </p>
            </div>
          </div>

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
                Grocery, pharmacy, convenience, and club stores across Canada.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Value:
                </span>{" "}
                End-to-end case-to-shelf automation including soft goods and
                in-hours operation.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-brand-text)]">
                  Labour replaced:
                </span>{" "}
                Near-complete for overnight restock operations.
              </p>
              <p className="font-semibold text-[var(--color-brand-text)] pt-2 border-t border-[var(--color-brand-border)]">
                Verdict: Transformational market. Not the near-term business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 — What TorontoRobots Does */}
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
              Ship the Phase 1 shelf-audit product
            </h3>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Package the vision-only audit as a deployable Year 1 offering.
              First customer is a Canadian grocery or pharmacy chain pilot.
              TorontoRobots owns the perception tuning on the NVIDIA stack.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              2
            </p>
            <h3 className="font-bold text-base mb-2">
              Design the staging workflow for Phase 2
            </h3>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Work with a chain&rsquo;s ops team to redesign the back-room
              process so sealed cases become robot-ready totes. Professional
              services engagement alongside hardware.
            </p>
          </div>
          <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-2">
              3
            </p>
            <h3 className="font-bold text-base mb-2">
              Deploy Phase 3 when hardware arrives
            </h3>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
              Higher-payload platforms, deformable manipulation, retail
              certification &mdash; Unitree and NVIDIA solve those. Our job is to
              be first-to-market in Canada when they land, with the customer
              relationships already in place.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

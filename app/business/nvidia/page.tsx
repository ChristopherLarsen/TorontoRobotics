"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const specs = [
  { spec: "Height / Weight", detail: "127 cm / 35 kg" },
  { spec: "Degrees of Freedom", detail: "43 DOF" },
  { spec: "Walking Speed", detail: "2,000 mm/s (~4.5 mph)" },
  { spec: "Battery", detail: "48V lithium, ~2 hours runtime" },
  { spec: "Sensing", detail: "3D LiDAR, depth cameras, 8-core CPU" },
  { spec: "AI (EDU)", detail: "NVIDIA Jetson Orin NX \u2014 100 TOPS" },
  { spec: "Price range", detail: "$13,500\u2013$73,900 USD (G-1 EDU starts around $43,900 USD)" },
  { spec: "Delivery", detail: "4\u20138 weeks from order" },
];

const roadmapStages = [
  {
    title: "Validate the stack on our own hardware",
    detail:
      "Complete one full workflow from simulation or teleoperation through deployment on a G-1 EDU before promising policy-driven applications externally.",
  },
  {
    title: "Prove one narrow use case",
    detail:
      "Start with a constrained task where the business value and technical scope are both clear enough to survive first contact with reality.",
  },
  {
    title: "Build reusable assets from real work",
    detail:
      "Only once paid projects exist should repeated deployment patterns, datasets, and task policies start to become a durable internal asset base.",
  },
];

const nvidiaStack = [
  {
    name: "Isaac ROS",
    description:
      "Production-grade robotics middleware for Jetson-based robots. A likely foundation for future perception and autonomy work.",
  },
  {
    name: "Isaac Sim / Isaac Lab",
    description:
      "Physics-accurate simulation and training tools. The intended development environment once the hardware workflow is proven.",
  },
  {
    name: "GR00T Foundation Model",
    description:
      "NVIDIA\u2019s humanoid robot foundation model. Potentially useful for narrow task fine-tuning, but only after we complete an end-to-end internal validation cycle.",
  },
  {
    name: "Cosmos World Models",
    description:
      "World-model tooling for synthetic data and sim-to-real work. More relevant after the core training and deployment loop is working.",
  },
];

const aiStrategy = [
  "Validate one end-to-end fine-tuning and deployment cycle on our own G-1 EDU hardware",
  "Use Isaac Sim and Isaac Lab for internal testing once the basic hardware workflow is reliable",
  "Keep inference on-robot where practical rather than relying on fragile cloud dependencies",
  "Build reusable task-policy assets only after paid deployments create real data and repeatable needs",
];

const partnerPrograms = [
  {
    name: "NVIDIA Inception",
    description:
      "Relevant near-term startup program with technical resources and ecosystem access. Worth evaluating early.",
  },
  {
    name: "NVIDIA Partner Network (NPN)",
    description:
      "More relevant after real deployments and clearer integration capability exist.",
  },
  {
    name: "NVentures",
    description:
      "A long-term strategic possibility, not part of the current operating plan.",
  },
];

export default function NvidiaPage() {
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
        NVIDIA &amp; Technology
      </h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        The G-1 EDU platform assumptions and the NVIDIA roadmap behind the longer-term software thesis.
      </p>

      {/* G-1 Hardware Specs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          G-1 Hardware Specs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Spec
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((row) => (
                <tr
                  key={row.spec}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.spec}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* NVIDIA Stack */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          NVIDIA Stack
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mb-4">
          This is the candidate stack we expect to build on. The opportunity is
          real, but the workflow still needs to be proven end to end on our own
          hardware before it becomes a commercial claim.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nvidiaStack.map((item) => (
            <div
              key={item.name}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <h3 className="font-bold text-sm mb-2">{item.name}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our AI Strategy */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Technology Roadmap
        </h2>
        <ul className="space-y-3">
          {aiStrategy.map((item, i) => (
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

      {/* Roadmap Stages */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Execution Gates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roadmapStages.map((stage) => (
            <div
              key={stage.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <h3 className="font-bold text-sm mb-2">{stage.title}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NVIDIA Partnership Programs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          NVIDIA Partnership Programs
        </h2>
        <div className="space-y-3">
          {partnerPrograms.map((p) => (
            <div
              key={p.name}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-4 rounded-sm"
            >
              <p className="font-bold text-sm">{p.name}</p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed mt-1">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why This Matters Commercially */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Why This Matters Commercially
        </h2>
        <p className="text-[var(--color-brand-text)] leading-relaxed">
          The hardware gets us in the door. If TorontoRobots can prove it can
          deploy and maintain useful task-specific policies, software and
          services could become the higher-margin layer above hardware. That is
          a capability to build, not a current advantage.
        </p>
      </section>
    </div>
  );
}

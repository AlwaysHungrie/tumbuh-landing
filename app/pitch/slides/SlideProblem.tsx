import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props { notesVisible: boolean }

const problems = [
  {
    icon: "⏱️",
    title: "Automation without intelligence",
    desc: "IoT runs on fixed thresholds and timers. No memory. No context. No adaptation. When conditions change, the device doesn't.",
  },
  {
    icon: "🏝️",
    title: "Nodes that can't cooperate",
    desc: "Every sensor is an island. No plant can learn from its neighbour, share state, or coordinate a response at network scale.",
  },
  {
    icon: "💳",
    title: "Zero economic agency",
    desc: "A plant running dry cannot request a service, call in a refill, or hire help. It can only alert — and wait for a human.",
  },
];

export default function SlideProblem({ notesVisible }: Props) {
  return (
    <SlideShell
      notesVisible={notesVisible}
      notes={`The core insight: "smart" IoT removes the human's hands but not the human's decision. Tumbuh removes the decision too — within hard safety limits. If challenged on market size: agriculture IoT is a $10B+ market, but the real opportunity is autonomous agent wallets at the physical edge. The plant is the proof-of-concept. The primitive is the product.`}
    >
      <span className="absolute right-20 bottom-20 text-[120px] opacity-[0.06] pointer-events-none select-none leading-none">
        ☠️
      </span>

      <Caption>The Problem</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[860px]">
        The $10B agriculture IoT market built smarter timers.<br />
        <span className="text-[#2d6a4f] font-black">Not smarter agents.</span>
      </h1>

      <Divider />

      <div className="grid grid-cols-3 gap-6 mt-7">
        {problems.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-[rgba(45,106,79,0.12)] rounded-2xl p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
          >
            <div className="text-[36px] mb-4">{icon}</div>
            <p className="text-[20px] font-semibold text-[#0d1b12] leading-[1.3]">{title}</p>
            <p className="text-[16px] text-[rgba(13,27,18,0.65)] mt-2.5 leading-[1.55]">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 px-6 py-4 rounded-xl bg-[rgba(45,106,79,0.06)] border-l-[3px] border-[#52b788]">
        <p className="text-[18px] text-[#0d1b12] leading-[1.5]">
          Every "smart" device built so far is a faster version of a human caretaker.{" "}
          <strong>None of them replace the human's judgment — or remove their dependency on it.</strong>
        </p>
      </div>
    </SlideShell>
  );
}

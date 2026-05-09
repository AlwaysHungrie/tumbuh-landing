import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props { notesVisible: boolean }

const layers = [
  {
    n: 1,
    title: "Physical Layer — Sensors + Actuators",
    desc: "Moisture, light, temperature, humidity. Continuous ground-truth from the plant itself. Actuation on command.",
  },
  {
    n: 2,
    title: "Intelligence Layer — On-Device AI Agent",
    desc: "Reasons over sensor history, memory, and peer context. Detects anomalies. Adapts thresholds. Decides what action the situation warrants.",
  },
  {
    n: 3,
    title: "Economic Layer — Policy-Gated Wallet",
    desc: "Hard daily spend caps. Allow-listed counterparties. Tiered approvals for larger actions. Every transaction is auditable on-chain. Autonomy is always bounded.",
  },
  {
    n: 4,
    title: "Coordination Layer — Signed Plant-to-Plant Protocol",
    desc: "Cryptographically signed peer messages. Plants share environmental context, request validation from neighbours, and coordinate responses across the network.",
  },
];

export default function SlideSolution({ notesVisible }: Props) {
  return (
    <SlideShell
      notesVisible={notesVisible}
      notes={`The key phrase is "bounded autonomy." Pre-empt the fear before it's raised. Every spend is capped. Every counterparty is allow-listed. A plant cannot take an action outside its policy envelope. Emphasise: each layer is independently valuable, but all four together create something genuinely new — a physical node that can perceive, decide, pay, and coordinate.`}
    >
      <span className="absolute -right-10 -top-10 text-[280px] opacity-[0.04] pointer-events-none select-none leading-none">
        🌱
      </span>

      <Caption>The Solution</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[820px]">
        One physical node. Four compounding layers.<br />
        <span className="text-[#2d6a4f] font-black">Bounded autonomy by design.</span>
      </h1>

      <Divider />

      <div className="flex flex-col gap-3 mt-6">
        {layers.map(({ n, title, desc }) => (
          <div
            key={n}
            className="flex items-start gap-5 px-6 py-4 rounded-xl border-l-[3px] border-[#52b788] bg-[#edf4ee]"
          >
            <span className="text-[26px] font-black text-[#2d6a4f] min-w-[32px] leading-none mt-1">
              {n}
            </span>
            <div>
              <p className="text-[19px] font-semibold text-[#0d1b12] leading-[1.3]">{title}</p>
              <p className="text-[15px] text-[rgba(13,27,18,0.65)] mt-1 leading-normal">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

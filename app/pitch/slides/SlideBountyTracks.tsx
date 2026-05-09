import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props { notesVisible: boolean }

const streams = [
  {
    icon: "💧",
    title: "Service Fees",
    desc: "Plants pay Builders per transaction — water delivery, nutrients, compute, data. Tumbuh earns a protocol fee on every plant-initiated payment.",
  },
  {
    icon: "🌐",
    title: "Network Subscriptions",
    desc: "Wardens pay a monthly fee per plant for intelligence infrastructure — agent hosting, policy management, telemetry storage, peer coordination.",
  },
  {
    icon: "🏦",
    title: "Carbon & ESG Outcomes",
    desc: "Patrons fund plant cohorts and receive verifiable on-chain environmental data for carbon credits and ESG reporting. High-margin institutional revenue.",
  },
  {
    icon: "📊",
    title: "Data Marketplace",
    desc: "Aggregated, anonymised sensor data sold to agri-research, climate modellers, and insurance underwriters. Compounding value as the network grows.",
  },
];

export default function SlideBountyTracks({ notesVisible }: Props) {
  return (
    <SlideShell
      bg="alt"
      notesVisible={notesVisible}
      notes={`Lead with the protocol fee — it's the cleanest VC story. Every plant-initiated transaction generates revenue without Tumbuh being in the critical path of care. Subscription gives predictable ARR. Carbon is the long-term institutional play — mention it as a horizon. Data marketplace is optionality, not the core pitch.`}
    >
      <span className="absolute -right-10 -top-10 text-[280px] opacity-[0.04] pointer-events-none select-none leading-none">
        💰
      </span>

      <Caption>Business Model</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[820px]">
        Revenue grows with every plant<br />
        <span className="text-[#2d6a4f] font-black">added to the network.</span>
      </h1>

      <Divider />

      <div className="grid grid-cols-2 gap-5 mt-8">
        {streams.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="border border-[rgba(45,106,79,0.18)] rounded-[14px] px-7 py-6 bg-white flex gap-4 items-start"
          >
            <div className="text-[32px] shrink-0">{icon}</div>
            <div>
              <div className="text-[19px] font-bold text-[#0d1b12]">{title}</div>
              <div className="text-[15px] text-[rgba(13,27,18,0.65)] mt-1.5 leading-normal">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 px-6 py-4 rounded-xl bg-[#edf4ee] border-l-[3px] border-[#52b788]">
        <p className="text-[17px] text-[#0d1b12] leading-normal">
          <strong>TAM:</strong> Global precision agriculture market — <strong>$12.9B by 2027</strong>, growing at 12% CAGR.
          Tumbuh operates at the intersection of AgTech, DePIN, and autonomous AI agents — three expanding categories.
        </p>
      </div>
    </SlideShell>
  );
}

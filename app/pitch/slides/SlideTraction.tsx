import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props {
  notesVisible: boolean;
}

const metrics = [
  {
    value: "1",
    label: "Plant Online",
    sub: "Funded wallets. Active sensors. Real telemetry.",
  },
  {
    value: "1",
    label: "Room",
    sub: "One plant in my room is an economic agent.",
  },
  {
    value: "✓",
    label: "On-Chain TXs",
    sub: "Plant wallets have signed and broadcast real Solana transactions.",
  },
  {
    value: "2",
    label: "Sensor/Actuator",
    sub: "A soil moisture sensor and a water pump are used by my plant.",
  },
];

export default function SlideTraction({ notesVisible }: Props) {
  return (
    <SlideShell
      notesVisible={notesVisible}
      notes={`Don't apologise for being early. Genesis means: we shipped, it works, it's live. The strongest line: "The plant in my flat in Mumbai paid for a watering service last week — here's the transaction hash." Show the explorer. Let the chain speak. Four nodes across three cities is not a mock-up — it's a distributed network.`}
    >
      <span className="absolute right-20 bottom-20 text-[120px] opacity-[0.06] pointer-events-none select-none leading-none">
        📈
      </span>

      <Caption>MVP</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[760px]">
        First prototype is
        <br />
        <span className="text-[#2d6a4f] font-black">on-chain, right now.</span>
      </h1>

      <Divider />

      <div className="grid grid-cols-4 gap-6 mt-8">
        {metrics.map(({ value, label, sub }) => (
          <div
            key={label}
            className="text-center bg-white border border-[rgba(45,106,79,0.12)] rounded-2xl p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
          >
            <div className="text-[60px] font-black text-[#2d6a4f] tracking-[-2px] leading-none">
              {value}
            </div>
            <div className="text-[13px] font-semibold text-[rgba(13,27,18,0.4)] uppercase tracking-[1.5px] mt-2">
              {label}
            </div>
            <div className="text-[15px] text-[rgba(13,27,18,0.65)] mt-2 leading-snug">
              {sub}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 px-7 py-5 rounded-xl bg-[#edf4ee] border-l-[3px] border-[#52b788]">
        <p className="text-[18px] text-[#0d1b12] leading-normal">
          <strong>Genesis:</strong> an early, live, but closed network — it
          started as a single plant, now we are open to add more plants in the
          network and grow.
        </p>
      </div>
    </SlideShell>
  );
}

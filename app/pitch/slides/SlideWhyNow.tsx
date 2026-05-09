import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props { notesVisible: boolean }

const forces = [
  {
    label: "Edge AI crossed the threshold",
    title: "A $35 device now runs a capable reasoning model",
    desc: "2024–25: local LLM inference on Raspberry Pi is real. Plants can reason on-device without a cloud dependency or latency penalty.",
  },
  {
    label: "Programmable money is trivially cheap",
    title: "Sub-cent transactions. 400ms finality.",
    desc: "Giving a physical node a sovereign wallet costs nothing. Micro-payments between machines are now economically viable at any scale.",
  },
  {
    label: "Physical networks proved the model",
    title: "Helium and Hivemapper showed devices can earn",
    desc: "DePIN established that physical nodes can hold economic identity and participate in network incentive structures. Tumbuh extends this to living systems.",
  },
];

export default function SlideWhyNow({ notesVisible }: Props) {
  return (
    <SlideShell
      bg="alt"
      notesVisible={notesVisible}
      notes={`Lead with: "This could not have existed 18 months ago." Each force is a genuine threshold crossed — not a trend. Edge inference quality, sub-cent tx fees, and proven DePIN adoption all converged in the same window. The question isn't whether autonomous physical agents are coming. It's who owns the primitive layer when they do.`}
    >
      <span className="absolute -right-10 -top-10 text-[280px] opacity-[0.03] pointer-events-none select-none leading-none">
        ⚡
      </span>

      <Caption>Why Now</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[840px]">
        Three thresholds crossed simultaneously.<br />
        <span className="text-[#2d6a4f] font-black">The window is open now.</span>
      </h1>

      <Divider />

      <div className="grid grid-cols-3 gap-6 mt-8">
        {forces.map(({ label, title, desc }) => (
          <div
            key={label}
            className="bg-[#edf4ee] border border-[rgba(45,106,79,0.25)] rounded-2xl p-10"
          >
            <p className="text-[12px] font-bold text-[#2d6a4f] uppercase tracking-[2.5px] mb-3">{label}</p>
            <p className="text-[20px] font-semibold text-[#0d1b12] leading-[1.3]">{title}</p>
            <p className="text-[16px] text-[rgba(13,27,18,0.65)] mt-2.5 leading-normal">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 px-7 py-5 rounded-xl bg-[#edf4ee] border-l-[3px] border-[#52b788]">
        <p className="text-[18px] text-[#0d1b12] leading-normal">
          The category of <strong>autonomous physical agents with wallets</strong> does not yet have a dominant player.
          The infrastructure exists. The moment is now.
        </p>
      </div>
    </SlideShell>
  );
}

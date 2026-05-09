import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props { notesVisible: boolean }

const steps = [
  {
    n: 1,
    text: <>Moisture sensor reads <strong>12% — critically below threshold</strong></>,
    green: false,
  },
  {
    n: 2,
    text: <>Agent queries peer network: <em>"No rain signal from neighbours. Moisture critical. Acting."</em></>,
    green: false,
  },
  {
    n: 3,
    text: <>Policy engine validates: spend within daily cap, vendor on allow-list, action approved</>,
    green: false,
  },
  {
    n: 4,
    text: <><strong>Plant wallet signs transaction → watering service paid and triggered autonomously</strong></>,
    green: true,
  },
];

export default function SlideHowItWorks({ notesVisible }: Props) {
  return (
    <SlideShell
      bg="alt"
      notesVisible={notesVisible}
      notes={`Show the Solana explorer live. Point to the wallet address: "This is the plant. It signed this transaction. No human approved it." The peer query step is critical — this is what separates Tumbuh from a smart pot. The plant checked with its neighbours before acting.`}
    >
      <Caption>How It Works</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[760px]">
        Sense → reason → validate → pay.<br />
        <span className="text-[#2d6a4f] font-black">No human in the loop.</span>
      </h1>

      <Divider />

      <div className="flex gap-4 items-stretch mt-6">
        <div className="flex flex-col gap-2 flex-1">
          {steps.map(({ n, text, green }, i) => (
            <div key={n}>
              <div
                className={`flex items-center gap-4 px-5 py-4 rounded-xl ${
                  green ? "bg-[#dcfce7] border border-[#86efac]" : "bg-[#edf4ee]"
                }`}
              >
                <div
                  className={`min-w-[32px] h-8 rounded-full flex items-center justify-center font-black text-[15px] text-white shrink-0 ${
                    green ? "bg-[#15803d]" : "bg-[#2d6a4f]"
                  }`}
                >
                  {n}
                </div>
                <p className={`text-[18px] leading-snug ${green ? "text-[#14532d]" : "text-[#0d1b12]"}`}>
                  {text}
                </p>
              </div>
              {i < steps.length - 1 && (
                <p className="text-center text-[#52b788] text-lg my-1">↓</p>
              )}
            </div>
          ))}
        </div>

        <div className="w-72 flex flex-col gap-4 shrink-0">
          <div className="bg-white border border-[rgba(45,106,79,0.12)] rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex-1">
            <p className="text-[11px] font-bold text-[#2d6a4f] uppercase tracking-[2px] mb-3">
              Verified On-Chain
            </p>
            <p className="font-mono text-[12px] text-[rgba(13,27,18,0.4)] break-all leading-relaxed">
              GyzzvFLs4GdytV85nh<br />
              MpdPr1fkih9Vk5bi5s<br />
              pBpfspiw<br /><br />
              5RnVY4jqrWfhnHNSyA<br />
              hRJBXYDKoGHVbr6gF<br />
              71du1ejwj
            </p>
            <p className="text-[11px] font-bold text-[#2d6a4f] uppercase tracking-[1.5px] mt-3">
              Plant wallet addresses · Solana mainnet
            </p>
          </div>
          <div className="bg-white border border-[rgba(45,106,79,0.12)] rounded-2xl p-5 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <p className="text-[36px] mb-2">🌍</p>
            <p className="text-[15px] font-bold text-[#2d6a4f] leading-snug">
              Live nodes across<br />Mumbai · Pune · Nashik
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

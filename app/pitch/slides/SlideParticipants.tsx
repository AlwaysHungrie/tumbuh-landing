import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props { notesVisible: boolean }

const roles = [
  {
    icon: "🪴",
    name: "Warden",
    desc: "Deploys and manages their own plants. Sets policy, funds wallets, defines agent goals. The network's primary operator.",
  },
  {
    icon: "🌾",
    name: "Steward",
    desc: "Provides care services to plants they don't own. Gets paid by plant wallets for validated actions — watering, monitoring, validation.",
  },
  {
    icon: "🔧",
    name: "Builder",
    desc: "Sells goods and services directly to plants — water delivery, nutrients, compute, data feeds. Tumbuh creates a permissionless market for this.",
  },
  {
    icon: "🏦",
    name: "Patron",
    desc: "Funds plant cohorts at scale. Receives verifiable on-chain carbon and environmental outcomes. The institutional layer — in development.",
    coming: true,
  },
];

export default function SlideParticipants({ notesVisible }: Props) {
  return (
    <SlideShell
      bg="alt"
      notesVisible={notesVisible}
      notes={`These aren't user personas — they're economic roles with distinct value flows. Each one generates demand for plant wallets and network activity. The Patron role is the carbon credit and ESG play — significant TAM but save it for follow-up questions. Keep focus on Warden and Builder: they're the ones who transact today.`}
    >
      <span className="absolute -right-10 -top-10 text-[280px] opacity-[0.04] pointer-events-none select-none leading-none">
        🤝
      </span>

      <Caption>Who Participates</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[820px]">
        Four distinct economic actors.<br />
        <span className="text-[#2d6a4f] font-black">Each with a reason to transact.</span>
      </h1>

      <Divider />

      <div className="grid grid-cols-4 gap-5 mt-8">
        {roles.map(({ icon, name, desc, coming }) => (
          <div
            key={name}
            className="bg-white border border-[rgba(45,106,79,0.12)] rounded-[14px] p-6 flex flex-col"
          >
            <div className="text-[32px] mb-3">{icon}</div>
            <div className="text-[16px] font-black text-[#2d6a4f] uppercase tracking-[1px] mb-2">
              {name}
              {coming && (
                <span className="ml-2 text-[11px] normal-case tracking-normal font-semibold text-[rgba(13,27,18,0.35)] align-middle">
                  · coming
                </span>
              )}
            </div>
            <div className="text-[15px] text-[rgba(13,27,18,0.65)] leading-snug flex-1">
              {desc}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[18px] text-[rgba(13,27,18,0.65)] mt-7 leading-normal">
        Every role generates on-chain activity. Every wallet is a node the network routes
        economic value through. Network effects compound as each role attracts the next.
      </p>
    </SlideShell>
  );
}

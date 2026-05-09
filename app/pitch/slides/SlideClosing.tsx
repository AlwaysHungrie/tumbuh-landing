import SlideShell, { Badge } from "./SlideShell";

interface Props {
  notesVisible: boolean;
}

export default function SlideClosing({ notesVisible }: Props) {
  return (
    <SlideShell
      notesVisible={notesVisible}
      notes={`Pause before the last line. Let "nature is coordinating" sit. Close with: "The plants are live. The wallets are funded. The transactions are on-chain. We're raising to scale." Then stop. Don't fill the silence.`}
      className="items-center text-center"
    >
      <span
        className="absolute text-[320px] opacity-[0.035] pointer-events-none select-none leading-none"
        style={{ top: "-60px", left: "50%", transform: "translateX(-50%)" }}
      >
        🌿
      </span>

      <div className="flex gap-2.5 justify-center mb-8">
        <Badge variant="live">● Live Network</Badge>
        <Badge variant="primary">No Token Launch in the future</Badge>
      </div>

      <h1 className="text-[80px] font-black tracking-[-3px] leading-[1.05] text-[#0d1b12] max-w-[860px] mx-auto">
        For the first time
        <br />
        in history, nature is
        <br />
        <span className="text-[#2d6a4f] font-black">coordinating.</span>
      </h1>

      <p className="text-[28px] text-[rgba(13,27,18,0.65)] mt-8 max-w-[580px] mx-auto leading-[1.45]">
        We are building the primitive layer for autonomous physical agents. The
        plants are the first proof.
      </p>

      <div className="flex justify-center gap-8 flex-wrap mt-14">
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#2d6a4f] uppercase tracking-[2.5px] mb-1">
            Building for
          </p>
          <p className="text-[20px] font-bold text-[#0d1b12]">
            Frontier Hackathon
          </p>
        </div>
        <div className="w-px bg-[rgba(45,106,79,0.15)]" />
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#2d6a4f] uppercase tracking-[2.5px] mb-1">
            Stage
          </p>
          <p className="text-[20px] font-bold text-[#0d1b12]">
            Live MVP · Network Invite Only
          </p>
        </div>
        <div className="w-px bg-[rgba(45,106,79,0.15)]" />
        <div className="text-left">
          <p className="text-[11px] font-bold text-[#2d6a4f] uppercase tracking-[2.5px] mb-1">
            Contact
          </p>
          <p className="text-[20px] font-bold text-[#0d1b12]">
            @Always_Hungrie_ on X
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

import SlideShell, { Badge, LeafAccent } from "./SlideShell";

interface Props { notesVisible: boolean }

export default function SlideTitle({ notesVisible }: Props) {
  return (
    <SlideShell
      bg="alt"
      notesVisible={notesVisible}
      notes={`Open with silence. Let "every plant gets a wallet" land before you say another word. Don't explain the system yet. The sentence is the hook. Speak it like a fact, not a pitch.`}
    >
      <LeafAccent />

      <div className="flex items-center gap-3 mb-8">
        <Badge variant="live">● Live</Badge>
        <Badge variant="primary">Seed Round</Badge>
      </div>

      <h1 className="text-[88px] font-black tracking-[-3px] leading-[1.05] text-[#0d1b12] max-w-[820px]">
        Every plant<br />
        <span className="text-[#2d6a4f] font-black">gets a wallet.</span>
      </h1>

      <p className="text-[30px] font-normal text-[rgba(13,27,18,0.65)] leading-[1.45] mt-7 max-w-[640px]">
        Tumbuh builds financially autonomous plants — physical nodes that sense, reason, and
        spend autonomously within hard policy bounds.
      </p>

      <div className="flex items-center gap-4 mt-12">
        <div className="w-10 h-[3px] bg-[#52b788] rounded-full" />
        <span className="text-base font-semibold text-[rgba(13,27,18,0.4)] tracking-[1px] uppercase">
          Nature is coordinating. For the first time in history.
        </span>
      </div>
    </SlideShell>
  );
}

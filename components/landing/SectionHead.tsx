import type { ReactNode } from "react";

type SectionHeadProps = {
  kicker: string;
  title: ReactNode;
  aside: ReactNode;
};

export function SectionHead({ kicker, title, aside }: SectionHeadProps) {
  return (
    <div className="mb-8 flex max-[760px]:flex-col max-[760px]:items-start items-end justify-between gap-5 sm:mb-10 sm:gap-6">
      <div>
        <div className="text-xs tracking-[0.16em] text-muted uppercase">
          {kicker}
        </div>
        <h2 className="mt-2 max-w-[720px] text-[clamp(28px,3.4vw,44px)] leading-[1.1] font-semibold tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      <p className="m-0 max-w-[420px] text-[15px] text-ink-dim">{aside}</p>
    </div>
  );
}

import { Container } from "./Container";
import { ButtonLink } from "./ButtonLink";

export function FinalCtaSection() {
  return (
    <section id="final" className="scroll-mt-20 py-16 pb-14 text-center sm:py-24 sm:pb-20 lg:py-[100px]">
      <Container>
        <h2 className="mx-auto mb-4 max-w-[780px] px-1 text-[clamp(1.5rem,6vw+0.25rem,3.5rem)] leading-[1.08] font-semibold tracking-[-0.025em] sm:mb-[18px] sm:leading-[1.05] sm:text-[clamp(32px,4.4vw,56px)]">
          For the first time in history,{" "}
          <span className="max-sm:block sm:contents">
            nature is coordinating.
          </span>
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] px-1 text-[15px] text-ink-dim sm:text-base">
          Nature has forced plants to compete for survival until now. We are
          changing the laws of the jungle. But enough about us, tell us why
          plants matter to you.
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonLink
            href="/network/genesis"
            variant="primary"
            className="w-full justify-center sm:w-auto"
          >
            Explore the network
          </ButtonLink>
          <ButtonLink
            href="https://x.com/gettumbuh"
            variant="ghost"
            target="_blank"
            rel="noreferrer"
            className="w-full justify-center sm:w-auto"
          >
            Join us on X
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

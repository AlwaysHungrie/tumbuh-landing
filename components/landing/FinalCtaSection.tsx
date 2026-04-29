import { Container } from "./Container";
import { ButtonLink } from "./ButtonLink";

export function FinalCtaSection() {
  return (
    <section id="final" className="scroll-mt-20 py-[100px] pb-20 text-center">
      <Container>
        <h2 className="mx-auto mb-[18px] max-w-[780px] text-[clamp(32px,4.4vw,56px)] leading-[1.05] font-semibold tracking-[-0.025em]">
        For the first time in history,<br/>nature is coordinating.
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] text-ink-dim">
          Nature has forced plants to compete for survival until now.
          <br/>
          We are changing the laws of the jungle.
          <br/>
          But enough about us, tell us why plants matter to you.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/network/genesis" variant="primary">
            Explore the network
          </ButtonLink>
          <ButtonLink
            href="https://x.com/gettumbuh"
            variant="ghost"
            target="_blank"
            rel="noreferrer"
          >
            Join us on X
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

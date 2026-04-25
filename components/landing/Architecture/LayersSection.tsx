import { Container } from "../Container";
import { SectionHead } from "../SectionHead";
import { layers } from "../data";

export function LayersSection() {
  return (
    <section id="layers" className="scroll-mt-20 border-t border-line py-[88px]">
      <Container>
        <SectionHead
          kicker="02 · System"
          title="Four layers. Each layer unlocks an extraordinary stage of plant evolution."
          aside={
            <>
              Each layer is capable of being upgraded independently. 
              As the layers gets more powerful features we move towards a complete harmony between man and nature.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((l) => (
            <article
              key={l.num}
              className="flex min-h-[220px] flex-col gap-3 rounded-card border border-line bg-cream-dark p-[22px] transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-ink hover:bg-white"
            >
              <span className="text-xs tracking-[0.14em] text-muted tabular-nums">
                Layer {l.num}
              </span>
              <h3 className="m-0 text-xl font-semibold tracking-tight">{l.title}</h3>
              <p className="m-0 text-sm text-ink-dim">{l.body}</p>
              <div className="mt-auto border-t border-dashed border-line pt-2.5 text-xs text-muted">
                {l.answer}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

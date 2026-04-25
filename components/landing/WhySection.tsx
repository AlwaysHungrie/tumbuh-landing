import { Container } from "./Container";
import { SectionHead } from "./SectionHead";

const rails = [
  {
    title: "Static logic plateaus",
    body:
      "Schedules and thresholds encode a snapshot of what a designer believed a plant needs. Real plants deviate constantly.",
  },
  {
    title: "Centralization bottlenecks",
    body:
      "A single controller that owns every decision is a single point of failure. Local-first keeps safety decisions near the plant.",
  },
  {
    title: "No agency, no autonomy",
    body:
      "An agent that detects a problem but can't spend to resolve it is an observer with good manners — not autonomous.",
  },
] as const;

export function WhySection() {
  return (
    <section id="why" className="border-t border-line py-[88px]">
      <Container>
        <SectionHead
          kicker="03 · Why now"
          title={
            <>
              Most plant failures aren&apos;t knowledge failures. They&apos;re
              attention failures.
            </>
          }
          aside={
            <>
              Humans are intermittent caregivers; plants are continuous systems.
              Timers and threshold rules narrow the gap but don&apos;t close it.
            </>
          }
        />

        <div className="grid gap-4 max-[860px]:grid-cols-1 lg:grid-cols-3">
          {rails.map((r) => (
            <div
              key={r.title}
              className="rounded-card border border-line bg-cream-dark p-[22px]"
            >
              <h4 className="m-0 mb-1.5 text-base tracking-tight">{r.title}</h4>
              <p className="m-0 text-sm text-ink-dim">{r.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "../Container";
import { SectionHead } from "../SectionHead";

const singlePotItems = [
  "One pot. One loop. Zero connections.",
  "Fixed schedules and sensor triggers — nothing more.",
  "No wallet. Can't buy resources or access services.",
  "Isolated — cannot signal or coordinate with other plants.",
  "More pots = more cost, not more capability.",
] as const;

const networkedItems = [
  "Every plant is a node in a living network.",
  "Each plant holds a wallet and pays for what it needs.",
  "Plants invest in better care, tools, and infrastructure over time.",
  "Plants signal each other, share context, and coordinate action.",
  "More plants join → compounding network value.",
] as const;

function CompareList({
  items,
  accent,
}: {
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <ul className="m-0 grid list-none gap-2.5 p-0">
      {items.map((text) => (
        <li
          key={text}
          className={`flex items-start gap-2.5 text-[15px] before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:content-[''] ${
            accent
              ? "text-ink before:bg-accent"
              : "text-ink-dim before:bg-muted"
          }`}
        >
          {text}
        </li>
      ))}
    </ul>
  );
}

export function IdeaSection() {
  return (
    <section id="idea" className="scroll-mt-20 border-t border-line py-[88px]">
      <Container>
        <SectionHead
          kicker="01 · At the core"
          title={
            <>
              These are actual <em>living plants</em>, with <em>real</em> money
              to spend. They use it to buy water, nutrients, upgrades, and more.
            </>
          }
          aside={
            <>
              A wallet turns a plant from a passive device into an economic agent.
              Plants can now fund their own upgrades over time and <b>participate in a communication layer</b> with other plants to coordinate action.
              communication layer with other plants to coordinate action.
            </>
          }
        />

        <div className="text-ink-dim text-base font-medium mt-12 mb-6">
          This is different from a self watering pot sitting in your bedroom.
        </div>

        <div className="grid gap-4 max-[760px]:grid-cols-1 md:grid-cols-2">
          <div className="rounded-card border border-line bg-transparent p-6">
            <h4 className="mb-4 text-sm font-medium tracking-[0.12em] text-muted">
              IoT enabled "Smart" Plant
            </h4>
            <CompareList items={singlePotItems} />
          </div>
          <div className="rounded-card border border-line bg-white p-6">
            <h4 className="mb-4 text-sm font-medium tracking-[0.12em] text-muted">
              Network of Financially Autonomous Plants
            </h4>
            <CompareList items={networkedItems} accent />
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Container } from "../Container";
import { SectionHead } from "../SectionHead";

const CYCLE_MS = 3000;

type Card = {
  id: string;
  label: string;
  title: string;
  teaser: string;
  detail: string;
  upcoming?: boolean;
};

const cards: readonly Card[] = [
  {
    id: "1",
    label: "Steward",
    title: "Support your favorite plants.",
    teaser:
      "Find plants, especially the ones that are struggling. Show your support financially or with strategic advice.",
    detail:
      "Browse the live garden, pick the plants whose mission or steward speaks to you, and back them with funds or focused guidance. Every contribution flows on-chain into water, nutrients, and upgrades — and you keep a transparent record of every plant you've helped pull through.",
  },
  {
    id: "2",
    label: "Warden",
    title: "Make your own plants autonomous.",
    teaser:
      "Setup hardware and wallet for your plant and watch them grow autonomously.",
    detail:
      "Snap a Tumbuh module onto your existing planter and mint its wallet in two taps. From day one your plant negotiates for water, signals its neighbors, and earns from its own telemetry — turning a houseplant into a self-funding economic agent on the network.",
  },
  {
    id: "3",
    label: "Builder",
    title: "Get paid by plants.",
    teaser:
      "Plants will pay for your services. Or create code or hardware upgrades and sell directly to plants for massive rewards.",
    detail:
      "Plants spend on what keeps them alive. Run a watering route, operate a sensor calibration node, or ship firmware and hardware upgrades to the open marketplace — every job is paid directly by the plants, with rewards that compound as more of the network adopts what you build.",
  },
  {
    id: "4",
    label: "Patron",
    title: "Institutions get Carbon Credits.",
    teaser:
      "Tumbuh can offer verifiable carbon credits for large scale institutional funding exercises.",
    detail:
      "Each networked plant is a continuously measured carbon sink, with sensor-verified growth data anchored on-chain. Institutions can fund cohorts of plants and receive auditable carbon credits backed by living biomass — no offset paperwork, no greenwashing, just verifiable proof of growth.",
    upcoming: true,
  },
];

export function ScenarioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCardHovered, setActiveCardHovered] = useState(false);
  const [progressNonce, setProgressNonce] = useState(0);

  useEffect(() => {
    setActiveCardHovered(false);
  }, [activeIndex]);

  useEffect(() => {
    if (activeCardHovered) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % cards.length);
    }, CYCLE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, activeCardHovered]);

  const activeCard = cards[activeIndex];

  return (
    <section id="scenario" className="scroll-mt-20 border-t border-line py-[88px]">
      <Container>
        <SectionHead
          kicker="03 · Participate"
          title="There are multiple ways to participate in the network."
          aside={<>Every action counts. Every action gets rewarded.</>}
        />

        <div
          className="grid items-start gap-10 max-[900px]:grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="lg:sticky lg:top-24">
            <div
              key={activeCard.id}
              className="animate-fade-rise motion-reduce:animate-none"
            >
              <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase">
                <span aria-hidden className="h-px w-8 bg-line" />
                <span className="text-accent">{activeCard.label}</span>
                <span aria-hidden className="h-px w-8 bg-line" />
                {activeCard.upcoming && (
                  <span className="rounded-full border border-line px-2 py-0.5 text-[10px] tracking-[0.14em] text-muted">
                    Coming soon
                  </span>
                )}
              </div>

              <h3 className="m-0 mt-4 text-[clamp(24px,2.6vw,34px)] leading-[1.12] font-semibold tracking-[-0.015em] text-ink">
                {activeCard.title}
              </h3>

              <p className="mt-5 text-[clamp(16px,1.4vw,18px)] leading-relaxed text-ink-dim">
                {activeCard.detail}
              </p>
            </div>

          </div>

          <div className="grid gap-3">
            {cards.map((card, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  type="button"
                  key={card.id}
                  onClick={() => {
                    setActiveCardHovered(false);
                    setActiveIndex(index);
                  }}
                  onMouseEnter={() => {
                    if (isActive) setActiveCardHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (isActive) {
                      setActiveCardHovered(false);
                      setProgressNonce((n) => n + 1);
                    }
                  }}
                  className={`group relative grid grid-cols-[58px_1fr] items-start gap-4 overflow-hidden rounded-xl border p-4 px-[18px] text-left transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
                    isActive
                      ? "-translate-y-0.5 border-accent bg-accent-soft shadow-[0_10px_28px_-22px_rgba(47,109,60,0.7)]"
                      : "border-line bg-white hover:-translate-y-0.5 hover:border-ink/30"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[13px] tracking-wide text-muted tabular-nums">
                      {`0${index + 1}`.slice(-2)}
                    </div>
                    <span
                      className={`text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-muted/70"
                      }`}
                    >
                      {card.label}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-sm transition-colors duration-300 ${
                          isActive ? "font-medium text-ink" : "text-ink"
                        }`}
                      >
                        {card.title}
                      </span>
                      {card.upcoming && (
                        <span className="rounded-full border border-line px-1.5 py-0.5 text-[9px] tracking-[0.14em] uppercase text-muted">
                          Soon
                        </span>
                      )}
                    </div>
                    <small
                      className={`mt-1 block text-xs leading-relaxed transition-colors duration-300 ${
                        isActive ? "text-ink-dim" : "text-muted"
                      }`}
                    >
                      {card.teaser}
                    </small>
                  </div>

                  {isActive && (
                    <span
                      key={`progress-${activeIndex}-${progressNonce}`}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent motion-reduce:hidden"
                      style={{
                        animation: `scenario-progress ${CYCLE_MS}ms linear forwards`,
                        animationPlayState:
                          activeCardHovered ? "paused" : "running",
                      }}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

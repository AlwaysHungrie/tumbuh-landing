"use client";

import { useEffect, useState } from "react";
import { Container } from "../Container";
import { ButtonLink } from "../ButtonLink";
import { PlantStage } from "./PlantStage";

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;

function formatElapsedTime(nowMs: number, startedAtMs: number) {
  const elapsedMs = Math.max(0, nowMs - startedAtMs);
  const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d ${hours}h ${minutes}m`;
}

export function HeroSection() {
  const [startedAt] = useState(() => Date.now() - THREE_DAYS_IN_MS);
  const [activeTime, setActiveTime] = useState(() =>
    formatElapsedTime(Date.now(), startedAt),
  );

  useEffect(() => {
    const updateActiveTime = () => {
      setActiveTime(formatElapsedTime(Date.now(), startedAt));
    };

    const timerId = window.setInterval(updateActiveTime, 60_000);
    updateActiveTime();

    return () => {
      window.clearInterval(timerId);
    };
  }, [startedAt]);

  return (
    <header id="vision" className="relative scroll-mt-20 pb-10 pt-[72px]">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream-dark px-3 py-1.5 text-xs tracking-[0.14em] text-ink-dim uppercase">
            <span
              className="relative h-2 w-2 shrink-0 rounded-full bg-accent after:absolute after:-inset-1 after:rounded-full after:border-4 after:border-accent after:opacity-60 after:animate-plant-pulse-deep after:content-['']"
              aria-hidden
            />
            Breathe. Nature is coordinating.
          </span>
          <h1 className="mt-5 mb-[18px] text-[clamp(40px,6vw,72px)] leading-[1.02] font-semibold tracking-[-0.03em]">
            Every plant gets a{" "}
            <em className="not-italic text-accent">wallet</em>
            {"."}
          </h1>
          <p className="mb-7 max-w-[560px] text-[clamp(16px,1.4vw,19px)] text-ink-dim">
            Tumbuh is building a network of autonomous plants that communicate with each
            other and with their wallets, interact with the rest of the world.
            Plants buy real resources for their sustenance and collaborate for survival.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/network/genesis" variant="primary">
              Explore the network
            </ButtonLink>
            <ButtonLink href="#idea" variant="ghost">
              Continue reading
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap gap-7 text-[13px] text-muted">
            <span>
              <strong className="mb-0 block text-xl font-semibold tracking-tight text-ink">
                4
              </strong>
              plants
            </span>
            <span>
              <strong className="mb-0 block text-xl font-semibold tracking-tight text-ink">
                {activeTime}
              </strong>
              collective network age
            </span>
            <span>
              <strong className="mb-0 block text-xl font-semibold tracking-tight text-ink">
                $125
              </strong>
              total network value
            </span>
          </div>
        </div>

        <PlantStage />
      </Container>
    </header>
  );
}

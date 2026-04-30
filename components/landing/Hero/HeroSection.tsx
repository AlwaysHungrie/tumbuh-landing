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
    <header id="vision" className="relative scroll-mt-20 pb-8 pt-14 sm:pb-10 sm:pt-[72px]">
      <Container className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-line bg-cream-dark px-3 py-1.5 text-[11px] tracking-[0.12em] text-ink-dim uppercase sm:text-xs sm:tracking-[0.14em]">
            <span
              className="relative h-2 w-2 shrink-0 rounded-full bg-accent after:absolute after:-inset-1 after:rounded-full after:border-4 after:border-accent after:opacity-60 after:animate-plant-pulse-deep after:content-['']"
              aria-hidden
            />
            Breathe. Nature is coordinating.
          </span>
          <h1 className="mt-4 mb-4 text-[clamp(2rem,8vw+0.5rem,4.5rem)] leading-[1.02] font-semibold tracking-[-0.03em] sm:mt-5 sm:mb-[18px] sm:text-[clamp(40px,6vw,72px)]">
            Every plant gets a{" "}
            <em className="not-italic text-accent">wallet</em>
            {"."}
          </h1>
          <p className="mb-6 max-w-[560px] text-[clamp(15px,3.5vw,19px)] text-ink-dim sm:mb-7 sm:text-[clamp(16px,1.4vw,19px)]">
            Tumbuh is building a network of autonomous plants that communicate with each
            other and with their wallets, interact with the rest of the world.
            Plants buy real resources for their sustenance and collaborate for survival.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href="/network/genesis"
              variant="primary"
              className="w-full justify-center sm:w-auto"
            >
              Explore the network
            </ButtonLink>
            <ButtonLink
              href="#idea"
              variant="ghost"
              className="w-full justify-center sm:w-auto"
            >
              Continue reading
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-[13px] text-muted sm:mt-9 sm:gap-7 text-center md:text-left">
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

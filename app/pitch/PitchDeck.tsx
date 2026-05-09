"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SlideTitle from "./slides/SlideTitle";
import SlideProblem from "./slides/SlideProblem";
import SlideWhyNow from "./slides/SlideWhyNow";
import SlideSolution from "./slides/SlideSolution";
import SlideHowItWorks from "./slides/SlideHowItWorks";
import SlideWhySolana from "./slides/SlideWhySolana";
import SlideParticipants from "./slides/SlideParticipants";
import SlideTraction from "./slides/SlideTraction";
import SlideBountyTracks from "./slides/SlideBountyTracks";
import SlideClosing from "./slides/SlideClosing";

const SLIDES = [
  SlideTitle,
  SlideProblem,
  SlideWhyNow,
  SlideSolution,
  SlideHowItWorks,
  SlideWhySolana,
  SlideParticipants,
  SlideTraction,
  SlideBountyTracks,
  SlideClosing,
];

export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
  const [notesVisible, setNotesVisible] = useState(false);
  const total = SLIDES.length;

  const go = useCallback(
    (i: number) => setCurrent(Math.max(0, Math.min(i, total - 1))),
    [total]
  );
  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "n" || e.key === "N") setNotesVisible((v) => !v);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const handleDeckClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-nav]")) return;
    if (e.clientX > window.innerWidth / 2) next(); else prev();
  };

  const SlideComponent = SLIDES[current];
  const progress = ((current + 1) / total) * 100;

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-[#f8faf8] text-[#0d1b12] font-sans select-none"
      onClick={handleDeckClick}
    >
      <SlideComponent notesVisible={notesVisible} />

      {/* Nav bar */}
      <div
        data-nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-10 py-3.5
          bg-gradient-to-t from-[rgba(248,250,248,0.97)] to-transparent
          opacity-0 hover:opacity-100 transition-opacity duration-300 z-50"
      >
        <button
          data-nav
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="border border-[rgba(45,106,79,0.25)] text-[rgba(13,27,18,0.65)] px-3.5 py-1.5 rounded-lg text-sm
            hover:border-[#2d6a4f] hover:text-[#2d6a4f] transition-colors cursor-pointer bg-transparent font-sans"
        >
          ← Prev
        </button>

        <div className="flex items-center gap-4 flex-1 justify-center max-w-xs mx-auto">
          <span className="font-mono text-sm text-[rgba(13,27,18,0.4)]">
            {current + 1} / {total}
          </span>
          <div className="flex-1 h-[3px] rounded-full bg-[rgba(45,106,79,0.12)]">
            <div
              className="h-full rounded-full bg-[#2d6a4f] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          data-nav
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="border border-[rgba(45,106,79,0.25)] text-[rgba(13,27,18,0.65)] px-3.5 py-1.5 rounded-lg text-sm
            hover:border-[#2d6a4f] hover:text-[#2d6a4f] transition-colors cursor-pointer bg-transparent font-sans"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

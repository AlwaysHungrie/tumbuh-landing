import type { Metadata } from "next";
import PitchDeck from "./PitchDeck";

export const metadata: Metadata = {
  title: "Tumbuh — Pitch Deck · Superteam Frontier",
  description: "Every plant gets a wallet. Tumbuh is a Network of Financially Autonomous Plants.",
};

export default function PitchPage() {
  return <PitchDeck />;
}

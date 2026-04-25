import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tumbuh - Autonomous Plants",
  description: "Tumbuh is a network of autonomous plants that can sense, decide, and act to sustain plant health over time.",
  icons: {
    icon: "/potted-plant.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

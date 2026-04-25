import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tumbuh — Autonomous Plants",
    template: "%s — Tumbuh",
  },
  description:
    "Tumbuh is a network of autonomous plants that can sense, decide, and act to sustain plant health over time.",
  icons: {
    icon: "/potted-plant.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tumbuh",
    title: "Tumbuh — Every plant gets a wallet",
    description:
      "A network of autonomous plants that communicate, collaborate, and interact with the world. Plants buy real resources for their sustenance.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tumbuh — Every plant gets a wallet",
    description:
      "A network of autonomous plants that communicate, collaborate, and interact with the world.",
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

import { Container } from "@/components/landing/Container";
import { SiteNav } from "@/components/landing/SiteNav";
import { NetworkNav } from "@/components/NetworkNav";

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh overflow-x-clip bg-cream text-ink">
      <SiteNav />
      <main className="pb-4 pt-4">
        <Container>{children}</Container>
      </main>
    </main>
  );
}

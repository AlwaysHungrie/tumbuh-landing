import { Container } from "@/components/landing/Container";
import { SiteNav } from "@/components/landing/SiteNav";
import { NetworkNav } from "@/components/NetworkNav";

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-cream text-ink">
      <SiteNav />
      <div className="min-h-0 flex-1 overflow-hidden px-4">{children}</div>
    </div>
  );
}

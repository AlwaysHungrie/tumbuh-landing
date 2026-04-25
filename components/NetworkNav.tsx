import Image from "next/image";
import { Container } from "@/components/landing/Container";

export function NetworkNav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-cream/78 backdrop-blur-md backdrop-saturate-[140%]">
      <Container className="flex h-16 items-center justify-between">
        <a className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <span
            className="relative h-12 w-12 shrink-0 basis-12 overflow-visible"
            aria-hidden
          >
            <Image
              src="/potted-plant.png"
              alt=""
              width={256}
              height={256}
              className="absolute -mb-6 top-1/2 left-1/2 h-[72px] w-[72px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </span>
          Tumbuh
        </a>
        <a
          className="rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-[transform,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-accent"
          href="/network/genesis"
        >
          Join the network 
        </a>
      </Container>
    </nav>
  );
}

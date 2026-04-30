import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/landing/Container";

export function NetworkNav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-cream/78 backdrop-blur-md backdrop-saturate-[140%]">
      <Container className="flex h-14 min-h-14 items-center justify-between gap-2 sm:h-16 sm:min-h-16">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 text-base font-semibold tracking-tight sm:gap-2.5 sm:text-lg"
        >
          <span
            className="relative h-10 w-10 shrink-0 overflow-visible sm:h-12 sm:w-12 sm:basis-12"
            aria-hidden
          >
            <Image
              src="/potted-plant.png"
              alt=""
              width={256}
              height={256}
              className="absolute top-1/2 left-1/2 h-[60px] w-[60px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain sm:-mb-6 sm:h-[72px] sm:w-[72px]"
            />
          </span>
          <span className="truncate">Tumbuh</span>
        </Link>
        <a
          className="shrink-0 rounded-full bg-ink px-3 py-2.5 text-xs font-medium text-cream transition-[transform,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-accent sm:px-4 sm:text-sm"
          href="/network/genesis"
        >
          <span className="max-[380px]:sr-only">Join the network</span>
          <span className="hidden max-[380px]:inline">Join</span>
        </a>
      </Container>
    </nav>
  );
}

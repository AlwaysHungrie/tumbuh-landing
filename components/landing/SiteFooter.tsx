import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-7 pb-10 text-[13px] text-muted">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <div>© Tumbuh · Autonomous plant network</div>
        <div className="flex items-center gap-4">
          <a className="hover:text-ink" href="/#idea">
            The idea
          </a>
          <a
            className="hover:text-ink"
            href="https://x.com/gettumbuh"
            target="_blank"
            rel="noreferrer"
          >
            X @gettumbuh
          </a>
        </div>
      </Container>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Container } from "./Container";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/** Submit with exactly `__error__` to preview the failure state (no API yet). */
const WAITLIST_TEST_ERROR_TOKEN = "__error__";

export function SiteNav() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const dialogTitleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setSubmitStatus("idle");
    setContact("");
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDialog();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      lastActiveRef.current?.focus?.();
    };
  }, [dialogOpen, closeDialog]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = contact.trim();
    if (!trimmed || submitStatus === "submitting") return;

    setSubmitStatus("submitting");
    try {
      await new Promise<void>((resolve, reject) => {
        window.setTimeout(() => {
          if (trimmed.toLowerCase() === WAITLIST_TEST_ERROR_TOKEN) {
            reject(new Error("Simulated submit error"));
            return;
          }
          resolve();
        }, 1400);
      });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  const openDialog = () => {
    setMobileNavOpen(false);
    setDialogOpen(true);
    setSubmitStatus("idle");
  };

  return (
    <>
      <nav className="sticky top-0 z-20 border-b border-line bg-cream/78 backdrop-blur-md backdrop-saturate-[140%]">
        <Container className="flex h-14 min-h-14 items-center justify-between gap-2 sm:h-16 sm:min-h-16">
          <Link
            className="flex min-w-0 shrink items-center gap-2 text-base font-semibold tracking-tight sm:gap-2.5 sm:text-lg"
            href="/#top"
            onClick={() => setMobileNavOpen(false)}
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
          <div className="hidden min-[721px]:flex shrink-0 gap-7 text-sm text-ink-dim">
            <Link className="hover:text-ink" href="/#idea">
              Idea
            </Link>
            <Link className="hover:text-ink" href="/#layers">
              System
            </Link>
            <Link className="hover:text-ink" href="/#scenario">
              Participate
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="rounded-full bg-ink px-3 py-2.5 text-xs font-medium text-cream transition-[transform,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-accent sm:px-4 sm:text-sm"
              onClick={openDialog}
              aria-haspopup="dialog"
              aria-expanded={dialogOpen}
              aria-controls="join-waitlist-dialog"
            >
              <span className="max-[380px]:sr-only">Join the network</span>
              <span className="hidden max-[380px]:inline">Join</span>
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-cream-dark min-[721px]:hidden"
              onClick={() => setMobileNavOpen((o) => !o)}
              aria-expanded={mobileNavOpen}
              aria-controls="site-mobile-nav"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3.5 w-[18px]" aria-hidden>
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-[transform,top] duration-200 ${
                    mobileNavOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                    mobileNavOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-[transform,top] duration-200 ${
                    mobileNavOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </Container>
        {mobileNavOpen ? (
          <div
            id="site-mobile-nav"
            className="border-b border-line bg-cream/95 px-4 py-3 backdrop-blur-md min-[721px]:hidden"
          >
            <div className="mx-auto flex max-w-site flex-col gap-0.5 text-sm text-ink-dim sm:px-6">
              <Link
                className="rounded-lg px-3 py-3 font-medium text-ink hover:bg-cream-dark"
                href="/#idea"
                onClick={() => setMobileNavOpen(false)}
              >
                Idea
              </Link>
              <Link
                className="rounded-lg px-3 py-3 font-medium text-ink hover:bg-cream-dark"
                href="/#layers"
                onClick={() => setMobileNavOpen(false)}
              >
                System
              </Link>
              <Link
                className="rounded-lg px-3 py-3 font-medium text-ink hover:bg-cream-dark"
                href="/#scenario"
                onClick={() => setMobileNavOpen(false)}
              >
                Participate
              </Link>
            </div>
          </div>
        ) : null}
      </nav>

      {dialogOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 min-[520px]:items-center min-[520px]:p-6"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/70 backdrop-blur-[6px]"
            aria-label="Close dialog"
            onClick={closeDialog}
          />
          <div
            id="join-waitlist-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="relative z-10 w-full max-w-[440px] rounded-[14px] border border-line bg-cream p-6 shadow-[0_24px_80px_rgba(20,22,20,0.18)] animate-fade-rise motion-reduce:animate-none"
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-cream-dark hover:text-ink"
              onClick={closeDialog}
              aria-label="Close"
            >
              <span className="text-lg leading-none" aria-hidden>
                ×
              </span>
            </button>

            <h2
              id={dialogTitleId}
              className="pr-10 text-lg font-semibold tracking-tight text-ink"
            >
              Join the waitlist
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">
              Our network is still a work in progress. Drop either your email, Telegram,
              or X handle (any one way for us to reach you) and we will add you to the waitlist and reach out
              as soon as we are ready.
            </p>

            {submitStatus === "success" ? (
              <div className="mt-6 rounded-[12px] border border-line bg-accent-soft/60 px-4 py-3 text-sm text-ink">
                <p className="font-medium text-accent">You are on the list</p>
                <p className="mt-1 text-ink-dim">
                  Thanks — we will be in touch when the network opens up.
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-[transform,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-accent"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="waitlist-contact" className="sr-only">
                    Email, Telegram, or social handle
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="waitlist-contact"
                    name="contact"
                    type="text"
                    autoComplete="email"
                    placeholder="you@email.com, @handle, or Telegram"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (submitStatus === "error") setSubmitStatus("idle");
                    }}
                    disabled={submitStatus === "submitting"}
                    className="w-full rounded-[12px] border border-line bg-cream-dark/40 px-3.5 py-3 text-sm text-ink placeholder:text-muted outline-none transition-[border-color,box-shadow] focus:border-accent focus:ring-2 focus:ring-accent/25 disabled:opacity-60"
                  />
                </div>

                {submitStatus === "error" ? (
                  <p className="text-sm text-red-800" role="alert">
                    Something went wrong. Please try again in a moment.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitStatus === "submitting" || !contact.trim()}
                  className="w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-[transform,background-color,opacity] duration-150 ease-out hover:-translate-y-px hover:bg-accent disabled:pointer-events-none disabled:opacity-45"
                >
                  {submitStatus === "submitting" ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream"
                        aria-hidden
                      />
                      Sending…
                    </span>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

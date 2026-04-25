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
    setDialogOpen(true);
    setSubmitStatus("idle");
  };

  return (
    <>
      <nav className="sticky top-0 z-20 border-b border-line bg-cream/78 backdrop-blur-md backdrop-saturate-[140%]">
        <Container className="flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2.5 text-lg font-semibold tracking-tight" href="/#top">
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
          </Link>
          <div className="hidden min-[721px]:flex gap-7 text-sm text-ink-dim">
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
          <button
            type="button"
            className="rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-[transform,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-accent"
            onClick={openDialog}
            aria-haspopup="dialog"
            aria-expanded={dialogOpen}
            aria-controls="join-waitlist-dialog"
          >
            Join the network
          </button>
        </Container>
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

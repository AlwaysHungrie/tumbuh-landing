import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
}: ButtonLinkProps) {
  const base =
    "group inline-flex min-h-11 items-center gap-2 rounded-full border border-transparent px-5 py-3 text-[15px] font-medium transition-[transform,background-color,border-color] duration-150 ease-out";

  const variants: Record<Variant, string> = {
    primary:
      "bg-ink text-cream hover:-translate-y-px hover:bg-accent active:translate-y-0",
    ghost:
      "border-line text-ink hover:-translate-y-px hover:border-ink active:translate-y-0",
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${base} ${variants[variant]} ${className}`.trim()}
    >
      {children}
      {variant === "primary" ? (
        <span className="transition-transform duration-150 ease-out group-hover:translate-x-[3px]">
          →
        </span>
      ) : null}
    </a>
  );
}

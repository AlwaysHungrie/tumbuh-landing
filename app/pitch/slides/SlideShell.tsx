import { ReactNode } from "react";

interface SlideShellProps {
  children: ReactNode;
  bg?: "default" | "alt" | "surface";
  className?: string;
  notesVisible?: boolean;
  notes?: string;
}

export default function SlideShell({
  children,
  bg = "default",
  className = "",
  notesVisible,
  notes,
}: SlideShellProps) {
  const bgClass =
    bg === "alt" ? "bg-white" :
    bg === "surface" ? "bg-[#edf4ee]" :
    "bg-[#f8faf8]";

  return (
    <div className={`relative w-full h-full flex flex-col justify-center px-24 py-[72px] overflow-hidden ${bgClass} ${className}`}>
      {children}
      {notes && notesVisible && (
        <div className="fixed bottom-14 left-10 right-10 bg-[#0d1b12] border border-[rgba(82,183,136,0.2)]
          rounded-xl px-6 py-4 text-[15px] text-[rgba(241,250,244,0.8)] leading-relaxed z-[200] max-h-44 overflow-y-auto">
          <p className="text-[11px] font-bold text-[#52b788] uppercase tracking-widest mb-2">Speaker Notes</p>
          {notes}
        </div>
      )}
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] font-bold text-[#2d6a4f] uppercase tracking-[2.5px]">{children}</p>
  );
}

export function Divider() {
  return <div className="w-14 h-[3px] rounded-full bg-[#52b788] my-5" />;
}

export function Badge({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "accent" | "live" }) {
  const cls =
    variant === "live" ? "bg-[#dcfce7] text-[#15803d] border border-[#86efac]" :
    variant === "accent" ? "bg-[rgba(82,183,136,0.10)] text-[#2d6a4f] border border-[rgba(82,183,136,0.2)]" :
    "bg-[rgba(45,106,79,0.08)] text-[#2d6a4f] border border-[rgba(45,106,79,0.2)]";
  return (
    <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-[0.5px] ${cls}`}>
      {children}
    </span>
  );
}

export function LeafAccent({ size = "lg" }: { size?: "lg" | "sm" }) {
  if (size === "sm") {
    return (
      <span className="absolute right-20 bottom-20 text-[120px] opacity-[0.06] pointer-events-none select-none leading-none">
        🌿
      </span>
    );
  }
  return (
    <span className="absolute -right-10 -top-10 text-[280px] opacity-[0.04] pointer-events-none select-none leading-none">
      🌿
    </span>
  );
}

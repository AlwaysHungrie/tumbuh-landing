import { ReactNode } from "react";

type Props = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AdminCard({ title, action, children, className = "" }: Props) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-[10px] font-bold tracking-[0.14em] text-muted uppercase">
          {title}
        </span>
        {action}
      </div>
      {children}
    </div>
  );
}

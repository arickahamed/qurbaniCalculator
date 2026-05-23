import { cn } from "@/lib/utils";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "w-full py-6 text-center text-sm text-slate-500",
        className,
      )}
    >
      All rights reserved @{" "}
      <a
        href="https://www.linkedin.com/in/arickahamed/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-700 underline underline-offset-2 hover:text-slate-900"
      >
        arickahamed
      </a>{" "}
      || 2026
    </footer>
  );
}

import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "destructive";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" &&
          "bg-primary text-primary-foreground border-transparent",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground border-transparent",
        variant === "destructive" &&
          "bg-destructive text-destructive-foreground border-transparent",
        className
      )}
      {...props}
    />
  );
}

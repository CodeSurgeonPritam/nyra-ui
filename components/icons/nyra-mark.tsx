import { cn } from "@/lib/utils";

type NyraMarkProps = React.SVGAttributes<SVGSVGElement> & {
  size?: number;
};

/**
 * Four-point star — Nyra's mark, doubling as the recurring sparkle motif.
 * Strokeless, fills with currentColor so it inherits text-* utilities.
 */
export function NyraMark({ size = 24, className, ...props }: NyraMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("inline-block shrink-0", className)}
      {...props}
    >
      <path
        d="M12 0 C12.6 6 18 11.4 24 12 C18 12.6 12.6 18 12 24 C11.4 18 6 12.6 0 12 C6 11.4 11.4 6 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

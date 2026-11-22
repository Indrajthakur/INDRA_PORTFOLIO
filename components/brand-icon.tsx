import { brands, type BrandKey } from "@/lib/brand";
import { tint } from "@/lib/utils";

export function BrandIcon({
  name, size = 20, mono, className,
}: { name: BrandKey; size?: number; mono?: boolean; className?: string }) {
  const b = brands[name];
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={mono ? "currentColor" : tint(b.hex)} aria-hidden className={className}>
      <path d={b.path} />
    </svg>
  );
}

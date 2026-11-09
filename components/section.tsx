import { Badge } from '@/components/ui/badge';

export const h2Class =
  'text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance font-stretch-semi-expanded';

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="outline" className="h-auto rounded-full border-white/15 px-3 py-1 font-mono text-xs tracking-[0.14em] text-white/70 uppercase">
      {children}
    </Badge>
  );
}

// PRÉVIA ISOLADA para aprovação: /previa/avaliacoes-marquee. Não tem link no site e não é indexada.
// Se for reprovada, apagar esta pasta, components/testimonials-marquee.tsx e components/shadcn-space/.
import type { Metadata } from 'next';
import Link from 'next/link';
import { TestimonialsMarquee } from '@/components/testimonials-marquee';

export const metadata: Metadata = { title: 'Prévia: avaliações em marquee', robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main>
      <div className="sticky top-0 z-50 border-b border-signal/30 bg-signal/10 px-4 py-3 text-center font-mono text-[11px] leading-relaxed tracking-[0.1em] text-signal uppercase backdrop-blur">
        Prévia isolada · Avaliações com Marquee 01 (Shadcn Space) ·{' '}
        <Link href="/#avaliacoes" className="underline underline-offset-4">
          ver versão atual (carrossel)
        </Link>
      </div>
      <TestimonialsMarquee />
    </main>
  );
}

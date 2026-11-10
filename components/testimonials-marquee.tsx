'use client';

// PRÉVIA (não usada na página): avaliações em duas faixas rolando em sentidos opostos, com o componente
// Shadcn Space "Marquee 01 - Testimonials" (components/shadcn-space/radix/animations/marquee.tsx). Texto completo,
// sem "Ler mais" (cartão que cresce quebraria a faixa); pausa no hover; parado com movimento reduzido.
import { Quote } from 'lucide-react';
import { Marquee } from '@/components/shadcn-space/radix/animations/marquee';
import { Autor, Estrelas, TopoAvaliacoes, lista } from '@/components/testimonials';
import type { Review } from '@/reviews';
import { cn } from '@/lib/utils';

const metade = Math.ceil(lista.length / 2);
const faixas = [lista.slice(0, metade), lista.slice(metade)];

function Cartao({ r }: { r: Review }) {
  return (
    <article
      className={cn(
        'relative flex w-[min(80vw,360px)] shrink-0 flex-col gap-4 rounded-3xl border p-6 transition-colors duration-300',
        r.destaque ? 'border-brand/35 bg-linear-to-b from-brand/[0.13] to-panel' : 'border-white/10 bg-panel hover:border-white/25',
      )}
    >
      <Quote className="absolute top-5 right-5 size-12 -scale-x-100 text-white/[0.05]" aria-hidden="true" />
      <div className="flex items-center gap-3">
        <Estrelas valor={r.nota} />
        {r.destaque && (
          <span className="rounded-full bg-brand px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-white uppercase">Destaque</span>
        )}
      </div>
      <p className="text-[15px] leading-relaxed text-white/85">{r.texto}</p>
      <footer className="mt-auto border-t border-white/10 pt-4">
        <Autor r={r} forte={r.destaque} />
      </footer>
    </article>
  );
}

export function TestimonialsMarquee() {
  return (
    <section id="avaliacoes" className="overflow-x-clip py-24 lg:py-32">
      <div className="container flex flex-col gap-12">
        <TopoAvaliacoes />
      </div>

      {/* faixas na largura total da tela, com as bordas esfumadas */}
      <div
        className="reveal mt-12 flex flex-col [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        aria-label="Avaliações de clientes"
        role="region"
      >
        {faixas.map((f, i) => (
          <Marquee key={i} pauseOnHover reverse={i === 1} repeat={3} className="[--duration:90s] [--gap:1rem] py-2 [&>div]:items-stretch">
            {f.map((r) => (
              <Cartao key={r.nome + r.quando} r={r} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

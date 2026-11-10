// Avaliações reais do Google Maps, copiadas à mão (reviews.ts), da mais recente para a mais antiga. Relato do
// Nadson em destaque grande e as demais em duas faixas rolando em sentidos opostos, com o componente Shadcn Space
// "Marquee 01 - Testimonials" (components/shadcn-space/radix/animations/marquee.tsx). Texto completo, sem
// "Ler mais" (cartão que cresce quebraria a faixa); pausa no hover; parado com movimento reduzido.
// Mario e Mateus em destaque. Sem nota média nem total: ainda não foram confirmados.
// A versão anterior em carrossel (Embla) está no commit 30dc84b.
import { ArrowUpRight, MapPin, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Marquee } from '@/components/shadcn-space/radix/animations/marquee';
import { SectionBadge, h2Class } from '@/components/section';
import { publicadas, type Review } from '@/reviews';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';

const principal = publicadas.find((r) => r.nome === 'Nadson Picanço')!;
const lista = publicadas.filter((r) => r !== principal);
const metade = Math.ceil(lista.length / 2);
const faixas = [lista.slice(0, metade), lista.slice(metade)];

function Estrelas({ valor, className }: { valor: number; className?: string }) {
  return (
    <span className={cn('flex gap-0.5', className)} role="img" aria-label={`${valor} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-4', i < valor ? 'fill-signal text-signal' : 'text-white/20')} aria-hidden="true" />
      ))}
    </span>
  );
}

function Autor({ r, forte }: { r: Review; forte?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className={cn(
          'grid size-11 shrink-0 place-items-center rounded-full text-lg font-extrabold font-stretch-semi-expanded',
          forte ? 'bg-brand text-white ring-4 ring-brand/20' : 'bg-white/[0.06] text-white/80 ring-1 ring-white/10',
        )}
        aria-hidden="true"
      >
        {r.nome[0].toUpperCase()}
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-semibold text-white">{r.nome}</span>
        <span className="flex flex-wrap items-center gap-x-1 text-xs text-white/50">
          {r.quando} ·
          <span className="flex items-center gap-1 whitespace-nowrap">
            <MapPin className="size-3" aria-hidden="true" /> Google Maps
          </span>
        </span>
      </div>
    </div>
  );
}

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

export function Testimonials() {
  return (
    <section id="avaliacoes" className="overflow-x-clip py-24 lg:py-32">
      <div className="container flex flex-col gap-14">
        <div className="reveal flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionBadge>Avaliações</SectionBadge>
            <h2 className={h2Class}>
              Quem trouxe o carro, <span className="text-brand">recomenda.</span>
            </h2>
            <p className="text-lg leading-relaxed text-white/70">Avaliações reais publicadas pelos clientes no perfil da SA Kaizen no Google Maps.</p>
          </div>
          <Button asChild size="lg" variant="outline" className="h-14 w-full rounded-full border-white/20 bg-transparent px-5 text-base hover:bg-white/5 sm:w-fit sm:px-7">
            <a href={siteConfig.google.perfil} target="_blank" rel="noopener">
              Ver todas as avaliações no Google Maps
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        {/* relato em destaque */}
        <figure className="reveal relative grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-brand/30 bg-linear-to-br from-brand/15 to-graphite p-8 sm:p-10 lg:grid-cols-[1fr_2fr] lg:gap-12 lg:p-12">
          <Quote className="absolute -top-2 right-6 size-28 text-brand/15" aria-hidden="true" />
          <div className="flex min-w-0 flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Diagnóstico certo</span>
            <Estrelas valor={principal.nota} className="[&_svg]:size-5" />
            <figcaption>
              <Autor r={principal} forte />
            </figcaption>
          </div>
          <blockquote className="relative min-w-0 text-base leading-relaxed whitespace-pre-line text-white/85 sm:text-xl">
            “{principal.texto}”
          </blockquote>
        </figure>
      </div>

      {/* faixas na largura total da tela, com as bordas esfumadas */}
      <div
        role="region"
        aria-label="Avaliações de clientes"
        className="reveal mt-14 flex flex-col [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        {faixas.map((f, i) => (
          <Marquee key={i} pauseOnHover reverse={i === 1} repeat={3} className="avaliacoes-faixa py-2 [--duration:90s] [--gap:1rem] [&>div]:items-stretch">
            {f.map((r) => (
              <Cartao key={r.nome + r.quando} r={r} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

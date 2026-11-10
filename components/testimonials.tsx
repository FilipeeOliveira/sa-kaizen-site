'use client';

// Avaliações reais do Google Maps, copiadas à mão (reviews.ts). Relato do Nadson em destaque grande e as
// demais num carrossel (shadcn/ui Carousel, Embla), da mais recente para a mais antiga; referências: slider do
// Shadcn Space "testimonial-02" e carrosséis da ReUI. Bordas esfumadas e cartões fora da área ativa apagados
// (o loop do Embla só preenche a área do carrossel, por isso nada passa da borda); rola sozinho devagar (loop) e a barra de progresso segue o movimento. Mario e Mateus em destaque.
// Sem nota média nem total: ainda não foram confirmados.
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Pause, Play, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useInView } from 'motion/react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { SectionBadge, h2Class } from '@/components/section';
import { publicadas, type Review } from '@/reviews';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils';

const principal = publicadas.find((r) => r.nome === 'Nadson Picanço')!;
export const lista = publicadas.filter((r) => r !== principal);
const dois = (n: number) => String(n).padStart(2, '0');

export function Estrelas({ valor, className }: { valor: number; className?: string }) {
  return (
    <span className={cn('flex gap-0.5', className)} role="img" aria-label={`${valor} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-4', i < valor ? 'fill-signal text-signal' : 'text-white/20')} aria-hidden="true" />
      ))}
    </span>
  );
}

export function Autor({ r, forte }: { r: Review; forte?: boolean }) {
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
  const [aberto, setAberto] = useState(false);
  const [longo, setLongo] = useState(false);
  const texto = useRef<HTMLParagraphElement>(null);

  // "Ler mais" só quando o texto não cabe nas 5 linhas (depende da largura do cartão)
  useEffect(() => {
    const medir = () => {
      const el = texto.current;
      if (el && !aberto) setLongo(el.scrollHeight > el.clientHeight + 1);
    };
    medir();
    addEventListener('resize', medir);
    return () => removeEventListener('resize', medir);
  }, [aberto]);

  // luz que acompanha o ponteiro (só a posição; a cor fica na classe)
  const luz = (e: React.PointerEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - b.top}px`);
  };

  return (
    <article
      onPointerMove={luz}
      className={cn(
        'group relative isolate flex h-full flex-col gap-5 overflow-hidden rounded-3xl border p-7 transition-colors duration-300',
        r.destaque ? 'border-brand/35 bg-linear-to-b from-brand/[0.13] to-panel' : 'border-white/10 bg-panel hover:border-white/20',
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(380px_circle_at_var(--x)_var(--y),rgba(225,29,42,.16),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <Quote className="absolute top-5 right-6 size-14 -scale-x-100 text-white/[0.05]" aria-hidden="true" />

      <div className="flex items-center gap-3">
        <Estrelas valor={r.nota} />
        {r.destaque && (
          <span className="rounded-full bg-brand px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-white uppercase">Destaque</span>
        )}
      </div>

      <div className="flex flex-col items-start gap-2">
        <p ref={texto} className={cn('text-[15px] leading-relaxed text-white/85 sm:text-base', !aberto && 'line-clamp-5')}>
          {r.texto}
        </p>
        {longo && (
          <button
            type="button"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            className="-my-1.5 py-1.5 text-sm font-semibold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
          >
            {aberto ? 'Ler menos' : 'Ler mais'}
          </button>
        )}
      </div>

      <footer className="mt-auto border-t border-white/10 pt-5">
        <Autor r={r} forte={r.destaque} />
      </footer>
    </article>
  );
}

// título, botão do Google Maps e relato em destaque (também usado na prévia do marquee)
export function TopoAvaliacoes() {
  return (
    <>
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
    </>
  );
}

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [atual, setAtual] = useState(1);
  const [pausado, setPausado] = useState(false);
  const barra = useRef<HTMLSpanElement>(null);
  const area = useRef<HTMLDivElement>(null);
  const visivel = useInView(area, { margin: '0px 0px -20% 0px' });
  // rolagem contínua e lenta; para com o mouse em cima, no foco ou no toque e volta depois. Movimento reduzido: sem plugin
  const [plugins] = useState(() =>
    typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
      ? []
      : [AutoScroll({ speed: 0.6, startDelay: 1200, playOnInit: false, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  const atualizar = useCallback((a: NonNullable<CarouselApi>) => {
    const vistos = a.slidesInView();
    if (!vistos.length) return;
    a.slideNodes().forEach((n, i) => n.toggleAttribute('data-fora', !vistos.includes(i)));
    setAtual(a.selectedScrollSnap() + 1);
  }, []);

  // só anda enquanto a seção está na tela (começa do mais recente quando o visitante chega)
  useEffect(() => {
    const auto = api?.plugins().autoScroll;
    if (!auto) return;
    if (visivel && !pausado) auto.play();
    else auto.stop();
  }, [api, visivel, pausado]);

  // setas: param a rolagem automática, vão para o próximo cartão e ela volta quando o movimento termina
  const ir = (lado: 'scrollPrev' | 'scrollNext') => {
    const auto = api?.plugins().autoScroll;
    if (auto?.isPlaying()) auto.reset();
    api?.[lado]();
  };

  useEffect(() => {
    if (!api) return;
    // a barra acompanha o arraste direto no DOM, sem re-renderizar a cada quadro
    const rolar = () => barra.current?.style.setProperty('--p', String(Math.max(0, Math.min(1, api.scrollProgress()))));
    const tudo = () => (atualizar(api), rolar());
    tudo();
    api.on('slidesInView', tudo).on('reInit', tudo).on('select', tudo).on('scroll', rolar);
    return () => {
      api.off('slidesInView', tudo).off('reInit', tudo).off('select', tudo).off('scroll', rolar);
    };
  }, [api, atualizar]);

  return (
    <section id="avaliacoes" className="overflow-x-clip py-24 lg:py-32">
      <div className="container flex flex-col gap-12">
        <TopoAvaliacoes />

        {/* carrossel: arrasta com mouse/dedo e setas do teclado; os cartões passam da borda direita do container */}
        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: true, inViewThreshold: 0.6 }}
          aria-label="Avaliações de clientes"
          plugins={plugins}
          className="reveal [&_[data-slot=carousel-content]]:[mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)]"
        >
          <CarouselContent ref={area} className="cursor-grab active:cursor-grabbing">
            {lista.map((r, i) => (
              <CarouselItem
                key={i}
                aria-label={`${i + 1} de ${lista.length}`}
                className="basis-[86%] transition-opacity duration-500 data-fora:opacity-35 sm:basis-1/2 lg:basis-1/3"
              >
                <Cartao r={r} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* leitura do carrossel: contador, barra de progresso e setas */}
          <div className="mt-8 flex items-center gap-5">
            <span className="shrink-0 font-mono text-sm tabular-nums">
              <span className="text-white">{dois(atual)}</span>
              <span className="text-white/35"> / {dois(lista.length)}</span>
            </span>
            <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <span ref={barra} className="absolute inset-0 origin-left scale-x-[max(var(--p,0),0.04)] rounded-full bg-brand" />
            </span>
            <div className="flex shrink-0 gap-2">
              {plugins.length > 0 && (
                <Button size="icon" variant="ghost" className="size-12 rounded-full text-white/70 hover:bg-white/5 hover:text-white" onClick={() => setPausado(!pausado)} aria-label={pausado ? 'Continuar rolagem automática' : 'Pausar rolagem automática'}>
                  {pausado ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                </Button>
              )}
              <Button size="icon" variant="outline" className="size-12 rounded-full border-white/20 bg-transparent hover:bg-white/5" onClick={() => ir('scrollPrev')} aria-label="Avaliações anteriores">
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Button>
              <Button size="icon" className="size-12 rounded-full" onClick={() => ir('scrollNext')} aria-label="Próximas avaliações">
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Carousel>

      </div>
    </section>
  );
}

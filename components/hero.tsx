'use client';

// Hero com a fachada grande. A partir de 1280px a foto ocupa a metade direita do hero até a borda da tela
// (ideia do bloco Shadcn Space "hero-02", imagem grande ancorada à direita) e some num degradê sob o texto; abaixo
// disso vira um cartão. Texto com entrada em CSS (.rise). Profundidade na rolagem como no hero do portfólio da
// Becca (motion, só transform); o HTML já sai na posição final e movimento reduzido deixa tudo parado.
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, Star } from 'lucide-react';
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons';
import { whatsapp } from '@/lib/contact';

const FACHADA = {
  src: '/img/fachada.webp',
  alt: 'Fachada da SA Kaizen ao entardecer, com o letreiro iluminado: SA Kaizen Diagnóstico Automotivo, (92) 98198-8108',
};

const sistemas = ['Motor', 'ABS', 'Airbag', 'Suspensão', 'Osciloscópio'];
const delay = (s: number) => ({ animationDelay: `${s}s` });

// coluna do texto: selo, título, chamada, botões e sistemas
function HeroTexto() {
  return (
    <div className="flex min-w-0 flex-col items-start gap-6">
      {/* prova social: leva às avaliações reais (sem nota média: ainda não confirmada) */}
      <a
        href="#avaliacoes"
        className="rise group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pr-4 pl-3 text-sm backdrop-blur transition-colors hover:border-signal/40"
        style={delay(0.04)}
      >
        <Star className="size-3.5 fill-signal text-signal" aria-hidden="true" />
        <span className="text-white/75">Veja o que os clientes dizem no Google Maps</span>
      </a>

      <h1 className="rise text-[clamp(2.1rem,1.3rem+3.9vw,4.6rem)] leading-[1.02] font-extrabold tracking-[-0.025em] text-balance font-stretch-semi-expanded" style={delay(0.12)}>
        Seu carro apresenta um problema? <span className="text-brand">Nós encontramos a causa.</span>
      </h1>

      <p className="rise max-w-[54ch] text-lg leading-relaxed text-white/75" style={delay(0.2)}>
        Diagnóstico automotivo especializado em Manaus. Tecnologia, precisão e conhecimento técnico para identificar
        problemas e orientar a solução correta para o seu veículo.
      </p>

      <div className="rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={delay(0.28)}>
        <Button asChild size="lg" className="h-14 rounded-full px-7 text-base font-semibold shadow-[0_10px_40px_-10px_rgba(225,29,42,.8)]">
          <a href={whatsapp()} target="_blank" rel="noopener">
            <WhatsAppIcon className="size-5" />
            Agendar diagnóstico pelo WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-transparent px-7 text-base hover:bg-white/5">
          <a href="#servicos">
            Ver serviços
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      <ul className="rise mt-2 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-[0.12em] text-white/55 uppercase" style={delay(0.36)} aria-label="Sistemas atendidos">
        {sistemas.map((s) => (
          <li key={s} className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-brand" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const foto = useTransform(p, [0, 1], [0, reduzido ? 0 : 120]);

  return (
    <LazyMotion features={domAnimation}>
      <section ref={ref} id="inicio" className="relative isolate overflow-hidden">
        {/* telas largas: foto grande à direita, até a borda da tela, sumindo sob o texto */}
        <m.div style={{ y: foto }} className="absolute inset-y-0 right-0 -z-20 hidden w-[62%] xl:block">
          <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000_50%)]">
            <Image src={FACHADA.src} alt={FACHADA.alt} fill priority sizes="62vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background" />
        </m.div>
        <div className="tech-grid absolute inset-0 -z-30" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_8%_85%,rgba(225,29,42,.2),transparent_70%)]" />

        <div className="container grid min-h-svh grid-cols-1 items-center gap-12 pt-28 pb-16 lg:pt-32 xl:grid-cols-[1.05fr_.95fr] xl:pb-24">
          <HeroTexto />

          {/* celular, tablet e telas até 1280px: a fachada num cartão */}
          <div className="rise relative aspect-[4/3] w-full max-w-xl overflow-hidden rounded-[28px] shadow-2xl ring-1 ring-white/15 xl:hidden">
            <Image src={FACHADA.src} alt={FACHADA.alt} fill sizes="(min-width: 640px) 576px, 92vw" className="object-cover" />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

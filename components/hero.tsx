// Layout em duas colunas inspirado no bloco Shadcn Space "hero-33"; no lugar do vídeo, a foto noturna
// da fachada desfocada ao fundo e a tela de diagnóstico à direita. Entrada em CSS (.rise).
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScopePanel } from '@/components/scope-panel';
import { SignalBackdrop } from '@/components/signal-backdrop';
import { WhatsAppIcon } from '@/components/icons';
import { whatsapp } from '@/lib/contact';

const sistemas = ['Motor', 'ABS', 'Airbag', 'Suspensão', 'Osciloscópio'];
const delay = (s: number) => ({ animationDelay: `${s}s` });

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <img src="/img/hero-bg.webp" alt="" className="absolute inset-0 -z-30 size-full object-cover opacity-35" />
      <div className="tech-grid absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_85%,rgba(225,29,42,.22),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background/70 via-background/40 to-background" />
      {/* sinal atravessando o fundo, numa faixa reservada abaixo do conteúdo (pb do container); fora do celular */}
      <SignalBackdrop className="-z-10 bottom-0 hidden md:block" />

      <div className="container grid min-h-svh grid-cols-1 items-center gap-12 pt-28 pb-16 md:pb-32 lg:pb-40 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:pt-32">
        <div className="flex min-w-0 flex-col items-start gap-6">
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

        <div className="rise min-w-0 lg:pl-4" style={delay(0.3)}>
          <ScopePanel />
        </div>
      </div>
    </section>
  );
}

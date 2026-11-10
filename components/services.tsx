'use client';

// Adaptado do bloco Shadcn Space "services-02" (lista interativa + painel de prévia, tema escuro).
// Mudanças: responde a clique, foco e toque (o original só tinha hover), expande no próprio item no mobile
// e cada serviço tem um WhatsApp com mensagem pronta.
import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons';
import { servicos, type Servico } from '@/content';
import { whatsapp } from '@/lib/contact';
import { cn } from '@/lib/utils';

const linkServico = (s: Servico) => whatsapp(`Olá! Vim pelo site e gostaria de falar sobre: ${s.titulo}.`);

function Detalhe({ s }: { s: Servico }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-base leading-relaxed text-white/75">{s.texto}</p>
      <div className="flex flex-col gap-2.5">
        <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Sinais comuns</p>
        <ul className="flex flex-col gap-2">
          {s.sinais.map((sinal) => (
            <li key={sinal} className="flex items-center gap-2.5 text-sm text-white/85">
              <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
              {sinal}
            </li>
          ))}
        </ul>
      </div>
      <Button asChild className="h-auto min-h-12 w-full rounded-full py-3 text-center font-semibold whitespace-normal sm:w-fit sm:px-6">
        <a href={linkServico(s)} target="_blank" rel="noopener">
          <WhatsAppIcon className="size-4" />
          Perguntar sobre {s.titulo.toLowerCase()}
        </a>
      </Button>
    </div>
  );
}

export function Services() {
  const [ativo, setAtivo] = useState(0);
  const Icone = servicos[ativo].icon;

  return (
    <section id="servicos" className="relative bg-graphite py-24 lg:py-32">
      <div className="container flex flex-col gap-14">
        <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-4">
            <Badge variant="outline" className="h-auto rounded-full border-white/15 px-3 py-1 font-mono text-xs tracking-[0.14em] text-white/70 uppercase">
              Serviços
            </Badge>
            <h2 className="text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance font-stretch-semi-expanded">
              O que diagnosticamos
            </h2>
            <p className="text-lg text-white/65">
              Do motor aos sistemas de segurança, a investigação começa pelo sintoma e termina na origem do problema.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <ul className="min-w-0 lg:col-span-7">
            {servicos.map((s, i) => {
              const aberto = ativo === i;
              return (
                <li key={s.id} className="border-t border-white/10 last:border-b">
                  <button
                    type="button"
                    onClick={() => setAtivo(i)}
                    onMouseEnter={() => setAtivo(i)}
                    onFocus={() => setAtivo(i)}
                    aria-expanded={aberto}
                    aria-controls={`servico-${s.id}`}
                    className="group relative flex w-full cursor-pointer items-center gap-5 py-6 text-left lg:py-7"
                  >
                    <span className={cn('absolute top-0 left-0 h-px bg-brand transition-all duration-500', aberto ? 'w-full' : 'w-0')} aria-hidden="true" />
                    <span className={cn('font-mono text-sm tabular-nums transition-colors', aberto ? 'text-brand' : 'text-white/35')}>0{i + 1}</span>
                    <span className="flex flex-1 flex-col gap-1">
                      <span className={cn('text-2xl font-bold tracking-tight transition-colors font-stretch-semi-expanded sm:text-3xl', aberto ? 'text-white' : 'text-white/60 group-hover:text-white')}>
                        {s.titulo}
                      </span>
                      <span className="text-sm text-white/50">{s.resumo}</span>
                    </span>
                    <Plus className={cn('size-5 shrink-0 text-white/50 transition-transform duration-300 lg:hidden', aberto && 'rotate-45 text-brand')} aria-hidden="true" />
                  </button>
                  {/* mobile: detalhe abre no próprio item */}
                  <div id={`servico-${s.id}`} className={cn('pb-8 sm:pl-10 lg:hidden', !aberto && 'hidden')}>
                    <Detalhe s={s} />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* desktop: painel de prévia fixo ao lado da lista */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 flex flex-col gap-6 rounded-2xl border border-white/10 bg-panel p-8">
              <div className="relative grid size-20 place-items-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/30">
                <Icone className="size-9" aria-hidden="true" />
                <span className="absolute inset-0 rounded-2xl shadow-[0_0_40px_-6px_rgba(225,29,42,.6)]" aria-hidden="true" />
              </div>
              {/* todos os serviços na mesma célula da grade: a altura é a do mais longo e não muda ao trocar;
                  o ativo aparece com fade e os demais ficam invisíveis (fora do foco e do leitor de tela) */}
              <div className="grid">
                {servicos.map((s, i) => (
                  <div
                    key={s.id}
                    className={cn(
                      'col-start-1 row-start-1 flex flex-col gap-6 transition-[opacity,visibility]',
                      // o que sai some rápido e o que entra aparece logo depois: sem textos sobrepostos no meio da troca
                      ativo === i ? 'visible opacity-100 delay-100 duration-300' : 'invisible opacity-0 duration-100',
                    )}
                  >
                    <h3 className="text-3xl font-bold tracking-tight font-stretch-semi-expanded">{s.titulo}</h3>
                    <Detalhe s={s} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

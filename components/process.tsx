// Seção "Como funciona": etapas do atendimento em cartões numerados.
import { CalendarCheck, ClipboardCheck, MessageCircle, ScanSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons';
import { SectionBadge, h2Class } from '@/components/section';
import { passos } from '@/content';
import { whatsapp } from '@/lib/contact';

const icones = [MessageCircle, CalendarCheck, ScanSearch, ClipboardCheck];

export function ProcessSection({ id = 'como-funciona', children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 lg:py-32">
      <div className="container flex flex-col gap-14">
        <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionBadge>Como funciona</SectionBadge>
            <h2 className={h2Class}>Do primeiro contato ao resultado</h2>
          </div>
          <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-transparent px-6 hover:bg-white/5">
            <a href={whatsapp()} target="_blank" rel="noopener">
              <WhatsAppIcon className="size-4" />
              Começar pelo WhatsApp
            </a>
          </Button>
        </div>
        {children}
      </div>
    </section>
  );
}

// Versão atual: 4 cartões numerados
export function ProcessCards() {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {passos.map((p, i) => {
        const Icone = icones[i];
        return (
          <li key={p.titulo} className="reveal group relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-graphite p-7 transition-colors hover:border-brand/40">
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/25">
                <Icone className="size-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-4xl font-medium text-white/10 tabular-nums transition-colors group-hover:text-brand/40">0{i + 1}</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight font-stretch-semi-expanded">{p.titulo}</h3>
            <p className="text-sm leading-relaxed text-white/60">{p.texto}</p>
          </li>
        );
      })}
    </ol>
  );
}

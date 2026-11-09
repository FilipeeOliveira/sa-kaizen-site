// Adaptado do bloco Shadcn Space "faq-01" (acordeão). As perguntas também viram dados estruturados
// FAQPage no layout, para o Google.
import { PlusIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { faq } from '@/content';

export function Faq() {
  return (
    <section id="duvidas" className="py-24 lg:py-32">
      <div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="reveal flex flex-col items-start gap-4">
          <Badge variant="outline" className="h-auto rounded-full border-white/15 px-3 py-1 font-mono text-xs tracking-[0.14em] text-white/70 uppercase">
            Dúvidas frequentes
          </Badge>
          <h2 className="text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance font-stretch-semi-expanded">
            Antes de trazer o seu carro
          </h2>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="flex w-full flex-col gap-3">
          {faq.map((f, i) => (
            <AccordionItem
              key={f.pergunta}
              value={`item-${i}`}
              className="group/item flex flex-col gap-3 rounded-2xl border border-white/10 p-5 transition-colors data-open:border-brand/40 data-open:bg-panel sm:p-6"
            >
              <AccordionTrigger className="cursor-pointer items-center p-0 text-lg font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden sm:text-xl">
                {f.pergunta}
                <PlusIcon className="size-5 shrink-0 text-brand transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
              </AccordionTrigger>
              <AccordionContent className="p-0 text-base leading-relaxed text-white/70">{f.resposta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

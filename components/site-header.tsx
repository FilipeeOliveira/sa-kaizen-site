'use client';

// Adaptado do navbar do bloco Shadcn Space "hero-33": translúcido sobre o hero, com telefone e CTA,
// e menu lateral (Sheet) no mobile.
import { useEffect, useState } from 'react';
import { LazyMotion, domMax, m } from 'motion/react';
import { ChevronRight, Equal, Phone, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { telefone, telHref, whatsapp } from '@/lib/contact';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/use-active-section';

const links = [
  { title: 'Serviços', href: '#servicos' },
  { title: 'Como funciona', href: '#como-funciona' },
  { title: 'Sobre', href: '#sobre' },
  { title: 'Avaliações', href: '#avaliacoes' },
  { title: 'Localização', href: '#localizacao' },
];
const ids = links.map((l) => l.href.slice(1));

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const ativo = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-border bg-background/85 backdrop-blur-lg' : 'border-transparent bg-transparent',
      )}
    >
      <nav className="container flex h-18 items-center justify-between gap-4" aria-label="Principal">
        <div className="flex items-center gap-6">
          <a href="#inicio" className="shrink-0 text-[15px]" aria-label="SA Kaizen, início">
            <Logo />
          </a>
          <Separator orientation="vertical" className="my-auto hidden h-6 bg-foreground/20 lg:block" />
          {/* seção ativa destacada; o fundo desliza de um link para o outro (motion layoutId) */}
          <LazyMotion features={domMax}>
            <div className="hidden items-center gap-1 lg:flex">
              {links.map((l) => {
                const atual = ativo === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    aria-current={atual ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:text-foreground',
                      atual ? 'text-foreground' : 'text-foreground/70',
                    )}
                  >
                    {atual && (
                      <m.span
                        layoutId="menu-ativo"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/10"
                        aria-hidden="true"
                      />
                    )}
                    {l.title}
                  </a>
                );
              })}
            </div>
          </LazyMotion>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {/* telefone só a partir de 1280px: em 1024px o menu não cabia numa linha */}
          <a href={telHref} className="hidden items-center gap-2 text-sm whitespace-nowrap xl:flex text-foreground/85 transition-colors hover:text-foreground">
            <Phone className="size-4 text-brand" aria-hidden="true" />
            {telefone}
          </a>
          <Button asChild className="group h-10 rounded-full px-5 font-semibold">
            <a href={whatsapp()} target="_blank" rel="noopener">
              Agendar diagnóstico
              <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="secondary" className="size-11 rounded-full lg:hidden" aria-label="Abrir menu">
              <Equal className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="flex flex-col gap-8 border-l border-border bg-background p-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetHeader className="flex-row items-center justify-between p-0">
              <SheetClose asChild>
                <a href="#inicio" className="text-sm" aria-label="SA Kaizen, início">
                  <Logo />
                </a>
              </SheetClose>
              <SheetClose className="flex size-10 items-center justify-center rounded-full border border-border" aria-label="Fechar menu">
                <X size={16} />
              </SheetClose>
            </SheetHeader>
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <SheetClose key={l.href} asChild>
                  <a
                    href={l.href}
                    aria-current={ativo === l.href.slice(1) ? 'true' : undefined}
                    className={cn(
                      'rounded-lg px-3 py-3 text-2xl font-bold tracking-tight font-stretch-semi-expanded transition-colors hover:bg-white/5',
                      ativo === l.href.slice(1) && 'text-brand',
                    )}
                  >
                    {l.title}
                  </a>
                </SheetClose>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <a href={telHref} className="flex items-center gap-2 text-foreground/85">
                <Phone className="size-4 text-brand" aria-hidden="true" />
                {telefone}
              </a>
              <Button asChild className="h-12 w-full rounded-full font-semibold">
                <a href={whatsapp()} target="_blank" rel="noopener">Agendar pelo WhatsApp</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

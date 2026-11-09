'use client';

// Atalho de WhatsApp que aparece depois do hero: barra fixa no rodapé (mobile) e botão redondo (desktop)
import { useEffect, useState } from 'react';
import { WhatsAppIcon } from '@/components/icons';
import { whatsapp } from '@/lib/contact';
import { cn } from '@/lib/utils';

export function WhatsAppFloat() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsapp()}
      target="_blank"
      rel="noopener"
      aria-label="Agendar diagnóstico pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      className={cn(
        'fixed z-40 flex items-center justify-center gap-2 bg-brand font-semibold text-white shadow-[0_10px_40px_-8px_rgba(225,29,42,.9)] transition-[transform,opacity] duration-300',
        'inset-x-4 bottom-4 h-14 rounded-full lg:inset-x-auto lg:right-6 lg:bottom-6 lg:size-16',
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <WhatsAppIcon className="size-6 lg:size-7" />
      <span className="lg:sr-only">Agendar diagnóstico pelo WhatsApp</span>
    </a>
  );
}

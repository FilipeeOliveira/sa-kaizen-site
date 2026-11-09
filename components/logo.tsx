// Logo PROVISÓRIO em tipografia, inspirado na fachada: "SA" vermelho itálico, "KAIZEN" branco largo
// e o símbolo de motor (luz de injeção) em amarelo. Trocar pela logomarca oficial quando houver.
import { cn } from '@/lib/utils';

export function EngineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 7h3V5H7V3h10v2h-2v2h6l3 3h2V8h4v12h-4v-2h-2l-3 4H9l-3-3H4v2H1V11h3V9h2z"
      />
      {/* raio recortado no bloco do motor */}
      <path fill="var(--background)" d="M16.5 8.5 12 15h3.2l-1.7 5.5 5.5-7.4h-3.3l2-4.6z" />
    </svg>
  );
}

export function Logo({ className, subtitulo = false }: { className?: string; subtitulo?: boolean }) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span className="inline-flex items-center gap-[0.18em] text-[1.6em]">
        <span className="font-black text-brand italic tracking-[-0.04em]">SA</span>
        <span className="font-extrabold tracking-[0.02em] text-white font-stretch-expanded">KAIZEN</span>
        <EngineIcon className="ml-[0.05em] h-[0.78em] w-auto text-signal" />
      </span>
      {subtitulo && (
        <span className="mt-[0.35em] pl-[0.1em] text-[0.62em] font-semibold tracking-[0.28em] text-white/70 uppercase">
          Diagnóstico automotivo
        </span>
      )}
      <span className="sr-only">SA Kaizen Diagnóstico Automotivo</span>
    </span>
  );
}

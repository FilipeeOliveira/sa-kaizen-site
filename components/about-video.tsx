'use client';

// Vídeo vertical da oficina (public/video/oficina.mp4, 720x1280, 49s, recomprimido para ~5 MB) para a seção Sobre.
// Sem som e em loop; só baixa e toca quando aparece na tela e pausa ao sair. Botões de play/pausa e de som.
// Movimento reduzido: não começa sozinho (mostra a capa com o botão de play).
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const botao = 'grid size-11 place-items-center rounded-full bg-black/55 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-black/75';

export function VideoOficina() {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const [mudo, setMudo] = useState(true);
  const pausadoPeloUsuario = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) v.pause();
        else if (!reduzido && !pausadoPeloUsuario.current) v.play().catch(() => {});
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function alternar() {
    const v = ref.current;
    if (!v) return;
    pausadoPeloUsuario.current = !v.paused;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  function som() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMudo(v.muted);
    if (!v.muted && v.paused) {
      pausadoPeloUsuario.current = false;
      v.play().catch(() => {});
    }
  }

  return (
    <div className="reveal relative mx-auto w-full max-w-[380px] lg:justify-self-center">
      {/* brilho vermelho atrás do quadro */}
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(225,29,42,.22),transparent_70%)]" aria-hidden="true" />

      <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] ring-1 ring-white/10">
        <video
          ref={ref}
          poster="/video/oficina-capa.webp"
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          aria-label="Vídeo da SA Kaizen por dentro: recepção, área de serviço, equipamentos de diagnóstico e entrega do carro ao cliente"
          className="absolute inset-0 size-full object-cover"
        >
          <source src="/video/oficina.mp4" type="video/mp4" />
        </video>

        <span className="absolute top-3 left-3 flex h-11 items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white uppercase ring-1 ring-white/15 backdrop-blur">
          <span className={cn('size-1.5 rounded-full bg-brand', tocando && 'animate-pulse')} aria-hidden="true" />
          A oficina por dentro
        </span>

        {/* play grande enquanto está parado */}
        {!tocando && (
          <button
            type="button"
            onClick={alternar}
            className="absolute inset-0 grid place-items-center bg-black/25 transition-colors hover:bg-black/15"
            aria-label="Assistir ao vídeo da oficina"
          >
            <span className="grid size-18 place-items-center rounded-full bg-brand text-white shadow-[0_10px_40px_-8px_rgba(225,29,42,.9)]">
              <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
            </span>
          </button>
        )}

        {/* posições fixas: o botão de pausa aparece sem empurrar o de som */}
        {tocando && (
          <button type="button" onClick={alternar} className={cn(botao, 'absolute top-3 right-17')} aria-label="Pausar vídeo">
            <Pause className="size-4 fill-current" aria-hidden="true" />
          </button>
        )}
        <button type="button" onClick={som} className={cn(botao, 'absolute top-3 right-4')} aria-label={mudo ? 'Ligar o som' : 'Desligar o som'} aria-pressed={!mudo}>
          {mudo ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

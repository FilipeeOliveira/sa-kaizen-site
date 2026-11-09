// Fundo do hero: um sinal de diagnóstico atravessando a tela inteira, rolando devagar.
// Decorativo (SVG + CSS, sem JS). O padrão tem 1600 de largura e é desenhado 2x para o loop.

// Trecho estável, rajada de pulsos, oscilação amortecida, pico isolado: lembra uma leitura real
function sinal(y0: number, escala: number) {
  const pts: string[] = [];
  const add = (x: number, y: number) => pts.push(`${x.toFixed(1)} ${(y0 + y * escala).toFixed(1)}`);
  for (let c = 0; c < 2; c++) {
    const o = c * 1600;
    add(o, 0);
    add(o + 180, 0);
    // rajada de pulsos quadrados
    for (let i = 0; i < 6; i++) {
      const x = o + 180 + i * 28;
      add(x, -38); add(x + 14, -38); add(x + 14, 0); add(x + 28, 0);
    }
    add(o + 520, 0);
    // oscilação amortecida
    for (let x = 0; x <= 260; x += 4) add(o + 520 + x, -Math.sin((x / 260) * Math.PI * 9) * 46 * Math.exp(-x / 110));
    add(o + 980, 0);
    // pico isolado
    add(o + 1000, -70); add(o + 1012, 26); add(o + 1024, 0);
    add(o + 1260, 0);
    // ondulação suave
    for (let x = 0; x <= 200; x += 5) add(o + 1260 + x, -Math.sin((x / 200) * Math.PI * 2) * 14);
    add(o + 1600, 0);
  }
  return 'M' + pts.join(' L');
}

const principal = sinal(96, 1);
const eco = sinal(128, 0.45);

export function SignalBackdrop({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-[170px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] ${className}`}
    >
      <div className="signal-scroll absolute inset-y-0 left-0 w-[max(200%,3200px)]">
        <svg viewBox="0 0 3200 170" preserveAspectRatio="none" className="size-full">
          <path d={eco} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <path
            d={principal}
            fill="none"
            stroke="var(--brand)"
            strokeOpacity=".45"
            strokeWidth="1.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'drop-shadow(0 0 6px rgba(225,29,42,.55))' }}
          />
        </svg>
      </div>
    </div>
  );
}

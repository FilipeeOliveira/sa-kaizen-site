// Ilustração de tela de diagnóstico (osciloscópio + leitura dos sistemas). Decorativa: SVG e CSS, sem JS.

// Canal 1: sinal de rotação em onda quadrada com a falha de dentes (padrão clássico de roda fônica).
// Um ciclo tem 400 de largura; o SVG desenha 2 ciclos e o CSS desloca metade, em loop.
function sinalRotacao() {
  let d = 'M0 70';
  let x = 0;
  for (let ciclo = 0; ciclo < 2; ciclo++) {
    for (let dente = 0; dente < 22; dente++) {
      d += ` L${x} 30 L${x + 8} 30 L${x + 8} 70 L${x + 16} 70`;
      x += 16;
    }
    d += ` L${x + 48} 70`; // falha de dentes
    x += 48;
  }
  return d;
}

// Canal 2: sinal senoidal suave
function sinalSeno() {
  const pts: string[] = [];
  for (let x = 0; x <= 800; x += 8) pts.push(`${x} ${78 + Math.sin((x / 400) * Math.PI * 6) * 9}`);
  return 'M' + pts.join(' L');
}

const sistemas = ['Motor', 'ABS', 'Airbag', 'Suspensão'];

export function ScopePanel() {
  return (
    <div aria-hidden="true" className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-panel/85 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase">
        <span>Diagnóstico · Canal 1</span>
        <span className="inline-flex items-center gap-2 text-white/80">
          <span className="size-2 animate-pulse rounded-full bg-brand" />
          Leitura
        </span>
      </div>

      <div className="scope-grid relative aspect-[16/9] overflow-hidden bg-black/70">
        <div className="wave-scroll absolute inset-y-0 left-0 w-[200%]">
          <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="size-full">
            <path d={sinalSeno()} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <path d={sinalRotacao()} fill="none" stroke="var(--brand)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 4px rgba(225,29,42,.8))' }} />
          </svg>
        </div>
        <div className="scan-sweep absolute inset-y-0 left-0 w-[10%] bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <span className="absolute top-2 left-3 font-mono text-[10px] text-brand">CH1 5V/div</span>
        <span className="absolute top-2 right-3 font-mono text-[10px] text-white/45">10ms/div</span>
        <span className="absolute bottom-2 left-3 font-mono text-[10px] text-white/45">CH2 2V/div</span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/10">
        {sistemas.map((s, i) => (
          <div key={s} className="flex flex-col gap-2 bg-panel px-4 py-3">
            <span className="flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-white/60 uppercase">
              {s}
              <span className="text-white/35">0{i + 1}</span>
            </span>
            <span className="h-1 overflow-hidden rounded-full bg-white/10">
              <span className="scan-bar block h-full rounded-full bg-brand" style={{ animationDelay: `${i * 0.45}s` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

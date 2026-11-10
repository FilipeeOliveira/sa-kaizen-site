# SA Kaizen Diagnóstico Automotivo - landing page (protótipo comercial)

Landing page para apresentar ao cliente (oficina de diagnóstico automotivo em Manaus - AM). Objetivo: gerar contatos pelo WhatsApp. Ainda é demonstração; se aprovada, recebe logo oficial, fotos e conteúdo definitivo.

## Stack e publicação
- Next.js 16 (App Router) com `output: 'export'` e `distDir: 'dist'`, Tailwind v4, shadcn/ui (estilo radix-nova), lucide-react, `motion`, `embla-carousel-react` + `embla-carousel-auto-scroll` (carrossel das avaliações). TypeScript 5 estrito (não usar TS 7: o typescript-eslint ainda não suporta).
- `npm run lint` (ESLint flat do Next 16, em `eslint.config.mjs`) deve passar sem avisos. `app/sitemap.ts` e `app/robots.ts` geram os arquivos no build (`dynamic = 'force-static'`).
- `npm run dev` para desenvolver; `npm run build` gera `dist/` estático.
- Publicação: build LOCAL e enviar o conteúdo de `dist/` para a hospedagem. Não usar build no servidor da Hostinger (glibc antiga, o SWC do Next 16 não roda).
- Git: branch `develop`, remoto https://github.com/FilipeeOliveira/sa-kaizen-site (público). Commit/push só quando o usuário pedir.

## Onde está cada coisa
- `site.config.ts`: WhatsApp (5592981988108), Instagram, endereço (R. Tailândia, 485 - Flores, Manaus - AM, 69028-191), horário, mapa (embed oficial do Google Maps), domínio.
- `content.ts`: serviços, passos do "Como funciona" e FAQ.
- `reviews.ts`: avaliações REAIS do Google Maps copiadas à mão (texto original, da mais recente para a mais antiga, `destaque`, `incompleto`, `coletadoEm`). Só aparecem as com texto completo (`publicadas`).
- `site.config.ts` > `google.perfil`: link do perfil no Google Maps (botão "Ver todas as avaliações").
- `lib/contact.ts`: links de WhatsApp (com mensagem pronta), telefone formatado, mapa.
- `app/page.tsx`: seções (faixa de sistemas, "Trocar peça sem diagnóstico...", serviços, como funciona, sobre, localização, FAQ, CTA final, rodapé).
- `app/layout.tsx`: SEO local (título, descrição, Open Graph, JSON-LD AutoRepair + FAQPage).
- `app/globals.css`: tema escuro único e animações. Cores: `--brand` #e11d2a (vermelho do "SA"), `--signal` #f5c400 (amarelo, só no símbolo do motor), `--graphite`, `--panel`. Fontes: Archivo (eixo de largura; títulos com `font-stretch-semi-expanded`) e JetBrains Mono (leituras técnicas).
- `components/`: `hero.tsx` + `scope-panel.tsx` (tela de osciloscópio) + `signal-backdrop.tsx` (onda no fundo, oculta no celular), `site-header.tsx`, `services.tsx`, `process.tsx`, `faq.tsx`, `logo.tsx` (logo provisória em tipografia), `whatsapp-float.tsx`, `icons.tsx`, `section.tsx`.
- Origem: cabeçalho/layout do hero adaptados do Shadcn Space `hero-33`, serviços do `services-02` (com clique/foco/toque), FAQ do `faq-01`.

## Regras e decisões do usuário
- NUNCA usar travessão (— ou –) em nenhum texto do site (inclusive meta tags e alt). Usar hífen "-" ou reescrever com vírgula/dois-pontos/ponto. Conferir com `grep -rn "[—–]" app components content.ts site.config.ts lib`.
- Não inventar especializações, certificações, equipamentos, prazos ou preços. Serviços confirmados (bio do Instagram): motor, ABS, airbag, suspensão, diagnóstico avançado com osciloscópio, "e muito mais".
- Animações: entradas em CSS (`.rise`, `.reveal`). `motion` é usado com estes cuidados: nada de conteúdo invisível no HTML esperando JS (`initial={false}` ou valor final no HTML); `LazyMotion` + `m` (`domAnimation`, ou `domMax` para `layoutId`); `MotionConfig reducedMotion="user"`; só `transform`/`opacity`.
  - Onde: menu (fundo da seção ativa desliza, `layoutId`).
- Avaliações (`components/testimonials.tsx`): relato do Nadson em destaque, demais num carrossel shadcn `components/ui/carousel.tsx` (Embla; rola sozinho devagar com `embla-carousel-auto-scroll` em loop, só com a seção na tela, para no hover/foco/toque e tem botão de pausar; sem rolagem automática com movimento reduzido; arrasta com mouse/dedo; bordas esfumadas; cartões fora da área ativa apagados via `data-fora`; contador "01 / 13"; barra de progresso; luz no hover. Não deixar cartões passarem da borda: o loop do Embla só preenche a área do carrossel e aparece um buraco), "Ler mais" só quando o texto passa de 5 linhas. O `carousel.tsx` tem um `eslint-disable` na linha do shadcn (`set-state-in-effect`). Nunca editar os textos dos clientes nem inventar avaliações. Não mostrar nota média nem total enquanto não forem confirmados. O aviso de coleta manual foi removido a pedido; as datas ("3 dias atrás") ficam congeladas, então atualizar `reviews.ts` de tempos em tempos.
- Painéis que trocam conteúdo: o que sai some rápido e o que entra aparece com pequeno atraso (sem textos sobrepostos).
- Containers que trocam conteúdo devem ter altura estável (ex.: painel de serviços empilha todos na mesma célula da grade).
- Grids: sempre `grid-cols-1` no mobile + `min-w-0` nos filhos (sem isso houve rolagem horizontal).
- "Como funciona" fica com os 4 cartões. Uma timeline/rota animada (ReUI) foi testada e REPROVADA; não reintroduzir sem pedido.
- Etiqueta "Diagnóstico automotivo em Manaus - AM" acima do título do hero foi removida a pedido.

## Verificação antes de entregar
- `npm run build` sem erros.
- Testar no Chrome headless (Playwright em `~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome`) via CDP: sem rolagem horizontal em 320, 390, 768, 1024, 1440 e 2560px; CLS 0; olhar capturas reais (o `--screenshot` direto do Chrome congela animações CSS; usar CDP com espera real).

## Pendências (confirmar com o cliente)
- **Prévia isolada `/previa/avaliacoes-marquee`** (avaliações em duas faixas com o Marquee 01 do Shadcn Space) aguardando aprovação. Arquivos: `app/previa/`, `components/testimonials-marquee.tsx`, `components/shadcn-space/radix/animations/marquee.tsx` (keyframes renomeados para `marquee-x`/`marquee-y` para não colidir com o `marquee` do globals.css). Se reprovada, apagar os três; se aprovada, trocar `<Testimonials />` em `app/page.tsx` e apagar `app/previa/`. Não subir `dist/previa` para a hospedagem.
- Avaliações marcadas `incompleto` em `reviews.ts` (texto cortado na captura) ficam fora do site até alguém copiar o texto inteiro. Atualizar `reviews.ts` e `coletadoEm` de tempos em tempos. Opção futura com sincronização: Places API (New) via endpoint PHP na Hostinger (no máximo 5 avaliações, sem armazenar, chave + faturamento, limite de cota diário).
- Logo oficial, horário de funcionamento, domínio final.
- Descrições dos serviços são provisórias.
- Fotos são de baixa resolução (640 e 802px); pedir fotos/vídeo em alta para o hero.
- A foto noturna mostra "98108-8108" no letreiro; o número correto (dia e Instagram) é 98198-8108.
- Nota média e total de avaliações do Google: não confirmados, por isso não aparecem no site (nem no selo do hero).

## MCPs disponíveis
- shadcnspace (blocos; usar `listFreeBlocks`/`getBlockInstall`, instalar com `npx shadcn@latest add @shadcn-space/radix/<bloco>`).
- ReUI (componentes; `search`, `get_component`, `get_examples`). Avaliado; nenhum componente ficou no projeto.

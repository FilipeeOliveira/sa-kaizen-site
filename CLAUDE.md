# SA Kaizen Diagnóstico Automotivo - landing page (protótipo comercial)

Landing page para apresentar ao cliente (oficina de diagnóstico automotivo em Manaus - AM). Objetivo: gerar contatos pelo WhatsApp. Ainda é demonstração; se aprovada, recebe logo oficial, fotos e conteúdo definitivo.

## Stack e publicação
- Next.js 16 (App Router) com `output: 'export'` e `distDir: 'dist'`, Tailwind v4, shadcn/ui (estilo radix-nova), lucide-react, `motion`. TypeScript 5 estrito (não usar TS 7: o typescript-eslint ainda não suporta).
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
- `components/`: `hero.tsx` (fachada grande, ver abaixo), `about.tsx` + `about-video.tsx`, `testimonials.tsx`, `site-header.tsx`, `services.tsx`, `process.tsx`, `faq.tsx`, `logo.tsx` (logo provisória em tipografia), `whatsapp-float.tsx`, `icons.tsx`, `section.tsx`.
- Origem: cabeçalho adaptado do Shadcn Space `hero-33`, foto grande do hero inspirada no `hero-02`, serviços do `services-02` (com clique/foco/toque), FAQ do `faq-01`, avaliações com o `marquee-01`.

## Regras e decisões do usuário
- NUNCA usar travessão (— ou –) em nenhum texto do site (inclusive meta tags e alt). Usar hífen "-" ou reescrever com vírgula/dois-pontos/ponto. Conferir com `grep -rn "[—–]" app components content.ts site.config.ts lib`.
- Não inventar especializações, certificações, equipamentos, prazos ou preços. Serviços confirmados (bio do Instagram): motor, ABS, airbag, suspensão, diagnóstico avançado com osciloscópio, "e muito mais".
- Animações: entradas em CSS (`.rise`, `.reveal`). `motion` é usado com estes cuidados: nada de conteúdo invisível no HTML esperando JS (`initial={false}` ou valor final no HTML); `LazyMotion` + `m` (`domAnimation`, ou `domMax` para `layoutId`); `MotionConfig reducedMotion="user"`; só `transform`/`opacity`.
  - Onde: menu (fundo da seção ativa desliza, `layoutId`).
- Sobre (`components/about.tsx` + `components/about-video.tsx`): vídeo vertical da oficina (`public/video/oficina.mp4`, 720x1280, 49s, recomprimido de 10,4 para 5,4 MB com CRF 32; capa `oficina-capa.webp`, quadro da recepção). `preload="none"`: só baixa e toca (sem som, em loop) quando aparece na tela e pausa ao sair; botões de pausa e som no alto à direita (a marca d'água do vídeo fica embaixo); com movimento reduzido não começa sozinho. As fotos antigas da fachada que ficavam no Sobre estão no commit `30dc84b`.
- Hero (`components/hero.tsx`, client): a partir de 1280px a fachada ocupa a metade direita até a borda da tela, some num degradê (`mask-image`) sob o texto e desce mais devagar ao rolar (motion `useScroll`, só `y`); abaixo de 1280px vira um cartão 4:3 depois dos botões. Sem mira, endereço, cartão do scanner nem painel do osciloscópio (removidos a pedido; o painel e a onda de fundo estão no commit `30dc84b`).
- Avaliações (`components/testimonials.tsx`): relato do Nadson em destaque e as demais em duas faixas rolando em sentidos opostos com o componente Shadcn Space "Marquee 01 - Testimonials" (`components/shadcn-space/radix/animations/marquee.tsx`; keyframes renomeados para `marquee-x`/`marquee-y` para não colidir com o `marquee` do globals.css, cópias com `aria-hidden`, parado com movimento reduzido). Texto completo nos cartões (sem "Ler mais"), pausa no hover. Nunca editar os textos dos clientes nem inventar avaliações. Não mostrar nota média nem total enquanto não forem confirmados. A versão anterior em carrossel (Embla, rolagem automática) está no commit `30dc84b`.
- Painéis que trocam conteúdo: o que sai some rápido e o que entra aparece com pequeno atraso (sem textos sobrepostos).
- Containers que trocam conteúdo devem ter altura estável (ex.: painel de serviços empilha todos na mesma célula da grade).
- Menu do topo: links com `whitespace-nowrap`; telefone só a partir de `xl` (em 1024px não cabia e o botão era cortado).
- Grids: sempre `grid-cols-1` no mobile + `min-w-0` nos filhos (sem isso houve rolagem horizontal).
- Ritmo: seções com `py-24 lg:py-32` e `gap-14` entre blocos; fundos alternados (escuro / `bg-graphite`): Serviços, Sobre e Localização em grafite. No tablet, painel do hero e fotos do Sobre limitados a `max-w-xl`.
- Movimento reduzido: o CSS global zera as animações; a faixa de avaliações vira rolagem lateral (`.avaliacoes-faixa` em globals.css) para os cartões continuarem acessíveis.
- "Como funciona" fica com os 4 cartões. Uma timeline/rota animada (ReUI) foi testada e REPROVADA; não reintroduzir sem pedido.
- Etiqueta "Diagnóstico automotivo em Manaus - AM" acima do título do hero foi removida a pedido.

## Verificação antes de entregar
- `npm run build` sem erros.
- Testar no Chrome headless (Playwright em `~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome`) via CDP: sem rolagem horizontal em 320, 390, 768, 1024, 1440 e 2560px; CLS 0; olhar capturas reais (o `--screenshot` direto do Chrome congela animações CSS; usar CDP com espera real).

## Pendências (confirmar com o cliente)
- O vídeo confirma o endereço "Rua Tailândia, nº 485 - Parque das Nações, Flores" (o site mostra só Flores) e o telefone (92) 98198-8108.
- Avaliações marcadas `incompleto` em `reviews.ts` (texto cortado na captura) ficam fora do site até alguém copiar o texto inteiro. Atualizar `reviews.ts` e `coletadoEm` de tempos em tempos. Opção futura com sincronização: Places API (New) via endpoint PHP na Hostinger (no máximo 5 avaliações, sem armazenar, chave + faturamento, limite de cota diário).
- Logo oficial, horário de funcionamento, domínio final.
- Descrições dos serviços são provisórias.
- Fotos antigas são de baixa resolução (640 e 802px); a fachada nova já está em boa resolução.
- Foto da fachada ao entardecer (`public/img/fachada.webp`, 1600x900, original em `/home/north/Imagens/kaizen/frente.png`) com o número correto 98198-8108: usada no hero, no JSON-LD e no `og-image.jpg` (recomposto com ela). As fotos antigas (noturna com o número errado "98108" e a de dia) foram removidas do site.
- Nota média e total de avaliações do Google: não confirmados, por isso não aparecem no site (nem no selo do hero).

## MCPs disponíveis
- shadcnspace (blocos; usar `listFreeBlocks`/`getBlockInstall`, instalar com `npx shadcn@latest add @shadcn-space/radix/<bloco>`).
- ReUI (componentes; `search`, `get_component`, `get_examples`). Avaliado; nenhum componente ficou no projeto.

# SA Kaizen Diagnóstico Automotivo - landing page (protótipo)

Next.js com exportação estática, Tailwind v4 e shadcn/ui. Não precisa de servidor Node em produção.

```bash
npm install
npm run dev     # desenvolvimento: http://localhost:3000
npm run build   # gera a pasta dist/
```

**Publicar (ex.: Hostinger):** rode `npm run build` no seu computador e envie o **conteúdo** de `dist/` para `public_html/`.
Não use o build no servidor da Hostinger: o ambiente deles tem glibc antiga e o Next.js 16 não compila lá.

## Onde editar

- `site.config.ts`: WhatsApp, Instagram, endereço, horário, busca do mapa e domínio.
- `content.ts`: serviços, passos do atendimento e perguntas frequentes.
- `components/`: seções (hero, serviços, FAQ, cabeçalho, logo, botão de WhatsApp).
- `app/layout.tsx`: título, descrição e dados estruturados para o Google (AutoRepair + FAQ).
- `app/globals.css`: cores da marca (`--brand`, `--signal`, `--graphite`) e animações.

## Provisório (confirmar com o cliente)

- Logomarca: `components/logo.tsx` é uma versão em tipografia; trocar pelo arquivo oficial.
- Horário de funcionamento e domínio (`site.config.ts`).
- Descrições dos serviços (`content.ts`): baseadas na bio do Instagram, sem citar equipamentos, prazos ou preços.

## Origem dos componentes

- Cabeçalho e layout do hero adaptados do bloco Shadcn Space `hero-33`.
- Serviços adaptados do `services-02` (com clique, foco e toque, além do hover original).
- Dúvidas frequentes adaptadas do `faq-01`.

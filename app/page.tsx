import Image from 'next/image';
import { Check, Clock, Crosshair, Cpu, MapPin, MessagesSquare, Navigation, Phone, Wrench, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Faq } from '@/components/faq';
import { Testimonials } from '@/components/testimonials';
import { ProcessCards, ProcessSection } from '@/components/process';
import { SectionBadge, h2Class as h2 } from '@/components/section';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { EngineIcon, Logo } from '@/components/logo';
import { InstagramIcon, WhatsAppIcon } from '@/components/icons';
import { siteConfig } from '@/site.config';
import { instagramHref, mapsEmbed, mapsHref, telefone, telHref, whatsapp } from '@/lib/contact';

const faixa = ['Motor', 'Freios ABS', 'Airbag', 'Suspensão', 'Osciloscópio', 'E muito mais'];
// Cada metade da faixa precisa ser mais larga que a tela para o loop não mostrar vazio: 3x a lista (~4500px, cobre 4K)
const faixaLonga = [...faixa, ...faixa, ...faixa];

const pilares = [
  { icon: Cpu, titulo: 'Tecnologia', texto: 'Equipamentos de diagnóstico para ler o que o carro está informando, incluindo análise de sinais com osciloscópio.' },
  { icon: Crosshair, titulo: 'Precisão', texto: 'Medir e testar antes de trocar. A peça só entra quando a causa está comprovada.' },
  { icon: Wrench, titulo: 'Conhecimento técnico', texto: 'Interpretar dados e sintomas exige experiência. É isso que transforma leitura em resposta.' },
  { icon: MessagesSquare, titulo: 'Atendimento claro', texto: 'Você entende o que foi encontrado e por quê, em linguagem simples, antes de decidir.' },
];

export default function Home() {
  const endereco = siteConfig.endereco;

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <Hero />

      <main id="conteudo">
        {/* Faixa de sistemas */}
        <div className="overflow-hidden border-y border-white/10 bg-black py-5" aria-hidden="true">
          <div className="marquee flex w-max">
            {[0, 1].map((c) => (
              <div key={c} className="flex shrink-0 items-center">
                {faixaLonga.map((f, i) => (
                  <span key={i} className="flex items-center gap-8 pr-8 text-xl font-bold tracking-tight whitespace-nowrap text-white/80 uppercase font-stretch-expanded sm:text-2xl">
                    {f}
                    <span className="size-2 rotate-45 bg-brand" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Diagnóstico x tentativa e erro */}
        <section id="diagnostico" className="py-24 lg:py-32">
          <div className="container flex flex-col gap-14">
            <div className="reveal flex max-w-3xl flex-col gap-4">
              <SectionBadge>Por que diagnosticar</SectionBadge>
              <h2 className={h2}>
                Trocar peça sem diagnóstico <span className="text-brand">é tentativa e erro.</span>
              </h2>
              <p className="max-w-[60ch] text-lg text-white/65">
                Um diagnóstico profissional busca a origem da falha. Assim você evita substituições desnecessárias, gasto
                repetido e o problema voltando depois.
              </p>
            </div>

            <div className="reveal grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-graphite p-7">
                <p className="font-mono text-xs tracking-[0.16em] text-white/45 uppercase">Sem diagnóstico</p>
                <ul className="flex flex-col gap-3 text-white/60">
                  {['Troca de peças por suposição', 'Gasto que se repete a cada tentativa', 'O defeito volta porque a causa continua lá'].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <X className="mt-0.5 size-5 shrink-0 text-white/35" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-brand/40 bg-linear-to-br from-brand/15 to-graphite p-7">
                <p className="font-mono text-xs tracking-[0.16em] text-brand uppercase">Com diagnóstico SA Kaizen</p>
                <ul className="flex flex-col gap-3">
                  {['A origem do problema é identificada', 'Só é trocado o que realmente precisa', 'Você entende o que foi feito e por quê'].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {pilares.map((p, i) => (
                <div key={p.titulo} className={`reveal flex flex-col gap-3 py-8 sm:pr-8 ${i > 0 ? 'lg:border-l lg:border-white/10 lg:pl-8' : ''} ${i % 2 ? 'sm:border-l sm:border-white/10 sm:pl-8 lg:pl-8' : ''}`}>
                  <p.icon className="size-6 text-brand" aria-hidden="true" />
                  <h3 className="text-xl font-bold tracking-tight font-stretch-semi-expanded">{p.titulo}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />

        <ProcessSection>
          <ProcessCards />
        </ProcessSection>

        {/* Sobre */}
        <section id="sobre" className="bg-graphite py-24 lg:py-32">
          <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal relative pb-16 sm:pb-20">
              <Image
                src="/img/oficina-noite.webp"
                width={640}
                height={640}
                alt="Fachada da SA Kaizen à noite, com o letreiro iluminado e um carro estacionado em frente"
                className="aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10 sm:w-[85%]"
              />
              <Image
                src="/img/oficina-dia.webp"
                width={802}
                height={457}
                alt="Fachada da SA Kaizen durante o dia"
                className="absolute right-0 bottom-0 w-[62%] rounded-xl object-cover shadow-2xl ring-4 ring-graphite"
              />
            </div>

            <div className="reveal flex flex-col gap-6">
              <SectionBadge>Sobre a SA Kaizen</SectionBadge>
              <h2 className={h2}>Uma oficina dedicada a encontrar a causa.</h2>
              <p className="text-lg leading-relaxed text-white/70">
                A SA Kaizen é uma oficina especializada em diagnóstico automotivo em Manaus. Nosso trabalho começa onde muitas
                oficinas param: na investigação técnica do que está realmente acontecendo com o seu carro.
              </p>
              <div className="flex gap-5 rounded-2xl border border-white/10 bg-background/60 p-6">
                <span className="text-4xl leading-none font-bold text-brand" lang="ja" aria-hidden="true">改善</span>
                <p className="text-sm leading-relaxed text-white/70">
                  <strong className="font-semibold text-white">Kaizen</strong> é a palavra japonesa para melhoria contínua: observar,
                  medir e fazer melhor a cada vez. É o espírito de um bom diagnóstico.
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {['Oficina especializada', 'Diagnóstico avançado com osciloscópio', 'Motor, ABS, airbag e suspensão', 'Atendimento em Manaus - AM'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/85">
                    <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Localização */}
        <section id="localizacao" className="py-24 lg:py-32">
          <div className="container grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
            <div className="reveal flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <SectionBadge>Localização</SectionBadge>
                <h2 className={h2}>Venha até a oficina</h2>
              </div>
              <dl className="flex flex-col divide-y divide-white/10 border-y border-white/10">
                <div className="flex gap-4 py-5">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-xs tracking-[0.14em] text-white/45 uppercase">Endereço</dt>
                    <dd className="mt-1 text-white/90">
                      {endereco.rua ?? 'Endereço completo em breve'}
                      <br />
                      {endereco.cidade} - {endereco.uf} · CEP {endereco.cep}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4 py-5">
                  <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-xs tracking-[0.14em] text-white/45 uppercase">Horário</dt>
                    <dd className="mt-1 text-white/90">{siteConfig.horario ?? 'Consulte pelo WhatsApp'}</dd>
                  </div>
                </div>
                <div className="flex gap-4 py-5">
                  <Phone className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-xs tracking-[0.14em] text-white/45 uppercase">WhatsApp e telefone</dt>
                    <dd className="mt-1">
                      <a href={telHref} className="inline-block py-1 text-white/90 underline decoration-white/25 underline-offset-4 hover:decoration-brand">{telefone}</a>
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full px-6 font-semibold">
                  <a href={mapsHref} target="_blank" rel="noopener">
                    <Navigation className="size-4" aria-hidden="true" />
                    Como chegar
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-transparent px-6 hover:bg-white/5">
                  <a href={whatsapp('Olá! Vim pelo site e gostaria da localização da oficina.')} target="_blank" rel="noopener">
                    <WhatsAppIcon className="size-4" />
                    Pedir a rota
                  </a>
                </Button>
              </div>
            </div>

            <div className="reveal relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-graphite lg:min-h-[480px]">
              {/* mapa com cores invertidas para combinar com o tema escuro */}
              <iframe
                src={mapsEmbed}
                title="Mapa com a localização da SA Kaizen em Manaus"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full border-0 [filter:invert(90%)_hue-rotate(180deg)_saturate(.6)]"
              />
            </div>
          </div>
        </section>

        <Faq />

        {/* CTA final */}
        <section className="pb-24 lg:pb-32">
          <div className="container">
            <div className="reveal relative isolate flex flex-col items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-graphite px-6 py-16 text-center sm:px-12 lg:py-24">
              <div className="tech-grid absolute inset-0 -z-10" />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(225,29,42,.28),transparent_70%)]" />
              <EngineIcon className="warn-glow h-14 w-auto text-signal" />
              <h2 className="max-w-[20ch] text-[clamp(2rem,1.2rem+3.4vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance font-stretch-semi-expanded">
                Não deixe uma falha se transformar em um problema maior.
              </h2>
              <p className="max-w-[52ch] text-lg text-white/65">
                Luz acesa no painel, falha ou ruído diferente? Fale agora com a nossa equipe e agende o diagnóstico.
              </p>
              <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                <Button asChild size="lg" className="h-14 w-full rounded-full px-8 text-base font-semibold shadow-[0_10px_40px_-10px_rgba(225,29,42,.8)] sm:w-auto">
                  <a href={whatsapp('Olá! Vim pelo site e gostaria de falar com um especialista.')} target="_blank" rel="noopener">
                    <WhatsAppIcon className="size-5" />
                    Falar com um especialista
                  </a>
                </Button>
                <a href={telHref} className="flex items-center gap-2 text-white/75 transition-colors hover:text-white">
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {telefone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black pt-14 pb-28 lg:pb-14">
        <div className="container flex flex-col gap-10">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="flex max-w-sm flex-col gap-4">
              <Logo subtitulo className="text-base" />
              <p className="text-sm leading-relaxed text-white/55">Oficina especializada em diagnóstico automotivo em Manaus - AM.</p>
            </div>
            <div className="grid grid-cols-1 gap-10 text-sm min-[420px]:grid-cols-2 sm:gap-16">
              <nav aria-label="Rodapé" className="flex flex-col gap-3">
                <p className="font-mono text-xs tracking-[0.14em] text-white/40 uppercase">Navegue</p>
                {[['Serviços', '#servicos'], ['Como funciona', '#como-funciona'], ['Sobre', '#sobre'], ['Localização', '#localizacao']].map(([t, h]) => (
                  <a key={h} href={h} className="py-1 text-white/70 transition-colors hover:text-white">{t}</a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-xs tracking-[0.14em] text-white/40 uppercase">Contato</p>
                <a href={whatsapp()} target="_blank" rel="noopener" className="flex items-center gap-2 py-1 text-white/70 transition-colors hover:text-white">
                  <WhatsAppIcon className="size-4" />
                  {telefone}
                </a>
                <a href={instagramHref} target="_blank" rel="noopener" className="flex items-center gap-2 py-1 break-all text-white/70 transition-colors hover:text-white">
                  <InstagramIcon className="size-4" />
                  @{siteConfig.instagram}
                </a>
              </div>
            </div>
          </div>
          <p className="border-t border-white/10 pt-6 text-xs text-white/40">
            © {new Date().getFullYear()} {siteConfig.nome} · Manaus - AM
          </p>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}

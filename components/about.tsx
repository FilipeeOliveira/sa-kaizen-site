// Seção "Sobre": vídeo vertical da oficina à esquerda e o texto à direita.
// (As fotos da fachada que ficavam aqui estão no commit 30dc84b.)
import { VideoOficina } from '@/components/about-video';
import { SectionBadge, h2Class as h2 } from '@/components/section';

export function About() {
  return (
    <section id="sobre" className="overflow-x-clip bg-graphite py-24 lg:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <VideoOficina />

        <div className="reveal flex flex-col gap-6">
          <SectionBadge>Sobre a SA Kaizen</SectionBadge>
          <h2 className={h2}>Uma oficina dedicada a encontrar a causa.</h2>
          <p className="text-lg leading-relaxed text-white/70">
            A SA Kaizen é uma oficina especializada em diagnóstico automotivo em Manaus. Nosso trabalho começa onde muitas
            oficinas param: na investigação técnica do que está realmente acontecendo com o seu carro.
          </p>
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
  );
}

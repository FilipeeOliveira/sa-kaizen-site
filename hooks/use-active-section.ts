'use client';

import { useEffect, useState } from 'react';

// Id da seção visível no momento (para destacar no menu). IntersectionObserver em vez de ouvir cada scroll.
export function useActiveSection(ids: string[]) {
  const [ativo, setAtivo] = useState<string | null>(null);

  useEffect(() => {
    const visiveis = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visiveis.set(e.target.id, e.isIntersecting);
        // a primeira seção (na ordem do menu) que cruza a faixa central da tela; nenhuma no hero
        setAtivo(ids.find((id) => visiveis.get(id)) ?? null);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [ids]);

  return ativo;
}

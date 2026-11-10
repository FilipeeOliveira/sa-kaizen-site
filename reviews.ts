// Avaliações reais do perfil da SA Kaizen no Google Maps (https://maps.app.goo.gl/EFx871B8VSAvs3637),
// copiadas à mão. Textos exatamente como publicados pelos clientes: não corrigir nem reescrever.
// Ordem: da mais recente para a mais antiga. `quando` é a data como o Google mostrava no dia da coleta.
// `incompleto`: o texto estava cortado na captura; fica fora do site até alguém copiar o texto inteiro.
export const coletadoEm = '9 de novembro de 2026';

export type Review = {
  nome: string;
  nota: number;
  quando: string;
  texto: string;
  destaque?: true;
  incompleto?: true;
};

export const reviews: Review[] = [
  {
    nome: 'Mario Jorge Monte Jorge', nota: 5, quando: '3 dias atrás', destaque: true,
    texto: 'Em todos os lugares que já passei com o meu carro, não encontrei tanto profissionalismo e transparência,faço serviço a pouco mais de 2 anos com seu Arthur e o conhecimento dele é surreal, fala com propriedade, parabéns Arthur você é o melhor!!!!',
  },
  { nome: 'César Mestrinho', nota: 5, quando: 'uma semana atrás', texto: 'Atendimento de excelência, atenciosos e profissionais!!!' },
  {
    nome: 'Mateus Castro', nota: 5, quando: '2 semanas atrás', destaque: true,
    texto: 'Melhor de Manaus, profissional de Alta qualidade, sabe o que tá fazendo, sempre dando o diagnóstico exato do que precisa ser trocado ou não, são de Alta confiança, agora só levo meu carro na SA Kaizen',
  },
  {
    nome: 'Geissy Rios', nota: 5, quando: '2 semanas atrás',
    texto: 'Oficina simplesmente incrível! 😍 Serviço de qualidade, com ótimo custo benefício. Pra mim, a melhor opção em mecânica. Oficina limpa e organizada me chamou muita atenção.',
  },
  {
    nome: 'Eduarda Oliveira', nota: 5, quando: '2 semanas atrás',
    texto: 'A melhor de Manaus, sempre bem atendida, serviços de excelência. Ja faço serviços a mais de 2 anos com eles e sempre de melhor qualidade. Obrigada pelo excelente trabalho e atendimento.',
  },
  {
    nome: 'Isadora Oliveira', nota: 5, quando: 'Editado um mês atrás',
    texto: 'Uma grata surpresa em Manaus, onde está cada vez mais raro achar bons profissionais em determinadas áreas. Profissional sério, competente e honesto a preço muito justo. Vale super a pena!',
  },
  { nome: 'Ubiratã Monteiro', nota: 5, quando: '2 meses atrás', texto: '' }, // só estrelas, sem comentário
  { nome: 'Esmeralda Monteiro', nota: 5, quando: '7 meses atrás', texto: 'Excelente atendimento' },
  {
    nome: 'Nadson Picanço', nota: 5, quando: '9 meses atrás', destaque: true,
    texto: 'Sensacional! O Seu Artur é um profissional extremamente atencioso e honesto. Eu já tinha passado por duas oficinas que condenaram a mesma peça, mas ele investigou a fundo e descobriu que era apenas um fio solto no chicote. Em vez de me fazer gastar com o que não precisava, resolveu o problema com integridade.\n\nAproveitei para fazer a revisão da injeção, deixei o carro de manhã e peguei à tarde, impecável. Um diferencial incrível é o link que ele envia, onde acompanhamos o serviço em tempo real com fotos e vídeos. Transparência total! Preço justo e serviço de mestre. Recomendo com segurança e certamente voltarei.',
  },
  {
    nome: 'Carlos Soares', nota: 5, quando: '10 meses atrás',
    texto: 'Serviços de excelência, respeitando prazo de entrega e garantia dos serviços. Apresenta no final do trabalho um relatório com detalhamento em vídeo e fotos de todo trabalho realizado. Qualidade do trabalho equivalente a de uma concessionária autorizada, porém, com preços muito menores.',
  },
  { nome: 'Elioney Pereira', nota: 5, quando: '10 meses atrás', incompleto: true, texto: 'Melhor oficina de Manaus. Faz o diagnóstico e resolve o problema do seu carro com rapidez e eficiência. 👏👏' },
  {
    nome: 'André Vieira', nota: 4, quando: 'um ano atrás',
    texto: 'Com certeza a melhor oficina que conheço na cidade. Ambiente extremamente organizado e limpo! Muito atenciosos e o mais importante,,, são assertivos no diagnóstico ! O automóvel é devolvido como novo !',
  },
  { nome: 'Luiz Eduardo', nota: 5, quando: 'um ano atrás', texto: 'Recomendo os serviços do Artur diagnósticos. Profissional excelente, atencioso, e acima de tudo, honesto.' },
  { nome: 'Luanne Cristina', nota: 5, quando: 'um ano atrás', incompleto: true, texto: 'Artur super atencioso, organizado. Serviço perfeito e de excelência 👏🏽' },
  {
    nome: 'Patricia Conceicao Cabral E Silva', nota: 5, quando: '2 anos atrás',
    texto: 'Amei o atendimento, local bem organizado, e apesar de ser oficina tudo muito limpo. O serviço prestado de qualidade é sem enganação, preço acessível e justo. Meu carro saiu impecável. Parabéns Sr. Arthur',
  },
  {
    nome: 'Gisele Barros', nota: 5, quando: '2 anos atrás',
    texto: 'Excelente profissional qualificado. Oficina mega organizada. Confio de olhos fechados. Já sou cliente a anos e sempre saio satisfeita com os serviços prestados, sempre objetivo ao problema e com soluções realmente resolvidos. Sempre indico aos meus conhecidos',
  },
  {
    nome: 'Ivaneide Lima', nota: 5, quando: '2 anos atrás', incompleto: true,
    texto: 'Gostei muito do serviço de alta qualidade responsabilidade, excelente profissional que atende todas as necessidades, super indico e recomendo parabéns Artur pelo lindo trabalho que você exerce, buscando sempre deixar satisfatório para cada cliente seu. Meus parabéns 👏👏👏👏',
  },
  {
    nome: 'Ivaneide Lima', nota: 5, quando: '2 anos atrás', incompleto: true,
    texto: 'Trabalho de excelência sempre que o meu carro apresenta algum problema eu direciono ao Artu Diagnóstico Automotivo meu carro fica otimo e super recomendo o trabalho dele, mais uma vez sou grata pela qualidade e confiança 🙏',
  },
  {
    nome: 'Dr. Nelson de Brito', nota: 5, quando: '2 anos atrás', incompleto: true,
    texto: 'Recomendo muito, os serviços da oficina Artur Diagnóstico Automotivo. Serviços feito com total transparência, cuidado e zelo, ambiente organizado e confortável aos clientes, ofertando um ótimo atendimento em avaliações e manutenções para o ...',
  },
  {
    nome: 'Lucas Pedrassani', nota: 5, quando: '4 anos atrás',
    texto: 'Arthur é um profissional raríssimo de encontrar em Manaus. Mecânico muito honesto e transparente em todo o seu serviço prestado. Recomendo a todos que precisarem de um profissional capacitado e qualificado.',
  },
  {
    nome: 'jones martins Gomes', nota: 5, quando: '4 anos atrás', incompleto: true,
    texto: 'Não há na cidade de Manaus, lugar igual, onde vc tem um atendimento de primeira, e sem o menor risco de ser lesado. Recomendo, sem dúvidas!!!',
  },
];

// No site: só avaliações com texto completo
export const publicadas = reviews.filter((r) => r.texto && !r.incompleto);

// Textos da página. Serviços vêm da bio do Instagram (ABS, airbag, motor, suspensão, osciloscópio);
// as descrições são PROVISÓRIAS, escritas sem prometer equipamentos, prazos ou preços.
import type { LucideIcon } from 'lucide-react';
import { Activity, Car, CircleEllipsis, Cog, Disc3, ShieldAlert } from 'lucide-react';

export type Servico = { id: string; titulo: string; resumo: string; texto: string; sinais: string[]; icon: LucideIcon };

export const servicos: Servico[] = [
  {
    id: 'osciloscopio',
    titulo: 'Diagnóstico com osciloscópio',
    resumo: 'Análise de sinais elétricos',
    texto: 'Leitura dos sinais de sensores e atuadores em forma de onda, para localizar falhas intermitentes ou que não aparecem só com o scanner.',
    sinais: ['Falha que vai e volta', 'Scanner sem código de erro', 'Problema elétrico difícil de achar'],
    icon: Activity,
  },
  {
    id: 'motor',
    titulo: 'Motor',
    resumo: 'Falhas, perda de força e luz da injeção',
    texto: 'Investigação de falhas de funcionamento, perda de desempenho, marcha lenta irregular e luz de injeção acesa no painel.',
    sinais: ['Luz da injeção acesa', 'Motor falhando ou tremendo', 'Perda de força'],
    icon: Cog,
  },
  {
    id: 'abs',
    titulo: 'Freios ABS',
    resumo: 'Sistema antitravamento',
    texto: 'Avaliação do sistema ABS quando a luz acende no painel ou o freio apresenta comportamento diferente do normal.',
    sinais: ['Luz do ABS acesa', 'Pedal com comportamento estranho', 'Alerta de freio no painel'],
    icon: Disc3,
  },
  {
    id: 'airbag',
    titulo: 'Airbag',
    resumo: 'Sistema de segurança',
    texto: 'Verificação do sistema de airbag quando a luz de alerta permanece acesa, para identificar qual componente está gerando a falha.',
    sinais: ['Luz do airbag acesa', 'Alerta após batida ou reparo', 'Falha intermitente'],
    icon: ShieldAlert,
  },
  {
    id: 'suspensao',
    titulo: 'Suspensão',
    resumo: 'Ruídos, folgas e estabilidade',
    texto: 'Avaliação de ruídos, folgas e do comportamento do carro na rodagem, para apontar a origem antes de qualquer troca de peça.',
    sinais: ['Barulho em buracos', 'Carro puxando para um lado', 'Instabilidade nas curvas'],
    icon: Car,
  },
  {
    id: 'outros',
    titulo: 'E muito mais',
    resumo: 'Outros sistemas do veículo',
    texto: 'Atendemos outros sistemas eletrônicos e mecânicos. Descreva o sintoma pelo WhatsApp e nossa equipe orienta o melhor caminho.',
    sinais: ['Luz desconhecida no painel', 'Ruído ou cheiro diferente', 'Qualquer comportamento fora do normal'],
    icon: CircleEllipsis,
  },
];

export const passos = [
  { titulo: 'Fale com a gente', texto: 'Chame no WhatsApp e conte o que o carro está apresentando: luz no painel, ruído, falha.' },
  { titulo: 'Agende o horário', texto: 'Combinamos o melhor dia para você trazer o veículo até a oficina.' },
  { titulo: 'Diagnóstico', texto: 'Nossa equipe avalia o veículo com equipamentos de diagnóstico para encontrar a origem do problema.' },
  { titulo: 'Resultado explicado', texto: 'Você entende a causa encontrada e a orientação de reparo antes de decidir o que fazer.' },
];

export const faq = [
  {
    pergunta: 'O que é diagnóstico automotivo?',
    resposta: 'É a investigação técnica de uma falha do veículo usando equipamentos e testes, para encontrar a causa real do problema antes de trocar qualquer peça.',
  },
  {
    pergunta: 'Quando devo levar meu carro para um diagnóstico?',
    resposta: 'Sempre que acender uma luz de alerta no painel (injeção, ABS, airbag), quando o motor falhar ou perder força, ou quando surgirem ruídos e comportamentos diferentes do normal.',
  },
  {
    pergunta: 'Quais sistemas a SA Kaizen avalia?',
    resposta: 'Motor, freios ABS, airbag e suspensão, com análise de sinais por osciloscópio, entre outros sistemas. Se o seu caso for diferente, descreva o sintoma pelo WhatsApp que nossa equipe orienta.',
  },
  {
    pergunta: 'Como faço para agendar?',
    resposta: 'Pelo WhatsApp (92) 98198-8108. Conte o que o carro está apresentando e combinamos o melhor horário.',
  },
  {
    pergunta: 'Onde fica a oficina?',
    resposta: 'Na R. Tailândia, 485, bairro Flores, em Manaus - AM. Veja o mapa na seção de localização ou peça a rota pelo WhatsApp.',
  },
];

// Contato, endereço e SEO. Edite aqui para trocar dados sem mexer nos componentes.
// Itens marcados como PROVISÓRIO ainda precisam ser confirmados com o cliente.
export const siteConfig = {
  nome: 'SA Kaizen Diagnóstico Automotivo',
  url: 'https://www.sakaizen.com.br', // PROVISÓRIO: domínio final
  whatsapp: {
    numero: '5592981988108', // (92) 98198-8108, da fachada e do Instagram
    mensagem: 'Olá! Vim pelo site e gostaria de agendar um diagnóstico.',
  },
  instagram: 'sa_kaizen_diagnostico',
  endereco: {
    rua: 'R. Tailândia, 485 - Flores' as string | null, // do perfil no Google Maps
    cep: '69028-191',
    cidade: 'Manaus',
    uf: 'AM',
  },
  horario: null as string | null, // PROVISÓRIO: ex. 'Seg a sex, 8h às 18h · Sáb, 8h às 12h'
  // Destino do botão "Como chegar" (rota no Google Maps)
  mapa: 'SA Kaizen Diagnóstico Automotivo, R. Tailândia, 485 - Flores, Manaus - AM, 69028-191',
  // Mapa incorporado: link "Incorporar um mapa" do perfil da oficina no Google Maps
  mapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.188650262643!2d-60.00362332304678!3d-3.044062896931771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c1b8d6fa04861%3A0xcb97611ad53c9f95!2sSA%20Kaizen%20Diagn%C3%B3stico%20Automotivo!5e0!3m2!1spt-BR!2sbr!4v1794262505359!5m2!1spt-BR!2sbr',
};

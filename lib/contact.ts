import { siteConfig } from '@/site.config';

const { numero, mensagem } = siteConfig.whatsapp;

// (92) 98198-8108 a partir de 5592981988108
export const telefone = `(${numero.slice(2, 4)}) ${numero.slice(4, -4)}-${numero.slice(-4)}`;
export const telHref = `tel:+${numero}`;

export const whatsapp = (texto: string = mensagem) => `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

export const instagramHref = `https://www.instagram.com/${siteConfig.instagram}/`;
export const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.mapa)}`;
export const mapsEmbed = siteConfig.mapaEmbed;

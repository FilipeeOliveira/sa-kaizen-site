import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/site.config';
import { faq } from '@/content';
import { telefone } from '@/lib/contact';
import { cn } from '@/lib/utils';
import './globals.css';

// Archivo tem eixo de largura (wdth): normal no texto, expandida nos títulos e no "KAIZEN"
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

const titulo = 'Diagnóstico Automotivo em Manaus | SA Kaizen';
const descricao =
  'Oficina especializada em diagnóstico automotivo em Manaus - AM. Motor, ABS, airbag, suspensão e análise com osciloscópio. Agende pelo WhatsApp (92) 98198-8108.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: titulo,
  description: descricao,
  keywords: ['diagnóstico automotivo Manaus', 'oficina de diagnóstico Manaus', 'scanner automotivo Manaus', 'luz da injeção acesa', 'ABS', 'airbag', 'osciloscópio automotivo'],
  alternates: { canonical: '/' },
  icons: { icon: '/favicon-32.png', apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'SA Kaizen',
    title: titulo,
    description: 'Diagnóstico automotivo especializado em Manaus. Encontramos a causa do problema do seu carro.',
    url: '/',
    images: [{ url: '/img/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0b0b0d' };

// SEO local: oficina (AutoRepair) em Manaus + perguntas frequentes
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: siteConfig.nome,
    url: siteConfig.url,
    image: `${siteConfig.url}/img/fachada.webp`,
    logo: `${siteConfig.url}/img/icone-512.png`,
    telephone: telefone,
    address: {
      '@type': 'PostalAddress',
      ...(siteConfig.endereco.rua ? { streetAddress: siteConfig.endereco.rua } : {}),
      addressLocality: siteConfig.endereco.cidade,
      postalCode: siteConfig.endereco.cep,
      addressRegion: siteConfig.endereco.uf,
      addressCountry: 'BR',
    },
    areaServed: 'Manaus',
    sameAs: [`https://www.instagram.com/${siteConfig.instagram}/`],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.pergunta, acceptedAnswer: { '@type': 'Answer', text: f.resposta } })),
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cn(archivo.variable, mono.variable)}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}

import type { NextConfig } from 'next';

// Exportação estática: `npm run build` gera a pasta dist/ (sem servidor Node).
const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    formats: ["image/webp"],
  },
  // Otimizações de performance
  compress: true,
  poweredByHeader: false,
  // Otimização de CSS
  experimental: {
    optimizeCss: true,
  },
  // Headers de cache para assets estáticos (aplicados via hosting/CDN)
  // Recomendação: configurar no servidor/CDN para cache de 1 ano em assets estáticos
};

export default nextConfig;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";

// Interface para o formato padrão de APIs JSON de Instagram (como behold.so ou similares)
interface InstagramPost {
  id: string;
  mediaUrl: string; // URL da imagem/video
  permalink: string; // Link para o post no Instagram
  caption?: string;
  mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

// MOCK DE FALLBACK (Para não quebrar enquanto não configura a API)
const MOCK_FEED = Array.from({ length: 8 }).map((_, i) => ({
  id: `mock-${i}`,
  mediaUrl: `/projetos_realizados/${(i % 12) + 1}.webp`,
  permalink: "https://www.instagram.com/ateliedeimpressao",
}));

// URL da API Externa (Exemplo: Behold.so, RapidAPI, etc)
// Para usar o Behold.so (Gratuito/Simples): https://behold.so/
// Crie o feed lá e cole a URL JSON aqui.
const INSTAGRAM_API_URL = ""; // Coloque a URL do feed JSON aqui

export function SocialProof() {
  const [feed, setFeed] = useState<InstagramPost[]>(MOCK_FEED);

  useEffect(() => {
    async function fetchInstagramFeed() {
      if (!INSTAGRAM_API_URL) return;

      try {
        const response = await fetch(INSTAGRAM_API_URL);
        const data = await response.json();

        // Adaptador simples para garantir que os dados venham no formato certo
        // Dependendo da API escolhida, pode ser necessário ajustar o mapeamento abaixo
        const formattedData = data.map((item: any) => ({
          id: item.id,
          mediaUrl: item.mediaUrl || item.media_url || item.url, // Tenta diferentes formatos comuns
          permalink: item.permalink || item.link,
          caption: item.caption,
        }));

        setFeed(formattedData.slice(0, 8)); // Pega apenas os 8 primeiros
      } catch (error) {
        console.error("Erro ao carregar feed do Instagram:", error);
        // Mantém o mock em caso de erro
      }
    }

    fetchInstagramFeed();
  }, []);

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center mb-12 space-y-4">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400">
            Quem Imprime com a gente
          </p>
          <a
            href="https://www.instagram.com/ateliedeimpressao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @ateliedeimpressao
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {feed.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square group overflow-hidden bg-gray-100 block"
            >
              {post.mediaUrl && (
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || "Instagram post Ateliê de Impressão"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized={
                    post.mediaUrl.startsWith("http") &&
                    !post.mediaUrl.includes("projetos_realizados")
                  } // Desativa otimização do Next.js para URLs externas desconhecidas
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

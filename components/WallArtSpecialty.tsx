"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Instagram, ArrowRight, Loader2 } from "lucide-react";

// Configuração do Feed do Instagram
// Para puxar posts reais, recomenda-se usar um serviço como behold.so (gratuito)
// para gerar uma URL JSON segura, pois a API direta do Instagram exige autenticação backend.
const INSTAGRAM_FEED_URL = ""; // Ex: "https://feeds.behold.so/YOUR-FEED-ID"

export function WallArtSpecialty() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const staticImages = [
    {
      src: "/Canvas-tela.webp",
      alt: "Canvas Fine Art",
      link: "https://www.instagram.com/asuperficie/",
    },
    {
      src: "/papel-algodao.webp",
      alt: "Papel Algodão",
      link: "https://www.instagram.com/asuperficie/",
    },
    {
      src: "/ambiente-atelie.webp",
      alt: "Nosso Ateliê",
      link: "https://www.instagram.com/asuperficie/",
    },
    {
      src: "/papel-linho.webp",
      alt: "Papel Linho",
      link: "https://www.instagram.com/asuperficie/",
    },
  ];

  useEffect(() => {
    if (isGalleryOpen && INSTAGRAM_FEED_URL && feedPosts.length === 0) {
      setIsLoading(true);
      fetch(INSTAGRAM_FEED_URL)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          // Normaliza os dados (suporte a behold.so ou formato padrão da Graph API)
          const posts = Array.isArray(data) ? data : data.data;
          setFeedPosts(posts.slice(0, 4)); // Pega os 4 mais recentes
        })
        .catch((err) => {
          console.error("Erro ao carregar Instagram:", err);
          setError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isGalleryOpen, feedPosts.length]);

  const displayItems = feedPosts.length > 0 ? feedPosts : staticImages;

  return (
    <section
      id="wall-art"
      className="py-32 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/wall-art.webp"
          alt="Wall Art Imersiva"
          fill
          className="object-cover object-top opacity-40 mix-blend-overlay"
          priority
        />
      </div>

      {/* Background texture hint */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-900 to-black pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 block">
            Especialidade
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-10 leading-tight">
            Wall Art <br /> Imersiva
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 font-light text-lg md:text-xl leading-relaxed mb-12">
            Somos especialistas em impressão em larga escala que materializa a
            visão do projeto. Nossa tecnologia permite ambientes imersivos
            perfeitos, transformando superfícies arquitetônicas em elementos de
            design exclusivos.
          </p>

          <button
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            className="border border-white/30 px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mb-8"
          >
            {isGalleryOpen ? "Fechar Projetos" : "Ver Projetos"}
          </button>

          <AnimatePresence>
            {isGalleryOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-4xl overflow-hidden"
              >
                <div className="pt-8 pb-4">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {displayItems.map((item, index) => {
                        // Normaliza campos entre API e estático
                        const src = item.mediaUrl || item.media_url || item.src;
                        const alt =
                          item.caption || item.alt || "Instagram Post";
                        const link = item.permalink || item.link;
                        const isVideo =
                          item.mediaType === "VIDEO" ||
                          item.media_type === "VIDEO";
                        // Se for vídeo sem thumbnail explícita na API, talvez precise tratar,
                        // mas a maioria das APIs públicas retorna o mediaUrl como thumb para vídeo ou tem campo específico.

                        return (
                          <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="aspect-square relative overflow-hidden group bg-gray-800 cursor-pointer"
                          >
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full h-full"
                            >
                              {src ? (
                                <Image
                                  src={src}
                                  alt={alt}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  unoptimized={
                                    !!(item.mediaUrl || item.media_url)
                                  } // Necessário para imagens externas se não configurar domains
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-xs text-gray-500">
                                  Sem imagem
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Instagram className="w-6 h-6 text-white" />
                              </div>
                            </a>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  <a
                    href="https://www.instagram.com/asuperficie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors group"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Siga-nos no Instagram</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

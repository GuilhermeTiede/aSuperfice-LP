"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectData {
  id: number;
  src: string;
  title: string;
  credits: string[];
}

const projectsDataRaw: Omit<ProjectData, "src">[] = [
  {
    id: 1,
    title: "Impressão tela canvas sala jantar",
    credits: ["@ella.lima_", "@mangarosaarquitetura"],
  },
  {
    id: 2,
    title: "Painel parede Loja Eva",
    credits: ["@ella.lima_", "@mangarosaarquitetura"],
  },
  {
    id: 3,
    title: "Papel de parede toilet loja Eva",
    credits: ["@ella.lima_", "@mangarosaarquitetura"],
  },
  {
    id: 4,
    title: "Papel de parede e gravuras loja LZ mini Ipanema",
    credits: ["@ella.lima_", "@mangarosaarquitetura"],
  },
  {
    id: 5,
    title: "Impressão quadro Frida",
    credits: ["@ella.lima", "@mangarosaarquitetura"],
  },
  {
    id: 6,
    title: "Painel parede Casa Design - Espaço living para estar",
    credits: ["@ella.lima_", "@desireebruver"],
  },
  {
    id: 7,
    title: "Papel de parede Gaoli - Shopping Leblon",
    credits: ["@gaoli.rio", "@mangarosaarquitetura"],
  },
  {
    id: 8,
    title: "Papel de parede nicho - Casa Cor 2022",
    credits: ["@Giselapecego_studio", "@Diasbortolini"],
  },
  {
    id: 9,
    title: "Revestimento parede loja Reserva Mini",
    credits: ["@mangarosaarquitetura"],
  },
  {
    id: 10,
    title: "Papéis de parede, adesivos - Loja LZ Mini",
    credits: ["@ella.lima_", "@mangarosaarquitetura"],
  },
  {
    id: 11,
    title: "Papel de parede quarto",
    credits: ["@atelier.oui"],
  },
  {
    id: 12,
    title: "Papel de parede lavabo loja Trama Casa",
    credits: ["@mc_ilustrada", "@tramacasa"],
  },
  {
    id: 13,
    title: "Revestimento expositor loja Eva",
    credits: ["@ella.lima_", "@mangarosaarquitetura"],
  },
  {
    id: 14,
    title: "Revestimento teto loja Eva",
    credits: ["@ella.lima_", "@mangarosaarquitetura"],
  },
  {
    id: 15,
    title: "Revestimento adesivo laminado para Todeschini",
    credits: ["@desireebruver"],
  },
  {
    id: 16,
    title: "Papel de parede e decalques vidros bistrô Amelie",
    credits: ["@gruna.arquitetura"],
  },
  {
    id: 17,
    title: "Papéis de parede para Spa",
    credits: ["@ella.lima"],
  },
  {
    id: 18,
    title: "Revestimento banheiro completo restaurante",
    credits: ["@areia.arquitetura"],
  },
  {
    id: 19,
    title: "Painel parede hall entrada",
    credits: ["@jade_ralmeida", "@marceloreisbraz"],
  },
  {
    id: 20,
    title: "Decalque texto hall entrada",
    credits: ["@desireebruver"],
  },
  {
    id: 21,
    title: "Papel de parede quarto",
    credits: ["@mtcsabino", "@glauciomoraes"],
  },
  {
    id: 22,
    title: "Papel de parede lavabo",
    credits: ["@ella.lima", "Vieira Sampaio"],
  },
  {
    id: 23,
    title: "Instalação lavabo papel de parede Branco",
    credits: ["@casadeanas"],
  },
  {
    id: 24,
    title: "Papel de parede hall entrada",
    credits: ["@joaocavalcantiarq"],
  },
];

const projectImages: ProjectData[] = projectsDataRaw
  .map((data) => ({
    ...data,
    src: `/projetos_realizados/${data.id}.webp`,
  }))
  .reverse();

export function WallArtSpecialty() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section
      id="wall-art"
      className="py-32 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Wall-Art-corredor.webp"
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
            Especialistas em impressão de grande formato para murais panorâmicos
            e superfícies arquitetônicas. Nossa tecnologia permite ambientes
            imersivos perfeitos — do papel de parede personalizado a grandes
            painéis corporativos.
          </p>

          <button
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            className="border border-white/30 px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 mb-8"
          >
            {isGalleryOpen ? "Fechar Projetos" : "Ver Projetos"}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center">
              <button
                onClick={prevImage}
                className="absolute left-0 md:-left-12 z-10 p-4 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
              </button>

              <div className="w-full h-full relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        nextImage();
                      } else if (swipe > swipeConfidenceThreshold) {
                        prevImage();
                      }
                    }}
                  >
                    <Image
                      src={projectImages[currentImageIndex].src}
                      alt={projectImages[currentImageIndex].title}
                      fill
                      className="object-contain" // object-contain mantem proporção sem cortar
                      priority
                    />

                    {/* Caption Overlay */}
                    <div className="absolute unset bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 md:p-8 flex flex-col items-center text-center">
                      <h3 className="text-white text-xl md:text-2xl font-serif mb-2">
                        {projectImages[currentImageIndex].title}
                      </h3>
                      <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-white/70 text-sm md:text-base font-light">
                        {projectImages[currentImageIndex].credits.map(
                          (credit, idx) => (
                            <span key={idx}>{credit}</span>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={nextImage}
                className="absolute right-0 md:-right-12 z-10 p-4 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-light text-sm tracking-widest bg-black/50 px-4 py-2 rounded-full border border-white/10 hidden md:block">
              {currentImageIndex + 1} / {projectImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

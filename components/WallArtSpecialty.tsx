"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

const TOTAL_IMAGES = 37;

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
  {
    id: 25,
    title: "Adesivo transparente Espaço Fitness II",
    credits: ["@vieirasampaiovs"],
  },
  {
    id: 26,
    title: "Mural ilustracao infantil",
    credits: ["@gava.arquitetura"],
  },
  {
    id: 27,
    title: "Painel e revestimento portas NBA",
    credits: ["@morschwilkinson"],
  },
  {
    id: 28,
    title: "Painel fotografico adesivo Bistro",
    credits: [],
  },
  {
    id: 29,
    title: "Painel parede adesivo",
    credits: [],
  },
  {
    id: 30,
    title: "Papel de parede Brinquedoteca",
    credits: ["@areia.arquitetura"],
  },
  {
    id: 31,
    title: "Papel de parede Quarto",
    credits: ["@nahca_arquitetura"],
  },
  {
    id: 32,
    title: "Papel de parede Spa",
    credits: ["@ella.lima_"],
  },
  {
    id: 33,
    title: "Papel de parede e adesivos",
    credits: ["@vieirasampaiovs"],
  },
  {
    id: 34,
    title: "Papel de parede lavabo",
    credits: ["@vieirasampaiovs"],
  },
  {
    id: 35,
    title: "Papel de parede, sinalização e revestimento de móveis",
    credits: ["@jaderesende"],
  },
  {
    id: 36,
    title: "Papel parede Escritorio",
    credits: [],
  },
  {
    id: 37,
    title: "quadro com papel de parede Casa Design",
    credits: ["@ella.lima_"],
  },
];

const projectImages: ProjectData[] = projectsDataRaw
  .slice()
  .sort((a, b) => a.id - b.id)
  .map((data) => ({
    ...data,
    src: `/projetos_realizados/${data.id}.webp`,
  }));

export function WallArtSpecialty() {
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
    <>
      <section
        id="wall-art"
        className="relative h-[80vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Wall-Art-corredor.webp"
            alt="Wall Art Imersiva"
            fill
            className="object-cover object-top opacity-50 mix-blend-overlay"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 block">
              Especialidade
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-10 leading-tight">
              Wall Art <br /> Imersiva
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300 font-light text-lg md:text-xl leading-relaxed">
              Especialistas em impressão de grande formato para murais panorâmicos
              e superfícies arquitetônicas. Nossa tecnologia permite ambientes
              imersivos perfeitos — do papel de parede personalizado a grandes
              painéis corporativos.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 flex justify-center">
          {/* Gallery Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-6xl h-[60vh] md:h-[80vh] bg-black/40 overflow-hidden backdrop-blur-sm shadow-2xl"
          >
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white/70 hover:text-white hover:bg-black/80 transition-all rounded-full"
              aria-label="Projeto Anterior"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
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
                    className="object-contain"
                    priority
                    draggable={false}
                  />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-8 px-6 flex flex-col items-center text-center pointer-events-none">
                    <h3 className="text-white text-xl md:text-3xl font-serif mb-2 drop-shadow-lg">
                      {projectImages[currentImageIndex].title}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-white/80 text-sm md:text-base font-light">
                      {projectImages[currentImageIndex].credits.map(
                        (credit, idx) => (
                          <span key={idx} className="bg-white/10 px-3 py-1 rounded-full">
                            {credit}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white/70 hover:text-white hover:bg-black/80 transition-all rounded-full"
              aria-label="Próximo Projeto"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 right-6 z-20 bg-black/60 px-4 py-2 rounded-full text-xs font-bold tracking-widest border border-white/10 text-white/90">
              {currentImageIndex + 1} / {projectImages.length}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

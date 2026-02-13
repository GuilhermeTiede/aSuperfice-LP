"use client";

import { motion } from "framer-motion";

const materialImages = [
  {
    src: "/Canvas-tela.webp",
    alt: "Textura da tela Canvas",
    label: "Canvas Premium",
  },
  {
    src: "/adesivo-blockout.webp",
    alt: "Acabamento adesivo blockout",
    label: "Adesivo Blockout Fosco",
  },
  {
    src: "/papel-algodao.webp",
    alt: "Textura papel algodão",
    label: "Substratos Wall Art",
  },
  {
    src: "/papel-areia.webp",
    alt: "Textura papel areia",
    label: "Substratos Wall Art",
  },
  {
    src: "/papel-linho.webp",
    alt: "Textura papel linho",
    label: "Substratos Wall Art",
  },
  {
    src: "/papel-non-woven.webp",
    alt: "Papel Non-woven",
    label: "Substratos Wall Art",
  },
];

export function Materials() {
  return (
    <section id="materials" className="pt-12 pb-24 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block font-bold">
            Materiais
          </span>
          <h2 className="text-5xl md:text-6xl font-serif mb-6 font-medium">
            Resultados com um toque de sofisticação
          </h2>
          <p className="text-gray-600 font-light text-lg">
            Pesquisamos e importamos materiais com tramas e texturas de toda
            parte do mundo. Trabalhamos com materiais especiais testados e
            homologados para receber tintas látex com alta resistência a
            arranhões e desbotamento. Investimos na seleção do que existe de
            melhor para entregarmos um resultado sensorial de cor, nitidez,
            durabilidade e sofisticação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200">
          {materialImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="aspect-square bg-gray-200 relative overflow-hidden group border border-gray-100"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-sans font-semibold tracking-wide">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

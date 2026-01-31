"use client";

import { motion } from "framer-motion";

const materials = [
  {
    id: 1,
    name: "Canvas Premium",
    description:
      "Mistura de algodão de qualidade museológica com textura profunda para profundidade artística.",
    type: "Canvas",
  },
  {
    id: 2,
    name: "Fine Art Texturizado",
    description:
      "Papel de alta gramatura com distintas qualidades táteis de superfície.",
    type: "Papel",
  },
  {
    id: 3,
    name: "Revestimento Estruturado",
    description:
      "Substratos duráveis e laváveis para espaços arquitetônicos de alto tráfego.",
    type: "Parede",
  },
];

export function Materials() {
  return (
    <section id="materials" className="py-24 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 block">
            Materialidade
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Substrates e Texturas
          </h2>
          <p className="text-gray-600 font-light text-lg">
            Oferecemos uma seleção exclusiva de superfícies imprimíveis,
            escolhidas por sua capacidade de reter tinta e luz de maneiras
            únicas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {materials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-white border border-gray-200 mb-6 overflow-hidden relative">
                {/* Macro Image Placeholder */}
                <div className="absolute inset-0 bg-gray-200 group-hover:bg-gray-300 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  VER MACRO
                </div>
              </div>
              <div className="pr-4">
                <span className="text-xs text-gray-400 uppercase tracking-widest block mb-2">
                  {item.type}
                </span>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-gray-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

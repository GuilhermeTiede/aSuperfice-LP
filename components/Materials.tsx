"use client";

import { motion } from "framer-motion";

const materialImages = [
  { src: "/Canvas tela.jpg", alt: "Textura da tela Canvas" },
  { src: "/adesivo blockout.jpg", alt: "Acabamento adesivo blockout" },
  { src: "/papel algodao.jpg", alt: "Textura papel algodão" },
  { src: "/papel areia.jpg", alt: "Textura papel areia" },
  { src: "/papel linho.jpg", alt: "Textura papel linho" },
];

const descriptions = [
  {
    title: "Canvas Premium",
    text: "Tecido 100% algodão com tratamento especial para reprodução de telas, garantindo profundidade cromática e durabilidade.",
  },
  {
    title: "Substratos Wall Art",
    text: "Bases texturizadas para papéis de parede que simulam linho, fibras naturais e tramas, transformando paredes em superfícies sensoriais.",
  },
  {
    title: "Adesivo Blockout Fosco",
    text: "Coringa na decoração para ambientes de alta exposição ou para revestir móveis ou objetos decorativos.",
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
            Substratos e Texturas
          </h2>
          <p className="text-gray-600 font-light text-lg">
            Oferecemos uma seleção exclusiva de superfícies imprimíveis,
            escolhidas por sua capacidade de reter tinta e luz de maneiras
            únicas.
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
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}

          {/* 6th block: Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="aspect-square bg-white p-6 flex flex-col justify-center border border-gray-100"
          >
            <div className="space-y-4 h-full flex flex-col justify-center">
              {descriptions.map((desc, i) => (
                <div key={i}>
                  <h3 className="font-serif text-base mb-1 text-gray-900">
                    {desc.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {desc.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

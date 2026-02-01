"use client";

import { motion } from "framer-motion";

export function WallArtSpecialty() {
  return (
    <section
      id="wall-art"
      className="py-32 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Background texture hint */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-900 to-black pointer-events-none" />

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

          <button className="border border-white/30 px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            Ver Projetos
          </button>
        </motion.div>
      </div>
    </section>
  );
}

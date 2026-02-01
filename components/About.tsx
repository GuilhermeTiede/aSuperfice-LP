"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] md:aspect-square bg-gray-100 overflow-hidden"
          >
            {/* Placeholder for Atelier/Workshop Image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-light">
              Ambiente do Ateliê
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-gray-900">
              O Conceito do Ateliê
            </h2>
            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
              <p>
                Somos mais que um estúdio de impressão; somos uma consultoria
                técnico-artística dedicada à perfeição do design de superfície.
                Nossa abordagem une a criatividade digital à materialidade
                tangível.
              </p>
              <p>
                Trabalhando em estreita colaboração com arquitetos, artistas e
                designers, curamos substratos específicos que ampliam a
                narrativa de cada projeto. Da textura do papel à profundidade da
                tinta, cada detalhe é calibrado para evocar emoção e
                sofisticação.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif mb-2 text-gray-900">
                  Curadoria
                </h3>
                <p className="text-sm text-gray-500">
                  Orientação especializada em seleção de materiais e
                  acabamentos.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-serif mb-2 text-gray-900">
                  Precisão
                </h3>
                <p className="text-sm text-gray-500">
                  Tecnologia de impressão de alta resolução e durabilidade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

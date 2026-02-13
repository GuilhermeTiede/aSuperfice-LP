"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const audiences = [
  {
    title: "Para arquitetos e interiores",
  },
  {
    title: "Para designers e estúdios criativos",
  },
  {
    title: "Para artistas e ilustradores",
  },
  {
    title: "Para empresas e marcas",
  },
];

export function About() {
  return (
    <>
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          {/* O que é o Ateliê */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] md:aspect-square bg-gray-100 overflow-hidden"
            >
              <Image
                src="/ambiente-atelie.webp"
                alt="Ateliê de Impressão aSuperfície — consultoria técnica para impressão premium"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 block">
                O que é o Ateliê de Impressão?
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-7xl font-serif mb-10 leading-tight text-gray-900">
                Um ateliê técnico para quem precisa de resultado impecável
              </h2>
              <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                <p>
                  O Ateliê de Impressão da aSuperfície é um serviço especializado
                  em impressão premium para decoração, arte e superfícies
                  arquitetônicas.
                </p>
                <p>
                  Aqui, você não &quot;só imprime&quot;: você conta com um time
                  que entende projeto, escala, material, aplicação e resultado
                  final. Somos uma consultoria técnico-artística que acompanha o
                  processo do arquivo à instalação.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-sans font-semibold mb-2 text-gray-900">
                    Consultoria Técnica
                  </h3>
                  <p className="text-base text-gray-500">
                    Suporte completo desde a análise de arquivo até a execução
                    final.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-sans font-semibold mb-2 text-gray-900">
                    Tecnologia
                  </h3>
                  <p className="text-base text-gray-500">
                    Impressão ECO certificada de alta resolução e durabilidade.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="relative py-24 md:py-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/para_quem.webp"
            alt="Decor"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-4xl"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-white/70 mb-4 block font-bold">
              Para quem é
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-medium text-white">
              Feito para profissionais exigentes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {audiences.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-500"
              >
                <h3 className="text-xl font-sans font-semibold text-white text-center">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Você envia o arquivo",
    description:
      "PDF / JPG / TIFF / PNG — orientamos o formato ideal para o seu projeto.",
  },
  {
    number: "02",
    title: "Avaliação técnica",
    description:
      "Analisamos tamanho, escala, qualidade, cor, sangria e recortes do arquivo.",
  },
  {
    number: "03",
    title: "Escolha do material e acabamento",
    description:
      "Indicamos o substrato ideal para o seu objetivo e ambiente de aplicação.",
  },
  {
    number: "04",
    title: "Teste de cor (recomendado)",
    description:
      "Enviamos uma amostra impressa para validação antes da produção.",
  },
  {
    number: "05",
    title: "Impressão e finalização",
    description:
      "Produção com padrão premium e controle de qualidade em cada etapa.",
  },
  {
    number: "06",
    title: "Entrega e/ou instalação",
    description:
      "Entrega para todo Brasil com embalagem adequada e instalação conforme necessidade.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block font-bold">
            Como funciona
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900 font-medium">
            Do arquivo à parede, sem dor de cabeça
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              // Classes específicas para controlar visibilidade em cada breakpoint
              let arrowVisibilityClass = "hidden"; // Padrão escondido (mobile)

              if (idx === 0) arrowVisibilityClass = "hidden md:block lg:block";
              if (idx === 1) arrowVisibilityClass = "hidden md:hidden lg:block";
              if (idx === 2) arrowVisibilityClass = "hidden md:block lg:hidden";
              if (idx === 3) arrowVisibilityClass = "hidden md:hidden lg:block";
              if (idx === 4) arrowVisibilityClass = "hidden md:block lg:block";

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative p-8 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-500"
                  style={{ zIndex: steps.length - idx }} // Garante que o card anterior fique sobre o próximo para a seta aparecer
                >
                  <span className="text-5xl font-serif font-medium text-gray-200 absolute top-4 right-6 select-none">
                    {step.number}
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-sans font-semibold text-gray-900 mb-3 pr-10">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Seta de continuidade */}
                  <div
                    className={`absolute -right-7 top-1/2 -translate-y-1/2 text-gray-800 ${arrowVisibilityClass}`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

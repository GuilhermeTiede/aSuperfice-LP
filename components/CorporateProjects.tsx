"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function CorporateProjects() {
  const points = [
    "grandes metragens",
    "prazos coordenados com obra",
    "consistência de impressão em múltiplos ambientes",
    "aplicações técnicas e materiais específicos",
  ];

  const generateWhatsAppLink = () => {
    const phoneNumber = "+5521994408290";
    const message =
      "Olá! Gostaria de falar com um especialista sobre projetos corporativos.";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block font-bold">
              Projetos corporativos e empresariais
            </span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8 text-gray-900 font-medium">
              Soluções para grandes marcas e espaços complexos
            </h2>
            <p className="text-gray-600 text-lg font-light mb-8 leading-relaxed">
              Para espaços comerciais, obras e redes, entregamos soluções sob
              medida para demandas como:
            </p>

            <ul className="space-y-4 mb-10">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <Check className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                  </div>
                  <span className="text-gray-600 font-light text-lg">{point}</span>
                </li>
              ))}
            </ul>

            <div className="border-l-2 border-gray-900 pl-6 py-2 mb-10">
              <p className="text-xl font-serif italic text-gray-800 leading-relaxed">
                &ldquo;Se o projeto é complexo, a execução precisa ser
                precisa.&rdquo;
              </p>
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all rounded-none"
            >
              Falar com um especialista
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] md:aspect-square bg-gray-100 overflow-hidden order-1 md:order-2"
          >
            <Image
              src="/fitness_corporativo.webp"
              alt="Projetos corporativos"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

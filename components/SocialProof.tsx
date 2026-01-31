"use client";

import { motion } from "framer-motion";

const partners = [
  "Studio Alpha Architects",
  "Marina Silva Fine Art",
  "Urban Design Co.",
  "Construct Art",
  "Felipe Oliveira Photography",
  "Modernist Living",
  "Gallery Zero",
  "Blueprint Collective",
];

export function SocialProof() {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 mb-12">
          A Escolha de Arquitetos e Artistas
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 opacity-70">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all"
            >
              <h4 className="text-lg md:text-xl font-serif text-gray-800 text-center">
                {partner}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

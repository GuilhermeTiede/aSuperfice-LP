"use client";

import { motion } from "framer-motion";

const services = [
  {
    category: "Impressão",
    items: [
      "Impressões em Canvas de Qualidade Museológica",
      "Impressões Fine Art Digitais (Giclée)",
      "Painéis de Parede Personalizados",
      "Papéis de Parede com Suporte a Rapport",
    ],
  },
  {
    category: "Serviços",
    items: [
      "Tratamento de Imagem e Pré-Impressão",
      "Instalação Especializada",
      "Consultoria no Local",
      "Soluções de Molduraria Personalizada",
    ],
  },
];

export function ProductsServices() {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 mb-12 md:mb-0">
            <h2 className="text-4xl font-serif text-gray-900 sticky top-32">
              Produtos e <br /> Serviços
            </h2>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((section, idx) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 border-b border-gray-100 pb-4">
                  {section.category}
                </h3>
                <ul className="space-y-6">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-xl md:text-2xl font-light text-gray-800 hover:pl-4 transition-all duration-300 border-l border-transparent hover:border-black cursor-default"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

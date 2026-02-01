"use client";

import { motion } from "framer-motion";

const services = [
  {
    category: "Impressão de Grande Formato",
    items: [
      "Canvas Impresso Personalizado",
      "Papel de Parede Personalizado",
      "Adesivo Vinílico para Decoração e Arquitetura",
      "Gravura e Revestimentos Texturizados",
    ],
  },
  {
    category: "Serviços Especializados",
    items: [
      "Instalação Profissional de Revestimentos",
      "Pré-impressão e Ajuste de Imagem",
      "Consultoria de Materiais e Acabamentos",
      "Projetos Especiais para Arquitetos e Designers",
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

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Printer,
  Layers,
  Palette,
  Image as ImageIcon,
  Hammer,
  MonitorCheck,
  MessageSquareText,
  Ruler, // Substituindo PencilRuler por Ruler que é mais comum ou manter PencilRuler se existir
  PencilRuler,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { QuoteCalculator } from "@/components/QuoteCalculator";

const portfolio = [
  {
    category: "Produtos",
    description:
      "Substratos de alta performance para impressão de altíssima qualidade",
    items: [
      {
        icon: ImageIcon,
        title: "Canvas Decorativo",
        description:
          "Tecido 100% algodão com tratamento especial para reprodução de alta fidelidade.",
      },
      {
        icon: Layers,
        title: "Papel de Parede",
        description:
          "Personalização completa de ambientes com texturas exclusivas (Linho, Areia, Algodão).",
      },
      {
        icon: Palette,
        title: "Adesivo Vinílico",
        description:
          "Soluções versáteis para sinalização, decoração de vidros e superfícies lisas.",
      },
      {
        icon: Printer,
        title: "Gravuras & Texturas",
        description:
          "Revestimentos texturizados que trazem profundidade tátil para seus projetos.",
      },
    ],
  },
  {
    category: "Serviços",
    description: "Expertise técnica do arquivo à instalação",
    items: [
      {
        icon: Hammer,
        title: "Instalação Especializada",
        description:
          "Equipe própria treinada para aplicação perfeita de papéis e adesivos.",
      },
      {
        icon: MonitorCheck,
        title: "Pré-impressão & Tratamento",
        description:
          "Análise crítica de arquivos e correção de cores para garantir o resultado esperado.",
      },
      {
        icon: MessageSquareText,
        title: "Consultoria Técnica",
        description:
          "Apoio na especificação de materiais para arquitetos e designers de interiores.",
      },
      {
        icon: PencilRuler,
        title: "Projetos Especiais",
        description:
          "Desenvolvimento de soluções sob medida para demandas complexas de arquitetura.",
      },
    ],
  },
];

export function ProductsServices() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900 mb-4 block">
            O Que Oferecemos
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
            Soluções Completas em Impressão <br className="hidden md:block" /> e
            Decoração
          </h2>
          <p className="text-gray-600 font-light text-lg">
            Unimos tecnologia de ponta e acabamento artesanal para entregar
            resultados que superam as expectativas de criativos exigentes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {portfolio.map((group, idx) => (
            <div key={group.category} className="space-y-10">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-5xl font-serif text-gray-900 mb-2 font-medium">
                  {group.category}
                </h3>
                <p className="text-gray-500 text-base font-light">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-6">
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIdx * 0.1 + idx * 0.2 }}
                    className="group bg-white p-6 md:p-8 border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-6 items-start"
                    onClick={() => setIsCalculatorOpen(true)}
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-serif font-medium text-gray-900 mb-2 group-hover:text-black">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                        Solicitar Orçamento
                        <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all rounded-none"
          >
            Fale com um Especialista
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <QuoteCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
}

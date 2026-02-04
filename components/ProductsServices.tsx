"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Printer,
  Layers,
  Palette,
  Frame,
  Scroll,
  Hammer,
  MonitorCheck,
  MessageSquareText,
  Ruler, // Substituindo PencilRuler por Ruler que é mais comum ou manter PencilRuler se existir
  PencilRuler,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { cn } from "@/lib/utils";

const portfolio = [
  {
    category: "Produtos",
    description:
      "Substratos de alta performance para impressão de altíssima qualidade",
    items: [
      {
        icon: Frame,
        title: "Canvas p/ Telas",
        description:
          "Tecido 100% algodão com tratamento especial para reprodução de alta fidelidade, para quadros e obras de arte.",
        image: "/projetos_e_servicos/produtos/quadros.webp",
      },
      {
        icon: Scroll,
        title: "Papel de Parede",
        description:
          "Personalização completa de ambientes com texturas exclusivas (Linho, Areia, Algodão).",
        image: "/projetos_e_servicos/produtos/papel de parede.webp",
      },
      {
        icon: Palette,
        title: "Adesivo Vinílico",
        description:
          "Soluções versáteis para sinalização, decoração de vidros e superfícies lisas.",
        image: "/projetos_e_servicos/produtos/adesivos.webp",
      },
      {
        icon: Printer,
        title: "Gravuras & Posters",
        description:
          "Impressões em diversos formatos e substratos para composições de quadros.",
        image: "/projetos_e_servicos/produtos/gravuras.webp",
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
        image: "/projetos_e_servicos/servicos/instalacao-especializada.webp",
      },
      {
        icon: MonitorCheck,
        title: "Pré-impressão & Ajustes",
        description:
          "Análise crítica de arquivos, montagem dos planos de corte e prova de cores para garantir o resultado esperado.",
        image: "/projetos_e_servicos/servicos/pre-impressao-ajustes.webp",
      },
      {
        icon: MessageSquareText,
        title: "Consultoria Técnica",
        description:
          "Apoio na especificação de materiais para arquitetos e designers de interiores.",
        image: "/projetos_e_servicos/servicos/consultoria-tecnica.webp",
      },
      {
        icon: PencilRuler,
        title: "Projetos Especiais & Corporativos",
        description:
          "Desenvolvimento de soluções sob medida para demandas complexas de arquitetura.",
        image: "/projetos_e_servicos/servicos/projetos-especiais.webp",
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
          <span className="text-lg font-bold uppercase tracking-[0.2em] text-gray-900 mb-4 block">
            O Que Oferecemos
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
            Soluções Completas em Impressão <br className="hidden md:block" /> e
            Decoração
          </h2>
          <p className="text-gray-600 font-light text-lg">
            Unimos tecnologia de ponta e acabamento artesanal para entregar
            resultados que superam as expectativas de criativos exigentes.
          </p>
        </div>

        <div className="space-y-24">
          {portfolio.map((group, idx) => (
            <div key={group.category}>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-6 gap-4">
                <div>
                  <h3 className="text-4xl font-serif text-gray-900 mb-2 font-medium">
                    {group.category}
                  </h3>
                  <p className="text-gray-500 text-lg font-light max-w-xl">
                    {group.description}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "grid gap-8",
                  group.category === "Serviços"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                )}
              >
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIdx * 0.1 }}
                    className="group cursor-pointer bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
                    onClick={() => setIsCalculatorOpen(true)}
                  >
                    {item.image && (
                      <div className="relative h-64 w-full overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-1">
                      <div className="mb-6 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300 shrink-0">
                        <item.icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>

                      <h4 className="text-xl font-serif font-medium text-gray-900 mb-3 group-hover:text-black">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 font-light leading-relaxed mb-6 flex-1">
                        {item.description}
                      </p>

                      <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors mt-auto">
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

        <div className="mt-20 text-center">
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

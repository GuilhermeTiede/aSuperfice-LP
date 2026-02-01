"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { QuoteCalculator } from "@/components/QuoteCalculator";

export function Hero() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background com animação não-bloqueante */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-fade-in">
          <Image
            src="/bloco-inicial.webp"
            alt="Textura Artística de Fundo"
            fill
            className="object-cover opacity-40 blur-sm"
            priority
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Conteúdo principal - renderizado imediatamente para LCP */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <span className="block text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase mb-6">
            Impressão de Grande Formato e Consultoria
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight text-gray-900 mb-8">
            Elevando Superfícies <br /> à Arte
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Especializados em impressão de grande formato e decoração de
            superfícies arquitetônicas. Transformamos espaços com substratos
            texturizados premium e qualidade intransigente.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="group bg-black text-white px-8 py-4 text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all rounded-none"
            >
              Inicie seu Projeto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="#materials"
              className="group px-8 py-4 text-sm uppercase tracking-widest border border-gray-300 hover:border-black transition-colors rounded-none"
            >
              Explorar Materiais
            </Link>
          </div>
        </div>
      </div>

      <QuoteCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
}

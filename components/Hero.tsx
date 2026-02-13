"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { QuoteCalculator } from "@/components/QuoteCalculator";

export function Hero() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video com desfoque */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-fade-in">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 blur-sm"
          >
            <source src="/hero_video/hero.webm" type="video/webm" />
          </video>
        </div>
      </div>

      {/* Conteúdo principal - renderizado imediatamente para LCP */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight text-gray-900 mb-8">
            Impressão de Artes em <br /> Grande Formato
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Um ateliê para Artistas, Designers e Arquitetos. Transformamos arte digital em superfícies reais com fidelidade de cor, acabamento premium e suporte técnico do início ao fim.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="group bg-black text-white px-8 py-4 text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all rounded-none"
            >
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/5521994408290"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-green-600 text-white px-8 py-4 text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-green-700 transition-all rounded-none"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Fale pelo WhatsApp
            </a>
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

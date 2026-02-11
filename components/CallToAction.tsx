"use client";

import { useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { QuoteCalculator } from "@/components/QuoteCalculator";

export function CallToAction() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const generateWhatsAppLink = () => {
    const phoneNumber = "+5521994408290";
    const message =
      "Olá! Visitei o site do Ateliê de Impressão da aSuperficie e gostaria de enviar meu arquivo para avaliação de impressão.";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <section id="contact" className="py-32 bg-white text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-8">
          Vamos transformar seu projeto em uma superfície real
        </h2>
        <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
          Se você busca impressão premium com suporte técnico, fale com a
          gente.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-none"
          >
            Solicitar Orçamento
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href={generateWhatsAppLink()}
            target="_blank"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-5 text-sm uppercase tracking-widest hover:bg-green-700 transition-colors rounded-none"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar Arquivo para Avaliação
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-400">
          Ou envie um email para{" "}
          <a
            href="mailto:contato@asuperficie.com.br"
            className="underline hover:text-black"
          >
            contato@asuperficie.com.br
          </a>
        </p>
      </div>

      <QuoteCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
}

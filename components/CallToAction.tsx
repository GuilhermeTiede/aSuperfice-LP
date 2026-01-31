"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function CallToAction() {
  const generateWhatsAppLink = () => {
    const phoneNumber = "+5521994408290";
    const message =
      "Olá! Visitei o site A Superfície e gostaria de agendar uma consultoria para meu projeto.";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <section id="contact" className="py-32 bg-white text-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-8">
          Pronto para Materializar sua Visão?
        </h2>
        <p className="text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
          Agende uma consultoria com nossos especialistas para discutir os
          requisitos únicos do seu projeto.
        </p>

        <Link
          href={generateWhatsAppLink()}
          target="_blank"
          className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-5 text-sm uppercase tracking-widest hover:bg-green-700 transition-colors rounded-full"
        >
          <MessageCircle className="w-5 h-5" />
          Falar no WhatsApp
        </Link>
        <p className="mt-6 text-sm text-gray-400">
          Ou envie um email para{" "}
          <a
            href="mailto:contact@asuperficie.com"
            className="underline hover:text-black"
          >
            contact@asuperficie.com
          </a>
        </p>
      </div>
    </section>
  );
}

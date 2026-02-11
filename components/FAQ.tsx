"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Vocês fazem impressão a partir da minha arte?",
    answer:
      "Sim. Você envia o arquivo e nós orientamos o melhor formato, tamanho e material para garantir a melhor qualidade de impressão.",
  },
  {
    question: "Vocês ajustam o arquivo antes de imprimir?",
    answer:
      "Sim. Fazemos avaliação técnica completa e orientamos ajustes de resolução, cor, sangria e recortes para garantir o melhor resultado.",
  },
  {
    question: "Posso imprimir em grande formato?",
    answer:
      "Sim. Trabalhamos com grandes metragens e murais panorâmicos, atendendo projetos de qualquer escala.",
  },
  {
    question: "Vocês enviam amostra antes da impressão?",
    answer:
      "Sim. Podemos enviar um teste de cor e material para validação antes da produção final. Recomendamos especialmente para projetos de grande escala.",
  },
  {
    question: "Vocês fazem instalação?",
    answer:
      "Sim, em projetos que exigem, contamos com equipe de instalação especializada para aplicação perfeita de papéis de parede e adesivos.",
  },
  {
    question: "Entregam para todo Brasil?",
    answer:
      "Sim. Enviamos para todo o Brasil com embalagem adequada para proteger o material durante o transporte.",
  },
  {
    question: "Quais formatos de arquivo vocês aceitam?",
    answer:
      "Aceitamos PDF, JPG, TIFF e PNG. Caso tenha dúvida sobre o formato ideal, nossa equipe orienta o melhor caminho para o seu projeto.",
  },
  {
    question: "Vocês atendem projetos corporativos?",
    answer:
      "Sim. Atendemos demandas corporativas com grandes metragens, prazos coordenados com obra, consistência de impressão em múltiplos ambientes e materiais específicos.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <h3 className="text-base md:text-lg font-medium text-gray-900 pr-8 group-hover:text-black transition-colors">
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4 block font-bold">
            Dúvidas frequentes
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 font-medium">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto border-t border-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

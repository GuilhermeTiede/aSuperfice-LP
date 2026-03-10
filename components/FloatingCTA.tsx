"use client";

import { useState, useEffect } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalculator } from "@/components/CalculatorContext";
import { trackWhatsAppClick } from "@/lib/analytics";

export function FloatingCTA() {
  const { openCalculator, isOpen } = useCalculator();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 50% of viewport height
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide when calculator modal is open
  if (isOpen) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        >
          <a
            href="https://wa.me/5521994408290?text=Ol%C3%A1!%20Quero%20fazer%20um%20papel%20de%20parede%20personalizado.%20Podem%20me%20ajudar%3F"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("floating_cta", "direct")}
            className="bg-green-600 text-white p-4 flex items-center justify-center shadow-2xl hover:bg-green-700 transition-colors rounded-full"
            aria-label="Fale pelo WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
          <button
            onClick={() => openCalculator("floating_cta")}
            className="bg-black text-white p-4 sm:pl-5 sm:pr-6 sm:py-3.5 flex items-center justify-center gap-3 shadow-2xl hover:bg-gray-800 transition-colors group rounded-full sm:rounded-none"
            aria-label="Solicitar orçamento"
          >
            <Calculator className="w-6 h-6 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-widest font-medium hidden sm:inline">
              Calcular preço
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

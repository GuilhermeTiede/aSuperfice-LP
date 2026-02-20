"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalculator } from "@/components/CalculatorContext";

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
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => openCalculator("floating_cta")}
          className="fixed bottom-6 right-6 z-50 bg-black text-white pl-5 pr-6 py-3.5 flex items-center gap-3 shadow-2xl hover:bg-gray-800 transition-colors group"
          aria-label="Solicitar orçamento"
        >
          <Calculator className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-medium hidden sm:inline">
            Orçamento grátis
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

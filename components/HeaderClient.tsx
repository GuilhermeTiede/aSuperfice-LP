"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { QuoteCalculator } from "@/components/QuoteCalculator";

const navItems = [
  { name: "Sobre", href: "#about" },
  { name: "Materiais", href: "#materials" },
  { name: "Wall Art", href: "#wall-art" },
  { name: "Contato", href: "#contact" },
];

export function HeaderClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Atualiza classes do header baseado no scroll
  useEffect(() => {
    const header = document.getElementById("main-header");
    if (header) {
      if (scrolled) {
        header.classList.add(
          "bg-white/90",
          "backdrop-blur-md",
          "py-4",
          "border-gray-100",
        );
        header.classList.remove("bg-transparent", "py-6");
      } else {
        header.classList.remove(
          "bg-white/90",
          "backdrop-blur-md",
          "py-4",
          "border-gray-100",
        );
        header.classList.add("bg-transparent", "py-6");
      }
    }
  }, [scrolled]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
          >
            {item.name}
          </Link>
        ))}
        <button
          onClick={() => setIsCalculatorOpen(true)}
          className="bg-black text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-none"
        >
          Inicie seu Projeto
        </button>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden z-50 p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-2xl font-serif text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsCalculatorOpen(true);
              }}
              className="mt-4 bg-black text-white px-8 py-3 text-sm uppercase tracking-widest rounded-none"
            >
              Inicie seu Projeto
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <QuoteCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
}

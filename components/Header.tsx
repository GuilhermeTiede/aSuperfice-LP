"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Sobre", href: "#about" },
  { name: "Materiais", href: "#materials" },
  { name: "Wall Art", href: "#wall-art" },
  { name: "Blog", href: "#blog" },
  { name: "Contato", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled
          ? "bg-white/90 backdrop-blur-md py-4 border-gray-100"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight z-50"
        >
          A SUPERFÍCIE
        </Link>

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
          <Link
            href="#contact"
            className="bg-black text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Inicie seu Projeto
          </Link>
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
              <Link
                href="#contact"
                className="mt-4 bg-black text-white px-8 py-3 text-sm uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                Inicie seu Projeto
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

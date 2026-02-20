"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface CalculatorContextType {
  isOpen: boolean;
  source: string;
  openCalculator: (source: string) => void;
  closeCalculator: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");

  const openCalculator = useCallback((src: string) => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const closeCalculator = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <CalculatorContext.Provider value={{ isOpen, source, openCalculator, closeCalculator }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error("useCalculator must be used within CalculatorProvider");
  return ctx;
}

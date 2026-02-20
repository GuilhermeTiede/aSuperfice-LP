"use client";

import type { ReactNode } from "react";
import { CalculatorProvider, useCalculator } from "@/components/CalculatorContext";
import { QuoteCalculator } from "@/components/QuoteCalculator";

function CalculatorModal() {
  const { isOpen, source, closeCalculator } = useCalculator();
  return (
    <QuoteCalculator
      isOpen={isOpen}
      onClose={closeCalculator}
      source={source}
    />
  );
}

export function PageCalculatorProvider({ children }: { children: ReactNode }) {
  return (
    <CalculatorProvider>
      {children}
      <CalculatorModal />
    </CalculatorProvider>
  );
}

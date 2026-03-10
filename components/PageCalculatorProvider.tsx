"use client";

import type { ReactNode } from "react";
import { CalculatorProvider, useCalculator, type InitialWallData } from "@/components/CalculatorContext";
import { QuoteCalculator } from "@/components/QuoteCalculator";

function CalculatorModal() {
  const { isOpen, source, initialWall, closeCalculator } = useCalculator();
  return (
    <QuoteCalculator
      isOpen={isOpen}
      onClose={closeCalculator}
      source={source}
      initialWall={initialWall}
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

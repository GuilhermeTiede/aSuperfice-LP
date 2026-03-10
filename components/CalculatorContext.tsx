"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface InitialWallData {
  height: number;
  width: number;
  product: string;
  includeInstallation: boolean;
}

interface CalculatorContextType {
  isOpen: boolean;
  source: string;
  initialWall: InitialWallData | null;
  openCalculator: (source: string, initialWall?: InitialWallData) => void;
  closeCalculator: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const [initialWall, setInitialWall] = useState<InitialWallData | null>(null);

  const openCalculator = useCallback((src: string, wall?: InitialWallData) => {
    setSource(src);
    setInitialWall(wall ?? null);
    setIsOpen(true);
  }, []);

  const closeCalculator = useCallback(() => {
    setIsOpen(false);
    setInitialWall(null);
  }, []);

  return (
    <CalculatorContext.Provider value={{ isOpen, source, initialWall, openCalculator, closeCalculator }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error("useCalculator must be used within CalculatorProvider");
  return ctx;
}

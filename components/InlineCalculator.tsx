"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { useCalculator } from "@/components/CalculatorContext";
import { trackEvent } from "@/lib/analytics";

const PRODUCT_OPTIONS = [
  { id: "wallpaper", label: "Papel de Parede", price: 130 },
  { id: "vinyl", label: "Adesivo Vinil", price: 100 },
  { id: "canvas", label: "Canvas", price: 350 },
  { id: "engraving", label: "Gravura", price: 200 },
] as const;

export function InlineCalculator() {
  const { openCalculator } = useCalculator();
  const [product, setProduct] = useState<string>("wallpaper");
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [interacted, setInteracted] = useState(false);

  const selectedProduct = PRODUCT_OPTIONS.find((p) => p.id === product);

  const estimatedPrice = useMemo(() => {
    if (height <= 0 || width <= 0) return 0;
    const area = (height / 100) * (width / 100);
    return area * (selectedProduct?.price || 0);
  }, [height, width, selectedProduct]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleInteraction = () => {
    if (!interacted) {
      setInteracted(true);
      trackEvent("inline_calculator_interacted", { product });
    }
  };

  const handleOpenFull = () => {
    trackEvent("inline_calculator_cta_clicked", {
      product,
      height,
      width,
      estimated_price: estimatedPrice,
    });
    openCalculator("inline_calculator");
  };

  return (
    <section className="py-20 md:py-28 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-white" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-medium">
                Simulador rápido
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-medium mb-4">
              Calcule seu projeto agora
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-xl mx-auto">
              Selecione o material, insira as dimensões e veja o valor estimado instantaneamente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 md:p-10"
          >
            {/* Product Selection */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-300 mb-3 block">
                Material
              </label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setProduct(option.id);
                      handleInteraction();
                    }}
                    className={`px-4 py-2.5 text-sm font-medium transition-all border ${
                      product === option.id
                        ? "bg-white text-gray-900 border-white"
                        : "bg-transparent text-gray-400 border-white/20 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Altura (cm)</label>
                <input
                  type="number"
                  placeholder="250"
                  value={height || ""}
                  onChange={(e) => {
                    setHeight(Number.parseInt(e.target.value) || 0);
                    handleInteraction();
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white text-lg focus:outline-none focus:border-white transition-colors placeholder-gray-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Largura (cm)</label>
                <input
                  type="number"
                  placeholder="300"
                  value={width || ""}
                  onChange={(e) => {
                    setWidth(Number.parseInt(e.target.value) || 0);
                    handleInteraction();
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white text-lg focus:outline-none focus:border-white transition-colors placeholder-gray-500"
                />
              </div>
            </div>

            {/* Price Preview + CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div>
                {estimatedPrice > 0 ? (
                  <div>
                    <p className="text-sm text-gray-400">Estimativa</p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(estimatedPrice)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      *Valor aproximado. Inclui montagem e prova de cor.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Insira as dimensões para ver a estimativa
                  </p>
                )}
              </div>

              <button
                onClick={handleOpenFull}
                className="group bg-white text-gray-900 px-8 py-4 text-sm uppercase tracking-widest font-medium flex items-center gap-3 hover:bg-gray-100 transition-all shrink-0"
              >
                {estimatedPrice > 0 ? "Solicitar orçamento" : "Abrir calculadora completa"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              ✓ Mais de 200 projetos realizados · Orçamento em menos de 1 minuto
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

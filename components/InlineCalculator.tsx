"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, MessageCircle } from "lucide-react";
import { useCalculator } from "@/components/CalculatorContext";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";

const SAMPLE_KIT_PRICE = 80;

const PRODUCT_OPTIONS = [
  { id: "wallpaper", label: "Papel de Parede", price: 130 },
  { id: "vinyl", label: "Adesivo Vinil", price: 100 },
  { id: "canvas", label: "Canvas", price: 350 },
  { id: "engraving", label: "Gravura", price: 200 },
  { id: "installation", label: "Instalação", price: 50 },
  { id: "sample_kit", label: "Kit de Amostras", price: SAMPLE_KIT_PRICE },
] as const;

export function InlineCalculator() {
  const { openCalculator } = useCalculator();
  const [product, setProduct] = useState<string>("wallpaper");
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const selectedProduct = PRODUCT_OPTIONS.find((p) => p.id === product);

  const isSampleKit = product === "sample_kit";
  const isInstallation = product === "installation";
  const needsDimensions = !isSampleKit;

  const estimatedPrice = useMemo(() => {
    if (isSampleKit) return SAMPLE_KIT_PRICE;
    if (height <= 0 || width <= 0) return 0;
    const area = (height / 100) * (width / 100);
    const price = area * (selectedProduct?.price || 0);
    if (isInstallation) return Math.max(price, 400);
    return price;
  }, [height, width, selectedProduct, isSampleKit, isInstallation]);

  const wallLabel = useMemo(() => {
    switch (product) {
      case "wallpaper":
      case "vinyl":
        return "Parede 1";
      case "installation":
        return "Instalação 1";
      case "sample_kit":
        return "Item 1";
      default:
        return "Imagem 1";
    }
  }, [product]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleInteraction = () => {
    if (!interacted) {
      setInteracted(true);
      trackEvent("inline_calculator_interacted", { product });
    }
  };

  const handleAddMoreWalls = () => {
    trackEvent("inline_calculator_cta_clicked", {
      product,
      height,
      width,
      estimated_price: estimatedPrice,
    });
    if (estimatedPrice > 0) {
      openCalculator("inline_calculator", {
        height,
        width,
        product,
        includeInstallation,
      });
    } else {
      openCalculator("inline_calculator");
    }
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
              Quanto custa seu papel de parede?
            </h2>
            <p className="text-gray-400 font-light text-lg max-w-xl mx-auto">
              Insira a largura e altura da parede em centímetros e veja o valor na hora.
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
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-300">
                  {wallLabel}
                </label>
              </div>
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

            {/* Dimensions — hidden for sample_kit */}
            {needsDimensions && (
              <div className="grid grid-cols-2 gap-4 mb-6">
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
              </div>
            )}

            {/* Installation checkbox — only for product types that support it */}
            {!isSampleKit && !isInstallation && (
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="inline-install"
                  checked={includeInstallation}
                  onChange={(e) => {
                    setIncludeInstallation(e.target.checked);
                    handleInteraction();
                  }}
                  className="rounded border-gray-500 text-white focus:ring-white w-3.5 h-3.5"
                />
                <label
                  htmlFor="inline-install"
                  className="text-sm text-gray-400 cursor-pointer"
                >
                  Desejo cotar instalação
                </label>
              </div>
            )}

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
                    {needsDimensions
                      ? "Insira as dimensões para ver a estimativa"
                      : "Selecione um material"}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <button
                  onClick={handleAddMoreWalls}
                  className="group bg-white text-gray-900 px-8 py-4 text-sm uppercase tracking-widest font-medium flex items-center gap-3 hover:bg-gray-100 transition-all"
                >
                  {estimatedPrice > 0 ? "Adicionar mais paredes" : "Abrir calculadora completa"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                {estimatedPrice > 0 && (
                  <a
                    href={`https://wa.me/5521994408290?text=${encodeURIComponent(
                      isSampleKit
                        ? `Olá! Gostaria de iniciar um projeto com o Ateliê de Impressão da aSuperficie.\n\n*Detalhes do Projeto:*\n- Item 1: Kit de Amostras\n  Preço: ${formatCurrency(SAMPLE_KIT_PRICE)}\n\n*Total Geral Estimado:* ${formatCurrency(SAMPLE_KIT_PRICE)}\n\nGostaria de agendar uma consultoria para discutir detalhes.`
                        : `Olá! Gostaria de iniciar um projeto com o Ateliê de Impressão da aSuperficie.\n\n*Detalhes do Projeto:*\n- ${wallLabel}: ${width}cm x ${height}cm (${selectedProduct?.label})\n  Estimativa: ${formatCurrency(estimatedPrice)} (inclui Montagem e prova de cor)${includeInstallation ? "\n  *→ Cliente deseja cotar instalação*" : ""}\n\n*Total Geral Estimado:* ${formatCurrency(estimatedPrice)}\n\nGostaria de agendar uma consultoria para discutir detalhes.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackWhatsAppClick("inline_calculator", "direct_with_price");
                      trackEvent("inline_calculator_whatsapp_click", {
                        product,
                        height,
                        width,
                        estimated_price: estimatedPrice,
                      });
                    }}
                    className="group border border-green-500 text-green-400 px-8 py-3 text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-3 hover:bg-green-500/10 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Finalizar pelo WhatsApp
                  </a>
                )}
              </div>
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

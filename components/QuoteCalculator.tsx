"use client";

import { useState } from "react";
import { Plus, Trash2, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Wall = {
  id: string;
  height: number;
  width: number;
};

const ROLL_WIDTH = 120; // cm
const ROLL_HEIGHT = 300; // cm

// Helper: Calculate rolls
const calculateRolls = (
  walls: Wall[],
): {
  wallId: string;
  rolls: number;
  widthRolls: number;
  heightRolls: number;
}[] => {
  return walls.map((wall) => {
    if (wall.width <= 0 || wall.height <= 0) {
      return { wallId: wall.id, rolls: 0, widthRolls: 0, heightRolls: 0 };
    }
    // Logic from reference
    const widthRolls = Math.ceil(wall.width / ROLL_WIDTH);
    const heightRolls = Math.ceil(wall.height / ROLL_HEIGHT);
    return {
      wallId: wall.id,
      rolls: widthRolls * heightRolls,
      widthRolls,
      heightRolls,
    };
  });
};

interface QuoteCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteCalculator({ isOpen, onClose }: QuoteCalculatorProps) {
  const [walls, setWalls] = useState<Wall[]>([
    { id: "1", height: 0, width: 0 },
  ]);

  const addWall = () => {
    setWalls([...walls, { id: Date.now().toString(), height: 0, width: 0 }]);
  };

  const removeWall = (id: string) => {
    if (walls.length > 1) {
      setWalls(walls.filter((wall) => wall.id !== id));
    }
  };

  const updateWall = (id: string, field: "height" | "width", value: number) => {
    setWalls(
      walls.map((wall) =>
        wall.id === id ? { ...wall, [field]: value } : wall,
      ),
    );
  };

  const rollsData = calculateRolls(walls);
  const totalRolls = rollsData.reduce((sum, data) => sum + data.rolls, 0);

  const generateWhatsAppMessage = () => {
    const wallsInfo = walls
      .map(
        (wall, index) =>
          `Parede ${index + 1}: ${wall.height}cm (altura) x ${wall.width}cm (largura)`,
      )
      .join("\n");

    const message = `Olá! Gostaria de iniciar um projeto com A Superfície.

📐 *Medidas estimadas:*
${wallsInfo}

📦 *Estimativa de material (Base 120x300cm):*
- Total de rolos sugeridos: ${totalRolls}

Gostaria de agendar uma consultoria para discutir materiais e acabamentos.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5521994408290"; // Replace with actual number
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-serif font-medium text-gray-900">
                Calculadora de Projeto
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                Informe as medidas das paredes para ter uma estimativa inicial
                de material para revestimento (Papel de Parede ou Painéis).
              </p>

              <div className="space-y-4">
                {walls.map((wall, index) => (
                  <div
                    key={wall.id}
                    className="p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Parede {index + 1}
                      </span>
                      {walls.length > 1 && (
                        <button
                          onClick={() => removeWall(wall.id)}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                          Altura (cm)
                        </label>
                        <input
                          type="number"
                          placeholder="250"
                          value={wall.height || ""}
                          onChange={(e) =>
                            updateWall(
                              wall.id,
                              "height",
                              Number.parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                          Largura (cm)
                        </label>
                        <input
                          type="number"
                          placeholder="300"
                          value={wall.width || ""}
                          onChange={(e) =>
                            updateWall(
                              wall.id,
                              "width",
                              Number.parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                    {rollsData.find((r) => r.wallId === wall.id)?.rolls! >
                      0 && (
                      <p className="text-xs text-gray-500 pt-1">
                        Estimativa:{" "}
                        <span className="font-medium text-gray-900">
                          {rollsData.find((r) => r.wallId === wall.id)?.rolls}{" "}
                          rolo(s)
                        </span>
                      </p>
                    )}
                  </div>
                ))}

                <button
                  onClick={addWall}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar outra parede
                </button>
              </div>

              {totalRolls > 0 && (
                <div className="p-4 bg-gray-900 text-white rounded-xl flex items-center justify-between">
                  <span className="text-sm text-gray-300">Total Estimado</span>
                  <span className="text-lg font-medium">
                    {totalRolls} rolos
                  </span>
                </div>
              )}

              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all shadow-lg ${
                  totalRolls > 0
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Continuar no WhatsApp
              </a>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed px-4">
                *O cálculo é uma estimativa baseada em rolos padrão de 120cm de
                largura. A consultoria técnica validará as medidas finais.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

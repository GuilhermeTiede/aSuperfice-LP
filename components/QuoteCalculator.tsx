"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  MessageCircle,
  X,
  Paperclip,
  FileText,
  Image as ImageIcon,
  File,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Wall = {
  id: string;
  height: number;
  width: number;
  product: ProductType;
  files: AttachedFile[];
  includeInstallation: boolean;
};

type ProductType =
  | "wallpaper"
  | "vinyl"
  | "canvas"
  | "engraving"
  | "sample_kit";

const FIXED_SETUP_PRICE = 350;
const SAMPLE_KIT_PRICE = 80;

const PRODUCT_OPTIONS = [
  { id: "wallpaper", label: "Papel de Parede", price: 180 },
  { id: "vinyl", label: "Adesivo Vinil", price: 150 },
  { id: "canvas", label: "Canvas", price: 350 },
  { id: "engraving", label: "Gravura", price: 200 },
  { id: "sample_kit", label: "Kit de Amostras", price: SAMPLE_KIT_PRICE },
] as const;

type AttachedFile = {
  id: string;
  file: File;
  preview?: string;
  uploadedUrl?: string;
  uploading?: boolean;
  error?: boolean;
};

// Cloudinary config
const CLOUDINARY_CLOUD_NAME = "dtmiqeaog";
const CLOUDINARY_UPLOAD_PRESET = "asuperficie_uploads"; // Must be set to "Unsigned" in Cloudinary settings

interface QuoteCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteCalculator({ isOpen, onClose }: QuoteCalculatorProps) {
  const [walls, setWalls] = useState<Wall[]>([
    {
      id: "1",
      height: 0,
      width: 0,
      product: "wallpaper",
      files: [],
      includeInstallation: false,
    },
  ]);
  const [generalNotes, setGeneralNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  // Remove global attachedFiles state and specific fileInputRef since we'll use per-wall inputs

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "asuperficie-projetos");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Cloudinary error details:", errorData);
        throw new Error(
          errorData.error?.message || `Upload failed: ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  const addWall = () => {
    setWalls([
      ...walls,
      {
        id: Date.now().toString(),
        height: 0,
        width: 0,
        product: "wallpaper",
        files: [],
        includeInstallation: false,
      },
    ]);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateWallPrice = (wall: Wall) => {
    if (wall.product === "sample_kit") return SAMPLE_KIT_PRICE;
    if (wall.height <= 0 || wall.width <= 0) return 0;
    const pricePerSqm =
      PRODUCT_OPTIONS.find((p) => p.id === wall.product)?.price || 0;
    const area = (wall.height / 100) * (wall.width / 100);

    const shouldAddSetupPrice =
      wall.product === "wallpaper" || wall.product === "vinyl";

    return area * pricePerSqm + (shouldAddSetupPrice ? FIXED_SETUP_PRICE : 0);
  };

  const totalPrice = walls.reduce(
    (acc, wall) => acc + calculateWallPrice(wall),
    0,
  );

  const removeWall = (id: string) => {
    if (walls.length > 1) {
      setWalls(walls.filter((wall) => wall.id !== id));
    }
  };

  const updateWall = (
    id: string,
    field: "height" | "width" | "product" | "includeInstallation",
    value: number | ProductType | boolean,
  ) => {
    setWalls(
      walls.map((wall) =>
        wall.id === id ? { ...wall, [field]: value } : wall,
      ),
    );
  };

  // File handling
  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    wallId: string,
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: AttachedFile[] = Array.from(files).map((file) => {
      const attachedFile: AttachedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        uploading: true,
      };

      // Create preview for images
      if (file.type.startsWith("image/")) {
        attachedFile.preview = URL.createObjectURL(file);
      }

      return attachedFile;
    });

    // Add files to wall state immediately
    setWalls((prevWalls) =>
      prevWalls.map((wall) =>
        wall.id === wallId
          ? { ...wall, files: [...wall.files, ...newFiles] }
          : wall,
      ),
    );

    setIsUploading(true);

    // Upload each file to Cloudinary
    for (const attachedFile of newFiles) {
      const uploadedUrl = await uploadToCloudinary(attachedFile.file);

      setWalls((prevWalls) =>
        prevWalls.map((wall) =>
          wall.id === wallId
            ? {
                ...wall,
                files: wall.files.map((f) =>
                  f.id === attachedFile.id
                    ? {
                        ...f,
                        uploadedUrl: uploadedUrl || undefined,
                        uploading: false,
                        error: !uploadedUrl,
                      }
                    : f,
                ),
              }
            : wall,
        ),
      );
    }

    setIsUploading(false);

    // Reset input
    e.target.value = "";
  };

  const removeFile = (wallId: string, fileId: string) => {
    setWalls((prevWalls) =>
      prevWalls.map((wall) => {
        if (wall.id !== wallId) return wall;

        const fileToRemove = wall.files.find((f) => f.id === fileId);
        if (fileToRemove?.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }

        return {
          ...wall,
          files: wall.files.filter((f) => f.id !== fileId),
        };
      }),
    );
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/"))
      return <ImageIcon className="w-4 h-4" />;
    if (file.type.includes("pdf") || file.type.includes("document"))
      return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const generateWhatsAppMessage = () => {
    const projectDetails = walls
      .map((wall, index) => {
        const productName = PRODUCT_OPTIONS.find(
          (p) => p.id === wall.product,
        )?.label;
        const price = calculateWallPrice(wall);
        const files = wall.files
          .filter((f) => f.uploadedUrl)
          .map((f) => `   (Anexo: ${f.uploadedUrl})`)
          .join("\n");

        const installationText = wall.includeInstallation
          ? "\n  *→ Cliente deseja cotar instalação*"
          : "";

        const wallLabel =
          wall.product === "wallpaper"
            ? `Parede ${index + 1}`
            : wall.product === "sample_kit"
              ? `Item ${index + 1}`
              : `Imagem ${index + 1}`;

        if (wall.product === "sample_kit") {
          return `- ${wallLabel}: Kit de Amostras\n  Preço: ${formatCurrency(SAMPLE_KIT_PRICE)}`;
        }

        return `- ${wallLabel}: ${wall.height}cm x ${wall.width}cm (${productName})\n  Estimativa: ${formatCurrency(price)} (inclui Montagem e prova de cor)${installationText}${files ? "\n" + files : ""}`;
      })
      .join("\n\n");

    const message = `Olá! Gostaria de iniciar um projeto com o Ateliê de Impressão da aSuperficie.

*Detalhes do Projeto:*
${projectDetails}

*Total Geral Estimado:* ${formatCurrency(totalPrice)}
${generalNotes ? `\n*Observações Gerais:*\n${generalNotes}` : ""}

Gostaria de agendar uma consultoria para discutir detalhes.`;

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
                className="p-2 hover:bg-gray-100 rounded-none transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Medidas e Material
                  </label>
                  <p className="text-xs text-gray-500">
                    Informe altura, largura e material para cada área
                  </p>
                </div>

                {walls.map((wall, index) => (
                  <div
                    key={wall.id}
                    className="p-4 bg-gray-50 rounded-xl space-y-4 border border-gray-100"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {wall.product === "wallpaper"
                          ? `Parede ${index + 1}`
                          : wall.product === "sample_kit"
                            ? `Item ${index + 1}`
                            : `Imagem ${index + 1}`}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-wrap gap-1">
                          {PRODUCT_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              onClick={() =>
                                updateWall(
                                  wall.id,
                                  "product",
                                  option.id as ProductType,
                                )
                              }
                              className={`px-2 py-1 rounded-none text-[10px] font-medium transition-all border ${
                                wall.product === option.id
                                  ? "bg-black text-white border-black"
                                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        {walls.length > 1 && (
                          <button
                            onClick={() => removeWall(wall.id)}
                            className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-none transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {wall.product !== "sample_kit" && (
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
                    )}

                    <div className="pt-2 flex justify-between items-end border-t border-gray-100 mt-4">
                      <div className="flex-1 mr-4 flex flex-col gap-3">
                        {wall.product !== "sample_kit" && (
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`install-${wall.id}`}
                              checked={!!wall.includeInstallation}
                              onChange={(e) =>
                                updateWall(
                                  wall.id,
                                  "includeInstallation",
                                  e.target.checked,
                                )
                              }
                              className="rounded border-gray-300 text-black focus:ring-black w-3 h-3"
                            />
                            <label
                              htmlFor={`install-${wall.id}`}
                              className="text-xs text-gray-700 cursor-pointer"
                            >
                              Desejo cotar instalação
                            </label>
                          </div>
                        )}

                        <div>
                          <label
                            htmlFor={`file-upload-${wall.id}`}
                            className="cursor-pointer flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Paperclip className="w-3 h-3" />
                            Anexar arquivo
                          </label>
                          <input
                            id={`file-upload-${wall.id}`}
                            type="file"
                            multiple
                            onChange={(e) => handleFileSelect(e, wall.id)}
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.dwg,.dxf"
                          />
                        </div>

                        {/* Files List for this Wall */}
                        {wall.files && wall.files.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {wall.files.map((file) => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded text-[10px]"
                              >
                                <div className="flex items-center gap-1 truncate max-w-[120px]">
                                  {getFileIcon(file.file)}
                                  <span className="truncate">
                                    {file.file.name}
                                  </span>
                                </div>
                                <button
                                  onClick={() => removeFile(wall.id, file.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {(wall.height > 0 ||
                        wall.width > 0 ||
                        wall.product === "sample_kit") && (
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Estimativa:{" "}
                            <span className="font-medium text-gray-900">
                              {formatCurrency(calculateWallPrice(wall))}
                            </span>
                          </p>
                          {wall.product !== "sample_kit" && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              (Inclui montagem e prova de cor)
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={addWall}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-none text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar outra parede
                </button>
              </div>

              {/* General Notes */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Observações Gerais
                  </label>
                  <textarea
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="Alguma observação específica sobre o projeto?"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black transition-colors min-h-[80px]"
                  />
                </div>
              </div>

              {/* Total Summary */}
              {totalPrice > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Estimado</span>
                    <span className="font-medium text-lg text-gray-900">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    *Valor aproximado. O orçamento final será enviado após
                    análise técnica.
                    <br />* Valor já incluso montagem e prova de cor.
                  </p>
                </div>
              )}

              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-none font-medium flex items-center justify-center gap-2 transition-all shadow-lg ${
                  walls.some(
                    (w) =>
                      (w.height > 0 && w.width > 0) ||
                      w.product === "sample_kit",
                  ) && !isUploading
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                {isUploading ? "Enviando arquivos..." : "Continuar no WhatsApp"}
              </a>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed px-4">
                *Ao continuar, você falará diretamente com nossa equipe técnica
                para confirmar medidas e receber o orçamento final.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

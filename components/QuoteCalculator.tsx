"use client";

import { useState, useRef } from "react";
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
};

type ProductType = "wallpaper" | "vinyl" | "canvas" | "engraving";
type WallpaperTexture = "linen" | "sand" | "cotton";

const PRODUCT_OPTIONS = [
  { id: "wallpaper", label: "Papel de Parede" },
  { id: "vinyl", label: "Adesivo Vinil" },
  { id: "canvas", label: "Canvas" },
  { id: "engraving", label: "Gravura" },
] as const;

const TEXTURE_OPTIONS = [
  { id: "linen", label: "Linho" },
  { id: "sand", label: "Areia" },
  { id: "cotton", label: "Algodão (Liso)" },
] as const;

type AttachedFile = {
  id: string;
  file: File;
  preview?: string;
  uploadedUrl?: string;
  uploading?: boolean;
  error?: boolean;
};

const ROLL_WIDTH = 120; // cm
const ROLL_HEIGHT = 300; // cm

// Cloudinary config
const CLOUDINARY_CLOUD_NAME = "dtmiqeaog";
const CLOUDINARY_UPLOAD_PRESET = "asuperficie_uploads"; // Must be set to "Unsigned" in Cloudinary settings

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
  const [productType, setProductType] = useState<ProductType>("wallpaper");
  const [texture, setTexture] = useState<WallpaperTexture>("linen");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const totalArea = walls.reduce(
    (acc, wall) => acc + (wall.width * wall.height) / 10000,
    0,
  );

  // File handling
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setAttachedFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(true);

    // Upload each file to Cloudinary
    for (const attachedFile of newFiles) {
      const uploadedUrl = await uploadToCloudinary(attachedFile.file);

      setAttachedFiles((prev) =>
        prev.map((f) =>
          f.id === attachedFile.id
            ? {
                ...f,
                uploadedUrl: uploadedUrl || undefined,
                uploading: false,
                error: !uploadedUrl,
              }
            : f,
        ),
      );
    }

    setIsUploading(false);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/"))
      return <ImageIcon className="w-4 h-4" />;
    if (file.type.includes("pdf") || file.type.includes("document"))
      return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const generateWhatsAppMessage = () => {
    const productName = PRODUCT_OPTIONS.find(
      (p) => p.id === productType,
    )?.label;
    const textureName = TEXTURE_OPTIONS.find((t) => t.id === texture)?.label;

    const wallsInfo = walls
      .map(
        (wall, index) =>
          `${productType === "wallpaper" ? "Parede" : "Medida"} ${index + 1}: ${wall.height}cm (altura) x ${wall.width}cm (largura)`,
      )
      .join("\n");

    // Include uploaded file links
    const uploadedFiles = attachedFiles.filter((f) => f.uploadedUrl);
    const filesInfo =
      uploadedFiles.length > 0
        ? `\n\n📎 *Arquivos anexados (${uploadedFiles.length}):*\n${uploadedFiles.map((f) => `• ${f.file.name}: ${f.uploadedUrl}`).join("\n")}`
        : "";

    let estimateInfo = "";
    if (productType === "wallpaper") {
      estimateInfo = `\n📦 *Estimativa de material (Base 120x300cm):*\n- Total de rolos sugeridos: ${totalRolls}`;
    } else {
      estimateInfo = `\n📐 *Área total estimada:*\n- ${totalArea.toFixed(2)} m²`;
    }

    const message = `Olá! Gostaria de iniciar um projeto com A Superfície.

🎨 *Produto:* ${productName}${productType === "wallpaper" ? `\n🏷️ *Acabamento:* ${textureName}` : ""}

📏 *Medidas:*
${wallsInfo}
${estimateInfo}${filesInfo}

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
                <label className="text-sm font-medium text-gray-900 block">
                  O que você deseja criar?
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setProductType(option.id as ProductType)}
                      className={`px-4 py-2 rounded-none text-sm font-medium transition-all ${
                        productType === option.id
                          ? "bg-black text-white shadow-md transform scale-[1.02]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {productType === "wallpaper" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <label className="text-sm font-medium text-gray-900 block mb-3">
                        Escolha o acabamento
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TEXTURE_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            onClick={() =>
                              setTexture(option.id as WallpaperTexture)
                            }
                            className={`px-4 py-2 rounded-none text-xs font-medium border transition-all ${
                              texture === option.id
                                ? "border-black bg-black/5 text-black"
                                : "border-gray-200 text-gray-500 hover:border-gray-300"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Medidas
                  </label>
                  <p className="text-xs text-gray-500">
                    {productType === "wallpaper"
                      ? "Informe altura e largura de cada parede"
                      : "Informe as dimensões desejadas"}
                  </p>
                </div>

                {walls.map((wall, index) => (
                  <div
                    key={wall.id}
                    className="p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {productType === "wallpaper" ? "Parede" : "Medida"}{" "}
                        {index + 1}
                      </span>
                      {walls.length > 1 && (
                        <button
                          onClick={() => removeWall(wall.id)}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-none transition-colors"
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
                    {productType === "wallpaper" &&
                      rollsData.find((r) => r.wallId === wall.id)?.rolls! >
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
                  className="w-full py-3 border border-dashed border-gray-300 rounded-none text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {productType === "wallpaper"
                    ? "Adicionar outra parede"
                    : "Adicionar outra medida"}
                </button>
              </div>

              {/* File Attachment Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Anexar Arquivos (opcional)
                  </label>
                  <span className="text-xs text-gray-400">
                    Plantas, referências, imagens
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.dwg,.dxf"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-none text-gray-500 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Paperclip className="w-4 h-4" />
                  Selecionar arquivos
                </button>

                {/* Attached Files List */}
                {attachedFiles.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {attachedFiles.map((attached) => (
                      <div
                        key={attached.id}
                        className={`flex items-center gap-3 p-2 rounded-lg border ${
                          attached.error
                            ? "bg-red-50 border-red-200"
                            : attached.uploadedUrl
                              ? "bg-green-50 border-green-200"
                              : attached.uploading
                                ? "bg-blue-50 border-blue-200"
                                : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        {attached.preview ? (
                          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={attached.preview}
                              alt={attached.file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
                            {getFileIcon(attached.file)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 truncate">
                            {attached.file.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-400">
                              {formatFileSize(attached.file.size)}
                            </p>
                            {attached.uploading && (
                              <span className="text-xs text-blue-600 flex items-center gap-1">
                                <span className="animate-spin">⏳</span>{" "}
                                Enviando...
                              </span>
                            )}
                            {attached.uploadedUrl && (
                              <span className="text-xs text-green-600">
                                ✓ Pronto
                              </span>
                            )}
                            {attached.error && (
                              <span className="text-xs text-red-600">
                                ✗ Erro
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(attached.id)}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-none transition-colors flex-shrink-0"
                          disabled={attached.uploading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {attachedFiles.length > 0 && (
                  <p className="text-[10px] text-blue-600 bg-blue-50 p-2 rounded-lg">
                    ☁️ Os arquivos são enviados automaticamente para a nuvem. Os
                    links serão incluídos na mensagem do WhatsApp.
                  </p>
                )}
              </div>

              {totalRolls > 0 && productType === "wallpaper" && (
                <div className="p-4 bg-gray-900 text-white rounded-xl flex items-center justify-between">
                  <span className="text-sm text-gray-300">Total Estimado</span>
                  <span className="text-lg font-medium">
                    {totalRolls} rolos
                  </span>
                </div>
              )}

              {totalArea > 0 && productType !== "wallpaper" && (
                <div className="p-4 bg-gray-900 text-white rounded-xl flex items-center justify-between">
                  <span className="text-sm text-gray-300">Total Estimado</span>
                  <span className="text-lg font-medium">
                    {totalArea.toFixed(2)} m²
                  </span>
                </div>
              )}

              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-none font-medium flex items-center justify-center gap-2 transition-all shadow-lg ${
                  (productType === "wallpaper"
                    ? totalRolls > 0
                    : totalArea > 0) && !isUploading
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                {isUploading ? "Enviando arquivos..." : "Continuar no WhatsApp"}
              </a>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed px-4">
                {productType === "wallpaper"
                  ? "*O cálculo é uma estimativa baseada em rolos padrão de 120cm de largura."
                  : "*O cálculo de área é estimado. A consultoria confirmará as medidas e formatos ideais."}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

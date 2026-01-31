import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Superfície | Impressão Artística Premium",
  description:
    "Estúdio de impressão artística de alto padrão para Wall Art e superfícies arquitetônicas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="${inter.variable} ${cormorantGaramond.variable} antialiased bg-white text-gray-950 font-sans selection:bg-gray-200 selection:text-black">
        {children}
      </body>
    </html>
  );
}

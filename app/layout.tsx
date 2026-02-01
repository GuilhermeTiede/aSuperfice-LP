import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "A Superfície | Impressão Artística Premium",
  description:
    "Estúdio de impressão artística de alto padrão para Wall Art e superfícies arquitetônicas.",
};

// CSS crítico inline para renderização inicial (above-the-fold)
const criticalCSS = `
  *,*::before,*::after{box-sizing:border-box;border:0 solid}
  html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif}
  body{margin:0;line-height:inherit;background-color:#fcfbf8;color:#0c0a09}
  h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}
  img{display:block;max-width:100%;height:auto}
  .scroll-smooth{scroll-behavior:smooth}
  .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  .relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}
  .inset-0{inset:0}.z-0{z-index:0}.z-10{z-index:10}.z-50{z-index:50}
  .flex{display:flex}.hidden{display:none}.block{display:block}
  .h-screen{height:100vh}.w-full{width:100%}
  .items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:between}
  .overflow-hidden{overflow:hidden}.text-center{text-align:center}
  .bg-white{background-color:#fcfbf8}.bg-transparent{background-color:transparent}
  .text-gray-900{color:#111827}.text-gray-600{color:#4b5563}.text-gray-500{color:#6b7280}
  .font-serif{font-family:var(--font-cormorant-garamond),ui-serif,serif}
  .font-sans{font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif}
  .text-5xl{font-size:3rem;line-height:1}.text-lg{font-size:1.125rem;line-height:1.75rem}
  .font-medium{font-weight:500}.font-light{font-weight:300}
  .leading-tight{line-height:1.25}.leading-relaxed{line-height:1.625}
  .uppercase{text-transform:uppercase}.tracking-widest{letter-spacing:.1em}
  .mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.mb-10{margin-bottom:2.5rem}
  .pt-20{padding-top:5rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}
  .mx-auto{margin-left:auto;margin-right:auto}.max-w-4xl{max-width:56rem}.max-w-2xl{max-width:42rem}
  .container{width:100%;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
  .object-cover{object-fit:cover}.opacity-40{opacity:.4}.blur-sm{filter:blur(4px)}
  .transition-all{transition:all .15s cubic-bezier(.4,0,.2,1)}
  .bg-black{background-color:#000}.text-white{color:#fcfbf8}
  .rounded-full{border-radius:9999px}.border{border-width:1px}
  @keyframes fade-in{from{opacity:0}to{opacity:1}}
  @keyframes fade-in-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .animate-fade-in{animation:fade-in 1s ease-out forwards}
  .animate-fade-in-up{animation:fade-in-up .6s ease-out forwards}
  @media(min-width:768px){.md\\:text-7xl{font-size:4.5rem;line-height:1}.md\\:text-xl{font-size:1.25rem;line-height:1.75rem}.md\\:flex{display:flex}.md\\:hidden{display:none}}
  @media(min-width:1024px){.lg\\:text-8xl{font-size:6rem;line-height:1}}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* CSS crítico inline para evitar bloqueio de renderização */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        {/* Preload imagem crítica do Hero para LCP */}
        <link
          rel="preload"
          href="/bloco-inicial.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Preload logo para header */}
        <link
          rel="preload"
          href="/logo-asuperficie.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body
        className={`${inter.variable} ${cormorantGaramond.variable} antialiased bg-[var(--color-paper)] text-gray-950 font-sans selection:bg-gray-200 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}

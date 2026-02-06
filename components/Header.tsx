import Link from "next/link";
import Image from "next/image";
import { HeaderClient } from "./HeaderClient";

// Server Component - renderiza imediatamente no HTML sem esperar JS
export function Header() {
  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent bg-transparent py-6"
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo e nome - renderizado no servidor para LCP rápido */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src="/logo-ateliedeimpressao.webp"
              alt="Ateliê de Impressão | aSuperficie"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">
            Ateliê de Impressão{" "}
            <span className="font-sans text-lg md:text-xl font-light opacity-80">
              | aSuperficie
            </span>
          </span>
        </Link>

        {/* Parte interativa carregada no cliente */}
        <HeaderClient />
      </div>
    </header>
  );
}

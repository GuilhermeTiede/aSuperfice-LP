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
        {/* Logo - renderizado no servidor para LCP rápido */}
        <Link href="/" className="flex shrink-0 items-center z-50">
          <Image
            src="/logos/assinatura-art-print.svg"
            alt="aSuperficie art print"
            width={480}
            height={157}
            className="site-logo"
            priority
          />
        </Link>

        {/* Parte interativa carregada no cliente */}
        <HeaderClient />
      </div>
    </header>
  );
}

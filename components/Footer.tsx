import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white py-16 border-t border-gray-900">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-800">
              <Image
                src="/logo-asuperficie.webp"
                alt="Ateliê de Impressão | aSuperficie"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">
              Ateliê de Impressão{" "}
              <span className="font-sans text-lg font-light opacity-60">
                | aSuperficie
              </span>
            </span>
          </Link>
          <p className="text-gray-400 font-light max-w-sm mb-8">
            Estúdio de impressão de grande formato e consultoria técnica para
            arquitetos e designers de interiores.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/ateliedeimpressao"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:contato@asuperficie.com.br"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
            Location
          </h4>
          <div className="flex items-start gap-3 text-gray-300 font-light">
            <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
            <address className="not-italic">
              Niterói, RJ – Brazil
              <br />
              <span className="text-gray-500 text-sm mt-2 block">
                Atendendo a todo o Brasil
              </span>
            </address>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
            Mapa do Site
          </h4>
          <ul className="space-y-3 font-light text-gray-300">
            <li>
              <Link
                href="#about"
                className="hover:text-white transition-colors"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="#materials"
                className="hover:text-white transition-colors"
              >
                Materiais
              </Link>
            </li>
            <li>
              <Link
                href="#wall-art"
                className="hover:text-white transition-colors"
              >
                Wall Art
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-white transition-colors"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-900 text-center text-gray-600 text-xs tracking-widest">
        &copy; {currentYear} Ateliê de Impressão | aSuperficie. Todos os
        direitos reservados.
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // Lista de jogos para o Sub-Header
  const jogos = [
    { nome: "Warframe", slug: "warframe", icon: "/caverna icon.png" }, // Usei seu ícone de caverna como placeholder
    { nome: "Albion Online", slug: "albion", icon: "/caverna icon.png" },
    { nome: "Path of Exile 2", slug: "poe2", icon: "/caverna icon.png" },
    { nome: "Guild Wars 2", slug: "gw2", icon: "/caverna icon.png" },
  ];

  return (
    <header className="w-full flex flex-col fixed top-0 z-50">
      {/* 1. SUB-HEADER (BARRA DE JOGOS) */}
      <div className="w-full h-9 bg-black/60 backdrop-blur-md border-b border-white/5 flex items-center justify-center px-4">
        <div className="max-w-[1200px] w-full flex items-center gap-6">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nossos Reinos:</span>
          <div className="flex items-center gap-4">
            {jogos.map((jogo) => (
              <Link 
                key={jogo.slug} 
                href={`/jogos/${jogo.slug}`}
                className="group flex items-center gap-2 transition-all"
              >
                <div className="relative w-5 h-5 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image src={jogo.icon} alt={jogo.nome} fill className="object-contain" />
                </div>
                <span className="text-[11px] font-medium text-gray-400 group-hover:text-accent transition-colors">
                  {jogo.nome}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <div className="w-full h-16 bg-header/90 backdrop-blur-lg border-b border-border-dark flex items-center justify-center px-5">
        <div className="max-w-[1200px] w-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/caverna gelida.png" 
              alt="Frost Cave Icon" 
              width={38} 
              height={38} 
              className="object-contain" 
            />
            <Image 
              src="/FROST CAVE NAME.png" 
              alt="Frost Cave Logo" 
              width={140} 
              height={30} 
              className="object-contain" 
            />
          </Link>

          {/* NAVEGAÇÃO GLOBAL */}
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/noticias" className="text-sm font-semibold text-white hover:text-accent transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/tier-list" className="text-sm font-semibold text-white hover:text-accent transition-colors">
                  Tier List
                </Link>
              </li>
              <li>
                <Link href="/guias" className="text-sm font-semibold text-white hover:text-accent transition-colors">
                  Guias
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm font-semibold text-white hover:text-accent transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}
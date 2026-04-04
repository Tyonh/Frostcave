"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

type NewsItem = {
  jogo: string;
  tagPrimaria: string;
  tagSecundaria: string;
  titulo: string;
  resumo: string;
  imagem: string;
  autor: string;
  data: string;
  url: string;
};

const bancoDeNoticias: NewsItem[] = [
  {
    jogo: "WARFRAME",
    tagPrimaria: "Patch Notes",
    tagSecundaria: "Turnê do Tecnovírus",
    titulo: "Surpreenda os seus inimigos com a Armadura Umbra",
    resumo: "Surpreenda os seus inimigos com a elegante e estilosa Armadura Umbra e intimide-os com a lendária Nikana Dracônica. Fortaleça o seu Arsenal com estes itens incríveis e muito mais.",
    imagem: "/bruma.jpeg",
    autor: "Tyonh",
    data: "31 de Janeiro, 2025",
    url: "https://warframe.com/news/umbra-armor"
  },
  {
    jogo: "ALBION ONLINE ",
    tagPrimaria: "Guia",
    tagSecundaria: "Estradas Avalonianas",
    titulo: "Como lucrar nas zonas vermelhas de Albion sem morrer",
    resumo: "Um guia completo sobre como sobreviver e extrair recursos raros nas Estradas Avalonianas sem perder todo o seu equipamento para os gankers inimigos.",
    imagem: "/war.jpeg",
    autor: "Geovane",
    data: "15 de Fevereiro, 2026",
    url: "https://albiononline.com/pt-br/news/guide-to-red-zones"
  },
  {
    jogo: "MMO GERAL",
    tagPrimaria: "Meme",
    tagSecundaria: "Reddit",
    titulo: "The endgame formula is extremely boring",
    resumo: "Link compartilhado pela comunidade: i.redd.it",
    imagem: "https://preview.redd.it/g53g4yfxmhig1.png?auto=webp&s=2b858122ad5862146e508e24b316d7b6a4c26897",
    autor: "u/Nightblessed",
    data: "9 de Fevereiro, 2026",
    url: "https://www.reddit.com/r/MMORPG/comments/1r07b3c/the_endgame_formula_is_extremely_boring/"
  },
  {
    jogo: "DOTA 2",
    tagPrimaria: "Oficial",
    tagSecundaria: "Community Announcements",
    titulo: "The International 2026",
    resumo: "Every year, dedicated Dota players around the globe join together and train relentlessly...",
    imagem: "https://clan.fastly.steamstatic.com/images/3703047/ea88778c496b3a5f57c060182a073930c79f0848.jpg",
    autor: "krAnk0r",
    data: "11 de Fevereiro, 2026",
    url: "https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1824459501605090"
  },
  
];

const NOTICIAS_POR_PAGINA = 10;
const LIMITE_MAXIMO_PAGINAS = 10;

export default function NewsSection() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const containerRef = useRef<HTMLElement>(null);

  const totalPaginas = Math.min(
    Math.ceil(bancoDeNoticias.length / NOTICIAS_POR_PAGINA),
    LIMITE_MAXIMO_PAGINAS
  );

  const inicio = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;
  const fim = inicio + NOTICIAS_POR_PAGINA;
  const noticiasDaPagina = bancoDeNoticias.slice(inicio, fim);

  const trocarPagina = (novaPagina: number) => {
    setPaginaAtual(novaPagina);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="flex flex-col items-center gap-2 p-2 w-full max-w-[1020px] mx-auto mt-12">
      <h2 className="text-white text-2xl font-semibold mb-2 w-full text-left">Últimas Notícias</h2>
      <div className="bg-border-dark h-[2px] w-full mb-4"></div>

      <article className="flex flex-col w-full">
        {noticiasDaPagina.map((noticia, index) => (
          <div key={index} className="w-full">
            
            {/* O Bloco da Notícia com exatos 200px de limite no desktop (py-5 + h-160) */}
            <Link href="#" className="flex flex-col md:flex-row items-start gap-6 py-5 w-full text-white no-underline hover:opacity-80 transition-opacity group">
              
              {/* Imagem (284x160px = 16:9) */}
              <div className="relative w-full md:w-[284px] h-[200px] md:h-[160px] shrink-0 border border-border-dark rounded-md overflow-hidden group-hover:border-accent transition-colors">
                <Image src={noticia.imagem} alt={noticia.titulo} fill className="object-cover" />
              </div>

              {/* Textos e Tags (Travados na mesma altura da imagem: 160px) */}
              <div className="flex flex-col w-full justify-between md:h-[160px]">
                
                {/* Parte de Cima: Tags, Titulo e Resumo */}
                <div>
                  <div className="flex items-center flex-wrap gap-3 mb-2">
                    <span className="text-accent text-xs font-bold uppercase tracking-wide">{noticia.jogo}</span>
                    <span className="bg-header border border-border-dark text-text-light px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide">{noticia.tagPrimaria}</span>
                    <span className="bg-header border border-border-dark text-text-light px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide">{noticia.tagSecundaria}</span>
                  </div>
                  
                  {/* line-clamp-2 impede que o título passe de 2 linhas */}
                  <h3 className="text-white text-xl md:text-2xl font-bold m-0 mb-2 leading-tight line-clamp-2">{noticia.titulo}</h3>
                  
                  {/* line-clamp-2 impede que o resumo passe de 2 linhas */}
                  <p className="text-text-muted text-sm md:text-base leading-relaxed m-0 line-clamp-2">{noticia.resumo}</p>
                </div>

                {/* Parte de Baixo: Metadados (Sempre alinhados ao chão da imagem) */}
                <span className="text-gray-500 text-xs md:text-sm mt-3 md:mt-0">
                  by <strong className="text-text-light">{noticia.autor}</strong> &nbsp;&nbsp; {noticia.data}
                </span>

              </div>
            </Link>
            <div className="bg-border-dark h-[1px] w-full"></div>
          </div>
        ))}
      </article>

      {/* Botões de Paginação */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 pb-8 flex-wrap">
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
            <button
              key={pagina}
              onClick={() => trocarPagina(pagina)}
              className={`flex items-center justify-center w-10 h-10 rounded-md font-bold text-base transition-all duration-300 border ${
                paginaAtual === pagina
                  ? "bg-accent text-black border-accent shadow-[0_0_15px_rgba(0,168,255,0.4)] cursor-default"
                  : "bg-background text-text-muted border-border-dark hover:border-accent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(0,168,255,0.2)]"
              }`}
            >
              {pagina}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
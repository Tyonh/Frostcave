"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { supabase } from '@/lib/supabase';

type NewsItem = {
  id: string;
  jogo: string;
  tag_primaria: string;
  tag_secundaria: string;
  titulo: string;
  resumo: string;
  imagem: string;
  autor: string;
  data_publicacao: string;
  status: string;
};

const NOTICIAS_POR_PAGINA = 10;
const LIMITE_MAXIMO_PAGINAS = 10;

export default function NewsSection() {
  const [bancoDeNoticias, setBancoDeNoticias] = useState<NewsItem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function buscarNoticias() {
      try {
        const { data, error } = await supabase
          .from('noticias')
          .select('*')
          .eq('status', 'publicado')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          setBancoDeNoticias(data);
        }
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarNoticias();
  }, []);

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

  if (carregando) {
    return <div className="text-center mt-12 text-gray-500">A procurar pergaminhos na caverna...</div>;
  }

  if (bancoDeNoticias.length === 0) {
    return <div className="text-center mt-12 text-gray-500">Nenhuma notícia publicada ainda.</div>;
  }

  return (
    <section ref={containerRef} className="flex flex-col items-center gap-2 p-2 w-full max-w-[1020px] mx-auto mt-12">
      <h2 className="text-white text-2xl font-semibold mb-2 w-full text-left">Últimas Notícias</h2>
      <div className="bg-border-dark h-[2px] w-full mb-4"></div>

      <article className="flex flex-col w-full">
        {noticiasDaPagina.map((noticia) => (
          <div key={noticia.id} className="w-full">
            
            <Link href={`/noticias/${noticia.id}`} className="flex flex-col md:flex-row items-start gap-6 py-5 w-full text-white no-underline hover:opacity-80 transition-opacity group">
              
              <div className="relative w-full md:w-[284px] h-[200px] md:h-[160px] shrink-0 border border-border-dark rounded-md overflow-hidden group-hover:border-accent transition-colors">
                <Image 
                  src={noticia.imagem || "/bruma.jpeg"} 
                  alt={noticia.titulo} 
                  fill 
                  className="object-cover" 
                />
              </div>

              <div className="flex flex-col w-full justify-between md:h-[160px]">
                
                <div>
                  <div className="flex items-center flex-wrap gap-3 mb-2">
                    <span className="text-accent text-xs font-bold uppercase tracking-wide">{noticia.jogo}</span>
                    <span className="bg-header border border-border-dark text-text-light px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide">
                      {noticia.tag_primaria || 'Notícia'}
                    </span>
                    <span className="bg-header border border-border-dark text-text-light px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide">
                      {noticia.tag_secundaria || 'Geral'}
                    </span>
                  </div>
                  
                  <h3 className="text-white text-xl md:text-2xl font-bold m-0 mb-2 leading-tight line-clamp-2">
                    {noticia.titulo}
                  </h3>
                  
                  <p className="text-text-muted text-sm md:text-base leading-relaxed m-0 line-clamp-2">
                    {noticia.resumo}
                  </p>
                </div>

                <span className="text-gray-500 text-xs md:text-sm mt-3 md:mt-0">
                  by <strong className="text-text-light">{noticia.autor}</strong> &nbsp;&nbsp; {noticia.data_publicacao}
                </span>

              </div>
            </Link>
            <div className="bg-border-dark h-[1px] w-full"></div>
          </div>
        ))}
      </article>

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
import Image from "next/image";
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import { notFound } from "next/navigation";

// 1. Atualizamos a tipagem: agora avisamos o TypeScript que params é uma Promise
type Props = {
  params: Promise<{ id: string }>;
};

export default async function PaginaNoticia({ params }: Props) {
  // 2. A MÁGICA ACONTECE AQUI: Nós esperamos (await) o Next.js ler a URL
  const { id } = await params;

  // 3. Busca a notícia específica no banco de dados usando o ID resolvido
  const { data: noticia, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single();

  // Se der erro ou a notícia não existir, joga para a página 404
  if (error || !noticia) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-background pb-20">
      
      {/* IMAGEM DE CAPA */}
      <div className="relative w-full h-[400px] md:h-[500px] border-b border-border-dark">
        <Image 
          src={noticia.imagem || "/bruma.jpeg"} 
          alt={noticia.titulo}
          fill
          className="object-cover opacity-40" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <div className="absolute top-8 left-4 md:left-8 z-10">
          <Link href="/" className="text-accent hover:text-white transition flex items-center gap-2 text-sm font-bold bg-background/50 px-4 py-2 rounded border border-border-dark backdrop-blur-sm">
            ← Voltar para a Caverna
          </Link>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <article className="max-w-[800px] mx-auto px-4 -mt-32 relative z-10">
        
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-accent text-sm font-bold uppercase tracking-wide">{noticia.jogo}</span>
            <span className="bg-header border border-border-dark text-text-light px-3 py-1 rounded text-xs font-medium">
              {noticia.tag_primaria}
            </span>
            <span className="text-text-muted text-sm ml-auto">
              {noticia.data_publicacao} • por <strong className="text-white">{noticia.autor}</strong>
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {noticia.titulo}
          </h1>

          {noticia.opiniao_ia && (
            <div className="bg-header/80 border-l-4 border-accent p-5 rounded-r shadow-lg backdrop-blur-sm">
              <h4 className="text-accent text-xs font-bold uppercase mb-2">Comentário do FrostBot</h4>
              <p className="text-text-light text-sm italic leading-relaxed">
                "{noticia.opiniao_ia}"
              </p>
            </div>
          )}
        </header>

        <div className="bg-border-dark h-[1px] w-full mb-10"></div>

        <div 
          className="materia-congelada"
          dangerouslySetInnerHTML={{ __html: noticia.conteudo_completo }}
        />
        
      </article>
    </main>
  );
}
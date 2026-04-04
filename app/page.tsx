import Image from "next/image";
import NewsSection from "@/components/NewsSection";

export default function Home() {
  return (
    <>
      {/* 1. HERO BANNER */}
      <section className="relative flex justify-center items-center h-40 w-full overflow-hidden">
        <Image src="/caminho.jpeg" alt="Banner" fill priority className="object-cover grayscale brightness-50" />
        <h1 className="absolute z-10 text-white text-3xl font-bold text-center drop-shadow-[2px_2px_8px_rgba(0,0,0,1)]">
          Bem vindos a Frost Cave
        </h1>
      </section>

      {/* 2. BENTO GRID (O Monolito) */}
      <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:grid-rows-[250px_250px] gap-4 p-5 max-w-[1200px] mx-auto mt-4">
        
        {/* Caixa Principal (Ocupa 2 linhas) */}
        <div className="relative rounded-lg overflow-hidden flex flex-col items-center group cursor-pointer md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3 h-[250px] md:h-auto border border-transparent hover:border-border-dark">
          <Image 
            src="/bruma.jpeg" 
            alt="Hellgate" 
            fill 
            className="object-cover transition-all duration-300 filter grayscale-[0.5] group-hover:grayscale-0" 
          />
          <h2 className="absolute bottom-0 left-0 w-full p-6 text-white text-2xl font-bold bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
            Hellgate
          </h2>
        </div>

        {/* Caixa Secundária 1 */}
        <div className="relative rounded-lg overflow-hidden flex flex-col items-center group cursor-pointer h-[250px] md:h-auto border border-transparent hover:border-border-dark">
          <Image 
            src="/war.jpeg" 
            alt="Estradas" 
            fill 
            className="object-cover transition-all duration-300 filter grayscale-[0.5] group-hover:grayscale-0" 
          />
          <h2 className="absolute bottom-0 left-0 w-full p-4 text-white text-xl font-bold bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
            Estradas Avalonianas
          </h2>
        </div>

        {/* Caixa Secundária 2 */}
        <div className="relative rounded-lg overflow-hidden flex flex-col items-center group cursor-pointer h-[250px] md:h-auto border border-transparent hover:border-border-dark">
          <Image 
            src="/fest.jpeg" 
            alt="Redzone" 
            fill 
            className="object-cover transition-all duration-300 filter grayscale-[0.5] group-hover:grayscale-0" 
          />
          <h2 className="absolute bottom-0 left-0 w-full p-4 text-white text-xl font-bold bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
            Redzone
          </h2>
        </div>

      </section>

      {/* 3. LISTA DE NOTÍCIAS */}
      <NewsSection />
    </>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header"; // Importando o novo componente
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frost Cave",
  description: "O portal definitivo para exploradores de MMOs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-background text-white min-h-screen flex flex-col`}>
        
        <Header />

        {/* pt-25 garante que o conteúdo comece abaixo do Header duplo */}
        <main className="flex-grow pt-[100px]">
          {children}
        </main>

        <footer className="bg-black py-10 flex items-center justify-center border-t border-border-dark mt-20">
          <p className="text-sm text-gray-500">
            Designed by <span className="text-text-light font-medium">GeovaneCamelo</span> - 2026
          </p>
        </footer>

      </body>
    </html>
  );
}
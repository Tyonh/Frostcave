import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Lista notícias para o site
export async function GET() {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('status', 'publicado') // Só mostra o que você aprovou
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Recebe notícia da sua I.A. Local
export async function POST(request: Request) {
  const body = await request.json();
  
  // Aqui você pode adicionar uma verificação de API_KEY para segurança
  const { data, error } = await supabase
    .from('noticias')
    .insert([{ ...body, status: 'rascunho' }]); // Entra como rascunho para sua revisão

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Notícia enviada para revisão!" }, { status: 201 });
}
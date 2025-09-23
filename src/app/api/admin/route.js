import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  // 🔒 Verifica se é admin
  if (!session?.user?.isAdmin) {
    return NextResponse.json(
      { error: "Acesso negado. Apenas administradores." },
      { status: 403 }
    )
  }
  
  // 🎯 Lógica da API aqui
  return NextResponse.json({ message: "Acesso liberado!" })
}
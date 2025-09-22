import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const company = await prisma.companyInfo.findFirst({
      include: {
        phones: true,
        address: true
      }
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Informações da empresa não encontradas' },
        { status: 404 }
      )
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Erro ao buscar informações da empresa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
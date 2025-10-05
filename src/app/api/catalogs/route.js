import { NextResponse } from 'next/server'
import { createCatalog, revalidateCompany } from '@/lib/company'

export async function POST(request) {
  try {
    const data = await request.json()
    
    const result = await createCatalog(data)
    
    if (result.success) {
      revalidateCompany()
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Erro na API catalogs:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
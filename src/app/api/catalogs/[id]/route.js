import { NextResponse } from 'next/server'
import { updateCatalog, deleteCatalog, revalidateCompany } from '@/lib/company'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const data = await request.json()
    
    const result = await updateCatalog(id, data)
    
    if (result.success) {
      revalidateCompany()
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Erro na API catalog PUT:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    const result = await deleteCatalog(id)
    
    if (result.success) {
      revalidateCompany()
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Erro na API catalog DELETE:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
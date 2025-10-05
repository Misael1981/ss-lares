import { NextResponse } from 'next/server'
import { getCompanyInfo, updateCompanyInfo, revalidateCompany } from '@/lib/company'

// ✅ MÉTODO GET - Para buscar dados da empresa
export async function GET() {
  try {
    const companyInfo = await getCompanyInfo()
    
    if (companyInfo) {
      return NextResponse.json({
        success: true,
        company: companyInfo
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Dados da empresa não encontrados'
      }, { status: 404 })
    }
  } catch (error) {
    console.error('Erro ao buscar dados da empresa:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// ✅ MÉTODO PUT - Para atualizar dados da empresa
export async function PUT(request) {
  try {
    const data = await request.json()
    
    const result = await updateCompanyInfo(data)
    
    if (result.success) {
      revalidateCompany()
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Erro na API company:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
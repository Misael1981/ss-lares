import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Listar todos os produtos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar novo produto
export async function POST(request) {
  try {
    const data = await request.json()
    
    // Verificar se slug já existe
    const existingProduct = await prisma.product.findUnique({
      where: { slug: data.slug }
    })
    
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Já existe um produto com este slug' },
        { status: 400 }
      )
    }
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        quantity: data.quantity,
        height: data.height,
        width: data.width,
        length: data.length,
        price: data.price,
        salePrice: data.salePrice,
        weight: data.weight,
        imageUrl: data.imageUrl || [],
        tags: data.tags || [],
        isAvailable: data.isAvailable ?? true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
}
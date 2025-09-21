import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PUT - Atualizar produto
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const data = await request.json()
    
    // Se está atualizando o slug, verificar se não existe outro produto com o mesmo slug
    if (data.slug) {
      const existingProduct = await prisma.product.findFirst({
        where: { 
          slug: data.slug,
          NOT: { id }
        }
      })
      
      if (existingProduct) {
        return NextResponse.json(
          { error: 'Já existe um produto com este slug' },
          { status: 400 }
        )
      }
    }
    
    const product = await prisma.product.update({
      where: { id },
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
        imageUrl: data.imageUrl,
        tags: data.tags,
        isAvailable: data.isAvailable
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir produto
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Produto excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    )
  }
}
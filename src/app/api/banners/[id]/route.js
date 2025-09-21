import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// PUT - Atualizar banner
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const data = await request.json()
    
    const banner = await prisma.carouselBanner.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        imageMobile: data.imageMobile,
        imageTablet: data.imageTablet,
        imageDesktop: data.imageDesktop,
        imageLaptop: data.imageLaptop,
        order: data.order,
        isActive: data.isActive
      }
    })

    return NextResponse.json(banner)
  } catch (error) {
    console.error('Erro ao atualizar banner:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar banner' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir banner
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    await prisma.carouselBanner.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Banner excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir banner:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir banner' },
      { status: 500 }
    )
  }
}
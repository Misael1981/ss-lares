import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Listar todos os banners
export async function GET() {
  try {
    const banners = await prisma.carouselBanner.findMany({
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(banners)
  } catch (error) {
    console.error('Erro ao buscar banners:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar novo banner
export async function POST(request) {
  try {
    const data = await request.json()
    
    const banner = await prisma.carouselBanner.create({
      data: {
        title: data.title,
        description: data.description,
        imageMobile: data.imageMobile,
        imageTablet: data.imageTablet,
        imageDesktop: data.imageDesktop,
        imageLaptop: data.imageLaptop,
        order: data.order || 0,
        isActive: data.isActive ?? true
      }
    })

    return NextResponse.json(banner, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar banner:', error)
    return NextResponse.json(
      { error: 'Erro ao criar banner' },
      { status: 500 }
    )
  }
}
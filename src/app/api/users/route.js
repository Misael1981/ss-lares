import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// GET - Listar todos os usuários (apenas admins)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        isAdmin: true,
        emailVerified: true,
        phoneVerified: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            orders: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar novo usuário (apenas admins)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Acesso negado' },
        { status: 403 }
      )
    }

    const data = await request.json()
    
    // Verificar se email já existe
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      })
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email já está em uso' },
          { status: 400 }
        )
      }
    }

    // Verificar se telefone já existe
    if (data.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone: data.phone }
      })
      
      if (existingPhone) {
        return NextResponse.json(
          { error: 'Telefone já está em uso' },
          { status: 400 }
        )
      }
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        isAdmin: data.isAdmin || false,
        image: data.image
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}
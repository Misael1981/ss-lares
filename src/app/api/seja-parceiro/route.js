import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Verificar se já existe usuário com este email ou telefone
    let existingUser = null
    
    if (data.email) {
      existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      })
    }
    
    if (!existingUser && data.phone) {
      existingUser = await prisma.user.findUnique({
        where: { phone: data.phone }
      })
    }

    let user

    if (existingUser) {
      // Atualizar usuário existente com novas informações
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: data.username || existingUser.name,
          email: data.email || existingUser.email,
          phone: data.phone || existingUser.phone,
          address: data.city || existingUser.address, // Usando city como address
        }
      })
    } else {
      // Criar novo usuário
      user = await prisma.user.create({
        data: {
          name: data.username,
          email: data.email,
          phone: data.phone,
          address: data.city, // Usando city como address
          isAdmin: false
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Cadastro realizado com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao processar cadastro de parceiro:', error)
    return NextResponse.json(
      { error: 'Erro ao processar cadastro' },
      { status: 500 }
    )
  }
}
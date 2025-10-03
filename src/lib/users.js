import prisma from "@/lib/prisma"
import { unstable_cache } from "next/cache"

export const getUsers = unstable_cache(
  async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        isAdmin: true,
        image: true,
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

      return users.map(user => ({
        ...user,
        orderCount: user._count.orders
      }))
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
      return []
    }
  },
  ['users'],
  {
    revalidate: 60, // Cache por 60 segundos
    tags: ['users']
  }
)

export async function revalidateUsers() {
  try {
    await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?tag=users`, {
      method: 'POST'
    })
  } catch (error) {
    console.error("Erro ao revalidar cache de usuários:", error)
  }
}
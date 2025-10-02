import prisma from './prisma'
import { unstable_cache } from 'next/cache'

export const getProducts = unstable_cache(
  async () => {
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      return products
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      return []
    }
  },
  ['products'],
  {
    tags: ['products'],
    revalidate: 60 // Cache por 1 minuto
  }
)

export const invalidateProductsCache = () => {
  // Esta função será chamada quando produtos forem modificados
  return fetch('/api/revalidate?tag=products', { method: 'POST' })
}
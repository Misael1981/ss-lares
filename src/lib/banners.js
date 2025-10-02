import { prismaWithRetry } from "./prisma"

export async function getBanners() {
  try {
    return await prismaWithRetry(async () => {
      return await prisma.carouselBanner.findMany({
        orderBy: { order: 'asc' }
      })
    })
  } catch (error) {
    console.error('❌ Erro ao buscar banners:', error)
    return []
  }
}
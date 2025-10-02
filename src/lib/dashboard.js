import { unstable_cache } from "next/cache"
import prisma, { prismaWithRetry } from "./prisma"

// 🔥 VERSÃO COM CACHE - ESTRUTURA CORRIGIDA!
export const getDashboardData = unstable_cache(
  async () => {
    try {
      return await prismaWithRetry(async () => {
        // 🚀 BUSCA PARALELA - MUITO MAIS RÁPIDA!
        const [
          totalUsers,
          totalProducts,
          totalOrders,
          pendingOrders,
          completedOrders,
          activeProducts,
          revenue,
          newUsersThisMonth,
          recentOrders,
          topProducts,
          salesByMonth,
        ] = await Promise.all([
          // Contadores básicos
          prisma.user.count(),
          prisma.product.count(),
          prisma.order.count(),

          // Status dos pedidos
          prisma.order.count({ where: { status: "PENDING" } }),
          prisma.order.count({ where: { status: "COMPLETED" } }),

          // Produtos ativos
          prisma.product.count({ where: { isAvailable: true } }),

          // Receita total
          prisma.order.aggregate({
            where: { status: "COMPLETED" },
            _sum: { total: true },
          }),

          // Novos usuários este mês
          prisma.user.count({
            where: {
              createdAt: {
                gte: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  1,
                ),
              },
            },
          }),

          // Pedidos recentes (para lista)
          prisma.order.findMany({
            take: 10,
            orderBy: { createdAt: "desc" },
            include: {
              user: {
                select: { name: true, email: true },
              },
            },
          }),

          // Top produtos mais vendidos usando OrderProduct
          prisma.orderProduct.groupBy({
            by: ["productId"],
            _sum: { quantity: true },
            _count: { productId: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5,
          }),

          // Vendas por mês (últimos 6 meses)
          getSalesByMonth(),
        ])

        // 🎯 ESTRUTURA CORRIGIDA PARA MATCH COM PAGE.JSX
        return {
          stats: {
            totalUsers,
            totalProducts,
            totalOrders,
            revenue: revenue._sum.total || 0,
            newUsersThisMonth,
            activeProducts,
            successRate:
              totalOrders > 0
                ? Math.round((completedOrders / totalOrders) * 100)
                : 0,
            pending: pendingOrders,
            completed: completedOrders,
          },
          lists: {
            recentOrders: recentOrders.map((order) => ({
              id: order.id,
              user: order.user,
              total: order.total,
              status: order.status,
              createdAt: order.createdAt,
            })),
            topProducts: await Promise.all(
              topProducts.map(async (item) => {
                const product = await prisma.product.findUnique({
                  where: { id: item.productId },
                  select: { name: true, price: true },
                })
                return {
                  ...product,
                  totalSold: item._sum.quantity,
                  orders: item._count.productId,
                }
              }),
            ),
          },
          charts: {
            salesByMonth: salesByMonth,
          },
        }
      })
    } catch (error) {
      console.error("❌ Erro ao buscar dados do dashboard:", error)
      throw error
    }
  },
  ["dashboard-main-data"], // 🔑 Chave única do cache
  {
    revalidate: 300, // ⏰ Cache por 5 minutos
    tags: ["dashboard", "stats"], // 🏷️ Tags para invalidação
  },
)

// Função auxiliar para vendas por mês
async function getSalesByMonth() {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  try {
    const salesData = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        status: "COMPLETED",
        createdAt: { gte: sixMonthsAgo },
      },
      _sum: { total: true },
      _count: { id: true },
    })

    // Processar dados por mês
    const monthlyData = {}
    salesData.forEach((sale) => {
      const month = sale.createdAt.toISOString().slice(0, 7) // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { revenue: 0, orders: 0 }
      }
      monthlyData[month].revenue += sale._sum.total || 0
      monthlyData[month].orders += sale._count.id
    })

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      revenue: data.revenue,
      orders: data.orders,
    }))
  } catch (error) {
    console.error("❌ Erro ao buscar vendas por mês:", error)
    return [] // Retorna array vazio em caso de erro
  }
}

// 🔄 FUNÇÃO PARA INVALIDAR CACHE
export async function invalidateDashboardCache() {
  const { revalidateTag } = await import("next/cache")
  revalidateTag("dashboard")
  revalidateTag("stats")
}

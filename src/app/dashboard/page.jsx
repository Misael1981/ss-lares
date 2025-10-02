import { SalesChart } from "./components/SalesChart"
import QuickActions from "./components/QuickActions"
import Metrics from "./components/Metrics"
import OrderStatus from "./components/OrderStatus"
import RecentOrders from "./components/RecentOrders"
import { getDashboardData } from "@/lib/dashboard"
import { Suspense } from "react"
import DashboardSkeleton from "./components/DashboardSkeleton"



const DashboardPage = async () => {
  try {
    // 🚀 UMA ÚNICA BUSCA PARA TODOS OS DADOS
    const dashboardData = await getDashboardData()
    
    return (
      <div className="w-full space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Painel Principal</h1>
          <p className="text-muted-foreground">Visão geral do seu e-commerce</p>
        </div>

        {/* Cards de Métricas REAIS */}
        <Metrics stats={dashboardData.stats} />

        {/* Status dos Pedidos */}
        <OrderStatus stats={dashboardData.stats} />

        {/* Botões de Ação Rápidas - CLIENT COMPONENT */}
        <QuickActions />

        {/* Pedidos Recentes */}
        <RecentOrders orders={dashboardData.lists.recentOrders} />

        {/* Seção de Gráficos - CLIENT COMPONENT */}
        <div className="w-full">
          <SalesChart data={{
            salesByMonth: dashboardData.charts.salesByMonth,
            topProducts: dashboardData.lists.topProducts
          }} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('❌ Erro no dashboard:', error)
    
    // 🔥 FALLBACK EM CASO DE ERRO
    return (
      <div className="w-full space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-red-600">
            Erro no Dashboard
          </h1>
          <p className="text-muted-foreground">
            Não foi possível carregar os dados. Tente novamente.
          </p>
        </div>
        
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            Erro: {error.message}
          </p>
        </div>
      </div>
    )
  }
}

// 🔥 WRAPPER COM SUSPENSE PARA LOADING
const DashboardWithSuspense = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPage />
    </Suspense>
  )
}

export default DashboardWithSuspense

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"

// 🎨 Cores para os gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export function SalesChart({ data }) {
  // 🔄 Transformar dados para formato do gráfico
  const salesData = data?.salesByMonth?.map(item => ({
    month: formatMonth(item.month),
    revenue: item.revenue,
    orders: item.orders
  })) || []

  const topProductsData = data?.topProducts?.map(product => ({
    name: product.name?.substring(0, 15) + '...' || 'Produto',
    value: product.totalSold || 0,
    orders: product.orders || 0
  })) || []

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 📊 Gráfico de Vendas por Mês */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Vendas por Mês
            <span className="text-sm font-normal text-muted-foreground">
              (Últimos 6 meses)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' 
                    ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                    : `${value} pedidos`,
                  name === 'revenue' ? 'Receita' : 'Pedidos'
                ]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Bar 
                dataKey="revenue" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
                name="revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 📊 Gráfico de Pedidos por Mês (Linha) */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📦 Pedidos por Mês
            <span className="text-sm font-normal text-muted-foreground">
              (Tendência)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value) => [`${value} pedidos`, 'Pedidos']}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#00C49F"
                strokeWidth={3}
                dot={{ fill: '#00C49F', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🥧 Gráfico de Top Produtos (Pizza) */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏆 Top 5 Produtos
            <span className="text-sm font-normal text-muted-foreground">
              (Mais vendidos)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProductsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {topProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} unidades vendidas`,
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 📊 Resumo de Performance */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Performance Geral
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Receita Total */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Receita Total</span>
              </div>
              <span className="font-bold text-blue-600">
                R$ {salesData.reduce((acc, item) => acc + item.revenue, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Total de Pedidos */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Total de Pedidos</span>
              </div>
              <span className="font-bold text-green-600">
                {salesData.reduce((acc, item) => acc + item.orders, 0)} pedidos
              </span>
            </div>

            {/* Ticket Médio */}
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Ticket Médio</span>
              </div>
              <span className="font-bold text-purple-600">
                R$ {(
                  salesData.reduce((acc, item) => acc + item.revenue, 0) / 
                  Math.max(salesData.reduce((acc, item) => acc + item.orders, 0), 1)
                ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Produtos Mais Vendidos */}
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="font-medium">Produtos Vendidos</span>
              </div>
              <span className="font-bold text-orange-600">
                {topProductsData.reduce((acc, item) => acc + item.value, 0)} unidades
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 🗓️ Função para formatar mês
function formatMonth(monthString) {
  if (!monthString) return 'N/A'
  
  const [year, month] = monthString.split('-')
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ]
  
  return `${months[parseInt(month) - 1]}/${year.slice(-2)}`
}

"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, Users, Settings } from "lucide-react"
import Link from "next/link"

const QuickActions = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <CardTitle className="py-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Ações Rápidas
        </CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button asChild className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            <Link href="/dashboard/produtos" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Produto
            </Link>
          </Button>
          
          <Button asChild className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            <Link href="/dashboard/pedidos" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Gerenciar Pedidos
            </Link>
          </Button>
          
          <Button asChild className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            <Link href="/dashboard/usuarios" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Gerenciar Usuários
            </Link>
          </Button>
          
          <Button asChild className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            <Link href="/dashboard/banner-principal" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurar Banners
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions

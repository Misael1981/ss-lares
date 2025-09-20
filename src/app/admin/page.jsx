"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const AdminPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 🔐 PROTEÇÃO: Verificar se é admin
  useEffect(() => {
    if (status === "loading") return // Ainda carregando

    if (!session) {
      router.push("/") // Não logado → Home
      return
    }

    if (!session.user.isAdmin) {
      router.push("/") // Não é admin → Home
      return
    }
  }, [session, status, router])

  // 🔄 LOADING enquanto verifica
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  // 🚫 Se não é admin, não mostra nada (vai redirecionar)
  if (!session?.user?.isAdmin) {
    return null
  }

  // ✅ CONTEÚDO DO ADMIN
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🎯 Dashboard Admin
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bem-vindo, {session.user.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: Produtos */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">📦 Produtos</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gerenciar catálogo
          </p>
        </div>

        {/* CARD 2: Pedidos */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">🛒 Pedidos</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhar vendas
          </p>
        </div>

        {/* CARD 3: Usuários */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">👥 Usuários</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gerenciar contas
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminPage

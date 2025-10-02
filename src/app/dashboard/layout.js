"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"

export default function Layout({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 🔒 Proteção dupla - só admin acessa
  useEffect(() => {
    if (status === "loading") return // Aguarda carregar
    
    if (!session?.user?.isAdmin) {
      router.push("/") // Redireciona para home
      return
    }
  }, [session, status, router])

  // 🔄 Loading state
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  // 🚫 Se não for admin, não renderiza nada (vai redirecionar)
  if (!session?.user?.isAdmin) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

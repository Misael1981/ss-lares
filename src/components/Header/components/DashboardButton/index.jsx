"use client"
import { Button } from "@/components/ui/button"
import { LayoutDashboard } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

const DashboardButton = () => {
  const { data: session, status } = useSession()

  // 🔒 Só mostra se estiver logado E for admin
  if (status === "loading") return null // Evita flash durante carregamento
  if (!session?.user?.isAdmin) return null

  return (
    <li>
      <Button variant="ghost" className="text-base" asChild>
        <Link href="/dashboard">
          <LayoutDashboard style={{ width: "24px", height: "24px" }} />
          Dashboard
        </Link>
      </Button>
    </li>
  )
}

export default DashboardButton
import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getUsers } from "@/lib/users"
import UserManager from "./components/UserManager"
import UserSkeleton from "./components/UserSkeleton"

export const metadata = {
  title: "Gerenciar Usuários | Dashboard",
  description: "Gerencie usuários e permissões do sistema",
}

export default async function UsuariosPage() {
  // Verificar autenticação e permissões
  const session = await getServerSession(authOptions)

  if (!session?.user?.isAdmin) {
    redirect("/dashboard")
  }

  // Buscar dados iniciais
  const initialUsers = await getUsers()

  return (
    <Suspense fallback={<UserSkeleton />}>
      <UserManager initialUsers={initialUsers} />
    </Suspense>
  )
}

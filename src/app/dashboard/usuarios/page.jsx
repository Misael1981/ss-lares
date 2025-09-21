"use client"

import { useState, useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Filter,
  Edit,
  Trash2,
  Shield,
  ShieldOff,
  Mail,
  Phone,
  Calendar,
  UserPlus,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

export default function UsuariosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Estados
  const [users, setUsers] = useState([]) // Garantir que sempre seja um array
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  })

  // Verificar se é admin
  useEffect(() => {
    if (status === "loading") return
    if (!session?.user?.isAdmin) {
      router.push("/dashboard")
      return
    }
    fetchUsers()
  }, [session, status, router])

  // Buscar usuários
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/users")

      if (response.ok) {
        const data = await response.json()
        // Garantir que data seja sempre um array
        setUsers(Array.isArray(data) ? data : [])
      } else {
        console.error("Erro ao buscar usuários")
        setUsers([]) // Definir como array vazio em caso de erro
        toast.error("Erro ao carregar usuários")
      }
    } catch (error) {
      console.error("Erro:", error)
      setUsers([]) // Definir como array vazio em caso de erro
      toast.error("Erro ao carregar usuários")
    } finally {
      setLoading(false)
    }
  }

  // Filtrar usuários - usar useMemo para evitar problemas de renderização
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return []

    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)

      const matchesFilter =
        filterType === "all" ||
        (filterType === "admin" && user.isAdmin) ||
        (filterType === "verified" &&
          (user.emailVerified || user.phoneVerified)) ||
        (filterType === "unverified" &&
          !user.emailVerified &&
          !user.phoneVerified)

      return matchesSearch && matchesFilter
    })
  }, [users, searchTerm, filterType])

  // Toggle Admin
  const toggleAdmin = async (userId, currentStatus) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error("Erro na resposta da API")
      }

      const updatedUser = await response.json()

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isAdmin: !currentStatus } : user,
        ),
      )
      toast.success(
        `Usuário ${!currentStatus ? "promovido a" : "removido de"} admin`,
      )
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      toast.error("Erro ao atualizar usuário")
    }
  }

  // Deletar usuário
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro na resposta da API")
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      toast.success("Usuário excluído com sucesso")
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error("Erro ao excluir usuário:", error)
      toast.error("Erro ao excluir usuário")
    }
  }

  // ✅ Estatísticas com verificação de segurança
  const stats = {
    total: Array.isArray(users) ? users.length : 0,
    admins: Array.isArray(users) ? users.filter((u) => u.isAdmin).length : 0,
    verified: Array.isArray(users)
      ? users.filter((u) => u.emailVerified || u.phoneVerified).length
      : 0,
    thisMonth: Array.isArray(users)
      ? users.filter((u) => {
          const userDate = new Date(u.createdAt)
          const now = new Date()
          return (
            userDate.getMonth() === now.getMonth() &&
            userDate.getFullYear() === now.getFullYear()
          )
        }).length
      : 0,
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p>Carregando usuários...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie usuários e permissões do sistema
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Administradores
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verificados</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                Todos
              </Button>
              <Button
                variant={filterType === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("admin")}
              >
                <Shield className="mr-1 h-3 w-3" />
                Admins
              </Button>
              <Button
                variant={filterType === "verified" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("verified")}
              >
                Verificados
              </Button>
              <Button
                variant={filterType === "unverified" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("unverified")}
              >
                Não Verificados
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>
                      {user.name?.charAt(0)?.toUpperCase() ||
                        user.email?.charAt(0)?.toUpperCase() ||
                        "?"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {user.name || "Nome não informado"}
                      </h3>
                      {user.isAdmin && (
                        <Badge variant="destructive">
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {user.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                          {user.emailVerified && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              Verificado
                            </Badge>
                          )}
                        </div>
                      )}

                      {user.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                          {user.phoneVerified && (
                            <Badge variant="outline" className="ml-1 text-xs">
                              Verificado
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Cadastrado em{" "}
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Toggle Admin */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">Admin</label>
                    <Switch
                      checked={user.isAdmin}
                      onCheckedChange={() => toggleAdmin(user.id, user.isAdmin)}
                    />
                  </div>

                  <Separator orientation="vertical" className="h-6" />

                  {/* Ações */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="py-8 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium">
                  Nenhum usuário encontrado
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "Tente ajustar sua busca"
                    : "Não há usuários cadastrados ainda"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o usuário{" "}
              <strong>{selectedUser?.name || selectedUser?.email}</strong>? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteUser(selectedUser?.id)}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

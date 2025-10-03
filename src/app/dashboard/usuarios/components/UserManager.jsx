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
  MoreHorizontal,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import UserImageUpload from "./UserImageUpload"

export default function UserManager({ initialUsers }) {
  const { data: session } = useSession()
  const router = useRouter()

  // Estados
  const [users, setUsers] = useState(initialUsers || [])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    isAdmin: false,
  })

  // Buscar usuários
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/users")

      if (response.ok) {
        const data = await response.json()
        setUsers(Array.isArray(data) ? data : [])
      } else {
        console.error("Erro ao buscar usuários")
        toast.error("Erro ao carregar usuários")
      }
    } catch (error) {
      console.error("Erro:", error)
      toast.error("Erro ao carregar usuários")
    } finally {
      setLoading(false)
    }
  }

  // Filtrar usuários
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

  // Abrir diálogo de edição
  const openEditDialog = (user) => {
    setSelectedUser(user)
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      image: user.image || "",
      isAdmin: user.isAdmin || false,
    })
    setIsEditDialogOpen(true)
  }

  // Abrir diálogo de criação
  const openCreateDialog = () => {
    setEditForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
      isAdmin: false,
    })
    setIsCreateDialogOpen(true)
  }

  // Salvar usuário (criar ou editar)
  const handleSaveUser = async () => {
    try {
      const isEditing = !!selectedUser
      const url = isEditing ? `/api/users/${selectedUser.id}` : "/api/users"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro na operação")
      }

      const userData = await response.json()

      if (isEditing) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...userData } : user
          )
        )
        toast.success("Usuário atualizado com sucesso!")
      } else {
        setUsers((prevUsers) => [userData, ...prevUsers])
        toast.success("Usuário criado com sucesso!")
      }

      setIsEditDialogOpen(false)
      setIsCreateDialogOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
      toast.error(error.message || "Erro ao salvar usuário")
    }
  }

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

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isAdmin: !currentStatus } : user
        )
      )
      toast.success(
        `Usuário ${!currentStatus ? "promovido a" : "removido de"} admin`
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
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao excluir usuário")
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      toast.success("Usuário excluído com sucesso")
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error("Erro ao excluir usuário:", error)
      toast.error(error.message || "Erro ao excluir usuário")
    }
  }

  // Estatísticas
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getUserInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?"
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
        <Button onClick={openCreateDialog}>
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
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterType === "admin" ? "default" : "outline"}
                onClick={() => setFilterType("admin")}
                size="sm"
              >
                <Shield className="mr-1 h-3 w-3" />
                Admins
              </Button>
              <Button
                variant={filterType === "verified" ? "default" : "outline"}
                onClick={() => setFilterType("verified")}
                size="sm"
              >
                <UserCheck className="mr-1 h-3 w-3" />
                Verificados
              </Button>
              <Button
                variant={filterType === "unverified" ? "default" : "outline"}
                onClick={() => setFilterType("unverified")}
                size="sm"
              >
                <UserX className="mr-1 h-3 w-3" />
                Não Verificados
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>
            Usuários ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pedidos</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.address}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {user.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        )}
                        {user.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {user.isAdmin && (
                          <Badge variant="destructive">
                            <Shield className="mr-1 h-3 w-3" />
                            Admin
                          </Badge>
                        )}
                        {(user.emailVerified || user.phoneVerified) && (
                          <Badge variant="secondary">
                            <UserCheck className="mr-1 h-3 w-3" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user._count?.orders || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toggleAdmin(user.id, user.isAdmin)
                            }
                          >
                            {user.isAdmin ? (
                              <>
                                <ShieldOff className="mr-2 h-4 w-4" />
                                Remover Admin
                              </>
                            ) : (
                              <>
                                <Shield className="mr-2 h-4 w-4" />
                                Tornar Admin
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Criação */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo usuário
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  placeholder="+55 (11) 99999-9999"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="isAdmin"
                  checked={editForm.isAdmin}
                  onCheckedChange={(checked) =>
                    setEditForm({ ...editForm, isAdmin: checked })
                  }
                />
                <Label htmlFor="isAdmin">Administrador</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                value={editForm.address}
                onChange={(e) =>
                  setEditForm({ ...editForm, address: e.target.value })
                }
                placeholder="Endereço completo"
                rows={3}
              />
            </div>
            <UserImageUpload
              value={editForm.image}
              onChange={(url) => setEditForm({ ...editForm, image: url })}
              userName={editForm.name}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveUser}>Criar Usuário</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualize os dados do usuário
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nome *</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  placeholder="+55 (11) 99999-9999"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="edit-isAdmin"
                  checked={editForm.isAdmin}
                  onCheckedChange={(checked) =>
                    setEditForm({ ...editForm, isAdmin: checked })
                  }
                />
                <Label htmlFor="edit-isAdmin">Administrador</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-address">Endereço</Label>
              <Textarea
                id="edit-address"
                value={editForm.address}
                onChange={(e) =>
                  setEditForm({ ...editForm, address: e.target.value })
                }
                placeholder="Endereço completo"
                rows={3}
              />
            </div>
            <UserImageUpload
              value={editForm.image}
              onChange={(url) => setEditForm({ ...editForm, image: url })}
              userName={editForm.name}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveUser}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o usuário{" "}
              <strong>{selectedUser?.name}</strong>? Esta ação não pode ser
              desfeita.
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
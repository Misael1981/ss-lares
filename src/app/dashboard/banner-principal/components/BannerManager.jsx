"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Image as ImageIcon,
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import ImageUpload from "./ImageUpload"

export default function BannerManager({ initialBanners }) {
  const [banners, setBanners] = useState(initialBanners || [])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageMobile: "",
    imageTablet: "",
    imageDesktop: "",
    imageLaptop: "",
    order: 0,
    isActive: true,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação básica
    if (!formData.title || !formData.description) {
      toast.error("Título e descrição são obrigatórios")
      return
    }

    if (
      !formData.imageMobile ||
      !formData.imageTablet ||
      !formData.imageDesktop ||
      !formData.imageLaptop
    ) {
      toast.error("Todas as imagens responsivas são obrigatórias")
      return
    }

    try {
      const url = editingBanner
        ? `/api/banners/${editingBanner.id}`
        : "/api/banners"
      const method = editingBanner ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao salvar banner")
      }

      const savedBanner = await response.json()

      if (editingBanner) {
        setBanners(
          banners.map((banner) =>
            banner.id === editingBanner.id ? savedBanner : banner,
          ),
        )
        toast.success("Banner atualizado com sucesso!")
      } else {
        setBanners([...banners, savedBanner])
        toast.success("Banner criado com sucesso!")
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Erro ao salvar banner:", error)
      toast.error("Erro ao salvar banner")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao excluir banner")
      }

      setBanners(banners.filter((banner) => banner.id !== id))
      toast.success("Banner excluído com sucesso!")
    } catch (error) {
      console.error("Erro ao excluir banner:", error)
      toast.error("Erro ao excluir banner")
    }
  }

  const toggleActive = async (id, isActive) => {
    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar status")
      }

      setBanners(
        banners.map((banner) =>
          banner.id === id ? { ...banner, isActive } : banner,
        ),
      )

      toast.success(
        `Banner ${isActive ? "ativado" : "desativado"} com sucesso!`,
      )
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      toast.error("Erro ao atualizar status")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageMobile: "",
      imageTablet: "",
      imageDesktop: "",
      imageLaptop: "",
      order: 0,
      isActive: true,
    })
    setEditingBanner(null)
  }

  const openEditDialog = (banner) => {
    setFormData({
      title: banner.title,
      description: banner.description,
      imageMobile: banner.imageMobile,
      imageTablet: banner.imageTablet,
      imageDesktop: banner.imageDesktop,
      imageLaptop: banner.imageLaptop,
      order: banner.order || 0,
      isActive: banner.isActive,
    })
    setEditingBanner(banner)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banner Principal</h1>
          <p className="text-muted-foreground">
            Gerencie os banners do carousel da página inicial
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Banner
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Editar Banner" : "Novo Banner"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do banner. Todas as imagens são
                obrigatórias para responsividade.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Ex: Escolha inteligente"
                  />
                </div>

                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="1, 2, 3..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Ex: Escolha inteligente para sua obra"
                  rows={3}
                />
              </div>

              {/* SEÇÃO DE IMAGENS COM UPLOAD */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Imagens Responsivas</h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ImageUpload
                    label="Mobile"
                    dimensions="640x400"
                    value={formData.imageMobile}
                    onChange={(url) =>
                      setFormData({ ...formData, imageMobile: url })
                    }
                    placeholder="URL da imagem mobile"
                  />

                  <ImageUpload
                    label="Tablet"
                    dimensions="1024x576"
                    value={formData.imageTablet}
                    onChange={(url) =>
                      setFormData({ ...formData, imageTablet: url })
                    }
                    placeholder="URL da imagem tablet"
                  />

                  <ImageUpload
                    label="Desktop"
                    dimensions="1440x720"
                    value={formData.imageDesktop}
                    onChange={(url) =>
                      setFormData({ ...formData, imageDesktop: url })
                    }
                    placeholder="URL da imagem desktop"
                  />

                  <ImageUpload
                    label="Laptop"
                    dimensions="1920x720"
                    value={formData.imageLaptop}
                    onChange={(url) =>
                      setFormData({ ...formData, imageLaptop: url })
                    }
                    placeholder="URL da imagem laptop"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">Banner ativo</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingBanner ? "Atualizar" : "Criar"} Banner
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* LISTA DE BANNERS */}
      <div className="grid gap-4">
        {banners.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">
                Nenhum banner encontrado
              </h3>
              <p className="mb-4 text-center text-muted-foreground">
                Crie seu primeiro banner para o carousel da página inicial
              </p>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Banner
              </Button>
            </CardContent>
          </Card>
        ) : (
          banners
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((banner) => (
              <Card key={banner.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-lg">
                          {banner.title}
                        </CardTitle>
                        <CardDescription>{banner.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={banner.isActive ? "default" : "secondary"}
                      >
                        {banner.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                      <Badge variant="outline">
                        Ordem: {banner.order || 0}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Preview das imagens */}
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {[
                      { src: banner.imageMobile, label: "Mobile" },
                      { src: banner.imageTablet, label: "Tablet" },
                      { src: banner.imageDesktop, label: "Desktop" },
                      { src: banner.imageLaptop, label: "Laptop" },
                    ].map((img, index) => (
                      <div key={index} className="space-y-1">
                        <p className="text-center text-xs text-muted-foreground">
                          {img.label}
                        </p>
                        <div className="relative h-20 overflow-hidden rounded border bg-gray-100">
                          {img.src ? (
                            <Image
                              src={img.src}
                              alt={`${banner.title} - ${img.label}`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ações */}
                  <div className="flex items-center justify-between border-t pt-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(banner)}
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toggleActive(banner.id, !banner.isActive)
                        }
                      >
                        {banner.isActive ? (
                          <>
                            <EyeOff className="mr-1 h-4 w-4" />
                            Desativar
                          </>
                        ) : (
                          <>
                            <Eye className="mr-1 h-4 w-4" />
                            Ativar
                          </>
                        )}
                      </Button>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>
    </div>
  )
}

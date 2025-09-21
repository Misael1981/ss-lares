"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Eye, 
  EyeOff, 
  GripVertical,
  Image as ImageIcon
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

const BannerPrincipalPage = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
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
    isActive: true
  })

  // Carregar banners
  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners')
      const data = await response.json()
      setBanners(data)
    } catch (error) {
      toast.error("Erro ao carregar banners")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingBanner 
        ? `/api/banners/${editingBanner.id}` 
        : '/api/banners'
      
      const method = editingBanner ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingBanner ? "Banner atualizado!" : "Banner criado!")
        fetchBanners()
        setIsDialogOpen(false)
        resetForm()
      } else {
        toast.error("Erro ao salvar banner")
      }
    } catch (error) {
      toast.error("Erro ao salvar banner")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este banner?")) return

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success("Banner excluído!")
        fetchBanners()
      } else {
        toast.error("Erro ao excluir banner")
      }
    } catch (error) {
      toast.error("Erro ao excluir banner")
    }
  }

  const toggleActive = async (id, isActive) => {
    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        toast.success("Status atualizado!")
        fetchBanners()
      }
    } catch (error) {
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
      isActive: true
    })
    setEditingBanner(null)
  }

  const openEditDialog = (banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title || "",
      description: banner.description || "",
      imageMobile: banner.imageMobile || "",
      imageTablet: banner.imageTablet || "",
      imageDesktop: banner.imageDesktop || "",
      imageLaptop: banner.imageLaptop || "",
      order: banner.order || 0,
      isActive: banner.isActive
    })
    setIsDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Carregando banners...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
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
              <Plus className="h-4 w-4 mr-2" />
              Novo Banner
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Editar Banner" : "Novo Banner"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do banner. Todas as imagens são obrigatórias para responsividade.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Escolha inteligente"
                  />
                </div>
                
                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    placeholder="1, 2, 3..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Ex: Escolha inteligente para sua obra"
                  rows={3}
                />
              </div>

              {/* UPLOAD DE IMAGENS */}
              <div className="space-y-4">
                <h3 className="font-semibold">Imagens Responsivas</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="imageMobile">Mobile (640x400)</Label>
                    <Input
                      id="imageMobile"
                      value={formData.imageMobile}
                      onChange={(e) => setFormData({...formData, imageMobile: e.target.value})}
                      placeholder="URL da imagem mobile"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="imageTablet">Tablet (1024x576)</Label>
                    <Input
                      id="imageTablet"
                      value={formData.imageTablet}
                      onChange={(e) => setFormData({...formData, imageTablet: e.target.value})}
                      placeholder="URL da imagem tablet"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="imageDesktop">Desktop (1440x720)</Label>
                    <Input
                      id="imageDesktop"
                      value={formData.imageDesktop}
                      onChange={(e) => setFormData({...formData, imageDesktop: e.target.value})}
                      placeholder="URL da imagem desktop"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="imageLaptop">Laptop (1920x720)</Label>
                    <Input
                      id="imageLaptop"
                      value={formData.imageLaptop}
                      onChange={(e) => setFormData({...formData, imageLaptop: e.target.value})}
                      placeholder="URL da imagem laptop"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
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
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum banner encontrado</h3>
              <p className="text-muted-foreground text-center mb-4">
                Crie seu primeiro banner para o carousel da página inicial
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Banner
              </Button>
            </CardContent>
          </Card>
        ) : (
          banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* PREVIEW DA IMAGEM */}
                  <div className="w-48 h-32 relative bg-gray-100 flex-shrink-0">
                    {banner.imageMobile ? (
                      <Image
                        src={banner.imageMobile}
                        alt={banner.title || "Banner"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* CONTEÚDO */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            {banner.title || "Sem título"}
                          </h3>
                          <Badge variant={banner.isActive ? "default" : "secondary"}>
                            {banner.isActive ? "Ativo" : "Inativo"}
                          </Badge>
                          <Badge variant="outline">
                            Ordem: {banner.order}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {banner.description || "Sem descrição"}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Criado: {new Date(banner.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Atualizado: {new Date(banner.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* AÇÕES */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleActive(banner.id, banner.isActive)}
                        >
                          {banner.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(banner)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(banner.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default BannerPrincipalPage
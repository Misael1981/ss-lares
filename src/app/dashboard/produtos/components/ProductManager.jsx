"use client"

import { useState } from "react"
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
  Search, 
  Filter,
  Eye,
  EyeOff,
  Package,
  Tag,
  DollarSign
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import MultiImageUpload from "./MultiImageUpload"

export default function ProductManager({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts || [])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAvailable, setFilterAvailable] = useState("all")
  const [currentTag, setCurrentTag] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    quantity: "",
    height: "",
    width: "",
    length: "",
    price: 0,
    salePrice: 0,
    weight: 0,
    imageUrl: [],
    tags: [],
    isAvailable: true
  })

  // Gerar slug automaticamente
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validações
    if (!formData.name || !formData.price) {
      toast.error("Nome e preço são obrigatórios")
      return
    }

    if (formData.imageUrl.length === 0) {
      toast.error("Pelo menos uma imagem é obrigatória")
      return
    }

    try {
      const url = editingProduct 
        ? `/api/products/${editingProduct.id}` 
        : '/api/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || generateSlug(formData.name),
          price: parseFloat(formData.price),
          salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
          weight: formData.weight ? parseFloat(formData.weight) : null
        })
      })

      if (response.ok) {
        const savedProduct = await response.json()
        
        if (editingProduct) {
          setProducts(products.map(product => 
            product.id === editingProduct.id ? savedProduct : product
          ))
          toast.success("Produto atualizado!")
        } else {
          setProducts([savedProduct, ...products])
          toast.success("Produto criado!")
        }
        
        setIsDialogOpen(false)
        resetForm()
      } else {
        const error = await response.json()
        toast.error(error.message || "Erro ao salvar produto")
      }
    } catch (error) {
      toast.error("Erro ao salvar produto")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter(product => product.id !== id))
        toast.success("Produto excluído!")
      } else {
        toast.error("Erro ao excluir produto")
      }
    } catch (error) {
      toast.error("Erro ao excluir produto")
    }
  }

  const toggleAvailable = async (id, isAvailable) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !isAvailable })
      })

      if (response.ok) {
        setProducts(products.map(product => 
          product.id === id ? { ...product, isAvailable: !isAvailable } : product
        ))
        toast.success("Status atualizado!")
      }
    } catch (error) {
      toast.error("Erro ao atualizar status")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      quantity: "",
      height: "",
      width: "",
      length: "",
      price: 0,
      salePrice: 0,
      weight: 0,
      imageUrl: [],
      tags: [],
      isAvailable: true
    })
    setEditingProduct(null)
    setCurrentTag("")
  }

  const openEditDialog = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || "",
      slug: product.slug || "",
      description: product.description || "",
      quantity: product.quantity || "",
      height: product.height || "",
      width: product.width || "",
      length: product.length || "",
      price: product.price || 0,
      salePrice: product.salePrice || 0,
      weight: product.weight || 0,
      imageUrl: product.imageUrl || [],
      tags: product.tags || [],
      isAvailable: product.isAvailable
    })
    setIsDialogOpen(true)
  }

  // Adicionar tag
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      })
      setCurrentTag("")
    }
  }

  // Remover tag
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterAvailable === "all" || 
                         (filterAvailable === "available" && product.isAvailable) ||
                         (filterAvailable === "unavailable" && !product.isAvailable)
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie o catálogo de produtos da loja
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do produto. Nome, preço e pelo menos uma imagem são obrigatórios.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value
                      setFormData({
                        ...formData, 
                        name,
                        slug: generateSlug(name)
                      })
                    }}
                    placeholder="Ex: Cunha Plástica 10mm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="cunha-plastica-10mm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descrição detalhada do produto..."
                  rows={3}
                />
              </div>

              {/* Preços */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Preço *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="salePrice">Preço Promocional</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="Ex: 100 unidades"
                  />
                </div>
              </div>

              {/* Dimensões e Peso */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    placeholder="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="width">Largura (cm)</Label>
                  <Input
                    id="width"
                    value={formData.width}
                    onChange={(e) => setFormData({...formData, width: e.target.value})}
                    placeholder="15"
                  />
                </div>

                <div>
                  <Label htmlFor="length">Comprimento (cm)</Label>
                  <Input
                    id="length"
                    value={formData.length}
                    onChange={(e) => setFormData({...formData, length: e.target.value})}
                    placeholder="20"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="1.5"
                  />
                </div>
              </div>

              {/* Upload de Imagens */}
              <MultiImageUpload
                label="Imagens do Produto"
                images={formData.imageUrl}
                onChange={(images) => setFormData({...formData, imageUrl: images})}
                maxImages={5}
              />

              {/* Tags */}
              <div className="space-y-3">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Digite uma tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Tag className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => setFormData({...formData, isAvailable: checked})}
                />
                <Label htmlFor="isAvailable">Produto disponível</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingProduct ? "Atualizar" : "Criar"} Produto
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

      {/* FILTROS E BUSCA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filterAvailable === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterAvailable("all")}
          >
            Todos ({products.length})
          </Button>
          <Button
            variant={filterAvailable === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterAvailable("available")}
          >
            <Eye className="h-4 w-4 mr-1" />
            Disponíveis ({products.filter(p => p.isAvailable).length})
          </Button>
          <Button
            variant={filterAvailable === "unavailable" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterAvailable("unavailable")}
          >
            <EyeOff className="h-4 w-4 mr-1" />
            Indisponíveis ({products.filter(p => !p.isAvailable).length})
          </Button>
        </div>
      </div>

      {/* LISTA DE PRODUTOS */}
      <div className="grid gap-4">
        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm 
                  ? "Tente ajustar os filtros de busca" 
                  : "Crie seu primeiro produto para começar a vender"
                }
              </p>
              {!searchTerm && (
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Produto
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {/* Imagem principal */}
                    <div className="relative w-20 h-20 bg-gray-100 rounded border overflow-hidden flex-shrink-0">
                      {product.imageUrl && product.imageUrl[0] ? (
                        <Image
                          src={product.imageUrl[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {product.description || "Sem descrição"}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={product.isAvailable ? "default" : "secondary"}>
                          {product.isAvailable ? "Disponível" : "Indisponível"}
                        </Badge>
                        {product.salePrice && (
                          <Badge variant="destructive">Promoção</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold">
                      <DollarSign className="h-4 w-4" />
                      {product.salePrice ? (
                        <div className="flex flex-col">
                          <span className="text-sm line-through text-muted-foreground">
                            R$ {product.price?.toFixed(2)}
                          </span>
                          <span className="text-green-600">
                            R$ {product.salePrice?.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span>R$ {product.price?.toFixed(2)}</span>
                      )}
                    </div>
                    {product.quantity && (
                      <p className="text-sm text-muted-foreground">
                        {product.quantity}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Dimensões */}
                {(product.height || product.width || product.length || product.weight) && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Dimensões:</strong> {' '}
                    {[
                      product.height && `${product.height}cm (A)`,
                      product.width && `${product.width}cm (L)`,
                      product.length && `${product.length}cm (C)`,
                      product.weight && `${product.weight}kg`
                    ].filter(Boolean).join(' × ')}
                  </div>
                )}
                
                {/* Ações */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAvailable(product.id, product.isAvailable)}
                    >
                      {product.isAvailable ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Desativar
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Ativar
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
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
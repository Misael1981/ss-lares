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
  Search, 
  Filter,
  Eye,
  EyeOff,
  Package,
  Upload,
  X,
  Tag,
  DollarSign
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

const ProdutosPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
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

  // Carregar produtos
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      toast.error("Erro ao carregar produtos")
    } finally {
      setLoading(false)
    }
  }

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
        toast.success(editingProduct ? "Produto atualizado!" : "Produto criado!")
        fetchProducts()
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
        toast.success("Produto excluído!")
        fetchProducts()
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
        toast.success("Status atualizado!")
        fetchProducts()
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

  // Adicionar URL de imagem
  const addImageUrl = () => {
    const url = prompt("Digite a URL da imagem:")
    if (url && url.trim()) {
      setFormData({
        ...formData,
        imageUrl: [...formData.imageUrl, url.trim()]
      })
    }
  }

  // Remover URL de imagem
  const removeImageUrl = (index) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((_, i) => i !== index)
    })
  }

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filterAvailable === "all" || 
                         (filterAvailable === "available" && product.isAvailable) ||
                         (filterAvailable === "unavailable" && !product.isAvailable)
    
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Carregando produtos...</p>
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
                Preencha as informações do produto. Nome e preço são obrigatórios.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* INFORMAÇÕES BÁSICAS */}
              <div className="grid grid-cols-2 gap-4">
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
                    placeholder="Ex: Ralo Linear"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="ralo-linear"
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
                  rows={4}
                />
              </div>

              {/* PREÇOS */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="salePrice">Preço Promocional (R$)</Label>
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
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* DIMENSÕES */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="Ex: 20 unidades"
                  />
                </div>
                
                <div>
                  <Label htmlFor="height">Altura</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    placeholder="Ex: 10cm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="width">Largura</Label>
                  <Input
                    id="width"
                    value={formData.width}
                    onChange={(e) => setFormData({...formData, width: e.target.value})}
                    placeholder="Ex: 15cm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="length">Comprimento</Label>
                  <Input
                    id="length"
                    value={formData.length}
                    onChange={(e) => setFormData({...formData, length: e.target.value})}
                    placeholder="Ex: 20cm"
                  />
                </div>
              </div>

              {/* IMAGENS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Imagens do Produto</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addImageUrl}>
                    <Upload className="h-4 w-4 mr-2" />
                    Adicionar URL
                  </Button>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {formData.imageUrl.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={url}
                          alt={`Produto ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImageUrl(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* TAGS */}
              <div className="space-y-4">
                <Label>Tags do Produto</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Digite uma tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Tag className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
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
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterAvailable}
              onChange={(e) => setFilterAvailable(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Todos</option>
              <option value="available">Disponíveis</option>
              <option value="unavailable">Indisponíveis</option>
            </select>
          </div>
        </CardContent>
      </Card>

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
                  : "Crie seu primeiro produto para começar"
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Produto
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* IMAGEM DO PRODUTO */}
                  <div className="w-48 h-32 relative bg-gray-100 flex-shrink-0">
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

                  {/* CONTEÚDO */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          <Badge variant={product.isAvailable ? "default" : "secondary"}>
                            {product.isAvailable ? "Disponível" : "Indisponível"}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.description || "Sem descrição"}
                        </p>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-600">
                              R$ {product.price.toFixed(2)}
                            </span>
                            {product.salePrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                R$ {product.salePrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          {product.quantity && (
                            <span className="text-sm text-muted-foreground">
                              {product.quantity}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.tags?.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {product.tags?.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Criado: {new Date(product.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Atualizado: {new Date(product.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* AÇÕES */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleAvailable(product.id, product.isAvailable)}
                        >
                          {product.isAvailable ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(product.id)}
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

      {/* ESTATÍSTICAS */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Produtos</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Disponíveis</p>
                <p className="text-2xl font-bold">
                  {products.filter(p => p.isAvailable).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Indisponíveis</p>
                <p className="text-2xl font-bold">
                  {products.filter(p => !p.isAvailable).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProdutosPage
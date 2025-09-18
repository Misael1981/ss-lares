"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Heart, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

const ProductDetails = ({ product }) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // 🖼️ GARANTIR QUE IMAGES É ARRAY
  const images = Array.isArray(product.imageUrl)
    ? product.imageUrl
    : [product.imageUrl]

  const handleAddToCart = () => {
    // 🛒 IMPLEMENTAR CARRINHO DEPOIS
    console.log("Adicionar ao carrinho:", { product, quantity })
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* 🔙 BOTÃO VOLTAR */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar aos Produtos
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 🖼️ GALERIA DE IMAGENS */}
        <div className="space-y-4">
          {/* IMAGEM PRINCIPAL */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={images[selectedImage] || "/image/placeholder.png"}
                alt={product.name}
                width={600}
                height={600}
                className="h-96 w-full object-cover"
              />
            </CardContent>
          </Card>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${selectedImage === index ? "border-[#cb0735]" : "border-gray-200"}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 📝 INFORMAÇÕES DO PRODUTO */}
        <div className="space-y-6">
          {/* CABEÇALHO */}
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <div className="mb-4 flex items-center gap-2">
              <Badge variant={product.isAvailable ? "default" : "secondary"}>
                {product.isAvailable ? "Disponível" : "Indisponível"}
              </Badge>
            </div>
            <p className="mb-4 text-4xl font-bold text-[#cb0735]">
              R$ {product.price?.toFixed(2)}
            </p>
          </div>

          {/* DESCRIÇÃO */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-3 text-lg font-semibold">Descrição</h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </CardContent>
          </Card>

          {/* ESPECIFICAÇÕES */}
          {product.specifications && (
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">Especificações</h3>
                <div className="space-y-2">
                  {/* AQUI VOCÊ PODE ADICIONAR SPECS ESPECÍFICAS */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoria:</span>
                    <span className="font-medium">
                      {product.category || "Geral"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AÇÕES */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* QUANTIDADE */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Quantidade:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#cb0735] hover:bg-[#a00529]"
                    disabled={!product.isAvailable}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>

                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>

                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

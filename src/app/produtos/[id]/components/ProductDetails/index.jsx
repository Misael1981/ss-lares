"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Heart, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import SheetCart from "@/components/SheetCart"
import FreteCard from "../FreteCard"
import ProductPackaging from "../ProductPackaging"
import HeaderProduct from "../HeaderProduct"
import ProductsSpecification from "../ProductsSpecification"

const ProductDetails = ({ product }) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // ✅ ESTADO COMPARTILHADO: Controla qual embalagem está selecionada
  const [selectedPackaging, setSelectedPackaging] = useState(null)

  const { addItem, openCart } = useCart()

  // ✅ Definir primeira embalagem como padrão quando carregar
  useEffect(() => {
    if (product?.packaging?.[0] && !selectedPackaging) {
      setSelectedPackaging(product.packaging[0])
    }
  }, [product?.packaging, selectedPackaging])

  const images = Array.isArray(product.imageUrl)
    ? product.imageUrl
    : [product.imageUrl]

  const handleAddToCart = () => {
    // ✅ Usar o preço da caixa selecionada, não o preço unitário
    const productForCart = {
      ...product,
      price:
        selectedPackaging?.salePrice ||
        selectedPackaging?.price ||
        product.price,
      // Adicionar informações da embalagem para referência
      packaging: selectedPackaging,
    }

    addItem(productForCart)
    openCart()
    console.log(
      "✅ Produto adicionado:",
      product.name,
      "- Preço da caixa:",
      productForCart.price,
      "- Quantidade:",
      quantity,
    )
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar aos Produtos
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* IMAGEM PRINCIPAL E OPÇÕES IMAGENS */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={images[selectedImage] || "/image/placeholder.png"}
                alt={product.name}
                width={600}
                height={600}
                className="h-96 w-full object-contain"
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

          {/* ✅ PACOTES COM ESTADO COMPARTILHADO */}
          <ProductPackaging
            product={product}
            selectedPackaging={selectedPackaging}
            onPackagingSelect={setSelectedPackaging}
          />
        </div>

        {/* 📝 INFORMAÇÕES DO PRODUTO */}
        <div className="space-y-6">
          {/* ✅ CABEÇALHO COM EMBALAGEM SELECIONADA */}
          <HeaderProduct
            product={product}
            selectedPackaging={selectedPackaging}
          />

          {/* AÇÕES - ADICIONAR AO CARRINHO */}
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
                    className="flex-1 bg-green-500 text-white hover:bg-green-600"
                    disabled={!product.isAvailable}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao Carrinho
                  </Button>

                  <SheetCart />

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

          <FreteCard
            produto={product}
            selectedPackaging={selectedPackaging}
            quantity={quantity} // ✅ Passar quantidade atual
          />

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-3 text-lg font-semibold">Descrição</h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </CardContent>
          </Card>

          <ProductsSpecification product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

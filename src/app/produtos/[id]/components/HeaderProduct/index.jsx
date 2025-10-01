"use client"

import { Badge } from "@/components/ui/badge"

const HeaderProduct = ({ product, selectedPackaging }) => {
  if (!product || !selectedPackaging) return null

  const currentPrice = selectedPackaging.salePrice || selectedPackaging.price
  const totalUnits =
    (selectedPackaging.quantityPerPackage || 0) *
    (selectedPackaging.packagePerBox || 0)
  const unitPrice = currentPrice / totalUnits

  return (
    <div className="mb-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        {product.name}
      </h1>
      <div className="mb-4 flex items-center gap-2">
        <Badge
          variant={product.isAvailable ? "default" : "secondary"}
          className={
            product.isAvailable ? "bg-green-500 hover:bg-green-600" : ""
          }
        >
          {product.isAvailable ? "Disponível" : "Indisponível"}
        </Badge>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mb-4 flex items-center gap-2">
          <p className="text-4xl font-bold text-orange-500">
            R$ {product.price?.toFixed(2)}
          </p>
          <span className="text-gray-500">
            o pacote com ({selectedPackaging.quantityPerPackage}{" "}
            {selectedPackaging.unitLabel})
          </span>
        </div>
        {/* Preço da caixa */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">
            R$ {currentPrice.toFixed(2)}
          </span>
          <span className="text-gray-500">
            por caixa ({totalUnits} {selectedPackaging.unitLabel})
          </span>
        </div>

        {/* Preço unitário */}
        <div className="text-lg text-gray-600">
          R$ {unitPrice.toFixed(2)} por{" "}
          {selectedPackaging.unitLabel?.slice(0, -1) || "unidade"}
        </div>

        {/* Pedido mínimo */}
        <div className="text-sm font-medium text-orange-600">
          📦 Pedido mínimo: 1 caixa
        </div>
      </div>
    </div>
  )
}

export default HeaderProduct

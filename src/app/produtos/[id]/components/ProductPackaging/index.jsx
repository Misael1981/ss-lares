"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Check, Ruler, Weight } from "lucide-react"

const ProductPackaging = ({
  product,
  selectedPackaging,
  onPackagingSelect,
}) => {
  // ✅ Não precisa mais de useState interno!
  // O estado vem do componente pai

  const handleSelect = (packaging) => {
    onPackagingSelect(packaging) // ✅ Atualiza o estado do pai
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Package className="h-5 w-5" />
          Escolha a embalagem
        </h3>
        <p className="mb-4 text-gray-600">
          Selecione a quantidade que melhor atende sua necessidade.
        </p>

        <div className="space-y-3">
          {product.packaging?.map((packaging, index) => (
            <div
              key={packaging.id || index}
              className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-orange-300 ${
                selectedPackaging?.id === packaging.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleSelect(packaging)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    {/* Quantidade total por caixa */}
                    <Badge variant="outline" className="text-orange-500">
                      {Number(packaging.quantityPerPackage || 0) *
                        Number(packaging.packagePerBox || 0)}{" "}
                      {packaging.unitLabel || "unidades"}
                    </Badge>

                    {/* ✨ NOVO: Mostrar quantos pacotes por caixa */}
                    {packaging.quantityPerPackage && (
                      <Badge variant="secondary" className="text-blue-600">
                        {packaging.quantityPerPackage} peças/pacote
                      </Badge>
                    )}
                    {packaging.packagePerBox && (
                      <Badge variant="secondary" className="text-blue-600">
                        {packaging.packagePerBox} pacotes/caixa
                      </Badge>
                    )}

                    {packaging.salePrice && (
                      <Badge variant="destructive" className="text-xs">
                        PROMOÇÃO
                      </Badge>
                    )}
                  </div>

                  {/* ✨ NOVA SEÇÃO: Dimensões e Peso */}
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    {/* ✨ NOVO: Pacotes por caixa */}
                    {packaging.packagePerBox && (
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>{packaging.packagePerBox} pacotes por caixa</span>
                      </div>
                    )}

                    {/* Dimensões */}
                    {(packaging.boxLength ||
                      packaging.boxWidth ||
                      packaging.boxHeight) && (
                      <div className="flex items-center gap-1">
                        <Ruler className="h-3 w-3" />
                        <span>
                          {packaging.boxLength || "?"} ×{" "}
                          {packaging.boxWidth || "?"} ×{" "}
                          {packaging.boxHeight || "?"} cm
                        </span>
                      </div>
                    )}

                    {/* Peso */}
                    {packaging.boxWeight && (
                      <div className="flex items-center gap-1">
                        <Weight className="h-3 w-3" />
                        <span>{packaging.boxWeight} kg</span>
                      </div>
                    )}

                    {/* Código de barras (se tiver) */}
                    {packaging.barcodeBox && (
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs">
                          📊 {packaging.barcodeBox}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      {packaging.salePrice ? (
                        // Preço promocional
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">
                            R$ {packaging.salePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            R$ {packaging.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-green-600">
                          R$ {packaging.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {packaging.quantityPerBox && (
                      <div className="text-sm text-gray-500">
                        {/* Preço por unidade */}
                        R${" "}
                        {(
                          (packaging.salePrice || packaging.price) /
                          (Number(packaging.quantityPerPackage || 0) *
                            Number(packaging.packagePerBox || 0))
                        ).toFixed(2)}{" "}
                        por {packaging.unitLabel?.slice(0, -1) || "unidade"}
                      </div>
                    )}
                    {packaging.quantityPerPackage &&
                      packaging.packagePerBox && (
                        <div className="text-sm text-gray-500">
                          {/* Preço por unidade individual */}
                          R${" "}
                          {(
                            (packaging.salePrice || packaging.price) /
                            (packaging.quantityPerPackage *
                              packaging.packagePerBox)
                          ).toFixed(2)}{" "}
                          por {packaging.unitLabel?.slice(0, -1) || "unidade"}
                        </div>
                      )}
                  </div>
                </div>

                <div className="ml-4">
                  {selectedPackaging?.id === packaging.id ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPackaging && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-700">
              ✅ Selecionado: {selectedPackaging.quantityPerBox}{" "}
              {selectedPackaging.unitLabel} por R${" "}
              {(selectedPackaging.salePrice || selectedPackaging.price).toFixed(
                2,
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductPackaging

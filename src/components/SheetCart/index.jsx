"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { Button } from "../ui/button"
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"

const SheetCart = () => {
  const {
    isOpen,
    closeCart,
    items,
    totals,
    updateQuantity,
    removeItem,
    itemCount,
    clearCart,
  } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex h-full w-[90%] flex-col sm:max-w-lg">
        <SheetHeader className="flex-shrink-0 border-b pb-4">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrinho ({itemCount} {itemCount === 1 ? "item" : "itens"})
            </div>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            Revise seus produtos antes de finalizar a compra
          </SheetDescription>
        </SheetHeader>

        {/* 📜 ÁREA COM SCROLL - LISTA DE PRODUTOS */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex-1 overflow-y-auto py-4 pr-2">
            {items.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <p className="text-lg text-gray-500">Seu carrinho está vazio</p>
                <p className="mt-2 text-sm text-gray-400">
                  Adicione produtos para começar suas compras
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/image/tablet.webp"}
                        alt={item.name || "Produto"}
                        width={80}
                        height={80}
                        className="rounded-lg border object-cover"
                        onError={(e) => {
                          e.target.src = "/image/tablet.webp"
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-lg font-bold text-green-600">
                        R$ {item.price.toFixed(2)}
                      </p>

                      {/* CONTROLES DE QUANTIDADE */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-1 text-gray-800">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="min-w-[2rem] px-3 py-1 text-center font-medium">
                            {item.quantity}
                          </span>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-8 w-8 p-0 hover:bg-gray-200"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* SUBTOTAL DO ITEM */}
                      <div className="mt-2 text-right">
                        <span className="text-sm text-gray-500">
                          Subtotal:{" "}
                        </span>
                        <span className="font-semibold text-gray-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 💰 RESUMO FIXO - SEM SCROLL */}
        {items.length > 0 && (
          <div className="-mx-6 mt-4 flex-shrink-0 border-t bg-gray-50 px-6 pb-6 pt-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  R$ {totals.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete:</span>
                <span className="font-medium">
                  {totals.shipping === 0 ? (
                    <span className="text-green-600">Grátis</span>
                  ) : (
                    `R$ ${totals.shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    R$ {totals.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-green-500 py-3 text-lg font-semibold text-white hover:bg-green-600">
                Finalizar Compra
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SheetCart

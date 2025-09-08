import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

const CardProduct = ({ products }) => {
  // Pega o primeiro produto (agora sempre será apenas 1)
  const product = products?.[0]

  if (!product) {
    return null
  }

  return (
    <Card className="w-[180px] rounded-2xl shadow-md">
      <CardContent className="p-3">
        <div className="relative h-[160px] w-full overflow-hidden rounded-2xl">
          <Image
            src={product.imageUrl?.[0] || "/next.svg"}
            alt={product.name || "Produto"}
            fill
            className="rounded-2xl object-cover"
          />
        </div>
        <div className="flex min-h-[120px] flex-col justify-between pt-3">
          <h3 className="line-clamp-2 text-center text-sm font-semibold leading-tight">
            {product.name}
          </h3>
          <div className="mt-3">
            <p className="text-center text-lg font-bold text-green-600">
              R${" "}
              {product.salePrice
                ? product.salePrice.toFixed(2)
                : product.price.toFixed(2)}
            </p>
            {product.salePrice && (
              <p className="text-center text-sm text-gray-500 line-through">
                R$ {product.price.toFixed(2)}
              </p>
            )}
            <Button variant="secondary" className="mt-3 w-full text-xs">
              Ver mais
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardProduct

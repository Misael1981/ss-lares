import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

const CardProduct = ({ products }) => {
  const product = products?.[0]

  if (!product) {
    return null
  }

  return (
    <Link href={`/produtos/${product.id}`}>
      <Card className="w-[180px] cursor-pointer rounded-2xl shadow-md transition-shadow hover:shadow-lg">
        <CardContent className="p-3">
          <div className="relative h-[160px] w-full overflow-hidden rounded-2xl">
            <Image
              src={product.imageUrl?.[0] || "/next.svg"}
              alt={product.name || "Produto"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 180px"
              className="rounded-2xl object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="flex min-h-[150px] flex-col justify-between pt-3">
            <h3 className="line-clamp-2 text-center text-sm font-semibold leading-tight">
              {product.name}
            </h3>
            <div className="mt-3">
              <p className="text-center text-lg font-bold text-green-600">
                R${" "}
                {product?.salePrice
                  ? product.salePrice.toFixed(2)
                  : product.price?.toFixed(2)}
              </p>
              {product?.salePrice && (
                <p className="text-center text-sm text-gray-500 line-through">
                  R$ {product.price.toFixed(2)}
                </p>
              )}
              <Button
                variant="secondary"
                className="pointer-events-none mt-3 w-full text-xs"
              >
                Ver mais
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardProduct

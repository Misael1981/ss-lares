import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const CardProductStory = ({ product }) => {
  // 🔥 PEGAR A PRIMEIRA IMAGEM DO ARRAY
  const firstImage = Array.isArray(product.imageUrl)
    ? product.imageUrl[0]
    : product.imageUrl

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Image
              src={firstImage || "/image/placeholder.png"}
              width={200}
              height={200}
              alt={product.name || "Produto"}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-gray-600">
              {product.description}
            </p>
            <p className="mt-2 text-xl font-bold text-green-500">
              R$ {product.price?.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardProductStory

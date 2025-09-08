import { db } from "@/lib/prisma"
import CardProduct from "../CardProduct"
import Subtitle from "../SubTitle"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import ProductsCarouselClient from "../ProductsCarouselClient"

const ProductsCarousel = async () => {
  const products = await db.product.findMany({
    where: {
      isAvailable: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!products || products.length === 0) {
    return (
      <section className="mb-32">
        <Subtitle>Produtos</Subtitle>
        <p className="py-8 text-center text-gray-500">
          Nenhum produto encontrado.
        </p>
      </section>
    )
  }

  return (
    <section>
      <Subtitle>Produtos</Subtitle>
      <ProductsCarouselClient products={products} />
    </section>
  )
}

export default ProductsCarousel

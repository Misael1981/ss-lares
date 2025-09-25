import prisma, { prismaWithRetry } from "@/lib/prisma"
import Subtitle from "../SubTitle"
import ProductsCarouselClient from "../ProductsCarouselClient"
import SearchProducts from "../SearchProducts"

const ProductsCarousel = async () => {
  try {
    const products = await prismaWithRetry(() =>
      prisma.product.findMany({
        where: {
          isAvailable: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    )

    if (!products || products.length === 0) {
      return (
        <section>
          <Subtitle>Produtos</Subtitle>
          <p className="py-8 text-center text-gray-500">
            Nenhum produto encontrado.
          </p>
        </section>
      )
    }

    return (
      <section className="boxed">
        <Subtitle>Produtos</Subtitle>
        <SearchProducts products={products} />
        <ProductsCarouselClient products={products} />
      </section>
    )
  } catch (error) {
    console.error("Erro ao carregar produtos:", error)

    // Fallback melhorado
    return (
      <div className="p-8 text-center">
        <h2>Produtos</h2>
        <p className="text-red-500">Erro ao conectar com o banco de dados</p>
        <p className="text-sm text-gray-500">Erro: {error.message}</p>
      </div>
    )
  }
}

export default ProductsCarousel

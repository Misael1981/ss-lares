import { prismaWithRetry } from "@/lib/prisma"
import Subtitle from "../SubTitle"
import ProductsCarouselClient from "../ProductsCarouselClient"
import TagsQuickSearch from "../TagsQuickSearch"
import Search from "../Search"

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
        <TagsQuickSearch />
        <Search />
        <ProductsCarouselClient products={products} />
      </section>
    )
  } catch (error) {
    console.error("Erro ao carregar produtos:", error)

    // Fallback: mostrar conteúdo estático
    return (
      <div className="p-8 text-center">
        <h2>Bem-vindo!</h2>
        <p>Carregando conteúdo...</p>
      </div>
    )
  }
}

export default ProductsCarousel

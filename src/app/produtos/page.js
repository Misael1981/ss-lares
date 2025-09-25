import Subtitle from "@/components/SubTitle"
import prisma, { prismaWithRetry } from "@/lib/prisma"
import CardProductStory from "./components/CardProductStory"
import SearchProducts from "@/components/SearchProducts"
import Footer from "@/components/Footer"

const Produtos = async ({ searchParams }) => {
  // ✅ Pegar o filtro de tipo da URL
  const selectedType = searchParams?.type

  try {
    // ✅ Construir filtro dinâmico
    const whereCondition = {
      isAvailable: true,
      ...(selectedType && { type: selectedType }) // Só adiciona filtro se tipo foi selecionado
    }

    const products = await prismaWithRetry(() =>
      prisma.product.findMany({
        where: whereCondition,
        orderBy: {
          createdAt: "desc",
        },
      }),
    )

    // ✅ Buscar TODOS os produtos para passar tipos para SearchProducts
    const allProducts = await prismaWithRetry(() =>
      prisma.product.findMany({
        where: { isAvailable: true },
        select: { type: true } // Só precisamos do tipo
      }),
    )

    if (!products || products.length === 0) {
      return (
        <main className="h-[calc(100vh-170px)]">
          <div className="boxed">
            <Subtitle>
              {selectedType 
                ? `Produtos - ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}` 
                : "Produtos"
              }
            </Subtitle>
            <SearchProducts products={allProducts} />
            <p className="py-8 text-center text-gray-500">
              {selectedType 
                ? `Nenhum produto encontrado para "${selectedType}".`
                : "Nenhum produto encontrado."
              }
            </p>
          </div>
        </main>
      )
    }

    return (
      <>
        <main className="">
          <div className="boxed">
            <Subtitle>
              {selectedType 
                ? `Produtos - ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}` 
                : "Produtos"
              }
            </Subtitle>
            <SearchProducts products={allProducts} />
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <CardProductStory key={product.id} product={product} />
              ))}
            </section>
          </div>
        </main>
        <Footer />
      </>
    )
  } catch (error) {
    return (
      <main className="">
        <div className="boxed">
          <Subtitle>Produtos</Subtitle>
          <p className="py-8 text-center text-red-500">
            Ocorreu um erro ao carregar os produtos. Por favor, tente novamente
            mais tarde.
          </p>
        </div>
      </main>
    )
  }
}

export default Produtos

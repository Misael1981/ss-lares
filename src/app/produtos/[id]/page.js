import prisma, { prismaWithRetry } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProductDetails from "./components/ProductDetails"

const Produto = async ({ params }) => {
  const { id } = params

  try {
    const product = await prismaWithRetry(() =>
      prisma.product.findUnique({
        where: {
          id: id,
        },
        include: {
          packaging: true, // ← Incluir os dados de packaging
        },
      }),
    )

    if (!product) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ProductDetails product={product} />
        </div>
      </main>
    )
  } catch (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-red-500">
              Erro ao Carregar Produto
            </h1>
            <p className="text-gray-600">
              Ocorreu um erro ao carregar o produto. Tente novamente mais tarde.
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Produto

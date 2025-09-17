import Subtitle from "@/components/SubTitle"
import prisma, { prismaWithRetry } from "@/lib/prisma"
import CardProductStory from "./components/CardProductStory"

const Produtos = async () => {
  console.log("🚀 Iniciando busca de produtos...")

  try {
    console.log("📡 Conectando ao banco...")

    const products = await prismaWithRetry(() =>
      prisma.product.findMany({
        where: {
          isAvailable: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    )

    console.log("✅ Produtos encontrados:", products?.length || 0)
    console.log("📦 Primeiro produto:", products?.[0]) // 🔥 VER ESTRUTURA

    // 🎯 EARLY RETURN - MAIS LIMPO!
    if (!products || products.length === 0) {
      return (
        <main className="h-[calc(100vh-170px)]">
          <div className="boxed">
            <Subtitle>Produtos</Subtitle>
            <p className="py-8 text-center text-gray-500">
              Nenhum produto encontrado.
            </p>
          </div>
        </main>
      )
    }

    // 🚀 SUCESSO - RENDERIZAR PRODUTOS
    return (
      <main className="">
        <div className="boxed">
          <Subtitle>Produtos</Subtitle>
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <CardProductStory key={product.id} product={product} />
            ))}
          </section>
        </div>
      </main>
    )
  } catch (error) {
    console.error("❌ Erro completo:", error)
    console.error("❌ Stack trace:", error.stack)
    console.error("Erro ao buscar produtos:", error)
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

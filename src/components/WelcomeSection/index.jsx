import prisma, { prismaWithRetry } from "@/lib/prisma"
import CardWelcome from "./components/CardWelcome"

const WelcomeSection = async () => {
  try {
    // Usar retry em vez de prisma direto
    const banners = await prismaWithRetry(() =>
      prisma.carouselBanner.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          order: "asc",
        },
      }),
    )

    return (
      <section>
        <CardWelcome banners={banners} />
      </section>
    )
  } catch (error) {
    console.error("Erro ao carregar banners:", error)

    // Fallback: mostrar conteúdo estático
    return (
      <div className="p-8 text-center">
        <h2>Bem-vindo!</h2>
        <p>Carregando conteúdo...</p>
      </div>
    )
  }
}

export default WelcomeSection

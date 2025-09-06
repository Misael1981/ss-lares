const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedDataBase() {
  try {
    const carouselBanners = [
      {
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192583/home1-mobile_jxw4j1.webp",
        title: "Escolha inteligente",
        description: "Escolha inteligente para sua obra.",
        order: 1,
        isActive: true,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home2-mobile_vplauq.webp",
        title: "Economia e Qualidade",
        description: "Economia e Qualidade para sua obra.",
        order: 2,
        isActive: true,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home3-mobile_tdab9a.webp",
        title: "Entrega em todo o Brasil",
        description: "Entregamos em todo pais.",
        order: 3,
        isActive: true,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192583/home4-mobile_kgx2az.webp",
        title: "Banner Principal",
        description: "Banner principal, outdoor.",
        order: 4,
        isActive: true,
      },
      {
        imageUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home5-mobile_mjcdb2.webp",
        title: "Banner secundário",
        description: "Banner secundário, outdoor.",
        order: 5,
        isActive: true,
      },
    ]

    // AQUI É ONDE VOCÊ INSERE OS DADOS NO BANCO!
    console.log("🌱 Iniciando seed dos banners do carousel...")
    
    for (const banner of carouselBanners) {
      await prisma.carouselBanner.create({
        data: banner,
      })
    }
    
    console.log("✅ Seed concluído com sucesso!")
    console.log(`📊 ${carouselBanners.length} banners criados no banco de dados`)
    
  } catch (error) {
    console.error("❌ Erro ao executar o seed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDataBase()

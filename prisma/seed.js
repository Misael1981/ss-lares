const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedDataBase() {
  try {
    const carouselBanners = [
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192583/home1-mobile_jxw4j1.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home1-tablet_ytroy9.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250643/home1-desktop_tad3fl.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250927/home1-laptop_ey2npj.webp",
        title: "Escolha inteligente",
        description: "Escolha inteligente para sua obra.",
        order: 1,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home2-mobile_vplauq.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home2-tablet_yxkdgv.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250643/home2-desktop_fgos64.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250928/home2-laptop_trdgjf.webp",
        title: "Economia e Qualidade",
        description: "Economia e Qualidade para sua obra.",
        order: 2,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home3-mobile_tdab9a.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home3-tablet_qwlkkw.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250643/home3-desktop_vlcskx.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250929/home3-laptop_qiab08.webp",
        title: "Entrega em todo o Brasil",
        description: "Entregamos em todo pais.",
        order: 3,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192583/home4-mobile_kgx2az.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209138/home4-tablet_n7wium.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250644/home4-desktop_rzkqjc.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250932/home4-laptop_togizf.webp",
        title: "Banner Principal",
        description: "Banner principal, outdoor.",
        order: 4,
        isActive: true,
      },
      {
        imageMobile:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/home5-mobile_mjcdb2.webp",
        imageTablet:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757209139/home5-tablet_jbhmni.webp",
        imageDesktop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250644/home5-desktop_owzuw6.webp",
        imageLaptop:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757250932/home5-laptop_wnmhoc.webp",
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
    console.log(
      `📊 ${carouselBanners.length} banners criados no banco de dados`,
    )
  } catch (error) {
    console.error("❌ Erro ao executar o seed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDataBase()

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seedDataBase() {
  try {
    // BANNERS DO CAROUSEL (já existente)
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

    // 🔥 PRODUTOS - AQUI ESTÁ A MÁGICA!
    const products = [
      {
        name: "Cunha",
        slug: "cunha",
        description:
          "A Cunha Niveladora com o auxílio do Espaçador Nivelador SSLARES garante o nivelamento correto dos pisos e mantém o espaçamento conforme a medida do espaçador. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. A cunha Niveladora SSLARES é reutilizável.",
        quantity: "50 peças",
        height: "20mm",
        width: "23mm",
        length: "84mm",
        price: 28.9,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha_hnksdf.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha3_tsolzy.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha4_s1flku.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha2_abcwuu.png",
        ],
        tags: ["cunhas", "acentamento de pisos"],
        salePrice: 25.9,
        isAvailable: true,
      },
      {
        name: "Cunha Slim",
        slug: "cunha-slim",
        description:
          "A Cunha Niveladora Slim com o auxílio do Espaçador Nivelador SSLARES garante o nivelamento correto dos pisos e mantém o espaçamento conforme a medida do espaçador. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. A cunha Niveladora SSLARES é reutilizável.",
        quantity: "50 peças",
        height: "10mm",
        width: "14mm",
        length: "70mm",
        price: 5.85,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha-slim_fcr72k.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha3_tsolzy.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha2_abcwuu.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        tags: ["cunhas", "acentamento de pisos"],
        isAvailable: true,
      },
      {
        name: "Desempenadeira de Espuma",
        slug: "desempenadeira-espuma",
        description:
          "A Desempenadeira com Espuma é utilizada para o nivelamento de massas, argamassas e monocapas. Ideal para acabamento em massa fina e reboco.",
        price: 45.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192583/areia-1_jkl012.webp",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757192584/areia-2_mno345.webp",
        ],
        quantity: "Caixa com 6 unidades",
        height: "8cm",
        width: "18cm",
        length: "30cm",
        tags: ["desempenadeira", "espuma", "nivelamento", "argamassa"],
        isAvailable: true,
      },
      {
        name: "Desempenadeira Lisa",
        slug: "desempenadeira-lisa",
        description:
          "Indicada para a preparação, nivelamento e acabamento de superfícies, podendo-se utilizar variados tipos de massas, aplicação e desempeno de massa fina.",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/desempenadeira-lisa_ta4v4v.png",
        ],
        quantity: "Caixa com 6 unidades",
        height: "5cm",
        width: "18cm",
        length: "30cm",
        tags: ["desempenadeira", "espuma", "nivelamento", "argamassa"],
        isAvailable: true,
      },
      {
        name: "Desempenadeira Corrugada",
        slug: "desempenadeira-corrugada",
        description:
          "Indicada para preparar superfícies diversas, como planos acantonados, gesso de alvenaria e placas de forro. Por ter uma base corrugada, seu principal diferencial é a facilidade de remover partículas estranhas da massa.",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/desempenadeira-corrugada_xayvma.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/corrugada2_i4owai.png",
        ],
        quantity: "Caixa com 6 unidades",
        height: "5cm",
        width: "18cm",
        length: "30cm",
        tags: ["desempenadeira", "espuma", "nivelamento", "argamassa"],
        isAvailable: true,
      },
      {
        name: "Espaçador Slim Padrão",
        slug: "espacador-slim-padrao",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. Medidas disponíveis 3 mm, 2 mm, 1,5 mm e 1 mm. Trabalhamos na versão PADRÃO (material reciclado cor cinza) e PREMIUM (material virgem cristal).",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        quantity: "50 peças",
        height: "30mm",
        width: "25mm",
        length: "25mm",
        tags: ["espacador", "acentamento de pisos"],
        isAvailable: true,
      },
      {
        name: "Espaçador Slim Premium",
        slug: "espacador-slim-premium",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. Medidas disponíveis 3 mm, 2 mm, 1,5 mm e 1 mm. Trabalhamos na versão PADRÃO (material reciclado cor cinza) e PREMIUM (material virgem cristal).",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279798/espacador-slim-premium_qx681i.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        quantity: "50 peças",
        height: "30mm",
        width: "25mm",
        length: "25mm",
        tags: ["espacador", "acentamento de pisos"],
        isAvailable: true,
      },
      {
        name: "Espaçador Smart Premium",
        slug: "espacador-smart-premium",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. Medidas disponíveis 3 mm, 2 mm, 1,5 mm e 1 mm. Trabalhamos na versão PADRÃO (material reciclado cor cinza) e PREMIUM (material virgem cristal).",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279798/espacador-slim-premium_qx681i.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        quantity: "50 peças",
        height: "45mm",
        width: "30mm",
        length: "38mm",
        tags: ["espacador", "acentamento de pisos"],
        isAvailable: true,
      },
      {
        name: "Bloco de Espuma",
        slug: "bloco-espuma",
        description:
          "Os versáteis blocos de espuma SsLares são ideais para uma variedade de aplicações, desde o acabamento de reboco e a limpeza de revestimentos cerâmicos e vidros até a lavagem de automóveis e a limpeza em geral. Sua composição especial permite uma eficaz remoção de sujeira e manchas, tornando-os indispensáveis para diversas tarefas domésticas e comerciais. Experimente a praticidade e eficiência dos blocos de espuma para facilitar suas atividades diárias!",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/bloco-espuma_j8fu2u.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/blocoespuma2_xsv7qc.png",
        ],
        quantity: "Fardo com 20 unidades",
        height: "5cm",
        width: "12cm",
        length: "20cm",
        tags: ["bloco de espuma", "espuma", "limpeza"],
        isAvailable: true,
      },
      {
        name: "Ralo Linear",
        slug: "ralo-linear",
        description:
          "O Ralo Linear Oculto 6x50cm serve para Bordas de Piscinas,Quintal, Áreas Externas, Banheiros, Saunas, Decks e muito mais. Usa o próprio piso ou porcelanato como acabamento, deixando o ambiente discreto, harmônico e sofisticado.",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279801/ralo-linear_nq44zn.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279801/ralo-linear-02_cmoqrt.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279803/ralo-linear-03_idcvou.png",
        ],
        quantity: "Caixas com 20 e 10 unidades",
        height: "7cm",
        width: "6cm",
        length: "50cm",
        tags: ["ralo", "linear", "banheiro", "piscina"],
        isAvailable: true,
      },
      {
        name: "Ralo Invisível",
        slug: "ralo-invisivel",
        description:
          "O ralo Invisivel é a opção ideal para quem busca aliar funcionalidade e estética. Além de proporcionar mais segurança e favorecer a vazão da água, seu design discreto e moderno contribui para uma melhor estética do ambiente. Sua facilidade de instalação e as opções de tamanhos e cores disponíveis tornam o ralo oculto uma escolha versátil e prática. Com a capacidade de facilitar a limpeza doméstica, este produto se destaca como uma solução eficiente para banheiros, cozinhas e áreas de serviço.",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279801/ralo-invisivel-03_krvcdl.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279800/ralo-invisivel-02_piqz2j.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279800/ralo-invisivel_cxdbny.png",
        ],
        quantity: "Caixas com 20 e 10 unidades",
        height: "4.2cm",
        width: "10 e 15cm",
        length: "10 e 15cm",
        tags: ["ralo", "linear", "banheiro", "piscina"],
        isAvailable: true,
      },
      {
        name: "Plafon",
        slug: "plafon",
        description:
          "O Plafon com soquete de Porcelana E27 Branco é um dispositivo de iluminação de teto projetado para oferecer uma solução simples e funcional para a iluminação de ambientes internos. Ele é feito de PVC de alta qualidade, um material durável e resistente, na cor branca, que se adapta facilmente a diferentes estilos de decoração.Uma das características principais desse plafon é o seu soquete de porcelana E27, que é uma opção segura e confiável para a instalação de lâmpadas incandescentes, fluorescentes compactas ou LED com essa base. A porcelana é um material resistente ao calor e oferece maior segurança em comparação com soquetes de plástico ou metal, pois é menos propenso a derreter ou superaquecer.",

        price: 20.0,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279799/plafon_r63pdf.png",
        ],
        tags: ["plafon", "luz", "iluminação"],
        isAvailable: true,
      },
    ]

    // SEED DOS BANNERS
    console.log("🌱 Iniciando seed dos banners do carousel...")
    for (const banner of carouselBanners) {
      await prisma.carouselBanner.create({
        data: banner,
      })
    }

    // 🔥 SEED DOS PRODUTOS - AQUI É A NOVA PARTE!
    console.log("🛠️ Iniciando seed dos produtos...")
    for (const product of products) {
      await prisma.product.create({
        data: product,
      })
    }

    console.log("✅ Seed concluído com sucesso!")
    console.log(
      `📊 ${carouselBanners.length} banners criados no banco de dados`,
    )
    console.log(`🛠️ ${products.length} produtos criados no banco de dados`)
  } catch (error) {
    console.error("❌ Erro ao executar o seed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDataBase()

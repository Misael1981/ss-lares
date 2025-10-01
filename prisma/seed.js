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

    //  PRODUTOS
    const products = [
      // CUNHA NIVELADORA SMART
      {
        name: "Cunha Niveladora Smart",
        slug: "cunha-smart",
        description:
          "A Cunha Niveladora com o auxílio do Espaçador Nivelador SSLARES garante o nivelamento correto dos pisos e mantém o espaçamento conforme a medida do espaçador. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. A cunha Niveladora SSLARES é reutilizável.",
        type: "cunhas",
        tags: ["cunhas", "assentamento de pisos"],
        colors: [],
        brand: "SSLARES",
        price: 18.9,
        salePrice: 15.9,
        height: 20,
        width: 23,
        length: 84,
        weight: 0.05,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha_hnksdf.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha3_tsolzy.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha4_s1flku.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha2_abcwuu.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 20,
              unitLabel: "peças",
              price: 280.9,
              salePrice: 25.9,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 6.65,
            },
            {
              quantityPerPackage: 200,
              packagePerBox: 5,
              unitLabel: "peças",
              price: 280.9,
              salePrice: 25.9,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 6.395,
            },
          ],
        },
      },
      // CUNHA NIVELADORA SLIM
      {
        name: "Cunha Niveladora Slim",
        slug: "cunha-slim",
        description:
          "A Cunha Niveladora com o auxílio do Espaçador Nivelador SSLARES garante o nivelamento correto dos pisos e mantém o espaçamento conforme a medida do espaçador. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação. A cunha Niveladora SSLARES é reutilizável.",
        type: "cunhas",
        tags: ["cunhas", "assentamento de pisos"],
        colors: [],
        brand: "SSLARES",
        price: 18.9,
        height: 10,
        width: 14,
        length: 70,
        weight: 0.05,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha_hnksdf.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha3_tsolzy.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279795/cunha4_s1flku.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279794/cunha2_abcwuu.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 35,
              unitLabel: "peças",
              price: 280.9,
              salePrice: 25.9,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 8.85,
            },
          ],
        },
      },
      // ESPAÇADOR SMART 1,0MM
      {
        name: "Espaçador Smart 1,0mm",
        slug: "espacador-smart-1-0mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 45,
        width: 30,
        length: 38,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 50,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.67,
            },
            {
              quantityPerPackage: 100,
              packagePerBox: 25,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.555,
            },
            {
              quantityPerPackage: 500,
              packagePerBox: 6,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 9.144,
            },
          ],
        },
      },
      // ESPAÇADOR SMART 1,5MM
      {
        name: "Espaçador Smart 1,5 mm",
        slug: "espacador-smart-1-5mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 45,
        width: 30,
        length: 38,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 50,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.67,
            },
            {
              quantityPerPackage: 100,
              packagePerBox: 25,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.555,
            },
            {
              quantityPerPackage: 500,
              packagePerBox: 6,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 9.144,
            },
          ],
        },
      },
      // ESPAÇADOR SMART 2.0MM
      {
        name: "Espaçador Smart 2.0 mm",
        slug: "espacador-smart-2-0mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 45,
        width: 30,
        length: 38,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 50,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.67,
            },
            {
              quantityPerPackage: 100,
              packagePerBox: 25,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.555,
            },
            {
              quantityPerPackage: 500,
              packagePerBox: 6,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 9.144,
            },
          ],
        },
      },
      // ESPAÇADOR SMART 3.0MM
      {
        name: "Espaçador Smart 3.0 mm",
        slug: "espacador-smart-3-0mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 45,
        width: 30,
        length: 38,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 50,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.67,
            },
            {
              quantityPerPackage: 100,
              packagePerBox: 25,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 7.555,
            },
            {
              quantityPerPackage: 500,
              packagePerBox: 6,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 50,
              boxWidth: 45,
              boxLength: 40,
              boxWeight: 9.144,
            },
          ],
        },
      },
      // ESPAÇADOR Slim 1.0MM
      {
        name: "Espaçador Slim 1.0 mm",
        slug: "espacador-slim-1-0mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 30,
        width: 25,
        length: 25,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 60,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 5.175,
            },
          ],
        },
      },
      // ESPAÇADOR Slim 1.5MM
      {
        name: "Espaçador Slim 1.5 mm",
        slug: "espacador-slim-1-5mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 30,
        width: 25,
        length: 25,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 60,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 5.175,
            },
          ],
        },
      },
      // ESPAÇADOR Slim 2.0MM
      {
        name: "Espaçador Slim 2.0 mm",
        slug: "espacador-slim-2-0mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 30,
        width: 25,
        length: 25,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 60,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 5.175,
            },
          ],
        },
      },
      // ESPAÇADOR Slim 3.0MM
      {
        name: "Espaçador Slim 3.0 mm",
        slug: "espacador-slim-3-0mm",
        description:
          "O Espaçador Nivelador SSLARES garante espaçamento e auxilia a Cunha Niveladora Slim a nivelar os pisos corretamente. Com as duas funções simultâneas agiliza o processo de assentamento dos pisos, reduzindo em até 50% o tempo de colocação.",
        type: "espaçadores",
        tags: ["espacador", "assentamento de pisos", "nivelador de pisos"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        colors: [],
        height: 30,
        width: 25,
        length: 25,
        weight: 0.01,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279797/espacador-slim-padrao_gmvoav.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-02_vn2jz0.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279804/slim-secundaria-01_lam45d.png",
        ],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 50,
              packagePerBox: 60,
              unitLabel: "peças",
              price: 200.0,
              boxHeight: 40,
              boxWidth: 28,
              boxLength: 38,
              boxWeight: 5.175,
            },
          ],
        },
      },
      // RALO Linear 6x50
      {
        name: "Ralo Linear 6x50",
        slug: "ralo-linear",
        description:
          "O Ralo Linear Oculto 6x50cm serve para Bordas de Piscinas,Quintal, Áreas Externas, Banheiros, Saunas, Decks e muito mais. Usa o próprio piso ou porcelanato como acabamento, deixando o ambiente discreto, harmônico e sofisticado.",
        type: "ralos",
        colors: ["bege", "branco", "cinza", "marrom", "preto"],
        brand: "SSLARES",
        price: 21.0,
        salePrice: 19.9,
        height: 70,
        width: 60,
        length: 50,
        weight: 0.32,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279801/ralo-linear_nq44zn.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279801/ralo-linear-02_cmoqrt.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279803/ralo-linear-03_idcvou.png",
        ],
        tags: ["ralo", "linear", "banheiro", "piscina"],
        isAvailable: true,
        height: 7.0,
        width: 6.0,
        length: 50.0,
        tags: ["ralo", "linear", "banheiro", "piscina"],
        isAvailable: true,
        // ✅ NOVO: Variações de embalagem
        packaging: {
          create: [
            {
              quantityPerPackage: 1,
              packagePerBox: 36,
              unitLabel: "peças",
              barcodeBox: "7891234567890",
              boxHeight: 41.0,
              boxWidth: 41.0,
              boxLength: 52.0,
              boxWeight: 11.7,
              price: 20.0,
              costWithoutTaxes: 15.0,
              ipi: 0.1,
              st: 0.15,
              icms: 0.18,
            },
          ],
        },
      },
      {
        name: "Ralo Invisível 10X10",
        slug: "ralo-invisivel-10x10",
        description:
          "O ralo Invisivel é a opção ideal para quem busca aliar funcionalidade e estética. Além de proporcionar mais segurança e favorecer a vazão da água, seu design discreto e moderno contribui para uma melhor estética do ambiente. Sua facilidade de instalação e as opções de tamanhos e cores disponíveis tornam o ralo oculto uma escolha versátil e prática. Com a capacidade de facilitar a limpeza doméstica, este produto se destaca como uma solução eficiente para banheiros, cozinhas e áreas de serviço.",
        type: "ralos",
        brand: "SSLARES",
        price: 25.0,
        salePrice: 22.7,
        colors: ["branco", "cinza claro", "cinza escuro", "preto"],
        height: 420,
        width: 100,
        length: 100,
        weight: 0.15,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279801/ralo-invisivel-03_krvcdl.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279800/ralo-invisivel-02_piqz2j.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279800/ralo-invisivel_cxdbny.png",
        ],
        tags: ["ralo", "invisível", "banheiro", "cozinha"],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 1,
              packagePerBox: 150,
              unitLabel: "peças",
              barcodeBox: "7891234567894",
              boxHeight: 51.0,
              boxWidth: 38.0,
              boxLength: 55.0,
              boxWeight: 15.23,
              price: 20.0,
              costWithoutTaxes: 15.0,
              ipi: 0.1,
              st: 0.15,
              icms: 0.18,
            },
          ],
        },
      },
      {
        name: "Ralo Invisível 15x15",
        slug: "ralo-invisivel-15x15",
        description:
          "O ralo Invisivel é a opção ideal para quem busca aliar funcionalidade e estética. Além de proporcionar mais segurança e favorecer a vazão da água, seu design discreto e moderno contribui para uma melhor estética do ambiente. Sua facilidade de instalação e as opções de tamanhos e cores disponíveis tornam o ralo oculto uma escolha versátil e prática. Com a capacidade de facilitar a limpeza doméstica, este produto se destaca como uma solução eficiente para banheiros, cozinhas e áreas de serviço.",
        type: "ralos",
        brand: "SSLARES",
        price: 25.0,
        salePrice: 22.7,
        colors: ["branco", "cinza claro", "cinza escuro", "preto"],
        height: 420,
        width: 150,
        length: 150,
        weight: 0.25,
        imageUrl: [
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279801/ralo-invisivel-03_krvcdl.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279800/ralo-invisivel-02_piqz2j.png",
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1757279800/ralo-invisivel_cxdbny.png",
        ],
        tags: ["ralo", "invisível", "banheiro", "cozinha"],
        isAvailable: true,
        packaging: {
          create: [
            {
              quantityPerPackage: 1,
              packagePerBox: 150,
              unitLabel: "peças",
              barcodeBox: "7891234567895",
              boxHeight: 51.0,
              boxWidth: 38.0,
              boxLength: 55.0,
              boxWeight: 18.5,
              price: 25.0,
              costWithoutTaxes: 18.0,
              ipi: 0.1,
              st: 0.15,
              icms: 0.18,
            },
          ],
        },
      },
    ]

    //  CATÁLOGOS
    const catalogs = [
      {
        title: "Catálogo SSLares 2025",
        description: "Catálogo completo de produtos",
        fileUrl:
          "https://res.cloudinary.com/dsxpenevq/image/upload/v1758306852/catalago-sslares_nt0fqq.pdf",
        fileName: "catalogo-sslares-2025.pdf",
        isActive: true,
      },
    ]

    // SEED DOS BANNERS
    for (const banner of carouselBanners) {
      await prisma.carouselBanner.create({
        data: banner,
      })
    }

    //  SEED DOS PRODUTOS - VERSÃO SEGURA!
    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      })
    }

    // Seed dos CATÁLOGOS
    for (const catalog of catalogs) {
      await prisma.catalog.create({ data: catalog })
    }

    //  SEED DA EMPRESA
    await prisma.companyInfo.upsert({
      where: { id: 1 }, // ✅ Mudar para ID
      update: {
        name: "SS Lares",
        email: "sslaresmg@gmail.com",
        social: {
          instagram: "https://www.instagram.com/sslaresmg1/",
        },
      },
      create: {
        name: "SS Lares",
        email: "sslaresmg@gmail.com",
        social: {
          instagram: "https://www.instagram.com/sslaresmg1/",
        },
        address: {
          create: {
            street: "Rua José Ribeiro Coutinho",
            number: "499",
            neighborhood: "Bairro Primavera",
            city: "Congonhal",
            state: "MG",
            zipCode: null,
          },
        },
        phones: {
          create: [
            {
              label: "FAQ/Financeiro",
              contactName: "Tailyner",
              number: "+553591972424",
            },
            {
              label: "Vendas",
              contactName: "Ivan",
              number: "+553591528076",
            },
          ],
        },
      },
    })

    console.log("✅ Seed realizado com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao executar o seed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seedDataBase()

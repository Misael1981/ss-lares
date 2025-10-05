import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'
import { revalidateTag } from 'next/cache'

// ✅ BUSCAR DADOS DA EMPRESA
export const getCompanyInfo = unstable_cache(
  async () => {
    try {
      const company = await prisma.companyInfo.findFirst({
        include: {
          phones: true,
          address: true,
        },
      })
      return company
    } catch (error) {
      console.error('Erro ao buscar dados da empresa:', error)
      return null
    }
  },
  ['company-info'],
  {
    revalidate: 300, // 5 minutos
    tags: ['company'],
  }
)

// ✅ ATUALIZAR DADOS DA EMPRESA
export async function updateCompanyInfo(data) {
  try {
    const { phones, address, ...companyData } = data

    const company = await prisma.companyInfo.upsert({
      where: { id: 1 },
      update: companyData,
      create: companyData,
      include: {
        phones: true,
        address: true,
      },
    })

    // Atualizar telefones se fornecidos
    if (phones && phones.length > 0) {
      // Deletar telefones existentes
      await prisma.phone.deleteMany({
        where: { companyId: company.id },
      })

      // Criar novos telefones
      await prisma.phone.createMany({
        data: phones.map(phone => ({
          ...phone,
          companyId: company.id,
        })),
      })
    }

    // Atualizar endereço se fornecido
    if (address) {
      await prisma.address.upsert({
        where: { companyId: company.id },
        update: address,
        create: {
          ...address,
          companyId: company.id,
        },
      })
    }

    return { success: true, company }
  } catch (error) {
    console.error('Erro ao atualizar dados da empresa:', error)
    return { success: false, error: error.message }
  }
}

// ✅ BUSCAR CATÁLOGOS
export const getCatalogs = unstable_cache(
  async () => {
    try {
      const catalogs = await prisma.catalog.findMany({
        orderBy: { createdAt: 'desc' },
      })
      return catalogs
    } catch (error) {
      console.error('Erro ao buscar catálogos:', error)
      return []
    }
  },
  ['catalogs'],
  {
    revalidate: 300, // 5 minutos
    tags: ['catalogs'],
  }
)

// ✅ CRIAR CATÁLOGO
export async function createCatalog(data) {
  try {
    const catalog = await prisma.catalog.create({
      data,
    })
    return { success: true, catalog }
  } catch (error) {
    console.error('Erro ao criar catálogo:', error)
    return { success: false, error: error.message }
  }
}

// ✅ ATUALIZAR CATÁLOGO
export async function updateCatalog(id, data) {
  try {
    const catalog = await prisma.catalog.update({
      where: { id },
      data,
    })
    return { success: true, catalog }
  } catch (error) {
    console.error('Erro ao atualizar catálogo:', error)
    return { success: false, error: error.message }
  }
}

// ✅ DELETAR CATÁLOGO
export async function deleteCatalog(id) {
  try {
    await prisma.catalog.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar catálogo:', error)
    return { success: false, error: error.message }
  }
}

// ✅ REVALIDAR CACHE
export function revalidateCompany() {
  revalidateTag('company')
  revalidateTag('catalogs')
}
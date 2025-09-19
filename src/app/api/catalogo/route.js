import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const catalog = await prisma.catalog.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })

    if (!catalog) {
      return Response.json({ error: 'Catálogo não encontrado' }, { status: 404 })
    }

    return Response.json(catalog)
  } catch (error) {
    console.error('Erro ao buscar catálogo:', error)
    return Response.json({ error: 'Erro interno' }, { status: 500 })
  }
}
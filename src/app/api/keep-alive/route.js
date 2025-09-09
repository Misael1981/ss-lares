import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Ping simples no banco
    await prisma.$queryRaw`SELECT 1`
    return Response.json({ status: 'ok' })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
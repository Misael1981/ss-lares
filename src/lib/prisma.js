import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient()

// ✅ ADICIONE ESTA FUNÇÃO DE RETRY
export async function prismaWithRetry(operation, maxRetries = 3) {
  let lastError
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      // Se é erro de conexão, tenta novamente
      if (error.code === 'P1001' || error.message.includes("Can't reach database")) {
        console.log(`🔄 Tentativa ${i + 1}/${maxRetries} falhou, tentando novamente...`)
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1))) // Backoff exponencial
        continue
      }
      
      // Se não é erro de conexão, falha imediatamente
      throw error
    }
  }
  
  throw lastError
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

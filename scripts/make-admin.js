const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function makeAdmin() {
  try {
    // Buscar todos os usuários
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isAdmin: true
      }
    })

    console.log("👥 Usuários encontrados:")
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'Sem nome'} - ${user.email || user.phone} - Admin: ${user.isAdmin}`)
    })

    if (users.length === 0) {
      console.log("❌ Nenhum usuário encontrado!")
      return
    }

    // Tornar o primeiro usuário admin (ou você pode escolher)
    const userToUpdate = users[0] // Pega o primeiro usuário
    
    await prisma.user.update({
      where: { id: userToUpdate.id },
      data: { isAdmin: true }
    })

    console.log(`✅ Usuário ${userToUpdate.name || userToUpdate.email || userToUpdate.phone} agora é ADMIN!`)

  } catch (error) {
    console.error("❌ Erro:", error)
  } finally {
    await prisma.$disconnect()
  }
}

makeAdmin()
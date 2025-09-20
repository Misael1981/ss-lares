import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // 🔥 LOGIN COM CELULAR
    CredentialsProvider({
      id: "phone",
      name: "Phone",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code: { label: "Code", type: "text" }
      },
      async authorize(credentials) {
        try {
          // Limpar formatação do telefone
          const cleanPhone = credentials.phone.replace(/\D/g, '')
          const formattedPhone = `+55${cleanPhone}`
          
          // Verificar código via API interna
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: formattedPhone,
              code: credentials.code
            })
          })
          
          const result = await response.json()
          
          if (!result.valid) {
            return null
          }
          
          // Buscar ou criar usuário
          let user = await prisma.user.findUnique({
            where: { phone: formattedPhone }
          })
          
          if (!user) {
            user = await prisma.user.create({
              data: {
                phone: formattedPhone,
                phoneVerified: new Date(),
                name: `Usuário ${cleanPhone.slice(-4)}` // Nome temporário
              }
            })
          } else {
            // Atualizar verificação
            user = await prisma.user.update({
              where: { id: user.id },
              data: { phoneVerified: new Date() }
            })
          }
          
          return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            image: user.image
          }
          
        } catch (error) {
          console.error("Erro na autorização:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.id = user?.id || token?.sub
        session.user.isAdmin = user?.isAdmin || token?.isAdmin
        session.user.phone = user?.phone || token?.phone
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.isAdmin = user.isAdmin
        token.phone = user.phone
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST }

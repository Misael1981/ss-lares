import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // 🎯 Incluir isAdmin na session
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id
        session.user.isAdmin = user.isAdmin
      }
      return session
    },
    // 🎯 Incluir isAdmin no JWT
    async jwt({ user, token }) {
      if (user) {
        token.isAdmin = user.isAdmin
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin', // 🎯 Página customizada (opcional)
  },
})

export { handler as GET, handler as POST }

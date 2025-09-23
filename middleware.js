import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // 🔒 PROTEÇÃO DO DASHBOARD
    if (pathname.startsWith("/dashboard")) {
      // Se não for admin, redireciona para home
      if (!token?.isAdmin) {
        console.log("❌ Acesso negado ao dashboard:", token?.email || "usuário não logado")
        return NextResponse.redirect(new URL("/", req.url))
      }
      
      console.log("✅ Acesso liberado ao dashboard:", token?.email)
    }

    // 🎯 Continua normalmente se passou nas verificações
    return NextResponse.next()
  },
  {
    callbacks: {
      // Permite que o middleware rode mesmo sem estar logado
      // (para poder redirecionar usuários não logados)
      authorized: () => true
    },
  }
)

// 🎯 CONFIGURAÇÃO: Em quais rotas o middleware deve rodar
export const config = {
  matcher: [
    // Protege todas as rotas do dashboard
    "/dashboard/:path*",
    // Adicione outras rotas que precisam de proteção aqui
    // "/admin/:path*",
    // "/api/admin/:path*"
  ]
}
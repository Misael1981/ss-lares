import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Proteção do dashboard
    if (pathname.startsWith("/dashboard")) {
      if (!token?.isAdmin) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // precisa ter token pra acessar
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*"],
}

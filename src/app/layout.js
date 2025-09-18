import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-context"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Configura a fonte Montserrat para os t\u00edtulos
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
})

// Configura a fonte Poppins para o corpo do texto
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "SSLares - Qualidade que Constrói Confiança",
  description: "Descubra produtos de alta qualidade da SSLares.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

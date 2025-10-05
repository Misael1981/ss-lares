import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"
import AllProviders from "./providers"
import ConditionalWrapper from "./ConditionalWrapper"

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
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased`}
      >
        <AllProviders>
          <ConditionalWrapper>{children}</ConditionalWrapper>
        </AllProviders>
      </body>
    </html>
  )
}

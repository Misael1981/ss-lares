import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"

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
  title: "SSLares - Qualidade que Constr\u00f3i Confian\u00e7a",
  description:
    "Descubra a cole\u00e7\u00e3o de m\u00f3veis de alta qualidade da SSLares.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  )
}

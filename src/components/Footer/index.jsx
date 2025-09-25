import prisma from "@/lib/prisma"
import LogoImage from "../Header/components/LogoImage"
import { Card, CardContent } from "../ui/card"
import Address from "./components/Adress"
import Contact from "./components/contact"
import InstitutionalLinks from "./components/InstitutionalLinks"

const Footer = async () => {
  const companyData = await prisma.companyInfo.findFirst({
    include: {
      phones: true,
      address: true,
    },
  })
  return (
    <footer className="mt-4">
      <Card>
        <CardContent className="p-4">
          <div className="mb-6 flex max-w-[100%] flex-wrap justify-center gap-6">
            <div className="w-full p-6 lg:w-[300px] lg:p-0">
              <LogoImage size="h-14" />
              <p className="my-2 text-sm">Qualidade que constrói o futuro</p>
              <div>
                <InstitutionalLinks />
              </div>
            </div>
            <Contact companyData={companyData} />
            <Address companyData={companyData} />
          </div>
          <p className="text-center text-sm">SSLARES &copy; 2025</p>
          <p className="text-center text-sm">Desenvolvido por Misael Borges</p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer

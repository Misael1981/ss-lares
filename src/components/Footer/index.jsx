import prisma from "@/lib/prisma"
import LogoImage from "../Header/components/LogoImage"
import { Card, CardContent } from "../ui/card"
import Address from "./components/Adress"
import Contact from "./components/contact"

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
          <div className="flex flex-wrap items-center justify-around">
            <div className="w-[400px] p-6">
              <LogoImage size="h-14" />
              <h2 className="mb-3 mt-2 text-lg font-semibold">
                Qualidade que constrói o futuro
              </h2>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                totam consequuntur provident tempora perspiciatis quia deleniti
                asperiores molestias repellendus laboriosam.
              </p>
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

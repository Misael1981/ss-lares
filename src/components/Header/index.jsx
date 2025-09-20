import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import MobileMenuTrigger from "./components/MobileMenuTrigger"
import DesktopMenuTrigger from "./components/DesktopMenuTrigger"
import LogoImage from "./components/LogoImage"
import NavMenu from "./components/NavMenu"

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between gap-6 p-4">
          <LogoImage />
          
          {/* NAVEGAÇÃO PRINCIPAL - DESKTOP */}
          <div className="hidden lg:block">
            <NavMenu />
          </div>
          
          {/* MENU TRIGGERS */}
          <div className="flex items-center gap-2">
            <DesktopMenuTrigger />
            <MobileMenuTrigger />
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header

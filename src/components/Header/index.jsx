import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import MobileMenuTrigger from "./components/MobileMenuTrigger"
import DesktopNav from "./components/DesktopNav"
import LogoImage from "./components/LogoImage"

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between gap-6 p-4">
          <LogoImage />
          <MobileMenuTrigger />
          <DesktopNav />
        </CardContent>
      </Card>
    </header>
  )
}

export default Header

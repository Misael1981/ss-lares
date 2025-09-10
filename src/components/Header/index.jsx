import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import MobileMenuTrigger from "./components/MobileMenuTrigger"
import DesktopNav from "./components/DesktopNav"

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between gap-6 p-4">
          <Image src="/logo.svg" alt="SSLares Logo" width={120} height={18} />
          <MobileMenuTrigger />
          <DesktopNav />
        </CardContent>
      </Card>
    </header>
  )
}

export default Header

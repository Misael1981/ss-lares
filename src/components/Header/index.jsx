import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import MobileMenuTrigger from "./components/MobileMenuTrigger"

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <Image src="/logo.svg" alt="SSLares Logo" width={120} height={18} />

          <MobileMenuTrigger />
        </CardContent>
      </Card>
    </header>
  )
}

export default Header

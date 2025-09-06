import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between bg-gray-900 p-4">
          <Image src="/logo.svg" alt="SSLares Logo" width={120} height={18} />
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header

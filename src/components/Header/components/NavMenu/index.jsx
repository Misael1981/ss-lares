import { Button } from "@/components/ui/button"
import { Calculator, FileUser, Handshake, House, Store } from "lucide-react"
import Link from "next/link"

const NavMenu = () => {
  return (
    <ul className="space-y-4 lg:flex lg:items-center lg:gap-2 lg:space-y-0">
      <li>
        <Button variant="ghost" className="text-xl" asChild>
          <Link href="/">
            <House style={{ width: "24px", height: "24px" }} />
            Home
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl" asChild>
          <Link href="/produtos">
            <Store style={{ width: "24px", height: "24px" }} />
            Produtos
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl" asChild>
          <Link href="/sobre-nos">
            <FileUser style={{ width: "24px", height: "24px" }} />
            Sobre nós
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl" asChild>
          <Link href="/seja-parceiro">
            <Handshake style={{ width: "24px", height: "24px" }} />
            Seja um parceiro
          </Link>
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl" asChild>
          <Link href="/calculadora">
            <Calculator style={{ width: "24px", height: "24px" }} />
            Calculadora
          </Link>
        </Button>
      </li>
    </ul>
  )
}

export default NavMenu

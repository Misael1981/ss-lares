import { Button } from "@/components/ui/button"
import { Calculator, FileUser, Handshake, House, Store } from "lucide-react"

const NavMenu = () => {
  return (
    <ul className="space-y-4 lg:flex lg:items-center lg:gap-2 lg:space-y-0">
      <li>
        <Button variant="ghost" className="text-xl">
          <House style={{ width: "24px", height: "24px" }} />
          Home
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl">
          <Store style={{ width: "24px", height: "24px" }} />
          Produtos
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl">
          <FileUser style={{ width: "24px", height: "24px" }} />
          Sobre nós
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl">
          <Handshake style={{ width: "24px", height: "24px" }} />
          Seja um parceiro
        </Button>
      </li>
      <li>
        <Button variant="ghost" className="text-xl">
          <Calculator style={{ width: "24px", height: "24px" }} />
          Calculadora
        </Button>
      </li>
    </ul>
  )
}

export default NavMenu

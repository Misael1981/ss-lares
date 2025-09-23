import CalculatorPopup from "@/components/CalculatorPopup"
import DashboardButton from "../DashboardButton"
import { Button } from "@/components/ui/button"
import { FileUser, Handshake, House, Store } from "lucide-react"
import Link from "next/link"

const itemLista = [
  {
    name: "Home",
    link: "/",
    icon: <House style={{ width: "24px", height: "24px" }} />,
  },
  {
    name: "Produtos",
    link: "/produtos",
    icon: <Store style={{ width: "24px", height: "24px" }} />,
  },
  {
    name: "Sobre nós",
    link: "/sobre-nos",
    icon: <FileUser style={{ width: "24px", height: "24px" }} />,
  },
  {
    name: "Seja um parceiro",
    link: "/seja-parceiro",
    icon: <Handshake style={{ width: "24px", height: "24px" }} />,
  },
]

const NavMenu = () => {
  return (
    <ul className="space-y-4 lg:flex lg:items-center lg:gap-2 lg:space-y-0">
      {itemLista.map((item) => (
        <li key={item.name}>
          <Button variant="ghost" className="text-base" asChild>
            <Link href={item.link}>
              {item.icon}
              {item.name}
            </Link>
          </Button>
        </li>
      ))}
      
      {/* 🎯 Componente separado para Dashboard */}
      <DashboardButton />
      
      <li>
        <CalculatorPopup />
      </li>
    </ul>
  )
}

export default NavMenu

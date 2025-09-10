import { Button } from "@/components/ui/button"
import { SheetContent } from "@/components/ui/sheet"
import { LogOutIcon } from "lucide-react"
import Image from "next/image"
import ThemeButton from "../ThemeButton"
import NavMenu from "../NavMenu"
import ButtonLogin from "../ButtonLogin"

const SidebarMenu = () => {
  return (
    <SheetContent className="flex flex-col justify-between">
      <ThemeButton />
      <div className="mt-4 flex flex-col items-center">
        <Image src="/logo.svg" alt="SSLares Logo" width={100} height={15} />
      </div>
      <div className="mt-8 border-b border-solid pb-6">
        <ButtonLogin />
      </div>
      <nav className="border-b border-solid pb-6">
        <NavMenu />
      </nav>
      <div className="border-b border-solid pb-6">
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Image
              src="\image\whatsapp-svgrepo-com.svg"
              alt="Ícone do Whatsapp"
              width={32}
              height={32}
            />
          </li>
          <li>
            <Image
              src="/image/instagram-1-svgrepo-com.svg"
              alt="Ícone do Instagram"
              width={36}
              height={36}
            />
          </li>
        </ul>
      </div>
      <div>
        <Button className="w-full">
          <LogOutIcon style={{ width: "24px", height: "24px" }} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarMenu

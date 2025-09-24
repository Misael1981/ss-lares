"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { SheetContent } from "@/components/ui/sheet"
import { LogOutIcon } from "lucide-react"
import Image from "next/image"
import ThemeButton from "../ThemeButton"
import NavMenu from "../NavMenu"
import ButtonLogin from "../ButtonLogin"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import LogoImage from "../LogoImage"

const SidebarMenu = () => {
  const { data } = useSession()

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    })
  }
  return (
    <SheetContent className="flex flex-col justify-between">
      <ThemeButton />
      <div className="mt-4 flex flex-col items-center">
        <LogoImage />
      </div>
      <div className="mt-8 border-b border-solid pb-6">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image} />
            </Avatar>
            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="truncate text-xl font-medium">
                {data?.user?.name}
              </h3>
              <p className="truncate text-sm leading-tight text-gray-400">
                {data?.user?.email}
              </p>
            </div>
          </div>
        ) : (
          <ButtonLogin />
        )}
      </div>
      <nav className="border-b border-solid pb-6">
        <NavMenu />
      </nav>
      <div className="border-b border-solid pb-6">
        <ul className="flex items-center justify-center gap-4">
          <li>
            <a
              href="https://wa.me/5535991972424"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/image/whatsapp-svgrepo-com.svg"
                alt="Ícone do Whatsapp"
                width={32}
                height={32}
                className="cursor-pointer transition-transform hover:scale-110"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/sslaresmg1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/image/instagram-1-svgrepo-com.svg"
                alt="Ícone do Instagram"
                width={36}
                height={36}
                className="cursor-pointer transition-transform hover:scale-110"
              />
            </a>
          </li>
        </ul>
      </div>
      <div>
        {data?.user && (
          <Button className="w-full" onClick={handleLogout}>
            <LogOutIcon style={{ width: "24px", height: "24px" }} />
            Sair da conta
          </Button>
        )}
      </div>
    </SheetContent>
  )
}

export default SidebarMenu

"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { SheetContent } from "@/components/ui/sheet"
import { LogOutIcon, User, Settings, ShoppingCart } from "lucide-react"
import ThemeButton from "../ThemeButton"
import ButtonLogin from "../ButtonLogin"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const DesktopSidebar = () => {
  const { data } = useSession()

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    })
  }

  return (
    <SheetContent side="right" className="w-80">
      <div className="flex flex-col gap-6">
        
        {/* PERFIL DO USUÁRIO */}
        <div className="flex flex-col gap-4">
          {data?.user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={data?.user?.image} />
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium">{data?.user?.name}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  {data?.user?.email}
                </p>
              </div>
            </div>
          ) : (
            <ButtonLogin />
          )}
        </div>

        <Separator />

        {/* CONFIGURAÇÕES */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Configurações
          </h4>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Tema</span>
            <ThemeButton />
          </div>

          {data?.user && (
            <>
              <Button variant="ghost" className="justify-start" size="sm">
                <User className="mr-2 h-4 w-4" />
                Meu Perfil
              </Button>
              
              <Button variant="ghost" className="justify-start" size="sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Meus Pedidos
              </Button>
              
              <Button variant="ghost" className="justify-start" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </>
          )}
        </div>

        {data?.user && (
          <>
            <Separator />
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Sair da conta
            </Button>
          </>
        )}
      </div>
    </SheetContent>
  )
}

export default DesktopSidebar
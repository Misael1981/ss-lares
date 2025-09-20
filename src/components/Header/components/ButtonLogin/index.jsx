"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { UserRoundIcon } from "lucide-react"

const ButtonLogin = () => {
  const handleLoginWithGoogleClick = async () => {
    // ✨ AQUI É A MÁGICA! callbackUrl define onde vai após login
    await signIn("google", { 
      callbackUrl: window.location.href // Fica na mesma página!
    })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#8162ff] text-white hover:bg-[#6d4edb]">
            <UserRoundIcon />
            Login
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Faça seu login</DialogTitle>
            <DialogDescription>
              Se você não tem uma conta, faça seu cadastro
            </DialogDescription>
          </DialogHeader>

          <Button 
            onClick={handleLoginWithGoogleClick}
            className="w-full bg-[#4285f4] hover:bg-[#357ae8] text-white"
          >
            Login com Google
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ButtonLogin

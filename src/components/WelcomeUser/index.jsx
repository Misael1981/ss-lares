"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "../ui/avatar"

const WelcomeUser = () => {
  const { data } = useSession()
  return (
    <div className="boxed p-5">
      {data?.user ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={data?.user?.image} />
          </Avatar>
          <h3 className="text-xl">
            Olá, <strong>{data?.user?.name}</strong>
          </h3>
        </div>
      ) : (
        <h3 className="text-xl">
          Ola, <strong>faça seu login</strong>
        </h3>
      )}

      <p className="text-gray-400">Sábado, 06 de Setembro de 2025</p>
    </div>
  )
}

export default WelcomeUser

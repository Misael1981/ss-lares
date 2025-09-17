"use client"

import { useTheme } from "@/lib/theme-context"
import Image from "next/image"

const LogoImage = () => {
  const { theme } = useTheme()
  return (
    <Image
      src={theme === "dark" ? "/logo.svg" : "/logo-dark.svg"}
      alt="SSLares Logo"
      width={90}
      height={12}
    />
  )
}

export default LogoImage

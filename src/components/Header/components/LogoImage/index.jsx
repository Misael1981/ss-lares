"use client"

import { useTheme } from "@/lib/theme-context"
import Image from "next/image"

const LogoImage = ({ width = 90, height = 12 }) => {
  return (
    <div className="logo-container">
      <Image
        src="/logo.svg"
        alt="SSLares Logo"
        width={width}
        height={height}
        className="logo-dark hidden dark:block"
      />
      <Image
        src="/logo-dark.svg"
        alt="SSLares Logo"
        width={width}
        height={height}
        className="logo-light block dark:hidden"
      />
    </div>
  )
}

export default LogoImage

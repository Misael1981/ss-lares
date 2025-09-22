import Image from "next/image"

const LogoImage = ({ size = "h-10", className = "" }) => {
  return (
    <div
      className={`logo-container flex w-auto items-center ${size} ${className}`}
    >
      <Image
        src="/logo.svg"
        alt="SSLares Logo"
        width={0}
        height={0}
        sizes="100vw"
        className="logo-dark hidden h-full w-auto object-contain dark:block"
        priority
      />
      <Image
        src="/logo-dark.svg"
        alt="SSLares Logo"
        width={0}
        height={0}
        sizes="100vw"
        className="logo-light block h-full w-auto object-contain dark:hidden"
        priority
      />
    </div>
  )
}

export default LogoImage

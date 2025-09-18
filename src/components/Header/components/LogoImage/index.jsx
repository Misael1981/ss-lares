import Image from "next/image"

const LogoImage = () => {
  return (
    <div className="logo-container flex h-10 w-auto items-center">
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

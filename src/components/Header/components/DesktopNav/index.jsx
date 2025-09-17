import ButtonLogin from "../ButtonLogin"
import NavMenu from "../NavMenu"
import ThemeButton from "../ThemeButton"

const DesktopNav = () => {
  return (
    <div className="hidden justify-between lg:flex">
      <NavMenu />
      <div className="flex items-center gap-4">
        <ButtonLogin />
        <ThemeButton />
      </div>
    </div>
  )
}

export default DesktopNav

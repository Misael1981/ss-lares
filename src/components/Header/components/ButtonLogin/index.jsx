const { Button } = require("@/components/ui/button")
const { UserRoundIcon } = require("lucide-react")

const ButtonLogin = () => {
  return (
    <>
      <Button className="bg-[#8162ff] text-white hover:bg-[#6d4edb]">
        <UserRoundIcon />
        Login
      </Button>
    </>
  )
}

export default ButtonLogin

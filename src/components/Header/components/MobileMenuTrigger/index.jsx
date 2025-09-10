import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import SidebarMenu from "../SidebarMenu"

const MobileMenuTrigger = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SidebarMenu />
      </Sheet>
    </div>
  )
}

export default MobileMenuTrigger

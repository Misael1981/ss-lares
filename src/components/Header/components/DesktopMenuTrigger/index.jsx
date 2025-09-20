"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, MoreHorizontal } from "lucide-react"
import DesktopSidebar from "../DesktopSidebar"

const DesktopMenuTrigger = () => {
  return (
    <div className="hidden lg:block">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MoreHorizontal />
          </Button>
        </SheetTrigger>
        <DesktopSidebar />
      </Sheet>
    </div>
  )
}

export default DesktopMenuTrigger
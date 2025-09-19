import { Calculator } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"

const CalculatorPopup = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mr-4 bg-orange-800 hover:bg-orange-700">
          <Calculator style={{ width: "24px", height: "24px" }} />
          Calculadora
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CalculatorPopup

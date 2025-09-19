import { Calculator } from "lucide-react"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import CalculatorContent from "./components/CalculatorContent"

const CalculatorPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-4 bg-orange-800 hover:bg-orange-500">
          <Calculator style={{ width: "24px", height: "24px" }} />
          Calculadora
        </Button>
      </DialogTrigger>
      <CalculatorContent />
    </Dialog>
  )
}

export default CalculatorPopup

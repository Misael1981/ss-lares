import { Calculator } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const CalculatorPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-4 bg-orange-800 hover:bg-orange-500">
          <Calculator style={{ width: "24px", height: "24px" }} />
          Calculadora
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader className="text-[#cb0735]">
          <DialogTitle className="">Calculadora de espaçadores</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 rounded-md">
          <div className="mb-2 rounded-md border border-solid p-2">
            <h4 className="text-center text-lg font-bold">
              Comprimento X (cm)
            </h4>
            <Input className="w-full" />
            <h4 className="text-center text-lg font-bold">
              Quantidade recomendada:
            </h4>
            <div className="flex min-h-[40px] items-center justify-center rounded-md border">
              <p>100 espaçadores</p>
            </div>
          </div>
          <div className="mb-2 rounded-md border border-solid p-2">
            <h4 className="text-center text-lg font-bold">
              Comprimento Y (cm)
            </h4>
            <Input className="w-full" />
            <h4 className="text-center text-lg font-bold">Quantidade Total:</h4>
            <div className="flex min-h-[40px] items-center justify-center rounded-md border">
              <p>100 espaçadores</p>
            </div>
          </div>
          <div className="mb-2 rounded-md border border-solid p-2">
            <h4 className="text-center text-lg font-bold">
              Comprimento Y (cm)
            </h4>
            <Input className="w-full" />
            <h4 className="text-center text-lg font-bold">Quantidade Total:</h4>
            <div className="flex min-h-[40px] items-center justify-center rounded-md border">
              <p>100 espaçadores</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalculatorPopup

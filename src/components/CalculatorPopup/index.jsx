"use client"

import { useState } from "react"
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
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [areaTotal, setAreaTotal] = useState("")
  const [resultado, setResultado] = useState("")

  const calcular = () => {
    if (!x || !y || !areaTotal) {
      setResultado(null)
      return
    }

    // área da peça em m²
    const areaPeca = (Number(x) / 100) * (Number(y) / 100)

    // peças por m²
    const pecasPorM2 = 1 / areaPeca

    // fator de espaçadores (regra básica: < 30cm => 4, >= 30cm => 8)
    const fator = Number(x) < 30 || Number(y) < 30 ? 4 : 8

    // espaçadores por m²
    const espPorM2 = pecasPorM2 * fator

    // quantidade total
    const total = espPorM2 * Number(areaTotal)

    setResultado(Math.ceil(total)) // arredonda pra cima
  }

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
          <DialogTitle>Calculadora de espaçadores</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 rounded-md">
          {/* X */}
          <div className="mb-2 rounded-md border border-solid p-2">
            <h4 className="mb-2 text-lg font-bold">Comprimento X (cm)</h4>
            <Input
              type="number"
              value={x}
              onChange={(e) => setX(Number(e.target.value) || "")}
            />
          </div>

          {/* Y */}
          <div className="mb-2 rounded-md border border-solid p-2">
            <h4 className="mb-2 text-lg font-bold">Largura Y (cm)</h4>
            <Input
              type="number"
              value={y}
              onChange={(e) => setY(Number(e.target.value) || "")}
            />
          </div>

          {/* Área total */}
          <div className="mb-2 rounded-md border border-solid p-2">
            <h4 className="mb-2 text-lg font-bold">Área da obra (m²)</h4>
            <Input
              type="number"
              value={areaTotal}
              onChange={(e) => setAreaTotal(Number(e.target.value) || "")}
            />
          </div>

          {/* Botão calcular */}
          <Button
            className="bg-orange-700 hover:bg-orange-500"
            onClick={calcular}
          >
            Calcular
          </Button>

          {/* Resultado */}
          <div className="mt-2 rounded-md border p-3 text-center text-lg font-bold">
            {resultado !== null ? (
              <p>{resultado} espaçadores necessários</p>
            ) : (
              <p>Preencha os campos para calcular</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalculatorPopup

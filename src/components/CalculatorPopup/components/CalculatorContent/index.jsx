"use client"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import CalculatorCard from "../CalculatorCard"
const CalculatorContent = () => {
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [areaTotal, setAreaTotal] = useState("")
  const [resultado, setResultado] = useState("")

  const calcular = () => {
    // Validação mais específica
    if (!x || !y || !areaTotal || x <= 0 || y <= 0 || areaTotal <= 0) {
      setResultado("Por favor, insira valores válidos maiores que zero")
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

    setX("")
    setY("")
    setAreaTotal("")
  }
  return (
    <DialogContent className="w-[90%]">
      <DialogHeader className="text-[#cb0735]">
        <DialogTitle>Calculadora de espaçadores</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-2 rounded-md">
        <CalculatorCard
          title="Comprimento X (cm)"
          value={x}
          onChange={(e) => setX(Number(e.target.value) || " ")}
        />
        <CalculatorCard
          title="Largura Y (cm)"
          value={y}
          onChange={(e) => setY(Number(e.target.value) || "")}
        />
        <CalculatorCard
          title="Área da obra (m²)"
          value={areaTotal}
          onChange={(e) => setAreaTotal(Number(e.target.value) || "")}
        />

        <Button onClick={calcular}>Calcular</Button>

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
  )
}

export default CalculatorContent

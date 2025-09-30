"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Truck, MapPin, Clock, DollarSign } from "lucide-react"

const FreteCard = ({ produto, selectedPackaging }) => {
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)
  const [freteOptions, setFreteOptions] = useState([])
  const [error, setError] = useState("")

  const calcularFrete = async () => {
    if (!cep || cep.length !== 8) {
      setError("CEP deve ter 8 dígitos")
      return
    }

    setLoading(true)
    setError("")

    try {
      // 🎯 PREPARAR DADOS PADRONIZADOS
      const cepFormatted = cep.replace(/\D/g, "") // Remove tudo que não é número

      // Dados do produto padronizados para todas as APIs
      const produtoData = {
        ...produto,
        preco: selectedPackaging?.salePrice || selectedPackaging.price,
        peso: selectedPackaging?.boxWeight,
        altura: selectedPackaging?.boxHeight,
        largura: selectedPackaging?.boxWidth,
        comprimento: selectedPackaging?.boxLength,
      }

      const requests = [
        // Frenet (Correios)
        fetch(`/api/frete/calcular`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cepDestino: cepFormatted,
            peso: produtoData.peso,
            altura: produtoData.altura,
            largura: produtoData.largura,
            comprimento: produtoData.comprimento,
            valorDeclarado: produtoData.preco,
          }),
        }),

        // Braspress
        fetch(`/api/frete/braspress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cep: cepFormatted,
            produto: produtoData,
          }),
        }),

        // Paulineris
        fetch(`/api/frete/paulineris`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cep: cepFormatted,
            produto: produtoData,
          }),
        }),
      ]

      // 🚀 REQUISIÇÕES SIMULTÂNEAS
      const results = await Promise.allSettled(requests)
      const options = []

      // 📦 PROCESSAR FRENET (Correios)
      if (results[0].status === "fulfilled") {
        try {
          const response = results[0].value
          if (response.ok) {
            const frenetData = await response.json()
            if (frenetData.opcoes && frenetData.opcoes.length > 0) {
              options.push(
                ...frenetData.opcoes.map((opt) => ({
                  transportadora: opt.transportadora || "Correios",
                  valor: opt.valor,
                  prazo: opt.prazo,
                  servico: opt.codigo || "PAC/SEDEX",
                  color: "blue",
                })),
              )
            }
          }
        } catch (e) {
          console.log("Erro ao processar Frenet:", e)
        }
      }

      // 🚛 PROCESSAR BRASPRESS
      if (results[1].status === "fulfilled") {
        try {
          const response = results[1].value
          if (response.ok) {
            const baspressData = await response.json()
            if (baspressData.opcoes && baspressData.opcoes.length > 0) {
              options.push(
                ...baspressData.opcoes.map((opt) => ({
                  transportadora: "Braspress",
                  valor: opt.valor,
                  prazo: opt.prazo,
                  servico: opt.servico || "Rodoviário",
                  color: "green",
                })),
              )
            }
          } else {
            const errorData = await response.json()
            console.log("Erro Braspress:", errorData)
          }
        } catch (e) {
          console.log("Erro ao processar Braspress:", e)
        }
      }

      // 🏃 PROCESSAR PAULINERIS
      if (results[2].status === "fulfilled") {
        try {
          const response = results[2].value
          if (response.ok) {
            const paulinerisData = await response.json()
            if (paulinerisData.opcoes && paulinerisData.opcoes.length > 0) {
              options.push(
                ...paulinerisData.opcoes.map((opt) => ({
                  transportadora: "Paulineris",
                  valor: opt.valor,
                  prazo: opt.prazo,
                  servico: opt.servico || "Expresso",
                  color: "orange",
                })),
              )
            }
          } else {
            const errorData = await response.json()
            console.log("Erro Paulineris:", errorData)
          }
        } catch (e) {
          console.log("Erro ao processar Paulineris:", e)
        }
      }

      // 🏆 ORDENAR POR PREÇO
      options.sort((a, b) => a.valor - b.valor)
      setFreteOptions(options)

      if (options.length === 0) {
        setError("Nenhuma opção de frete disponível para este CEP")
      }
    } catch (error) {
      setError("Erro ao calcular frete")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.slice(0, 8)
  }

  const formatCepDisplay = (cep) => {
    if (cep.length === 8) {
      return `${cep.slice(0, 5)}-${cep.slice(5)}`
    }
    return cep
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Truck className="h-5 w-5" />
          Calcular Frete
        </h3>

        {/* 📍 INPUT CEP */}
        <div className="mb-6 flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Digite seu CEP (somente números)"
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
              maxLength={8}
              className="text-center"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          <Button
            onClick={calcularFrete}
            disabled={loading || cep.length !== 8}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Calculando..." : "Calcular"}
          </Button>
        </div>

        {/* 🚚 OPÇÕES DE FRETE */}
        {freteOptions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">
              Opções de entrega para {formatCepDisplay(cep)}:
            </h4>

            {freteOptions.map((option, index) => (
              <Card
                key={index}
                className="border-l-4"
                style={{ borderLeftColor: getColor(option.color) }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className="text-sm font-medium"
                          style={{ color: getColor(option.color) }}
                        >
                          {option.transportadora}
                        </span>
                        <span className="text-xs text-gray-500">
                          {option.servico}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {option.prazo} dias úteis
                        </div>

                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          R$ {option.valor?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        console.log("Frete selecionado:", option)
                      }}
                    >
                      Selecionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 💡 DICA */}
        {freteOptions.length === 0 && !loading && (
          <div className="text-center text-sm text-gray-500">
            <MapPin className="mx-auto mb-2 h-8 w-8 opacity-50" />
            Digite seu CEP para ver as opções de entrega
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 🎨 HELPER PARA CORES
const getColor = (color) => {
  const colors = {
    blue: "#2563eb",
    green: "#16a34a",
    orange: "#ea580c",
  }
  return colors[color] || "#6b7280"
}

export default FreteCard

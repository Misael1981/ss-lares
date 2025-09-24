"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Loader2, Truck, Package, Clock, MapPin, CheckCircle } from "lucide-react"

const FreteCard = ({ produto }) => {
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)
  const [fretes, setFretes] = useState([])
  const [error, setError] = useState("")
  const [provider, setProvider] = useState("")

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  const calcularFrete = async () => {
    if (!cep || cep.length < 9) {
      setError("Digite um CEP válido")
      return
    }

    setLoading(true)
    setError("")
    setFretes([])

    try {
      const response = await fetch("/api/frete/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cepDestino: cep.replace("-", ""),
          peso: produto?.peso || 1,
          altura: produto?.altura || 10,
          largura: produto?.largura || 15,
          comprimento: produto?.comprimento || 20,
          valorDeclarado: produto?.preco || 100
        })
      })

      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setFretes(data.opcoes || [])
        setProvider(data.provider || 'unknown')
      }
    } catch (err) {
      setError("Erro ao calcular frete. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const getTransportadoraIcon = (nome) => {
    const nomeL = nome.toLowerCase()
    if (nomeL.includes("correios") || nomeL.includes("pac") || nomeL.includes("sedex")) {
      return "📦"
    }
    if (nomeL.includes("loggi")) return "🚚"
    if (nomeL.includes("jadlog")) return "🚛"
    if (nomeL.includes("braspress")) return "🚐"
    if (nomeL.includes("total")) return "📮"
    return "🚚"
  }

  const getTransportadoraColor = (nome) => {
    const nomeL = nome.toLowerCase()
    if (nomeL.includes("correios") || nomeL.includes("pac") || nomeL.includes("sedex")) {
      return "bg-blue-500"
    }
    if (nomeL.includes("loggi")) return "bg-orange-500"
    if (nomeL.includes("jadlog")) return "bg-green-600"
    if (nomeL.includes("braspress")) return "bg-yellow-600"
    if (nomeL.includes("total")) return "bg-purple-500"
    return "bg-gray-500"
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Truck className="w-5 h-5" />
          Cálculo de Frete
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Digite seu CEP para comparar preços e prazos de entrega das melhores transportadoras.
        </p>

        {/* Input CEP */}
        <div className="flex items-end gap-2 mb-4">
          <div className="flex-1">
            <Label>Digite seu CEP</Label>
            <Input 
              type="text" 
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
              maxLength={9}
              className="w-full"
              onKeyPress={(e) => e.key === 'Enter' && calcularFrete()}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <Button 
            onClick={calcularFrete}
            disabled={loading || !cep}
            className="bg-[#cb0735] hover:bg-[#a00529]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Calcular"
            )}
          </Button>
        </div>

        {/* Link Não sei meu CEP */}
        <div className="mb-4">
          <a 
            href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#cb0735] text-sm hover:underline flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" />
            Não sei meu CEP
          </a>
        </div>

        {/* Provider Info */}
        {provider && fretes.length > 0 && (
          <div className="mb-3">
            {provider === 'frenet' && (
              <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                <CheckCircle className="w-3 h-3" />
                Preços em tempo real via Frenet
              </div>
            )}
            {provider === 'fallback' && (
              <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                <Package className="w-3 h-3" />
                Valores estimados
              </div>
            )}
          </div>
        )}

        {/* Resultados */}
        {fretes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Opções de Entrega:</h4>
            {fretes.map((frete, index) => (
              <div 
                key={index}
                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${getTransportadoraColor(frete.transportadora)} flex items-center justify-center text-white text-sm`}>
                      {getTransportadoraIcon(frete.transportadora)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{frete.transportadora}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {frete.prazo} dias úteis
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      R$ {frete.valor.toFixed(2)}
                    </p>
                    {frete.desconto && frete.valorOriginal > frete.valor && (
                      <p className="text-xs text-gray-500 line-through">
                        R$ {frete.valorOriginal.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transportadoras Disponíveis */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Transportadoras disponíveis:</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              📦 Correios
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
              🚚 Loggi
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              🚛 Jadlog
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
              📮 Total Express
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FreteCard

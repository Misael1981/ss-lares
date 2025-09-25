"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  Loader2,
  Truck,
  Package,
  Clock,
  MapPin,
  CheckCircle,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const FreteCorreios = ({ produto }) => {
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)
  const [fretes, setFretes] = useState([])
  const [error, setError] = useState("")
  const [provider, setProvider] = useState("")
  const [message, setMessage] = useState("")

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
    setMessage("")

    try {
      const response = await fetch("/api/frete/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cepDestino: cep.replace("-", ""),
          peso: produto?.weight || 1,
          altura: produto?.height || 10,
          largura: produto?.width || 15,
          comprimento: produto?.length || 20,
          valorDeclarado: produto?.price || 100,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setFretes(data.opcoes || [])
        setProvider(data.provider || "unknown")
        setMessage(data.message || "")
      }
    } catch (err) {
      setError("Erro ao calcular frete. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const getServiceIcon = (nome) => {
    const nomeL = nome.toLowerCase()
    if (nomeL.includes("sedex")) return "⚡"
    if (nomeL.includes("pac")) return "📦"
    if (nomeL.includes("mini")) return "📮"
    return "📦"
  }

  const getServiceColor = (nome) => {
    const nomeL = nome.toLowerCase()
    if (nomeL.includes("sedex")) return "bg-blue-600"
    if (nomeL.includes("pac")) return "bg-blue-500"
    if (nomeL.includes("mini")) return "bg-blue-400"
    return "bg-blue-500"
  }

  const getServiceDescription = (nome) => {
    const nomeL = nome.toLowerCase()
    if (nomeL.includes("sedex")) return "Entrega expressa"
    if (nomeL.includes("pac")) return "Entrega econômica"
    if (nomeL.includes("mini")) return "Entrega super econômica"
    return "Entrega padrão"
  }
  return (
    <>
      <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
        <Truck className="h-5 w-5 text-blue-600" />
        Cálculo de Frete - Correios
      </h3>
      <p className="mb-4 text-sm text-gray-500">
        Consulte preços e prazos de entrega dos Correios para sua região.
      </p>

      {/* Input CEP */}
      <div className="mb-4 flex items-end gap-2">
        <div className="flex-1">
          <Label>Digite seu CEP</Label>
          <Input
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            maxLength={9}
            className="w-full"
            onKeyPress={(e) => e.key === "Enter" && calcularFrete()}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <Button
          onClick={calcularFrete}
          disabled={loading || !cep}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Calcular"}
        </Button>
      </div>

      {/* Link Não sei meu CEP */}
      <div className="mb-4">
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <MapPin className="h-3 w-3" />
          Não sei meu CEP
        </a>
      </div>

      {/* Provider Info */}
      {message && fretes.length > 0 && (
        <div className="mb-3">
          {provider === "frenet" && (
            <div className="flex items-center gap-2 rounded bg-green-50 p-2 text-xs text-green-600">
              <CheckCircle className="h-3 w-3" />
              {message}
            </div>
          )}
          {provider === "fallback" && (
            <div className="flex items-center gap-2 rounded bg-orange-50 p-2 text-xs text-orange-600">
              <Package className="h-3 w-3" />
              {message}
            </div>
          )}
        </div>
      )}

      {/* Resultados */}
      {fretes.length > 0 && (
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Mail className="h-4 w-4 text-blue-600" />
            Opções de Entrega dos Correios:
          </h4>
          {fretes.map((frete, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg border border-blue-200 p-3 transition-colors hover:bg-blue-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full ${getServiceColor(frete.transportadora)} flex items-center justify-center text-lg text-white`}
                  >
                    {getServiceIcon(frete.transportadora)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {frete.transportadora}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getServiceDescription(frete.transportadora)}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {frete.prazo} dias úteis
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
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

      {/* Info dos Correios */}
      <div className="mt-4 rounded-lg bg-blue-50 p-3">
        <div className="mb-2 flex items-center gap-2">
          <Mail className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Sobre os Correios
          </span>
        </div>
        <div className="space-y-1 text-xs text-blue-700">
          <p>
            • <strong>SEDEX:</strong> Entrega expressa com rastreamento
          </p>
          <p>
            • <strong>PAC:</strong> Entrega econômica com rastreamento
          </p>
          <p>
            • <strong>Mini Envio:</strong> Opção mais econômica para objetos
            pequenos
          </p>
        </div>
      </div>

      {/* Garantia dos Correios */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          ✅ Entrega garantida pelos Correios • 📦 Rastreamento incluído
        </p>
      </div>
    </>
  )
}

export default FreteCorreios

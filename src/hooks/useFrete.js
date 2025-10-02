import { useState, useEffect } from "react"
import { validateCep, formatCep } from "@/utils/cepUtils"

export const useFrete = (produto, selectedPackaging, quantity = 1) => {
  const [cep, setCep] = useState("")
  const [loading, setLoading] = useState(false)
  const [freteOptions, setFreteOptions] = useState([])
  const [selectedFrete, setSelectedFrete] = useState(null) // 🆕 Estado da seleção
  const [error, setError] = useState("")

  // 🎯 Auto-selecionar PAC quando as opções chegarem
  useEffect(() => {
    if (freteOptions.length > 0 && !selectedFrete) {
      // Procurar PAC primeiro
      const pacOption = freteOptions.find(
        (opt) =>
          opt.servico?.toLowerCase().includes("pac") ||
          opt.codigo?.toLowerCase().includes("pac"),
      )

      // Se não encontrar PAC, pegar a opção mais barata
      const defaultOption = pacOption || freteOptions[0]
      setSelectedFrete(defaultOption)
    }
  }, [freteOptions, selectedFrete])

  // ✅ Recalcular automaticamente quando quantity mudar
  useEffect(() => {
    if (cep && validateCep(cep)) { // ✅ Remover a condição freteOptions.length > 0
      console.log(
        "🔄 Quantidade mudou para:",
        quantity,
        "- Recalculando frete...",
      )
      calcularFrete()
    }
  }, [quantity])

  const calcularFrete = async () => {
    if (!validateCep(cep)) {
      setError("CEP inválido")
      return
    }

    setLoading(true)
    setError("")

    try {
      const cepFormatted = formatCep(cep)

      // ✅ Dados do produto padronizados COM QUANTIDADE
      const produtoData = {
        ...produto,
        preco:
          (selectedPackaging?.salePrice || selectedPackaging?.price || 0) *
          quantity, // ✅ Multiplicar preço
        peso: (selectedPackaging?.boxWeight || 1) * quantity, // ✅ Multiplicar peso
        altura: selectedPackaging?.boxHeight || 10,
        largura: selectedPackaging?.boxWidth || 10,
        comprimento: selectedPackaging?.boxLength || 10,
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

        // 🚫 Paulineris - TEMPORARIAMENTE DESABILITADA (retornando R$ 0)
        // fetch(`/api/frete/paulineris`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     cep: cepFormatted,
        //     produto: produtoData,
        //   }),
        // }),
      ]

      const results = await Promise.allSettled(requests)
      const options = []

      // 📦 PROCESSAR FRENET (Correios)
      if (results[0].status === "fulfilled") {
        try {
          const response = results[0].value
          if (response.ok) {
            const frenetData = await response.json()
            console.log("Frenet data:", frenetData) // 🐛 Debug

            if (frenetData.opcoes && frenetData.opcoes.length > 0) {
              // 🎯 Filtro simples: bloquear APENAS Jadlog
              const semJadlog = frenetData.opcoes.filter((opt) => {
                const nome = (opt.transportadora || "").toLowerCase()
                return !nome.includes("jadlog")
              })

              options.push(
                ...semJadlog.map((opt) => ({
                  transportadora: opt.transportadora || "Correios",
                  valor: parseFloat(opt.valor) || 0,
                  prazo: opt.prazo || "N/A",
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
            console.log("Braspress data:", baspressData) // 🐛 Debug
            if (baspressData.opcoes && baspressData.opcoes.length > 0) {
              options.push(
                ...baspressData.opcoes.map((opt) => ({
                  transportadora: "Braspress",
                  valor: parseFloat(opt.valor) || 0, // 🛡️ Garantir que é número
                  prazo: opt.prazo || "N/A",
                  servico: opt.servico || "Rodoviário",
                  color: "green",
                })),
              )
            }
          }
        } catch (e) {
          console.log("Erro ao processar Braspress:", e)
        }
      }

      // 🏃 PROCESSAR PAULINERIS - TEMPORARIAMENTE DESABILITADA
      // if (results[2].status === "fulfilled") {
      //   try {
      //     const response = results[2].value
      //     if (response.ok) {
      //       const paulinerisData = await response.json()
      //       console.log('Paulineris data:', paulinerisData) // 🐛 Debug
      //       if (paulinerisData.opcoes && paulinerisData.opcoes.length > 0) {
      //         options.push(
      //           ...paulinerisData.opcoes.map((opt) => ({
      //             transportadora: "Paulineris",
      //             valor: parseFloat(opt.valor) || 0, // 🛡️ Garantir que é número
      //             prazo: opt.prazo || 'N/A',
      //             servico: opt.servico || "Expresso",
      //             color: "orange",
      //           }))
      //         )
      //       }
      //     }
      //   } catch (e) {
      //     console.log("Erro ao processar Paulineris:", e)
      //   }
      // }

      // 🏆 ORDENAR POR PREÇO
      options.sort((a, b) => a.valor - b.valor)
      setFreteOptions(options)

      if (options.length === 0) {
        setError("Nenhuma opção de frete disponível para este CEP")
      }
    } catch (error) {
      setError("Erro ao calcular frete")
      console.error("Erro geral:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCepChange = (value) => {
    const formatted = formatCep(value)
    setCep(formatted)
  }

  const selectFreteOption = (option) => {
    setSelectedFrete(option)
  }

  return {
    cep,
    setCep: handleCepChange,
    loading,
    freteOptions,
    selectedFrete, // 🆕 Opção selecionada
    selectFreteOption, // 🆕 Função para selecionar
    error,
    calcularFrete,
  }
}

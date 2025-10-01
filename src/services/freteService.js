export const freteService = {
  async calcularFrenet(data) {
    const response = await fetch(`/api/frete/calcular`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Erro ao calcular frete Frenet")
    }

    return response.json()
  },

  async calcularBraspress(data) {
    const response = await fetch(`/api/frete/braspress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Erro ao calcular frete Braspress")
    }

    return response.json()
  },

  async calcularPaulineris(data) {
    const response = await fetch(`/api/frete/paulineris`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Erro ao calcular frete Paulineris")
    }

    return response.json()
  },

  processarResultados(results) {
    const options = []

    // Processar Frenet (Correios)
    if (results[0].status === "fulfilled" && results[0].value.opcoes) {
      options.push(
        ...results[0].value.opcoes.map((opt) => ({
          transportadora: opt.transportadora || "Correios",
          valor: opt.valor,
          prazo: opt.prazo,
          servico: opt.codigo || "PAC/SEDEX",
          color: "blue",
        })),
      )
    }

    // Processar Braspress
    if (results[1].status === "fulfilled" && results[1].value.opcoes) {
      options.push(
        ...results[1].value.opcoes.map((opt) => ({
          transportadora: "Braspress",
          valor: opt.valor,
          prazo: opt.prazo,
          servico: opt.servico || "Rodoviário",
          color: "green",
        })),
      )
    }

    // Processar Paulineris
    if (results[2].status === "fulfilled" && results[2].value.opcoes) {
      options.push(
        ...results[2].value.opcoes.map((opt) => ({
          transportadora: "Paulineris",
          valor: opt.valor,
          prazo: opt.prazo,
          servico: opt.servico || "Expresso",
          color: "orange",
        })),
      )
    }

    return options.sort((a, b) => a.valor - b.valor)
  },
}

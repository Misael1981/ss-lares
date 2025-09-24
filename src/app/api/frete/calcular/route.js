export async function POST(request) {
  try {
    const { cepDestino, peso, altura, largura, comprimento, valorDeclarado } = await request.json()

    // Validações básicas
    if (!cepDestino || cepDestino.length < 8) {
      return Response.json({ error: "CEP inválido" }, { status: 400 })
    }

    console.log('Calculando frete para:', { cepDestino, peso, altura, largura, comprimento })

    // Configuração Frenet
    const frenetResponse = await fetch('https://api.frenet.com.br/shipping/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': process.env.FRENET_TOKEN
      },
      body: JSON.stringify({
        SellerCEP: "01310100", // CEP da sua empresa (sem hífen)
        RecipientCEP: cepDestino.replace(/\D/g, ''), // Remove hífen do CEP
        ShipmentInvoiceValue: valorDeclarado || 100,
        ShippingItemArray: [{
          Weight: peso || 1,
          Length: comprimento || 20,
          Height: altura || 10,
          Width: largura || 15,
          Quantity: 1
        }]
      })
    })

    const frenetData = await frenetResponse.json()
    console.log('Resposta Frenet:', frenetData)

    if (frenetData.ShippingSevicesArray && frenetData.ShippingSevicesArray.length > 0) {
      const opcoes = frenetData.ShippingSevicesArray
        .filter(servico => !servico.Error) // Remove serviços com erro
        .map(servico => ({
          transportadora: servico.ServiceDescription || servico.Carrier,
          valor: parseFloat(servico.ShippingPrice),
          prazo: parseInt(servico.DeliveryTime),
          desconto: servico.OriginalShippingPrice > servico.ShippingPrice,
          valorOriginal: parseFloat(servico.OriginalShippingPrice || servico.ShippingPrice),
          codigo: servico.ServiceCode
        }))
        .filter(opcao => opcao.valor > 0) // Remove opções com valor 0

      // Ordena por preço
      opcoes.sort((a, b) => a.valor - b.valor)

      if (opcoes.length > 0) {
        return Response.json({ 
          success: true,
          opcoes,
          provider: 'frenet'
        })
      }
    }

    // Fallback - valores estimados se Frenet falhar
    const fallbackOpcoes = [
      {
        transportadora: "PAC - Correios",
        valor: 15.50,
        prazo: 8,
        desconto: false,
        valorOriginal: 15.50,
        codigo: "fallback_pac"
      },
      {
        transportadora: "SEDEX - Correios", 
        valor: 25.90,
        prazo: 3,
        desconto: false,
        valorOriginal: 25.90,
        codigo: "fallback_sedex"
      }
    ]

    return Response.json({ 
      success: true,
      opcoes: fallbackOpcoes,
      provider: 'fallback',
      message: 'Valores estimados - Frenet temporariamente indisponível'
    })

  } catch (error) {
    console.error('Erro ao calcular frete:', error)
    
    // Fallback em caso de erro
    const fallbackOpcoes = [
      {
        transportadora: "Frete Padrão",
        valor: 20.00,
        prazo: 5,
        desconto: false,
        valorOriginal: 20.00,
        codigo: "fallback_padrao"
      }
    ]

    return Response.json({ 
      success: true,
      opcoes: fallbackOpcoes,
      provider: 'fallback',
      message: 'Valores estimados'
    })
  }
}
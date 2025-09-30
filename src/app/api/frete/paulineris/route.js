import { NextResponse } from "next/server"

// Cache simples em memória
let paulinerisToken = null
let paulinerisTokenExpira = null

export async function POST(request) {
  try {
    const { cep, produto } = await request.json()

    // Validações básicas
    if (!cep || !produto) {
      return NextResponse.json(
        { error: "CEP e produto são obrigatórios" },
        { status: 400 },
      )
    }

    // Validar formato do CEP
    const cepRegex = /^\d{5}-?\d{3}$/
    if (!cepRegex.test(cep)) {
      return NextResponse.json(
        { error: "CEP deve ter o formato 00000-000" },
        { status: 400 },
      )
    }

    // 🎯 CONFIGURAÇÕES ATUALIZADAS DA PAULINERIS
    const paulinerisConfig = {
      tokenUrl: "https://tracking-apigateway.rte.com.br/token",
      quotationUrl: "https://quotation-apigateway.rte.com.br/api/v1/gera-cotacao", // ✅ URL correta
      username: process.env.PAULINERIS_USERNAME,
      password: process.env.PAULINERIS_PASSWORD,
      clientId: process.env.PAULINERIS_CLIENT_ID,
    }

    if (!paulinerisConfig.username || !paulinerisConfig.password) {
      console.error("⚠️ Credenciais da Paulineris não encontradas")
      return getFallbackPaulineris(cep, produto)
    }

    // Obter ou renovar token
    let token = await getCachedAccessToken(paulinerisConfig)
    if (!token) {
      console.error("⚠️ Erro ao obter token da Paulineris")
      return getFallbackPaulineris(cep, produto)
    }

    // 🎯 PREPARAR DADOS CONFORME DOCUMENTAÇÃO OFICIAL DA PAULINERIS
    const requestData = {
      OriginZipCode: (process.env.CEP_ORIGEM || "37584000").replace("-", ""), // Remove hífen
      OriginCityId: process.env.PAULINERIS_CIDADE_ORIGEM_ID || "8997", // ID da cidade de origem
      DestinationZipCode: cep.replace("-", ""), // Remove hífen do CEP
      DestinationCityId: "", // Pode ser vazio conforme documentação
      Weight: produto.peso || 1.0, // Peso em kilos
      DeclaredValue: produto.preco || 10.50, // Valor da NF-e
      ReceiverCpfcnp: "12345678910", // CPF/CNPJ do destinatário (genérico)
      UserCpfCnpj: process.env.PAULINERIS_USER_CPF || "12345678910", // CPF/CNPJ do usuário logado
      UserName: "SISTEMA ECOMMERCE", // Usuário que fez a emissão
      PayerType: "1", // Tomador da cotação
      // 🎯 ARRAY DE PACOTES CONFORME DOCUMENTAÇÃO
      Packs: [
        {
          AmountPackages: 1, // Quantidade de pacotes
          Weight: produto.peso || 1.0, // Peso do pacote
          Length: produto.comprimento || 20.0, // Comprimento
          Height: produto.altura || 10.0, // Altura
          Width: produto.largura || 15.0 // Largura
        }
      ],
      Email: "contato@empresa.com", // Email do cliente
      ContactName: "Cliente", // Nome do contato
      ContactPhone: "11999999999", // Telefone do contato
      AmountVolumes: 1, // Quantidade de volumes
      Address: "Endereço de origem", // Endereço
      AddressDestination: "Endereço de destino" // Endereço de destino
    }

    console.log("🚚 Enviando para Paulineris (estrutura oficial):", requestData)

    // 🎯 FAZER REQUISIÇÃO COM HEADERS CORRETOS
    const response = await fetch(paulinerisConfig.quotationUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/*+json",
        Authorization: token, // Token conforme documentação
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "")
      console.error("❌ Erro na API da Paulineris:", response.status, errorText)

      // Se for 401, força renovar token na próxima requisição
      if (response.status === 401) {
        paulinerisToken = null
        paulinerisTokenExpira = null
      }

      return getFallbackPaulineris(cep, produto)
    }

    const data = await response.json()
    console.log("✅ Resposta Paulineris:", data)

    // 🎯 PROCESSAR RESPOSTA (ajustar conforme estrutura real da resposta)
    const opcoesFrete = data.quotations?.map(cotacao => ({
      nome: `${cotacao.serviceName || 'Paulineris'} Paulineris`,
      preco: parseFloat(cotacao.totalPrice || cotacao.price || 0),
      prazo: parseInt(cotacao.deliveryTime || cotacao.days || 5),
      codigo: cotacao.serviceCode || 'PAUL',
      transportadora: 'Paulineris',
      descricao: getDescricaoPaulineris(cotacao.serviceName)
    })) || []

    return NextResponse.json({
      success: true,
      opcoes: opcoesFrete,
      origem: 'paulineris_api'
    })

  } catch (error) {
    console.error("💥 Erro ao calcular frete Paulineris:", error)
    return getFallbackPaulineris(cep, produto)
  }
}

// ================================
// Função para obter token com cache
// ================================
async function getCachedAccessToken(config) {
  const agora = Date.now()

  // Se já temos token válido em cache
  if (
    paulinerisToken &&
    paulinerisTokenExpira &&
    agora < paulinerisTokenExpira
  ) {
    return paulinerisToken
  }

  try {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        auth_type: "DEV",
        grant_type: "password",
        username: config.username,
        password: config.password,
        client_id: config.clientId || "default",
      }),
    })

    if (!response.ok) {
      throw new Error(`Erro ao obter token: ${response.status}`)
    }

    const data = await response.json()
    paulinerisToken = data.access_token
    // Calcula a data de expiração (agora + expires_in - 60s de margem de segurança)
    paulinerisTokenExpira = agora + (parseInt(data.expires_in, 10) - 60) * 1000

    return paulinerisToken
  } catch (error) {
    console.error("❌ Erro ao obter token Paulineris:", error)
    return null
  }
}

// ================================
// Função para obter descrições
// ================================
function getDescricaoPaulineris(nomeServico) {
  const descricoes = {
    PAC: "Entrega econômica com prazo estendido",
    SEDEX: "Entrega expressa com prazo reduzido",
    EXPRESSO: "Entrega super expressa para grandes centros",
    RODOVIARIO: "Transporte rodoviário para cargas maiores",
    ECONOMICO: "Opção mais econômica disponível",
    RAPIDO: "Entrega rápida e confiável",
  }

  const servicoUpper = nomeServico.toUpperCase()
  return (
    descricoes[servicoUpper] || `Serviço de entrega ${nomeServico} - Paulineris`
  )
}

// ================================
// Fallback com valores estimados
// ================================
function getFallbackPaulineris(cep, produto) {
  const opcoesFallback = [
    {
      nome: "PAC Paulineris",
      preco: 18.9,
      prazo: 7,
      codigo: "PAC_PAUL",
      transportadora: "Paulineris",
      descricao: "Entrega econômica com prazo estendido",
    },
    {
      nome: "SEDEX Paulineris",
      preco: 28.5,
      prazo: 4,
      codigo: "SEDEX_PAUL",
      transportadora: "Paulineris",
      descricao: "Entrega expressa com prazo reduzido",
    },
    {
      nome: "Expresso Paulineris",
      preco: 38.9,
      prazo: 2,
      codigo: "EXP_PAUL",
      transportadora: "Paulineris",
      descricao: "Entrega super expressa para grandes centros",
    },
  ]

  return NextResponse.json({
    success: true,
    opcoes: opcoesFallback,
    origem: "fallback_paulineris",
    aviso:
      "Valores estimados - Configure as credenciais da Paulineris para cálculos precisos",
  })
}

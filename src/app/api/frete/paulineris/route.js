import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { cep, produto } = await request.json()

    // Validações básicas
    if (!cep || !produto) {
      return NextResponse.json(
        { error: 'CEP e produto são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar formato do CEP
    const cepRegex = /^\d{5}-?\d{3}$/
    if (!cepRegex.test(cep)) {
      return NextResponse.json(
        { error: 'CEP deve ter o formato 00000-000' },
        { status: 400 }
      )
    }

    // Configurações da Paulineris/RTE
    const paulinerisConfig = {
      tokenUrl: 'https://tracking-apigateway.rte.com.br/token',
      apiUrl: process.env.PAULINERIS_API_URL || 'https://tracking-apigateway.rte.com.br',
      username: process.env.PAULINERIS_USERNAME,
      password: process.env.PAULINERIS_PASSWORD,
      clientId: process.env.PAULINERIS_CLIENT_ID
    }

    if (!paulinerisConfig.username || !paulinerisConfig.password) {
      console.error('Credenciais da Paulineris não encontradas')
      return getFallbackPaulineris(cep, produto)
    }

    // Obter token de acesso
    const token = await getAccessToken(paulinerisConfig)
    if (!token) {
      console.error('Erro ao obter token da Paulineris')
      return getFallbackPaulineris(cep, produto)
    }

    // Preparar dados para cotação
    const requestData = {
      cep_origem: process.env.CEP_ORIGEM || '01310100',
      cep_destino: cep.replace('-', ''),
      peso: produto.peso || 0.5,
      altura: produto.altura || 10,
      largura: produto.largura || 15,
      comprimento: produto.comprimento || 20,
      valor_declarado: produto.preco || 100,
      servicos: ['PAC', 'SEDEX', 'EXPRESSO']
    }

    // Fazer requisição para cotação
    const response = await fetch(`${paulinerisConfig.apiUrl}/api/v1/cotacao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      console.error('Erro na API da Paulineris:', response.status)
      return getFallbackPaulineris(cep, produto)
    }

    const data = await response.json()

    // Processar resposta da Paulineris
    const opcoesFrete = data.cotacoes?.map(cotacao => ({
      nome: `${cotacao.servico} Paulineris`,
      preco: parseFloat(cotacao.valor_frete),
      prazo: parseInt(cotacao.prazo_entrega),
      codigo: cotacao.codigo_servico,
      transportadora: 'Paulineris',
      descricao: getDescricaoPaulineris(cotacao.servico)
    })) || []

    return NextResponse.json({
      success: true,
      opcoes: opcoesFrete,
      origem: 'paulineris_api'
    })

  } catch (error) {
    console.error('Erro ao calcular frete Paulineris:', error)
    return getFallbackPaulineris(cep, produto)
  }
}

// Função para obter token de acesso
async function getAccessToken(config) {
  try {
    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        auth_type: 'DEV',
        grant_type: 'password',
        username: config.username,
        password: config.password,
        client_id: config.clientId || 'default'
      })
    })

    if (!response.ok) {
      throw new Error(`Erro ao obter token: ${response.status}`)
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Erro ao obter token:', error)
    return null
  }
}

// Função para obter descrições dos serviços Paulineris
function getDescricaoPaulineris(nomeServico) {
  const descricoes = {
    'PAC': 'Entrega econômica com prazo estendido',
    'SEDEX': 'Entrega expressa com prazo reduzido', 
    'EXPRESSO': 'Entrega super expressa para grandes centros',
    'RODOVIARIO': 'Transporte rodoviário para cargas maiores',
    'ECONOMICO': 'Opção mais econômica disponível',
    'RAPIDO': 'Entrega rápida e confiável'
  }
  
  const servicoUpper = nomeServico.toUpperCase()
  return descricoes[servicoUpper] || `Serviço de entrega ${nomeServico} - Paulineris`
}

// Fallback com valores estimados da Paulineris
function getFallbackPaulineris(cep, produto) {
  const opcoesFallback = [
    {
      nome: 'PAC Paulineris',
      preco: 18.90,
      prazo: 7,
      codigo: 'PAC_PAUL',
      transportadora: 'Paulineris',
      descricao: 'Entrega econômica com prazo estendido'
    },
    {
      nome: 'SEDEX Paulineris', 
      preco: 28.50,
      prazo: 4,
      codigo: 'SEDEX_PAUL',
      transportadora: 'Paulineris',
      descricao: 'Entrega expressa com prazo reduzido'
    },
    {
      nome: 'Expresso Paulineris',
      preco: 38.90,
      prazo: 2,
      codigo: 'EXP_PAUL',
      transportadora: 'Paulineris',
      descricao: 'Entrega super expressa para grandes centros'
    }
  ]

  return NextResponse.json({
    success: true,
    opcoes: opcoesFallback,
    origem: 'fallback_paulineris',
    aviso: 'Valores estimados - Configure as credenciais da Paulineris para cálculos precisos'
  })
}
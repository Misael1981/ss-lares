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

    // Configurações da Braspress
    const braspressConfig = {
      apiUrl: process.env.BRASPRESS_API_URL || 'https://api.braspress.com',
      username: process.env.BRASPRESS_USERNAME,
      password: process.env.BRASPRESS_PASSWORD,
      cnpjRemetente: process.env.BRASPRESS_CNPJ_REMETENTE
    }

    if (!braspressConfig.username || !braspressConfig.password || !braspressConfig.cnpjRemetente) {
      console.error('Credenciais da Braspress não encontradas')
      return getFallbackBraspress(cep, produto)
    }

    try {
      // Preparar dados para a API da Braspress
      const requestData = {
        cnpjRemetente: braspressConfig.cnpjRemetente,
        cnpjDestinatario: '', // Vazio para cotação por CEP
        modal: 'R', // R = Rodoviário, A = Aéreo
        tipoFrete: 1, // 1 = CIF (pagante é o remetente)
        cepOrigem: (process.env.CEP_ORIGEM || '37584000').replace(/\D/g, ''),
        cepDestino: cep.replace(/\D/g, ''),
        vlrMercadoria: produto.preco || 100,
        peso: produto.peso || 1,
        volumes: 1,
        cubagem: [
          {
            comprimento: (produto.comprimento || 20) / 100, // converter cm para metros
            largura: (produto.largura || 15) / 100,
            altura: (produto.altura || 10) / 100,
            volumes: 1
          }
        ]
      }

      // Criar autenticação Basic Auth
      const auth = Buffer.from(`${braspressConfig.username}:${braspressConfig.password}`).toString('base64')

      // Fazer requisição para a API da Braspress
      const response = await fetch(`${braspressConfig.apiUrl}/v1/cotacao/calcular/json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        console.error(`Erro na API Braspress: ${response.status} - ${response.statusText}`)
        return getFallbackBraspress(cep, produto)
      }

      const data = await response.json()

      // Processar resposta da Braspress
      const opcoes = []

      // Adicionar opção rodoviária se disponível
      if (data.id && data.prazo && data.totalFrete) {
        opcoes.push({
          id: `braspress-rodoviario-${data.id}`,
          nome: 'Braspress Rodoviário',
          tipo: 'Rodoviário',
          prazo: `${data.prazo} dias úteis`,
          valor: parseFloat(data.totalFrete),
          valorFormatado: `R$ ${parseFloat(data.totalFrete).toFixed(2).replace('.', ',')}`
        })
      }

      // Se não houver opções válidas, usar fallback
      if (opcoes.length === 0) {
        console.warn('Nenhuma opção válida retornada pela API Braspress')
        return getFallbackBraspress(cep, produto)
      }

      return NextResponse.json({
        success: true,
        opcoes: opcoes
      })

    } catch (apiError) {
      console.error('Erro na comunicação com a API Braspress:', apiError)
      return getFallbackBraspress(cep, produto)
    }

  } catch (error) {
    console.error('Erro geral na API Braspress:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Função de fallback para quando a API não estiver disponível
function getFallbackBraspress(cep, produto) {
  const opcoesFallback = [
    {
      id: 'braspress-rodoviario-fallback',
      nome: 'Braspress Rodoviário',
      tipo: 'Rodoviário',
      prazo: '5-7 dias úteis',
      valor: 28.90,
      valorFormatado: 'R$ 28,90'
    },
    {
      id: 'braspress-aereo-fallback',
      nome: 'Braspress Aéreo',
      tipo: 'Aéreo',
      prazo: '2-3 dias úteis',
      valor: 52.50,
      valorFormatado: 'R$ 52,50'
    }
  ]

  return NextResponse.json({
    success: true,
    opcoes: opcoesFallback,
    aviso: 'Erro na comunicação com a Braspress. Valores estimados sendo exibidos.'
  })
}
'use client'
import { useState } from 'react'
import { Truck, Clock, Package, AlertCircle } from 'lucide-react'

const FretePaulineris = ({ produto }) => {
  const [cep, setCep] = useState('')
  const [opcoesFrete, setOpcoesFrete] = useState([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')

  const formatarCep = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    if (apenasNumeros.length <= 5) {
      return apenasNumeros
    }
    return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`
  }

  const handleCepChange = (e) => {
    const valorFormatado = formatarCep(e.target.value)
    setCep(valorFormatado)
    
    if (erro) setErro('')
    if (opcoesFrete.length > 0) setOpcoesFrete([])
  }

  const calcularFrete = async () => {
    if (!cep || cep.length < 9) {
      setErro('Por favor, insira um CEP válido')
      return
    }

    setLoading(true)
    setErro('')
    setAviso('')

    try {
      const response = await fetch('/api/frete/paulineris', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cep,
          produto: {
            peso: produto?.weight || 0.5,
            altura: produto?.height || 10,
            largura: produto?.width || 15,
            comprimento: produto?.length || 20,
            preco: produto?.price || 100
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        setOpcoesFrete(data.opcoes)
        if (data.aviso) {
          setAviso(data.aviso)
        }
      } else {
        setErro(data.error || 'Erro ao calcular frete')
      }
    } catch (error) {
      console.error('Erro:', error)
      setErro('Erro ao calcular frete. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const getIconePaulineris = (nomeServico) => {
    const nome = nomeServico.toUpperCase()
    if (nome.includes('PAC')) return '📦'
    if (nome.includes('SEDEX')) return '🚚'
    if (nome.includes('EXPRESSO')) return '⚡'
    return '🚛'
  }

  const getCorPaulineris = (nomeServico) => {
    const nome = nomeServico.toUpperCase()
    if (nome.includes('PAC')) return 'text-blue-600'
    if (nome.includes('SEDEX')) return 'text-green-600'
    if (nome.includes('EXPRESSO')) return 'text-purple-600'
    return 'text-orange-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Cálculo de Frete - Paulineris
        </h3>
      </div>

      {/* Input CEP */}
      <div className="mb-4">
        <label htmlFor="cep-paulineris" className="block text-sm font-medium text-gray-700 mb-2">
          Digite seu CEP:
        </label>
        <div className="flex gap-2">
          <input
            id="cep-paulineris"
            type="text"
            value={cep}
            onChange={handleCepChange}
            placeholder="00000-000"
            maxLength={9}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            onClick={calcularFrete}
            disabled={loading || !cep}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Calculando...' : 'Calcular'}
          </button>
        </div>
      </div>

      {/* Aviso */}
      {aviso && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-800">{aviso}</p>
        </div>
      )}

      {/* Erro */}
      {erro && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{erro}</p>
        </div>
      )}

      {/* Opções de Frete */}
      {opcoesFrete.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 mb-3">Opções de entrega:</h4>
          {opcoesFrete.map((opcao, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getIconePaulineris(opcao.nome)}</span>
                  <div>
                    <h5 className={`font-semibold ${getCorPaulineris(opcao.nome)}`}>
                      {opcao.nome}
                    </h5>
                    <p className="text-sm text-gray-600">{opcao.descricao}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    R$ {opcao.preco.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {opcao.prazo} {opcao.prazo === 1 ? 'dia útil' : 'dias úteis'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Informações sobre a Paulineris */}
      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Package className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-orange-800 mb-1">Sobre a Paulineris</h5>
            <p className="text-sm text-orange-700">
              A Paulineris é uma transportadora especializada em entregas rápidas e seguras, 
              oferecendo diferentes modalidades de envio para atender suas necessidades.
            </p>
            <ul className="text-sm text-orange-700 mt-2 space-y-1">
              <li>• <strong>PAC:</strong> Opção econômica com prazo estendido</li>
              <li>• <strong>SEDEX:</strong> Entrega expressa com prazo reduzido</li>
              <li>• <strong>Expresso:</strong> Super expresso para grandes centros</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FretePaulineris

'use client'
import { useState } from 'react'
import { Truck, Clock, Package, AlertCircle } from 'lucide-react'

const FreteBaspress = ({ produto }) => {
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
      const response = await fetch('/api/frete/braspress', {
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

  return (
    <div className="space-y-4">
      {/* Header com logo da Braspress */}
      <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <Truck className="h-6 w-6 text-green-600" />
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
          Braspress
        </h3>
        <span className="text-sm text-green-600 dark:text-green-400">
          Rodoviário e Aéreo
        </span>
      </div>

      {/* Input CEP */}
      <div className="space-y-2">
        <label htmlFor="cep-braspress" className="text-sm font-medium">
          CEP de destino:
        </label>
        <div className="flex gap-2">
          <input
            id="cep-braspress"
            type="text"
            value={cep}
            onChange={handleCepChange}
            placeholder="00000-000"
            maxLength={9}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800"
          />
          <button
            onClick={calcularFrete}
            disabled={loading || !cep}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Calculando...
              </>
            ) : (
              <>
                <Package className="h-4 w-4" />
                Calcular
              </>
            )}
          </button>
        </div>
      </div>

      {/* Aviso */}
      {aviso && (
        <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-700 dark:text-yellow-300">{aviso}</p>
        </div>
      )}

      {/* Erro */}
      {erro && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{erro}</p>
        </div>
      )}

      {/* Opções de Frete */}
      {opcoesFrete.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Opções disponíveis:
          </h4>
          {opcoesFrete.map((opcao) => (
            <div
              key={opcao.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  {opcao.tipo === 'Aéreo' ? (
                    <Package className="h-5 w-5 text-green-600" />
                  ) : (
                    <Truck className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {opcao.nome}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{opcao.prazo}</span>
                    <span className="text-green-600 font-medium">
                      • {opcao.tipo}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  {opcao.valorFormatado}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FreteBaspress

import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const getColorHelper = (color) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200", 
    orange: "bg-orange-100 text-orange-800 border-orange-200",
  }
  return colors[color] || colors.blue
}

export default function FreteOption({ option, isSelected, onSelect }) {
  // 🛡️ Validações de segurança
  if (!option) {
    console.warn('FreteOption: option is undefined')
    return null
  }

  const valor = option.valor || 0
  const prazo = option.prazo || 'N/A'
  const transportadora = option.transportadora || 'Transportadora'
  const servico = option.servico || 'Serviço'
  const color = option.color || 'blue'

  return (
    <div 
      className={`
        flex items-center justify-between p-4 border rounded-lg 
        cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }
      `}
      onClick={() => onSelect(option)}
    >
      <div className="flex items-center gap-3">
        {/* 🎯 Indicador de seleção */}
        <div className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${isSelected 
            ? 'border-blue-500 bg-blue-500' 
            : 'border-gray-300'
          }
        `}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>

        <Badge className={getColorHelper(color)}>
          {transportadora}
        </Badge>
        <div>
          <p className="font-medium text-gray-900">{servico}</p>
          <p className="text-sm text-gray-600">
            Entrega em {prazo} dias úteis
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg font-bold ${isSelected ? 'text-blue-600' : 'text-green-600'}`}>
          R$ {typeof valor === 'number' ? valor.toFixed(2).replace(".", ",") : '0,00'}
        </p>
        {isSelected && (
          <p className="text-xs text-blue-600 font-medium">Selecionado</p>
        )}
      </div>
    </div>
  )
}

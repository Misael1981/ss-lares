import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFrete } from "@/hooks/useFrete"
import FreteInput from "@/components/FreteInput"
import FreteOption from "@/components/FreteOption"

export default function FreteCard({ produto, selectedPackaging, onFreteSelect }) {
  const { 
    cep, 
    setCep, 
    loading, 
    freteOptions, 
    selectedFrete,
    selectFreteOption,
    error, 
    calcularFrete 
  } = useFrete(produto, selectedPackaging)

  // 🔄 Notificar componente pai quando frete for selecionado
  const handleFreteSelect = (option) => {
    selectFreteOption(option)
    if (onFreteSelect) {
      onFreteSelect(option) // Passar para o componente pai
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Calcular Frete e Prazo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FreteInput
          cep={cep}
          onCepChange={setCep}
          onCalcular={calcularFrete}
          loading={loading}
          error={error}
        />

        {freteOptions.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">
              Opções de entrega:
            </h3>
            {freteOptions.map((option, index) => (
              <FreteOption 
                key={index} 
                option={option}
                isSelected={selectedFrete === option}
                onSelect={handleFreteSelect}
              />
            ))}
            
            {/* 🎯 Resumo da seleção */}
            {selectedFrete && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  ✅ Frete selecionado: {selectedFrete.transportadora} - {selectedFrete.servico}
                </p>
                <p className="text-sm text-blue-600">
                  R$ {selectedFrete.valor.toFixed(2).replace(".", ",")} - {selectedFrete.prazo} dias úteis
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

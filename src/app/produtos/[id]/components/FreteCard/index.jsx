import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFrete } from "@/hooks/useFrete"
import { useCart } from "@/contexts/CartContext"
import FreteInput from "@/components/FreteInput"
import FreteOption from "@/components/FreteOption"

export default function FreteCard({
  produto,
  selectedPackaging,
  quantity,
  onFreteSelect,
}) {
  const {
    cep,
    setCep,
    loading,
    freteOptions,
    selectedFrete,
    selectFreteOption,
    error,
    calcularFrete,
  } = useFrete(produto, selectedPackaging, quantity) // ✅ Passar quantidade

  const { setShipping } = useCart()

  // 🔄 Notificar componente pai E atualizar carrinho quando frete for selecionado
  const handleFreteSelect = (option) => {
    selectFreteOption(option)

    // 🛒 Atualizar frete no carrinho COM QUANTIDADE
    setShipping({
      method: option.servico || "PAC",
      price: option.valor || 0,
      estimatedDays: option.prazo || 0,
      transportadora: option.transportadora || "Correios",
      cep: cep,
      originalQuantity: quantity, // ✅ SALVAR QUANTIDADE ORIGINAL
      currentQuantity: quantity,  // ✅ QUANTIDADE ATUAL
    })

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
            <h3 className="font-medium text-gray-900">Opções de entrega:</h3>
            {freteOptions.map((option, index) => (
              <FreteOption
                key={index}
                option={option}
                isSelected={selectedFrete?.servico === option.servico}
                onSelect={() => handleFreteSelect(option)}
              />
            ))}
          </div>
        )}

        {selectedFrete && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-sm font-medium text-green-700">
              ✅ Frete selecionado: {selectedFrete.transportadora} -{" "}
              {selectedFrete.servico}
            </p>
            <p className="text-xs text-green-600">
              R$ {selectedFrete.valor.toFixed(2)} • {selectedFrete.prazo} dias
              úteis
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

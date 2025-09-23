import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FreteCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Cálculo de Frete</h3>
        <p className="text-sm text-gray-500">
          Antes de finalizar sua compra, escolha a distribuidora e digite o CEP
          para calcular o frete do seu pedido.
        </p>
        <div className="flex items-center justify-center gap-2 p-4">
          <Button variant="outline" className="bg-blue-500 text-white">
            📦 Correios
          </Button>
          <Button variant="outline" className="bg-green-500 text-white">
            🚛 Braspress
          </Button>
          <Button variant="outline" className="bg-purple-500 text-white">
            🚚 Paulineris
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <Label>Digite seu CEP</Label>
            <Input type="text" placeholder="CEP" className="w-full" />
            <p>Ex: 00000-000</p>
          </div>
          <div>
            <a href="#" className="text-[#cb0735]">
              Não sei meu CEP
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FreteCard

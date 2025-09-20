import { Card, CardContent, CardTitle } from "@/components/ui/card"

const { Button } = require("@/components/ui/button")

const QuickActions = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <CardTitle className="py-4">Ações Rápidas</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            Novo Produto
          </Button>
          <Button className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            Gerenciar pedidos
          </Button>
          <Button className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            Gerenciar Usuários
          </Button>
          <Button className="flex-1 rounded-md bg-yellow-600 py-6 text-white hover:bg-yellow-500">
            Gerenciar Dados
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions

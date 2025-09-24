import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PoliticaPrivacidade() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Política de Privacidade</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
          
          <h2>1. Informações que Coletamos</h2>
          <p>Coletamos informações quando você:</p>
          <ul>
            <li>Cria uma conta em nosso site</li>
            <li>Faz login com Google</li>
            <li>Adiciona produtos ao carrinho</li>
            <li>Calcula frete</li>
          </ul>

          <h2>2. Como Usamos suas Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Processar pedidos e calcular fretes</li>
            <li>Melhorar nossos serviços</li>
            <li>Enviar atualizações sobre produtos</li>
          </ul>

          <h2>3. Proteção de Dados</h2>
          <p>
            Seus dados são protegidos com criptografia e armazenados de forma segura.
            Não compartilhamos informações pessoais com terceiros sem seu consentimento.
          </p>

          <h2>4. Contato</h2>
          <p>
            Para dúvidas sobre esta política, entre em contato conosco através do 
            WhatsApp: (35) 99197-2424
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
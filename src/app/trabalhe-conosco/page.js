import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function TrabalheConosco() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Trabalhe Conosco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold">
                Faça Parte da Nossa Equipe
              </h2>
              <p className="mb-6 text-gray-600">
                Estamos sempre em busca de profissionais talentosos e dedicados
                para integrar nossa equipe. Se você tem paixão por desafios e
                quer crescer conosco, envie seu currículo!
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold">Áreas de Interesse:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Vendas e Atendimento</li>
                  <li>• Produção industrial</li>
                  <li>• Administrativo</li>
                  <li>• Marketing Digital</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Como se Candidatar:</h3>

              <div className="space-y-3">
                <a
                  href="mailto:rh@sslares.com.br?subject=Candidatura - Trabalhe Conosco"
                  className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                >
                  <Mail className="h-5 w-5 text-[#cb0735]" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">sslaresmg@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/5535991972424?text=Olá! Gostaria de enviar meu currículo para trabalhar na SSLARES."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                >
                  <Phone className="h-5 w-5 text-[#cb0735]" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-gray-600">(35) 99197-2424</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <MapPin className="h-5 w-5 text-[#cb0735]" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-sm text-gray-600">
                      Venha nos visitar pessoalmente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCheck } from "lucide-react"
import Image from "next/image"

const CardPartner = ({ data }) => {
  return (
    <div className="max-w-[380px]">
      <Card className="border border-[#cb0735] shadow-lg shadow-[#cb0735]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#cb0735]/30">
        <CardContent className="p-4 md:h-[600px]">
          <div className="flex flex-col items-center justify-center gap-4 md:h-full md:justify-between">
            <div className="flex items-center justify-center">
              <Image
                src={data.imagem}
                alt={data.titulo}
                width={70}
                height={70}
              />
            </div>
            <div className="space-y-2">
              {/* text-[#cb0735] */}
              <h3 className="text-center text-3xl font-bold">{data.titulo}</h3>
              <p className="text-center text-sm opacity-60">{data.descricao}</p>
            </div>
            <h4 className="text-center text-2xl font-semibold text-[#cb0735]">
              Principais benefícios
            </h4>
            <ul>
              {data.beneficios.map((beneficio, index) => (
                <li key={index} className="text-base font-semibold">
                  <CheckCheck className="mr-2 inline-block text-green-500" />
                  {beneficio}
                </li>
              ))}
            </ul>
            <p className="text-sm opacity-60">
              * Condições especiais sujeitas a análise interna
            </p>
            <Button className="w-full">Saiba mais</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardPartner

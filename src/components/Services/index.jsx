import Image from "next/image"
import Subtitle from "../SubTitle"
import { Dialog, DialogTrigger } from "../ui/dialog"
import CalculatorContent from "../CalculatorPopup/components/CalculatorContent"

const dataServices = [
  {
    image: "/image/Documents-amico (1).svg",
    title: "Baixe nosso Catálogo",
    description: "Conheça todo nosso portfólio de produtos e soluções.",
  },
  {
    image: "/image/Mobile Marketing-bro.svg",
    title: "Sobre a Sslares",
    description:
      "Conheça um pouco de nossa história e valores, e tenha acesso às nossas mídias e Central de Relacionamentos.",
  },
]

const Services = () => {
  return (
    <section className="boxed p-4">
      <Subtitle>Nossos Serviços</Subtitle>
      <div className="flex cursor-pointer flex-wrap items-center justify-center gap-4 lg:justify-between">
        <Dialog>
          <DialogTrigger>
            <div className="flex aspect-square w-[330px] max-w-[100%] flex-col items-center justify-center gap-2 rounded-2xl bg-brand-red p-5">
              <Image
                src="/image/Calculator-amico.svg"
                width={150}
                height={150}
                alt="Imagem de uma calculadora animada"
              />
              <h3 className="text-xl font-semibold text-white">
                Calculadora de Material
              </h3>
              <p className="text-center text-sm text-white">
                Calcule a quantidade de espaçadores necessária para sua obra.
              </p>
            </div>
          </DialogTrigger>
          <CalculatorContent />
        </Dialog>
        {dataServices.map((item) => (
          <div
            key={item.title}
            className="flex aspect-square w-[330px] max-w-[100%] flex-col items-center justify-center gap-2 rounded-2xl bg-brand-red p-5"
          >
            <Image src={item.image} width={150} height={150} alt={item.name} />
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="text-center text-sm text-white">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services

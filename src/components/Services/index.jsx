import Image from "next/image"
import Subtitle from "../SubTitle"
import { Dialog, DialogTrigger } from "../ui/dialog"
import CalculatorContent from "../CalculatorPopup/components/CalculatorContent"
import Link from "next/link"
import CatalogPdf from "../CatalogPdf"

const Services = () => {
  return (
    <section className="boxed p-4">
      <Subtitle>Nossos Serviços</Subtitle>
      <div className="flex cursor-pointer flex-wrap items-center justify-center gap-4 lg:justify-between">
        <Dialog>
          <DialogTrigger>
            <div className="flex aspect-square w-[330px] max-w-[100%] flex-col items-center justify-center gap-2 rounded-2xl bg-brand-red p-5 transition-transform hover:scale-105">
              <Image
                src="/image/calculator.svg"
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
        <CatalogPdf />
        <Link href="/produtos">
          <div className="flex aspect-square w-[330px] max-w-[100%] flex-col items-center justify-center gap-2 rounded-2xl bg-brand-red p-5 transition-transform hover:scale-105">
            <Image
              src="/image/ecommerce.svg"
              width={150}
              height={150}
              alt="Imagem de uma calculadora animada"
            />
            <h3 className="text-xl font-semibold text-white">
              Loja da Sslares
            </h3>
            <p className="text-center text-sm text-white">
              Conheça nossa loja online, onde você pode comprar nossos produtos
              e soluções de forma rápida e segura.
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Services

import Subtitle from "@/components/SubTitle"
import Image from "next/image"
import CardPartner from "./components/CardPartner"
import { dataPartners } from "./data/data-partner"

const SejaParceiro = () => {
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center bg-gradient-to-t from-[#cb0735] via-[#de6262] to-transparent p-4 text-center">
        <h1 className="my-5 text-3xl font-bold text-[#cb0735]">
          Que tal ser nosso parceiro?!
        </h1>
        <p className="text-lg">
          Aumente seu faturamento representando a{" "}
          <strong className="text-[#cb0735]">SSLARES</strong> na sua região.
        </p>
        <Image
          src="/image/partner.svg"
          alt="Parceiro"
          width={500}
          height={500}
        />
      </section>
      <section className="boxed p-4">
        <Subtitle>Como funciona</Subtitle>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          aspernatur culpa ut cumque expedita et sed laborum explicabo veniam
          quia, quisquam distinctio temporibus dolorum facilis. Commodi suscipit
          nobis aspernatur voluptates, error quae possimus quaerat perspiciatis
          ullam aut labore earum officiis illum sequi praesentium saepe odit
          nesciunt maxime ex omnis dolorem.
        </p>
      </section>

      <section className="boxed flex w-full flex-wrap items-center justify-center gap-4 lg:justify-between">
        {dataPartners.map((partner) => (
          <CardPartner key={partner.id} data={partner} />
        ))}
      </section>
    </main>
  )
}

export default SejaParceiro

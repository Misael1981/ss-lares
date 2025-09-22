import Subtitle from "@/components/SubTitle"
import CardPartner from "./components/CardPartner"
import { dataPartners } from "./data/data-partner"
import FormPartner from "./components/FormPartner"
import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"

const SejaParceiro = () => {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Que tal ser nosso parceiro?"
        description="Aumente seu faturamento representando a SSLARES na sua região."
        imageUrl="/image/partner.svg"
      />

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
      <section className="mt-6 p-4 lg:p-0">
        <FormPartner />
      </section>
      <Footer />
    </main>
  )
}

export default SejaParceiro

import Header from "@/components/Header"
import ProductsCarousel from "@/components/ProductsCarousel"
import WelcomeSection from "@/components/WelcomeSection"

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="p-5">
          <h3 className="text-xl">
            Ola, <strong>faça seu login</strong>
          </h3>
          <p className="text-gray-400">Sábado, 06 de Setembro de 2025</p>
        </div>
        <WelcomeSection />
        <ProductsCarousel />
      </main>
    </div>
  )
}

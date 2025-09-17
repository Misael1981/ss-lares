import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ProductsCarousel from "@/components/ProductsCarousel"
import Services from "@/components/Services"
import WelcomeSection from "@/components/WelcomeSection"

export default function Home() {
  return (
    <main>
      <WelcomeSection />
      <div className="boxed p-5">
        <h3 className="text-xl">
          Ola, <strong>faça seu login</strong>
        </h3>
        <p className="text-gray-400">Sábado, 06 de Setembro de 2025</p>
      </div>
      <ProductsCarousel />
      <Services />
      <Contact />
    </main>
  )
}

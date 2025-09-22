import Footer from "@/components/Footer"
import ProductsCarousel from "@/components/ProductsCarousel"
import Services from "@/components/Services"
import WelcomeSection from "@/components/WelcomeSection"
import WelcomeUser from "@/components/WelcomeUser"

export default function Home() {
  return (
    <main>
      <WelcomeSection />
      <WelcomeUser />
      <ProductsCarousel />
      <Services />
      <Footer />
    </main>
  )
}

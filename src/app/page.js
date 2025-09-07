import Header from "@/components/Header"
import WelcomeSection from "@/components/WelcomeSection"

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="p-5">
          <h3 className="text-xl">
            Ola, <strong>faça seu login</strong>
            <p>Sábado, 06 de Setembro de 2025</p>
          </h3>
        </div>
        <WelcomeSection />
      </main>
    </div>
  )
}

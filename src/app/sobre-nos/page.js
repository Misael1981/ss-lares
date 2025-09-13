import Contact from "@/components/Contact"
import Subtitle from "@/components/SubTitle"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const About = () => {
  return (
    <main>
      <div className="">
        <div className="relative aspect-[16/8] w-full overflow-hidden">
          <Image
            src="/image/about.png"
            alt="Sobre Nós"
            fill
            className="object-cover"
          />
        </div>
        <div className="boxed p-4">
          <Subtitle>Sobre nós</Subtitle>
          <h1 className="text-center text-3xl font-bold">
            Aqui vai um pedacinho da nosso história
          </h1>
        </div>
      </div>
      <div className="boxed p-4 text-center">
        <p>
          A Sslares é uma empresa familiar com sede em Minas gerais. Fabricamos
          produtos para atender o público da construção civil. Oferecemos
          soluções de alta qualidade que ajudam a reduzir custos e prazos. Nosso
          primeiro produto, o Espaçador/Nivelador de Piso, foi criado para
          atender a demanda do mercado de revestimentos e pisos , sendo
          utilizado juntamente com a cunha. Desde então, expandimos nossa linha
          de produtos. Iniciamos com a linha padrão feita no PP reciclado
          (cinza) e atualmente trabalhamos somente com o material Virgem
          (cristal) para os niveladores. Trazendo assim uma melhor qualidade
          para nossos clientes.
        </p>
        <p>
          Na SSLares, utilizamos apenas a melhor matéria-prima e tecnologia de
          ponta em nossos produtos. Nossa empresa está comprometida em fornecer
          soluções eficientes e de qualidade para nossos clientes. Em 2022,
          lançamos novos produtos para complementar nosso portfólio, incluindo
          Desempenadeiras Lisa, Corrugada e com Espuma; e Espaçadores para
          Ferragens. Continuamos a expandir nossa linha de produtos em 2023, a
          linha de Espaçadores Slim foi lançado oferecendo aos consumidores uma
          opção de menor custo.
        </p>
        <p>
          Em 2024 acrescentamos no nosso portfólio mais alguns produtos. Foi
          lançado o ralo oculto 10x10 e 15x15 sendo feito em diversas cores para
          melhor atender nossos clientes. Ainda no mesmo ano demos início a
          produção do ralo linear 6x50 também sendo feito em cores variadas.
        </p>
        <p>
          Na SSLares, nosso objetivo é fornecer soluções inovadoras e de
          qualidade que ajudem nossos clientes a economizar tempo e dinheiro em
          seus projetos de construção. Estamos comprometidos em oferecer o
          melhor atendimento e serviço, e estamos prontos para atender as
          necessidades provenientes do ramo da construção civil.
        </p>
      </div>
      <section className="boxed p-4">
        <div>
          <Subtitle>Nossa missão</Subtitle>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Card>
            <CardContent className="flex max-w-[270px] flex-col items-center justify-center gap-4 p-6">
              <Image
                src={"/image/mission.svg"}
                width={150}
                height={150}
                alt="Missão"
              />
              <h3 className="text-2xl font-bold">Missão</h3>
              <p className="text-center text-sm text-gray-500">
                Nossa missão é a ser uma empresa de maior credibilidade em nosso
                ramo, para que possamos atender às expectativas dos nossos
                clientes, satisfazendo suas necessidades. Ser reconhecida como
                uma empresa sólida e confiável.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex max-w-[300px] flex-col items-center justify-center gap-4 p-6">
              <Image
                src={"/image/vision.svg"}
                width={150}
                height={150}
                alt="Visão"
              />
              <h3 className="text-2xl font-bold">Visão</h3>
              <p className="text-center text-sm text-gray-500">
                Para que possamos atender às expectativas dos nossos clientes,
                satisfazendo suas necessidades. Ser reconhecida como uma empresa
                sólida e confiável.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex max-w-[300px] flex-col items-center justify-center gap-4 p-6">
              <Image
                src={"/image/values.svg"}
                width={150}
                height={150}
                alt="Valores"
              />
              <h3 className="text-2xl font-bold">Valores</h3>
              <p className="text-center text-sm text-gray-500">
                Respeitar normas da empresa e regras e leis dos mercados;
                Aprimorar a qualidade dos produtos, para que tenhamos uma
                melhoria contínua, e possamos superar nossos resultados.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex max-w-[300px] flex-col items-center justify-center gap-4 p-6">
              <Image
                src={"/image/guarantee.svg"}
                width={150}
                height={150}
                alt="Garantia"
              />
              <h3 className="text-2xl font-bold">Garantia</h3>
              <p className="text-center text-sm text-gray-500">
                Todos produtos possui obrigatoriamente um prazo de garantia
                legal de 30 (trinta) dias para defeitos em produtos não
                duráveis, e 90 (noventa) dias para produtos duráveis.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <Contact />
    </main>
  )
}

export default About

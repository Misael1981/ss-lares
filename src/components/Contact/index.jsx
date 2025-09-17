import Image from "next/image"
import Subtitle from "../SubTitle"
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa"

const midias = [
  {
    icon: (
      <FaWhatsapp
        size={24}
        className="text-green-500 transition-colors hover:text-green-600"
        aria-label="Conversar no WhatsApp"
      />
    ),
    name: "035 991972424",
    link: "https://wa.me/5535991972424",
  },
  {
    icon: (
      <FaEnvelope
        size={24}
        className="text-red-500 transition-colors hover:text-red-600"
        aria-label="Enviar email"
      />
    ),
    name: "sslaresmg@gmail.com",
    link: "mailto:sslaresmg@gmail.com",
  },
  {
    icon: (
      <FaLinkedin
        size={24}
        className="text-blue-600 transition-colors hover:text-blue-700"
        aria-label="Seguir no LinkedIn"
      />
    ),
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sslares/",
  },
  {
    icon: (
      <FaInstagram
        size={24}
        className="text-pink-600 transition-colors hover:text-pink-700"
        aria-label="Seguir no Instagram"
      />
    ),
    name: "Instagram",
    link: "https://www.instagram.com/sslares/",
  },
]

const Contact = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Subtitle>Contato</Subtitle>
      </div>
      <div className="w-full lg:flex lg:items-center lg:justify-center">
        <div className="relative h-[450px] w-[1023px] max-w-[100%] overflow-hidden">
          <Image
            src="/image/contact.jpg"
            alt="Contato"
            fill
            className="object-cover"
          />
          {/* Overlay para conteúdo sobre a imagem */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="flex h-[80%] flex-col items-center justify-around text-center text-white">
              <h3 className="mb-2 text-2xl font-bold">
                Entre em <strong className="text-[#cb0735]">contato</strong> e
                saiba mais sobre{" "}
                <strong className="text-[#cb0735]">nossas atualizações</strong>
              </h3>
              <div className="flex flex-col items-center justify-around gap-10 lg:flex-row">
                <div className="w-[250px]">
                  <h4 className="mb-2 text-xl font-semibold text-[#cb0735]">
                    Nossas Mídias
                  </h4>
                  <ul>
                    {midias.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-white transition-colors hover:text-[#cb0735]"
                        >
                          {item.icon}
                          <span className="text-lg">{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-[250px]">
                  <h4 className="mb-2 text-xl font-semibold text-[#cb0735]">
                    Nossa Localização
                  </h4>
                  <p className="text-lg">Rua José Ribeiro Coutinho, nº 499</p>
                  <p className="text-lg">Bairro Primavera</p>
                  <p className="text-lg">Congonhal, MG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[450px] w-[1023px] max-w-[100%] overflow-hidden">
          <Image
            src="/image/map.PNG"
            alt="Google map"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact

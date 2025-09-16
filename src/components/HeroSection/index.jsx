import Image from "next/image"

const HeroSection = ({ title, description, imageUrl }) => {
  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-t from-[#cb0735] via-[#de6262] to-transparent p-4 text-center lg:flex-row">
      <div className="max-w-[600px] flex-1">
        <h1 className="my-5 text-3xl font-bold text-[#cb0735] lg:text-start lg:text-5xl">
          {title}
        </h1>
        <p className="text-lg lg:text-start lg:text-xl">{description}</p>
      </div>
      <Image src={imageUrl} alt="Parceiro" width={500} height={500} />
    </section>
  )
}

export default HeroSection

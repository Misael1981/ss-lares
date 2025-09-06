import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

const WelcomeSection = () => {
  return (
    <section>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/image/home1-mobile.webp"
              alt="Welcome"
              width={600}
              height={400}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/image/home2-mobile.webp"
              alt="Welcome"
              width={600}
              height={400}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/image/home3-mobile.webp"
              alt="Welcome"
              width={600}
              height={400}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/image/home4-mobile.webp"
              alt="Welcome"
              width={600}
              height={400}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/image/home5-mobile.webp"
              alt="Welcome"
              width={600}
              height={400}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default WelcomeSection

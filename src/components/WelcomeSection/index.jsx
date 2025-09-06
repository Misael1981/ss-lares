"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

const WelcomeSection = () => {
  const [api, setApi] = useState()
  const [isPlaying, setIsPlaying] = useState(true)

  // Autoplay functionality
  useEffect(() => {
    if (!api || !isPlaying) {
      return
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 4000) // 4 segundos

    return () => clearInterval(interval)
  }, [api, isPlaying])

  return (
    <section>
      <Carousel
        setApi={setApi}
        onMouseEnter={() => setIsPlaying(false)} // Pausa no hover
        onMouseLeave={() => setIsPlaying(true)} // Resume quando sai o mouse
      >
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

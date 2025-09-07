"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useEffect, useState } from "react"

const CardWelcome = ({ banners }) => {
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
    <Carousel
      setApi={setApi}
      onMouseEnter={() => setIsPlaying(false)} // Pausa no hover
      onMouseLeave={() => setIsPlaying(true)} // Resume quando sai o mouse
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Image
              src={banner.imageUrl}
              alt={banner.title || "Banner"}
              width={600}
              height={400}
              priority={banner.order === 1} // Primeira imagem com priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CardWelcome

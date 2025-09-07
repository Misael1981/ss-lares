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

  // Verificação de segurança
  if (!banners || banners.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center bg-gray-100">
        <p className="text-gray-500">Nenhum banner encontrado</p>
      </div>
    )
  }

  return (
    <Carousel
      setApi={setApi}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <CarouselContent>
        {banners.map((banner) => {
          // Verificação adicional para cada banner
          if (
            !banner.imageMobile ||
            !banner.imageTablet ||
            !banner.imageDesktop ||
            !banner.imageLaptop
          ) {
            return null
          }

          return (
            <CarouselItem key={banner.id} className="relative">
              {/* Mobile */}
              <Image
                src={banner.imageMobile}
                alt={banner.title || "Banner"}
                width={640}
                height={400}
                className="block h-auto w-full sm:hidden"
                priority={banner.order === 1}
              />

              {/* Tablet */}
              <Image
                src={banner.imageTablet}
                alt={banner.title || "Banner"}
                width={1024}
                height={576}
                className="hidden h-auto w-full sm:block lg:hidden"
                priority={banner.order === 1}
              />

              {/* Laptop */}
              <Image
                src={banner.imageDesktop}
                alt={banner.title || "Banner"}
                width={1440}
                height={720}
                className="hidden h-auto w-full lg:block xl:hidden"
                priority={banner.order === 1}
              />

              {/* Desktop */}
              <Image
                src={banner.imageLaptop}
                alt={banner.title || "Banner"}
                width={1920}
                height={720}
                className="hidden h-auto w-full xl:block"
                priority={banner.order === 1}
              />
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}

export default CardWelcome

"use client"

import Autoplay from "embla-carousel-autoplay"
import CardProduct from "../CardProduct"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import { useState } from "react"

const ProductsCarouselClient = ({ products }) => {
  const [api, setApi] = useState()
  return (
    <Carousel
      className="w-full max-w-full"
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 3000, // 3 segundos
          stopOnInteraction: true, // Para quando usuário interage
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-auto pl-2 md:pl-4">
            <CardProduct products={[product]} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ProductsCarouselClient

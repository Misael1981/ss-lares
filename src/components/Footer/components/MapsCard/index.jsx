"use client"

import { Loader } from "@googlemaps/js-api-loader"
import { useEffect, useRef, useState } from "react"

const MapsCard = ({ address = "SS Lares", lat = -18.9146, lng = -48.2754 }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places"],
        })

        const { Map } = await loader.importLibrary("maps")
        const { Marker } = await loader.importLibrary("marker")

        const position = { lat, lng }

        const mapInstance = new Map(mapRef.current, {
          center: position,
          zoom: 15,
          // 🔥 CONFIGURAÇÕES IMPORTANTES
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
        })

        new Marker({
          position: position,
          map: mapInstance,
          title: address,
        })

        setMap(mapInstance)
      } catch (error) {
        console.error("Erro ao carregar Google Maps:", error)
      }
    }

    if (mapRef.current) {
      initMap()
    }
  }, [address, lat, lng])

  // 🚀 TRIGGER RESIZE QUANDO O CONTAINER MUDA
  useEffect(() => {
    if (map) {
      const handleResize = () => {
        google.maps.event.trigger(map, "resize")
        map.setCenter({ lat, lng })
      }

      // Trigger resize após um pequeno delay
      const timeoutId = setTimeout(handleResize, 100)

      // Listener para mudanças de tamanho da janela
      window.addEventListener("resize", handleResize)

      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [map, lat, lng])

  return (
    <div className="h-[200px] w-full overflow-hidden rounded-lg border">
      <div
        ref={mapRef}
        className="h-full w-full"
        style={{ minHeight: "200px" }}
      />
    </div>
  )
}

export default MapsCard

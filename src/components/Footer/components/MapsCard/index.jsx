"use client"

import { Loader } from "@googlemaps/js-api-loader"
import { useEffect, useRef, useState } from "react"

const MapsCard = ({
  address = "Rua José Ribeiro Coutinho, 499, Bairro Primavera, Congonhal, MG, Brasil",
}) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const centerRef = useRef({ lat: -22.1508, lng: -45.8611 }) // fallback Congonhal/MG

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

        const geocoder = new google.maps.Geocoder()

        geocoder.geocode({ address }, (results, status) => {
          let position = centerRef.current

          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location
            position = { lat: location.lat(), lng: location.lng() }
            centerRef.current = position
          } else {
            console.error("Geocoding falhou:", status)
          }

          const mapInstance = new Map(mapRef.current, {
            center: position,
            zoom: 16,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          })

          new Marker({
            position,
            map: mapInstance,
            title: address,
          })

          setMap(mapInstance)
        })
      } catch (error) {
        console.error("Erro ao carregar Google Maps:", error)
      }
    }

    if (mapRef.current) {
      initMap()
    }
  }, [address])

  // 🔥 Mantém mapa responsivo no resize
  useEffect(() => {
    if (map) {
      const handleResize = () => {
        google.maps.event.trigger(map, "resize")
        map.setCenter(centerRef.current)
      }

      const timeoutId = setTimeout(handleResize, 200)
      window.addEventListener("resize", handleResize)

      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [map])

  return (
    <div className="h-[200px] w-full overflow-hidden rounded-lg border">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}

export default MapsCard

"use client"

import Image from "next/image"
import { Download } from "lucide-react"
import { useState } from "react"

const CatalogPdf = () => {
  const [loading, setLoading] = useState(false)

  const baixarPDF = async () => {
    setLoading(true)

    try {
      // Linha 15: Trocar "/api/catalog" por "/api/catalogo"
      const response = await fetch("/api/catalogo")
      
      if (!response.ok) {
        throw new Error('Erro na requisição')
      }
      
      const catalog = await response.json()

      if (catalog.fileUrl) {
        // 🎯 Criar link de download
        const link = document.createElement("a")
        link.href = catalog.fileUrl
        link.download = `${catalog.title || "Catálogo-SSLares"}.pdf`
        link.target = "_blank"

        // 🎯 Simular clique
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        console.log("📄 Download iniciado!")
      } else {
        alert("Catálogo não disponível no momento")
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao baixar catálogo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex aspect-square w-[330px] max-w-[100%] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-brand-red p-5 transition-transform hover:scale-105"
      onClick={baixarPDF}
    >
      <Image
        src="/image/documents.svg"
        width={150}
        height={150}
        alt="Catálogo PDF"
      />
      <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
        Baixe nosso Catálogo
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        ) : (
          <Download className="h-5 w-5" />
        )}
      </h3>
      <p className="text-center text-sm text-white">
        {loading
          ? "Preparando download..."
          : "Conheça todo nosso portfólio de produtos e soluções."}
      </p>
    </div>
  )
}

export default CatalogPdf

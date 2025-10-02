"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, Image as ImageIcon, Plus } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export default function MultiImageUpload({ 
  label, 
  images = [], 
  onChange, 
  maxImages = 5 
}) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return

    const remainingSlots = maxImages - images.length
    if (remainingSlots <= 0) {
      toast.error(`Máximo de ${maxImages} imagens permitidas`)
      return
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots)
    setUploading(true)
    
    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} não é uma imagem válida`)
        }

        // Validar tamanho (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} é muito grande (máx 5MB)`)
        }

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Erro no upload de ${file.name}`)
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      const newImages = [...images, ...uploadedUrls]
      onChange(newImages)
      
      toast.success(`${uploadedUrls.length} imagem(ns) enviada(s) com sucesso!`)
      
    } catch (error) {
      console.error('Erro no upload:', error)
      toast.error(error.message || 'Erro ao enviar imagens')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files) {
      handleFileUpload(e.target.files)
    }
  }

  const removeImage = (indexToRemove) => {
    const newImages = images.filter((_, index) => index !== indexToRemove)
    onChange(newImages)
  }

  const moveImage = (fromIndex, toIndex) => {
    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <Label>{label} ({images.length}/{maxImages})</Label>
      
      {/* Grid de imagens atuais */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-24 border rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={imageUrl}
                  alt={`Produto ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-1">
                {index === 0 ? 'Principal' : `${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Área de upload */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-600">Enviando imagens...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Arraste imagens aqui ou clique para selecionar
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Máximo {maxImages} imagens • Até 5MB cada
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="product-images"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('product-images').click()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Imagens
              </Button>
            </div>
          )}
        </div>
      )}

      {images.length >= maxImages && (
        <p className="text-sm text-amber-600 text-center">
          Limite máximo de {maxImages} imagens atingido
        </p>
      )}
    </div>
  )
}
"use client"

import { useState, useRef } from "react"
import { Upload, X, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function UserImageUpload({ 
  currentImage, 
  onImageChange, 
  onImageUrlChange,
  disabled = false 
}) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [imageUrl, setImageUrl] = useState(currentImage || "")
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const validateFile = (file) => {
    // Verificar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error("Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.")
      return false
    }

    // Verificar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error("Arquivo muito grande. Máximo 5MB.")
      return false
    }

    return true
  }

  const handleFile = async (file) => {
    if (!validateFile(file) || disabled) return

    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'users')

      // Simular progresso
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error('Erro no upload')
      }

      const data = await response.json()
      
      if (data.success) {
        setImageUrl(data.url)
        onImageChange?.(data.url)
        toast.success("Imagem enviada com sucesso!")
      } else {
        throw new Error(data.error || 'Erro no upload')
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      toast.error("Erro ao enviar imagem: " + error.message)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleUrlChange = (url) => {
    setImageUrl(url)
    onImageUrlChange?.(url)
  }

  const removeImage = () => {
    setImageUrl("")
    onImageChange?.("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <Label>Foto do Usuário</Label>
      
      {/* Preview da imagem */}
      {imageUrl && (
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-full border-2 border-gray-200"
            onError={(e) => {
              e.target.style.display = 'none'
              toast.error("Erro ao carregar imagem")
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={removeImage}
            disabled={disabled}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Área de upload */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin mx-auto h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full" />
            <p className="text-sm text-gray-600">Enviando... {uploadProgress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {imageUrl ? (
              <User className="mx-auto h-8 w-8 text-green-500" />
            ) : (
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
            )}
            <div>
              <p className="text-sm font-medium">
                {imageUrl ? "Clique para alterar a imagem" : "Clique para enviar ou arraste uma imagem"}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, WebP até 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input manual de URL */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-sm">
          Ou insira uma URL da imagem:
        </Label>
        <div className="flex gap-2">
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            disabled={disabled}
            className="flex-1"
          />
          {imageUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeImage}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Aviso sobre validação */}
      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-amber-700">
          <p className="font-medium">Dicas para melhor qualidade:</p>
          <ul className="mt-1 space-y-1">
            <li>• Use imagens quadradas (1:1) para melhor resultado</li>
            <li>• Resolução mínima recomendada: 200x200px</li>
            <li>• Evite imagens muito escuras ou com pouco contraste</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
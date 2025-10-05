'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Upload, FileText, X } from 'lucide-react'

export default function CatalogUpload({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file) => {
    if (file.type !== 'application/pdf') {
      alert('Por favor, selecione apenas arquivos PDF')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      alert('Arquivo muito grande. Máximo 10MB')
      return
    }

    setFormData(prev => ({ ...prev, file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.file || !formData.title) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Upload do arquivo
      const uploadFormData = new FormData()
      uploadFormData.append('file', formData.file)
      uploadFormData.append('folder', 'catalogs')

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const uploadResult = await uploadResponse.json()
      setUploadProgress(50)

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Erro no upload')
      }

      // Criar catálogo no banco
      const catalogData = {
        title: formData.title,
        description: formData.description,
        fileUrl: uploadResult.url,
        fileName: formData.file.name,
        isActive: true
      }

      const catalogResponse = await fetch('/api/catalogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catalogData),
      })

      const catalogResult = await catalogResponse.json()
      setUploadProgress(100)

      if (catalogResult.success) {
        onSuccess(catalogResult.catalog)
        setFormData({ title: '', description: '', file: null })
      } else {
        throw new Error(catalogResult.error || 'Erro ao criar catálogo')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao fazer upload: ' + error.message)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título do Catálogo *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Ex: Catálogo SSLares 2025"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Descrição do catálogo"
          />
        </div>
      </div>

      {/* Upload Area */}
      <div>
        <Label>Arquivo PDF *</Label>
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${formData.file ? 'border-green-500 bg-green-50' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {formData.file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="font-medium">{formData.file.name}</p>
                <p className="text-sm text-gray-500">
                  {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, file: null }))}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">
                Arraste o PDF aqui ou clique para selecionar
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Apenas arquivos PDF até 10MB
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <Button type="button" variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Selecionar Arquivo
                </label>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Fazendo upload...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isUploading || !formData.file || !formData.title}>
          {isUploading ? 'Enviando...' : 'Adicionar Catálogo'}
        </Button>
      </div>
    </form>
  )
}
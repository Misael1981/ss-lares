'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Upload,
  Trash2,
  Save,
  Plus,
} from 'lucide-react'
import CatalogUpload from './CatalogUpload'

export default function CompanyManager({ initialCompanyInfo, initialCatalogs }) {
  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo || {
    name: 'SS Lares',
    email: '',
    social: {},
    phones: [],
    address: null
  })
  const [catalogs, setCatalogs] = useState(initialCatalogs || [])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('empresa')

  // ✅ ATUALIZAR DADOS DA EMPRESA
  const handleUpdateCompany = async (formData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setCompanyInfo(result.company)
        toast.success('Dados da empresa atualizados!')
      } else {
        toast.error(result.error || 'Erro ao atualizar dados')
      }
    } catch (error) {
      toast.error('Erro ao atualizar dados da empresa')
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ DELETAR CATÁLOGO
  const handleDeleteCatalog = async (catalogId) => {
    if (!confirm('Tem certeza que deseja deletar este catálogo?')) return

    try {
      const response = await fetch(`/api/catalogs/${catalogId}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        setCatalogs(prev => prev.filter(cat => cat.id !== catalogId))
        toast.success('Catálogo deletado!')
      } else {
        toast.error(result.error || 'Erro ao deletar catálogo')
      }
    } catch (error) {
      toast.error('Erro ao deletar catálogo')
    }
  }

  // ✅ TOGGLE STATUS CATÁLOGO
  const handleToggleCatalogStatus = async (catalogId, isActive) => {
    try {
      const response = await fetch(`/api/catalogs/${catalogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })

      const result = await response.json()

      if (result.success) {
        setCatalogs(prev => 
          prev.map(cat => 
            cat.id === catalogId 
              ? { ...cat, isActive: !isActive }
              : cat
          )
        )
        toast.success(`Catálogo ${!isActive ? 'ativado' : 'desativado'}!`)
      } else {
        toast.error(result.error || 'Erro ao atualizar status')
      }
    } catch (error) {
      toast.error('Erro ao atualizar status do catálogo')
    }
  }

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'empresa' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('empresa')}
          className="flex items-center gap-2"
        >
          <Building2 className="w-4 h-4" />
          Dados da Empresa
        </Button>
        <Button
          variant={activeTab === 'catalogos' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('catalogos')}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Catálogos
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'empresa' && (
        <CompanyInfoForm 
          companyInfo={companyInfo}
          onUpdate={handleUpdateCompany}
          isLoading={isLoading}
        />
      )}

      {activeTab === 'catalogos' && (
          <div className="grid gap-6">
            {/* Upload de Novo Catálogo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Adicionar Novo Catálogo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CatalogUpload 
                  onSuccess={(newCatalog) => {
                    setCatalogs(prev => [newCatalog, ...prev])
                    toast.success('Catálogo adicionado!')
                  }}
                />
              </CardContent>
            </Card>

            {/* Lista de Catálogos */}
            <Card>
              <CardHeader>
                <CardTitle>Catálogos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                {catalogs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum catálogo encontrado</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {catalogs.map((catalog) => (
                      <div
                        key={catalog.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-red-500" />
                            <div>
                              <h3 className="font-medium">{catalog.title}</h3>
                              {catalog.description && (
                                <p className="text-sm text-gray-600">
                                  {catalog.description}
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                {catalog.fileName}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={catalog.isActive ? 'default' : 'secondary'}
                          >
                            {catalog.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(catalog.fileUrl, '_blank')}
                          >
                            Ver PDF
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleCatalogStatus(catalog.id, catalog.isActive)}
                          >
                            {catalog.isActive ? 'Desativar' : 'Ativar'}
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCatalog(catalog.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
      )}
    </div>
  )
}

// ✅ COMPONENTE FORMULÁRIO DA EMPRESA
function CompanyInfoForm({ companyInfo, onUpdate, isLoading }) {
  const [formData, setFormData] = useState({
    name: companyInfo?.name || 'SS Lares',
    email: companyInfo?.email || '',
    social: companyInfo?.social || {},
    phones: companyInfo?.phones || [],
    address: companyInfo?.address || {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
  }

  const addPhone = () => {
    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, { label: '', contactName: '', number: '' }]
    }))
  }

  const updatePhone = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.map((phone, i) => 
        i === index ? { ...phone, [field]: value } : phone
      )
    }))
  }

  const removePhone = (index) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              value={formData.social?.instagram || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                social: { ...prev.social, instagram: e.target.value }
              }))}
              placeholder="https://www.instagram.com/sslaresmg1/"
            />
          </div>
        </CardContent>
      </Card>

      {/* Telefones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Telefones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.phones.map((phone, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Setor</Label>
                <Input
                  value={phone.label}
                  onChange={(e) => updatePhone(index, 'label', e.target.value)}
                  placeholder="Ex: Vendas"
                />
              </div>
              <div>
                <Label>Contato</Label>
                <Input
                  value={phone.contactName}
                  onChange={(e) => updatePhone(index, 'contactName', e.target.value)}
                  placeholder="Ex: João"
                />
              </div>
              <div>
                <Label>Número</Label>
                <Input
                  value={phone.number}
                  onChange={(e) => updatePhone(index, 'number', e.target.value)}
                  placeholder="Ex: +5535999999999"
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removePhone(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button type="button" variant="outline" onClick={addPhone}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Telefone
          </Button>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Endereço
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                value={formData.address?.street || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, street: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={formData.address?.number || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, number: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={formData.address?.neighborhood || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, neighborhood: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.address?.city || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, city: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                value={formData.address?.state || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, state: e.target.value }
                }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              value={formData.address?.zipCode || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                address: { ...prev.address, zipCode: e.target.value }
              }))}
              placeholder="00000-000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  )
}
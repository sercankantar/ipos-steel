'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Target, Eye } from 'lucide-react'
import { toast } from 'sonner'
import CertificatesManager from '@/components/CertificatesManager'
import ReferencesManager from '@/components/ReferencesManager'
import RichTextEditor from '@/components/ui/RichTextEditor'

interface CorporateMediaProduct {
  id: string
  title: string
  description?: string
  imageUrl?: string
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface MissionVision {
  id: string
  mission: string
  vision: string
  missionImageUrl?: string
  missionImagePublicId?: string
  visionImageUrl?: string
  visionImagePublicId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function KurumsalIslemler() {
  const [products, setProducts] = useState<CorporateMediaProduct[]>([])
  const [missionVision, setMissionVision] = useState<MissionVision | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'missionVision' | 'about' | 'certificates' | 'references'>('missionVision')
  const [editingProduct, setEditingProduct] = useState<CorporateMediaProduct | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'kurumsal'
  })
  const [missionVisionData, setMissionVisionData] = useState({
    mission: '',
    vision: ''
  })
  const [missionImagePreview, setMissionImagePreview] = useState<string | null>(null)
  const [visionImagePreview, setVisionImagePreview] = useState<string | null>(null)
  const [missionImageFile, setMissionImageFile] = useState<File | null>(null)
  const [visionImageFile, setVisionImageFile] = useState<File | null>(null)
  const missionInputRef = useRef<HTMLInputElement | null>(null)
  const visionInputRef = useRef<HTMLInputElement | null>(null)
  const [aboutData, setAboutData] = useState({ title: '', description: '' })
  const [aboutImagePreview, setAboutImagePreview] = useState<string | null>(null)
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null)
  const aboutInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchMissionVision()
    fetchAbout()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      // Sadece kurumsal kategorisindeki ürünleri filtrele
      const kurumsalProducts = data.filter((product: CorporateMediaProduct) => product.category === 'kurumsal')
      setProducts(kurumsalProducts)
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMissionVision = async () => {
    try {
      const response = await fetch('/api/admin/mission-vision')
      const data = await response.json()
      setMissionVision(data)
      if (data) {
        setMissionVisionData({
          mission: data.mission,
          vision: data.vision
        })
      }
    } catch (error) {
      console.error('Misyon-vizyon yüklenirken hata:', error)
    }
  }

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/about')
      if (!res.ok) return
      const data = await res.json()
      if (data) {
        setAboutData({ title: data.title || '', description: data.description || '' })
        if (data.imageUrl) setAboutImagePreview(data.imageUrl)
      }
    } catch (error) {
      console.error('Hakkımızda yüklenirken hata:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchProducts()
        resetForm()
      }
    } catch (error) {
      console.error('Ürün kaydedilirken hata:', error)
    }
  }

  const handleEdit = (product: CorporateMediaProduct) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      category: product.category
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/products/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchProducts()
        }
      } catch (error) {
        console.error('Ürün silinirken hata:', error)
      }
    }
  }

  const handleMissionVisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Upload images if selected
      let missionUpload: { secure_url: string; public_id: string } | null = null
      let visionUpload: { secure_url: string; public_id: string } | null = null

      if (missionImageFile) {
        const fd = new FormData()
        fd.append('file', missionImageFile)
        fd.append('folder', 'ipos-steel/mission-vision')
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (res.ok) missionUpload = await res.json()
      }

      if (visionImageFile) {
        const fd = new FormData()
        fd.append('file', visionImageFile)
        fd.append('folder', 'ipos-steel/mission-vision')
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (res.ok) visionUpload = await res.json()
      }

      const response = await fetch('/api/admin/mission-vision', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...missionVisionData,
          missionImageUrl: missionUpload?.secure_url,
          missionImagePublicId: missionUpload?.public_id,
          visionImageUrl: visionUpload?.secure_url,
          visionImagePublicId: visionUpload?.public_id,
        }),
      })

      if (response.ok) {
        fetchMissionVision()
        toast.success('Misyon-Vizyon başarıyla güncellendi')
      }
    } catch (error) {
      console.error('Misyon-vizyon kaydedilirken hata:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'kurumsal'
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Kurumsal İşlemler
        </h1>
        <p className="text-gray-600">
          Kurumsal içeriklerini yönetin
        </p>
      </div>

      <div className="mb-6 flex items-center gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-2 min-w-max [::-webkit-scrollbar]:hidden">
        <button
          onClick={() => setActiveTab('missionVision')}
          className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
            activeTab === 'missionVision' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Misyon & Vizyon
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
            activeTab === 'about' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Hakkımızda
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
            activeTab === 'certificates' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Sertifikalar
        </button>
        <button
          onClick={() => setActiveTab('references')}
          className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
            activeTab === 'references' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Referanslar
        </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Kurumsal İçerik Düzenle' : 'Yeni Kurumsal İçerik Ekle'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="imageUrl">Resim URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
            
            <div className="flex space-x-4">
              <Button type="submit">
                {editingProduct ? 'Güncelle' : 'Ekle'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                İptal
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'missionVision' && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Misyon-Vizyon Düzenle
          </h2>
          <form onSubmit={handleMissionVisionSubmit} className="space-y-12">
            <div>
              <Label htmlFor="mission">Misyon</Label>
              <RichTextEditor
                value={missionVisionData.mission}
                onChange={(value) => setMissionVisionData({ ...missionVisionData, mission: value })}
                placeholder="Misyon yazısını girin..."
                height={200}
              />
              <div className="mt-12">
                <Label>Misyon Görseli</Label>
                <div className="mt-6 flex items-center gap-3">
                  <input
                    ref={missionInputRef}
                    id="missionImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null
                      setMissionImageFile(f)
                      setMissionImagePreview(f ? URL.createObjectURL(f) : null)
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => missionInputRef.current?.click()}>
                    Görsel Seç
                  </Button>
                  {missionImageFile ? (
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {missionImageFile.name}
                    </span>
                  ) : missionVision?.missionImageUrl ? (
                    <span className="text-sm text-gray-600">Mevcut görsel yüklü</span>
                  ) : (
                    <span className="text-sm text-gray-400">Seçili görsel yok</span>
                  )}
                  {(missionImagePreview || missionVision?.missionImageUrl) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setMissionImageFile(null)
                        setMissionImagePreview(null)
                        if (missionInputRef.current) missionInputRef.current.value = ''
                      }}
                      className="ml-auto"
                    >
                      Kaldır
                    </Button>
                  )}
                </div>
                {(missionImagePreview || missionVision?.missionImageUrl) && (
                  <img
                    src={missionImagePreview || missionVision?.missionImageUrl || ''}
                    alt="Misyon Görseli"
                    className="mt-4 h-28 w-28 object-cover rounded border"
                  />
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="vision">Vizyon</Label>
              <RichTextEditor
                value={missionVisionData.vision}
                onChange={(value) => setMissionVisionData({ ...missionVisionData, vision: value })}
                placeholder="Vizyon yazısını girin..."
                height={200}
              />
              <div className="mt-12">
                <Label>Vizyon Görseli</Label>
                <div className="mt-6 flex items-center gap-3">
                  <input
                    ref={visionInputRef}
                    id="visionImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null
                      setVisionImageFile(f)
                      setVisionImagePreview(f ? URL.createObjectURL(f) : null)
                    }}
                  />
                  <Button type="button" variant="outline" onClick={() => visionInputRef.current?.click()}>
                    Görsel Seç
                  </Button>
                  {visionImageFile ? (
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {visionImageFile.name}
                    </span>
                  ) : missionVision?.visionImageUrl ? (
                    <span className="text-sm text-gray-600">Mevcut görsel yüklü</span>
                  ) : (
                    <span className="text-sm text-gray-400">Seçili görsel yok</span>
                  )}
                  {(visionImagePreview || missionVision?.visionImageUrl) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setVisionImageFile(null)
                        setVisionImagePreview(null)
                        if (visionInputRef.current) visionInputRef.current.value = ''
                      }}
                      className="ml-auto"
                    >
                      Kaldır
                    </Button>
                  )}
                </div>
                {(visionImagePreview || missionVision?.visionImageUrl) && (
                  <img
                    src={visionImagePreview || missionVision?.visionImageUrl || ''}
                    alt="Vizyon Görseli"
                    className="mt-4 h-28 w-28 object-cover rounded border"
                  />
                )}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button type="submit">
                Güncelle
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Hakkımızda Düzenle</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              try {
                let upload: { secure_url: string; public_id: string } | null = null
                if (aboutImageFile) {
                  const fd = new FormData()
                  fd.append('file', aboutImageFile)
                  fd.append('folder', 'ipos-steel/about')
                  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
                  if (res.ok) upload = await res.json()
                }

                const res = await fetch('/api/admin/about', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    title: aboutData.title,
                    description: aboutData.description,
                    imageUrl: upload?.secure_url,
                    imagePublicId: upload?.public_id,
                  })
                })
                if (res.ok) toast.success('Hakkımızda güncellendi')
              } catch (err) {
                console.error(err)
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="aboutTitle">Başlık</Label>
              <Input
                id="aboutTitle"
                value={aboutData.title}
                onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="aboutDesc">Açıklama</Label>
              <textarea
                id="aboutDesc"
                value={aboutData.description}
                onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
            <div>
              <Label>Şirket Fotoğrafı</Label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  ref={aboutInputRef}
                  id="aboutImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setAboutImageFile(f)
                    setAboutImagePreview(f ? URL.createObjectURL(f) : aboutImagePreview)
                  }}
                />
                <Button type="button" variant="outline" onClick={() => aboutInputRef.current?.click()}>
                  Görsel Seç
                </Button>
                {aboutImageFile ? (
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">{aboutImageFile.name}</span>
                ) : aboutImagePreview ? (
                  <span className="text-sm text-gray-600">Mevcut görsel yüklü</span>
                ) : (
                  <span className="text-sm text-gray-400">Seçili görsel yok</span>
                )}
                {aboutImagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setAboutImageFile(null)
                      setAboutImagePreview(null)
                      if (aboutInputRef.current) aboutInputRef.current.value = ''
                    }}
                    className="ml-auto"
                  >
                    Kaldır
                  </Button>
                )}
              </div>
              {aboutImagePreview && (
                <img src={aboutImagePreview} alt="Hakkımızda Görseli" className="mt-2 h-28 w-28 object-cover rounded border" />
              )}
            </div>
            <div className="flex gap-4">
              <Button type="submit">Güncelle</Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'certificates' && (
        <CertificatesManager />
      )}

      {activeTab === 'references' && (
        <ReferencesManager />
      )}


      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
        </div>
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <div key={product.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{product.title}</h4>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {product.imageUrl && (
                <div className="mt-4">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-32 w-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus, Building, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { generateSlug, createUniqueSlug } from '@/lib/slug'

interface Reference {
  id: string
  name: string
  sector: string
  logoUrl?: string
  logoPublicId?: string
  
  // Proje detayları
  title?: string
  excerpt?: string
  content?: string
  category?: string
  location?: string
  client?: string
  projectValue?: string
  duration?: string
  
  // SEO
  slug?: string
  
  // Görsel içerik
  mainImage?: string
  mainImagePublicId?: string
  gallery?: string[]
  galleryPublicIds?: string[]
  
  // Metadata
  tags?: string[]
  featured?: boolean
  views?: number

  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ReferenceCategory {
  id: string
  name: string
  color: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function ReferencesManager() {
  const [items, setItems] = useState<Reference[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Reference | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  
  // Kategori yönetimi
  const [categories, setCategories] = useState<ReferenceCategory[]>([])
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('bg-blue-100 text-blue-800')
  const [form, setForm] = useState({ 
    name: '', 
    sector: '', 
    title: '',
    excerpt: '',
    content: '',
    category: '',
    location: '',
    client: '',
    projectValue: '',
    duration: '',
    tags: '',
    featured: false,
    isActive: true 
  })
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement | null>(null)
  const mainImageRef = useRef<HTMLInputElement | null>(null)
  const galleryRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { 
    fetchAll()
    fetchCategories()
  }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/admin/references')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/reference-categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(Array.isArray(data) ? data : [])
      } else {
        console.error('Categories fetch failed:', res.status)
        setCategories([])
      }
    } catch (e) {
      console.error('Categories fetch error:', e)
      setCategories([])
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Form validation
      if (!form.name.trim()) {
        toast.error('Şirket adı gerekli')
        return
      }
      if (!form.sector.trim()) {
        toast.error('Sektör gerekli')
        return
      }

      // Konum validation - eğer konum girilmişse virgül kontrolü
      if (form.location && form.location.trim()) {
        const locationParts = form.location.split(',')
        if (locationParts.length < 2 || locationParts.some(part => !part.trim())) {
          toast.error('İl ve Ülke yazılırken araya , konulmalıdır (Örn: Manisa, Turkey)')
          return
        }
      }

      // Slug oluştur
      const titleForSlug = form.title || form.name
      if (!titleForSlug.trim()) {
        toast.error('Proje başlığı veya şirket adı gerekli')
        return
      }
      
      const baseSlug = generateSlug(titleForSlug)
      const existingSlugs = items.map(item => item.slug).filter(Boolean) as string[]
      const uniqueSlug = createUniqueSlug(baseSlug, existingSlugs)

      // Logo upload
      let logoUpload: { secure_url: string; public_id: string } | null = null
      if (logo) {
        const fd = new FormData()
        fd.append('file', logo)
        fd.append('folder', 'ipos-steel/references/logos')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) logoUpload = await up.json()
      }

      // Main image upload
      let mainImageUpload: { secure_url: string; public_id: string } | null = null
      if (mainImage) {
        const fd = new FormData()
        fd.append('file', mainImage)
        fd.append('folder', 'ipos-steel/references/main-images')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) mainImageUpload = await up.json()
      }

      // Gallery images upload
      const galleryUploads: { secure_url: string; public_id: string }[] = []
      for (const image of galleryImages) {
        const fd = new FormData()
        fd.append('file', image)
        fd.append('folder', 'ipos-steel/references/gallery')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) {
          const uploadResult = await up.json()
          galleryUploads.push(uploadResult)
        }
      }

      // Process tags
      const tagsArray = form.tags ? form.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

      const payload: any = {
        name: form.name,
        sector: form.sector,
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        location: form.location,
        client: form.client,
        projectValue: form.projectValue,
        duration: form.duration,
        slug: editing ? editing.slug : uniqueSlug, // Düzenlemede mevcut slug'ı koru, yenide unique slug kullan
        tags: tagsArray,
        featured: form.featured,
        isActive: form.isActive,
        logoUrl: logoUpload?.secure_url || editing?.logoUrl,
        logoPublicId: logoUpload?.public_id || editing?.logoPublicId,
        mainImage: mainImageUpload?.secure_url || editing?.mainImage,
        mainImagePublicId: mainImageUpload?.public_id || editing?.mainImagePublicId,
        gallery: galleryUploads.length > 0 ? galleryUploads.map(u => u.secure_url) : editing?.gallery || [],
        galleryPublicIds: galleryUploads.length > 0 ? galleryUploads.map(u => u.public_id) : editing?.galleryPublicIds || [],
      }

      const res = await fetch(editing ? `/api/admin/references/${editing.id}` : '/api/admin/references', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        toast.success(editing ? 'Referans güncellendi' : 'Referans eklendi')
        setFormOpen(false)
        setEditing(null)
        setForm({ 
          name: '', 
          sector: '', 
          title: '',
          excerpt: '',
          content: '',
          category: '',
          location: '',
          client: '',
          projectValue: '',
          duration: '',
          tags: '',
          featured: false,
          isActive: true 
        })
        setLogo(null)
        setLogoPreview(null)
        setMainImage(null)
        setMainImagePreview(null)
        setGalleryImages([])
        setGalleryPreviews([])
        await fetchAll()
      } else {
        const errorData = await res.json()
        console.error('API Error:', errorData)
        toast.error(errorData.error || 'Kaydetme hatası')
      }
    } catch (e) {
      console.error(e)
      toast.error('Bir hata oluştu')
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Bu referansı silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/references/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Referans silindi')
      await fetchAll()
    }
  }

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Kategori adı gerekli')
      return
    }

    try {
      const res = await fetch('/api/admin/reference-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCategoryName.trim(),
          color: newCategoryColor
        })
      })

      if (res.ok) {
        toast.success('Kategori eklendi')
        setNewCategoryName('')
        setNewCategoryColor('bg-blue-100 text-blue-800')
        setCategoryFormOpen(false)
        await fetchCategories()
        // Referans formundaki dropdown'ı da güncellemek için
        if (formOpen) {
          await fetchCategories()
        }
      } else {
        const error = await res.json()
        toast.error(error.error || 'Kategori eklenirken hata oluştu')
      }
    } catch (error) {
      console.error(error)
      toast.error('Kategori eklenirken hata oluştu')
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istiyor musunuz?')) return
    
    try {
      const res = await fetch(`/api/admin/reference-categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Kategori silindi')
        await fetchCategories()
        // Referans formundaki dropdown'ı da güncellemek için
        if (formOpen) {
          await fetchCategories()
        }
      } else {
        toast.error('Kategori silinirken hata oluştu')
      }
    } catch (error) {
      console.error(error)
      toast.error('Kategori silinirken hata oluştu')
    }
  }

  const toggleActive = async (it: Reference) => {
    const res = await fetch(`/api/admin/references/${it.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: it.name,
        sector: it.sector,
        logoUrl: it.logoUrl,
        logoPublicId: it.logoPublicId,
        isActive: !it.isActive,
      })
    })
    if (res.ok) {
      toast.success(!it.isActive ? 'Aktif edildi' : 'Pasif edildi')
      await fetchAll()
    }
  }

  if (loading) return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
    <div>
            <h2 className="text-2xl font-bold text-gray-900">Referanslar Yönetimi</h2>
            <p className="text-gray-600 mt-1">Şirket referanslarını yönetin ve düzenleyin</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setCategoryFormOpen(true)}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Plus className="w-4 h-4 mr-2" /> Kategori Ekle
            </Button>
            <Button 
              onClick={() => { setFormOpen(true); setEditing(null) }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" /> Yeni Referans Ekle
        </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-900">Toplam Referans</p>
                <p className="text-2xl font-bold text-blue-600">{items.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-900">Aktif Referans</p>
                <p className="text-2xl font-bold text-green-600">{items.filter(i => i.isActive).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-900">Kategoriler</p>
                <p className="text-2xl font-bold text-purple-600">{categories && Array.isArray(categories) ? categories.length : 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Building className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Pasif Referans</p>
                <p className="text-2xl font-bold text-gray-600">{items.filter(i => !i.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editing ? 'Referans Düzenle' : 'Yeni Referans Ekle'}
              </h3>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { 
                  setFormOpen(false); 
                  setEditing(null); 
                  setLogo(null); 
                  setLogoPreview(null);
                  setMainImage(null);
                  setMainImagePreview(null);
                  setGalleryImages([]);
                  setGalleryPreviews([]);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>
            
            <div className="p-6">
          
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Temel Bilgiler */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Temel Bilgiler</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Şirket Adı</Label>
                  <Input 
                    id="name" 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    placeholder="Örn: ABC Şirketi"
                    className="mt-1"
                    required 
                  />
                </div>
              <div>
                  <Label htmlFor="sector" className="text-sm font-medium text-gray-700">Sektör</Label>
                  <Input 
                    id="sector" 
                    value={form.sector} 
                    onChange={(e) => setForm({ ...form, sector: e.target.value })} 
                    placeholder="Örn: Güneş Enerjisi"
                    className="mt-1"
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Proje Detayları */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Proje Detayları</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Proje Başlığı</Label>
                  <Input 
                    id="title" 
                    value={form.title} 
                    onChange={(e) => setForm({ ...form, title: e.target.value })} 
                    placeholder="Örn: Güneş Enerjisi Santrali Kablo Altyapısı"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700">Proje Önbilgi</Label>
                  <textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="Projenin kısa açıklaması..."
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="content" className="text-sm font-medium text-gray-700">İçerik Geniş Bilgilendirme</Label>
                  <textarea
                    id="content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Projenin detaylı açıklaması, teknik özellikler, başarılar..."
                    rows={8}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="category" className="text-sm font-medium text-gray-700">Kategori</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCategoryFormOpen(true)}
                        className="text-xs px-2 py-1 h-6"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Yeni
                      </Button>
                    </div>
                    <select
                      id="category"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Kategori Seçin</option>
                      {categories && Array.isArray(categories) && categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-gray-700">Konum</Label>
                    <Input 
                      id="location" 
                      value={form.location} 
                      onChange={(e) => setForm({ ...form, location: e.target.value })} 
                      placeholder="Örn: Manisa, Turkey"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">İl ve ülke yazılırken araya virgül (,) konulmalıdır</p>
                  </div>
                  <div>
                    <Label htmlFor="client" className="text-sm font-medium text-gray-700">Müşteri</Label>
                    <Input 
                      id="client" 
                      value={form.client} 
                      onChange={(e) => setForm({ ...form, client: e.target.value })} 
                      placeholder="Örn: Güneş Enerji A.Ş."
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectValue" className="text-sm font-medium text-gray-700">Proje Değeri</Label>
                    <Input 
                      id="projectValue" 
                      value={form.projectValue} 
                      onChange={(e) => setForm({ ...form, projectValue: e.target.value })} 
                      placeholder="Örn: 2.5 Milyon TL"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Proje Süresi</Label>
                    <Input 
                      id="duration" 
                      value={form.duration} 
                      onChange={(e) => setForm({ ...form, duration: e.target.value })} 
                      placeholder="Örn: 6 ay"
                      className="mt-1"
                    />
                  </div>
                </div>

              <div>
                  <Label htmlFor="tags" className="text-sm font-medium text-gray-700">Etiketler</Label>
                  <Input 
                    id="tags" 
                    value={form.tags} 
                    onChange={(e) => setForm({ ...form, tags: e.target.value })} 
                    placeholder="Virgülle ayırın: güneş-enerjisi, kablo-tavaları, elektrik-altyapı"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Etiketleri virgülle ayırarak yazın</p>
                </div>
              </div>
            </div>

            {/* Görsel İçerik */}
            <div className="border-b border-gray-200 pb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Görsel İçerik</h4>
              
              {/* Logo Upload */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700">İş Yapılan Şirketin Logosu</Label>
                <div className="mt-2 flex items-center gap-4">
                  <input 
                    ref={fileRef} 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                const f = e.target.files?.[0] || null
                setLogo(f)
                setLogoPreview(f ? URL.createObjectURL(f) : null)
                    }} 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Logo Seç
              </Button>
              {logo ? (
                    <span className="text-sm text-gray-600 truncate max-w-[200px] bg-gray-50 px-3 py-1 rounded">
                      {logo.name}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Henüz logo seçilmedi</span>
                  )}
                  {logoPreview && (
                    <div className="relative w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                      <img src={logoPreview} alt="Logo Önizleme" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              </div>

              {/* Main Image Upload */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700">Proje Ana Fotoğrafı</Label>
                <div className="mt-2 flex items-center gap-4">
                  <input 
                    ref={mainImageRef} 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null
                      setMainImage(f)
                      setMainImagePreview(f ? URL.createObjectURL(f) : null)
                    }} 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => mainImageRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ana Görsel Seç
                  </Button>
                  {mainImage ? (
                    <span className="text-sm text-gray-600 truncate max-w-[200px] bg-gray-50 px-3 py-1 rounded">
                      {mainImage.name}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Henüz ana görsel seçilmedi</span>
                  )}
                  {mainImagePreview && (
                    <div className="relative w-20 h-16 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                      <img src={mainImagePreview} alt="Ana Görsel Önizleme" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Upload */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Proje Galerisi</Label>
                <div className="mt-2">
                  <input 
                    ref={galleryRef} 
                    type="file" 
                    accept="image/*" 
                    multiple
                    className="hidden" 
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      setGalleryImages(files)
                      setGalleryPreviews(files.map(f => URL.createObjectURL(f)))
                    }} 
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => galleryRef.current?.click()}
                    className="flex items-center gap-2 mb-3"
                  >
                    <Plus className="w-4 h-4" />
                    Galeri Görselleri Seç (Çoklu)
                  </Button>
                  
                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {galleryPreviews.map((preview, index) => (
                        <div key={index} className="relative w-full h-20 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                          <img src={preview} alt={`Galeri ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = galleryImages.filter((_, i) => i !== index)
                              const newPreviews = galleryPreviews.filter((_, i) => i !== index)
                              setGalleryImages(newImages)
                              setGalleryPreviews(newPreviews)
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Birden fazla görsel seçebilirsiniz</p>
                </div>
              </div>
            </div>

            {/* Ayarlar */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-4">Yayın Ayarları</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Aktif olarak yayınla
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editing ? 'Güncelle' : 'Kaydet'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { 
                  setFormOpen(false); 
                  setEditing(null); 
                  setLogo(null); 
                  setLogoPreview(null);
                  setMainImage(null);
                  setMainImagePreview(null);
                  setGalleryImages([]);
                  setGalleryPreviews([]);
                }}
              >
                İptal
              </Button>
            </div>
          </form>
            </div>
          </div>
        </div>
      )}

      {/* References Grid */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tüm Referanslar</h3>
          <p className="text-sm text-gray-600 mt-1">Mevcut referansları görüntüleyin ve yönetin</p>
            </div>
        
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz referans yok</h3>
            <p className="text-gray-600 mb-6">İlk referansınızı ekleyerek başlayın</p>
            <Button onClick={() => { setFormOpen(true); setEditing(null) }}>
              <Plus className="w-4 h-4 mr-2" /> Referans Ekle
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {items.map((reference) => (
              <div key={reference.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow group overflow-hidden">
                {/* Logo Area */}
                <div className="relative h-32 bg-gray-50 border-b border-gray-200 flex items-center justify-center">
                  {reference.logoUrl ? (
                    <img 
                      src={reference.logoUrl} 
                      alt={reference.name} 
                      className="max-h-20 max-w-28 object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <Building className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-400">Logo Yok</span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleActive(reference)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        reference.isActive 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {reference.isActive ? 'Aktif' : 'Pasif'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{reference.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{reference.sector}</p>
                  
                  {reference.title && (
                    <p className="text-sm font-medium text-blue-600 mb-2 line-clamp-1">{reference.title}</p>
                  )}
                  
                  {reference.excerpt && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{reference.excerpt}</p>
                  )}
                  
                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    {reference.location && <div>📍 {reference.location}</div>}
                    {reference.projectValue && <div>💰 {reference.projectValue}</div>}
                    {reference.duration && <div>⏱️ {reference.duration}</div>}
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-4">
                    <div>Oluşturulma: {new Date(reference.createdAt).toLocaleDateString('tr-TR')}</div>
                    <div>Güncellenme: {new Date(reference.updatedAt).toLocaleDateString('tr-TR')}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => { 
                        setEditing(reference); 
                        setFormOpen(true); 
                        setForm({ 
                          name: reference.name || '', 
                          sector: reference.sector || '', 
                          title: reference.title || '',
                          excerpt: reference.excerpt || '',
                          content: reference.content || '',
                          category: reference.category || '',
                          location: reference.location || '',
                          client: reference.client || '',
                          projectValue: reference.projectValue || '',
                          duration: reference.duration || '',
                          tags: reference.tags ? reference.tags.join(', ') : '',
                          featured: reference.featured || false,
                          isActive: reference.isActive 
                        }); 
                        setLogo(null); 
                        setLogoPreview(reference.logoUrl || null);
                        setMainImage(null);
                        setMainImagePreview(reference.mainImage || null);
                        setGalleryImages([]);
                        setGalleryPreviews(reference.gallery || []);
                      }}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Düzenle
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onDelete(reference.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
              <Trash2 className="w-4 h-4" />
            </Button>
                  </div>
                </div>
          </div>
        ))}
          </div>
        )}
      </div>

      {/* Kategori Yönetimi Modal */}
      {categoryFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Referans Kategorileri</h3>
                <p className="text-sm text-gray-600 mt-1">Referanslar için kategori ekleyin ve yönetin</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCategoryFormOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>

            <div className="p-6">
              {/* Yeni Kategori Ekleme */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-base font-semibold text-gray-900 mb-3">Yeni Kategori Ekle</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="newCategoryName" className="text-sm font-medium text-gray-700">Kategori Adı</Label>
                    <Input
                      id="newCategoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Örn: Güneş Enerjisi"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newCategoryColor" className="text-sm font-medium text-gray-700">Renk</Label>
                    <select
                      id="newCategoryColor"
                      value={newCategoryColor}
                      onChange={(e) => setNewCategoryColor(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="bg-blue-100 text-blue-800">Mavi</option>
                      <option value="bg-green-100 text-green-800">Yeşil</option>
                      <option value="bg-yellow-100 text-yellow-800">Sarı</option>
                      <option value="bg-red-100 text-red-800">Kırmızı</option>
                      <option value="bg-purple-100 text-purple-800">Mor</option>
                      <option value="bg-pink-100 text-pink-800">Pembe</option>
                      <option value="bg-indigo-100 text-indigo-800">İndigo</option>
                      <option value="bg-cyan-100 text-cyan-800">Cyan</option>
                      <option value="bg-orange-100 text-orange-800">Turuncu</option>
                      <option value="bg-teal-100 text-teal-800">Teal</option>
                      <option value="bg-gray-100 text-gray-800">Gri</option>
                    </select>
                    <div className="mt-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${newCategoryColor}`}>
                        Önizleme
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={addCategory}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Kategori Ekle
                  </Button>
                </div>
              </div>

              {/* Mevcut Kategoriler */}
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-3">Mevcut Kategoriler</h4>
                {!categories || !Array.isArray(categories) || categories.length === 0 ? (
                  <p className="text-gray-500 text-sm">Henüz kategori eklenmemiş.</p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                            {category.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(category.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



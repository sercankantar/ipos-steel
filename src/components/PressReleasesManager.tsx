'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus, Tag, Search } from 'lucide-react'
import { toast } from 'sonner'
import RichTextEditor from '@/components/ui/RichTextEditor'

interface PressRelease {
  id: string
  title: string
  category: string
  publishedAt: string
  summary?: string
  content?: string
  imageUrl?: string
  imagePublicId?: string
  isActive: boolean
}

interface PressReleaseCategory {
  id: string
  name: string
  color: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const colorOptions = [
  { value: 'bg-blue-100 text-blue-800', label: 'Mavi', preview: 'bg-blue-100 border-blue-200' },
  { value: 'bg-green-100 text-green-800', label: 'Yeşil', preview: 'bg-green-100 border-green-200' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Sarı', preview: 'bg-yellow-100 border-yellow-200' },
  { value: 'bg-red-100 text-red-800', label: 'Kırmızı', preview: 'bg-red-100 border-red-200' },
  { value: 'bg-purple-100 text-purple-800', label: 'Mor', preview: 'bg-purple-100 border-purple-200' },
  { value: 'bg-indigo-100 text-indigo-800', label: 'İndigo', preview: 'bg-indigo-100 border-indigo-200' },
  { value: 'bg-pink-100 text-pink-800', label: 'Pembe', preview: 'bg-pink-100 border-pink-200' },
  { value: 'bg-gray-100 text-gray-800', label: 'Gri', preview: 'bg-gray-100 border-gray-200' },
  { value: 'bg-orange-100 text-orange-800', label: 'Turuncu', preview: 'bg-orange-100 border-orange-200' },
  { value: 'bg-teal-100 text-teal-800', label: 'Teal', preview: 'bg-teal-100 border-teal-200' },
]

export default function PressReleasesManager() {
  const [items, setItems] = useState<PressRelease[]>([])
  const [categories, setCategories] = useState<PressReleaseCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<PressRelease | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('bg-blue-100 text-blue-800')
  const [form, setForm] = useState({ title: '', category: '', publishedAt: '', summary: '', content: '', isActive: true })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { 
    fetchAll()
    fetchCategories()
  }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/admin/press-releases')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/press-release-categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(Array.isArray(data) ? data : [])
      } else {
        setCategories([])
      }
    } catch (e) {
      console.error(e)
      setCategories([])
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let upload: { secure_url: string; public_id: string } | null = null
      if (image) {
        const fd = new FormData()
        fd.append('file', image)
        fd.append('folder', 'ipos-steel/press')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) upload = await up.json()
      }

      const payload: any = {
        title: form.title,
        category: form.category,
        publishedAt: form.publishedAt,
        summary: form.summary || undefined,
        content: form.content || undefined,
        imageUrl: upload?.secure_url || editing?.imageUrl,
        imagePublicId: upload?.public_id || editing?.imagePublicId,
        isActive: form.isActive
      }

      const res = await fetch(editing ? `/api/admin/press-releases/${editing.id}` : '/api/admin/press-releases', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        toast.success(editing ? 'Açıklama güncellendi' : 'Açıklama eklendi')
        setFormOpen(false)
        setEditing(null)
        setForm({ title: '', category: '', publishedAt: '', summary: '', content: '', isActive: true })
        setImage(null)
        setImagePreview(null)
        await fetchAll()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Bu açıklamayı silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/press-releases/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Açıklama silindi')
      await fetchAll()
    }
  }

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Kategori adı gerekli')
      return
    }

    try {
      const res = await fetch('/api/admin/press-release-categories', {
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
      const res = await fetch(`/api/admin/press-release-categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Kategori silindi')
        await fetchCategories()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Kategori silinirken hata oluştu')
      }
    } catch (error) {
      console.error(error)
      toast.error('Kategori silinirken hata oluştu')
    }
  }

  const toggleActive = async (it: PressRelease) => {
    const res = await fetch(`/api/admin/press-releases/${it.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: it.title,
        category: it.category,
        publishedAt: it.publishedAt,
        summary: it.summary,
        content: it.content,
        imageUrl: it.imageUrl,
        imagePublicId: it.imagePublicId,
        isActive: !it.isActive,
      })
    })
    if (res.ok) {
      toast.success(!it.isActive ? 'Aktif edildi' : 'Pasif edildi')
      await fetchAll()
    }
  }

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName)
    return category?.color || 'bg-gray-100 text-gray-800'
  }

  if (loading) return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>

  // Arama filtreleme
  const filteredItems = items.filter(item => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      (item.summary && item.summary.toLowerCase().includes(searchLower)) ||
      (item.content && item.content.toLowerCase().includes(searchLower))
    )
  })

  const activeItems = filteredItems.filter(item => item.isActive)
  const inactiveItems = filteredItems.filter(item => !item.isActive)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
    <div>
          <h2 className="text-2xl font-bold text-gray-900">Basın Açıklamaları</h2>
          <p className="text-gray-600 mt-1">Basın açıklamalarını yönetin ve kategorileri düzenleyin</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setCategoryFormOpen(true)}
            className="bg-white"
          >
            <Tag className="w-4 h-4 mr-2" /> Kategori Ekle
          </Button>
          <Button 
            onClick={() => { setFormOpen(true); setEditing(null) }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" /> Basın Açıklaması Ekle
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Basın açıklaması başlığı, kategori, özet veya içerikte ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-2">
            "{searchTerm}" için {filteredItems.length} sonuç bulundu
          </p>
        )}
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">Toplam Açıklama</p>
              <p className="text-2xl font-bold text-blue-600">{filteredItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Edit className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Aktif Açıklama</p>
              <p className="text-2xl font-bold text-green-600">{activeItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Tag className="w-5 h-5 text-purple-600" />
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
              <Trash2 className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Pasif Açıklama</p>
              <p className="text-2xl font-bold text-gray-600">{inactiveItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {searchTerm ? <Search className="w-8 h-8 text-gray-400" /> : <Plus className="w-8 h-8 text-gray-400" />}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz basın açıklaması yok'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? `"${searchTerm}" ile eşleşen basın açıklaması bulunamadı. Farklı anahtar kelimeler deneyin.`
                : 'İlk basın açıklamanızı ekleyerek başlayın'
              }
            </p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Aramayı Temizle
              </Button>
            ) : (
        <Button onClick={() => { setFormOpen(true); setEditing(null) }}>
                <Plus className="w-4 h-4 mr-2" /> Basın Açıklaması Ekle
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow group overflow-hidden">
                {/* Image Area */}
                <div className="relative h-24 bg-gray-50 border-b border-gray-200 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Plus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-400">Görsel Yok</span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-1 right-1">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        item.isActive 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {item.isActive ? 'Aktif' : 'Pasif'}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">{item.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  
                  {item.summary && (
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{item.summary}</p>
                  )}
                  
                  <div className="text-xs text-gray-400 mb-3">
                    <div>{new Date(item.publishedAt).toLocaleDateString('tr-TR')}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => { 
                        setEditing(item); 
                        setFormOpen(true); 
                        setForm({ 
                          title: item.title, 
                          category: item.category, 
                          publishedAt: item.publishedAt.substring(0,10), 
                          summary: item.summary || '', 
                          content: item.content || '', 
                          isActive: item.isActive 
                        }); 
                        setImage(null); 
                        setImagePreview(item.imageUrl || null);
                      }}
                      className="flex-1 text-xs px-2 py-1 h-7"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Düzenle
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onDelete(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 h-7"
                    >
                      <Trash2 className="w-3 h-3" />
        </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold text-gray-900">
                {editing ? 'Basın Açıklaması Düzenle' : 'Yeni Basın Açıklaması Ekle'}
              </h3>
              <button
                onClick={() => { 
                  setFormOpen(false); 
                  setEditing(null); 
                  setForm({ title: '', category: '', publishedAt: '', summary: '', content: '', isActive: true })
                  setImage(null); 
                  setImagePreview(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={onSubmit} className="space-y-8">
                {/* Temel Bilgiler */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">Temel Bilgiler</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700">Basın Açıklaması Başlığı</Label>
                      <Input 
                        id="title" 
                        value={form.title} 
                        onChange={(e) => setForm({ ...form, title: e.target.value })} 
                        placeholder="Örn: Yeni Ürün Lansmanı"
                        className="mt-1"
                        required 
                      />
              </div>
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
                        required
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
                      <Label htmlFor="publishedAt" className="text-sm font-medium text-gray-700">Yayın Tarihi</Label>
                      <Input 
                        id="publishedAt" 
                        type="date" 
                        value={form.publishedAt} 
                        onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} 
                        className="mt-1"
                        required 
                      />
                    </div>
              </div>
            </div>

                {/* İçerik */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">İçerik</h4>
                  <div className="space-y-4">
            <div>
                      <Label htmlFor="summary" className="text-sm font-medium text-gray-700">Özet</Label>
                      <textarea
                        id="summary"
                        value={form.summary}
                        onChange={(e) => setForm({ ...form, summary: e.target.value })}
                        placeholder="Basın açıklamasının kısa özeti..."
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
            </div>
            <div className="pb-8">
                      <Label htmlFor="content" className="text-sm font-medium text-gray-700">Detaylı İçerik</Label>
                      <RichTextEditor
                        value={form.content}
                        onChange={(value) => setForm({ ...form, content: value })}
                        placeholder="Basın açıklamasının detaylı içeriği..."
                        height={200}
                      />
                    </div>
                  </div>
            </div>

                {/* Görsel */}
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">Görsel</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Ana Görsel</Label>
                      <div className="mt-1 flex items-center gap-4">
                        <input 
                          ref={fileRef} 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                const f = e.target.files?.[0] || null
                setImage(f)
                setImagePreview(f ? URL.createObjectURL(f) : null)
                          }} 
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => fileRef.current?.click()}
                        >
                          Görsel Seç
              </Button>
              {image ? (
                <span className="text-sm text-gray-600 truncate max-w-[200px]">{image.name}</span>
              ) : (
                <span className="text-sm text-gray-400">Seçili dosya yok</span>
              )}
                      </div>
                      {imagePreview && (
                        <div className="mt-4">
                          <img src={imagePreview} alt="Önizleme" className="h-32 w-48 object-cover rounded border" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Durum */}
                <div className="pb-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">Durum</h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Aktif (Yayında)
                    </Label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editing ? 'Güncelle' : 'Kaydet'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => { 
                      setFormOpen(false); 
                      setEditing(null); 
                      setImage(null); 
                      setImagePreview(null);
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

      {/* Kategori Yönetimi Modal */}
      {categoryFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Basın Açıklaması Kategorileri</h3>
                <p className="text-sm text-gray-600 mt-1">Basın açıklamaları için kategori ekleyin ve yönetin</p>
              </div>
              <button
                onClick={() => {
                  setCategoryFormOpen(false)
                  setNewCategoryName('')
                  setNewCategoryColor('bg-blue-100 text-blue-800')
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
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
                      placeholder="Örn: Ürün Lansmanı"
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
                      {colorOptions.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
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
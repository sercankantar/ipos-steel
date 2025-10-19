'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus, Tag, Search } from 'lucide-react'
import { toast } from 'sonner'
import RichTextEditor from '@/components/ui/RichTextEditor'

interface NewsItem {
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

interface NewsCategory {
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

export default function NewsManager() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [categories, setCategories] = useState<NewsCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('bg-blue-100 text-blue-800')
  const [form, setForm] = useState({ title: '', category: '', publishedAt: '', summary: '', content: '', isActive: true })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const [newsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/news'),
        fetch('/api/admin/news-categories')
      ])
      
      const newsData = await newsRes.json()
      const categoriesData = await categoriesRes.json()
      
      setItems(newsData)
      setCategories(categoriesData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Kategori adı gerekli')
      return
    }

    try {
      const res = await fetch('/api/admin/news-categories', {
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
        await fetchAll()
      } else {
        const error = await res.json()
        toast.error(error.error || 'Kategori eklenirken hata oluştu')
      }
    } catch (error) {
      console.error('Category creation error:', error)
      toast.error('Kategori eklenirken hata oluştu')
    }
  }

  const deleteCategory = async (categoryId: string) => {
    if (!confirm('Bu kategoriyi silmek istiyor musunuz?')) return

    try {
      const res = await fetch(`/api/admin/news-categories/${categoryId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Kategori silindi')
        await fetchAll()
      } else {
        toast.error('Kategori silinirken hata oluştu')
      }
    } catch (error) {
      console.error('Category deletion error:', error)
      toast.error('Kategori silinirken hata oluştu')
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let upload: { secure_url: string; public_id: string } | null = null
      if (image) {
        const fd = new FormData()
        fd.append('file', image)
        fd.append('folder', 'ipos-steel/news')
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

      const res = await fetch(editing ? `/api/admin/news/${editing.id}` : '/api/admin/news', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        toast.success(editing ? 'Haber güncellendi' : 'Haber eklendi')
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
    if (!confirm('Bu haberi silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Haber silindi')
      await fetchAll()
    }
  }

  const toggleActive = async (it: NewsItem) => {
    const res = await fetch(`/api/admin/news/${it.id}`, {
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
          <h2 className="text-2xl font-bold text-gray-900">Haberler</h2>
          <p className="text-gray-600 mt-1">Haberleri yönetin ve kategorileri düzenleyin</p>
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
            <Plus className="w-4 h-4 mr-2" /> Haber Ekle
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Haber başlığı, kategori, özet veya içerikte ara..."
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktif</p>
              <p className="text-2xl font-semibold text-gray-900">{activeItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Tag className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kategoriler</p>
              <p className="text-2xl font-semibold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pasif</p>
              <p className="text-2xl font-semibold text-gray-900">{inactiveItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
          const categoryData = categories.find(cat => cat.name === item.category)
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {item.imageUrl && (
                <div className="aspect-video bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryData?.color || 'bg-gray-100 text-gray-800'}`}>
                    {item.category}
                  </span>
                  <button 
                    onClick={() => toggleActive(item)}
                    className={`px-1.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                      item.isActive 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {item.isActive ? 'Aktif' : 'Pasif'}
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{item.title}</h3>
                {item.summary && (
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.summary}</p>
                )}
                <div className="text-xs text-gray-500 mb-3">
                  {new Date(item.publishedAt).toLocaleDateString('tr-TR')}
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setEditing(item)
                      setFormOpen(true)
                      setForm({
                        title: item.title,
                        category: item.category,
                        publishedAt: item.publishedAt.substring(0, 10),
                        summary: item.summary || '',
                        content: item.content || '',
                        isActive: item.isActive
                      })
                      setImage(null)
                      setImagePreview(null)
                    }}
                    className="flex-1 text-xs px-2 py-1 h-7"
                  >
                    <Edit className="w-3 h-3 mr-1" /> Düzenle
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
          )
        })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz haber bulunmuyor'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? `"${searchTerm}" ile eşleşen haber bulunamadı. Farklı anahtar kelimeler deneyin.`
                : 'İlk haberinizi eklemek için "Haber Ekle" butonuna tıklayın.'
              }
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mt-2"
              >
                Aramayı Temizle
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit News Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold">
                {editing ? 'Haber Düzenle' : 'Yeni Haber Ekle'}
              </h3>
              <button
                onClick={() => {
                  setFormOpen(false)
                  setEditing(null)
                  setForm({ title: '', category: '', publishedAt: '', summary: '', content: '', isActive: true })
                  setImage(null)
                  setImagePreview(null)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Temel Bilgiler</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                    <Label htmlFor="title">Haber Başlığı</Label>
                    <Input 
                      id="title" 
                      value={form.title} 
                      onChange={(e) => setForm({ ...form, title: e.target.value })} 
                      required 
                    />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                    <div className="flex gap-2">
                      <select
                        id="category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Kategori seçin</option>
                        {categories.filter(cat => cat.isActive).map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCategoryFormOpen(true)}
                      >
                        Yeni
                      </Button>
                    </div>
              </div>
              <div>
                    <Label htmlFor="publishedAt">Yayın Tarihi</Label>
                    <Input 
                      id="publishedAt" 
                      type="date" 
                      value={form.publishedAt} 
                      onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">İçerik</h4>
            <div>
              <Label htmlFor="summary">Özet</Label>
                  <Input 
                    id="summary" 
                    value={form.summary} 
                    onChange={(e) => setForm({ ...form, summary: e.target.value })} 
                    placeholder="Kısa açıklama..."
                  />
            </div>
            <div className="pb-8">
              <Label htmlFor="content">İçerik (HTML)</Label>
              <RichTextEditor
                value={form.content}
                onChange={(value) => setForm({ ...form, content: value })}
                placeholder="Haber içeriği..."
                height={200}
              />
            </div>
            </div>

              {/* Image */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Görsel</h4>
                <div className="flex items-center gap-4">
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
              <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                    Görsel Seç
              </Button>
              {image ? (
                <span className="text-sm text-gray-600 truncate max-w-[200px]">{image.name}</span>
                  ) : editing?.imageUrl ? (
                    <span className="text-sm text-gray-600">Mevcut görsel korunacak</span>
                  ) : (
                    <span className="text-sm text-gray-400">Seçili görsel yok</span>
                  )}
                </div>
                {(imagePreview || editing?.imageUrl) && (
                  <div className="mt-4">
                    <img 
                      src={imagePreview || editing?.imageUrl} 
                      alt="Önizleme" 
                      className="h-32 w-48 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Durum</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="isActive">Aktif</Label>
                </div>
            </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editing ? 'Güncelle' : 'Ekle'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => { 
                    setFormOpen(false)
                    setEditing(null)
                    setForm({ title: '', category: '', publishedAt: '', summary: '', content: '', isActive: true })
                    setImage(null)
                    setImagePreview(null)
                  }}
                >
                  İptal
                </Button>
            </div>
          </form>
          </div>
        </div>
      )}

      {/* Category Management Modal */}
      {categoryFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold">Kategori Yönetimi</h3>
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
            <div className="p-6 space-y-6">
              {/* Add Category Form */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Yeni Kategori Ekle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categoryName">Kategori Adı</Label>
                    <Input
                      id="categoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Kategori adı..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryColor">Renk</Label>
                    <select
                      id="categoryColor"
                      value={newCategoryColor}
                      onChange={(e) => setNewCategoryColor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Önizleme:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${newCategoryColor}`}>
                    {newCategoryName || 'Kategori Adı'}
                  </span>
                </div>
                <Button onClick={addCategory} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" /> Kategori Ekle
            </Button>
              </div>

              {/* Existing Categories */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Mevcut Kategoriler</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                          {category.name}
                        </span>
                        <span className={`text-xs ${category.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {category.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCategoryFormOpen(false)
                    setNewCategoryName('')
                    setNewCategoryColor('bg-blue-100 text-blue-800')
                  }}
                >
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



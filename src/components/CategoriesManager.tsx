'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus, X } from 'lucide-react'
import { toast } from 'sonner'

interface CategoryItem {
  id: string
  name: string
  slug: string
  imageUrl?: string
  imagePublicId?: string
  isActive: boolean
  createdAt: string
}

export default function CategoriesManager() {
  const [items, setItems] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<CategoryItem | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', isActive: true })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { fetchAll() }, [])

  // ESC tuşu ile modal'ı kapatma ve body scroll kontrolü
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && formOpen) {
        setFormOpen(false)
        setEditing(null)
        setForm({ name: '', slug: '', isActive: true })
        setImage(null)
        setImagePreview(null)
      }
    }

    if (formOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [formOpen])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/admin/product-categories')
      const data = await res.json()
      if (!res.ok || !Array.isArray(data)) {
        console.warn('Kategori listesi beklenmeyen yanıt:', data)
        setItems([])
        return
      }
      setItems(data)
    } catch (e) {
      console.error(e)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let upload: { secure_url: string; public_id: string } | null = null
      if (image) {
        const fd = new FormData()
        fd.append('file', image)
        fd.append('folder', 'ipos-steel/product-categories')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) upload = await up.json()
      }

      const payload: any = {
        name: form.name,
        slug: form.slug,
        imageUrl: upload?.secure_url || editing?.imageUrl,
        imagePublicId: upload?.public_id || editing?.imagePublicId,
        isActive: form.isActive,
      }

      const res = await fetch(editing ? `/api/admin/product-categories/${editing.id}` : '/api/admin/product-categories', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        toast.success(editing ? 'Kategori güncellendi' : 'Kategori eklendi')
        setFormOpen(false)
        setEditing(null)
        setForm({ name: '', slug: '', isActive: true })
        setImage(null)
        setImagePreview(null)
        await fetchAll()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/product-categories/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Kategori silindi')
      await fetchAll()
    }
  }

  if (loading) return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ürün Kategorileri</h3>
        <Button onClick={() => { setFormOpen(true); setEditing(null) }}>
          <Plus className="w-4 h-4 mr-2" /> Yeni Kategori
        </Button>
      </div>

      {/* Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setFormOpen(false)
            setEditing(null)
            setForm({ name: '', slug: '', isActive: true })
            setImage(null)
            setImagePreview(null)
          }
        }}>
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                {editing ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
              </h2>
              <button
                onClick={() => {
                  setFormOpen(false)
                  setEditing(null)
                  setForm({ name: '', slug: '', isActive: true })
                  setImage(null)
                  setImagePreview(null)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Body - Scrollable */}
            <div className="overflow-y-auto flex-1 p-6">
              <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Kategori Adı</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0] || null
                setImage(f)
                setImagePreview(f ? URL.createObjectURL(f) : null)
              }} />
              <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                Fotoğraf Yükle
              </Button>
              {image ? (
                <span className="text-sm text-gray-600 truncate max-w-[200px]">{image.name}</span>
              ) : (
                <span className="text-sm text-gray-400">Seçili dosya yok</span>
              )}
              {imagePreview && <img src={imagePreview} alt="Önizleme" className="h-12 w-12 object-cover rounded border ml-auto" />}
            </div>
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button type="submit">{editing ? 'Güncelle' : 'Ekle'}</Button>
                  <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setEditing(null); setForm({ name: '', slug: '', isActive: true }); setImage(null); setImagePreview(null) }}>İptal</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-md border divide-y">
        {items.map((it) => (
          <div key={it.id} className="p-4 flex items-center gap-4">
            <button className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs border ${it.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{it.isActive ? 'Aktif' : 'Pasif'}</button>
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-500">/{it.slug}</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => { setEditing(it); setFormOpen(true); setForm({ name: it.name, slug: it.slug, isActive: it.isActive }); setImage(null); setImagePreview(null) }}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(it.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}



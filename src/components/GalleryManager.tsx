'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface GalleryItem {
  id: string
  title: string
  summary?: string
  category: string
  publishedAt: string
  imageUrl?: string
  imagePublicId?: string
  isActive: boolean
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ title: '', summary: '', category: '', publishedAt: '', isActive: true })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/admin/gallery')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
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
        fd.append('folder', 'ipos-steel/gallery')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) upload = await up.json()
      }

      const payload: any = {
        title: form.title,
        summary: form.summary || undefined,
        category: form.category,
        publishedAt: form.publishedAt,
        imageUrl: upload?.secure_url || editing?.imageUrl,
        imagePublicId: upload?.public_id || editing?.imagePublicId,
        isActive: form.isActive
      }

      const res = await fetch(editing ? `/api/admin/gallery/${editing.id}` : '/api/admin/gallery', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        toast.success(editing ? 'Görsel güncellendi' : 'Görsel eklendi')
        setFormOpen(false)
        setEditing(null)
        setForm({ title: '', summary: '', category: '', publishedAt: '', isActive: true })
        setImage(null)
        setImagePreview(null)
        await fetchAll()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Bu görseli silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Görsel silindi')
      await fetchAll()
    }
  }

  const toggleActive = async (it: GalleryItem) => {
    const res = await fetch(`/api/admin/gallery/${it.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: it.title,
        summary: it.summary,
        category: it.category,
        publishedAt: it.publishedAt,
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

  if (loading) return <div className="p-8">Yükleniyor...</div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Galeri</h3>
        <Button onClick={() => { setFormOpen(true); setEditing(null) }}>
          <Plus className="w-4 h-4 mr-2" /> Yeni Görsel
        </Button>
      </div>

      {formOpen && (
        <div className="bg-white p-6 rounded-md border mb-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Fotoğraf Adı</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="publishedAt">Yüklenme Tarihi</Label>
                <Input id="publishedAt" type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} required />
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Özet</Label>
              <Input id="summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
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
            <div className="flex gap-3">
              <Button type="submit">{editing ? 'Güncelle' : 'Ekle'}</Button>
              <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setEditing(null); setImage(null); setImagePreview(null) }}>İptal</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-md border divide-y">
        {items.map((it) => (
          <div key={it.id} className="p-4 flex items-center gap-4">
            <button onClick={() => toggleActive(it)} className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs border transition-colors ${it.isActive ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`}>{it.isActive ? 'Aktif' : 'Pasif'}</button>
            <div className="h-10 w-10 rounded bg-gray-50 border flex items-center justify-center overflow-hidden">
              {it.imageUrl ? <img src={it.imageUrl} alt={it.title} className="h-full w-full object-cover" /> : <span className="text-xs text-gray-400">Foto</span>}
            </div>
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-gray-500">{new Date(it.publishedAt).toLocaleDateString('tr-TR')} • {it.category}</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => { setEditing(it); setFormOpen(true); setForm({ title: it.title, summary: it.summary || '', category: it.category, publishedAt: it.publishedAt.substring(0,10), isActive: it.isActive }); setImage(null); setImagePreview(null) }}>
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



'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus, Download } from 'lucide-react'
import { toast } from 'sonner'

interface Certificate {
  id: string
  title: string
  category: string
  description: string
  details?: string
  fileUrl: string
  filePublicId?: string
  fileType: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function CertificatesManager() {
  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({
    title: '', category: '', description: '', details: '', isActive: true
  })
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/admin/certificates')
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
      if (file) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('folder', 'ipos-steel/certificates')
        const resUp = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (resUp.ok) upload = await resUp.json()
        const ext = file.name.split('.').pop()?.toLowerCase() || ''
        setFileType(ext)
      }

      const payload: any = {
        title: form.title,
        category: form.category,
        description: form.description,
        details: form.details || undefined,
        isActive: form.isActive,
        fileUrl: upload?.secure_url || (editing?.fileUrl ?? ''),
        filePublicId: upload?.public_id || editing?.filePublicId,
        fileType: (file?.name.split('.').pop()?.toLowerCase() || editing?.fileType || 'pdf')
      }

      const res = await fetch(editing ? `/api/admin/certificates/${editing.id}` : '/api/admin/certificates', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success(editing ? 'Sertifika güncellendi' : 'Sertifika eklendi')
        setFormOpen(false)
        setEditing(null)
        setForm({ title: '', category: '', description: '', details: '', isActive: true })
        setFile(null)
        setFilePreview(null)
        await fetchAll()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const toggleActive = async (it: Certificate) => {
    try {
      const res = await fetch(`/api/admin/certificates/${it.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: it.title,
          category: it.category,
          description: it.description,
          details: it.details,
          fileUrl: it.fileUrl,
          filePublicId: it.filePublicId,
          fileType: it.fileType,
          isActive: !it.isActive
        })
      })
      if (res.ok) {
        toast.success(!it.isActive ? 'Aktif edildi' : 'Pasif edildi')
        await fetchAll()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Bu sertifikayı silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/certificates/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Sertifika silindi')
      await fetchAll()
    }
  }

  if (loading) return <div className="p-8">Yükleniyor...</div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sertifikalar</h3>
        <Button onClick={() => { setFormOpen(true); setEditing(null) }}>
          <Plus className="w-4 h-4 mr-2" /> Yeni Sertifika
        </Button>
      </div>

      {formOpen && (
        <div className="bg-white p-6 rounded-md border mb-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Sertifika Adı</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="details">Detaylar</Label>
              <textarea id="details" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} />
            </div>
            <div className="flex items-center gap-3">
              <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0] || null
                setFile(f)
                if (f && f.type.startsWith('image/')) setFilePreview(URL.createObjectURL(f))
                else setFilePreview(null)
              }} />
              <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                Sertifika Yükle
              </Button>
              {file ? (
                <span className="text-sm text-gray-600 truncate max-w-[200px]">{file.name}</span>
              ) : (
                <span className="text-sm text-gray-400">Seçili dosya yok</span>
              )}
              {filePreview && <img src={filePreview} alt="Önizleme" className="h-16 w-16 object-cover rounded border ml-auto" />}
            </div>
            <div className="flex gap-3">
              <Button type="submit">{editing ? 'Güncelle' : 'Ekle'}</Button>
              <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setEditing(null); setFile(null); setFilePreview(null) }}>İptal</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-md border divide-y">
        {items.map((it) => (
          <div key={it.id} className="p-4 flex items-center gap-4">
            <button
              onClick={() => toggleActive(it)}
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs border transition-colors ${
                it.isActive
                  ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              }`}
              title="Aktif/Pasif"
            >
              {it.isActive ? 'Aktif' : 'Pasif'}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-medium">{it.title}</div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{it.category}</span>
              </div>
              <div className="text-sm text-gray-600">{it.description}</div>
            </div>
            <a className="text-sm text-blue-600 hover:underline flex items-center gap-1" href={it.fileUrl} download>
              <Download className="w-4 h-4" /> İndir
            </a>
            <Button size="sm" variant="outline" onClick={() => { setEditing(it); setFormOpen(true); setForm({ title: it.title, category: it.category, description: it.description, details: it.details || '', isActive: it.isActive }); setFile(null); setFilePreview(null) }}>
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



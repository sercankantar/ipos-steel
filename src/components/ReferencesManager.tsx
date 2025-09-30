'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface Reference {
  id: string
  name: string
  sector: string
  logoUrl?: string
  logoPublicId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function ReferencesManager() {
  const [items, setItems] = useState<Reference[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Reference | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ name: '', sector: '', isActive: true })
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const res = await fetch('/api/admin/references')
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
      if (logo) {
        const fd = new FormData()
        fd.append('file', logo)
        fd.append('folder', 'ipos-steel/references')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) upload = await up.json()
      }

      const payload: any = {
        name: form.name,
        sector: form.sector,
        isActive: form.isActive,
        logoUrl: upload?.secure_url || editing?.logoUrl,
        logoPublicId: upload?.public_id || editing?.logoPublicId,
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
        setForm({ name: '', sector: '', isActive: true })
        setLogo(null)
        setLogoPreview(null)
        await fetchAll()
      }
    } catch (e) {
      console.error(e)
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

  if (loading) return <div className="p-8">Yükleniyor...</div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Referanslar</h3>
        <Button onClick={() => { setFormOpen(true); setEditing(null) }}>
          <Plus className="w-4 h-4 mr-2" /> Yeni Referans
        </Button>
      </div>

      {formOpen && (
        <div className="bg-white p-6 rounded-md border mb-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Referans Adı</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="sector">Sektör</Label>
                <Input id="sector" value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} required />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0] || null
                setLogo(f)
                setLogoPreview(f ? URL.createObjectURL(f) : null)
              }} />
              <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                Logo Yükle
              </Button>
              {logo ? (
                <span className="text-sm text-gray-600 truncate max-w-[200px]">{logo.name}</span>
              ) : (
                <span className="text-sm text-gray-400">Seçili dosya yok</span>
              )}
              {logoPreview && <img src={logoPreview} alt="Logo Önizleme" className="h-12 w-12 object-cover rounded border ml-auto" />}
            </div>
            <div className="flex gap-3">
              <Button type="submit">{editing ? 'Güncelle' : 'Ekle'}</Button>
              <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setEditing(null); setLogo(null); setLogoPreview(null) }}>İptal</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-md border divide-y">
        {items.map((it) => (
          <div key={it.id} className="p-4 flex items-center gap-4">
            <button onClick={() => toggleActive(it)} className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs border transition-colors ${it.isActive ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`}>{it.isActive ? 'Aktif' : 'Pasif'}</button>
            <div className="h-10 w-10 rounded bg-gray-50 border flex items-center justify-center overflow-hidden">
              {it.logoUrl ? <img src={it.logoUrl} alt={it.name} className="h-full w-full object-contain" /> : <span className="text-xs text-gray-400">Logo</span>}
            </div>
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-500">{it.sector}</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => { setEditing(it); setFormOpen(true); setForm({ name: it.name, sector: it.sector, isActive: it.isActive }); setLogo(null); setLogoPreview(null) }}>
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



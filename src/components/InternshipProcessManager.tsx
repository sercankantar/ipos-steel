'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface InternshipProcessData {
  id: string
  heroTitle: string
  heroSubtitle?: string
  mainDescription: string
  highSchoolTitle: string
  highSchoolBullets: string[]
  universityTitle: string
  universityBullets: string[]
  criteriaTitle: string
  criteriaBullets: string[]
  conclusionParagraph: string
  imageUrl?: string
  imagePublicId?: string
  imageAlt?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function InternshipProcessManager() {
  const [data, setData] = useState<InternshipProcessData | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    mainDescription: '',
    highSchoolTitle: '',
    highSchoolBullets: [''],
    universityTitle: '',
    universityBullets: [''],
    criteriaTitle: '',
    criteriaBullets: [''],
    conclusionParagraph: '',
    imageAlt: ''
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/internship-process')
      const result = await response.json()
      setData(result)
      if (result) {
        setFormData({
          heroTitle: result.heroTitle || '',
          heroSubtitle: result.heroSubtitle || '',
          mainDescription: result.mainDescription || '',
          highSchoolTitle: result.highSchoolTitle || '',
          highSchoolBullets: result.highSchoolBullets || [''],
          universityTitle: result.universityTitle || '',
          universityBullets: result.universityBullets || [''],
          criteriaTitle: result.criteriaTitle || '',
          criteriaBullets: result.criteriaBullets || [''],
          conclusionParagraph: result.conclusionParagraph || '',
          imageAlt: result.imageAlt || ''
        })
        if (result.imageUrl) {
          setImagePreview(result.imageUrl)
        }
      }
    } catch (error) {
      console.error('Veri yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Upload image if selected
      let imageUpload: { secure_url: string; public_id: string } | null = null

      if (imageFile) {
        const fd = new FormData()
        fd.append('file', imageFile)
        fd.append('folder', 'ipos-steel/internship-process')
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (res.ok) imageUpload = await res.json()
      }

      const response = await fetch('/api/admin/internship-process', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: imageUpload?.secure_url,
          imagePublicId: imageUpload?.public_id,
        }),
      })

      if (response.ok) {
        fetchData()
        toast.success('Staj Süreci başarıyla güncellendi')
      }
    } catch (error) {
      console.error('Veri kaydedilirken hata:', error)
      toast.error('Veri kaydedilirken hata oluştu')
    }
  }

  const addHighSchoolBullet = () => {
    setFormData({
      ...formData,
      highSchoolBullets: [...formData.highSchoolBullets, '']
    })
  }

  const removeHighSchoolBullet = (index: number) => {
    setFormData({
      ...formData,
      highSchoolBullets: formData.highSchoolBullets.filter((_, i) => i !== index)
    })
  }

  const updateHighSchoolBullet = (index: number, value: string) => {
    const newBullets = [...formData.highSchoolBullets]
    newBullets[index] = value
    setFormData({ ...formData, highSchoolBullets: newBullets })
  }

  const addUniversityBullet = () => {
    setFormData({
      ...formData,
      universityBullets: [...formData.universityBullets, '']
    })
  }

  const removeUniversityBullet = (index: number) => {
    setFormData({
      ...formData,
      universityBullets: formData.universityBullets.filter((_, i) => i !== index)
    })
  }

  const updateUniversityBullet = (index: number, value: string) => {
    const newBullets = [...formData.universityBullets]
    newBullets[index] = value
    setFormData({ ...formData, universityBullets: newBullets })
  }

  const addCriteriaBullet = () => {
    setFormData({
      ...formData,
      criteriaBullets: [...formData.criteriaBullets, '']
    })
  }

  const removeCriteriaBullet = (index: number) => {
    setFormData({
      ...formData,
      criteriaBullets: formData.criteriaBullets.filter((_, i) => i !== index)
    })
  }

  const updateCriteriaBullet = (index: number, value: string) => {
    const newBullets = [...formData.criteriaBullets]
    newBullets[index] = value
    setFormData({ ...formData, criteriaBullets: newBullets })
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Staj Süreci Yönetimi</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Hero Bölümü</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Hero Başlık</Label>
              <Input
                id="heroTitle"
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="heroSubtitle">Hero Alt Başlık</Label>
              <Input
                id="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Ana İçerik */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Ana İçerik</h3>
          <div>
            <Label htmlFor="mainDescription">Giriş Paragrafı</Label>
            <textarea
              id="mainDescription"
              value={formData.mainDescription}
              onChange={(e) => setFormData({ ...formData, mainDescription: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>
        </div>

        {/* Lise Stajları */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Lise Stajları</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="highSchoolTitle">Başlık</Label>
              <Input
                id="highSchoolTitle"
                value={formData.highSchoolTitle}
                onChange={(e) => setFormData({ ...formData, highSchoolTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Madde Listesi</Label>
              {formData.highSchoolBullets.map((bullet, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={bullet}
                    onChange={(e) => updateHighSchoolBullet(index, e.target.value)}
                    placeholder="Madde açıklaması"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeHighSchoolBullet(index)}
                    disabled={formData.highSchoolBullets.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addHighSchoolBullet} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Madde Ekle
              </Button>
            </div>
          </div>
        </div>

        {/* Üniversite Stajları */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Üniversite Stajları</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="universityTitle">Başlık</Label>
              <Input
                id="universityTitle"
                value={formData.universityTitle}
                onChange={(e) => setFormData({ ...formData, universityTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Madde Listesi</Label>
              {formData.universityBullets.map((bullet, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={bullet}
                    onChange={(e) => updateUniversityBullet(index, e.target.value)}
                    placeholder="Madde açıklaması"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeUniversityBullet(index)}
                    disabled={formData.universityBullets.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addUniversityBullet} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Madde Ekle
              </Button>
            </div>
          </div>
        </div>

        {/* Ön Seçim Kriterleri */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Ön Seçim Kriterleri</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="criteriaTitle">Başlık</Label>
              <Input
                id="criteriaTitle"
                value={formData.criteriaTitle}
                onChange={(e) => setFormData({ ...formData, criteriaTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Kriter Listesi</Label>
              {formData.criteriaBullets.map((bullet, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={bullet}
                    onChange={(e) => updateCriteriaBullet(index, e.target.value)}
                    placeholder="Kriter açıklaması"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeCriteriaBullet(index)}
                    disabled={formData.criteriaBullets.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addCriteriaBullet} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Kriter Ekle
              </Button>
            </div>
          </div>
        </div>

        {/* Sonuç Paragrafı */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Sonuç Paragrafı</h3>
          <div>
            <Label htmlFor="conclusionParagraph">Sonuç Metni</Label>
            <textarea
              id="conclusionParagraph"
              value={formData.conclusionParagraph}
              onChange={(e) => setFormData({ ...formData, conclusionParagraph: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
        </div>

        {/* Görsel */}
        <div className="pb-6">
          <h3 className="text-lg font-medium mb-4">Görsel</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageAlt">Görsel Alt Metni</Label>
              <Input
                id="imageAlt"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                placeholder="Görsel için açıklayıcı metin"
              />
            </div>
            <div>
              <Label>Görsel Yükle</Label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  ref={imageInputRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setImageFile(f)
                    setImagePreview(f ? URL.createObjectURL(f) : null)
                  }}
                />
                <Button type="button" variant="outline" onClick={() => imageInputRef.current?.click()}>
                  Görsel Seç
                </Button>
                {imageFile ? (
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {imageFile.name}
                  </span>
                ) : data?.imageUrl ? (
                  <span className="text-sm text-gray-600">Mevcut görsel yüklü</span>
                ) : (
                  <span className="text-sm text-gray-400">Seçili görsel yok</span>
                )}
                {(imagePreview || data?.imageUrl) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview(null)
                      if (imageInputRef.current) imageInputRef.current.value = ''
                    }}
                    className="ml-auto"
                  >
                    Kaldır
                  </Button>
                )}
              </div>
              {(imagePreview || data?.imageUrl) && (
                <img
                  src={imagePreview || data?.imageUrl || ''}
                  alt="Staj Süreci Görseli"
                  className="mt-2 h-48 w-48 object-cover rounded border"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button type="submit">
            Güncelle
          </Button>
        </div>
      </form>
    </div>
  )
}

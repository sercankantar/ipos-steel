'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Target, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface SalaryAndBenefitsData {
  id: string
  heroTitle: string
  heroSubtitle: string
  salaryPolicyTitle: string
  salaryPolicySubtitle: string
  salaryPolicyContent: string
  salaryPolicyImageUrl?: string
  salaryPolicyImagePublicId?: string
  strategyTitle: string
  strategyContent: string
  strategyBullets: string[]
  benefitsTitle: string
  benefitsSubtitle: string
  generalBenefitsTitle: string
  generalBenefitsSubtitle: string
  generalBenefits: Array<{ title: string; description: string }>
  positionBenefitsTitle: string
  positionBenefitsSubtitle: string
  positionBenefits: Array<{ title: string; description: string }>
  positionBenefitsNote: string
  ctaTitle: string
  ctaContent: string
  ctaButton1Text: string
  ctaButton1Link: string
  ctaButton2Text: string
  ctaButton2Link: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function SalaryAndBenefitsManager() {
  const [data, setData] = useState<SalaryAndBenefitsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    salaryPolicyTitle: '',
    salaryPolicySubtitle: '',
    salaryPolicyContent: '',
    strategyTitle: '',
    strategyContent: '',
    strategyBullets: [''],
    benefitsTitle: '',
    benefitsSubtitle: '',
    generalBenefitsTitle: '',
    generalBenefitsSubtitle: '',
    generalBenefits: [{ title: '', description: '' }],
    positionBenefitsTitle: '',
    positionBenefitsSubtitle: '',
    positionBenefits: [{ title: '', description: '' }],
    positionBenefitsNote: '',
    ctaTitle: '',
    ctaContent: '',
    ctaButton1Text: '',
    ctaButton1Link: '',
    ctaButton2Text: '',
    ctaButton2Link: ''
  })
  const [salaryPolicyImagePreview, setSalaryPolicyImagePreview] = useState<string | null>(null)
  const [salaryPolicyImageFile, setSalaryPolicyImageFile] = useState<File | null>(null)
  const salaryPolicyInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/salary-and-benefits')
      const result = await response.json()
      setData(result)
      if (result) {
        setFormData({
          heroTitle: result.heroTitle || '',
          heroSubtitle: result.heroSubtitle || '',
          salaryPolicyTitle: result.salaryPolicyTitle || '',
          salaryPolicySubtitle: result.salaryPolicySubtitle || '',
          salaryPolicyContent: result.salaryPolicyContent || '',
          strategyTitle: result.strategyTitle || '',
          strategyContent: result.strategyContent || '',
          strategyBullets: result.strategyBullets || [''],
          benefitsTitle: result.benefitsTitle || '',
          benefitsSubtitle: result.benefitsSubtitle || '',
          generalBenefitsTitle: result.generalBenefitsTitle || '',
          generalBenefitsSubtitle: result.generalBenefitsSubtitle || '',
          generalBenefits: result.generalBenefits || [{ title: '', description: '' }],
          positionBenefitsTitle: result.positionBenefitsTitle || '',
          positionBenefitsSubtitle: result.positionBenefitsSubtitle || '',
          positionBenefits: result.positionBenefits || [{ title: '', description: '' }],
          positionBenefitsNote: result.positionBenefitsNote || '',
          ctaTitle: result.ctaTitle || '',
          ctaContent: result.ctaContent || '',
          ctaButton1Text: result.ctaButton1Text || '',
          ctaButton1Link: result.ctaButton1Link || '',
          ctaButton2Text: result.ctaButton2Text || '',
          ctaButton2Link: result.ctaButton2Link || ''
        })
        if (result.salaryPolicyImageUrl) {
          setSalaryPolicyImagePreview(result.salaryPolicyImageUrl)
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
      let salaryPolicyUpload: { secure_url: string; public_id: string } | null = null

      if (salaryPolicyImageFile) {
        const fd = new FormData()
        fd.append('file', salaryPolicyImageFile)
        fd.append('folder', 'ipos-steel/salary-benefits')
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (res.ok) salaryPolicyUpload = await res.json()
      }

      const response = await fetch('/api/admin/salary-and-benefits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          salaryPolicyImageUrl: salaryPolicyUpload?.secure_url,
          salaryPolicyImagePublicId: salaryPolicyUpload?.public_id,
        }),
      })

      if (response.ok) {
        fetchData()
        toast.success('Ücret ve Yan Haklar Yönetimi başarıyla güncellendi')
      }
    } catch (error) {
      console.error('Veri kaydedilirken hata:', error)
      toast.error('Veri kaydedilirken hata oluştu')
    }
  }

  const addStrategyBullet = () => {
    setFormData({
      ...formData,
      strategyBullets: [...formData.strategyBullets, '']
    })
  }

  const removeStrategyBullet = (index: number) => {
    setFormData({
      ...formData,
      strategyBullets: formData.strategyBullets.filter((_, i) => i !== index)
    })
  }

  const updateStrategyBullet = (index: number, value: string) => {
    const newBullets = [...formData.strategyBullets]
    newBullets[index] = value
    setFormData({ ...formData, strategyBullets: newBullets })
  }

  const addGeneralBenefit = () => {
    setFormData({
      ...formData,
      generalBenefits: [...formData.generalBenefits, { title: '', description: '' }]
    })
  }

  const removeGeneralBenefit = (index: number) => {
    setFormData({
      ...formData,
      generalBenefits: formData.generalBenefits.filter((_, i) => i !== index)
    })
  }

  const updateGeneralBenefit = (index: number, field: 'title' | 'description', value: string) => {
    const newBenefits = [...formData.generalBenefits]
    newBenefits[index] = { ...newBenefits[index], [field]: value }
    setFormData({ ...formData, generalBenefits: newBenefits })
  }

  const addPositionBenefit = () => {
    setFormData({
      ...formData,
      positionBenefits: [...formData.positionBenefits, { title: '', description: '' }]
    })
  }

  const removePositionBenefit = (index: number) => {
    setFormData({
      ...formData,
      positionBenefits: formData.positionBenefits.filter((_, i) => i !== index)
    })
  }

  const updatePositionBenefit = (index: number, field: 'title' | 'description', value: string) => {
    const newBenefits = [...formData.positionBenefits]
    newBenefits[index] = { ...newBenefits[index], [field]: value }
    setFormData({ ...formData, positionBenefits: newBenefits })
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Ücret ve Yan Haklar Yönetimi</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Hero Bölümü</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                required
              />
            </div>
          </div>
        </div>

        {/* Ücretlendirme Politikası */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Ücretlendirme Politikası</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salaryPolicyTitle">Başlık</Label>
                <Input
                  id="salaryPolicyTitle"
                  value={formData.salaryPolicyTitle}
                  onChange={(e) => setFormData({ ...formData, salaryPolicyTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="salaryPolicySubtitle">Alt Başlık</Label>
                <Input
                  id="salaryPolicySubtitle"
                  value={formData.salaryPolicySubtitle}
                  onChange={(e) => setFormData({ ...formData, salaryPolicySubtitle: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="salaryPolicyContent">İçerik</Label>
              <textarea
                id="salaryPolicyContent"
                value={formData.salaryPolicyContent}
                onChange={(e) => setFormData({ ...formData, salaryPolicyContent: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
            <div>
              <Label>Görsel</Label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  ref={salaryPolicyInputRef}
                  id="salaryPolicyImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setSalaryPolicyImageFile(f)
                    setSalaryPolicyImagePreview(f ? URL.createObjectURL(f) : null)
                  }}
                />
                <Button type="button" variant="outline" onClick={() => salaryPolicyInputRef.current?.click()}>
                  Görsel Seç
                </Button>
                {salaryPolicyImageFile ? (
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {salaryPolicyImageFile.name}
                  </span>
                ) : data?.salaryPolicyImageUrl ? (
                  <span className="text-sm text-gray-600">Mevcut görsel yüklü</span>
                ) : (
                  <span className="text-sm text-gray-400">Seçili görsel yok</span>
                )}
                {(salaryPolicyImagePreview || data?.salaryPolicyImageUrl) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSalaryPolicyImageFile(null)
                      setSalaryPolicyImagePreview(null)
                      if (salaryPolicyInputRef.current) salaryPolicyInputRef.current.value = ''
                    }}
                    className="ml-auto"
                  >
                    Kaldır
                  </Button>
                )}
              </div>
              {(salaryPolicyImagePreview || data?.salaryPolicyImageUrl) && (
                <img
                  src={salaryPolicyImagePreview || data?.salaryPolicyImageUrl || ''}
                  alt="Ücretlendirme Politikası Görseli"
                  className="mt-2 h-28 w-28 object-cover rounded border"
                />
              )}
            </div>
          </div>
        </div>

        {/* Strateji */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Strateji</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="strategyTitle">Başlık</Label>
              <Input
                id="strategyTitle"
                value={formData.strategyTitle}
                onChange={(e) => setFormData({ ...formData, strategyTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="strategyContent">İçerik</Label>
              <textarea
                id="strategyContent"
                value={formData.strategyContent}
                onChange={(e) => setFormData({ ...formData, strategyContent: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
            <div>
              <Label>Değerlendirme Kriterleri</Label>
              {formData.strategyBullets.map((bullet, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={bullet}
                    onChange={(e) => updateStrategyBullet(index, e.target.value)}
                    placeholder="Kriter açıklaması"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeStrategyBullet(index)}
                    disabled={formData.strategyBullets.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addStrategyBullet} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Kriter Ekle
              </Button>
            </div>
          </div>
        </div>

        {/* Yan Haklar */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Yan Haklar</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="benefitsTitle">Başlık</Label>
                <Input
                  id="benefitsTitle"
                  value={formData.benefitsTitle}
                  onChange={(e) => setFormData({ ...formData, benefitsTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="benefitsSubtitle">Alt Başlık</Label>
                <Input
                  id="benefitsSubtitle"
                  value={formData.benefitsSubtitle}
                  onChange={(e) => setFormData({ ...formData, benefitsSubtitle: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tüm Çalışanlara Sağlanan Olanaklar */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Tüm Çalışanlara Sağlanan Olanaklar</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="generalBenefitsTitle">Başlık</Label>
                <Input
                  id="generalBenefitsTitle"
                  value={formData.generalBenefitsTitle}
                  onChange={(e) => setFormData({ ...formData, generalBenefitsTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="generalBenefitsSubtitle">Alt Başlık</Label>
                <Input
                  id="generalBenefitsSubtitle"
                  value={formData.generalBenefitsSubtitle}
                  onChange={(e) => setFormData({ ...formData, generalBenefitsSubtitle: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Haklar</Label>
              {formData.generalBenefits.map((benefit, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <Input
                      value={benefit.title}
                      onChange={(e) => updateGeneralBenefit(index, 'title', e.target.value)}
                      placeholder="Hak başlığı"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeGeneralBenefit(index)}
                      disabled={formData.generalBenefits.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => updateGeneralBenefit(index, 'description', e.target.value)}
                    placeholder="Hak açıklaması"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addGeneralBenefit} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Hak Ekle
              </Button>
            </div>
          </div>
        </div>

        {/* Görevi Gereği Sağlanan Olanaklar */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Görevi Gereği Sağlanan Olanaklar</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="positionBenefitsTitle">Başlık</Label>
                <Input
                  id="positionBenefitsTitle"
                  value={formData.positionBenefitsTitle}
                  onChange={(e) => setFormData({ ...formData, positionBenefitsTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="positionBenefitsSubtitle">Alt Başlık</Label>
                <Input
                  id="positionBenefitsSubtitle"
                  value={formData.positionBenefitsSubtitle}
                  onChange={(e) => setFormData({ ...formData, positionBenefitsSubtitle: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Haklar</Label>
              {formData.positionBenefits.map((benefit, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <Input
                      value={benefit.title}
                      onChange={(e) => updatePositionBenefit(index, 'title', e.target.value)}
                      placeholder="Hak başlığı"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removePositionBenefit(index)}
                      disabled={formData.positionBenefits.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => updatePositionBenefit(index, 'description', e.target.value)}
                    placeholder="Hak açıklaması"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addPositionBenefit} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Hak Ekle
              </Button>
            </div>
            <div>
              <Label htmlFor="positionBenefitsNote">Önemli Bilgilendirme</Label>
              <textarea
                id="positionBenefitsNote"
                value={formData.positionBenefitsNote}
                onChange={(e) => setFormData({ ...formData, positionBenefitsNote: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pb-6">
          <h3 className="text-lg font-medium mb-4">CTA Bölümü</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaTitle">Başlık</Label>
              <Input
                id="ctaTitle"
                value={formData.ctaTitle}
                onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="ctaContent">İçerik</Label>
              <textarea
                id="ctaContent"
                value={formData.ctaContent}
                onChange={(e) => setFormData({ ...formData, ctaContent: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaButton1Text">1. Buton Metni</Label>
                <Input
                  id="ctaButton1Text"
                  value={formData.ctaButton1Text}
                  onChange={(e) => setFormData({ ...formData, ctaButton1Text: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ctaButton1Link">1. Buton Linki</Label>
                <Input
                  id="ctaButton1Link"
                  value={formData.ctaButton1Link}
                  onChange={(e) => setFormData({ ...formData, ctaButton1Link: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaButton2Text">2. Buton Metni</Label>
                <Input
                  id="ctaButton2Text"
                  value={formData.ctaButton2Text}
                  onChange={(e) => setFormData({ ...formData, ctaButton2Text: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ctaButton2Link">2. Buton Linki</Label>
                <Input
                  id="ctaButton2Link"
                  value={formData.ctaButton2Link}
                  onChange={(e) => setFormData({ ...formData, ctaButton2Link: e.target.value })}
                  required
                />
              </div>
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

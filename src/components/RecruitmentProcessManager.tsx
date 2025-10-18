'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Target, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface RecruitmentProcessData {
  id: string
  heroTitle: string
  heroSubtitle: string
  purposeTitle: string
  purposeMissionTitle: string
  purposeMissionContent: string
  purposeValuesTitle: string
  purposeValuesContent: string
  purposeValues: Array<{ title: string; description: string }>
  purposeImageUrl?: string
  purposeImagePublicId?: string
  purposeImageCaption?: string
  requirementsTitle: string
  requirementsSubtitle: string
  requirementsCategories: Array<{ title: string; items: string[] }>
  processTitle: string
  processSubtitle: string
  processSteps: Array<{
    stepNumber: number
    title: string
    leftTitle: string
    leftItems: string[]
    rightTitle: string
    rightItems: string[]
    bgColor: string
  }>
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

export default function RecruitmentProcessManager() {
  const [data, setData] = useState<RecruitmentProcessData | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    purposeTitle: '',
    purposeMissionTitle: '',
    purposeMissionContent: '',
    purposeValuesTitle: '',
    purposeValuesContent: '',
    purposeValues: [{ title: '', description: '' }],
    purposeImageCaption: '',
    requirementsTitle: '',
    requirementsSubtitle: '',
    requirementsCategories: [
      { title: '', items: [''] },
      { title: '', items: [''] },
      { title: '', items: [''] },
      { title: '', items: [''] }
    ],
    processTitle: '',
    processSubtitle: '',
    processSteps: [
      {
        stepNumber: 1,
        title: '',
        leftTitle: '',
        leftItems: [''],
        rightTitle: '',
        rightItems: [''],
        bgColor: 'bg-gray-800'
      }
    ],
    ctaTitle: '',
    ctaContent: '',
    ctaButton1Text: '',
    ctaButton1Link: '',
    ctaButton2Text: '',
    ctaButton2Link: ''
  })
  const [purposeImagePreview, setPurposeImagePreview] = useState<string | null>(null)
  const [purposeImageFile, setPurposeImageFile] = useState<File | null>(null)
  const purposeInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/recruitment-process')
      const result = await response.json()
      setData(result)
      if (result) {
        setFormData({
          heroTitle: result.heroTitle || '',
          heroSubtitle: result.heroSubtitle || '',
          purposeTitle: result.purposeTitle || '',
          purposeMissionTitle: result.purposeMissionTitle || '',
          purposeMissionContent: result.purposeMissionContent || '',
          purposeValuesTitle: result.purposeValuesTitle || '',
          purposeValuesContent: result.purposeValuesContent || '',
          purposeValues: result.purposeValues || [{ title: '', description: '' }],
          purposeImageCaption: result.purposeImageCaption || '',
          requirementsTitle: result.requirementsTitle || '',
          requirementsSubtitle: result.requirementsSubtitle || '',
          requirementsCategories: result.requirementsCategories || [
            { title: '', items: [''] },
            { title: '', items: [''] },
            { title: '', items: [''] },
            { title: '', items: [''] }
          ],
          processTitle: result.processTitle || '',
          processSubtitle: result.processSubtitle || '',
          processSteps: result.processSteps || [
            {
              stepNumber: 1,
              title: '',
              leftTitle: '',
              leftItems: [''],
              rightTitle: '',
              rightItems: [''],
              bgColor: 'bg-gray-800'
            }
          ],
          ctaTitle: result.ctaTitle || '',
          ctaContent: result.ctaContent || '',
          ctaButton1Text: result.ctaButton1Text || '',
          ctaButton1Link: result.ctaButton1Link || '',
          ctaButton2Text: result.ctaButton2Text || '',
          ctaButton2Link: result.ctaButton2Link || ''
        })
        if (result.purposeImageUrl) {
          setPurposeImagePreview(result.purposeImageUrl)
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
      let purposeUpload: { secure_url: string; public_id: string } | null = null

      if (purposeImageFile) {
        const fd = new FormData()
        fd.append('file', purposeImageFile)
        fd.append('folder', 'ipos-steel/recruitment-process')
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (res.ok) purposeUpload = await res.json()
      }

      const response = await fetch('/api/admin/recruitment-process', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          purposeImageUrl: purposeUpload?.secure_url,
          purposeImagePublicId: purposeUpload?.public_id,
        }),
      })

      if (response.ok) {
        fetchData()
        toast.success('İşe Alım Süreci başarıyla güncellendi')
      }
    } catch (error) {
      console.error('Veri kaydedilirken hata:', error)
      toast.error('Veri kaydedilirken hata oluştu')
    }
  }

  const addPurposeValue = () => {
    setFormData({
      ...formData,
      purposeValues: [...formData.purposeValues, { title: '', description: '' }]
    })
  }

  const removePurposeValue = (index: number) => {
    setFormData({
      ...formData,
      purposeValues: formData.purposeValues.filter((_, i) => i !== index)
    })
  }

  const updatePurposeValue = (index: number, field: 'title' | 'description', value: string) => {
    const newValues = [...formData.purposeValues]
    newValues[index] = { ...newValues[index], [field]: value }
    setFormData({ ...formData, purposeValues: newValues })
  }

  const updateRequirementsCategory = (index: number, field: 'title', value: string) => {
    const newCategories = [...formData.requirementsCategories]
    newCategories[index] = { ...newCategories[index], [field]: value }
    setFormData({ ...formData, requirementsCategories: newCategories })
  }

  const addRequirementItem = (categoryIndex: number) => {
    const newCategories = [...formData.requirementsCategories]
    newCategories[categoryIndex].items.push('')
    setFormData({ ...formData, requirementsCategories: newCategories })
  }

  const removeRequirementItem = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...formData.requirementsCategories]
    newCategories[categoryIndex].items = newCategories[categoryIndex].items.filter((_, i) => i !== itemIndex)
    setFormData({ ...formData, requirementsCategories: newCategories })
  }

  const updateRequirementItem = (categoryIndex: number, itemIndex: number, value: string) => {
    const newCategories = [...formData.requirementsCategories]
    newCategories[categoryIndex].items[itemIndex] = value
    setFormData({ ...formData, requirementsCategories: newCategories })
  }

  const addProcessStep = () => {
    const newStep = {
      stepNumber: formData.processSteps.length + 1,
      title: '',
      leftTitle: '',
      leftItems: [''],
      rightTitle: '',
      rightItems: [''],
      bgColor: 'bg-gray-800'
    }
    setFormData({
      ...formData,
      processSteps: [...formData.processSteps, newStep]
    })
  }

  const removeProcessStep = (index: number) => {
    setFormData({
      ...formData,
      processSteps: formData.processSteps.filter((_, i) => i !== index)
    })
  }

  const updateProcessStep = (index: number, field: string, value: any) => {
    const newSteps = [...formData.processSteps]
    newSteps[index] = { ...newSteps[index], [field]: value }
    setFormData({ ...formData, processSteps: newSteps })
  }

  const addProcessStepItem = (stepIndex: number, side: 'left' | 'right') => {
    const newSteps = [...formData.processSteps]
    const field = side === 'left' ? 'leftItems' : 'rightItems'
    newSteps[stepIndex][field].push('')
    setFormData({ ...formData, processSteps: newSteps })
  }

  const removeProcessStepItem = (stepIndex: number, side: 'left' | 'right', itemIndex: number) => {
    const newSteps = [...formData.processSteps]
    const field = side === 'left' ? 'leftItems' : 'rightItems'
    newSteps[stepIndex][field] = newSteps[stepIndex][field].filter((_, i) => i !== itemIndex)
    setFormData({ ...formData, processSteps: newSteps })
  }

  const updateProcessStepItem = (stepIndex: number, side: 'left' | 'right', itemIndex: number, value: string) => {
    const newSteps = [...formData.processSteps]
    const field = side === 'left' ? 'leftItems' : 'rightItems'
    newSteps[stepIndex][field][itemIndex] = value
    setFormData({ ...formData, processSteps: newSteps })
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">İşe Alım Süreci Yönetimi</h2>
      
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

        {/* Amacımız Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Amacımız Bölümü</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="purposeTitle">Bölüm Başlığı</Label>
              <Input
                id="purposeTitle"
                value={formData.purposeTitle}
                onChange={(e) => setFormData({ ...formData, purposeTitle: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purposeMissionTitle">Misyon Başlığı</Label>
                <Input
                  id="purposeMissionTitle"
                  value={formData.purposeMissionTitle}
                  onChange={(e) => setFormData({ ...formData, purposeMissionTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="purposeValuesTitle">Değerler Başlığı</Label>
                <Input
                  id="purposeValuesTitle"
                  value={formData.purposeValuesTitle}
                  onChange={(e) => setFormData({ ...formData, purposeValuesTitle: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="purposeMissionContent">Misyon İçeriği</Label>
              <textarea
                id="purposeMissionContent"
                value={formData.purposeMissionContent}
                onChange={(e) => setFormData({ ...formData, purposeMissionContent: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="purposeValuesContent">Değerler İçeriği</Label>
              <textarea
                id="purposeValuesContent"
                value={formData.purposeValuesContent}
                onChange={(e) => setFormData({ ...formData, purposeValuesContent: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <Label>Değerler</Label>
              {formData.purposeValues.map((value, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <Input
                      value={value.title}
                      onChange={(e) => updatePurposeValue(index, 'title', e.target.value)}
                      placeholder="Değer başlığı"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removePurposeValue(index)}
                      disabled={formData.purposeValues.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <textarea
                    value={value.description}
                    onChange={(e) => updatePurposeValue(index, 'description', e.target.value)}
                    placeholder="Değer açıklaması"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addPurposeValue} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Değer Ekle
              </Button>
            </div>
            <div>
              <Label>Görsel</Label>
              <div className="mt-1 flex items-center gap-3">
                <input
                  ref={purposeInputRef}
                  id="purposeImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setPurposeImageFile(f)
                    setPurposeImagePreview(f ? URL.createObjectURL(f) : null)
                  }}
                />
                <Button type="button" variant="outline" onClick={() => purposeInputRef.current?.click()}>
                  Görsel Seç
                </Button>
                {purposeImageFile ? (
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {purposeImageFile.name}
                  </span>
                ) : data?.purposeImageUrl ? (
                  <span className="text-sm text-gray-600">Mevcut görsel yüklü</span>
                ) : (
                  <span className="text-sm text-gray-400">Seçili görsel yok</span>
                )}
                {(purposeImagePreview || data?.purposeImageUrl) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPurposeImageFile(null)
                      setPurposeImagePreview(null)
                      if (purposeInputRef.current) purposeInputRef.current.value = ''
                    }}
                    className="ml-auto"
                  >
                    Kaldır
                  </Button>
                )}
              </div>
              {(purposeImagePreview || data?.purposeImageUrl) && (
                <img
                  src={purposeImagePreview || data?.purposeImageUrl || ''}
                  alt="Amacımız Görseli"
                  className="mt-2 h-28 w-28 object-cover rounded border"
                />
              )}
            </div>
            <div>
              <Label htmlFor="purposeImageCaption">Görsel Açıklaması</Label>
              <Input
                id="purposeImageCaption"
                value={formData.purposeImageCaption}
                onChange={(e) => setFormData({ ...formData, purposeImageCaption: e.target.value })}
                placeholder="Görsel alt yazısı"
              />
            </div>
          </div>
        </div>

        {/* Aradığımız Özellikler Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Aradığımız Özellikler Bölümü</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="requirementsTitle">Başlık</Label>
                <Input
                  id="requirementsTitle"
                  value={formData.requirementsTitle}
                  onChange={(e) => setFormData({ ...formData, requirementsTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="requirementsSubtitle">Alt Başlık</Label>
                <Input
                  id="requirementsSubtitle"
                  value={formData.requirementsSubtitle}
                  onChange={(e) => setFormData({ ...formData, requirementsSubtitle: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Kategoriler</Label>
              {formData.requirementsCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="border p-4 rounded mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      value={category.title}
                      onChange={(e) => updateRequirementsCategory(categoryIndex, 'title', e.target.value)}
                      placeholder="Kategori başlığı"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addRequirementItem(categoryIndex)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Madde Ekle
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => updateRequirementItem(categoryIndex, itemIndex, e.target.value)}
                          placeholder="Madde açıklaması"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeRequirementItem(categoryIndex, itemIndex)}
                          disabled={category.items.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* İşe Alım Süreci Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">İşe Alım Süreci Bölümü</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="processTitle">Başlık</Label>
                <Input
                  id="processTitle"
                  value={formData.processTitle}
                  onChange={(e) => setFormData({ ...formData, processTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="processSubtitle">Alt Başlık</Label>
                <Input
                  id="processSubtitle"
                  value={formData.processSubtitle}
                  onChange={(e) => setFormData({ ...formData, processSubtitle: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Süreç Adımları</Label>
              {formData.processSteps.map((step, stepIndex) => (
                <div key={stepIndex} className="border p-4 rounded mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Adım Başlığı</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => updateProcessStep(stepIndex, 'title', e.target.value)}
                        placeholder="Adım başlığı"
                      />
                    </div>
                    <div>
                      <Label>Arka Plan Rengi</Label>
                      <select
                        value={step.bgColor}
                        onChange={(e) => updateProcessStep(stepIndex, 'bgColor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="bg-gray-800">Koyu Gri</option>
                        <option value="bg-gray-700">Orta Gri</option>
                        <option value="bg-gray-600">Açık Gri</option>
                        <option value="bg-gray-500">Çok Açık Gri</option>
                        <option value="bg-gray-400">En Açık Gri</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Sol Taraf Başlığı</Label>
                      <Input
                        value={step.leftTitle}
                        onChange={(e) => updateProcessStep(stepIndex, 'leftTitle', e.target.value)}
                        placeholder="Sol taraf başlığı"
                      />
                      <div className="mt-2 space-y-2">
                        {step.leftItems.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateProcessStepItem(stepIndex, 'left', itemIndex, e.target.value)}
                              placeholder="Sol taraf madde"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => removeProcessStepItem(stepIndex, 'left', itemIndex)}
                              disabled={step.leftItems.length === 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addProcessStepItem(stepIndex, 'left')}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Sol Taraf Madde Ekle
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Sağ Taraf Başlığı</Label>
                      <Input
                        value={step.rightTitle}
                        onChange={(e) => updateProcessStep(stepIndex, 'rightTitle', e.target.value)}
                        placeholder="Sağ taraf başlığı"
                      />
                      <div className="mt-2 space-y-2">
                        {step.rightItems.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateProcessStepItem(stepIndex, 'right', itemIndex, e.target.value)}
                              placeholder="Sağ taraf madde"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => removeProcessStepItem(stepIndex, 'right', itemIndex)}
                              disabled={step.rightItems.length === 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => addProcessStepItem(stepIndex, 'right')}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Sağ Taraf Madde Ekle
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeProcessStep(stepIndex)}
                      disabled={formData.processSteps.length === 1}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Adımı Sil
                    </Button>
                    <span className="text-sm text-gray-500">Adım {step.stepNumber}</span>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addProcessStep} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Süreç Adımı Ekle
              </Button>
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

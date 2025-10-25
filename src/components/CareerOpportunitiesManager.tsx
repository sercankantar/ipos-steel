'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Target, Eye } from 'lucide-react'
import { toast } from 'sonner'
import RichTextEditor from '@/components/ui/RichTextEditor'

interface CareerOpportunitiesData {
  id: string
  heroTitle: string
  heroSubtitle?: string
  mainTitle: string
  mainSubtitle?: string
  mainDescription: string
  platformCards: Array<{
    title: string
    logoUrl: string
    buttonText: string
    buttonLink: string
    buttonColor: string
  }>
  kvkkTitle: string
  kvkkContent: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function CareerOpportunitiesManager() {
  const [data, setData] = useState<CareerOpportunitiesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    mainTitle: '',
    mainSubtitle: '',
    mainDescription: '',
    platformCards: [
      {
        title: '',
        logoUrl: '',
        buttonText: '',
        buttonLink: '',
        buttonColor: 'bg-red-600 hover:bg-red-700'
      }
    ],
    kvkkTitle: '',
    kvkkContent: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/career-opportunities')
      const result = await response.json()
      setData(result)
      if (result) {
        setFormData({
          heroTitle: result.heroTitle || '',
          heroSubtitle: result.heroSubtitle || '',
          mainTitle: result.mainTitle || '',
          mainSubtitle: result.mainSubtitle || '',
          mainDescription: result.mainDescription || '',
          platformCards: result.platformCards || [
            {
              title: '',
              logoUrl: '',
              buttonText: '',
              buttonLink: '',
              buttonColor: 'bg-red-600 hover:bg-red-700'
            }
          ],
          kvkkTitle: result.kvkkTitle || '',
          kvkkContent: result.kvkkContent || ''
        })
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
      const response = await fetch('/api/admin/career-opportunities', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchData()
        toast.success('Kariyer Fırsatları başarıyla güncellendi')
      }
    } catch (error) {
      console.error('Veri kaydedilirken hata:', error)
      toast.error('Veri kaydedilirken hata oluştu')
    }
  }

  const addPlatformCard = () => {
    setFormData({
      ...formData,
      platformCards: [...formData.platformCards, {
        title: '',
        logoUrl: '',
        buttonText: '',
        buttonLink: '',
        buttonColor: 'bg-red-600 hover:bg-red-700'
      }]
    })
  }

  const removePlatformCard = (index: number) => {
    setFormData({
      ...formData,
      platformCards: formData.platformCards.filter((_, i) => i !== index)
    })
  }

  const updatePlatformCard = (index: number, field: string, value: string) => {
    const newCards = [...formData.platformCards]
    newCards[index] = { ...newCards[index], [field]: value }
    setFormData({ ...formData, platformCards: newCards })
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Kariyer Fırsatları Yönetimi</h2>
      
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
              <Label htmlFor="heroSubtitle">Hero Alt Başlık (Opsiyonel)</Label>
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mainTitle">Ana Başlık</Label>
                <Input
                  id="mainTitle"
                  value={formData.mainTitle}
                  onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mainSubtitle">Ana Alt Başlık (Opsiyonel)</Label>
                <Input
                  id="mainSubtitle"
                  value={formData.mainSubtitle}
                  onChange={(e) => setFormData({ ...formData, mainSubtitle: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="mainDescription">Ana Açıklama</Label>
              <div className="mt-2">
                <RichTextEditor
                  value={formData.mainDescription}
                  onChange={(value) => setFormData({ ...formData, mainDescription: value })}
                  placeholder="Ana açıklama içeriğini girin..."
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Kartları */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium mb-4">Platform Kartları</h3>
          <div className="space-y-4">
            {formData.platformCards.map((card, index) => (
              <div key={index} className="border p-4 rounded mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Kart Başlığı</Label>
                    <Input
                      value={card.title}
                      onChange={(e) => updatePlatformCard(index, 'title', e.target.value)}
                      placeholder="Kart başlığı"
                    />
                  </div>
                  <div>
                    <Label>Logo URL</Label>
                    <Input
                      value={card.logoUrl}
                      onChange={(e) => updatePlatformCard(index, 'logoUrl', e.target.value)}
                      placeholder="Logo URL'si"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Buton Metni</Label>
                    <Input
                      value={card.buttonText}
                      onChange={(e) => updatePlatformCard(index, 'buttonText', e.target.value)}
                      placeholder="Buton metni"
                    />
                  </div>
                  <div>
                    <Label>Buton Linki</Label>
                    <Input
                      value={card.buttonLink}
                      onChange={(e) => updatePlatformCard(index, 'buttonLink', e.target.value)}
                      placeholder="Buton linki"
                    />
                  </div>
                  <div>
                    <Label>Buton Rengi</Label>
                    <select
                      value={card.buttonColor}
                      onChange={(e) => updatePlatformCard(index, 'buttonColor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="bg-red-600 hover:bg-red-700">Kırmızı</option>
                      <option value="bg-blue-600 hover:bg-blue-700">Mavi</option>
                      <option value="bg-green-600 hover:bg-green-700">Yeşil</option>
                      <option value="bg-purple-600 hover:bg-purple-700">Mor</option>
                      <option value="bg-orange-600 hover:bg-orange-700">Turuncu</option>
                      <option value="bg-gray-600 hover:bg-gray-700">Gri</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Kart {index + 1}</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removePlatformCard(index)}
                    disabled={formData.platformCards.length === 1}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Kartı Sil
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addPlatformCard} className="mt-2">
              <Plus className="w-4 h-4 mr-2" />
              Platform Kartı Ekle
            </Button>
          </div>
        </div>

        {/* KVKK Onay */}
        <div className="pb-6">
          <h3 className="text-lg font-medium mb-4">KVKK Onay Bölümü</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="kvkkTitle">KVKK Başlığı</Label>
              <Input
                id="kvkkTitle"
                value={formData.kvkkTitle}
                onChange={(e) => setFormData({ ...formData, kvkkTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="kvkkContent">KVKK İçeriği</Label>
              <textarea
                id="kvkkContent"
                value={formData.kvkkContent}
                onChange={(e) => setFormData({ ...formData, kvkkContent: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
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

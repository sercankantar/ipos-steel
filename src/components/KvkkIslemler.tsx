'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { toast } from 'sonner'
import RichTextEditor from '@/components/ui/RichTextEditor'

interface KvkkPrivacyPolicy {
  id: string
  title: string
  lastUpdated: string
  amac: string
  kapsam: string
  tanimlar: string
  roller: string
  yukumlulukler: string
  siniflandirma: string
  islenmesi: string
  aktarilmasi: string
  saklanmasi: string
  guvenligi: string
  haklari: string
  gizlilik: string
  girisCikis: string
  silinmesi: string
  yayinlanmasi: string
  guncelleme: string
  yururluk: string
  email: string
  telefon: string
  adres: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface KvkkDisclosureText {
  id: string
  title: string
  lastUpdated: string
  heroTitle: string
  heroSubtitle: string
  veriSorumlusuTitle: string
  veriSorumlusuContent: string
  islemeAmaciTitle: string
  islemeAmaciContent: string
  islemeAmaciBullets: string[]
  calisanVerileriTitle: string
  calisanVerileriContent: string
  aktarilmaTitle: string
  aktarilmaContent: string
  yurtIciAktarim: string[]
  yurtDisiAktarim: string[]
  acikRizaTitle: string
  acikRizaContent: string
  acikRizaBullets: string[]
  toplamaYontemiTitle: string
  toplamaYontemiContent: string
  dijitalKanallar: string[]
  fizikselKanallar: string[]
  iletisimKanallari: string[]
  haklarTitle: string
  haklarContent: string
  haklarListesi: string[]
  haklarKullanimTitle: string
  haklarKullanimContent: string
  emailIletisim: string
  kepIletisim: string
  basvuruSartlari: string[]
  iletisimTitle: string
  iletisimContent: string
  email: string
  telefon: string
  adres: string
  mapUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

type KvkkTabKey = 'privacy' | 'disclosure'

export default function KvkkIslemler() {
  const [activeTab, setActiveTab] = useState<KvkkTabKey>('privacy')
  const [policies, setPolicies] = useState<KvkkPrivacyPolicy[]>([])
  const [disclosureTexts, setDisclosureTexts] = useState<KvkkDisclosureText[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<KvkkPrivacyPolicy | null>(null)
  const [editingDisclosure, setEditingDisclosure] = useState<KvkkDisclosureText | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form state for privacy policy
  const [formData, setFormData] = useState({
    title: "Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası",
    content: "",
    email: "",
    telefon: "",
    adres: "",
    isActive: true
  })

  // Form state for disclosure text
  const [disclosureFormData, setDisclosureFormData] = useState({
    title: "Kişisel Verilere İlişkin Aydınlatma Metni",
    
    // Hero Section
    heroTitle: '',
    heroSubtitle: '',

    // Veri Sorumlusu Bölümü
    veriSorumlusuTitle: "Veri Sorumlusu",
    veriSorumlusuContent: '',
    
    // Yeni HTML içerik alanı
    content: '',

    // İletişim Bölümü
    iletisimTitle: "İletişim",
    iletisimContent: '',

    // İletişim Bilgileri
    email: '',
    telefon: '',
    adres: '',
    mapUrl: '',
    isActive: true
  })

  useEffect(() => {
    fetchPolicies()
    fetchDisclosureTexts()
  }, [])

  const fetchPolicies = async () => {
    try {
      const response = await fetch('/api/admin/kvkk-privacy-policy')
      const data = await response.json()
      setPolicies(data)
    } catch (error) {
      console.error('KVKK Gizlilik Politikaları yüklenirken hata:', error)
      toast.error('Veriler yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const fetchDisclosureTexts = async () => {
    try {
      const response = await fetch('/api/admin/kvkk-disclosure-text')
      const data = await response.json()
      
      // Verinin array olduğundan emin ol
      if (Array.isArray(data)) {
        setDisclosureTexts(data)
      } else {
        console.error('API\'den gelen veri array değil:', data)
        setDisclosureTexts([])
      }
    } catch (error) {
      console.error('KVKK Aydınlatma Metinleri yüklenirken hata:', error)
      toast.error('Veriler yüklenirken hata oluştu')
      setDisclosureTexts([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const url = editingPolicy 
        ? `/api/admin/kvkk-privacy-policy/${editingPolicy.id}`
        : '/api/admin/kvkk-privacy-policy'
      
      const method = editingPolicy ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingPolicy ? 'Politika güncellendi' : 'Politika oluşturuldu')
        fetchPolicies()
        resetForm()
      } else {
        throw new Error('İşlem başarısız')
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error)
      toast.error('İşlem sırasında hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDisclosureSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const url = editingDisclosure 
        ? `/api/admin/kvkk-disclosure-text/${editingDisclosure.id}`
        : '/api/admin/kvkk-disclosure-text'
      
      const method = editingDisclosure ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disclosureFormData)
      })

      if (response.ok) {
        toast.success(editingDisclosure ? 'Aydınlatma metni güncellendi' : 'Aydınlatma metni oluşturuldu')
        fetchDisclosureTexts()
        resetDisclosureForm()
      } else {
        throw new Error('İşlem başarısız')
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error)
      toast.error('İşlem sırasında hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (policy: KvkkPrivacyPolicy) => {
    setEditingPolicy(policy)
    setFormData({
      title: policy.title,
      content: policy.content || '',
      email: policy.email || '',
      telefon: policy.telefon || '',
      adres: policy.adres || '',
      isActive: policy.isActive
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu politikayı silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/kvkk-privacy-policy/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Politika silindi')
        fetchPolicies()
      } else {
        throw new Error('Silme işlemi başarısız')
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      toast.error('Silme işlemi sırasında hata oluştu')
    }
  }

  const handleDisclosureEdit = (disclosure: KvkkDisclosureText) => {
    setEditingDisclosure(disclosure)
    setDisclosureFormData({
      title: disclosure.title,
      heroTitle: disclosure.heroTitle,
      heroSubtitle: disclosure.heroSubtitle,
      veriSorumlusuTitle: disclosure.veriSorumlusuTitle,
      veriSorumlusuContent: disclosure.veriSorumlusuContent,
      content: disclosure.content || '',
      iletisimTitle: disclosure.iletisimTitle,
      iletisimContent: disclosure.iletisimContent,
      email: disclosure.email,
      telefon: disclosure.telefon,
      adres: disclosure.adres,
      isActive: disclosure.isActive
    })
    setShowForm(true)
  }

  const handleDisclosureDelete = async (id: string) => {
    if (!confirm('Bu aydınlatma metnini silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/kvkk-disclosure-text/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Aydınlatma metni silindi')
        fetchDisclosureTexts()
      } else {
        throw new Error('Silme işlemi başarısız')
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      toast.error('Silme işlemi sırasında hata oluştu')
    }
  }

  const resetForm = () => {
    setFormData({
      title: "Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası",
      content: "",
      email: "",
      telefon: "",
      adres: "",
      isActive: true
    })
    setEditingPolicy(null)
    setShowForm(false)
  }

  // Array alanları için yardımcı fonksiyonlar
  const addArrayItem = (field: string, value: string) => {
    if (value.trim()) {
      setDisclosureFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), value.trim()]
      }))
    }
  }

  const removeArrayItem = (field: string, index: number) => {
    setDisclosureFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    setDisclosureFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => i === index ? value : item)
    }))
  }

  const resetDisclosureForm = () => {
    setDisclosureFormData({
      title: "Kişisel Verilere İlişkin Aydınlatma Metni",
      heroTitle: '',
      heroSubtitle: '',
      veriSorumlusuTitle: "Veri Sorumlusu",
      veriSorumlusuContent: '',
      content: '',
      iletisimTitle: "İletişim",
      iletisimContent: '',
      email: '',
      telefon: '',
      adres: '',
      isActive: true
    })
    setEditingDisclosure(null)
    setShowForm(false)
  }

  const tabs = [
    { key: 'privacy', label: 'Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası' },
    { key: 'disclosure', label: 'Kişisel Verilere İlişkin Aydınlatma Metni' }
  ]

  if (loading) {
    return <div className="flex justify-center items-center h-64">Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as KvkkTabKey)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">KVKK Gizlilik Politikası Yönetimi</h2>
              <p className="text-gray-600">Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası içeriğini yönetin</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Politika
            </Button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingPolicy ? 'Politika Düzenle' : 'Yeni Politika Oluştur'}
                </h3>
                <Button variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Temel Bilgiler */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefon">Telefon</Label>
                    <Input
                      id="telefon"
                      value={formData.telefon}
                      onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="adres">Adres</Label>
                  <Input
                    id="adres"
                    value={formData.adres}
                    onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                    required
                  />
                </div>

                {/* İçerik */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium mb-4">İçerik</h3>
                  <div className="pb-8">
                    <Label htmlFor="content">KVKK Gizlilik Politikası İçeriği</Label>
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                      placeholder="KVKK Gizlilik Politikası içeriğini girin..."
                      height={400}
                    />
                  </div>
                </div>

                {/* Durum */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Aktif</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    İptal
                  </Button>
                  <Button type="submit" className="flex items-center gap-2" disabled={isSaving}>
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Kaydediliyor...' : (editingPolicy ? 'Güncelle' : 'Oluştur')}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Policies List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Mevcut Politikalar</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {policies.map((policy) => (
                <div key={policy.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{policy.title}</h4>
                      <p className="text-sm text-gray-500">
                        Son güncelleme: {new Date(policy.updatedAt).toLocaleDateString('tr-TR')}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          policy.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {policy.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        <span className="text-sm text-gray-500">
                          E-posta: {policy.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(policy)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(policy.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'disclosure' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">KVKK Aydınlatma Metni Yönetimi</h2>
              <p className="text-gray-600">Kişisel Verilere İlişkin Aydınlatma Metni içeriğini yönetin</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Aydınlatma Metni
            </Button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingDisclosure ? 'Aydınlatma Metni Düzenle' : 'Yeni Aydınlatma Metni Oluştur'}
                </h3>
                <Button variant="outline" onClick={resetDisclosureForm}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleDisclosureSubmit} className="space-y-6">
                {/* Temel Bilgiler */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="disclosureTitle">Başlık</Label>
                    <Input
                      id="disclosureTitle"
                      value={disclosureFormData.title}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroTitle">Hero Başlık</Label>
                    <Input
                      id="heroTitle"
                      value={disclosureFormData.heroTitle}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, heroTitle: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="heroSubtitle">Hero Alt Başlık</Label>
                  <Input
                    id="heroSubtitle"
                    value={disclosureFormData.heroSubtitle}
                    onChange={(e) => setDisclosureFormData({ ...disclosureFormData, heroSubtitle: e.target.value })}
                    required
                  />
                </div>

                {/* Veri Sorumlusu Bölümü */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Veri Sorumlusu Bölümü</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="veriSorumlusuTitle">Bölüm Başlığı</Label>
                      <Input
                        id="veriSorumlusuTitle"
                        value={disclosureFormData.veriSorumlusuTitle}
                        onChange={(e) => setDisclosureFormData({ ...disclosureFormData, veriSorumlusuTitle: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="veriSorumlusuContent">İçerik</Label>
                    <textarea
                      id="veriSorumlusuContent"
                      value={disclosureFormData.veriSorumlusuContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, veriSorumlusuContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* İçerik */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium mb-4">Ana İçerik</h3>
                  <div className="pb-8">
                    <Label htmlFor="disclosureContent">Aydınlatma Metni İçeriği</Label>
                    <RichTextEditor
                      value={disclosureFormData.content}
                      onChange={(value) => setDisclosureFormData({ ...disclosureFormData, content: value })}
                      placeholder="Aydınlatma metni içeriğini girin..."
                      height={400}
                    />
                  </div>
                </div>

                {/* İletişim Bölümü */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">İletişim Bölümü</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="iletisimTitle">Bölüm Başlığı</Label>
                      <Input
                        id="iletisimTitle"
                        value={disclosureFormData.iletisimTitle}
                        onChange={(e) => setDisclosureFormData({ ...disclosureFormData, iletisimTitle: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="iletisimContent">İçerik</Label>
                    <textarea
                      id="iletisimContent"
                      value={disclosureFormData.iletisimContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, iletisimContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* İletişim Bilgileri */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="disclosureEmail">E-posta</Label>
                    <Input
                      id="disclosureEmail"
                      type="email"
                      value={disclosureFormData.email}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="disclosureTelefon">Telefon</Label>
                    <Input
                      id="disclosureTelefon"
                      value={disclosureFormData.telefon}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, telefon: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="mapUrl">Harita URL</Label>
                    <Input
                      id="mapUrl"
                      value={disclosureFormData.mapUrl}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, mapUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="disclosureAdres">Adres</Label>
                  <Input
                    id="disclosureAdres"
                    value={disclosureFormData.adres}
                    onChange={(e) => setDisclosureFormData({ ...disclosureFormData, adres: e.target.value })}
                    required
                  />
                </div>

                {/* Durum */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="disclosureIsActive"
                    checked={disclosureFormData.isActive}
                    onChange={(e) => setDisclosureFormData({ ...disclosureFormData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="disclosureIsActive">Aktif</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={resetDisclosureForm}>
                    İptal
                  </Button>
                  <Button type="submit" className="flex items-center gap-2" disabled={isSaving}>
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Kaydediliyor...' : (editingDisclosure ? 'Güncelle' : 'Oluştur')}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Disclosure Texts List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Mevcut Aydınlatma Metinleri</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {Array.isArray(disclosureTexts) && disclosureTexts.length > 0 ? (
                disclosureTexts.map((disclosure) => (
                <div key={disclosure.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{disclosure.title}</h4>
                      <p className="text-sm text-gray-500">
                        Son güncelleme: {new Date(disclosure.updatedAt).toLocaleDateString('tr-TR')}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          disclosure.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {disclosure.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        <span className="text-sm text-gray-500">
                          E-posta: {disclosure.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisclosureEdit(disclosure)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisclosureDelete(disclosure.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>Henüz aydınlatma metni oluşturulmamış.</p>
                  <p className="text-sm mt-1">Yeni aydınlatma metni oluşturmak için yukarıdaki butonu kullanın.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

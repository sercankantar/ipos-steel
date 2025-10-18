'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { toast } from 'sonner'

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
    
    // Bölüm Başlıkları
    amacTitle: "Amaç",
    kapsamTitle: "Kapsam",
    tanimlarTitle: "Tanım ve Kısaltmalar",
    rollerTitle: "Rol ve Sorumluluklar",
    yukumluluklerTitle: "Hukuki Yükümlülükler",
    siniflandirmaTitle: "Kişisel Verilerin Sınıflandırılması",
    islenmesiTitle: "Kişisel Verilerin İşlenmesi",
    aktarilmasiTitle: "Kişisel Verilerin Aktarılması",
    saklanmasiTitle: "Kişisel Verilerin Saklanması",
    guvenligiTitle: "Kişisel Verilerin Güvenliği",
    haklariTitle: "Kişisel Veri Sahibinin Hakları",
    gizlilikTitle: "Gizlilik Politikası",
    girisCikisTitle: "Şirket Giriş-Çıkışları ve Kişisel Veriler",
    silinmesiTitle: "Kişisel Verilerin Silinmesi",
    yayinlanmasiTitle: "Dokümanın Yayınlanması",
    guncellemeTitle: "Güncelleme Periyodu",
    yururlukTitle: "Yürürlük",

    // Bölüm İçerikleri
    amac: '',
    kapsam: '',
    tanimlar: '',
    roller: '',
    yukumlulukler: '',
    siniflandirma: '',
    islenmesi: '',
    aktarilmasi: '',
    saklanmasi: '',
    guvenligi: '',
    haklari: '',
    gizlilik: '',
    girisCikis: '',
    silinmesi: '',
    yayinlanmasi: '',
    guncelleme: '',
    yururluk: '',
    email: '',
    telefon: '',
    adres: '',
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

    // Kişisel Verilerin İşlenme Amacı Bölümü
    islemeAmaciTitle: "Kişisel Verilerinizin İşlenme Amacı",
    islemeAmaciContent: '',
    islemeAmaciBullets: [] as string[],
    calisanVerileriTitle: "Çalışan Verileri",
    calisanVerileriContent: '',

    // Kişisel Verilerin Aktarılması Bölümü
    aktarilmaTitle: "Kişisel Verilerinizin Aktarılması",
    aktarilmaContent: '',
    yurtIciAktarim: [] as string[],
    yurtDisiAktarim: [] as string[],
    acikRizaTitle: "Açık Rıza ile İşleme",
    acikRizaContent: '',
    acikRizaBullets: [] as string[],

    // Toplanma Yöntemi ve Hukuki Sebep Bölümü
    toplamaYontemiTitle: "Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi",
    toplamaYontemiContent: '',
    dijitalKanallar: [] as string[],
    fizikselKanallar: [] as string[],
    iletisimKanallari: [] as string[],

    // Kişisel Veri Sahibi Hakları Bölümü
    haklarTitle: "Kişisel Veri Sahibi Olarak Haklarınız",
    haklarContent: '',
    haklarListesi: [] as string[],
    haklarKullanimTitle: "Haklarınızı Nasıl Kullanabilirsiniz?",
    haklarKullanimContent: '',
    emailIletisim: 'kvkk@ipossteel.com',
    kepIletisim: 'ipossteel@hs01.kep.tr',
    basvuruSartlari: [] as string[],

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
      
      // Bölüm Başlıkları
      amacTitle: policy.amacTitle || "Amaç",
      kapsamTitle: policy.kapsamTitle || "Kapsam",
      tanimlarTitle: policy.tanimlarTitle || "Tanım ve Kısaltmalar",
      rollerTitle: policy.rollerTitle || "Rol ve Sorumluluklar",
      yukumluluklerTitle: policy.yukumluluklerTitle || "Hukuki Yükümlülükler",
      siniflandirmaTitle: policy.siniflandirmaTitle || "Kişisel Verilerin Sınıflandırılması",
      islenmesiTitle: policy.islenmesiTitle || "Kişisel Verilerin İşlenmesi",
      aktarilmasiTitle: policy.aktarilmasiTitle || "Kişisel Verilerin Aktarılması",
      saklanmasiTitle: policy.saklanmasiTitle || "Kişisel Verilerin Saklanması",
      guvenligiTitle: policy.guvenligiTitle || "Kişisel Verilerin Güvenliği",
      haklariTitle: policy.haklariTitle || "Kişisel Veri Sahibinin Hakları",
      gizlilikTitle: policy.gizlilikTitle || "Gizlilik Politikası",
      girisCikisTitle: policy.girisCikisTitle || "Şirket Giriş-Çıkışları ve Kişisel Veriler",
      silinmesiTitle: policy.silinmesiTitle || "Kişisel Verilerin Silinmesi",
      yayinlanmasiTitle: policy.yayinlanmasiTitle || "Dokümanın Yayınlanması",
      guncellemeTitle: policy.guncellemeTitle || "Güncelleme Periyodu",
      yururlukTitle: policy.yururlukTitle || "Yürürlük",

      // Bölüm İçerikleri
      amac: policy.amac,
      kapsam: policy.kapsam,
      tanimlar: policy.tanimlar,
      roller: policy.roller,
      yukumlulukler: policy.yukumlulukler,
      siniflandirma: policy.siniflandirma,
      islenmesi: policy.islenmesi,
      aktarilmasi: policy.aktarilmasi,
      saklanmasi: policy.saklanmasi,
      guvenligi: policy.guvenligi,
      haklari: policy.haklari,
      gizlilik: policy.gizlilik,
      girisCikis: policy.girisCikis,
      silinmesi: policy.silinmesi,
      yayinlanmasi: policy.yayinlanmasi,
      guncelleme: policy.guncelleme,
      yururluk: policy.yururluk,
      email: policy.email,
      telefon: policy.telefon,
      adres: policy.adres,
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
      islemeAmaciTitle: disclosure.islemeAmaciTitle,
      islemeAmaciContent: disclosure.islemeAmaciContent,
      islemeAmaciBullets: disclosure.islemeAmaciBullets,
      calisanVerileriTitle: disclosure.calisanVerileriTitle,
      calisanVerileriContent: disclosure.calisanVerileriContent,
      aktarilmaTitle: disclosure.aktarilmaTitle,
      aktarilmaContent: disclosure.aktarilmaContent,
      yurtIciAktarim: disclosure.yurtIciAktarim,
      yurtDisiAktarim: disclosure.yurtDisiAktarim,
      acikRizaTitle: disclosure.acikRizaTitle,
      acikRizaContent: disclosure.acikRizaContent,
      acikRizaBullets: disclosure.acikRizaBullets,
      toplamaYontemiTitle: disclosure.toplamaYontemiTitle,
      toplamaYontemiContent: disclosure.toplamaYontemiContent,
      dijitalKanallar: disclosure.dijitalKanallar,
      fizikselKanallar: disclosure.fizikselKanallar,
      iletisimKanallari: disclosure.iletisimKanallari,
      haklarTitle: disclosure.haklarTitle,
      haklarContent: disclosure.haklarContent,
      haklarListesi: disclosure.haklarListesi,
      haklarKullanimTitle: disclosure.haklarKullanimTitle,
      haklarKullanimContent: disclosure.haklarKullanimContent,
      emailIletisim: disclosure.emailIletisim,
      kepIletisim: disclosure.kepIletisim,
      basvuruSartlari: disclosure.basvuruSartlari,
      iletisimTitle: disclosure.iletisimTitle,
      iletisimContent: disclosure.iletisimContent,
      email: disclosure.email,
      telefon: disclosure.telefon,
      adres: disclosure.adres,
      mapUrl: disclosure.mapUrl || '',
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
      
      // Bölüm Başlıkları
      amacTitle: "Amaç",
      kapsamTitle: "Kapsam",
      tanimlarTitle: "Tanım ve Kısaltmalar",
      rollerTitle: "Rol ve Sorumluluklar",
      yukumluluklerTitle: "Hukuki Yükümlülükler",
      siniflandirmaTitle: "Kişisel Verilerin Sınıflandırılması",
      islenmesiTitle: "Kişisel Verilerin İşlenmesi",
      aktarilmasiTitle: "Kişisel Verilerin Aktarılması",
      saklanmasiTitle: "Kişisel Verilerin Saklanması",
      guvenligiTitle: "Kişisel Verilerin Güvenliği",
      haklariTitle: "Kişisel Veri Sahibinin Hakları",
      gizlilikTitle: "Gizlilik Politikası",
      girisCikisTitle: "Şirket Giriş-Çıkışları ve Kişisel Veriler",
      silinmesiTitle: "Kişisel Verilerin Silinmesi",
      yayinlanmasiTitle: "Dokümanın Yayınlanması",
      guncellemeTitle: "Güncelleme Periyodu",
      yururlukTitle: "Yürürlük",

      // Bölüm İçerikleri
      amac: '',
      kapsam: '',
      tanimlar: '',
      roller: '',
      yukumlulukler: '',
      siniflandirma: '',
      islenmesi: '',
      aktarilmasi: '',
      saklanmasi: '',
      guvenligi: '',
      haklari: '',
      gizlilik: '',
      girisCikis: '',
      silinmesi: '',
      yayinlanmasi: '',
      guncelleme: '',
      yururluk: '',
      email: '',
      telefon: '',
      adres: '',
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
      islemeAmaciTitle: "Kişisel Verilerinizin İşlenme Amacı",
      islemeAmaciContent: '',
      islemeAmaciBullets: [],
      calisanVerileriTitle: "Çalışan Verileri",
      calisanVerileriContent: '',
      aktarilmaTitle: "Kişisel Verilerinizin Aktarılması",
      aktarilmaContent: '',
      yurtIciAktarim: [],
      yurtDisiAktarim: [],
      acikRizaTitle: "Açık Rıza ile İşleme",
      acikRizaContent: '',
      acikRizaBullets: [],
      toplamaYontemiTitle: "Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi",
      toplamaYontemiContent: '',
      dijitalKanallar: [],
      fizikselKanallar: [],
      iletisimKanallari: [],
      haklarTitle: "Kişisel Veri Sahibi Olarak Haklarınız",
      haklarContent: '',
      haklarListesi: [],
      haklarKullanimTitle: "Haklarınızı Nasıl Kullanabilirsiniz?",
      haklarKullanimContent: '',
      emailIletisim: 'kvkk@ipossteel.com',
      kepIletisim: 'ipossteel@hs01.kep.tr',
      basvuruSartlari: [],
      iletisimTitle: "İletişim",
      iletisimContent: '',
      email: '',
      telefon: '',
      adres: '',
      mapUrl: '',
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

                {/* Bölümler */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900">Politika Bölümleri</h4>
                  
                  {[
                    { key: 'amac', titleKey: 'amacTitle', label: '1. Amaç' },
                    { key: 'kapsam', titleKey: 'kapsamTitle', label: '2. Kapsam' },
                    { key: 'tanimlar', titleKey: 'tanimlarTitle', label: '3. Tanım ve Kısaltmalar' },
                    { key: 'roller', titleKey: 'rollerTitle', label: '4. Rol ve Sorumluluklar' },
                    { key: 'yukumlulukler', titleKey: 'yukumluluklerTitle', label: '5. Hukuki Yükümlülükler' },
                    { key: 'siniflandirma', titleKey: 'siniflandirmaTitle', label: '6. Kişisel Verilerin Sınıflandırılması' },
                    { key: 'islenmesi', titleKey: 'islenmesiTitle', label: '7. Kişisel Verilerin İşlenmesi' },
                    { key: 'aktarilmasi', titleKey: 'aktarilmasiTitle', label: '8. Kişisel Verilerin Aktarılması' },
                    { key: 'saklanmasi', titleKey: 'saklanmasiTitle', label: '9. Kişisel Verilerin Saklanması' },
                    { key: 'guvenligi', titleKey: 'guvenligiTitle', label: '10. Kişisel Verilerin Güvenliği' },
                    { key: 'haklari', titleKey: 'haklariTitle', label: '11. Kişisel Veri Sahibinin Hakları' },
                    { key: 'gizlilik', titleKey: 'gizlilikTitle', label: '12. Gizlilik Politikası' },
                    { key: 'girisCikis', titleKey: 'girisCikisTitle', label: '13. Şirket Giriş-Çıkışları' },
                    { key: 'silinmesi', titleKey: 'silinmesiTitle', label: '14. Kişisel Verilerin Silinmesi' },
                    { key: 'yayinlanmasi', titleKey: 'yayinlanmasiTitle', label: '15. Dokümanın Yayınlanması' },
                    { key: 'guncelleme', titleKey: 'guncellemeTitle', label: '16. Güncelleme Periyodu' },
                    { key: 'yururluk', titleKey: 'yururlukTitle', label: '17. Yürürlük' }
                  ].map((section, index) => (
                    <div key={section.key} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor={section.titleKey}>Bölüm Başlığı</Label>
                          <Input
                            id={section.titleKey}
                            value={formData[section.titleKey as keyof typeof formData] as string}
                            onChange={(e) => setFormData({ ...formData, [section.titleKey]: e.target.value })}
                            placeholder={section.label}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`${section.key}-number`}>Madde Numarası</Label>
                          <Input
                            id={`${section.key}-number`}
                            value={index + 1}
                            disabled
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={section.key}>Bölüm İçeriği</Label>
                        <textarea
                          id={section.key}
                          value={formData[section.key as keyof typeof formData] as string}
                          onChange={(e) => setFormData({ ...formData, [section.key]: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          required
                        />
                      </div>
                    </div>
                  ))}
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

                {/* İşlenme Amacı Bölümü */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">İşlenme Amacı Bölümü</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="islemeAmaciTitle">Bölüm Başlığı</Label>
                      <Input
                        id="islemeAmaciTitle"
                        value={disclosureFormData.islemeAmaciTitle}
                        onChange={(e) => setDisclosureFormData({ ...disclosureFormData, islemeAmaciTitle: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="islemeAmaciContent">İçerik</Label>
                    <textarea
                      id="islemeAmaciContent"
                      value={disclosureFormData.islemeAmaciContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, islemeAmaciContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="calisanVerileriTitle">Çalışan Verileri Başlığı</Label>
                    <Input
                      id="calisanVerileriTitle"
                      value={disclosureFormData.calisanVerileriTitle}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, calisanVerileriTitle: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="calisanVerileriContent">Çalışan Verileri İçeriği</Label>
                    <textarea
                      id="calisanVerileriContent"
                      value={disclosureFormData.calisanVerileriContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, calisanVerileriContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                  </div>
                  
                  {/* İşlenme Amacı Bullet Points */}
                  <div className="mt-4">
                    <Label>İşlenme Amacı Madde Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.islemeAmaciBullets.map((bullet, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={bullet}
                            onChange={(e) => updateArrayItem('islemeAmaciBullets', index, e.target.value)}
                            placeholder="Madde içeriği"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('islemeAmaciBullets', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni madde ekle"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('islemeAmaciBullets', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('islemeAmaciBullets', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aktarılması Bölümü */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Aktarılması Bölümü</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="aktarilmaTitle">Bölüm Başlığı</Label>
                      <Input
                        id="aktarilmaTitle"
                        value={disclosureFormData.aktarilmaTitle}
                        onChange={(e) => setDisclosureFormData({ ...disclosureFormData, aktarilmaTitle: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="aktarilmaContent">İçerik</Label>
                    <textarea
                      id="aktarilmaContent"
                      value={disclosureFormData.aktarilmaContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, aktarilmaContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                  
                  {/* Yurt İçi Aktarım */}
                  <div className="mb-4">
                    <Label>Yurt İçi Aktarım Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.yurtIciAktarim.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateArrayItem('yurtIciAktarim', index, e.target.value)}
                            placeholder="Aktarım türü"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('yurtIciAktarim', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni yurt içi aktarım türü"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('yurtIciAktarim', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('yurtIciAktarim', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Yurt Dışı Aktarım */}
                  <div className="mb-4">
                    <Label>Yurt Dışı Aktarım Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.yurtDisiAktarim.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateArrayItem('yurtDisiAktarim', index, e.target.value)}
                            placeholder="Aktarım türü"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('yurtDisiAktarim', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni yurt dışı aktarım türü"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('yurtDisiAktarim', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('yurtDisiAktarim', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Açık Rıza ile İşleme */}
                  <div>
                    <Label htmlFor="acikRizaTitle">Açık Rıza ile İşleme Başlığı</Label>
                    <Input
                      id="acikRizaTitle"
                      value={disclosureFormData.acikRizaTitle}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, acikRizaTitle: e.target.value })}
                      className="mb-4"
                      required
                    />
                    <Label htmlFor="acikRizaContent">Açık Rıza ile İşleme İçeriği</Label>
                    <textarea
                      id="acikRizaContent"
                      value={disclosureFormData.acikRizaContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, acikRizaContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      rows={3}
                      required
                    />
                    <Label>Açık Rıza ile İşleme Madde Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.acikRizaBullets.map((bullet, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={bullet}
                            onChange={(e) => updateArrayItem('acikRizaBullets', index, e.target.value)}
                            placeholder="Madde içeriği"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('acikRizaBullets', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni madde ekle"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('acikRizaBullets', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('acikRizaBullets', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toplanma Yöntemi Bölümü */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Toplanma Yöntemi Bölümü</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="toplamaYontemiTitle">Bölüm Başlığı</Label>
                      <Input
                        id="toplamaYontemiTitle"
                        value={disclosureFormData.toplamaYontemiTitle}
                        onChange={(e) => setDisclosureFormData({ ...disclosureFormData, toplamaYontemiTitle: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="toplamaYontemiContent">İçerik</Label>
                    <textarea
                      id="toplamaYontemiContent"
                      value={disclosureFormData.toplamaYontemiContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, toplamaYontemiContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                  
                  {/* Dijital Kanallar */}
                  <div className="mb-4">
                    <Label>Dijital Kanallar Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.dijitalKanallar.map((channel, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={channel}
                            onChange={(e) => updateArrayItem('dijitalKanallar', index, e.target.value)}
                            placeholder="Dijital kanal"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('dijitalKanallar', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni dijital kanal"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('dijitalKanallar', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('dijitalKanallar', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Fiziksel Kanallar */}
                  <div className="mb-4">
                    <Label>Fiziksel Kanallar Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.fizikselKanallar.map((channel, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={channel}
                            onChange={(e) => updateArrayItem('fizikselKanallar', index, e.target.value)}
                            placeholder="Fiziksel kanal"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('fizikselKanallar', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni fiziksel kanal"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('fizikselKanallar', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('fizikselKanallar', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* İletişim Kanalları */}
                  <div>
                    <Label>İletişim Kanalları Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.iletisimKanallari.map((channel, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={channel}
                            onChange={(e) => updateArrayItem('iletisimKanallari', index, e.target.value)}
                            placeholder="İletişim kanalı"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('iletisimKanallari', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni iletişim kanalı"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('iletisimKanallari', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('iletisimKanallari', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Haklar Bölümü */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Haklar Bölümü</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="haklarTitle">Bölüm Başlığı</Label>
                      <Input
                        id="haklarTitle"
                        value={disclosureFormData.haklarTitle}
                        onChange={(e) => setDisclosureFormData({ ...disclosureFormData, haklarTitle: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="haklarContent">İçerik</Label>
                    <textarea
                      id="haklarContent"
                      value={disclosureFormData.haklarContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, haklarContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                  
                  {/* Haklar Listesi */}
                  <div className="mb-4">
                    <Label>Haklar Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.haklarListesi.map((hak, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={hak}
                            onChange={(e) => updateArrayItem('haklarListesi', index, e.target.value)}
                            placeholder="Hak açıklaması"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('haklarListesi', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni hak ekle"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('haklarListesi', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('haklarListesi', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Haklar Kullanımı */}
                  <div className="mb-4">
                    <Label htmlFor="haklarKullanimTitle">Haklar Kullanımı Başlığı</Label>
                    <Input
                      id="haklarKullanimTitle"
                      value={disclosureFormData.haklarKullanimTitle}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, haklarKullanimTitle: e.target.value })}
                      className="mb-4"
                      required
                    />
                    <Label htmlFor="haklarKullanimContent">Haklar Kullanımı İçeriği</Label>
                    <textarea
                      id="haklarKullanimContent"
                      value={disclosureFormData.haklarKullanimContent}
                      onChange={(e) => setDisclosureFormData({ ...disclosureFormData, haklarKullanimContent: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      rows={3}
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="emailIletisim">E-posta İletişim</Label>
                        <Input
                          id="emailIletisim"
                          value={disclosureFormData.emailIletisim}
                          onChange={(e) => setDisclosureFormData({ ...disclosureFormData, emailIletisim: e.target.value })}
                          placeholder="kvkk@ipossteel.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="kepIletisim">KEP İletişim</Label>
                        <Input
                          id="kepIletisim"
                          value={disclosureFormData.kepIletisim}
                          onChange={(e) => setDisclosureFormData({ ...disclosureFormData, kepIletisim: e.target.value })}
                          placeholder="ipossteel@hs01.kep.tr"
                          required
                        />
                      </div>
                    </div>
                    <Label>Başvuru Şartları Listesi</Label>
                    <div className="space-y-2">
                      {disclosureFormData.basvuruSartlari.map((sart, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={sart}
                            onChange={(e) => updateArrayItem('basvuruSartlari', index, e.target.value)}
                            placeholder="Başvuru şartı"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('basvuruSartlari', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Yeni başvuru şartı"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addArrayItem('basvuruSartlari', e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                            addArrayItem('basvuruSartlari', input.value)
                            input.value = ''
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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

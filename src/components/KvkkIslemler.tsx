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

type KvkkTabKey = 'privacy' | 'disclosure'

export default function KvkkIslemler() {
  const [activeTab, setActiveTab] = useState<KvkkTabKey>('privacy')
  const [policies, setPolicies] = useState<KvkkPrivacyPolicy[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<KvkkPrivacyPolicy | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
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

  useEffect(() => {
    fetchPolicies()
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
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Kişisel Verilere İlişkin Aydınlatma Metni</h2>
          <p className="text-gray-600 mb-4">Bu bölümde aydınlatma metni içeriğini yönetebilirsiniz.</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Form içeriği buraya gelecek...</p>
          </div>
        </div>
      )}
    </div>
  )
}

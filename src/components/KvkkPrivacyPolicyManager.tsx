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

export default function KvkkPrivacyPolicyManager() {
  const [policies, setPolicies] = useState<KvkkPrivacyPolicy[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPolicy, setEditingPolicy] = useState<KvkkPrivacyPolicy | null>(null)
  const [formData, setFormData] = useState({
    title: "Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası",
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
    }
  }

  const handleEdit = (policy: KvkkPrivacyPolicy) => {
    setEditingPolicy(policy)
    setFormData({
      title: policy.title,
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

  if (loading) {
    return <div className="flex justify-center items-center h-64">Yükleniyor...</div>
  }

  return (
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
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Politika Bölümleri</h4>
              
              {[
                { key: 'amac', label: '1. Amaç' },
                { key: 'kapsam', label: '2. Kapsam' },
                { key: 'tanimlar', label: '3. Tanım ve Kısaltmalar' },
                { key: 'roller', label: '4. Rol ve Sorumluluklar' },
                { key: 'yukumlulukler', label: '5. Hukuki Yükümlülükler' },
                { key: 'siniflandirma', label: '6. Kişisel Verilerin Sınıflandırılması' },
                { key: 'islenmesi', label: '7. Kişisel Verilerin İşlenmesi' },
                { key: 'aktarilmasi', label: '8. Kişisel Verilerin Aktarılması' },
                { key: 'saklanmasi', label: '9. Kişisel Verilerin Saklanması' },
                { key: 'guvenligi', label: '10. Kişisel Verilerin Güvenliği' },
                { key: 'haklari', label: '11. Kişisel Veri Sahibinin Hakları' },
                { key: 'gizlilik', label: '12. Gizlilik Politikası' },
                { key: 'girisCikis', label: '13. Şirket Giriş-Çıkışları' },
                { key: 'silinmesi', label: '14. Kişisel Verilerin Silinmesi' },
                { key: 'yayinlanmasi', label: '15. Dokümanın Yayınlanması' },
                { key: 'guncelleme', label: '16. Güncelleme Periyodu' },
                { key: 'yururluk', label: '17. Yürürlük' }
              ].map((section) => (
                <div key={section.key}>
                  <Label htmlFor={section.key}>{section.label}</Label>
                  <textarea
                    id={section.key}
                    value={formData[section.key as keyof typeof formData] as string}
                    onChange={(e) => setFormData({ ...formData, [section.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
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
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingPolicy ? 'Güncelle' : 'Oluştur'}
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
  )
}

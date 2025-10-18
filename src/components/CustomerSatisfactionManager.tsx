'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Building,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare
} from 'lucide-react'
import { toast } from 'sonner'

interface CustomerSatisfactionSurvey {
  id: string
  firmaUnvani: string
  adSoyad: string
  email: string
  telefon: string
  kilikKiyafet?: number
  konusma?: number
  teknikYeterlilik?: number
  ulasimGeriDonus?: number
  bayilerUlasim?: number
  ziyaretSikligi?: number
  talepKarsilama?: number
  dokumanlar?: number
  webSayfaYeterli: string
  aktivitelerYeterli: string
  nedenIpos: string[]
  tekrarCalisma?: string
  istenilenUrunler: string
  beklentiOneriler: string
  kvkkOnay: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

const ratingLabels = ['Çok Kötü', 'Kötü', 'Orta', 'İyi', 'Çok İyi']
const ratingColors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-blue-600', 'text-green-600']

export default function CustomerSatisfactionManager() {
  const [surveys, setSurveys] = useState<CustomerSatisfactionSurvey[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSurvey, setSelectedSurvey] = useState<CustomerSatisfactionSurvey | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState({
    notes: ''
  })
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })

  useEffect(() => {
    fetchSurveys()
  }, [pagination.page])

  const fetchSurveys = async () => {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      })
      
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/admin/customer-satisfaction-surveys?${params}`)
      const data = await response.json()
      
      setSurveys(data.surveys)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Anketler yüklenirken hata:', error)
      toast.error('Veri yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchSurveys()
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/customer-satisfaction-surveys/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: editData.notes }),
      })

      if (response.ok) {
        fetchSurveys()
        setShowEditModal(false)
        setSelectedSurvey(null)
        toast.success('Notlar güncellendi')
      } else {
        toast.error('Güncelleme başarısız')
      }
    } catch (error) {
      console.error('Anket güncellenirken hata:', error)
      toast.error('Veri güncellenirken hata oluştu')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu anketi silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/customer-satisfaction-surveys/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchSurveys()
        toast.success('Anket silindi')
      } else {
        toast.error('Silme başarısız')
      }
    } catch (error) {
      console.error('Anket silinirken hata:', error)
      toast.error('Veri silinirken hata oluştu')
    }
  }

  const openDetailModal = (survey: CustomerSatisfactionSurvey) => {
    setSelectedSurvey(survey)
    setShowDetailModal(true)
  }

  const openEditModal = (survey: CustomerSatisfactionSurvey) => {
    setSelectedSurvey(survey)
    setEditData({
      notes: survey.notes || ''
    })
    setShowEditModal(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRatingDisplay = (rating?: number) => {
    if (!rating) return 'Değerlendirilmedi'
    return (
      <div className="flex items-center gap-1">
        <span className={`text-sm font-medium ${ratingColors[rating - 1]}`}>
          {ratingLabels[rating - 1]}
        </span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
    )
  }

  const calculateAverageRating = (survey: CustomerSatisfactionSurvey) => {
    const ratings = [
      survey.kilikKiyafet,
      survey.konusma,
      survey.teknikYeterlilik,
      survey.ulasimGeriDonus,
      survey.bayilerUlasim,
      survey.ziyaretSikligi,
      survey.talepKarsilama,
      survey.dokumanlar
    ].filter(r => r !== null && r !== undefined) as number[]

    if (ratings.length === 0) return 0
    return (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Müşteri Memnuniyet Anketleri</h2>
        <div className="text-sm text-gray-500">
          Toplam {pagination.total} anket
        </div>
      </div>

      {/* Arama */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Firma, ad soyad veya email ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <Button onClick={handleSearch}>
          <Filter className="w-4 h-4 mr-2" />
          Filtrele
        </Button>
      </div>

      {/* Anketler Listesi */}
      <div className="space-y-4">
        {surveys.map((survey) => {
          const averageRating = calculateAverageRating(survey)
          return (
            <div key={survey.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {survey.firmaUnvani}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Ortalama: {averageRating}/5
                    </span>
                  </div>
                  
                  <p className="text-blue-600 font-medium mb-2">{survey.adSoyad}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {survey.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {survey.telefon}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {survey.webSayfaYeterli}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {formatDate(survey.createdAt)}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p className="line-clamp-2">{survey.beklentiOneriler}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDetailModal(survey)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(survey)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(survey.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sayfalama */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm text-gray-600">
            Sayfa {pagination.page} / {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Detay Modal */}
      {showDetailModal && selectedSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Anket Detayları</h3>
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Temel Bilgiler */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Temel Bilgiler
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Firma Ünvanı</Label>
                      <p className="text-gray-900">{selectedSurvey.firmaUnvani}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Ad Soyad</Label>
                      <p className="text-gray-900">{selectedSurvey.adSoyad}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="text-gray-900">{selectedSurvey.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Telefon</Label>
                      <p className="text-gray-900">{selectedSurvey.telefon}</p>
                    </div>
                  </div>
                </div>

                {/* Değerlendirmeler */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Değerlendirmeler</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Kılık Kıyafet</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.kilikKiyafet)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Konuşma</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.konusma)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Teknik Yeterlilik</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.teknikYeterlilik)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Ulaşım ve Geri Dönüş</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.ulasimGeriDonus)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Bayilerimize Ulaşım</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.bayilerUlasim)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Ziyaret Sıklığı</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.ziyaretSikligi)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Talep Karşılama</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.talepKarsilama)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Dokümanlar</Label>
                      <p className="text-gray-900">{getRatingDisplay(selectedSurvey.dokumanlar)}</p>
                    </div>
                  </div>
                </div>

                {/* Genel Değerlendirmeler */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Genel Değerlendirmeler</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Web Sayfası Yeterli mi?</Label>
                      <p className="text-gray-900">{selectedSurvey.webSayfaYeterli}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Aktiviteler Yeterli mi?</Label>
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedSurvey.aktivitelerYeterli}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Neden IPOS-Steel?</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedSurvey.nedenIpos.map((item, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Tekrar Çalışma</Label>
                      <p className="text-gray-900">{selectedSurvey.tekrarCalisma || 'Belirtilmemiş'}</p>
                    </div>
                  </div>
                </div>

                {/* Açık Uçlu Sorular */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Açık Uçlu Sorular</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">İstenilen Ürünler</Label>
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedSurvey.istenilenUrunler}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Beklenti ve Öneriler</Label>
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedSurvey.beklentiOneriler}</p>
                    </div>
                  </div>
                </div>

                {/* Notlar */}
                {selectedSurvey.notes && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Notlar</h4>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSurvey.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Düzenleme Modal */}
      {showEditModal && selectedSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Not Ekle/Düzenle</h3>
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Notlar</Label>
                <textarea
                  id="notes"
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Anket hakkında notlar..."
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => handleUpdate(selectedSurvey.id)}>
                  Güncelle
                </Button>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  İptal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

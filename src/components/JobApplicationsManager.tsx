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
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  User,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { toast } from 'sonner'

interface JobApplication {
  id: string
  jobPositionId?: string
  jobPosition?: {
    id: string
    title: string
    department: {
      id: string
      name: string
      color: string
    }
  }
  positionTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  birthDate: string
  experience: string
  education: string
  cvFileName?: string
  cvFileUrl?: string
  portfolioFileName?: string
  portfolioFileUrl?: string
  coverLetter?: string
  status: string
  notes?: string
  consentGiven: boolean
  createdAt: string
  updatedAt: string
}

const statusOptions = [
  { value: 'all', label: 'Tümü', color: 'bg-gray-100 text-gray-800' },
  { value: 'pending', label: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'reviewed', label: 'İncelendi', color: 'bg-blue-100 text-blue-800' },
  { value: 'accepted', label: 'Kabul Edildi', color: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Reddedildi', color: 'bg-red-100 text-red-800' }
]

export default function JobApplicationsManager() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState({
    status: '',
    notes: ''
  })
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })

  useEffect(() => {
    fetchApplications()
  }, [selectedStatus, pagination.page])

  const fetchApplications = async () => {
    try {
      const params = new URLSearchParams({
        status: selectedStatus,
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      })
      
      if (searchTerm) {
        params.append('search', searchTerm)
      }

      const response = await fetch(`/api/admin/job-applications?${params}`)
      const data = await response.json()
      
      setApplications(data.applications)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Başvurular yüklenirken hata:', error)
      toast.error('Veri yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchApplications()
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/job-applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes: editData.notes }),
      })

      if (response.ok) {
        fetchApplications()
        setShowEditModal(false)
        setSelectedApplication(null)
        toast.success('Başvuru durumu güncellendi')
      } else {
        toast.error('Güncelleme başarısız')
      }
    } catch (error) {
      console.error('Başvuru güncellenirken hata:', error)
      toast.error('Veri güncellenirken hata oluştu')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/job-applications/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchApplications()
        toast.success('Başvuru silindi')
      } else {
        toast.error('Silme başarısız')
      }
    } catch (error) {
      console.error('Başvuru silinirken hata:', error)
      toast.error('Veri silinirken hata oluştu')
    }
  }

  const openDetailModal = (application: JobApplication) => {
    setSelectedApplication(application)
    setShowDetailModal(true)
  }

  const openEditModal = (application: JobApplication) => {
    setSelectedApplication(application)
    setEditData({
      status: application.status,
      notes: application.notes || ''
    })
    setShowEditModal(true)
  }

  const getStatusInfo = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0]
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

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">İş Başvuruları Yönetimi</h2>
        <div className="text-sm text-gray-500">
          Toplam {pagination.total} başvuru
        </div>
      </div>

      {/* Arama ve Filtreler */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Başvuru ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <Button onClick={handleSearch}>
            <Filter className="w-4 h-4 mr-2" />
            Filtrele
          </Button>
        </div>
      </div>

      {/* Başvurular Listesi */}
      <div className="space-y-4">
        {applications.map((application) => {
          const statusInfo = getStatusInfo(application.status)
          return (
            <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {application.firstName} {application.lastName}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    {application.jobPosition && (
                      <span className={`text-xs font-medium px-2 py-1 rounded ${application.jobPosition.department.color}`}>
                        {application.jobPosition.department.name}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-blue-600 font-medium mb-2">{application.positionTitle}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {application.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {application.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {application.city}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(application.createdAt)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Deneyim: {application.experience}</span>
                    <span>Eğitim: {application.education}</span>
                    {application.cvFileUrl && (
                      <a 
                        href={application.cvFileUrl.startsWith('data:') ? application.cvFileUrl : application.cvFileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        download={application.cvFileName || 'cv.pdf'}
                      >
                        <FileText className="w-3 h-3" />
                        CV
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDetailModal(application)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(application)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(application.id)}
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
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Başvuru Detayları</h3>
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                  ✕
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Kişisel Bilgiler */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Kişisel Bilgiler
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Ad Soyad</Label>
                      <p className="text-gray-900">{selectedApplication.firstName} {selectedApplication.lastName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">E-posta</Label>
                      <p className="text-gray-900">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Telefon</Label>
                      <p className="text-gray-900">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Şehir</Label>
                      <p className="text-gray-900">{selectedApplication.city}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Doğum Tarihi</Label>
                      <p className="text-gray-900">{new Date(selectedApplication.birthDate).toLocaleDateString('tr-TR')}</p>
                    </div>
                  </div>
                </div>

                {/* Profesyonel Bilgiler */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Profesyonel Bilgiler</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Başvurulan Pozisyon</Label>
                      <p className="text-gray-900">{selectedApplication.positionTitle}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Deneyim</Label>
                      <p className="text-gray-900">{selectedApplication.experience}</p>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm font-medium text-gray-500">Eğitim</Label>
                      <p className="text-gray-900">{selectedApplication.education}</p>
                    </div>
                  </div>
                </div>

                {/* Ön Yazı */}
                {selectedApplication.coverLetter && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Ön Yazı</h4>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                  </div>
                )}

                {/* Dosyalar */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Dosyalar</h4>
                  <div className="space-y-2">
                    {selectedApplication.cvFileUrl && (
                      <a 
                        href={selectedApplication.cvFileUrl.startsWith('data:') ? selectedApplication.cvFileUrl : selectedApplication.cvFileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        download={selectedApplication.cvFileName || 'cv.pdf'}
                      >
                        <FileText className="w-4 h-4" />
                        {selectedApplication.cvFileName || 'CV Dosyası'}
                      </a>
                    )}
                    {selectedApplication.portfolioFileUrl && (
                      <a 
                        href={selectedApplication.portfolioFileUrl.startsWith('data:') ? selectedApplication.portfolioFileUrl : selectedApplication.portfolioFileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        download={selectedApplication.portfolioFileName || 'portfolio.pdf'}
                      >
                        <FileText className="w-4 h-4" />
                        {selectedApplication.portfolioFileName || 'Portfolyo Dosyası'}
                      </a>
                    )}
                  </div>
                </div>

                {/* Notlar */}
                {selectedApplication.notes && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Notlar</h4>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Düzenleme Modal */}
      {showEditModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Başvuru Durumunu Güncelle</h3>
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Durum</Label>
                <select
                  id="status"
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.filter(option => option.value !== 'all').map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="notes">Notlar</Label>
                <textarea
                  id="notes"
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Başvuru hakkında notlar..."
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => handleStatusChange(selectedApplication.id, editData.status)}>
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

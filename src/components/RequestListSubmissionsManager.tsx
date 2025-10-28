'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { showToast } from '@/components/Toast'
import { Eye, Trash2, Mail, Phone, MapPin, Clock, Package } from 'lucide-react'

interface RequestListItem {
  name: string
  code: string
  type: string
  quantity: number
  unit: string
  subProductName?: string
  productName?: string
}

interface RequestListSubmission {
  id: string
  items: RequestListItem[]
  firstName: string
  lastName: string
  phone: string
  city: string
  email: string
  description: string | null
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export default function RequestListSubmissionsManager() {
  const [submissions, setSubmissions] = useState<RequestListSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<RequestListSubmission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/request-list-submissions')
      if (!res.ok) throw new Error('Talepler yüklenemedi')
      const data = await res.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Talepler yükleme hatası:', error)
      showToast('Talepler yüklenirken hata oluştu', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleReadToggle = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/request-list-submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead })
      })

      if (!res.ok) throw new Error('Durum güncellenemedi')

      setSubmissions(prev =>
        prev.map(sub => (sub.id === id ? { ...sub, isRead: !isRead } : sub))
      )
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, isRead: !isRead })
      }
      showToast('Durum güncellendi', 'success')
    } catch (error) {
      console.error('Durum güncelleme hatası:', error)
      showToast('Durum güncellenirken hata oluştu', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu talebi silmek istediğinize emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/request-list-submissions/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Talep silinemedi')

      setSubmissions(prev => prev.filter(sub => sub.id !== id))
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null)
      }
      showToast('Talep silindi', 'success')
    } catch (error) {
      console.error('Talep silme hatası:', error)
      showToast('Talep silinirken hata oluştu', 'error')
    }
  }

  const unreadCount = submissions.filter(sub => !sub.isRead).length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="bg-white border rounded-lg p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Ana Liste */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              İstek Liste Talepleri ({submissions.length})
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {unreadCount} Okunmamış
              </span>
            )}
          </div>

          <Separator className="mb-4" />

          {submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Henüz istek listesi talebi bulunmamaktadır.
            </p>
          ) : (
            <div className="space-y-2">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    !submission.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                  } ${
                    selectedSubmission?.id === submission.id
                      ? 'ring-2 ring-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {!submission.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                        <h3 className="font-semibold text-gray-900">
                          {submission.firstName} {submission.lastName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {Array.isArray(submission.items) ? submission.items.length : 0} ürün
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {submission.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {submission.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {submission.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {new Date(submission.createdAt).toLocaleDateString('tr-TR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={submission.isRead ? 'outline' : 'default'}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReadToggle(submission.id, submission.isRead)
                        }}
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {submission.isRead ? 'Okundu' : 'Okunmadı'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(submission.id)
                        }}
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detay Paneli */}
      <div className="space-y-4">
        {selectedSubmission && (
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Talep Detayı</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSubmission(null)}
              >
                Kapat
              </Button>
            </div>

            <Separator className="mb-4" />

            <div className="space-y-4">
              {/* Ürünler */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                  İstenen Ürünler ({Array.isArray(selectedSubmission.items) ? selectedSubmission.items.length : 0})
                </label>
                <div className="border border-gray-200 rounded-md p-3 bg-gray-50 max-h-64 overflow-y-auto">
                  {Array.isArray(selectedSubmission.items) && selectedSubmission.items.map((item: RequestListItem, index: number) => (
                    <div key={index} className={index !== selectedSubmission.items.length - 1 ? 'mb-3 pb-3 border-b border-gray-200' : ''}>
                      <p className="font-medium text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Order Code: {item.code}</p>
                      <p className="text-xs text-gray-500">
                        Miktar: {item.quantity} {item.unit}
                      </p>
                      {item.subProductName && (
                        <p className="text-xs text-gray-500">Alt Ürün: {item.subProductName}</p>
                      )}
                      {item.productName && (
                        <p className="text-xs text-gray-500">Ürün: {item.productName}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Ad Soyad
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedSubmission.firstName} {selectedSubmission.lastName}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  E-posta
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedSubmission.email}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Telefon
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedSubmission.phone}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Şehir
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedSubmission.city}</p>
              </div>

              {selectedSubmission.description && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Açıklama
                  </label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedSubmission.description}
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tarih
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(selectedSubmission.createdAt).toLocaleDateString('tr-TR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <Separator />

              <div className="flex gap-3">
                <Button
                  onClick={() => handleReadToggle(selectedSubmission.id, selectedSubmission.isRead)}
                  variant={selectedSubmission.isRead ? 'outline' : 'default'}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {selectedSubmission.isRead ? 'Okundu' : 'Okunmadı İşaretle'}
                </Button>
                <Button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </div>
            </div>
          </div>
        )}

        {!selectedSubmission && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-500">
              Detayları görmek için bir talep seçin
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


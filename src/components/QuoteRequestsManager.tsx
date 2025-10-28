'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { showToast } from '@/components/Toast'
import { Eye, Trash2, Mail, Phone, MapPin, Clock } from 'lucide-react'

interface QuoteRequest {
  id: string
  productName: string
  productId: string | null
  productType: string | null
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

export default function QuoteRequestsManager() {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null)

  useEffect(() => {
    fetchQuoteRequests()
  }, [])

  const fetchQuoteRequests = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/quote-requests')
      if (!res.ok) throw new Error('Talepler yüklenemedi')
      const data = await res.json()
      setQuoteRequests(data)
    } catch (error) {
      console.error('Talepler yükleme hatası:', error)
      showToast('Talepler yüklenirken hata oluştu', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleReadToggle = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/quote-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead })
      })

      if (!res.ok) throw new Error('Durum güncellenemedi')

      setQuoteRequests(prev =>
        prev.map(req => (req.id === id ? { ...req, isRead: !isRead } : req))
      )
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, isRead: !isRead })
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
      const res = await fetch(`/api/admin/quote-requests/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Talep silinemedi')

      setQuoteRequests(prev => prev.filter(req => req.id !== id))
      if (selectedRequest?.id === id) {
        setSelectedRequest(null)
      }
      showToast('Talep silindi', 'success')
    } catch (error) {
      console.error('Talep silme hatası:', error)
      showToast('Talep silinirken hata oluştu', 'error')
    }
  }

  const unreadCount = quoteRequests.filter(req => !req.isRead).length

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
              Teklif Talepleri ({quoteRequests.length})
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {unreadCount} Okunmamış
              </span>
            )}
          </div>

          <Separator className="mb-4" />

          {quoteRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Henüz teklif talebi bulunmamaktadır.
            </p>
          ) : (
            <div className="space-y-2">
              {quoteRequests.map((request) => (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    !request.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                  } ${
                    selectedRequest?.id === request.id
                      ? 'ring-2 ring-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {!request.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                        <h3 className="font-semibold text-gray-900">
                          {request.firstName} {request.lastName}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {request.productName}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {request.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {request.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {request.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {new Date(request.createdAt).toLocaleDateString('tr-TR', {
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
                        variant={request.isRead ? 'outline' : 'default'}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReadToggle(request.id, request.isRead)
                        }}
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {request.isRead ? 'Okundu' : 'Okunmadı'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(request.id)
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
        {selectedRequest && (
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Talep Detayı</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRequest(null)}
              >
                Kapat
              </Button>
            </div>

            <Separator className="mb-4" />

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Ürün
                </label>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {selectedRequest.productName}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Ad Soyad
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedRequest.firstName} {selectedRequest.lastName}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  E-posta
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.email}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Telefon
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.phone}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Şehir
                </label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.city}</p>
              </div>

              {selectedRequest.description && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Açıklama
                  </label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedRequest.description}
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tarih
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(selectedRequest.createdAt).toLocaleDateString('tr-TR', {
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
                  onClick={() => handleReadToggle(selectedRequest.id, selectedRequest.isRead)}
                  variant={selectedRequest.isRead ? 'outline' : 'default'}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {selectedRequest.isRead ? 'Okundu' : 'Okunmadı İşaretle'}
                </Button>
                <Button
                  onClick={() => handleDelete(selectedRequest.id)}
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

        {!selectedRequest && (
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


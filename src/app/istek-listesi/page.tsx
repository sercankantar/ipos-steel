'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download, FileText, Trash2, Eye, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { showToast } from '@/components/Toast'

interface RequestItem {
  id: string
  name: string
  code: string
  imageUrl?: string
  type: 'channel' | 'module' | 'accessory' | 'cover'
  quantity: number
  unit: 'metre' | 'adet'
  subProductName?: string
  productName?: string
}

export default function RequestList() {
  const [requestItems, setRequestItems] = useState<RequestItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quoteForm, setQuoteForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    email: '',
    description: ''
  })

  useEffect(() => {
    // LocalStorage'dan istek listesini yükle
    const savedItems = localStorage.getItem('requestList')
    if (savedItems) {
      setRequestItems(JSON.parse(savedItems))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isQuoteModalOpen) {
          setIsQuoteModalOpen(false)
        }
      }
    }

    if (isQuoteModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isQuoteModalOpen])

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    
    const updatedItems = requestItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    )
    setRequestItems(updatedItems)
    localStorage.setItem('requestList', JSON.stringify(updatedItems))
    
    // Navbar'ı güncellemek için custom event gönder
    window.dispatchEvent(new CustomEvent('requestListUpdated'))
    
    showToast({
      message: 'Miktar güncellendi!',
      type: 'success',
      duration: 2000
    })
  }

  const removeItem = (id: string) => {
    const itemToRemove = requestItems.find(item => item.id === id)
    const updatedItems = requestItems.filter(item => item.id !== id)
    setRequestItems(updatedItems)
    localStorage.setItem('requestList', JSON.stringify(updatedItems))
    
    // Navbar'ı güncellemek için custom event gönder
    window.dispatchEvent(new CustomEvent('requestListUpdated'))
    
    showToast({
      message: `${itemToRemove?.name} listeden kaldırıldı!`,
      type: 'error',
      duration: 3000
    })
  }

  const clearAll = () => {
    if (requestItems.length === 0) {
      showToast({
        message: 'Liste zaten boş!',
        type: 'info',
        duration: 2000
      })
      return
    }

    if (confirm('Tüm ürünleri listeden kaldırmak istediğinizden emin misiniz?')) {
      setRequestItems([])
      localStorage.removeItem('requestList')
      
      // Navbar'ı güncellemek için custom event gönder
      window.dispatchEvent(new CustomEvent('requestListUpdated'))
      
      showToast({
        message: 'Tüm ürünler listeden kaldırıldı!',
        type: 'warning',
        duration: 3000
      })
    } else {
      showToast({
        message: 'İşlem iptal edildi',
        type: 'info',
        duration: 2000
      })
    }
  }

  const downloadPDF = () => {
    // PDF indirme işlemi
    console.log('PDF indiriliyor...')
    showToast({
      message: 'PDF indiriliyor...',
      type: 'info',
      duration: 2000
    })
  }

  const downloadExcel = () => {
    // Excel indirme işlemi
    console.log('Excel indiriliyor...')
    showToast({
      message: 'Excel dosyası indiriliyor...',
      type: 'success',
      duration: 2000
    })
  }

  const downloadAllDatasheets = () => {
    // Tüm datasheet'leri indirme işlemi
    console.log('Tüm datasheet\'ler indiriliyor...')
    showToast({
      message: 'Tüm datasheet\'ler indiriliyor...',
      type: 'info',
      duration: 2000
    })
  }

  const requestQuote = () => {
    setIsQuoteModalOpen(true)
  }

  const handleQuoteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuoteForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuoteCancel = () => {
    setIsQuoteModalOpen(false)
    setQuoteForm({
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      email: '',
      description: ''
    })
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const items = requestItems.map(item => ({
        name: item.name,
        code: item.code,
        type: item.type,
        quantity: item.quantity,
        unit: item.unit,
        subProductName: item.subProductName,
        productName: item.productName
      }))

      const response = await fetch('/api/request-list-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          firstName: quoteForm.firstName,
          lastName: quoteForm.lastName,
          phone: quoteForm.phone,
          city: quoteForm.city,
          email: quoteForm.email,
          description: quoteForm.description
        })
      })

      if (response.ok) {
        showToast({
          message: 'İstek listeniz başarıyla gönderildi!',
          type: 'success',
          duration: 4000
        })
        setIsQuoteModalOpen(false)
        setQuoteForm({
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          email: '',
          description: ''
        })
        // Sepeti temizle
        setRequestItems([])
        localStorage.removeItem('requestList')
        window.dispatchEvent(new CustomEvent('requestListUpdated'))
      } else {
        showToast({
          message: 'İstek listesi gönderilemedi. Lütfen tekrar deneyin.',
          type: 'error',
          duration: 3000
        })
      }
    } catch (error) {
      console.error('İstek listesi gönderme hatası:', error)
      showToast({
        message: 'İstek listesi gönderilemedi. Lütfen tekrar deneyin.',
        type: 'error',
        duration: 3000
      })
    }
  }

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="py-8">
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <div className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/products" 
              className="flex items-center text-gray-600 hover:text-gray-800 mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Seçime Devam Et
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">İstek Listesi</h1>
          </div>
          
          {requestItems.length > 0 && (
            <button
              onClick={requestQuote}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Teklif Talebinde Bulun
            </button>
          )}
        </div>

        {/* Action Buttons */}
        {requestItems.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={downloadPDF}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF İndir
            </button>
            <button
              onClick={downloadExcel}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Excel İndir
            </button>
            <button
              onClick={downloadAllDatasheets}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Tüm Datasheet'leri İndir
            </button>
          </div>
        )}

        {/* Request Items List */}
        {requestItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">İstek listeniz boş</h3>
            <p className="text-gray-600 mb-6">Ürünleri inceleyip listeye ekleyebilirsiniz</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ürünleri İncele
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {requestItems.map((item, index) => (
              <div key={item.id} className={`p-6 ${index !== requestItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">Image</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Order Code: {item.code}
                    </p>
                    {item.subProductName && (
                      <p className="text-xs text-gray-500">
                        Alt Ürün: {item.subProductName}
                      </p>
                    )}
                    {item.productName && (
                      <p className="text-xs text-gray-500">
                        Ürün: {item.productName}
                      </p>
                    )}
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center space-x-4">
                    {/* Quantity Input */}
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600">
                        {item.unit === 'metre' ? 'Metre:' : 'Adet:'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        Detay
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clear All Button */}
        {requestItems.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={clearAll}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Tümünü Temizle
            </button>
          </div>
        )}
      </div>

      {/* İstek Listesi Teklif Talebi Modal'ı */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Talep Et</h2>
              <button
                onClick={handleQuoteCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
              {/* Sepetteki Ürünler */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İstediğiniz Ürünler
                </label>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50 max-h-64 overflow-y-auto">
                  {requestItems.map((item, index) => (
                    <div key={item.id} className={index !== requestItems.length - 1 ? 'mb-3 pb-3 border-b border-gray-200' : ''}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">Order Code: {item.code}</p>
                          {item.subProductName && (
                            <p className="text-xs text-gray-500">Alt Ürün: {item.subProductName}</p>
                          )}
                          {item.productName && (
                            <p className="text-xs text-gray-500">Ürün: {item.productName}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-gray-900">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={quoteForm.firstName}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınızı girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={quoteForm.lastName}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Soyadınızı girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon No *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0555 123 45 67"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir *
                </label>
                <input
                  type="text"
                  name="city"
                  value={quoteForm.city}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Şehrinizi girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  value={quoteForm.description}
                  onChange={handleQuoteFormChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Ürünler hakkında detaylı bilgi veya özel isteklerinizi yazabilirsiniz..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleQuoteCancel}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Talep Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  )
}

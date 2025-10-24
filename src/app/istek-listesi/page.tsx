'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download, FileText, Trash2, Eye, Plus } from 'lucide-react'
import Link from 'next/link'

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

  useEffect(() => {
    // LocalStorage'dan istek listesini yükle
    const savedItems = localStorage.getItem('requestList')
    if (savedItems) {
      setRequestItems(JSON.parse(savedItems))
    }
    setLoading(false)
  }, [])

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    
    const updatedItems = requestItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    )
    setRequestItems(updatedItems)
    localStorage.setItem('requestList', JSON.stringify(updatedItems))
  }

  const removeItem = (id: string) => {
    const updatedItems = requestItems.filter(item => item.id !== id)
    setRequestItems(updatedItems)
    localStorage.setItem('requestList', JSON.stringify(updatedItems))
  }

  const clearAll = () => {
    if (confirm('Tüm ürünleri listeden kaldırmak istediğinizden emin misiniz?')) {
      setRequestItems([])
      localStorage.removeItem('requestList')
    }
  }

  const downloadPDF = () => {
    // PDF indirme işlemi
    console.log('PDF indiriliyor...')
  }

  const downloadExcel = () => {
    // Excel indirme işlemi
    console.log('Excel indiriliyor...')
  }

  const downloadAllDatasheets = () => {
    // Tüm datasheet'leri indirme işlemi
    console.log('Tüm datasheet\'ler indiriliyor...')
  }

  const requestQuote = () => {
    // Teklif talebi işlemi
    console.log('Teklif talebinde bulunuluyor...')
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
    </MaxWidthWrapper>
  )
}

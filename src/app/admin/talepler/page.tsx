"use client"

import { useState } from 'react'
import QuoteRequestsManager from '@/components/QuoteRequestsManager'
import RequestListSubmissionsManager from '@/components/RequestListSubmissionsManager'
import { Separator } from '@/components/ui/separator'

export default function TaleplerPage() {
  const [activeTab, setActiveTab] = useState<'teklifler' | 'istek-listesi'>('teklifler')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Talepler</h1>
        <p className="text-gray-600 mt-1">Müşteri taleplerini yönetin.</p>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('teklifler')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'teklifler' 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          Teklifler
        </button>
        <button
          onClick={() => setActiveTab('istek-listesi')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'istek-listesi' 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          İstek Listesi
        </button>
      </div>

      <Separator />

      {activeTab === 'teklifler' && <QuoteRequestsManager />}
      {activeTab === 'istek-listesi' && <RequestListSubmissionsManager />}
    </div>
  )
}


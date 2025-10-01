'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useEffect, useState } from 'react'
import { ChevronDown, Download } from 'lucide-react'

interface Certificate {
  id: string
  title: string
  category: string
  description: string
  details?: string
  fileUrl: string
  fileType: string
  isActive: boolean
}

export default function SertifikalarPage() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [items, setItems] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/certificates', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        setItems(data)
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const kategoriler = Array.from(new Set(items.map(s => s.category)))

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              Sertifikalarımız
            </h1>
          </div>
        </MaxWidthWrapper>
      </section>


      {/* Sertifika Listesi */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="font-neuropol text-3xl font-bold mb-6 text-slate-900">
                Sertifikalar ve Test Raporları
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ürünlerimizin kalite, güvenlik ve performans standartlarına uygunluğunu belgeleyen 
                sertifika ve test raporlarımızı aşağıda bulabilirsiniz.
              </p>
            </div>


            {/* Sertifika Listesi */}
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full p-6 flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50 hidden" />
                  </div>
                ))
              ) : items.length > 0 ? (
              items.map((sertifika) => (
                <div key={sertifika.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(sertifika.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-2 h-2 rounded-full ${sertifika.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="font-neuropol font-bold text-lg text-slate-900">
                          {sertifika.title}
                        </h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {sertifika.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {sertifika.description}
                      </p>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        openItems.includes(sertifika.id) ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {openItems.includes(sertifika.id) && (
                    <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {sertifika.details}
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-500">
                              <strong>Kategori:</strong> {sertifika.category}
                            </div>
                            <div className="text-sm text-gray-500">
                              <strong>Durum:</strong> 
                              <span className={sertifika.isActive ? "text-green-600" : "text-red-600"}>
                                {sertifika.isActive ? "Aktif" : "Pasif"}
                              </span>
                            </div>
                          </div>
                          <a
                            href={sertifika.fileUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white px-3 py-2 rounded-md hover:bg-slate-900 transition-colors text-xs sm:text-sm w-full sm:w-auto"
                          >
                            <Download className="h-4 w-4" />
                            Sertifikayı Aç ({(sertifika.fileType || '').toUpperCase()})
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
              ) : (
                <div className="p-8 text-center text-gray-600 border rounded-lg">Sertifika bulunamadı.</div>
              )}
            </div>

            {/* İletişim Bilgisi */}
            <div className="mt-16 p-8 bg-slate-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <h3 className="font-neuropol text-xl font-bold mb-4 text-slate-900">
                  Sertifika Doğrulama
                </h3>
                <p className="text-gray-600 mb-6">
                  Sertifikalarımızın orijinalliğini doğrulamak veya detaylı bilgi almak için 
                  bizimle iletişime geçebilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:+902626744767"
                    className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    📞 +90 (262) 674 47 67
                  </a>
                  <a 
                    href="mailto:info@ipos-steel.com"
                    className="inline-flex items-center gap-2 bg-white text-slate-800 border border-slate-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    ✉️ info@ipos-steel.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

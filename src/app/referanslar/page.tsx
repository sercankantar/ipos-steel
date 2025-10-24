import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Reference {
  id: string
  sector: string
  title?: string
  excerpt?: string
  content?: string
  category?: string
  location?: string
  projectDate?: string
  slug?: string
  mainImage?: string
  mainImagePublicId?: string
  gallery?: string[]
  galleryPublicIds?: string[]
  tags?: string[]
  featured?: boolean
  views?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

function getBaseUrl() {
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000'
  const proto = h.get('x-forwarded-proto') || 'http'
  return `${proto}://${host}`
}

async function getReferences() {
  try {
    const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
    const res = await fetch(`${base}/api/references`, { cache: 'no-store' })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function ReferanslarPage() {
  const items = await getReferences()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              Referanslarımız
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Güvenilir iş ortaklarımız ve başarılı projelerimiz
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Referanslar Grid */}
      <section className="py-16">
        <MaxWidthWrapper>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item: Reference) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  {/* Ana Görsel */}
                  <div className="relative h-48 bg-gray-50">
                    {item.mainImage ? (
                      <img
                        src={item.mainImage}
                        alt={item.title || 'Proje Görseli'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-gray-400 text-2xl">🏗️</span>
                          </div>
                          <span className="text-gray-400 text-sm">Görsel Yok</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* İçerik */}
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      {item.title || 'Başlıksız Proje'}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{item.sector}</p>
                    
                    {item.excerpt && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                    )}
                    
                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <span>📍</span>
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.projectDate && (
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>Proje Tarihi: {new Date(item.projectDate).toLocaleDateString('tr-TR')}</span>
                        </div>
                      )}
                      {item.category && (
                        <div className="flex items-center gap-1">
                          <span>🏷️</span>
                          <span>{item.category}</span>
                        </div>
                      )}
                    </div>
                    
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📋</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">
                Henüz referans bulunamadı
              </h3>
              <p className="text-gray-500 text-sm">
                Yakında referanslarımız yayınlanacak.
              </p>
            </div>
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
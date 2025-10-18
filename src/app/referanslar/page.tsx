import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Reference {
  id: string
  name: string
  sector: string
  logoUrl?: string
  isActive: boolean
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item: Reference) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center"
                >
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      className="w-full h-16 object-contain mb-4"
                    />
                  ) : (
                    <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center mb-4">
                      <span className="text-gray-400 text-sm">{item.name}</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.sector}</p>
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
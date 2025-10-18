import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Tag } from 'lucide-react'
import Link from 'next/link'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getBaseUrl() {
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000'
  const proto = h.get('x-forwarded-proto') || 'http'
  return `${proto}://${host}`
}

async function getNews() {
  try {
    const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
    const res = await fetch(`${base}/api/news`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return (data as any[]).map(d => ({
      id: d.id,
      title: d.title,
      excerpt: d.summary || '',
      content: d.content || '',
      image: d.imageUrl || '',
      date: d.publishedAt,
      author: 'IPOS-Steel',
      category: d.category,
      featured: d.featured || false
    }))
  } catch {
    return []
  }
}

export default async function HaberlerPage() {
  const items = await getNews()
  
  const categories = ['Tümü', ...Array.from(new Set(items.map(n => n.category).filter(Boolean)))]
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              Haberler
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              IPOS-Steel'den son gelişmeler ve sektör haberleri
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sol Kolon - Haberler */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-neuropol text-2xl font-bold text-slate-900">
                    Son Haberler
                  </h2>
                  <span className="text-sm text-gray-500">
                    {items.length} haber
                  </span>
                </div>
              </div>

              {/* Haberler Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.length > 0 ? (
                  items.map((haber) => (
                    <Link href={`/haberler/${haber.id}`} key={haber.id}>
                      <article
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200 cursor-pointer"
                      >
                      {/* Haber Görseli */}
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img 
                          src={haber.image} 
                          alt={haber.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Tarih Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-white rounded-full p-3 shadow-sm">
                            <div className="text-center">
                              <div className="text-lg font-bold text-slate-900">
                                {new Date(haber.date).getDate()}
                              </div>
                              <div className="text-xs text-gray-500 uppercase">
                                {new Date(haber.date).toLocaleDateString('tr-TR', { month: 'short' })}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Kategori Etiketi */}
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-medium uppercase tracking-wide">
                            {haber.category}
                          </span>
                        </div>
                      </div>

                      {/* Haber İçeriği */}
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-3 text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {haber.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {haber.excerpt}
                        </p>
                        
                        <div className="text-xs text-gray-500">
                          <span>{haber.author}</span>
                        </div>
                      </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Henüz haber bulunamadı
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Yakında haberlerimiz yayınlanacak.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-8 space-y-8">
                
                {/* Kategori İstatistikleri */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Kategoriler
                  </h3>
                  <div className="space-y-3">
                    {categories.slice(1).map((kategori) => {
                      const count = items.filter((h) => h.category === kategori).length
                      return (
                        <div
                          key={kategori}
                          className="w-full flex items-center justify-between py-2 px-3 rounded-md text-slate-700"
                        >
                          <span className="text-sm font-medium">{kategori}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-white text-gray-500">
                            {count}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Öne Çıkan Haberler */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Öne Çıkan Haberler
                  </h3>
                  <div className="space-y-4">
                    {items.filter(h => h.featured).slice(0, 3).map((haber) => (
                      <Link
                        key={haber.id}
                        href={`/haberler/${haber.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                            <img
                              src={haber.image}
                              alt={haber.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                              {haber.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                                {haber.category}
                              </span>
                              <span>{new Date(haber.date).toLocaleDateString('tr-TR')}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
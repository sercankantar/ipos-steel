"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Tag } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'

export default function HaberlerPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedKategori, setSelectedKategori] = useState('Tümü')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/news', { cache: 'no-store' })
        const data = res.ok ? await res.json() : []
        const mapped = (data as any[]).map(d => ({
          id: d.id,
          title: d.title,
          excerpt: d.summary || '',
          content: d.content || '',
          image: d.imageUrl || '',
          date: d.publishedAt,
          author: 'IPOS-Steel',
          category: d.category,
          categoryColor: d.categoryColor || 'bg-gray-100 text-gray-800',
          featured: d.featured || false
        }))
        setItems(mapped)
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])
  
  // Haberleri tarihe göre sırala (en yeni önce)
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [items])
  
  const categories = useMemo(() => {
    const cats = sortedItems.map(n => n.category).filter(Boolean)
    const unique: string[] = []
    for (const c of cats) {
      if (!unique.includes(c)) unique.push(c)
    }
    return ['Tümü', ...unique]
  }, [sortedItems])

  const filteredItems = useMemo(() => {
    if (selectedKategori === 'Tümü') return sortedItems
    return sortedItems.filter(item => item.category === selectedKategori)
  }, [sortedItems, selectedKategori])
  
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
              IPOS-Steel'den güncel haberler ve gelişmeler
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
                    {loading ? '...' : `${filteredItems.length} haber`}
                  </span>
                </div>
                
                {/* Kategori Filtreleri */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {loading ? (
                    <>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-10 w-28 rounded-lg bg-gray-200 animate-pulse" />
                      ))}
                    </>
                  ) : (
                    categories.map((kategori) => (
                      <button
                        key={kategori}
                        onClick={() => setSelectedKategori(kategori)}
                        className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md ${
                          selectedKategori === kategori
                            ? 'bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600' 
                            : 'bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {kategori}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Haberler Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
                      <div className="aspect-video bg-gray-200" />
                      <div className="p-5">
                        <div className="h-6 bg-gray-200 rounded mb-3" />
                        <div className="h-4 bg-gray-200 rounded mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                      </div>
                    </div>
                  ))
                ) : filteredItems.length > 0 ? (
                  filteredItems.map((haber) => (
                    <Link href={`/haberler/${haber.id}`} key={haber.id}>
                      <article
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200 cursor-pointer"
                      >
                      {/* Haber Görseli */}
                      <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <img 
                          src={haber.image} 
                          alt={haber.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Tarih Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                            <div className="text-center">
                              <div className="text-xs font-medium text-slate-900">
                                {new Date(haber.date).toLocaleDateString('tr-TR', { 
                                  day: '2-digit', 
                                  month: '2-digit', 
                                  year: 'numeric' 
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Kategori Etiketi */}
                        <div className="absolute bottom-4 left-4">
                          <span className={`px-3 py-1 rounded text-xs font-medium uppercase tracking-wide ${haber.categoryColor || 'bg-gray-500 text-white'}`}>
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
                  <div className="col-span-2 text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {selectedKategori === 'Tümü' ? 'Henüz haber bulunamadı' : `${selectedKategori} kategorisinde haber bulunamadı`}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {selectedKategori === 'Tümü' ? 'Yakında yeni haberler eklenecek.' : 'Diğer kategorileri kontrol edebilirsiniz.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sağ Kolon - Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                {/* Kategoriler */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Kategoriler
                  </h3>
                  <div className="space-y-3">
                    {loading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                          <div className="h-4 bg-gray-200 rounded w-6 animate-pulse" />
                        </div>
                      ))
                    ) : (
                      categories.slice(1).map((kategori) => {
                        const count = sortedItems.filter((h) => h.category === kategori).length
                        return (
                          <button
                            key={kategori}
                            onClick={() => setSelectedKategori(kategori)}
                            className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
                              selectedKategori === kategori
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className="font-medium">{kategori}</span>
                            <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                              {count}
                            </span>
                          </button>
                        )
                      })
                    )}
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
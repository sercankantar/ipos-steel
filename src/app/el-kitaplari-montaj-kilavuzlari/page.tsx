"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Download, FileText, Calendar, Eye, Tag } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'

// Statik el kitapları ve kullanım kılavuzları verileri
const staticElKitaplari = [
  {
    id: 1,
    title: 'Kablo Tavaları Montaj El Kitabı',
    description: 'Kablo tavalarının doğru montajı için detaylı kılavuz. Güvenlik önlemleri, montaj adımları ve teknik özellikler.',
    category: 'El Kitapları',
    image: 'https://www.eae.com.tr/storage/el-kitaplari/busbar-sistemleri/images/kx-manual.webp',
    fileUrl: '/downloads/kablo-tavalari-montaj-kilavuzu.pdf',
    featured: true
  },
  {
    id: 2,
    title: 'Solar Montaj Sistemleri El Kitabı',
    description: 'Güneş enerjisi santralları için kablo tava montaj sistemleri. Çatı ve zemin montaj çözümleri.',
    category: 'El Kitapları',
    image: 'https://www.eae.com.tr/storage/el-kitaplari/busbar-sistemleri/images/kx-manual.webp',
    fileUrl: '/downloads/solar-montaj-kilavuzu.pdf',
    featured: true
  },
  {
    id: 3,
    title: 'Endüstriyel Kablo Kanalları El Kitabı',
    description: 'Endüstriyel tesisler için kablo kanalları montaj teknikleri ve güvenlik standartları.',
    category: 'El Kitapları',
    image: 'https://www.eae.com.tr/storage/el-kitaplari/busbar-sistemleri/images/kx-manual.webp',
    fileUrl: '/downloads/endustriyel-kablo-kanallari-kilavuzu.pdf',
    featured: false
  },
  {
    id: 4,
    title: 'Kablo Merdivenleri El Kitabı',
    description: 'Kablo merdivenleri montaj süreçleri, destek sistemleri ve yük hesaplamaları.',
    category: 'El Kitapları',
    image: 'https://www.eae.com.tr/storage/el-kitaplari/busbar-sistemleri/images/kx-manual.webp',
    fileUrl: '/downloads/kablo-merdivenleri-kurulum-kilavuzu.pdf',
    featured: false
  },
  {
    id: 5,
    title: 'Busbar Sistemleri El Kitabı',
    description: 'Elektrik dağıtım busbar sistemleri montaj teknikleri ve güvenlik önlemleri.',
    category: 'El Kitapları',
    image: 'https://www.eae.com.tr/storage/el-kitaplari/busbar-sistemleri/images/kx-manual.webp',
    fileUrl: '/downloads/busbar-sistemleri-montaj-kilavuzu.pdf',
    featured: true
  },
  {
    id: 6,
    title: 'Kablo Tavaları Kullanım Kılavuzu',
    description: 'Kablo tavalarının doğru kullanımı, bakımı ve güvenlik kuralları hakkında detaylı bilgiler.',
    category: 'Kullanım Kılavuzları',
    image: 'https://www.eae.com.tr/storage/kilavuzlar/images/e-line-dl-ek-montaj-kilavuzu-kapak.jpg',
    fileUrl: '/downloads/kablo-tavalari-kullanim-kilavuzu.pdf',
    featured: true
  },
  {
    id: 7,
    title: 'Solar Sistemler Kullanım Kılavuzu',
    description: 'Güneş enerjisi kablo tava sistemlerinin kullanımı ve bakım talimatları.',
    category: 'Kullanım Kılavuzları',
    image: 'https://www.eae.com.tr/storage/kilavuzlar/images/e-line-dl-ek-montaj-kilavuzu-kapak.jpg',
    fileUrl: '/downloads/solar-sistemler-kullanim-kilavuzu.pdf',
    featured: false
  },
  {
    id: 8,
    title: 'Endüstriyel Sistemler Kullanım Kılavuzu',
    description: 'Endüstriyel kablo kanalları ve sistemlerin günlük kullanımı için rehber.',
    category: 'Kullanım Kılavuzları',
    image: 'https://www.eae.com.tr/storage/kilavuzlar/images/e-line-dl-ek-montaj-kilavuzu-kapak.jpg',
    fileUrl: '/downloads/endustriyel-sistemler-kullanim-kilavuzu.pdf',
    featured: false
  },
  {
    id: 9,
    title: 'Kablo Merdivenleri Kullanım Kılavuzu',
    description: 'Kablo merdivenlerinin güvenli kullanımı ve bakım prosedürleri.',
    category: 'Kullanım Kılavuzları',
    image: 'https://www.eae.com.tr/storage/kilavuzlar/images/e-line-dl-ek-montaj-kilavuzu-kapak.jpg',
    fileUrl: '/downloads/kablo-merdivenleri-kullanim-kilavuzu.pdf',
    featured: true
  },
  {
    id: 10,
    title: 'Busbar Sistemleri Kullanım Kılavuzu',
    description: 'Busbar sistemlerinin günlük kullanımı, kontrol ve bakım talimatları.',
    category: 'Kullanım Kılavuzları',
    image: 'https://www.eae.com.tr/storage/kilavuzlar/images/e-line-dl-ek-montaj-kilavuzu-kapak.jpg',
    fileUrl: '/downloads/busbar-sistemleri-kullanim-kilavuzu.pdf',
    featured: false
  }
]

const defaultCategories = ['El Kitapları', 'Kullanım Kılavuzları']

export default function ElKitaplariMontajKilavuzlariPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        // Gerçek API çağrısı burada yapılacak
        // const res = await fetch('/api/el-kitaplari', { cache: 'no-store' })
        // const data = res.ok ? await res.json() : []
        // const mapped = (data as any[]).map(d => ({ ... }))
        setItems(staticElKitaplari)
      } catch {
        setItems(staticElKitaplari)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const categories = useMemo(() => {
    const cats = items.map(c => c.category).filter(Boolean)
    const unique: string[] = []
    for (const c of cats) if (!unique.includes(c)) unique.push(c)
    const base = unique.length ? unique : defaultCategories
    return ['Tümü', ...base]
  }, [items])

  const filteredElKitaplari = useMemo(() => (
    selectedCategory === 'Tümü' ? items : items.filter(c => c.category === selectedCategory)
  ), [items, selectedCategory])

  const handleDownload = (elKitabi: any) => {
    // Gerçek uygulamada dosya indirme işlemi burada yapılacak
    console.log(`İndiriliyor: ${elKitabi.title}`)
    // İndirme sayısını artır (gerçek uygulamada API çağrısı)
  }

  const handleView = (elKitabi: any) => {
    // PDF görüntüleme işlemi
    console.log(`Görüntüleniyor: ${elKitabi.title}`)
    // Yeni sekmede PDF açma
    window.open(elKitabi.fileUrl, '_blank')
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              El Kitapları & Montaj Kılavuzları
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ürünlerimizin doğru montajı için detaylı el kitapları ve kılavuzları. Güvenlik standartları, montaj teknikleri ve uygulama örnekleri.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sol Kolon - El Kitapları */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-neuropol text-2xl font-bold text-slate-900">
                    El Kitapları ve Kılavuzlar
                  </h2>
                  <span className="text-sm text-gray-500">
                    {loading ? '...' : `${filteredElKitaplari.length} kılavuz`}
                  </span>
                </div>
                
                {/* Kategori Filtreleri */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {loading ? (
                    <>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-10 w-32 rounded-lg bg-gray-200 animate-pulse" />
                      ))}
                    </>
                  ) : (
                    categories.map((kategori) => (
                      <button
                        key={kategori}
                        onClick={() => setSelectedCategory(kategori)}
                        className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md ${
                          selectedCategory === kategori
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

              {/* El Kitapları Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))
                ) : filteredElKitaplari.length > 0 ? (
                  filteredElKitaplari.map((elKitabi) => (
                    <article
                      key={elKitabi.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200"
                    >
                      {/* El Kitabı Görseli */}
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img 
                          src={elKitabi.image} 
                          alt={elKitabi.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Kategori Etiketi */}
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-medium uppercase tracking-wide">
                            {elKitabi.category}
                          </span>
                        </div>
                      </div>

                      {/* El Kitabı İçeriği */}
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-3 text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {elKitabi.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {elKitabi.description}
                        </p>

                        {/* İndir ve Görüntüle Butonları */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(elKitabi)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            İndir
                          </button>
                          <button
                            onClick={() => handleView(elKitabi)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Görüntüle
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Bu kategoride kılavuz bulunamadı
                    </h3>
                    <p className="text-gray-500 text-sm">
                      "{selectedCategory}" kategorisinde henüz el kitabı bulunmuyor.
                    </p>
                    <button 
                      onClick={() => setSelectedCategory('Tümü')}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Tüm kılavuzları görüntüle
                    </button>
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
                    {loading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="w-full flex items-center justify-between py-2 px-3">
                          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                        </div>
                      ))
                    ) : (
                      categories.slice(1).map((kategori) => {
                        const count = items.filter((c) => c.category === kategori).length
                        return (
                          <button
                            key={kategori}
                            onClick={() => setSelectedCategory(kategori)}
                            className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors text-left ${
                              selectedCategory === kategori
                                ? 'bg-blue-50 text-blue-700'
                                : 'hover:bg-white text-slate-700 hover:text-slate-900'
                            }`}
                          >
                            <span className="text-sm font-medium">{kategori}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              selectedCategory === kategori
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-white text-gray-500'
                            }`}>
                              {count}
                            </span>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* Öne Çıkan El Kitapları */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Öne Çıkan Kılavuzlar
                  </h3>
                  <div className="space-y-4">
                    {items.filter(c => c.featured).slice(0, 3).map((elKitabi) => (
                      <div
                        key={elKitabi.id}
                        className="block group cursor-pointer"
                        onClick={() => {
                          // Modal açma veya detay sayfasına gitme
                        }}
                      >
                        <div className="flex gap-3">
                          <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                            <img
                              src={elKitabi.image}
                              alt={elKitabi.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                              {elKitabi.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                                {elKitabi.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* İstatistikler */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    İstatistikler
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Toplam Kılavuz</span>
                      <span className="font-semibold text-slate-900">{items.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">El Kitapları</span>
                      <span className="font-semibold text-slate-900">
                        {items.filter(item => item.category === 'El Kitapları').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Kullanım Kılavuzları</span>
                      <span className="font-semibold text-slate-900">
                        {items.filter(item => item.category === 'Kullanım Kılavuzları').length}
                      </span>
                    </div>
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

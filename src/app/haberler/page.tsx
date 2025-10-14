"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Tag } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const staticNews = [
  {
    id: 1,
    title: 'IPOS Steel Yeni Üretim Tesisini Açtı',
    excerpt: 'Kocaeli\'deki yeni tesisimizle üretim kapasitemizi %40 artırdık. Modern teknoloji ile donatılmış tesis, busbar sistemleri üretiminde Türkiye\'nin en büyük tesisi olma özelliğini taşıyor.',
    content: 'IPOS Steel, Kocaeli Dilovası\'nda açtığı yeni üretim tesisiyle elektrik dağıtım sistemleri sektöründe önemli bir adım attı...',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop'
    ],
    date: '2024-09-15',
    author: 'IPOS Steel Medya',
    category: 'Şirket Haberleri',
    views: 1250,
    featured: true
  },
  {
    id: 2,
    title: 'Avrupa Pazarına İhracat Başarısı',
    excerpt: 'Almanya ve Hollanda\'ya gerçekleştirdiğimiz ihracatlarla Avrupa pazarındaki varlığımızı güçlendiriyoruz. UL ve CE sertifikalarımız sayesinde uluslararası standartlarda üretim yapıyoruz.',
    content: 'IPOS Steel\'in Avrupa pazarındaki başarısı devam ediyor...',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    date: '2024-09-10',
    author: 'İhracat Departmanı',
    category: 'İhracat',
    views: 890,
    featured: true
  },
  {
    id: 3,
    title: 'Yeni Sismik Test Laboratuvarı Açıldı',
    excerpt: 'Ürünlerimizin deprem güvenliği testlerini kendi tesisimizde gerçekleştireceğimiz modern laboratuvar hizmete girdi. IEC 60068 standartlarında test imkanı sunuyor.',
    content: 'Kalite kontrol süreçlerimizi geliştiren yeni laboratuvar...',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
    date: '2024-09-05',
    author: 'Ar-Ge Departmanı',
    category: 'Teknoloji',
    views: 670,
    featured: false
  },
  {
    id: 4,
    title: 'Sürdürülebilirlik Projesinde Önemli Adım',
    excerpt: 'Çevre dostu üretim süreçleri ve geri dönüşümlü malzeme kullanımı ile sürdürülebilir üretim hedeflerimize ulaşıyoruz. ISO 14001 çevre yönetim sistemi sertifikamız yenilendi.',
    content: 'IPOS Steel sürdürülebilirlik alanındaki çalışmalarını sürdürüyor...',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
    date: '2024-08-28',
    author: 'Çevre Departmanı',
    category: 'Çevre',
    views: 520,
    featured: false
  },
  {
    id: 5,
    title: 'Dijital Dönüşüm Projesi Tamamlandı',
    excerpt: 'Üretim süreçlerimizde dijitalleşme adımları ile Endüstri 4.0 teknolojilerini entegre ettik. IoT sensörler ve yapay zeka destekli kalite kontrol sistemleri devreye alındı.',
    content: 'Dijital dönüşüm sürecimizde önemli kilometre taşı...',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop',
    date: '2024-08-20',
    author: 'IT Departmanı',
    category: 'Teknoloji',
    views: 780,
    featured: false
  },
  {
    id: 6,
    title: 'Genç Mühendis Programa Katılım',
    excerpt: 'Üniversite mezunu genç mühendislere yönelik eğitim ve gelişim programımız başladı. 6 aylık rotasyon programı ile farklı departmanlarda deneyim kazanma imkanı sunuyoruz.',
    content: 'İnsan kaynakları gelişim programımızın detayları...',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    date: '2024-08-15',
    author: 'İnsan Kaynakları',
    category: 'İnsan Kaynakları',
    views: 450,
    featured: false
  }
]

const defaultNewsCategories = ['Şirket Haberleri', 'İhracat', 'Teknoloji', 'Çevre', 'İnsan Kaynakları']

export default function HaberlerPage() {
  const [selectedKategori, setSelectedKategori] = useState('Tümü')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
          author: 'IPOS Steel',
          category: d.category
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

  const categories = useMemo(() => {
    const cats = items.map(n => n.category).filter(Boolean)
    const unique: string[] = []
    for (const c of cats) if (!unique.includes(c)) unique.push(c)
    const base = unique.length ? unique : defaultNewsCategories
    return ['Tümü', ...base]
  }, [items])

  const filteredHaberler = useMemo(() => (
    selectedKategori === 'Tümü' ? items : items.filter(h => h.category === selectedKategori)
  ), [items, selectedKategori])
  
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
              IPOS Steel'den son gelişmeler ve sektör haberleri
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
                    {loading ? '...' : `${filteredHaberler.length} haber`}
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
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))
                ) : filteredHaberler.length > 0 ? (
                  filteredHaberler.map((haber) => (
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
                      Bu kategoride haber bulunamadı
                    </h3>
                    <p className="text-gray-500 text-sm">
                      "{selectedKategori}" kategorisinde henüz haber bulunmuyor.
                    </p>
                    <button 
                      onClick={() => setSelectedKategori('Tümü')}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Tüm haberleri görüntüle
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
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="w-full flex items-center justify-between py-2 px-3">
                          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                        </div>
                      ))
                    ) : (
                      categories.slice(1).map((kategori) => {
                        const count = items.filter((h) => h.category === kategori).length
                        return (
                          <button
                            key={kategori}
                            onClick={() => setSelectedKategori(kategori)}
                            className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors text-left ${
                              selectedKategori === kategori
                                ? 'bg-blue-50 text-blue-700'
                                : 'hover:bg-white text-slate-700 hover:text-slate-900'
                            }`}
                          >
                            <span className="text-sm font-medium">{kategori}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              selectedKategori === kategori
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

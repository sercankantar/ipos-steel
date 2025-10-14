"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Calendar, MapPin, Building, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

// Statik referanslar (API olmadığı için)
const staticReferences = [
  {
    id: 1,
    title: 'Güneş Enerjisi Santrali Kablo Altyapısı',
    excerpt: 'Ankara\'da kurulu 50 MW güneş enerjisi santrali için kapsamlı kablo tavaları ve elektrik altyapı çözümleri sağladık.',
    content: `
      <p>IPOS Steel olarak, Ankara'nın en büyük güneş enerjisi santrallerinden biri olan 50 MW kapasiteli projeye kapsamlı elektrik altyapı çözümleri sağladık.</p>
      
      <h3>Proje Detayları</h3>
      <p>Proje kapsamında toplam 15 km kablo tavaları, 200 adet destek sistemi ve özel tasarım montaj aksesuarları tedarik edildi. Tüm ürünler IP65 koruma sınıfında ve UV dayanımlı malzemelerden üretildi.</p>
      
      <p>Proje Müdürü Mehmet Yılmaz: "IPOS Steel'in sağladığı çözümler sayesinde montaj süremizi %30 kısalttık ve maliyet tasarrufu sağladık."</p>
      
      <h3>Teknik Özellikler</h3>
      <p>Kullanılan kablo tavaları 600V gerilim seviyesine uygun, galvanizli çelik malzemeden üretildi. Özel anti-korozyon kaplama ile 25 yıl garanti verildi.</p>
      
      <h3>Çevresel Etki</h3>
      <p>Proje ile yılda 75.000 ton CO2 emisyon tasarrufu sağlanacak. Sürdürülebilir enerji üretiminde IPOS Steel çözümleri kritik rol oynuyor.</p>
    `,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop'
    ],
    date: '2024-09-15',
    location: 'Ankara, Türkiye',
    client: 'Güneş Enerji A.Ş.',
    category: 'Güneş Enerjisi',
    projectValue: '2.5 Milyon TL',
    duration: '6 ay',
    views: 1250,
    featured: true,
    tags: ['güneş-enerjisi', 'kablo-tavaları', 'elektrik-altyapı']
  },
  {
    id: 2,
    title: 'Endüstriyel Tesis Elektrik Altyapısı',
    excerpt: 'İstanbul\'da kurulu otomotiv fabrikası için kapsamlı elektrik dağıtım sistemleri ve kablo yönetim çözümleri uyguladık.',
    content: `
      <p>Otomotiv sektörünün önde gelen firmalarından biri için İstanbul'da gerçekleştirdiğimiz kapsamlı elektrik altyapı projesi.</p>
      
      <h3>Proje Kapsamı</h3>
      <p>25.000 m² üretim alanında toplam 8 km kablo kanalı, 150 adet kablo merdiveni ve özel tasarım destek sistemleri kuruldu.</p>
      
      <h3>Teknik Çözümler</h3>
      <p>Yüksek akım taşıma kapasiteli kablo tavaları, yangın dayanımlı kaplama ve özel ventilasyon sistemleri uygulandı.</p>
    `,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=800&fit=crop'
    ],
    date: '2024-08-20',
    location: 'İstanbul, Türkiye',
    client: 'Otomotiv Sanayi A.Ş.',
    category: 'Endüstriyel',
    projectValue: '1.8 Milyon TL',
    duration: '4 ay',
    views: 890,
    featured: true,
    tags: ['endüstriyel', 'otomotiv', 'kablo-kanalı']
  },
  {
    id: 3,
    title: 'Ticari Merkez Elektrik Sistemleri',
    excerpt: 'İzmir\'de yeni açılan alışveriş merkezi için modern elektrik dağıtım sistemleri ve estetik kablo yönetim çözümleri sağladık.',
    content: `
      <p>İzmir'in en büyük alışveriş merkezlerinden biri için gerçekleştirdiğimiz elektrik altyapı projesi.</p>
      
      <h3>Estetik ve Fonksiyonellik</h3>
      <p>Görünür alanlarda estetik kablo kanalları, gizli alanlarda yüksek kapasiteli kablo tavaları kullanıldı.</p>
    `,
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&h=800&fit=crop'
    ],
    date: '2024-07-10',
    location: 'İzmir, Türkiye',
    client: 'Ticaret Merkezi A.Ş.',
    category: 'Ticari',
    projectValue: '1.2 Milyon TL',
    duration: '3 ay',
    views: 650,
    featured: false,
    tags: ['ticari', 'alışveriş-merkezi', 'estetik']
  },
  {
    id: 4,
    title: 'Hastane Elektrik Altyapı Projesi',
    excerpt: 'Bursa\'da yeni kurulan özel hastane için kritik elektrik sistemleri ve acil durum kablo altyapısı uyguladık.',
    content: `
      <p>Sağlık sektörünün kritik ihtiyaçları için Bursa'da gerçekleştirdiğimiz özel hastane projesi.</p>
      
      <h3>Kritik Sistem Gereksinimleri</h3>
      <p>Hastane elektrik sistemlerinde kesintisiz güç sağlama, yangın güvenliği ve acil durum sistemleri öncelikli olarak ele alındı.</p>
    `,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=800&fit=crop'
    ],
    date: '2024-06-25',
    location: 'Bursa, Türkiye',
    client: 'Özel Sağlık Grubu',
    category: 'Sağlık',
    projectValue: '900 Bin TL',
    duration: '2 ay',
    views: 420,
    featured: false,
    tags: ['sağlık', 'hastane', 'kritik-sistem']
  },
  {
    id: 5,
    title: 'Veri Merkezi Kablo Yönetimi',
    excerpt: 'Ankara\'da kurulan veri merkezi için yüksek performanslı kablo yönetim sistemleri ve soğutma destekli çözümler uyguladık.',
    content: `
      <p>Teknoloji sektörünün artan veri merkezi ihtiyaçları için Ankara'da gerçekleştirdiğimiz ileri teknoloji projesi.</p>
      
      <h3>Yüksek Performans Gereksinimleri</h3>
      <p>Veri merkezlerinin 7/24 kesintisiz çalışma gereksinimleri için özel tasarım kablo tavaları ve soğutma sistemleri entegrasyonu sağlandı.</p>
    `,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop'
    ],
    date: '2024-05-15',
    location: 'Ankara, Türkiye',
    client: 'Teknoloji Veri A.Ş.',
    category: 'Teknoloji',
    projectValue: '1.5 Milyon TL',
    duration: '5 ay',
    views: 780,
    featured: false,
    tags: ['veri-merkezi', 'teknoloji', 'soğutma']
  },
  {
    id: 6,
    title: 'Eğitim Kampüsü Elektrik Altyapısı',
    excerpt: 'Konya\'da kurulan üniversite kampüsü için geniş alan kablo dağıtım sistemleri ve akıllı elektrik çözümleri sağladık.',
    content: `
      <p>Eğitim sektörünün modern ihtiyaçları için Konya'da gerçekleştirdiğimiz kapsamlı kampüs projesi.</p>
      
      <h3>Geniş Alan Çözümleri</h3>
      <p>Kampüs genelinde 12 km kablo altyapısı, akıllı elektrik dağıtım sistemleri ve enerji verimli çözümler uygulandı.</p>
    `,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=800&fit=crop'
    ],
    date: '2024-04-30',
    location: 'Konya, Türkiye',
    client: 'Özel Üniversite',
    category: 'Eğitim',
    projectValue: '3.2 Milyon TL',
    duration: '8 ay',
    views: 950,
    featured: false,
    tags: ['eğitim', 'kampüs', 'akıllı-sistem']
  }
]

const defaultReferenceCategories = ['Güneş Enerjisi', 'Endüstriyel', 'Ticari', 'Sağlık', 'Teknoloji', 'Eğitim']

export default function ReferanslarimizPage() {
  const [selectedKategori, setSelectedKategori] = useState('Tümü')
  const [items, setItems] = useState<any[]>(staticReferences)
  const [loading, setLoading] = useState(false)

  const categories = useMemo(() => {
    const cats = items.map(r => r.category).filter(Boolean)
    const unique: string[] = []
    for (const c of cats) if (!unique.includes(c)) unique.push(c)
    const base = unique.length ? unique : defaultReferenceCategories
    return ['Tümü', ...base]
  }, [items])

  const filteredReferanslar = useMemo(() => (
    selectedKategori === 'Tümü' ? items : items.filter(r => r.category === selectedKategori)
  ), [items, selectedKategori])

  const featuredReferanslar = filteredReferanslar.filter(r => r.featured)
  const regularReferanslar = filteredReferanslar.filter(r => !r.featured)
  
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <span>Referanslarımız</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              Referanslarımız
            </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              Güneş enerjisi ve elektrik altyapısı alanında gerçekleştirdiğimiz başarılı projeler ve 
              müşterilerimizin güvenini kazandığımız referans çalışmalarımız
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sol Kolon - Referanslar */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-neuropol text-2xl font-bold text-slate-900">
                    Projelerimiz
                  </h2>
                  <span className="text-sm text-gray-500">
                    {loading ? '...' : `${filteredReferanslar.length} proje`}
                  </span>
                </div>
                
                {/* Kategori Filtreleri */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {loading ? (
                    <>
                      {Array.from({ length: 7 }).map((_, i) => (
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

              {/* Referanslar Listesi */}
              <div className="space-y-6">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex gap-4">
                        <div className="w-32 sm:w-40 aspect-[4/3] bg-gray-200 rounded-md animate-pulse" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                          </div>
                          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : filteredReferanslar.length > 0 ? (
                  filteredReferanslar.map((referans) => (
                    <article
                      key={referans.id}
                      className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow group overflow-hidden p-4"
                    >
                      <div className="flex gap-4">
                        {/* Küçük Görsel Sol Tarafta */}
                        <div className="relative w-32 sm:w-40 aspect-[4/3] flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={referans.image}
                            alt={referans.title}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                        {/* Metin İçerik */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                referans.featured 
                                  ? 'bg-red-100 text-red-600' 
                                  : 'bg-blue-100 text-blue-600'
                              }`}>
                                {referans.category}
                              </span>
                              {referans.featured && (
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(referans.date).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="font-neuropol font-bold text-lg mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                            {referans.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                            {referans.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{referans.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                <span>{referans.client}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{referans.views}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-start">
                            <Link
                              href={`/referanslarimiz/${referans.id}`}
                              className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium text-sm transition-all duration-200 border border-slate-300 hover:border-slate-400 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50"
                            >
                              Detayları Gör
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Proje bulunamadı
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {selectedKategori !== 'Tümü' 
                        ? `"${selectedKategori}" kategorisinde proje bulunmuyor.`
                        : 'Henüz proje bulunmuyor.'
                      }
                    </p>
                    <button 
                      onClick={() => setSelectedKategori('Tümü')}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Tüm projeleri görüntüle
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
                        const count = items.filter((r) => r.category === kategori).length
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

                {/* Öne Çıkan Projeler */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Öne Çıkan Projeler
                  </h3>
                  <div className="space-y-4">
                    {featuredReferanslar.slice(0, 3).map((referans) => (
                      <Link
                        key={referans.id}
                        href={`/referanslarimiz/${referans.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                            <Image
                              src={referans.image}
                              alt={referans.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                              {referans.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
                                {referans.category}
                              </span>
                              <span>{new Date(referans.date).toLocaleDateString('tr-TR')}</span>
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
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

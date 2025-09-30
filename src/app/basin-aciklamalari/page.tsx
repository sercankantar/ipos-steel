"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Calendar, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const staticItems = [
  {
    id: 1,
    title: 'IPOS Steel Kocaeli Tesisini Genişletiyor',
    date: '2024-09-20',
    summary: 'IPOS Steel, Kocaeli Dilovası\'ndaki üretim tesisini genişletme kararı aldığını açıkladı. 25 milyon TL yatırımla kapasite %50 artırılacak.',
    content: 'IPOS Steel Dış Ticaret A.Ş., elektrik dağıtım sistemleri sektöründeki büyümesini sürdürmek amacıyla Kocaeli Dilovası\'ndaki ana üretim tesisini genişletme kararı aldığını açıkladı...',
    pdfUrl: '/basin-aciklamalari/2024-09-20-tesis-genisletme.pdf',
    category: 'Yatırım',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Avrupa Pazarında Yeni İş Birlikleri',
    date: '2024-09-12',
    summary: 'Almanya ve Hollanda\'daki stratejik ortaklarımızla yeni distribütörlük anlaşmaları imzalandı. 2025 hedefi Avrupa\'da %30 büyüme.',
    content: 'IPOS Steel, Avrupa pazarındaki büyüme stratejisini hayata geçirmek için önemli adımlar atıyor...',
    pdfUrl: '/basin-aciklamalari/2024-09-12-avrupa-ortaklik.pdf',
    category: 'İş Birliği',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Çevre Dostu Üretim Sertifikası Aldı',
    date: '2024-09-05',
    summary: 'ISO 14001 Çevre Yönetim Sistemi sertifikası yenilendi. Sürdürülebilir üretim süreçleriyle karbon ayak izini %25 azalttık.',
    content: 'IPOS Steel, çevre dostu üretim yaklaşımıyla sektörde öncü olmaya devam ediyor...',
    pdfUrl: '/basin-aciklamalari/2024-09-05-cevre-sertifika.pdf',
    category: 'Çevre',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Dijital Dönüşüm Projesi Tamamlandı',
    date: '2024-08-28',
    summary: 'Endüstri 4.0 teknolojileriyle donatılan akıllı üretim hatları devreye alındı. Üretim verimliliğinde %35 artış sağlandı.',
    content: 'IPOS Steel, dijital dönüşüm sürecinde önemli bir kilometre taşını geride bıraktı...',
    pdfUrl: '/basin-aciklamalari/2024-08-28-dijital-donusum.pdf',
    category: 'Teknoloji',
    priority: 'medium'
  },
  {
    id: 5,
    title: 'İhracat Hedeflerinde Rekor Artış',
    date: '2024-08-15',
    summary: '2024 ilk yarısında ihracat %120 arttı. Yıl sonu hedefi 15 milyon dolar ihracat cirosu olarak belirlendi.',
    content: 'IPOS Steel\'in ihracat performansı sektörde dikkat çekiyor...',
    pdfUrl: '/basin-aciklamalari/2024-08-15-ihracat-rekor.pdf',
    category: 'İhracat',
    priority: 'high'
  },
  {
    id: 6,
    title: 'Genç Mühendis Geliştirme Programı',
    date: '2024-08-01',
    summary: 'Üniversite mezunu genç mühendislere yönelik 12 aylık rotasyon programı başlatıldı. İlk dönemde 8 genç mühendis programa katıldı.',
    content: 'IPOS Steel, genç yetenekleri sektöre kazandırmak için yeni bir eğitim programı başlattı...',
    pdfUrl: '/basin-aciklamalari/2024-08-01-genc-muhendis.pdf',
    category: 'İnsan Kaynakları',
    priority: 'low'
  }
]

const defaultCategories = ['Yatırım', 'İş Birliği', 'Çevre', 'Teknoloji', 'İhracat', 'İnsan Kaynakları']

export default function BasinAciklamalariPage() {
  const [selectedKategori, setSelectedKategori] = useState('Tümü')
  const [selectedYil, setSelectedYil] = useState('Tümü')
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/press-releases', { cache: 'no-store' })
        const data = res.ok ? await res.json() : []
        const mapped = (data as any[]).map(d => ({
          id: d.id,
          title: d.title,
          date: d.publishedAt,
          summary: d.summary || '',
          content: d.content || '',
          pdfUrl: '',
          category: d.category,
          priority: 'medium',
          image: d.imageUrl || ''
        }))
        setItems(mapped.length ? mapped : staticItems)
      } catch {
        setItems(staticItems)
      }
    }
    load()
  }, [])

  const availableYears = useMemo(() => {
    const years = items.map(a => new Date(a.date).getFullYear())
    const unique: number[] = []
    for (const y of years) if (!unique.includes(y)) unique.push(y)
    return unique.sort((a, b) => b - a)
  }, [items])

  const categories = useMemo(() => {
    const cats = items.map(a => a.category).filter(Boolean)
    const unique: string[] = []
    for (const c of cats) {
      if (!unique.includes(c)) unique.push(c)
    }
    const base = unique.length ? unique : defaultCategories
    return ['Tümü', ...base]
  }, [items])

  const filteredAciklamalar = useMemo(() => {
    let list = items
    if (selectedKategori !== 'Tümü') list = list.filter(a => a.category === selectedKategori)
    if (selectedYil !== 'Tümü') list = list.filter(a => new Date(a.date).getFullYear() === parseInt(selectedYil))
    return list
  }, [items, selectedKategori, selectedYil])
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              Basın Açıklamaları
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              IPOS Steel'in kurumsal gelişmeleri ve önemli duyuruları
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sol Kolon - Basın Açıklamaları */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-neuropol text-2xl font-bold text-slate-900">
                    Son Açıklamalar
                  </h2>
                  <span className="text-sm text-gray-500">
                    {filteredAciklamalar.length} açıklama
                  </span>
                </div>
                
                {/* Kategori Filtreleri */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {categories.map((kategori) => (
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
                  ))}
                </div>
              </div>

              {/* Basın Açıklamaları Listesi */}
              <div className="space-y-6">
                {filteredAciklamalar.length > 0 ? (
                  filteredAciklamalar.map((aciklama) => (
                  <article
                    key={aciklama.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          aciklama.priority === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : aciklama.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {aciklama.category}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          aciklama.priority === 'high' 
                            ? 'bg-red-500' 
                            : aciklama.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}></span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(aciklama.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-neuropol font-bold text-xl mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                      {aciklama.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {aciklama.summary}
                    </p>
                    
                    <div className="flex items-center justify-start">
                      <Link
                        href={`/basin-aciklamalari/${aciklama.id}`}
                        className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium text-sm transition-all duration-200 border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-md bg-white hover:bg-slate-50"
                      >
                        Detayları Oku
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Açıklama bulunamadı
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {selectedKategori !== 'Tümü' && selectedYil !== 'Tümü' 
                        ? `"${selectedKategori}" kategorisinde ${selectedYil} yılına ait açıklama bulunmuyor.`
                        : selectedKategori !== 'Tümü' 
                        ? `"${selectedKategori}" kategorisinde açıklama bulunmuyor.`
                        : selectedYil !== 'Tümü'
                        ? `${selectedYil} yılına ait açıklama bulunmuyor.`
                        : 'Henüz basın açıklaması bulunmuyor.'
                      }
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedKategori('Tümü')
                        setSelectedYil('Tümü')
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Tüm açıklamaları görüntüle
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-8 space-y-8">
                

                {/* Öncelikli (son eklenen) Açıklamalar */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Öncelikli Açıklamalar
                  </h3>
                  <div className="space-y-4">
                    {items
                      .slice(0, 3)
                      .map((aciklama) => (
                        <div key={aciklama.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                          <Link
                            href={`/basin-aciklamalari/${aciklama.id}`}
                            className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 block mb-1"
                          >
                            {aciklama.title}
                          </Link>
                          <p className="text-xs text-gray-500">
                            {new Date(aciklama.date).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Kategori İstatistikleri */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Kategoriler
                  </h3>
                  <div className="space-y-3">
                    {categories.slice(1).map((kategori) => {
                      const count = items.filter((a) => a.category === kategori).length
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
                    })}
                  </div>
                </div>

                {/* Arşiv */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Arşiv
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedYil('Tümü')
                        setSelectedKategori('Tümü')
                      }}
                      className={`w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                        selectedYil === 'Tümü'
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-slate-700 hover:text-blue-600 hover:bg-white'
                      }`}
                    >
                      Tüm Açıklamalar
                    </button>
                    {availableYears.map((yil) => {
                      const count = items.filter((a) => new Date(a.date).getFullYear() === yil).length
                      return (
                        <button
                          key={yil}
                          onClick={() => {
                            setSelectedYil(yil.toString())
                            setSelectedKategori('Tümü')
                          }}
                          className={`w-full flex items-center justify-between text-sm py-2 px-3 rounded-md transition-colors text-left ${
                            selectedYil === yil.toString()
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-slate-700 hover:text-blue-600 hover:bg-white'
                          }`}
                        >
                          <span>{yil} Açıklamaları</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedYil === yil.toString()
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-white text-gray-500'
                          }`}>
                            {count}
                          </span>
                        </button>
                      )
                    })}
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

"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Calendar, MapPin, Building, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

// Referans interface'i
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
  gallery?: string[]
  tags?: string[]
  featured?: boolean
  views?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Varsayılan kategoriler - sadece veritabanında veri yoksa kullanılacak
const defaultReferenceCategories = ['Güneş Enerjisi', 'Endüstriyel', 'Ticari', 'Sağlık', 'Teknoloji', 'Eğitim']

// Kategori renk haritası - database'den gelen kategorileri kullan
const getCategoryColor = (category: string, dbCategories: {name: string, color: string}[]) => {
  // Önce database'den gelen kategorileri kontrol et
  if (dbCategories && Array.isArray(dbCategories)) {
    const dbCategory = dbCategories.find(cat => cat.name === category)
    if (dbCategory) {
      return dbCategory.color
    }
  }
  
  // Fallback statik renkler
  const colors: Record<string, string> = {
    'Güneş Enerjisi': 'bg-yellow-100 text-yellow-800',
    'Endüstriyel': 'bg-blue-100 text-blue-800',
    'Ticari': 'bg-purple-100 text-purple-800',
    'Sağlık': 'bg-green-100 text-green-800',
    'Teknoloji': 'bg-cyan-100 text-cyan-800',
    'Eğitim': 'bg-indigo-100 text-indigo-800',
    'Otomotiv': 'bg-red-100 text-red-800',
    'Enerji': 'bg-orange-100 text-orange-800',
    'Altyapı': 'bg-teal-100 text-teal-800',
    'İnşaat': 'bg-stone-100 text-stone-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

export default function ReferanslarimizPage() {
  const [selectedKategori, setSelectedKategori] = useState('Tümü')
  const [items, setItems] = useState<Reference[]>([])
  const [loading, setLoading] = useState(true)
  const [dbCategories, setDbCategories] = useState<{name: string, color: string}[]>([])

  // API'den referansları ve kategorileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Referansları çek - sadece veritabanından
        const referencesResponse = await fetch('/api/references')
        if (referencesResponse.ok) {
          const referencesData = await referencesResponse.json()
          setItems(Array.isArray(referencesData) ? referencesData : [])
        } else {
          console.error('Referanslar yüklenemedi:', referencesResponse.status)
          setItems([])
        }

        // Kategorileri çek
        const categoriesResponse = await fetch('/api/reference-categories')
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setDbCategories(Array.isArray(categoriesData) ? categoriesData : [])
        } else {
          console.error('Kategoriler yüklenemedi:', categoriesResponse.status)
          setDbCategories([])
        }
      } catch (error) {
        console.error('Veri yüklenirken hata:', error)
        setItems([])
        setDbCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const categories = useMemo(() => {
    const cats = items.map(r => r.category).filter(Boolean)
    const unique: string[] = []
    for (const c of cats) if (!unique.includes(c)) unique.push(c)
    const base = unique.length ? unique : defaultReferenceCategories
    return ['Tümü', ...base]
  }, [items])

  const filteredReferanslar = useMemo(() => {
    const filtered = selectedKategori === 'Tümü' ? items : items.filter(r => r.category === selectedKategori)
    
    // Proje tarihine göre sırala (en yeni tarih önce)
    return filtered.sort((a, b) => {
      // Proje tarihi olanları önce getir
      if (a.projectDate && !b.projectDate) return -1
      if (!a.projectDate && b.projectDate) return 1
      
      // Her ikisinde de proje tarihi varsa, tarihe göre sırala
      if (a.projectDate && b.projectDate) {
        return new Date(b.projectDate).getTime() - new Date(a.projectDate).getTime()
      }
      
      // Proje tarihi yoksa oluşturulma tarihine göre sırala
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [items, selectedKategori])

  
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
                      className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow group overflow-hidden p-4 cursor-pointer"
                      onClick={() => window.location.href = `/referanslarimiz/${referans.slug || referans.id}`}
                    >
                      <div className="flex gap-4">
                        {/* Proje Ana Fotoğrafı Sol Tarafta */}
                        <div className="relative w-32 sm:w-40 aspect-[4/3] flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                          <Image
                            src={referans.mainImage || referans.gallery?.[0] || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop'}
                            alt={`${referans.title || 'Proje Görseli'}`}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                        {/* Metin İçerik */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(referans.category || referans.sector, dbCategories)}`}>
                                {referans.category || referans.sector}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {referans.projectDate && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(referans.projectDate).toLocaleDateString('tr-TR')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <h3 className="font-neuropol font-bold text-lg mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                            {referans.title || referans.name}
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                            {referans.excerpt || `${referans.sector} sektöründe gerçekleştirdiğimiz ${referans.name} projesi.`}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{referans.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                <span>{referans.client || referans.name}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{referans.views}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-start">
                            <span className="inline-flex items-center gap-2 text-slate-700 group-hover:text-slate-900 font-medium text-sm transition-all duration-200 border border-slate-300 group-hover:border-slate-400 px-3 py-1.5 rounded-md bg-white group-hover:bg-slate-50">
                              Detayları Gör
                              <ArrowRight className="h-4 w-4" />
                            </span>
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


              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

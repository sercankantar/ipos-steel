"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Eye, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'

interface GalleryImage {
  id: string
  imageUrl: string
  imagePublicId: string
  order: number
}

interface GalleryItem {
  id: string
  title: string
  summary?: string
  category: string
  categoryColor?: string
  publishedAt: string
  imageUrl?: string
  images?: GalleryImage[]
  isActive: boolean
}

// Kategoriler artık dinamik olarak backend'den geliyor

// Fallback görseller (API yoksa)
const galeriGorselleri = [
  // Fabrika ve Üretim (6 görsel)
  {
    id: 1,
    title: 'Modern Üretim Tesisi',
    category: 'fabrika',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    date: '2024-09-15',
    description: 'Kocaeli fabrikamızın modern üretim hattı',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'Kalite Kontrol Laboratuvarı',
    category: 'fabrika',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
    date: '2024-08-20',
    description: 'Test ve kalite kontrol süreçleri'
  },
  {
    id: 10,
    title: 'Otomatik Üretim Hattı',
    category: 'fabrika',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop',
    date: '2024-08-15',
    description: 'Tam otomatik busbar üretim sistemimiz'
  },
  {
    id: 11,
    title: 'Depo ve Lojistik',
    category: 'fabrika',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop',
    date: '2024-08-05',
    description: 'Modern depolama ve sevkiyat sistemi'
  },
  {
    id: 12,
    title: 'Çelik İşleme Atölyesi',
    category: 'fabrika',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    date: '2024-07-25',
    description: 'Çelik işleme ve kaynak atölyemiz'
  },
  {
    id: 13,
    title: 'Fabrika Genel Görünüm',
    category: 'fabrika',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    date: '2024-07-20',
    description: 'Tesisimizin genel görünümü'
  },

  // Ürünler (8 görsel)
  {
    id: 2,
    title: 'Busbar Sistemi Üretimi',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    date: '2024-09-10',
    description: 'UL sertifikalı busbar sistemleri üretim süreci'
  },
  {
    id: 6,
    title: 'Askı Sistemleri',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    date: '2024-07-15',
    description: 'Sismik askı sistemleri ürün gamı'
  },
  {
    id: 9,
    title: 'Kablo Kanalı Üretimi',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
    date: '2024-05-05',
    description: 'Galvanizli kablo kanalı üretim süreci'
  },
  {
    id: 14,
    title: 'Elektrik Panoları',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
    date: '2024-09-05',
    description: 'Yüksek kaliteli elektrik dağıtım panoları'
  },
  {
    id: 15,
    title: 'Kablo Kanalı Çeşitleri',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    date: '2024-08-30',
    description: 'Farklı boyutlarda kablo kanalları'
  },
  {
    id: 16,
    title: 'Busbar Bağlantı Elemanları',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1621905252472-e8e22657b5e6?w=800&h=600&fit=crop',
    date: '2024-08-25',
    description: 'Busbar sistemleri için bağlantı parçaları'
  },
  {
    id: 17,
    title: 'Trolley Busbar Sistemleri',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
    date: '2024-07-10',
    description: 'Hareket eden makinalar için enerji dağıtım sistemleri'
  },
  {
    id: 18,
    title: 'İç Tesisat Çözümleri',
    category: 'urunler',
    image: 'https://images.unsplash.com/photo-1558681847-80c1d27b4995?w=800&h=600&fit=crop',
    date: '2024-06-20',
    description: 'Ofis ve işyerleri için modüler çözümler'
  },

  // Projeler (7 görsel)
  {
    id: 3,
    title: 'Alışveriş Merkezi Projesi',
    category: 'projeler',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    date: '2024-08-25',
    description: 'İstanbul AVM elektrik dağıtım sistemi projesi'
  },
  {
    id: 7,
    title: 'Endüstriyel Tesis Kurulumu',
    category: 'projeler',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop',
    date: '2024-06-10',
    description: 'Bursa otomotiv fabrikası elektrik altyapısı'
  },
  {
    id: 19,
    title: 'Hastane Elektrik Projesi',
    category: 'projeler',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
    date: '2024-09-01',
    description: 'Ankara Şehir Hastanesi elektrik altyapısı'
  },
  {
    id: 20,
    title: 'Gökdelen Projesi',
    category: 'projeler',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    date: '2024-08-10',
    description: 'İstanbul Financial Center elektrik dağıtımı'
  },
  {
    id: 21,
    title: 'Metro İstasyonu Projesi',
    category: 'projeler',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=800&h=600&fit=crop',
    date: '2024-07-05',
    description: 'İstanbul Metro hattı elektrik sistemleri'
  },
  {
    id: 22,
    title: 'Havaalanı Terminal Projesi',
    category: 'projeler',
    image: 'https://images.unsplash.com/photo-1569406253322-9e5149b85609?w=800&h=600&fit=crop',
    date: '2024-06-15',
    description: 'İstanbul Havaalanı yeni terminal elektrik altyapısı'
  },
  {
    id: 23,
    title: 'Otel Kompleksi Projesi',
    category: 'projeler',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    date: '2024-05-25',
    description: 'Antalya lüks otel kompleksi elektrik sistemleri'
  },

  // Etkinlikler (5 görsel)
  {
    id: 8,
    title: 'Mühendislik Ekibi',
    category: 'etkinlikler',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    date: '2024-05-20',
    description: 'Teknik eğitim semineri'
  },
  {
    id: 24,
    title: 'Ar-Ge Toplantısı',
    category: 'etkinlikler',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    date: '2024-09-12',
    description: 'Yeni ürün geliştirme toplantısı'
  },
  {
    id: 25,
    title: 'Çalışan Eğitimi',
    category: 'etkinlikler',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692b?w=800&h=600&fit=crop',
    date: '2024-08-18',
    description: 'İş güvenliği ve teknik eğitim programı'
  },
  {
    id: 26,
    title: 'Şirket Pikniği',
    category: 'etkinlikler',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
    date: '2024-07-08',
    description: 'Yıllık şirket piknik etkinliği'
  },
  {
    id: 27,
    title: 'Ödül Töreni',
    category: 'etkinlikler',
    image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&h=600&fit=crop',
    date: '2024-06-30',
    description: 'Yılın çalışanları ödül töreni'
  },

  // Fuarlar ve Sergiler (6 görsel)
  {
    id: 5,
    title: 'Elektrik Fuarı 2024',
    category: 'sergiler',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    date: '2024-07-30',
    description: 'İstanbul Elektrik Fuarı standımız'
  },
  {
    id: 28,
    title: 'Hannover Messe 2024',
    category: 'sergiler',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop',
    date: '2024-04-15',
    description: 'Almanya Hannover Endüstri Fuarı katılımımız'
  },
  {
    id: 29,
    title: 'İnovasyon Fuarı',
    category: 'sergiler',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    date: '2024-03-22',
    description: 'Teknoloji ve İnovasyon Fuarı standımız'
  },
  {
    id: 30,
    title: 'Yapı Fuarı Ankara',
    category: 'sergiler',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
    date: '2024-02-18',
    description: 'Ankara Yapı Fuarı katılımımız'
  },
  {
    id: 31,
    title: 'Enerji Teknolojileri Fuarı',
    category: 'sergiler',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
    date: '2024-01-25',
    description: 'İzmir Enerji Teknolojileri Fuarı'
  },
  {
    id: 32,
    title: 'Smart Energy Expo',
    category: 'sergiler',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    date: '2023-12-10',
    description: 'Smart Energy Expo fuarında yeni teknolojilerimiz'
  }
]

export default function GaleriPage() {
  const [selectedKategori, setSelectedKategori] = useState('tumü')
  const [visibleCount, setVisibleCount] = useState(6) // İlk başta 6 görsel göster
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        // Galeri öğelerini ve kategorileri paralel olarak çek
        const [galleryRes, categoriesRes] = await Promise.all([
          fetch('/api/gallery', { cache: 'no-store' }),
          fetch('/api/gallery-categories', { cache: 'no-store' })
        ])
        
        const galleryData = galleryRes.ok ? await galleryRes.json() : []
        const categoriesData = categoriesRes.ok ? await categoriesRes.json() : []
        
        const mapped = (galleryData as any[]).map(d => ({
          id: d.id,
          title: d.title,
          category: d.category,
          categoryColor: d.categoryColor || 'bg-gray-100 text-gray-800',
          image: d.imageUrl || (d.images && d.images.length > 0 ? d.images[0].imageUrl : ''),
          date: d.publishedAt,
          description: d.summary || '',
          gallery: d.images && d.images.length > 0 
            ? d.images.map((img: any) => img.imageUrl)
            : (d.imageUrl ? [d.imageUrl] : [])
        }))
        
        setItems(mapped)
        setCategories(categoriesData)
      } catch {
        setItems([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])
  
  // Dinamik kategori listesi oluştur
  const dynamicCategories = useMemo(() => {
    const categoryMap = new Map()
    
    // Tüm kategorileri say
    items.forEach(item => {
      if (item.category) {
        const existing = categoryMap.get(item.category)
        if (existing) {
          existing.count++
        } else {
          categoryMap.set(item.category, {
            id: item.category,
            name: item.category,
            count: 1
          })
        }
      }
    })
    
    return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  // Kategoriye göre filtrelenmiş görseller
  const filteredGorseller = selectedKategori === 'tumü' 
    ? items 
    : items.filter(gorsel => gorsel.category === selectedKategori)
  
  // Görünür görseller (pagination için)
  const visibleGorseller = filteredGorseller.slice(0, visibleCount)
  
  // Daha fazla görsel var mı?
  const hasMore = visibleCount < filteredGorseller.length
  
  // Daha fazla göster fonksiyonu
  const loadMore = () => {
    setVisibleCount(prev => prev + 6)
  }
  
  // Kategori değiştiğinde visible count'u resetle
  const handleKategoriChange = (kategori: string) => {
    setSelectedKategori(kategori)
    setVisibleCount(6)
  }

  // Modal fonksiyonları
  const openModal = (imageId: number, imageIndex: number = 0) => {
    setSelectedImageId(imageId)
    setSelectedImageIndex(imageIndex)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImageId(null)
    setSelectedImageIndex(0)
  }

  const currentImage = selectedImageId ? items.find(g => g.id === selectedImageId) : null
  const currentGallery = currentImage?.gallery || [currentImage?.image].filter(Boolean)

  const nextImage = () => {
    if (currentGallery && currentGallery.length > 1) {
      const nextIndex = (selectedImageIndex + 1) % currentGallery.length
      setSelectedImageIndex(nextIndex)
    }
  }

  const prevImage = () => {
    if (currentGallery && currentGallery.length > 1) {
      const prevIndex = selectedImageIndex === 0 ? currentGallery.length - 1 : selectedImageIndex - 1
      setSelectedImageIndex(prevIndex)
    }
  }

  // ESC tuşu ile modal kapatma
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      } else if (event.key === 'ArrowLeft') {
        prevImage()
      } else if (event.key === 'ArrowRight') {
        nextImage()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Scroll'u engelle
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, selectedImageIndex])
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              Galeri
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Fabrikamız, ürünlerimiz ve projelerimizden kareler
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-12">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Ana Galeri */}
            <div className="lg:col-span-3">
              
              {/* Galeri Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="group">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 mb-4 animate-pulse" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : visibleGorseller.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleGorseller.map((gorsel) => (
                    <div 
                      key={gorsel.id} 
                      className="group cursor-pointer"
                      onClick={() => openModal(gorsel.id)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-4">
                        <Image
                          src={gorsel.image}
                          alt={gorsel.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white rounded-full p-3 shadow-lg">
                            <Eye className="h-6 w-6 text-gray-700" />
                          </div>
                        </div>

                        {/* Kategori Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${gorsel.categoryColor || 'bg-white/90 text-gray-700'}`}>
                        {gorsel.category}
                          </span>
                        </div>
                      </div>

                      {/* Görsel Bilgileri */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {gorsel.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {gorsel.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(gorsel.date).toLocaleDateString('tr-TR')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Bu kategoride görsel bulunamadı
                  </h3>
                  <p className="text-gray-500 text-sm">
                    "{selectedKategori}" kategorisinde henüz görsel bulunmuyor.
                  </p>
                  <button 
                    onClick={() => handleKategoriChange('tumü')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Tüm görselleri görüntüle
                  </button>
                </div>
              )}

              {/* Daha Fazla Yükle */}
              {!loading && hasMore && (
                <div className="text-center mt-12">
                  <button 
                    onClick={loadMore}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Daha Fazla Göster
                  </button>
                </div>
              )}
            </div>

            {/* Sağ Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                
                {/* Kategoriler */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
                    Kategoriler
                  </h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleKategoriChange('tumü')}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-md text-left transition-colors ${
                        selectedKategori === 'tumü'
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-white text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-sm font-medium">Tümü</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedKategori === 'tumü'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-white text-gray-500'
                      }`}>
                        {loading ? '...' : items.length}
                      </span>
                    </button>
                    {dynamicCategories.map((kategori) => (
                      <button
                        key={kategori.id}
                        onClick={() => handleKategoriChange(kategori.id)}
                        className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors text-left ${
                          selectedKategori === kategori.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'hover:bg-white text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <span className="text-sm font-medium">{kategori.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedKategori === kategori.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-white text-gray-500'
                        }`}>
                          {kategori.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Modal */}
      {isModalOpen && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-full">
            
            {/* Kapat Butonu */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Sol Ok */}
            {currentGallery && currentGallery.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Sağ Ok */}
            {currentGallery && currentGallery.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Ana Görsel */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <Image
                src={currentGallery?.[selectedImageIndex] || currentImage?.image || ''}
                alt={currentImage?.title || ''}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Görsel Bilgileri */}
            <div className="bg-white p-6 rounded-b-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-neuropol font-bold text-xl mb-2 text-gray-900">
                    {currentImage?.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {currentImage?.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{currentImage?.date ? new Date(currentImage.date).toLocaleDateString('tr-TR') : ''}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${currentImage?.categoryColor || 'bg-gray-100 text-gray-700'}`}>
                      {currentImage?.category}
                    </span>
                    {currentGallery && currentGallery.length > 1 && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {selectedImageIndex + 1} / {currentGallery.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backdrop Kapatma */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeModal}
          ></div>
        </div>
      )}
    </div>
  )
}

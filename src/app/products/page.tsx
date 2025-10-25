'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => (typeof param === 'string' ? param : undefined)

function getBaseUrl() {
  return typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:3000'
}

async function getProducts(category?: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  
  // GES ürünleri için farklı endpoint kullan
  if (category === 'solar-montaj-sistemleri') {
    const res = await fetch(`${base}/api/ges-products`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  }
  
  const url = category ? `${base}/api/products?category=${encodeURIComponent(category)}` : `${base}/api/products`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

async function getProductCategories() {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  const res = await fetch(`${base}/api/product-categories`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const category = parse(searchParams.category)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(category),
          getProductCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [category])
  
  // Seçili kategorinin bilgilerini bul
  const selectedCategory = categories.find((cat: any) => cat.slug === category)
  
  // Carousel fonksiyonları
  const itemsPerSlide = 3
  const totalSlides = Math.ceil(products.length / itemsPerSlide)
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }
  
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1a3056] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }
  
  // Özel kategori tasarımları
  if (category === 'kablo-kanal-sistemleri') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b">
          <MaxWidthWrapper>
            <div className="py-4">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#1a3056]">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/products" className="hover:text-[#1a3056]">Ürünler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-[#1a3056] font-medium">Kablo Kanal Sistemleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#1a3056] to-[#2d4a73] text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  Kablo Kanal Sistemleri
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  IPOS kablo kanalları ve merdivenleri; kabloları dış etkenlerden koruyan yüksek dayanımlı kablo koruması sağlar. 
                  Otomatik üretim hatlarında "Roll Forming" metoduyla seri olarak imal edilmektedir. Standart kanal boyu 3m'dir. 
                  Talep edilmesi durumunda 6m üretilebilir.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

            {/* Ürün Kategorileri - Sade Horizontal Tasarım */}
            <div className="bg-white border-b border-gray-100">
              <MaxWidthWrapper>
                <div className="py-12">
                  <div className="flex justify-center items-center">
                    <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                      {/* Busbar Sistemleri */}
                      <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          {/* Busbar İkonu - 3D Görünüm */}
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <defs>
                              <linearGradient id="busbarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#e5e7eb" />
                                <stop offset="100%" stopColor="#9ca3af" />
                              </linearGradient>
                            </defs>
                            {/* Ana Busbar Gövdesi */}
                            <rect x="10" y="20" width="60" height="24" fill="url(#busbarGrad)" rx="2" />
                            {/* Üst Kenar */}
                            <rect x="10" y="20" width="60" height="4" fill="#d1d5db" rx="2" />
                            {/* Alt Gölge */}
                            <rect x="12" y="42" width="60" height="4" fill="#6b7280" opacity="0.3" rx="2" />
                            {/* Bağlantı Noktaları */}
                            <circle cx="20" cy="32" r="3" fill="#374151" />
                            <circle cx="35" cy="32" r="3" fill="#374151" />
                            <circle cx="50" cy="32" r="3" fill="#374151" />
                            <circle cx="65" cy="32" r="3" fill="#374151" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                          Busbar Sistemleri
                        </h3>
                        <p className="text-xs text-gray-500">
                          Güç dağıtım çözümleri
                        </p>
                      </Link>

                      {/* Askı Sistemleri */}
                      <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          {/* Askı İkonu */}
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <defs>
                              <linearGradient id="askiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#e5e7eb" />
                                <stop offset="100%" stopColor="#9ca3af" />
                              </linearGradient>
                            </defs>
                            {/* Askı Çubuğu */}
                            <rect x="20" y="15" width="40" height="6" fill="url(#askiGrad)" rx="3" />
                            {/* Dikey Destek */}
                            <rect x="37" y="21" width="6" height="25" fill="url(#askiGrad)" rx="3" />
                            {/* Bağlantı Halkası */}
                            <circle cx="40" cy="18" r="4" fill="none" stroke="#6b7280" strokeWidth="2" />
                            {/* Alt Bağlantı */}
                            <rect x="30" y="43" width="20" height="4" fill="#6b7280" rx="2" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                          Askı Sistemleri
                        </h3>
                        <p className="text-xs text-gray-500">
                          Taşıyıcı destek çözümleri
                        </p>
                      </Link>

                      {/* Kablo Kanalları - Aktif */}
                      <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          {/* Kablo Kanalı İkonu - Kırmızı */}
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <defs>
                              <linearGradient id="kanalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fca5a5" />
                                <stop offset="100%" stopColor="#dc2626" />
                              </linearGradient>
                            </defs>
                            {/* Ana Kanal Gövdesi */}
                            <rect x="8" y="22" width="64" height="20" fill="url(#kanalGrad)" rx="2" />
                            {/* Üst Kenar */}
                            <rect x="8" y="22" width="64" height="3" fill="#f87171" rx="2" />
                            {/* Alt Gölge */}
            <rect x="10" y="40" width="64" height="3" fill="#991b1b" opacity="0.4" rx="2" />
                            {/* Delikler */}
                            <circle cx="18" cy="32" r="2" fill="#991b1b" opacity="0.6" />
                            <circle cx="28" cy="32" r="2" fill="#991b1b" opacity="0.6" />
                            <circle cx="38" cy="32" r="2" fill="#991b1b" opacity="0.6" />
                            <circle cx="48" cy="32" r="2" fill="#991b1b" opacity="0.6" />
                            <circle cx="58" cy="32" r="2" fill="#991b1b" opacity="0.6" />
                            <circle cx="68" cy="32" r="2" fill="#991b1b" opacity="0.6" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-red-600 text-sm mb-1 group-hover:text-red-700 transition-colors">
                          Kablo Kanalları
                        </h3>
                        <p className="text-xs text-red-500">
                          Kablo koruma sistemleri
                        </p>
                      </Link>

                      {/* İç Tesisat Çözümleri */}
                      <Link href="/products?category=ic-tesisat-cozumleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          {/* İç Tesisat İkonu */}
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <defs>
                              <linearGradient id="tesisatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#e5e7eb" />
                                <stop offset="100%" stopColor="#9ca3af" />
                              </linearGradient>
                            </defs>
                            {/* Ana Panel */}
                            <rect x="20" y="15" width="40" height="34" fill="url(#tesisatGrad)" rx="3" stroke="#6b7280" strokeWidth="2" />
                            {/* İç Bölümler */}
                            <rect x="25" y="20" width="12" height="8" fill="#374151" rx="1" />
                            <rect x="43" y="20" width="12" height="8" fill="#374151" rx="1" />
                            <rect x="25" y="33" width="12" height="8" fill="#374151" rx="1" />
                            <rect x="43" y="33" width="12" height="8" fill="#374151" rx="1" />
                            {/* Etiket */}
                            <rect x="30" y="12" width="20" height="4" fill="#6b7280" rx="1" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                          İç Tesisat Çözümleri
                        </h3>
                        <p className="text-xs text-gray-500">
                          İç mekan elektrik sistemleri
                        </p>
                      </Link>

                      {/* Trolley Busbar Sistemleri */}
                      <Link href="/products?category=trolley-busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          {/* Trolley İkonu */}
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <defs>
                              <linearGradient id="trolleyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#e5e7eb" />
                                <stop offset="100%" stopColor="#9ca3af" />
                              </linearGradient>
                            </defs>
                            {/* Ana Ray */}
                            <rect x="15" y="25" width="50" height="8" fill="url(#trolleyGrad)" rx="4" />
                            {/* Trolley Gövdesi */}
                            <rect x="30" y="18" width="20" height="12" fill="#6b7280" rx="2" />
                            {/* Tekerlekler */}
                            <circle cx="25" cy="42" r="6" fill="#374151" />
                            <circle cx="55" cy="42" r="6" fill="#374151" />
                            {/* Tekerlek İçi */}
                            <circle cx="25" cy="42" r="3" fill="#9ca3af" />
                            <circle cx="55" cy="42" r="3" fill="#9ca3af" />
                            {/* Bağlantı Çubukları */}
                            <rect x="23" y="33" width="4" height="6" fill="#6b7280" />
                            <rect x="53" y="33" width="4" height="6" fill="#6b7280" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                          Trolley Busbar Sistemleri
                        </h3>
                        <p className="text-xs text-gray-500">
                          Mobil güç dağıtım çözümleri
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </MaxWidthWrapper>
            </div>

        {/* Genel Bilgi */}
        <MaxWidthWrapper>
          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Sol taraf - Metin İçeriği */}
              <div>
                <div className="mb-6">
                  <span className="text-red-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                    Kablo Kanalı Genel Bilgi
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    IPOS kablo kanalları ve merdivenleri; kabloları dış etkenlerden koruyan yüksek dayanımlı kablo koruması sağlar. 
                    IPOS kablo kanalları; otomatik üretim hatlarında "Roll Forming" metoduyla seri olarak imal edilmektedir. 
                    Standart kanal boyu 3m'dir. Talep edilmesi durumunda 6m üretilebilir.
                  </p>
                  <p>
                    Kablo kanalı; güç kabloları, iletişim kabloları ve tellerini destekler, korur. Kablo ağının genişletilmesine, 
                    düzenli hale getirilmesine ve yeniden yapılandırmasına yardımcı olur.
                  </p>
                </div>
              </div>

              {/* Sağ taraf - Ürün Görseli */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {/* Kablo Kanalı İllüstrasyonu */}
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    {/* Ana Kablo Kanalı */}
                    <div className="relative transform rotate-12">
                      {/* Kablo Kanalı Gövdesi */}
                      <div className="w-80 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg shadow-lg relative">
                        {/* Üst Kenar */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-t-lg"></div>
                        {/* Alt Kenar */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-b-lg"></div>
                        
                        {/* Delikler/Ventilasyon */}
                        <div className="absolute inset-4 flex items-center justify-center">
                          <div className="grid grid-cols-12 gap-2 w-full">
                            {Array.from({length: 36}).map((_, i) => (
                              <div key={i} className="w-2 h-2 bg-gray-500 rounded-full opacity-60"></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Montaj Delikleri */}
                        <div className="absolute top-2 left-4 w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="absolute top-2 right-4 w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="absolute bottom-2 left-4 w-3 h-3 bg-gray-600 rounded-full"></div>
                        <div className="absolute bottom-2 right-4 w-3 h-3 bg-gray-600 rounded-full"></div>
                      </div>
                      
                      {/* Yan Profil Gösterimi */}
                      <div className="absolute -right-6 top-0 w-6 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-r-lg shadow-md">
                        <div className="absolute top-2 right-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="absolute bottom-2 right-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Arka Plan Kablo Kanalları */}
                    <div className="absolute top-12 left-12 transform rotate-6 opacity-40">
                      <div className="w-60 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
                    </div>
                    <div className="absolute bottom-16 right-8 transform -rotate-3 opacity-30">
                      <div className="w-48 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kablo Kanalı Çeşitleri - Mobil Uyumlu Tasarım */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <span className="text-red-600 font-medium text-sm uppercase tracking-wide">Ürünler</span>
                <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                  Kablo Kanalı Çeşitleri
                </h2>
              </div>

              {/* Desktop Carousel */}
              <div className="hidden lg:block relative">
                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>

                {/* Desktop Products Carousel */}
                <div className="overflow-hidden mx-16">
                  <div 
                    className="flex space-x-6 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`
                    }}
                  >
                    {products.map((product: any, index: number) => (
                      <div key={product.id} className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                        {/* Product Image */}
                        <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            // Placeholder ürün görselleri
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              {index === 0 && (
                                // E-Line KCA AL Serisi: Alüminyum Kablo Merdiveni
                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                  <div className="relative">
                                    <div className="w-48 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded shadow-lg">
                                      {/* Alüminyum merdiven yapısı */}
                                      <div className="flex justify-between items-center h-full px-2">
                                        {Array.from({length: 8}).map((_, i) => (
                                          <div key={i} className="w-1 h-12 bg-gray-600 rounded"></div>
                                        ))}
                                      </div>
                                      {/* Üst ve alt kenarlar - alüminyum görünümü */}
                                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-t"></div>
                                      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-b"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {index === 1 && (
                                // Aksesuar Ürünleri: Kablo taşıma sistemleri ve taşıyıcı destek
                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                  <div className="relative flex items-center space-x-4">
                                    {/* Çeşitli aksesuar parçaları */}
                                    <div className="w-4 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded"></div>
                                    <div className="w-6 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded"></div>
                                    <div className="w-8 h-16 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg"></div>
                                    <div className="w-4 h-10 bg-gradient-to-b from-gray-400 to-gray-600 rounded"></div>
                                    <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-500 rounded-full"></div>
                                  </div>
                                </div>
                              )}
                              {index === 2 && (
                                // E-Line KM: Sıcak Daldırma Kablo Merdivenleri
                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                  <div className="relative">
                                    <div className="w-48 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded shadow-lg">
                                      <div className="flex justify-between items-center h-full px-2">
                                        {Array.from({length: 8}).map((_, i) => (
                                          <div key={i} className="w-1 h-12 bg-gray-700 rounded"></div>
                                        ))}
                                      </div>
                                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-t"></div>
                                      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-b"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {index === 3 && (
                                // E-LINE CT: Sıcak Daldırma Galvanizli Kablo Kanalları
                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                  <div className="relative">
                                    <div className="w-56 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg shadow-lg border-2 border-gray-700">
                                      <div className="grid grid-cols-14 gap-1 p-2 h-full">
                                        {Array.from({length: 42}).map((_, i) => (
                                          <div key={i} className="w-1.5 h-1.5 bg-gray-700 rounded-full opacity-60"></div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {index === 4 && (
                                // E-Line TLS Serisi: Paslanmaz Çelik veya Elektro Galvaniz Tel Kablo Kanalları
                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                  <div className="relative">
                                    <div className="w-48 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
                                    <div className="w-40 h-3 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full mt-2 mx-auto shadow-md"></div>
                                    <div className="w-32 h-2 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full mt-2 mx-auto shadow-sm"></div>
                                  </div>
                                </div>
                              )}
                              {index >= 5 && (
                                // Diğer ürünler için genel görsel
                                <div className="text-gray-400">
                                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Product Content */}
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {product.description || `${product.name} serisi ürünlerimiz hakkında detaylı bilgi almak için ürünü görüntüleyin.`}
                          </p>
                          <div className="flex items-center text-red-600 text-sm font-medium group-hover:text-red-700 transition-colors">
                            <span>Ürünü Görüntüle</span>
                            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Dot Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({length: totalSlides}).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Grid Layout */}
              <div className="lg:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
                  {products.map((product: any, index: number) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                      {/* Product Image */}
                      <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          // Placeholder ürün görselleri
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            {index === 0 && (
                              // E-Line KCA AL Serisi: Alüminyum Kablo Merdiveni
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-40 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded shadow-lg">
                                    {/* Alüminyum merdiven yapısı */}
                                    <div className="flex justify-between items-center h-full px-2">
                                      {Array.from({length: 8}).map((_, i) => (
                                        <div key={i} className="w-1 h-8 bg-gray-600 rounded"></div>
                                      ))}
                                    </div>
                                    {/* Üst ve alt kenarlar - alüminyum görünümü */}
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-t"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-b"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 1 && (
                              // Aksesuar Ürünleri: Kablo taşıma sistemleri ve taşıyıcı destek
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative flex items-center space-x-3">
                                  {/* Çeşitli aksesuar parçaları */}
                                  <div className="w-3 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded"></div>
                                  <div className="w-4 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded"></div>
                                  <div className="w-6 h-10 bg-gradient-to-b from-gray-500 to-gray-700 rounded-lg"></div>
                                  <div className="w-3 h-7 bg-gradient-to-b from-gray-400 to-gray-600 rounded"></div>
                                  <div className="w-5 h-5 bg-gradient-to-br from-red-400 to-red-500 rounded-full"></div>
                                </div>
                              </div>
                            )}
                            {index === 2 && (
                              // E-Line KM: Sıcak Daldırma Kablo Merdivenleri
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-40 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded shadow-lg">
                                    <div className="flex justify-between items-center h-full px-2">
                                      {Array.from({length: 6}).map((_, i) => (
                                        <div key={i} className="w-1 h-8 bg-gray-700 rounded"></div>
                                      ))}
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-t"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-b"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 3 && (
                              // E-LINE CT: Sıcak Daldırma Galvanizli Kablo Kanalları
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-48 h-14 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg shadow-lg border-2 border-gray-700">
                                    <div className="grid grid-cols-12 gap-1 p-2 h-full">
                                      {Array.from({length: 36}).map((_, i) => (
                                        <div key={i} className="w-1 h-1 bg-gray-700 rounded-full opacity-60"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 4 && (
                              // E-Line TLS Serisi: Paslanmaz Çelik veya Elektro Galvaniz Tel Kablo Kanalları
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-40 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
                                  <div className="w-32 h-2 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full mt-2 mx-auto shadow-md"></div>
                                  <div className="w-24 h-1 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full mt-2 mx-auto shadow-sm"></div>
                                </div>
                              </div>
                            )}
                            {index === 5 && (
                              // E-Line KCA-GRP CTA-GRP Serisi: Fiberglas Takviyeli Kablo Taşıma Sistemleri
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-40 h-12 bg-gradient-to-r from-amber-300 to-amber-500 rounded shadow-lg">
                                    {/* Fiberglas merdiven yapısı */}
                                    <div className="flex justify-between items-center h-full px-2">
                                      {Array.from({length: 7}).map((_, i) => (
                                        <div key={i} className="w-1 h-8 bg-amber-700 rounded"></div>
                                      ))}
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-b"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 6 && (
                              // E-Line KCA OG Serisi: Ekstra Ağır Hizmet Tipi Kablo Merdiveni
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-40 h-14 bg-gradient-to-r from-gray-500 to-gray-700 rounded shadow-lg border-2 border-gray-800">
                                    {/* Ekstra ağır hizmet merdiveni */}
                                    <div className="flex justify-between items-center h-full px-2">
                                      {Array.from({length: 6}).map((_, i) => (
                                        <div key={i} className="w-2 h-10 bg-gray-800 rounded"></div>
                                      ))}
                                    </div>
                                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-t"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-b"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 7 && (
                              // E-Line A-A: Kablo Taşıma Askı Sistemleri ve Aksesuarları
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="flex space-x-2">
                                    <div className="w-4 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded transform rotate-12 shadow-lg"></div>
                                    <div className="w-4 h-20 bg-gradient-to-b from-gray-400 to-gray-600 rounded transform -rotate-6 shadow-lg"></div>
                                    <div className="w-4 h-18 bg-gradient-to-b from-gray-400 to-gray-600 rounded transform rotate-3 shadow-lg"></div>
                                    <div className="w-4 h-24 bg-gradient-to-b from-gray-400 to-gray-600 rounded transform -rotate-12 shadow-lg"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 8 && (
                              // E-Line Binrak: Taşıyıcı Destek Sistemleri (G Profil)
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-32 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
                                  <div className="w-28 h-2 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full mt-1 mx-auto shadow-md"></div>
                                </div>
                              </div>
                            )}
                            {index === 9 && (
                              // E-LINE UK: Pregalvaniz Kablo Kanalları
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-44 h-12 bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg shadow-lg border border-gray-600">
                                    <div className="grid grid-cols-10 gap-1 p-2 h-full">
                                      {Array.from({length: 30}).map((_, i) => (
                                        <div key={i} className="w-1 h-1 bg-gray-600 rounded-full opacity-70"></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index === 10 && (
                              // E-LINE TKS: Pregalvaniz / Sıcak Daldırma Trunking Sistemleri
                              <div className="relative w-full h-full flex items-center justify-center p-6">
                                <div className="relative">
                                  <div className="w-44 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg shadow-lg">
                                    <div className="w-full h-3 bg-gradient-to-r from-gray-300 to-gray-500 rounded-t-lg"></div>
                                    <div className="flex justify-between items-center px-3 py-2">
                                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {index >= 11 && (
                              // Diğer ürünler için genel görsel
                              <div className="text-gray-400">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Product Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                          {product.description || `${product.name} serisi ürünlerimiz hakkında detaylı bilgi almak için ürünü görüntüleyin.`}
                        </p>
                        <div className="flex items-center text-red-600 text-sm font-medium group-hover:text-red-700 transition-colors">
                          <span>Ürünü Görüntüle</span>
                          <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Kaplama Türlerine Göre Bölüm */}
            <div className="mb-16">
              <div className="mb-8">
                <span className="text-red-600 font-medium text-sm uppercase tracking-wide">Kablo Kanalı Türleri</span>
                <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                  Kaplama Türüne Göre Kablo Kanalı Çeşitleri
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                {/* Sol taraf - Görsel */}
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Galvanizli Kablo Kanalı"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Sağ taraf - Açıklama */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-red-600 mb-4">Galvanizli Kablo Kanalı</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Sac metal kablo kanalı, Çinko (Zn) ile kaplanır ise galvanizli kablo kanalı/kablo tavası olarak adlandırılır. Sac malzemelerde kullanılan demir yapısı gereği oksijenle etkileşime girmeye meyillidir. Bu eylem sonucunda paslanma dediğimiz malzeme yüzeyinde bakır renginde kahverengimsi bir yüzey hasarı oluşmaya başlar. Zamanla bu pas, sac malzemenin yapısını bozarak kolayca dağılmasına sebep olur.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Bu paslanmayı önlemek için yüzeyinin oksijenle temasını engelleyecek bir malzeme ile kaplanması gerekir. Endüstride ekonomik özellikleri itibarı ile en çok tercih edilen kaplayıcı madde çinko (Zn) dur. Çinko ile kaplama olayına galvanizleme denmektedir.
                    </p>
                    <div className="mb-6">
                      <p className="font-medium text-gray-900 mb-3 italic">
                        Galvaniz yöntem ve kaplama kalınlıklarına göre üç farklı yöntem vardır:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Pregalvaniz Kaplama
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Sıcak Daldırma Kaplama
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Elektro Galvaniz Kaplama
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Bölümü */}
              <div className="space-y-4">
                {/* Pregalvaniz Kablo Kanalı */}
                <div className="border border-gray-200 rounded-lg">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-gray-900">Pregalvaniz Kablo Kanalı Nedir?</h3>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-xl">+</span>
                    </div>
                  </button>
                </div>

                {/* Sıcak Daldırma Kablo Kanalı */}
                <div className="border border-gray-200 rounded-lg">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-gray-900">Sıcak Daldırma Kablo Kanalı Nedir?</h3>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-xl">+</span>
                    </div>
                  </button>
                </div>

                {/* Elektro Galvaniz Kablo Kanalı */}
                <div className="border border-gray-200 rounded-lg">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-medium text-gray-900">Elektro Galvaniz Kablo Kanalı Nedir?</h3>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-xl">+</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Malzeme Cinsine Göre Kablo Kanalı Çeşitleri */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Sol taraf - İçerik */}
                <div>
                  <div className="mb-8">
                    <span className="text-red-600 font-medium text-sm uppercase tracking-wide">Kablo Kanalı Türleri</span>
                    <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                      Malzeme Cinsine Göre Kablo Kanalı Çeşitleri
                    </h2>
                  </div>

                  {/* FAQ Bölümü */}
                  <div className="space-y-4">
                    {/* Paslanmaz Kablo Kanalı - Açık */}
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                        <h3 className="text-lg font-medium text-red-600">Paslanmaz Kablo Kanalı Nedir?</h3>
                        <div className="w-8 h-8 rounded-full border-2 border-red-600 flex items-center justify-center">
                          <span className="text-red-600 text-xl">−</span>
                        </div>
                      </button>
                      <div className="px-6 pb-6">
                        <div className="pt-4 space-y-4 text-gray-700 leading-relaxed">
                          <p>
                            Paslanmaz kablo kanalı, 316L veya 304 sınıfı yüksek kalite paslanmaz çelik malzemelerden üretilmektedir. 316L 
                            kalite paslanmaz çelik özellikle deniz ortamı ve endüstriyel ortamlarda genellikle tercih edilir. 316L kalite 
                            paslanmaz çelik molibdenum içerikli bir östenitik sınıfı paslanmaz çelik kalitesi olup yüksek antikorozif ve 
                            mekanik özelliklere sahiptir. Özellikle kaynak işlerine ve şekillendirmeye yatkındır.
                          </p>
                          <p>
                            Deniz ortamı, petrol ve kimyasal tesislerde kullanım için uygundur. Yine yüksek kalite bir paslanmaz çelik çeşidi 
                            olan AISI 304 kalite paslanmaz çelikte cephe uygulamaları, endüstriyel tesisler ve benzeri ortamlarda kullanım 
                            için uygundur. AISI 304 (1.4301) kalite paslanmaz çelik yüksek anti korozif özelliğinden dolayı özellikle 
                            fabrikalarda, cephelerde ve benzer korozyon içeren ortamlarda kullanılmaktadır. Gerekmedigi durumlarda 
                            paslanmaz çelik yüzey üzerine ekstra kaplamaya ihtiyaç duyulmaz. AISI 304 ve 316L kalite paslanmaz çelikler 
                            aşırı korozif ortamlar için ideal malzemedir.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Alüminyum Kablo Kanalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-gray-900">Alüminyum Kablo Kanalı Nedir?</h3>
                        <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 text-xl">+</span>
                        </div>
                      </button>
                    </div>

                    {/* Fiber Glass Kablo Kanalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-gray-900">Fiber Glass Kablo Kanalı Nedir?</h3>
                        <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 text-xl">+</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sağ taraf - Görsel */}
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Malzeme Cinsine Göre Kablo Kanalı Çeşitleri"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tasarım Şekline Göre Kablo Kanalları */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Sol taraf - Görsel */}
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Tasarım Şekline Göre Kablo Kanalları"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Sağ taraf - İçerik */}
                <div>
                  <div className="mb-8">
                    <span className="text-red-600 font-medium text-sm uppercase tracking-wide">Kablo Kanalı Türleri</span>
                    <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                      Tasarım Şekline Göre Kablo Kanalları
                    </h2>
                  </div>

                  {/* FAQ Bölümü */}
                  <div className="space-y-4">
                    {/* Kenar Bükümlü Kablo Kanalı - Açık */}
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                        <h3 className="text-lg font-medium text-red-600">Kenar Bükümlü Kablo Kanalı Nedir?</h3>
                        <div className="w-8 h-8 rounded-full border-2 border-red-600 flex items-center justify-center">
                          <span className="text-red-600 text-xl">−</span>
                        </div>
                      </button>
                      <div className="px-6 pb-6">
                        <div className="pt-4 text-gray-700 leading-relaxed">
                          <p>
                            Kablo kanallarının üretimi aşamasında kenar kısımlarına büküm verilmesi sonucu oluşan biçimden dolayı verilen 
                            isimdir. Kablo tavası kalınlıkları ince olduğundan dolayı kenar kısımları kabloları kesmeye son derece müsait 
                            olurlar. Bunu engellemek için kavis verilmiş biçim kullanılması çok önemlidir. Ağır hizmet sınıfında bu tip kanallar 
                            kullanılır.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Kenar Bükümlü Olmayan Kablo Kanalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <h3 className="text-lg font-medium text-gray-900">Kenar Bükümlü Olmayan Kablo Kanalı Nedir?</h3>
                        <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 text-xl">+</span>
                        </div>
                      </button>
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

  // Busbar Sistemleri kategorisi için özel tasarım
  if (category === 'busbar-sistemleri') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b">
          <MaxWidthWrapper>
            <div className="py-4">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#1a3056]">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/products" className="hover:text-[#1a3056]">Ürünler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-[#1a3056] font-medium">Busbar Sistemleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  Busbar Sistemleri
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  IPOS Busbar sistemleri; güç dağıtımında yüksek akım taşıma kapasitesi ile endüstriyel tesislerde 
                  güvenli ve verimli elektrik dağıtımı sağlar. Bakır ve alüminyum busbar çözümlerimiz ile 
                  enerji kayıplarını minimize ederiz.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Sade Horizontal Tasarım */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Busbar Sistemleri - Aktif */}
                  <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="busbarGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                          </linearGradient>
                        </defs>
                        <rect x="10" y="20" width="60" height="24" fill="url(#busbarGradActive)" rx="2" />
                        <rect x="10" y="20" width="60" height="4" fill="#2563eb" rx="2" />
                        <rect x="12" y="42" width="60" height="4" fill="#1e40af" opacity="0.3" rx="2" />
                        <circle cx="20" cy="32" r="3" fill="#1e3a8a" />
                        <circle cx="35" cy="32" r="3" fill="#1e3a8a" />
                        <circle cx="50" cy="32" r="3" fill="#1e3a8a" />
                        <circle cx="65" cy="32" r="3" fill="#1e3a8a" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-blue-600 text-sm mb-1 group-hover:text-blue-700 transition-colors">
                      Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-blue-500">
                      Güç dağıtım çözümleri
                    </p>
                  </Link>

                  {/* Askı Sistemleri */}
                  <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="askiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="6" fill="url(#askiGrad)" rx="3" />
                        <rect x="37" y="21" width="6" height="25" fill="url(#askiGrad)" rx="3" />
                        <circle cx="40" cy="18" r="4" fill="none" stroke="#6b7280" strokeWidth="2" />
                        <rect x="30" y="43" width="20" height="4" fill="#6b7280" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Askı Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Taşıyıcı destek çözümleri
                    </p>
                  </Link>

                  {/* Kablo Kanalları - Aktif */}
                  <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="kanalGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#dc2626" />
                            <stop offset="100%" stopColor="#b91c1c" />
                          </linearGradient>
                        </defs>
                        <rect x="8" y="22" width="64" height="20" fill="url(#kanalGradActive)" rx="2" />
                        <rect x="8" y="22" width="64" height="3" fill="#ef4444" rx="2" />
                        <rect x="10" y="40" width="64" height="3" fill="#991b1b" opacity="0.4" rx="2" />
                        <circle cx="18" cy="32" r="2" fill="#7f1d1d" opacity="0.8" />
                        <circle cx="28" cy="32" r="2" fill="#7f1d1d" opacity="0.8" />
                        <circle cx="38" cy="32" r="2" fill="#7f1d1d" opacity="0.8" />
                        <circle cx="48" cy="32" r="2" fill="#7f1d1d" opacity="0.8" />
                        <circle cx="58" cy="32" r="2" fill="#7f1d1d" opacity="0.8" />
                        <circle cx="68" cy="32" r="2" fill="#7f1d1d" opacity="0.8" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-red-600 text-sm mb-1 group-hover:text-red-700 transition-colors">
                      Kablo Kanalları
                    </h3>
                    <p className="text-xs text-red-500">
                      Kablo koruma sistemleri
                    </p>
                  </Link>

                  {/* İç Tesisat Çözümleri */}
                  <Link href="/products?category=ic-tesisat-cozumleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="tesisatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="34" fill="url(#tesisatGrad)" rx="3" stroke="#6b7280" strokeWidth="2" />
                        <rect x="25" y="20" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="43" y="20" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="25" y="33" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="43" y="33" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="30" y="12" width="20" height="4" fill="#6b7280" rx="1" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      İç Tesisat Çözümleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      İç mekan elektrik sistemleri
                    </p>
                  </Link>

                  {/* Trolley Busbar Sistemleri */}
                  <Link href="/products?category=trolley-busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="trolleyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="15" y="25" width="50" height="8" fill="url(#trolleyGrad)" rx="4" />
                        <rect x="30" y="18" width="20" height="12" fill="#6b7280" rx="2" />
                        <circle cx="25" cy="42" r="6" fill="#374151" />
                        <circle cx="55" cy="42" r="6" fill="#374151" />
                        <circle cx="25" cy="42" r="3" fill="#9ca3af" />
                        <circle cx="55" cy="42" r="3" fill="#9ca3af" />
                        <rect x="23" y="33" width="4" height="6" fill="#6b7280" />
                        <rect x="53" y="33" width="4" height="6" fill="#6b7280" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Trolley Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Mobil güç dağıtım çözümleri
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper>
          <div className="py-16">
            {/* Genel Bilgi */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="mb-6">
                  <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                    Busbar Sistemleri Genel Bilgi
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    IPOS Busbar sistemleri; yüksek akım taşıma kapasitesi, düşük empedans ve minimum enerji kaybı 
                    ile güç dağıtımında üstün performans sağlar. Bakır ve alüminyum busbar çözümlerimiz, 
                    endüstriyel tesislerde güvenli elektrik dağıtımı için tasarlanmıştır.
                  </p>
                  <p>
                    Busbar sistemleri; kompakt tasarımı, kolay montajı ve bakım kolaylığı ile elektrik panolarında, 
                    dağıtım merkezlerinde ve endüstriyel tesislerde tercih edilir.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="relative transform rotate-6">
                      <div className="w-80 h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-xl relative">
                        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-300 to-blue-500 rounded-b-lg"></div>
                        <div className="flex justify-between items-center px-8 py-4 h-full">
                          <div className="w-4 h-16 bg-blue-800 rounded"></div>
                          <div className="w-4 h-16 bg-blue-800 rounded"></div>
                          <div className="w-4 h-16 bg-blue-800 rounded"></div>
                          <div className="w-4 h-16 bg-blue-800 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ürün Çeşitleri Carousel */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">Ürünler</span>
                <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                  Busbar Çeşitleri
                </h2>
              </div>

              <div className="relative">
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>

                <div className="overflow-hidden mx-16">
                  <div 
                    className="flex space-x-6 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`
                    }}
                  >
                    {products.map((product: any, index: number) => (
                      <div key={product.id} className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <div className="relative w-full h-full flex items-center justify-center p-8">
                                <div className="w-48 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
                                  <div className="flex justify-between items-center px-6 py-2 h-full">
                                    <div className="w-3 h-12 bg-blue-800 rounded"></div>
                                    <div className="w-3 h-12 bg-blue-800 rounded"></div>
                                    <div className="w-3 h-12 bg-blue-800 rounded"></div>
                                    <div className="w-3 h-12 bg-blue-800 rounded"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {product.description || `${product.name} serisi ürünlerimiz hakkında detaylı bilgi almak için ürünü görüntüleyin.`}
                          </p>
                          <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                            <span>Ürünü Görüntüle</span>
                            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({length: totalSlides}).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  // Askı Sistemleri kategorisi için özel tasarım
  if (category === 'aski-sistemleri') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <MaxWidthWrapper>
            <div className="py-4">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#1a3056]">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/products" className="hover:text-[#1a3056]">Ürünler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-[#1a3056] font-medium">Askı Sistemleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  Askı Sistemleri
                </h1>
                <p className="text-xl text-green-100 leading-relaxed">
                  IPOS Askı sistemleri; kablo kanalları ve elektrik tesisatının güvenli montajı için 
                  dayanıklı taşıyıcı destek çözümleri sunar. Galvanizli çelik ve paslanmaz çelik 
                  seçenekleri ile uzun ömürlü kullanım sağlar.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Sade Horizontal Tasarım */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Busbar Sistemleri */}
                  <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="busbarGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="10" y="20" width="60" height="24" fill="url(#busbarGrad2)" rx="2" />
                        <rect x="10" y="20" width="60" height="4" fill="#d1d5db" rx="2" />
                        <rect x="12" y="42" width="60" height="4" fill="#6b7280" opacity="0.3" rx="2" />
                        <circle cx="20" cy="32" r="3" fill="#374151" />
                        <circle cx="35" cy="32" r="3" fill="#374151" />
                        <circle cx="50" cy="32" r="3" fill="#374151" />
                        <circle cx="65" cy="32" r="3" fill="#374151" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Güç dağıtım çözümleri
                    </p>
                  </Link>

                  {/* Askı Sistemleri - Aktif */}
                  <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="askiGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="6" fill="url(#askiGradActive)" rx="3" />
                        <rect x="37" y="21" width="6" height="25" fill="url(#askiGradActive)" rx="3" />
                        <circle cx="40" cy="18" r="4" fill="none" stroke="#047857" strokeWidth="2" />
                        <rect x="30" y="43" width="20" height="4" fill="#047857" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-green-600 text-sm mb-1 group-hover:text-green-700 transition-colors">
                      Askı Sistemleri
                    </h3>
                    <p className="text-xs text-green-500">
                      Taşıyıcı destek çözümleri
                    </p>
                  </Link>

                  {/* Kablo Kanalları */}
                  <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="kanalGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="8" y="22" width="64" height="20" fill="url(#kanalGrad2)" rx="2" />
                        <rect x="8" y="22" width="64" height="3" fill="#d1d5db" rx="2" />
                        <rect x="10" y="40" width="64" height="3" fill="#6b7280" opacity="0.4" rx="2" />
                        <circle cx="18" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="28" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="38" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="48" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="58" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="68" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Kablo Kanalları
                    </h3>
                    <p className="text-xs text-gray-500">
                      Kablo koruma sistemleri
                    </p>
                  </Link>

                  {/* İç Tesisat Çözümleri */}
                  <Link href="/products?category=ic-tesisat-cozumleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="tesisatGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="34" fill="url(#tesisatGrad2)" rx="3" stroke="#6b7280" strokeWidth="2" />
                        <rect x="25" y="20" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="43" y="20" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="25" y="33" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="43" y="33" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="30" y="12" width="20" height="4" fill="#6b7280" rx="1" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      İç Tesisat Çözümleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      İç mekan elektrik sistemleri
                    </p>
                  </Link>

                  {/* Trolley Busbar Sistemleri */}
                  <Link href="/products?category=trolley-busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="trolleyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="15" y="25" width="50" height="8" fill="url(#trolleyGrad2)" rx="4" />
                        <rect x="30" y="18" width="20" height="12" fill="#6b7280" rx="2" />
                        <circle cx="25" cy="42" r="6" fill="#374151" />
                        <circle cx="55" cy="42" r="6" fill="#374151" />
                        <circle cx="25" cy="42" r="3" fill="#9ca3af" />
                        <circle cx="55" cy="42" r="3" fill="#9ca3af" />
                        <rect x="23" y="33" width="4" height="6" fill="#6b7280" />
                        <rect x="53" y="33" width="4" height="6" fill="#6b7280" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Trolley Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Mobil güç dağıtım çözümleri
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper>
          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="mb-6">
                  <span className="text-green-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                    Askı Sistemleri Genel Bilgi
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    IPOS Askı sistemleri; kablo kanalları, borular ve elektrik tesisatının tavana, 
                    duvara veya yapısal elemanlara güvenli montajı için tasarlanmış dayanıklı 
                    taşıyıcı destek sistemleridir.
                  </p>
                  <p>
                    Galvanizli çelik ve paslanmaz çelik malzemelerden üretilen askı sistemlerimiz, 
                    korozyon direnci ve yüksek taşıma kapasitesi ile uzun ömürlü kullanım sağlar.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-green-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="relative">
                      <div className="w-48 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg"></div>
                      <div className="w-6 h-24 bg-gradient-to-b from-green-500 to-green-600 rounded-lg mx-auto mt-2 shadow-lg"></div>
                      <div className="w-8 h-8 bg-green-700 rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2 shadow-md"></div>
                      <div className="w-32 h-4 bg-green-600 rounded absolute -bottom-6 left-1/2 transform -translate-x-1/2 shadow-sm"></div>
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

  // İç Tesisat Çözümleri kategorisi için özel tasarım
  if (category === 'ic-tesisat-cozumleri') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <MaxWidthWrapper>
            <div className="py-4">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#1a3056]">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/products" className="hover:text-[#1a3056]">Ürünler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-[#1a3056] font-medium">İç Tesisat Çözümleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  İç Tesisat Çözümleri
                </h1>
                <p className="text-xl text-purple-100 leading-relaxed">
                  IPOS İç tesisat çözümleri; bina içi elektrik dağıtımında güvenli ve estetik 
                  çözümler sunar. Kablo kanalları, priz kutuları ve elektrik panoları ile 
                  modern iç mekan elektrik sistemleri oluşturur.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Sade Horizontal Tasarım */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Busbar Sistemleri */}
                  <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="busbarGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="10" y="20" width="60" height="24" fill="url(#busbarGrad3)" rx="2" />
                        <rect x="10" y="20" width="60" height="4" fill="#d1d5db" rx="2" />
                        <rect x="12" y="42" width="60" height="4" fill="#6b7280" opacity="0.3" rx="2" />
                        <circle cx="20" cy="32" r="3" fill="#374151" />
                        <circle cx="35" cy="32" r="3" fill="#374151" />
                        <circle cx="50" cy="32" r="3" fill="#374151" />
                        <circle cx="65" cy="32" r="3" fill="#374151" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Güç dağıtım çözümleri
                    </p>
                  </Link>

                  {/* Askı Sistemleri */}
                  <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="askiGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="6" fill="url(#askiGrad3)" rx="3" />
                        <rect x="37" y="21" width="6" height="25" fill="url(#askiGrad3)" rx="3" />
                        <circle cx="40" cy="18" r="4" fill="none" stroke="#6b7280" strokeWidth="2" />
                        <rect x="30" y="43" width="20" height="4" fill="#6b7280" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Askı Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Taşıyıcı destek çözümleri
                    </p>
                  </Link>

                  {/* Kablo Kanalları */}
                  <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="kanalGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="8" y="22" width="64" height="20" fill="url(#kanalGrad3)" rx="2" />
                        <rect x="8" y="22" width="64" height="3" fill="#d1d5db" rx="2" />
                        <rect x="10" y="40" width="64" height="3" fill="#6b7280" opacity="0.4" rx="2" />
                        <circle cx="18" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="28" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="38" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="48" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="58" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="68" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Kablo Kanalları
                    </h3>
                    <p className="text-xs text-gray-500">
                      Kablo koruma sistemleri
                    </p>
                  </Link>

                  {/* İç Tesisat Çözümleri - Aktif */}
                  <Link href="/products?category=ic-tesisat-cozumleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="tesisatGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="34" fill="url(#tesisatGradActive)" rx="3" stroke="#6d28d9" strokeWidth="2" />
                        <rect x="25" y="20" width="12" height="8" fill="#581c87" rx="1" />
                        <rect x="43" y="20" width="12" height="8" fill="#581c87" rx="1" />
                        <rect x="25" y="33" width="12" height="8" fill="#581c87" rx="1" />
                        <rect x="43" y="33" width="12" height="8" fill="#581c87" rx="1" />
                        <rect x="30" y="12" width="20" height="4" fill="#6d28d9" rx="1" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-purple-600 text-sm mb-1 group-hover:text-purple-700 transition-colors">
                      İç Tesisat Çözümleri
                    </h3>
                    <p className="text-xs text-purple-500">
                      İç mekan elektrik sistemleri
                    </p>
                  </Link>

                  {/* Trolley Busbar Sistemleri */}
                  <Link href="/products?category=trolley-busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="trolleyGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="15" y="25" width="50" height="8" fill="url(#trolleyGrad3)" rx="4" />
                        <rect x="30" y="18" width="20" height="12" fill="#6b7280" rx="2" />
                        <circle cx="25" cy="42" r="6" fill="#374151" />
                        <circle cx="55" cy="42" r="6" fill="#374151" />
                        <circle cx="25" cy="42" r="3" fill="#9ca3af" />
                        <circle cx="55" cy="42" r="3" fill="#9ca3af" />
                        <rect x="23" y="33" width="4" height="6" fill="#6b7280" />
                        <rect x="53" y="33" width="4" height="6" fill="#6b7280" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Trolley Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Mobil güç dağıtım çözümleri
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper>
          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="mb-6">
                  <span className="text-purple-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                    İç Tesisat Çözümleri Genel Bilgi
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    IPOS İç tesisat çözümleri; ofis binaları, konutlar ve ticari mekanlar için 
                    güvenli, estetik ve fonksiyonel elektrik dağıtım sistemleri sunar.
                  </p>
                  <p>
                    Kablo kanalları, priz kutuları, anahtarlar ve elektrik panoları ile 
                    modern iç mekan elektrik tesisatı ihtiyaçlarını karşılar.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="w-32 h-32 border-4 border-purple-500 rounded-xl shadow-lg bg-white/50">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
                      <div className="w-6 h-6 bg-purple-300 rounded-full absolute top-2 right-2"></div>
                      <div className="w-4 h-4 bg-purple-300 rounded-full absolute bottom-2 left-2"></div>
                      <div className="w-24 h-2 bg-purple-600 rounded absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"></div>
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

  // Trolley Busbar Sistemleri kategorisi için özel tasarım
  if (category === 'trolley-busbar-sistemleri') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <MaxWidthWrapper>
            <div className="py-4">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#1a3056]">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/products" className="hover:text-[#1a3056]">Ürünler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-[#1a3056] font-medium">Trolley Busbar Sistemleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  Trolley Busbar Sistemleri
                </h1>
                <p className="text-xl text-orange-100 leading-relaxed">
                  IPOS Trolley Busbar sistemleri; mobil güç dağıtımında esnek çözümler sunar. 
                  Vinç sistemleri, hareketli makineler ve endüstriyel uygulamalar için 
                  güvenli ve kesintisiz güç aktarımı sağlar.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Sade Horizontal Tasarım */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Busbar Sistemleri */}
                  <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="busbarGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="10" y="20" width="60" height="24" fill="url(#busbarGrad4)" rx="2" />
                        <rect x="10" y="20" width="60" height="4" fill="#d1d5db" rx="2" />
                        <rect x="12" y="42" width="60" height="4" fill="#6b7280" opacity="0.3" rx="2" />
                        <circle cx="20" cy="32" r="3" fill="#374151" />
                        <circle cx="35" cy="32" r="3" fill="#374151" />
                        <circle cx="50" cy="32" r="3" fill="#374151" />
                        <circle cx="65" cy="32" r="3" fill="#374151" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Güç dağıtım çözümleri
                    </p>
                  </Link>

                  {/* Askı Sistemleri */}
                  <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="askiGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="6" fill="url(#askiGrad4)" rx="3" />
                        <rect x="37" y="21" width="6" height="25" fill="url(#askiGrad4)" rx="3" />
                        <circle cx="40" cy="18" r="4" fill="none" stroke="#6b7280" strokeWidth="2" />
                        <rect x="30" y="43" width="20" height="4" fill="#6b7280" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Askı Sistemleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      Taşıyıcı destek çözümleri
                    </p>
                  </Link>

                  {/* Kablo Kanalları */}
                  <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="kanalGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="8" y="22" width="64" height="20" fill="url(#kanalGrad4)" rx="2" />
                        <rect x="8" y="22" width="64" height="3" fill="#d1d5db" rx="2" />
                        <rect x="10" y="40" width="64" height="3" fill="#6b7280" opacity="0.4" rx="2" />
                        <circle cx="18" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="28" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="38" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="48" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="58" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                        <circle cx="68" cy="32" r="2" fill="#6b7280" opacity="0.6" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      Kablo Kanalları
                    </h3>
                    <p className="text-xs text-gray-500">
                      Kablo koruma sistemleri
                    </p>
                  </Link>

                  {/* İç Tesisat Çözümleri */}
                  <Link href="/products?category=ic-tesisat-cozumleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="tesisatGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="20" y="15" width="40" height="34" fill="url(#tesisatGrad4)" rx="3" stroke="#6b7280" strokeWidth="2" />
                        <rect x="25" y="20" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="43" y="20" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="25" y="33" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="43" y="33" width="12" height="8" fill="#374151" rx="1" />
                        <rect x="30" y="12" width="20" height="4" fill="#6b7280" rx="1" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">
                      İç Tesisat Çözümleri
                    </h3>
                    <p className="text-xs text-gray-500">
                      İç mekan elektrik sistemleri
                    </p>
                  </Link>

                  {/* Trolley Busbar Sistemleri - Aktif */}
                  <Link href="/products?category=trolley-busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="trolleyGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ea580c" />
                          </linearGradient>
                        </defs>
                        <rect x="15" y="25" width="50" height="8" fill="url(#trolleyGradActive)" rx="4" />
                        <rect x="30" y="18" width="20" height="12" fill="#c2410c" rx="2" />
                        <circle cx="25" cy="42" r="6" fill="#9a3412" />
                        <circle cx="55" cy="42" r="6" fill="#9a3412" />
                        <circle cx="25" cy="42" r="3" fill="#fed7aa" />
                        <circle cx="55" cy="42" r="3" fill="#fed7aa" />
                        <rect x="23" y="33" width="4" height="6" fill="#c2410c" />
                        <rect x="53" y="33" width="4" height="6" fill="#c2410c" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-orange-600 text-sm mb-1 group-hover:text-orange-700 transition-colors">
                      Trolley Busbar Sistemleri
                    </h3>
                    <p className="text-xs text-orange-500">
                      Mobil güç dağıtım çözümleri
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper>
          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="mb-6">
                  <span className="text-orange-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                    Trolley Busbar Sistemleri Genel Bilgi
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    IPOS Trolley Busbar sistemleri; hareketli makineler, vinç sistemleri ve 
                    endüstriyel uygulamalar için mobil güç dağıtımı sağlayan esnek çözümlerdir.
                  </p>
                  <p>
                    Ray sistemi üzerinde hareket eden trolley ile kesintisiz güç aktarımı, 
                    yüksek akım taşıma kapasitesi ve güvenli işletim sunar.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="relative">
                      <div className="w-48 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg"></div>
                      <div className="w-24 h-12 bg-orange-600 rounded mx-auto mt-2 shadow-md"></div>
                      <div className="w-8 h-8 bg-orange-700 rounded-full absolute -bottom-2 left-4 shadow-md"></div>
                      <div className="w-8 h-8 bg-orange-700 rounded-full absolute -bottom-2 right-4 shadow-md"></div>
                      <div className="w-32 h-2 bg-orange-700 rounded absolute top-2 left-1/2 transform -translate-x-1/2 shadow-sm"></div>
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

  // Solar Montaj Sistemleri kategorisi için özel tasarım
  if (category === 'solar-montaj-sistemleri') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <MaxWidthWrapper>
            <div className="py-4">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-[#1a3056]">Ana Sayfa</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/products" className="hover:text-[#1a3056]">Ürünler</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-[#1a3056] font-medium">Solar Montaj Sistemleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  Solar Montaj Sistemleri
                </h1>
                <p className="text-xl text-yellow-100 leading-relaxed">
                  IPOS Solar montaj sistemleri; güneş enerjisi panellerinin güvenli ve verimli montajı için 
                  tasarlanmış dayanıklı ve esnek çözümler sunar. Fotovoltaik paneller için en uygun montaj sistemini seçin.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        <MaxWidthWrapper>
          <div className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="mb-6">
                  <span className="text-yellow-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                    Solar Montaj Sistemleri Genel Bilgi
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    IPOS Solar montaj sistemleri; güneş enerjisi panellerinin çatı, zemin ve özel yapılara 
                    güvenli montajı için tasarlanmış dayanıklı çelik konstrüksiyon sistemleridir.
                  </p>
                  <p>
                    Galvanizli ve paslanmaz çelik seçenekleri ile uzun ömürlü, yüksek taşıma kapasiteli ve 
                    kolay montajlı solar enerji çözümleri sunar.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="relative transform rotate-6">
                      <div className="w-80 h-40 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-xl relative">
                        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-t-lg"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-b-lg"></div>
                        <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-yellow-700 rounded opacity-20"></div>
                        <div className="flex justify-between items-center px-4 py-2 h-full">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-yellow-800 rounded"></div>
                            <div className="w-3 h-3 bg-yellow-800 rounded"></div>
                            <div className="w-3 h-3 bg-yellow-800 rounded"></div>
                            <div className="w-3 h-3 bg-yellow-800 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ürün Çeşitleri Carousel */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <span className="text-yellow-600 font-medium text-sm uppercase tracking-wide">Ürünler</span>
                <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                  Solar Montaj Sistemi Çeşitleri
                </h2>
              </div>

              <div className="relative">
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={currentSlide === totalSlides - 1}
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>

                <div className="overflow-hidden mx-16">
                  <div 
                    className="flex space-x-6 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`
                    }}
                  >
                    {products.map((product: any, index: number) => (
                      <Link key={product.id} href={`/ges-products/${product.id}`}>
                        <div className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                          <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                            {product.mainImageUrl ? (
                              <img
                                src={product.mainImageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                                <div className="relative w-full h-full flex items-center justify-center p-8">
                                  <div className="w-48 h-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
                                    <div className="flex justify-between items-center px-6 py-4 h-full">
                                      <div className="w-2 h-2 bg-yellow-800 rounded"></div>
                                      <div className="w-2 h-2 bg-yellow-800 rounded"></div>
                                      <div className="w-2 h-2 bg-yellow-800 rounded"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                              {product.description1 || `${product.name} serisi ürünlerimiz hakkında detaylı bilgi almak için ürünü görüntüleyin.`}
                            </p>
                            <div className="flex items-center text-yellow-600 text-sm font-medium group-hover:text-yellow-700 transition-colors">
                              <span>Ürünü Görüntüle</span>
                              <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({length: totalSlides}).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  // Diğer kategoriler için mevcut tasarım
  return (
    <MaxWidthWrapper>
      <div className="py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol taraf - Ürün Grupları Menüsü */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold font-neuropol text-gray-900 mb-4">
                Ürün Grupları
              </h2>
              <div className="space-y-2">
                {categories.map((cat: any) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                      cat.slug === category
                        ? 'border-[#1a3056] bg-[#1a3056]/10 text-[#1a3056]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-sm">{cat.name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ taraf - Ana İçerik */}
          <div className="lg:w-3/4">
            {selectedCategory ? (
              <div className="space-y-6">
                {/* Ana Başlık */}
                <h1 className="text-3xl font-bold font-neuropol text-gray-900">
                  {selectedCategory.name}
                </h1>

                {/* Ürünler */}
                {products.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
                      >
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-32 object-contain rounded mb-3"
                          />
                        )}
                        <h3 className="font-medium text-gray-900 text-sm">
                          {product.name}
                        </h3>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Kategori Açıklaması */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold font-neuropol text-gray-900 mb-4">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCategory.description || `${selectedCategory.name} hakkında detaylı bilgiler ve ürün çeşitlerimiz. Kaliteli ve güvenilir çözümlerimizi keşfedin.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold font-neuropol text-gray-900 mb-4">
                  Ürünler
                </h1>
                <p className="text-gray-600 mb-6">
                  Ürün kategorilerimizi keşfetmek için sol menüden bir kategori seçin.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.slice(0, 8).map((cat: any) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
                    >
                      {cat.imageUrl && (
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          className="w-full h-24 object-contain rounded mb-3"
                        />
                      )}
                      <h3 className="font-medium text-gray-900 text-sm">
                        {cat.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductsPage

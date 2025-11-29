'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

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
  const gesCategories = ['solar-montaj-sistemleri', 'ges-arazi', 'ges-cati', 'ges-k-port']
  if (gesCategories.includes(category || '')) {
    const url = category ? `${base}/api/ges-products?category=${encodeURIComponent(category)}` : `${base}/api/ges-products`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  }

  // GES Solar Sistemleri: Arazi/Çatı/K-Port alt kategorilerini birlikte getir
  if (category === 'ges-solar-sistemleri') {
    try {
      const gesSlugs = ['ges-arazi', 'ges-cati', 'ges-k-port']
      const productLists = await Promise.all(
        gesSlugs.map(async (slug) => {
          const url = `${base}/api/ges-products?category=${encodeURIComponent(slug)}`
          const res = await fetch(url, { cache: 'no-store' })
          if (!res.ok) return []
          return res.json()
        })
      )
      const merged = productLists.flat()
      const uniqueById = Array.from(new Map(merged.map((p: any) => [p.id, p])).values())
      return uniqueById
    } catch (_e) {
      return []
    }
  }

  // Kablo Kanal Sistemleri: birden fazla alt kategoriyi birlikte getir
  if (category === 'kablo-kanal-sistemleri') {
    try {
      // İstenen alt kategori isimleri
      const wantedNames = [
        'Kablo Kanalları',
        'Kablo Merdivenleri',
        'Tel Kablo Kanalları',
        'Trunking Kablo Kanalları',
        'Paslanmaz Kablo Kanalları',
        'Alüminyum Kablo Kanalları'
      ]

      // Aktif kategori listesinden slug'ları bul
      const categoriesRes = await fetch(`${base}/api/product-categories`, { cache: 'no-store' })
      if (!categoriesRes.ok) return []
      const allCategories = await categoriesRes.json()
      const targetSlugs: string[] = allCategories
        .filter((c: any) => wantedNames.includes(c.name))
        .map((c: any) => c.slug)

      if (targetSlugs.length === 0) return []

      // Her alt kategori için ürünleri çek ve birleştir
      const productLists = await Promise.all(
        targetSlugs.map(async (slug) => {
          const url = `${base}/api/products?category=${encodeURIComponent(slug)}`
          const res = await fetch(url, { cache: 'no-store' })
          if (!res.ok) return []
          return res.json()
        })
      )

      // Düzleştir ve olası tekrarları kaldır (id bazlı)
      const merged = productLists.flat()
      const uniqueById = Array.from(new Map(merged.map((p: any) => [p.id, p])).values())
      return uniqueById
    } catch (_e) {
      return []
    }
  }
  
  // Topraklama Sistemleri: belirli alt kategorileri birlikte getir
  if (category === 'topraklama-sistemleri') {
    try {
      const wantedNames = [
        'Topraklama Şeritleri',
        'Klemanslar ve Aksesuar'
      ]

      const categoriesRes = await fetch(`${base}/api/product-categories`, { cache: 'no-store' })
      if (!categoriesRes.ok) return []
      const allCategories = await categoriesRes.json()
      const targetSlugs: string[] = allCategories
        .filter((c: any) => wantedNames.includes(c.name))
        .map((c: any) => c.slug)

      if (targetSlugs.length === 0) return []

      const productLists = await Promise.all(
        targetSlugs.map(async (slug) => {
          const url = `${base}/api/products?category=${encodeURIComponent(slug)}`
          const res = await fetch(url, { cache: 'no-store' })
          if (!res.ok) return []
          return res.json()
        })
      )

      const merged = productLists.flat()
      const uniqueById = Array.from(new Map(merged.map((p: any) => [p.id, p])).values())
      return uniqueById
    } catch (_e) {
      return []
    }
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
  const [selectedSurfaceTreatment, setSelectedSurfaceTreatment] = useState<string | null>(null)
  const [accordion, setAccordion] = useState<Record<string, boolean>>({
    malzeme_paslanmaz: true,
    tasarim_kenar_bukumlu: true,
    aski_montaj: true,
    aski_malzeme: false,
    topraklama_baglanti: true,
    topraklama_malzeme: false
  })
  
  const category = parse(searchParams.category)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(category),
          getProductCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
        // Kategori değiştiğinde yüzey işleme seçimini sıfırla
        setSelectedSurfaceTreatment(null)
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
  
  // Yüzey işleme seçeneklerine sahip kategoriler
  const getSurfaceTreatmentOptions = (categoryName: string | undefined): string[] => {
    if (!categoryName) return []
    
    if (categoryName === 'Kablo Kanalları' || categoryName === 'Kablo Merdivenleri' || categoryName === 'Trunking Kablo Kanalları') {
      return ['sıcak daldırma', 'pregalvaniz', 'boyalı']
    } else if (categoryName === 'Tel Kablo Kanalları') {
      return ['elektro', 'sıcak daldırma', 'boyalı']
    }
    return []
  }
  
  // Kategorinin yüzey işleme seçeneklerine sahip olup olmadığını kontrol et
  const hasSurfaceTreatmentOptions = useMemo(() => {
    if (!selectedCategory) return false
    const options = getSurfaceTreatmentOptions(selectedCategory.name)
    // Eğer kategoride yüzey işleme seçenekleri varsa ve ürünlerde surfaceTreatment alanı olan ürünler varsa true döndür
    if (options.length > 0) {
      return products.some((p: any) => p.surfaceTreatment)
    }
    return false
  }, [selectedCategory, products])
  
  // Filtrelenmiş ürünler
  const filteredProducts = useMemo(() => {
    if (!selectedSurfaceTreatment || !hasSurfaceTreatmentOptions) {
      return products
    }
    return products.filter((p: any) => p.surfaceTreatment === selectedSurfaceTreatment)
  }, [products, selectedSurfaceTreatment, hasSurfaceTreatmentOptions])
  
  // Kablo Kanalları için menüde sadece ilgili alt kategorileri göster
  const filteredCategories = useMemo(() => {
    const cableCategorySlugs = [
      'kablo-kanallari',
      'kablo-merdivenleri',
      'tel-kablo-kanallari',
      'trunking-kablo-kanallari',
      'paslanmaz-kablo-kanallari',
      'aluminyum-kablo-kanallari',
    ]
    if (cableCategorySlugs.includes(category || '')) {
      const allowedSlugs = [
        'aluminyum-kablo-kanallari',
        'paslanmaz-kablo-kanallari',
        'trunking-kablo-kanallari',
        'tel-kablo-kanallari',
        'kablo-kanallari',
        'kablo-merdivenleri',
      ]
      return categories.filter((c: any) => allowedSlugs.includes(c.slug))
    }
    if (category === 'aski-urunleri') {
      return categories.filter((c: any) => c.slug === 'aski-urunleri')
    }
    const gesCategorySlugs = ['ges-arazi', 'ges-cati', 'ges-k-port']
    if (gesCategorySlugs.includes(category || '')) {
      const allowedGesSlugs = ['ges-arazi', 'ges-cati', 'ges-k-port']
      return categories.filter((c: any) => allowedGesSlugs.includes(c.slug))
    }
    const groundingCategorySlugs = ['topraklama-seritleri', 'klemanslar-ve-aksesuar']
    if (groundingCategorySlugs.includes(category || '')) {
      const allowedGroundingSlugs = ['topraklama-seritleri', 'klemanslar-ve-aksesuar']
      return categories.filter((c: any) => allowedGroundingSlugs.includes(c.slug))
    }
    return categories
  }, [category, categories])
  
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
                      {/* Busbar Sistemleri (kaldırıldı) */}
                      {/* <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]"> */}
                        
                       
                      {/* </Link> */}

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

                      {/* GES Solar Sistemleri */}
                      <Link href="/products?category=ges-solar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                       <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                           <rect x="18" y="18" width="44" height="26" fill="#f59e0b" rx="4" />
                            <rect x="20" y="22" width="40" height="18" fill="#fcd34d" rx="2" />
                         </svg>

                    </div>
                        <h3 className="font-medium text-yellow-600 text-sm mb-1 group-hover:text-yellow-700 transition-colors">GES Solar Sistemleri</h3>
                       <p className="text-xs text-yellow-600">Arazi / Çatı / K-Port</p>
                      </Link>

                      {/* Topraklama Sistemleri */}
                      <Link href="/products?category=topraklama-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <circle cx="40" cy="32" r="16" fill="#16a34a" opacity="0.15" />
                            <rect x="36" y="18" width="8" height="24" rx="2" fill="#16a34a" />
                            <rect x="39" y="42" width="2" height="6" rx="1" fill="#15803d" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Topraklama Sistemleri</h3>
                        <p className="text-xs text-gray-500">Güvenli topraklama çözümleri</p>
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
                    {products.map((product: any, index: number) => {
                      // Önce images dizisinden ilk resmi, yoksa imageUrl, yoksa default kullan
                      const productImage = (product.images && product.images.length > 0) 
                        ? product.images[0].imageUrl 
                        : (product.imageUrl || '/default-urun-foto/default-urun.png');
                      
                      return (
                      <Link key={product.id} href={`/products/${product.id}`} className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                        {/* Product Image */}
                        <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                          <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
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
                      </Link>
                    )})}
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
                  {products.map((product: any, index: number) => {
                    // Önce images dizisinden ilk resmi, yoksa imageUrl, yoksa default kullan
                    const productImage = (product.images && product.images.length > 0) 
                      ? product.images[0].imageUrl 
                      : (product.imageUrl || '/default-urun-foto/default-urun.png');
                    
                    return (
                    <Link key={product.id} href={`/products/${product.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 block">
                      {/* Product Image */}
                      <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                        <img
                          src={productImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">{product.name}</h3>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                        {product.category?.name && (
                          <p className="text-sm text-gray-500 mt-1">{product.category.name}</p>
                        )}
                      </div>
                    </Link>
                    )
                  })}
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
                  <button
                    onClick={() => setAccordion(a => ({ ...a, faq_pregalvaniz: !a.faq_pregalvaniz }))}
                    className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.faq_pregalvaniz ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                    aria-expanded={accordion.faq_pregalvaniz ? 'true' : 'false'}
                  >
                    <h3 className={`text-lg font-medium ${accordion.faq_pregalvaniz ? 'text-red-600' : 'text-gray-900'}`}>Pregalvaniz Kablo Kanalı Nedir?</h3>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.faq_pregalvaniz ? 'border-red-600' : 'border-gray-300'}`}>
                      <span className={`text-xl ${accordion.faq_pregalvaniz ? 'text-red-600' : 'text-gray-600'}`}>{accordion.faq_pregalvaniz ? '−' : '+'}</span>
                    </div>
                  </button>
                  {accordion.faq_pregalvaniz && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 text-gray-700 leading-relaxed">
                        <p>
                          Pregalvaniz kablo kanalları, rulo sacın sürekli galvaniz kaplama hattında çinko ile kaplanmasıyla elde edilir. İç ortamlarda ve düşük korozyonlu sahalarda yaygın kullanılır.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sıcak Daldırma Kablo Kanalı */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setAccordion(a => ({ ...a, faq_sicak: !a.faq_sicak }))}
                    className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.faq_sicak ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                    aria-expanded={accordion.faq_sicak ? 'true' : 'false'}
                  >
                    <h3 className={`text-lg font-medium ${accordion.faq_sicak ? 'text-red-600' : 'text-gray-900'}`}>Sıcak Daldırma Kablo Kanalı Nedir?</h3>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.faq_sicak ? 'border-red-600' : 'border-gray-300'}`}>
                      <span className={`text-xl ${accordion.faq_sicak ? 'text-red-600' : 'text-gray-600'}`}>{accordion.faq_sicak ? '−' : '+'}</span>
                    </div>
                  </button>
                  {accordion.faq_sicak && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 text-gray-700 leading-relaxed">
                        <p>
                          Sıcak daldırma galvaniz kaplama, çelik parçanın çinko banyosuna batırılmasıyla yapılır. Yüksek korozyon dayanımı gerektiren dış saha uygulamaları için uygundur.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Elektro Galvaniz Kablo Kanalı */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setAccordion(a => ({ ...a, faq_elektro: !a.faq_elektro }))}
                    className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.faq_elektro ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                    aria-expanded={accordion.faq_elektro ? 'true' : 'false'}
                  >
                    <h3 className={`text-lg font-medium ${accordion.faq_elektro ? 'text-red-600' : 'text-gray-900'}`}>Elektro Galvaniz Kablo Kanalı Nedir?</h3>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.faq_elektro ? 'border-red-600' : 'border-gray-300'}`}>
                      <span className={`text-xl ${accordion.faq_elektro ? 'text-red-600' : 'text-gray-600'}`}>{accordion.faq_elektro ? '−' : '+'}</span>
                    </div>
                  </button>
                  {accordion.faq_elektro && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 text-gray-700 leading-relaxed">
                        <p>
                          Elektro galvaniz kaplama, elektroliz yöntemiyle ince ve homojen bir çinko tabakası sağlar. İç mekân ve düşük korozyon koşullarında tercih edilir.
                        </p>
                      </div>
                    </div>
                  )}
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
                    {/* Paslanmaz Kablo Kanalı - Açık/Kapalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setAccordion(a => ({ ...a, malzeme_paslanmaz: !a.malzeme_paslanmaz }))}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.malzeme_paslanmaz ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                        aria-expanded={accordion.malzeme_paslanmaz ? 'true' : 'false'}
                      >
                        <h3 className={`text-lg font-medium ${accordion.malzeme_paslanmaz ? 'text-red-600' : 'text-gray-900'}`}>Paslanmaz Kablo Kanalı Nedir?</h3>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.malzeme_paslanmaz ? 'border-red-600' : 'border-gray-300'}`}>
                          <span className={`text-xl ${accordion.malzeme_paslanmaz ? 'text-red-600' : 'text-gray-600'}`}>{accordion.malzeme_paslanmaz ? '−' : '+'}</span>
                        </div>
                      </button>
                      {accordion.malzeme_paslanmaz && (
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
                      )}
                    </div>

                    {/* Alüminyum Kablo Kanalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setAccordion(a => ({ ...a, malzeme_aluminyum: !a.malzeme_aluminyum }))}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.malzeme_aluminyum ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                        aria-expanded={accordion.malzeme_aluminyum ? 'true' : 'false'}
                      >
                        <h3 className={`text-lg font-medium ${accordion.malzeme_aluminyum ? 'text-red-600' : 'text-gray-900'}`}>Alüminyum Kablo Kanalı Nedir?</h3>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.malzeme_aluminyum ? 'border-red-600' : 'border-gray-300'}`}>
                          <span className={`text-xl ${accordion.malzeme_aluminyum ? 'text-red-600' : 'text-gray-600'}`}>{accordion.malzeme_aluminyum ? '−' : '+'}</span>
                        </div>
                      </button>
                      {accordion.malzeme_aluminyum && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 text-gray-700 leading-relaxed">
                            <p>
                              Alüminyum kablo kanalları düşük ağırlık ve yüksek korozyon direnci avantajı ile gıda, kimya ve denizcilik gibi alanlarda tercih edilir.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fiber Glass Kablo Kanalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setAccordion(a => ({ ...a, malzeme_fiber: !a.malzeme_fiber }))}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.malzeme_fiber ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                        aria-expanded={accordion.malzeme_fiber ? 'true' : 'false'}
                      >
                        <h3 className={`text-lg font-medium ${accordion.malzeme_fiber ? 'text-red-600' : 'text-gray-900'}`}>Fiber Glass Kablo Kanalı Nedir?</h3>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.malzeme_fiber ? 'border-red-600' : 'border-gray-300'}`}>
                          <span className={`text-xl ${accordion.malzeme_fiber ? 'text-red-600' : 'text-gray-600'}`}>{accordion.malzeme_fiber ? '−' : '+'}</span>
                        </div>
                      </button>
                      {accordion.malzeme_fiber && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 text-gray-700 leading-relaxed">
                            <p>
                              Fiber glass (GRP) kablo kanalları kimyasal dayanım, elektriksel yalıtım ve hafiflik gerektiğinde çözüm sunar.
                            </p>
                          </div>
                        </div>
                      )}
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
                    {/* Kenar Bükümlü Kablo Kanalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setAccordion(a => ({ ...a, tasarim_kenar_bukumlu: !a.tasarim_kenar_bukumlu }))}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.tasarim_kenar_bukumlu ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                        aria-expanded={accordion.tasarim_kenar_bukumlu ? 'true' : 'false'}
                      >
                        <h3 className={`text-lg font-medium ${accordion.tasarim_kenar_bukumlu ? 'text-red-600' : 'text-gray-900'}`}>Kenar Bükümlü Kablo Kanalı Nedir?</h3>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.tasarim_kenar_bukumlu ? 'border-red-600' : 'border-gray-300'}`}>
                          <span className={`text-xl ${accordion.tasarim_kenar_bukumlu ? 'text-red-600' : 'text-gray-600'}`}>{accordion.tasarim_kenar_bukumlu ? '−' : '+'}</span>
                        </div>
                      </button>
                      {accordion.tasarim_kenar_bukumlu && (
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
                      )}
                    </div>

                    {/* Kenar Bükümlü Olmayan Kablo Kanalı */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setAccordion(a => ({ ...a, tasarim_kenar_bukumsuz: !a.tasarim_kenar_bukumsuz }))}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.tasarim_kenar_bukumsuz ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                        aria-expanded={accordion.tasarim_kenar_bukumsuz ? 'true' : 'false'}
                      >
                        <h3 className={`text-lg font-medium ${accordion.tasarim_kenar_bukumsuz ? 'text-red-600' : 'text-gray-900'}`}>Kenar Bükümlü Olmayan Kablo Kanalı Nedir?</h3>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.tasarim_kenar_bukumsuz ? 'border-red-600' : 'border-gray-300'}`}>
                          <span className={`text-xl ${accordion.tasarim_kenar_bukumsuz ? 'text-red-600' : 'text-gray-600'}`}>{accordion.tasarim_kenar_bukumsuz ? '−' : '+'}</span>
                        </div>
                      </button>
                      {accordion.tasarim_kenar_bukumsuz && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 text-gray-700 leading-relaxed">
                            <p>
                              Kenar bükümü olmayan tasarımlar maliyet ve üretim tercihleri doğrultusunda seçilebilir; kenar güvenliği için uygun kapak ve aksesuarlar önerilir.
                            </p>
                          </div>
                        </div>
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

  // Busbar özel sayfası kaldırıldı (redirect benzeri boş render)
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
                <span className="text-[#1a3056] font-medium">Busbar Sistemleri (pasif)</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Hero Section (pasif) */}
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  Busbar Sistemleri Kaldırıldı
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Bu sayfa kullanımdan kaldırıldı. Lütfen diğer kategorileri kullanın.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Sade Horizontal Tasarım (Busbar öğesi kaldırıldı) */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Busbar Sistemleri çıkarıldı */}

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
                  
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Yatay Menü (GES için) */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Busbar Sistemleri (kaldırıldı) */}
                  {/* <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]"> */}
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <defs>
                          <linearGradient id="busbarGradGes" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e5e7eb" />
                            <stop offset="100%" stopColor="#9ca3af" />
                          </linearGradient>
                        </defs>
                        <rect x="10" y="20" width="60" height="24" fill="url(#busbarGradGes)" rx="2" />
                        <rect x="10" y="20" width="60" height="4" fill="#d1d5db" rx="2" />
                        <rect x="12" y="42" width="60" height="4" fill="#6b7280" opacity="0.3" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Busbar Sistemleri</h3>
                    <p className="text-xs text-gray-500">Güç dağıtım çözümleri</p>
                  {/* </Link> */}

                  {/* Askı Sistemleri */}
                  <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <rect x="20" y="15" width="40" height="6" fill="#9ca3af" rx="3" />
                        <rect x="37" y="21" width="6" height="25" fill="#9ca3af" rx="3" />
                        <rect x="30" y="43" width="20" height="4" fill="#6b7280" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Askı Sistemleri</h3>
                    <p className="text-xs text-gray-500">Taşıyıcı destek çözümleri</p>
                  </Link>

                  {/* Kablo Kanalları */}
                  <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <rect x="8" y="22" width="64" height="20" fill="#fca5a5" rx="2" />
                        <rect x="8" y="22" width="64" height="3" fill="#f87171" rx="2" />
                        <rect x="10" y="40" width="64" height="3" fill="#991b1b" opacity="0.4" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-red-600 text-sm mb-1 group-hover:text-red-700 transition-colors">Kablo Kanalları</h3>
                    <p className="text-xs text-red-500">Kablo koruma sistemleri</p>
                  </Link>

                  {/* GES Solar Sistemleri - Aktif */}
                  <Link href="/products?category=ges-solar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                       <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                           <rect x="18" y="18" width="44" height="26" fill="#f59e0b" rx="4" />
                            <rect x="20" y="22" width="40" height="18" fill="#fcd34d" rx="2" />
                         </svg>
                        </div>
                        <h3 className="font-medium text-yellow-600 text-sm mb-1 group-hover:text-yellow-700 transition-colors">GES Solar Sistemleri</h3>
                        <p className="text-xs text-yellow-600">Arazi / Çatı / K-Port</p>
                      </Link>

                  {/* Topraklama Sistemleri */}
                  <Link href="/products?category=topraklama-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <circle cx="40" cy="32" r="16" fill="#16a34a" opacity="0.15" />
                        <rect x="36" y="18" width="8" height="24" rx="2" fill="#16a34a" />
                        <rect x="39" y="42" width="2" height="6" rx="1" fill="#15803d" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Topraklama Sistemleri</h3>
                    <p className="text-xs text-gray-500">Güvenli topraklama çözümleri</p>
                  </Link>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Yatay Menü (GES) */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Busbar Sistemleri kaldırıldı */}

                  {/* Askı Sistemleri */}
                  <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <rect x="20" y="15" width="40" height="6" fill="#9ca3af" rx="3" />
                        <rect x="37" y="21" width="6" height="25" fill="#9ca3af" rx="3" />
                        <rect x="30" y="43" width="20" height="4" fill="#6b7280" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Askı Sistemleri</h3>
                    <p className="text-xs text-gray-500">Taşıyıcı destek çözümleri</p>
                  </Link>

                  {/* Kablo Kanalları */}
                  <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <rect x="8" y="22" width="64" height="20" fill="#fca5a5" rx="2" />
                        <rect x="8" y="22" width="64" height="3" fill="#f87171" rx="2" />
                        <rect x="10" y="40" width="64" height="3" fill="#991b1b" opacity="0.4" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-red-600 text-sm mb-1 group-hover:text-red-700 transition-colors">Kablo Kanalları</h3>
                    <p className="text-xs text-red-500">Kablo koruma sistemleri</p>
                  </Link>

                  {/* GES Solar Sistemleri - Aktif */}
                 <Link href="/products?category=ges-solar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <rect x="18" y="18" width="44" height="26" fill="#f59e0b" rx="4" />
                           <rect x="20" y="22" width="40" height="18" fill="#fcd34d" rx="2" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-yellow-600 text-sm mb-1 group-hover:text-yellow-700 transition-colors">GES Solar Sistemleri</h3>
                        <p className="text-xs text-yellow-600">Arazi / Çatı / K-Port</p>
                      </Link>

                  {/* Trolley Busbar Sistemleri */}
                  
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
                    {products.map((product: any, index: number) => {
                      // Önce images dizisinden ilk resmi, yoksa imageUrl, yoksa default kullan
                      const productImage = (product.images && product.images.length > 0) 
                        ? product.images[0].imageUrl 
                        : (product.imageUrl || '/default-urun-foto/default-urun.png');
                      
                      return (
                      <div key={product.id} className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                          <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
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
                    )})}
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
                  {/* <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]"> */}
                    
                    
                  {/* </Link> */}

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

                  {/* GES Solar Sistemleri */}
                  <Link href="/products?category=ges-solar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                      <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                           <rect x="18" y="18" width="44" height="26" fill="#f59e0b" rx="4" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-yellow-600 text-sm mb-1 group-hover:text-yellow-700 transition-colors">GES Solar Sistemleri</h3>
                       <p className="text-xs text-yellow-600">Arazi / Çatı / K-Port</p>
                     </Link>

                  {/* Topraklama Sistemleri */}
                  <Link href="/products?category=topraklama-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <circle cx="40" cy="32" r="16" fill="#16a34a" opacity="0.15" />
                        <rect x="36" y="18" width="8" height="24" rx="2" fill="#16a34a" />
                        <rect x="39" y="42" width="2" height="6" rx="1" fill="#15803d" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Topraklama Sistemleri</h3>
                    <p className="text-xs text-gray-500">Güvenli topraklama çözümleri</p>
                  </Link>

                  {/* Trolley Busbar Sistemleri */}
                  
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

            {/* Askı Ürünleri */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-neuropol text-gray-900">Askı Ürünleri</h2>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map((product: any) => {
                    const productImage = (product.images && product.images.length > 0)
                      ? product.images[0].imageUrl
                      : (product.imageUrl || product.mainImageUrl || '/default-urun-foto/default-urun.png')

                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
                      >
                        <img
                          src={productImage}
                          alt={product.name}
                          className="w-full h-32 object-contain rounded mb-3"
                        />
                        <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Bu kategoride ürün bulunamadı</h3>
                  <p className="mt-2 text-sm text-gray-500">Askı Sistemleri kategorisinde henüz ürün eklenmemiştir.</p>
                </div>
              )}
            </div>

            {/* SSS / Akordeon */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setAccordion(a => ({ ...a, aski_montaj: !a.aski_montaj }))}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.aski_montaj ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-expanded={accordion.aski_montaj ? 'true' : 'false'}
                >
                  <h3 className={`text-lg font-medium ${accordion.aski_montaj ? 'text-green-700' : 'text-gray-900'}`}>Askı Sistemleri Montajı Nasıl Yapılır?</h3>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.aski_montaj ? 'border-green-600' : 'border-gray-300'}`}>
                    <span className={`text-xl ${accordion.aski_montaj ? 'text-green-700' : 'text-gray-600'}`}>{accordion.aski_montaj ? '−' : '+'}</span>
                  </div>
                </button>
                {accordion.aski_montaj && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 text-gray-700 leading-relaxed">
                      <p>Askı çubukları ve konsollar; uygun dübel ve ankraj elemanları ile tavana/duvara sabitlenir, ardından kablo kanalı veya taşıyıcı raylar seviyelenip sıkılır.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setAccordion(a => ({ ...a, aski_malzeme: !a.aski_malzeme }))}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.aski_malzeme ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-expanded={accordion.aski_malzeme ? 'true' : 'false'}
                >
                  <h3 className={`text-lg font-medium ${accordion.aski_malzeme ? 'text-green-700' : 'text-gray-900'}`}>Hangi Malzeme Seçilmeli?</h3>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.aski_malzeme ? 'border-green-600' : 'border-gray-300'}`}>
                    <span className={`text-xl ${accordion.aski_malzeme ? 'text-green-700' : 'text-gray-600'}`}>{accordion.aski_malzeme ? '−' : '+'}</span>
                  </div>
                </button>
                {accordion.aski_malzeme && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 text-gray-700 leading-relaxed">
                      <p>İç ortam ve düşük korozyon için pregalvaniz, dış ortam ve yüksek korozyon için sıcak daldırma galvaniz veya paslanmaz tercih edilmelidir.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  // Topraklama Sistemleri kategorisi için özel tasarım
  if (category === 'topraklama-sistemleri') {
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
                <span className="text-[#1a3056] font-medium">Topraklama Sistemleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">Topraklama Sistemleri</h1>
                <p className="text-xl text-emerald-100 leading-relaxed">
                  IPOS Topraklama çözümleri; güvenli enerji iletimi ve ekipman koruması için şeritler, klemensler ve aksesuarlarla eksiksiz bir ürün yelpazesi sunar.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Ürün Kategorileri - Dört Öğeli Yatay Menü */}
        <div className="bg-white border-b border-gray-100">
          <MaxWidthWrapper>
            <div className="py-12">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                  {/* Askı Sistemleri */}
                  <Link href="/products?category=aski-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <rect x="20" y="15" width="40" height="6" fill="#9ca3af" rx="3" />
                        <rect x="37" y="21" width="6" height="25" fill="#9ca3af" rx="3" />
                        <rect x="30" y="43" width="20" height="4" fill="#6b7280" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Askı Sistemleri</h3>
                    <p className="text-xs text-gray-500">Taşıyıcı destek çözümleri</p>
                  </Link>

                  {/* Kablo Kanal Sistemleri */}
                  <Link href="/products?category=kablo-kanal-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <rect x="8" y="22" width="64" height="20" fill="#fca5a5" rx="2" />
                        <rect x="8" y="22" width="64" height="3" fill="#f87171" rx="2" />
                        <rect x="10" y="40" width="64" height="3" fill="#991b1b" opacity="0.4" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Kablo Kanalları</h3>
                    <p className="text-xs text-gray-500">Kablo koruma sistemleri</p>
                  </Link>

                  {/* GES Solar Sistemleri */}
                  <Link href="/products?category=ges-solar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <rect x="18" y="18" width="44" height="26" fill="#f59e0b" rx="4" />
                        <rect x="20" y="22" width="40" height="18" fill="#fcd34d" rx="2" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">GES Solar Sistemleri</h3>
                    <p className="text-xs text-gray-500">Arazi / Çatı / K-Port</p>
                  </Link>

                  {/* Topraklama Sistemleri - Aktif */}
                  <Link href="/products?category=topraklama-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                    <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                        <circle cx="40" cy="32" r="16" fill="#10b981" opacity="0.25" />
                        <rect x="36" y="18" width="8" height="24" rx="2" fill="#10b981" />
                        <rect x="39" y="42" width="2" height="6" rx="1" fill="#059669" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-emerald-600 text-sm mb-1 group-hover:text-emerald-700 transition-colors">Topraklama Sistemleri</h3>
                    <p className="text-xs text-emerald-600">Topraklama şeritleri ve aksesuarlar</p>
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
                  <span className="text-emerald-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">Topraklama Sistemleri Genel Bilgi</h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Topraklama; güvenlik ve ekipman koruması için elektrik sistemlerinin vazgeçilmez bir parçasıdır. IPOS, farklı saha koşulları için uygun şerit, klemens ve aksesuar çözümleri sunar.</p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="relative">
                      <div className="w-56 h-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                      <div className="w-10 h-24 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-lg mx-auto mt-2 shadow-lg"></div>
                      <div className="w-8 h-8 bg-emerald-700 rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2 shadow-md"></div>
                      <div className="w-32 h-4 bg-emerald-600 rounded absolute -bottom-6 left-1/2 transform -translate-x-1/2 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Topraklama Ürünleri */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-neuropol text-gray-900">Topraklama Ürünleri</h2>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map((product: any) => {
                    const productImage = (product.images && product.images.length > 0)
                      ? product.images[0].imageUrl
                      : (product.imageUrl || product.mainImageUrl || '/default-urun-foto/default-urun.png')

                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
                      >
                        <img
                          src={productImage}
                          alt={product.name}
                          className="w-full h-32 object-contain rounded mb-3"
                        />
                        <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Bu kategoride ürün bulunamadı</h3>
                  <p className="mt-2 text-sm text-gray-500">Topraklama Sistemleri kategorisinde henüz ürün eklenmemiştir.</p>
                </div>
              )}
            </div>

            {/* SSS / Akordeon */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setAccordion(a => ({ ...a, topraklama_baglanti: !a.topraklama_baglanti }))}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.topraklama_baglanti ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-expanded={accordion.topraklama_baglanti ? 'true' : 'false'}
                >
                  <h3 className={`text-lg font-medium ${accordion.topraklama_baglanti ? 'text-emerald-700' : 'text-gray-900'}`}>Topraklama Bağlantıları Nasıl Yapılır?</h3>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.topraklama_baglanti ? 'border-emerald-600' : 'border-gray-300'}`}>
                    <span className={`text-xl ${accordion.topraklama_baglanti ? 'text-emerald-700' : 'text-gray-600'}`}>{accordion.topraklama_baglanti ? '−' : '+'}</span>
                  </div>
                </button>
                {accordion.topraklama_baglanti && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 text-gray-700 leading-relaxed">
                      <p>Şeritler ve iletkenler, uygun klemenslerle sıkılarak ve korozyona karşı koruyucu kaplamalar ile desteklenerek bağlanmalıdır.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setAccordion(a => ({ ...a, topraklama_malzeme: !a.topraklama_malzeme }))}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.topraklama_malzeme ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-expanded={accordion.topraklama_malzeme ? 'true' : 'false'}
                >
                  <h3 className={`text-lg font-medium ${accordion.topraklama_malzeme ? 'text-emerald-700' : 'text-gray-900'}`}>Hangi Malzeme Seçilmeli?</h3>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.topraklama_malzeme ? 'border-emerald-600' : 'border-gray-300'}`}>
                    <span className={`text-xl ${accordion.topraklama_malzeme ? 'text-emerald-700' : 'text-gray-600'}`}>{accordion.topraklama_malzeme ? '−' : '+'}</span>
                  </div>
                </button>
                {accordion.topraklama_malzeme && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 text-gray-700 leading-relaxed">
                      <p>Toprak özgül direncine ve çevresel koşullara göre sıcak daldırma galvanizli veya paslanmaz malzemeler tercih edilmelidir.</p>
                    </div>
                  </div>
                )}
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
                  {/* <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]"> */}
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
                    
                  {/* </Link> */}

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
  if (category === 'solar-montaj-sistemleri' || category === 'ges-solar-sistemleri') {
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
                <span className="text-[#1a3056] font-medium">GES Solar Sistemleri</span>
              </nav>
            </div>
          </MaxWidthWrapper>
        </div>

        <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white">
          <MaxWidthWrapper>
            <div className="py-16">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-neuropol mb-6">
                  GES Solar Sistemleri
                </h1>
                <p className="text-xl text-yellow-100 leading-relaxed">
                  IPOS güneş enerji çözümleri; arazi, çatı ve K-Port uygulamalarında verimli, dayanıklı ve hızlı montaj sunar.
                </p>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
        {/* Buraya dön*/}
         {/* Ürün Kategorileri - Sade Horizontal Tasarım */}
         <div className="bg-white border-b border-gray-100">
              <MaxWidthWrapper>
                <div className="py-12">
                  <div className="flex justify-center items-center">
                    <div className="flex items-center space-x-12 overflow-x-auto pb-4">
                      {/* Busbar Sistemleri (kaldırıldı) */}
                      {/* <Link href="/products?category=busbar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]"> */}
                        
                       
                      {/* </Link> */}

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

                      {/* GES Solar Sistemleri */}
                      <Link href="/products?category=ges-solar-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                       <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                           <rect x="18" y="18" width="44" height="26" fill="#f59e0b" rx="4" />
                            <rect x="20" y="22" width="40" height="18" fill="#fcd34d" rx="2" />
                         </svg>

                    </div>
                        <h3 className="font-medium text-yellow-600 text-sm mb-1 group-hover:text-yellow-700 transition-colors">GES Solar Sistemleri</h3>
                       <p className="text-xs text-yellow-600">Arazi / Çatı / K-Port</p>
                      </Link>

                      {/* Topraklama Sistemleri */}
                      <Link href="/products?category=topraklama-sistemleri" className="flex flex-col items-center text-center group cursor-pointer min-w-[140px]">
                        <div className="w-20 h-16 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                          <svg width="80" height="64" viewBox="0 0 80 64" className="drop-shadow-sm">
                            <circle cx="40" cy="32" r="16" fill="#16a34a" opacity="0.15" />
                            <rect x="36" y="18" width="8" height="24" rx="2" fill="#16a34a" />
                            <rect x="39" y="42" width="2" height="6" rx="1" fill="#15803d" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-gray-700 text-sm mb-1 group-hover:text-gray-900 transition-colors">Topraklama Sistemleri</h3>
                        <p className="text-xs text-gray-500">Güvenli topraklama çözümleri</p>
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
                  <span className="text-yellow-600 font-medium text-sm uppercase tracking-wide">Genel Bilgi</span>
                  <h2 className="text-3xl font-bold font-neuropol text-gray-900 mt-2 mb-6">
                    GES Solar Sistemleri Genel Bilgi
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    IPOS GES çözümleri; güneş panellerinin çatı, arazi ve K-Port gibi farklı yapılara güvenli montajı için tasarlanmış sistemlerdir.
                  </p>
                  <p>
                    Galvanizli ve paslanmaz seçenekleriyle uzun ömür, yüksek taşıma kapasitesi ve hızlı montaj imkânı sağlar.
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

        {/* GES Alt Kategorileri Şerit */}
        <div className="bg-white border-y border-gray-100">
          <MaxWidthWrapper>
            <div className="py-8">
              <div className="flex items-center justify-center space-x-6 overflow-x-auto">
                <Link href="/products?category=ges-arazi" className="px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-sm font-medium">Arazi Sistemleri</Link>
                <Link href="/products?category=ges-cati" className="px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-sm font-medium">Çatı Sistemleri</Link>
                <Link href="/products?category=ges-k-port" className="px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-sm font-medium">K-Port Sistemleri</Link>
                <Link href="/products?category=ges-solar-sistemleri" className="px-4 py-2 rounded-full border border-yellow-500 text-yellow-700 bg-yellow-50 text-sm font-semibold">Tümü</Link>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Akordeon Bilgilendirme */}
        <MaxWidthWrapper>
          <div className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="mb-6">
                  <span className="text-yellow-600 font-medium text-sm uppercase tracking-wide">GES Sistemleri</span>
                  <h2 className="text-2xl font-bold text-gray-900">Arazi / Çatı / K-Port</h2>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setAccordion(a => ({ ...a, ges_arazi: !a.ges_arazi }))}
                      className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.ges_arazi ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                      aria-expanded={accordion.ges_arazi ? 'true' : 'false'}
                    >
                      <h3 className={`text-lg font-medium ${accordion.ges_arazi ? 'text-yellow-700' : 'text-gray-900'}`}>Arazi GES Sistemleri</h3>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.ges_arazi ? 'border-yellow-600' : 'border-gray-300'}`}>
                        <span className={`text-xl ${accordion.ges_arazi ? 'text-yellow-700' : 'text-gray-600'}`}>{accordion.ges_arazi ? '−' : '+'}</span>
                      </div>
                    </button>
                    {accordion.ges_arazi && (
                      <div className="px-6 pb-6">
                        <div className="pt-4 text-gray-700 leading-relaxed">
                          <p>Arazi montajları için zemin ankrajına uygun, yüksek dayanımlı çelik konstrüksiyon çözümleri.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setAccordion(a => ({ ...a, ges_cati: !a.ges_cati }))}
                      className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.ges_cati ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                      aria-expanded={accordion.ges_cati ? 'true' : 'false'}
                    >
                      <h3 className={`text-lg font-medium ${accordion.ges_cati ? 'text-yellow-700' : 'text-gray-900'}`}>Çatı GES Sistemleri</h3>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.ges_cati ? 'border-yellow-600' : 'border-gray-300'}`}>
                        <span className={`text-xl ${accordion.ges_cati ? 'text-yellow-700' : 'text-gray-600'}`}>{accordion.ges_cati ? '−' : '+'}</span>
                      </div>
                    </button>
                    {accordion.ges_cati && (
                      <div className="px-6 pb-6">
                        <div className="pt-4 text-gray-700 leading-relaxed">
                          <p>Metal ve membran çatı tiplerine uygun kelepçe ve profilli hafif çözümler.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setAccordion(a => ({ ...a, ges_kport: !a.ges_kport }))}
                      className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${accordion.ges_kport ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50'}`}
                      aria-expanded={accordion.ges_kport ? 'true' : 'false'}
                    >
                      <h3 className={`text-lg font-medium ${accordion.ges_kport ? 'text-yellow-700' : 'text-gray-900'}`}>K-Port Sistemleri</h3>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${accordion.ges_kport ? 'border-yellow-600' : 'border-gray-300'}`}>
                        <span className={`text-xl ${accordion.ges_kport ? 'text-yellow-700' : 'text-gray-600'}`}>{accordion.ges_kport ? '−' : '+'}</span>
                      </div>
                    </button>
                    {accordion.ges_kport && (
                      <div className="px-6 pb-6">
                        <div className="pt-4 text-gray-700 leading-relaxed">
                          <p>Gölgelendirme ve enerji üretimini birleştiren K-Port yapısal çözümleri.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl overflow-hidden shadow-lg">
                  <img src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop" alt="GES Solar Sistemleri" className="w-full h-full object-cover"/>
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
                {filteredCategories.map((cat: any) => (
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

                {/* Yüzey İşleme Seçim Ekranı */}
                {hasSurfaceTreatmentOptions && !selectedSurfaceTreatment ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold font-neuropol text-gray-900 mb-6 text-center">
                      Yüzey İşleme Seçiniz
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {getSurfaceTreatmentOptions(selectedCategory?.name).map((option) => (
                        <button
                          key={option}
                          onClick={() => setSelectedSurfaceTreatment(option)}
                          className="p-6 border-2 border-gray-300 rounded-lg hover:border-[#1a3056] hover:bg-[#1a3056]/5 transition-all duration-200 text-center group"
                        >
                          <div className="text-2xl font-bold font-neuropol text-gray-900 group-hover:text-[#1a3056] transition-colors mb-2">
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {option === 'sıcak daldırma' && 'Sıcak daldırma galvaniz kaplama'}
                            {option === 'pregalvaniz' && 'Pregalvaniz kaplama'}
                            {option === 'boyalı' && 'Boyalı yüzey işleme'}
                            {option === 'elektro' && 'Elektro galvaniz kaplama'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Ürünler */}
                    {filteredProducts.length > 0 ? (
                      <>
                        {/* Seçilen yüzey işleme bilgisi */}
                        {selectedSurfaceTreatment && (
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-gray-600">Seçilen:</span>
                              <span className="font-semibold text-gray-900 capitalize">{selectedSurfaceTreatment}</span>
                            </div>
                            <button
                              onClick={() => setSelectedSurfaceTreatment(null)}
                              className="text-sm text-[#1a3056] hover:underline"
                            >
                              Seçimi Temizle
                            </button>
                          </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {filteredProducts.map((product: any) => {
                            // Önce images dizisinden ilk resmi, yoksa imageUrl veya mainImageUrl'i kullan
                            const productImage = (product.images && product.images.length > 0) 
                              ? product.images[0].imageUrl 
                              : (product.imageUrl || product.mainImageUrl || '/default-urun-foto/default-urun.png');
                            
                            // GES ürünleri için farklı link
                            const gesCategories = ['ges-arazi', 'ges-cati', 'solar-montaj-sistemleri'];
                            const productLink = gesCategories.includes(category || '') 
                              ? `/ges-products/${product.id}` 
                              : `/products/${product.id}`;
                            
                            return (
                            <Link
                              key={product.id}
                              href={productLink}
                              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
                            >
                              <img
                                src={productImage}
                                alt={product.name}
                                className="w-full h-32 object-contain rounded mb-3"
                              />
                              <h3 className="font-medium text-gray-900 text-sm">
                                {product.name}
                              </h3>
                            </Link>
                          )})}
                        </div>
                      </>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                          {selectedSurfaceTreatment 
                            ? `Seçilen yüzey işleme (${selectedSurfaceTreatment}) için ürün bulunamadı`
                            : 'Bu kategoride ürün bulunamadı'}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {selectedSurfaceTreatment 
                            ? 'Farklı bir yüzey işleme seçeneği deneyebilirsiniz.'
                            : 'Bu kategoride henüz ürün eklenmemiştir.'}
                        </p>
                        {selectedSurfaceTreatment && (
                          <button
                            onClick={() => setSelectedSurfaceTreatment(null)}
                            className="mt-4 text-sm text-[#1a3056] hover:underline"
                          >
                            Seçimi Temizle
                          </button>
                        )}
                      </div>
                    )}
                  </>
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

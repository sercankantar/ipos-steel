'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download, FileText, Eye, X } from 'lucide-react'
import Link from 'next/link'

function getBaseUrl() {
  return typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:3000'
}

async function getProduct(id: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  const res = await fetch(`${base}/api/products/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('genel')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quoteForm, setQuoteForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    email: '',
    description: ''
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(params.id)
        setProduct(data)
      } catch (error) {
        console.error('Ürün yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  // ESC tuşu ile modal'ları kapatma
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false)
        } else if (isQuoteModalOpen) {
          setIsQuoteModalOpen(false)
        }
      }
    }

    if (isModalOpen || isQuoteModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Sayfa kaydırmayı engelle
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, isQuoteModalOpen])

  const handleQuoteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuoteForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada form verilerini API'ye gönderebilirsiniz
    console.log('Teklif formu:', { ...quoteForm, productName: product?.name })
    // Form gönderildikten sonra modal'ı kapat
    setIsQuoteModalOpen(false)
    // Form'u temizle
    setQuoteForm({
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      email: '',
      description: ''
    })
  }

  const handleQuoteCancel = () => {
    setIsQuoteModalOpen(false)
    setQuoteForm({
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      email: '',
      description: ''
    })
  }

  const handleCatalogDownload = async (catalogId: string) => {
    try {
      const response = await fetch(`/api/catalogs/${catalogId}/download`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${product.catalog?.title || 'katalog'}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Katalog indirilemedi')
      }
    } catch (error) {
      console.error('Katalog indirme hatası:', error)
    }
  }

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="py-12 text-center text-gray-600">Yükleniyor...</div>
      </MaxWidthWrapper>
    )
  }

  if (!product) {
    return (
      <MaxWidthWrapper>
        <div className="py-12 text-gray-600">Ürün bulunamadı.</div>
      </MaxWidthWrapper>
    )
  }

  // Ürün görselleri - önce çoklu görseller, sonra tek görsel, son olarak placeholder
  const productImages = product.images && product.images.length > 0 
    ? product.images.map((img: any) => img.imageUrl)
    : product.imageUrl 
    ? [product.imageUrl]
    : ['/placeholder-product-1.jpg']

  const tabs = [
    { id: 'genel', label: 'Genel Bilgi' },
    { id: 'teknik', label: 'Teknik Bilgi' },
    { id: 'dokumanlar', label: 'Dökümanlar' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'genel':
  return (
          <div className="space-y-6">
            {product.generalInfo ? (
              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: product.generalInfo }}
                />
              </div>
            ) : (
              <div className="space-y-6">
        <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Genel Özellikleri</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    TÜV sertifikalı, IEC standart kablolar ve terminaller ile donatılmış ürünlerimiz iki üretim yöntemi ile ayrılmaktadır.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Modüler tip prizler ile donatılmış hazır standart ürünler
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      İhtiyaçlara ve isteğe bağlı olarak her marka ve sayıda modüler tip prizler ile donatılabilen özel ürünler
                    </li>
                  </ul>
        </div>
                
        <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">E-Line Smart Masaüstü Priz</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-STD-I Standart Serbest Tip
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-LUX-II Lüks Sabitlenebilir Tip (masaya sabitleme ayakları ile birlikte)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-IN-I Masaya Gömme Dikdörtgen Tip
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-K Kolon Tip
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    8 farklı yapı ve istenen içerikte üretilen ürünlerimiz ile EAE, gelecekteki ihtiyaçlarınız için esnek, sağlam, modüler, estetik ve güvenli çözümler sunmaktadır.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">Kullanım Alanları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Bankalar
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Oteller
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Ofis ve iş yerleri, yönetim binaları
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Hastaneler
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      
      case 'teknik':
        return (
          <div className="space-y-6">
            {product.technicalInfo ? (
              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: product.technicalInfo }}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Teknik Özellikler</h3>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">E-Line Smart</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Gövde Malzemesi:</strong> Alüminyum, beyaz ve siyah renk alternatifleri ile anodik oksidasyon veya elektrostatik toz boya kaplama</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Yan Kapaklar:</strong> Polikarbonat (PC), "halogen free", IEC 60965 (960 °C glow wire test) ve UL94 "V0" alev direnci uyumlu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Standart Ürünler (Serbest Tip):</strong> Entegre ayaklar ile masaya sabitlenebilir veya yan kapaklardaki vida delikleri ile masaya vida ile sabitlenebilir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Gömme Tip Ürünler:</strong> Push-open/push-close kapak sistemi, kırılmayı önlemek için maksimum 90 derece açılır</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Silindirik Tip Ürünler:</strong> "Push-open" sistemi, tam açıkken düşmeyi önleyen fren mekanizması</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>İç Bağlantılar:</strong> Her iletken için vidasız push-in terminaller ile terminal bloğu bağlantı aparatı</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Güç Çıkışları:</strong> 2.5 mm² veya isteğe bağlı 1.5 mm² H07Z1-K tipi kablolar ile bağlı, en az 16A yük kapasitesi için vidasız push-in terminaller</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Topraklama:</strong> Alüminyum gövdeye sabitlenmiş topraklama bağlantı vidası ve terminali, 2.5 mm² H07Z1-K tipi kablo ile gövde koruması için bağlı</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )
      
      case 'dokumanlar':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Kataloglar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.catalog ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {product.catalog.imageUrl ? (
                      <img 
                        src={product.catalog.imageUrl} 
                        alt={product.catalog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{product.catalog.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{product.catalog.description}</p>
                    <div className="flex justify-between">
                      <button className="text-gray-600 hover:text-gray-800 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        Görüntüle
                      </button>
                      <button 
                        onClick={() => product.catalog?.id && handleCatalogDownload(product.catalog.id)}
                        className="flex items-center transition-colors" 
                        style={{color: '#1a3056'}} 
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#0f1f3a'} 
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#1a3056'}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        İndir
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">E-LINE SMART</h4>
                    <p className="text-sm text-gray-600 mb-4">Ürün kataloğu ve teknik dokümanlar</p>
                    <div className="flex justify-between">
                      <button className="text-gray-600 hover:text-gray-800 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        Görüntüle
                      </button>
                      <button className="flex items-center transition-colors" style={{color: '#1a3056'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#0f1f3a'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#1a3056'}>
                        <Download className="w-4 h-4 mr-1" />
                        İndir
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <MaxWidthWrapper>
      {/* Breadcrumb */}
      <nav className="py-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-800">Ana Sayfa</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Masaüstü Priz Kutusu Çözümleri</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">{product.name}</span>
        </div>
      </nav>

      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sol taraf - Ürün görselleri */}
          <div className="space-y-4">
            {/* Ana görsel */}
            <div 
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Küçük görseller */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-red-500 ring-2 ring-red-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Ürün görseli ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
          </div>

          {/* Sağ taraf - Ürün bilgileri */}
          <div className="space-y-6">
            {/* Ürün adı */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Kategori */}
            <p className="text-gray-600">{product.category?.name || 'Masaüstü Priz - Bürotik Priz Blokları'}</p>
            
            {/* Açıklama */}
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'Enerji (şebeke/UPS), veri, telefon ve multimedya prizleri ile donatılmış modüler, esnek, sağlam, ergonomik, güvenli ve estetik tasarım özelliklerine sahip masaüstü priz çözümleri.'}
            </p>
            
            {/* Teklif Al butonu */}
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors" 
              style={{backgroundColor: '#1a3056'}} 
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0f1f3a'} 
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1a3056'}
            >
              <FileText className="w-5 h-5 mr-2" />
              Teklif Al
            </button>
            
            {/* Ayırıcı çizgi */}
            <div className="border-t border-gray-200 my-6"></div>
            
            {/* Katalog */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Katalog</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">E-LINE SMART</h4>
                    <p className="text-sm text-gray-600">Ürün kataloğu</p>
                  </div>
                  <div className="flex space-x-2">
                    
                    <button 
                      onClick={() => product.catalog?.id && handleCatalogDownload(product.catalog.id)}
                      className="text-sm transition-colors" 
                      style={{color: '#1a3056'}} 
                      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#0f1f3a'} 
                      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#1a3056'}
                    >
                      İndir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab sistemi */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
                style={activeTab === tab.id ? {backgroundColor: '#1a3056'} : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab içeriği */}
          <div className="py-8">
            <div className="animate-in fade-in-50 duration-200">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Tam ekran görsel modal'ı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {/* Kapatma butonu */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Ana görsel */}
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Sol ok */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {/* Sağ ok */}
            {selectedImageIndex < productImages.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
            
            {/* Alt küçük görseller */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-white' 
                      : 'border-gray-400 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Ürün görseli ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Teklif Al Modal'ı */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Teklif Al</h2>
              <button
                onClick={handleQuoteCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
              {/* Seçilen Ürün */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seçtiğiniz Ürün
                </label>
                <input
                  type="text"
                  value={product?.name || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Ad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={quoteForm.firstName}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınızı girin"
                />
              </div>

              {/* Soyad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={quoteForm.lastName}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Soyadınızı girin"
                />
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon No *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0555 123 45 67"
                />
              </div>

              {/* Şehir */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir *
                </label>
                <input
                  type="text"
                  name="city"
                  value={quoteForm.city}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Şehrinizi girin"
                />
              </div>

              {/* E-posta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  value={quoteForm.description}
                  onChange={handleQuoteFormChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Ürün hakkında detaylı bilgi veya özel isteklerinizi yazabilirsiniz..."
                />
              </div>

              {/* Butonlar */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleQuoteCancel}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 text-white rounded-md transition-colors"
                  style={{backgroundColor: '#1a3056'}}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0f1f3a'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1a3056'}
                >
                  Teklif Al
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  )
}



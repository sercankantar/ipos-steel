'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download, FileText, X } from 'lucide-react'
import Link from 'next/link'
import { showToast } from '@/components/Toast'

function getBaseUrl() {
  return typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:3000'
}

async function getGesProduct(id: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  const res = await fetch(`${base}/api/ges-products/${id}`, { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  })
  if (!res.ok) return null
  return res.json()
}

export default function GesProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
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
    const fetchData = async () => {
      try {
        const productData = await getGesProduct(params.id)
        setProduct(productData)
      } catch (error) {
        console.error('Veri yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [params.id])

  const handleQuoteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuoteForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product?.name,
          productId: product?.id,
          productType: 'GesProduct',
          firstName: quoteForm.firstName,
          lastName: quoteForm.lastName,
          phone: quoteForm.phone,
          city: quoteForm.city,
          email: quoteForm.email,
          description: quoteForm.description
        })
      })

      if (response.ok) {
        showToast('Teklif talebiniz başarıyla gönderildi!', 'success')
        setIsQuoteModalOpen(false)
        setQuoteForm({
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          email: '',
          description: ''
        })
      } else {
        showToast('Teklif talebi gönderilemedi. Lütfen tekrar deneyin.', 'error')
      }
    } catch (error) {
      console.error('Teklif talebi gönderme hatası:', error)
      showToast('Teklif talebi gönderilemedi. Lütfen tekrar deneyin.', 'error')
    }
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
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
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
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, isQuoteModalOpen])

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
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

  // Görselleri topla
  const images = []
  if (product.mainImageUrl) images.push(product.mainImageUrl)  // Ana fotoğraf
  // Bonus fotoğraflar (2-5. sıra)
  if (product.bonusImage1Url) images.push(product.bonusImage1Url)
  if (product.bonusImage2Url) images.push(product.bonusImage2Url)
  if (product.bonusImage3Url) images.push(product.bonusImage3Url)
  if (product.bonusImage4Url) images.push(product.bonusImage4Url)
  // Diğer fotoğraflar (6-8. sıra)
  if (product.image1Url) images.push(product.image1Url)
  if (product.image2Url) images.push(product.image2Url)
  if (product.image3Url) images.push(product.image3Url)

  // Teknik özellikleri parse et
  const technicalSpecs = Array.isArray(product.technicalSpecs) ? product.technicalSpecs : []

  return (
    <MaxWidthWrapper>
      {/* Breadcrumb */}
      <nav className="py-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-800">Ana Sayfa</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-gray-800">Ürünler</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">Solar Montaj Sistemleri</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">{product.name}</span>
        </div>
      </nav>

      <div className="py-6">
        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Sol taraf - Görsel */}
          <div className="space-y-4">
            <div 
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src={images[selectedImageIndex] || '/placeholder-product-1.jpg'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Küçük görseller */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'border-blue-600 ring-2 ring-blue-200' 
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
            )}
          </div>

          {/* Sağ taraf - Ürün Bilgileri */}
          <div className="space-y-6">
            <div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            </div>

            {/* Teknik Özellikler Tablosu */}
            {technicalSpecs.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {technicalSpecs.map((spec: any, index: number) => (
                    <div key={index} className="flex">
                      <div className="w-1/2 px-6 py-3 bg-gray-50 border-r border-gray-200 font-medium text-gray-800">
                        {spec.property}
                      </div>
                      <div className="w-1/2 px-6 py-3 text-gray-700">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Katalog İndirme */}
            {product.catalog && (
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Katalog kartı</p>
                    <p className="text-sm text-gray-600">{product.catalog.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCatalogDownload(product.catalog.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>İndir</span>
                </button>
              </div>
            )}

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
          </div>
        </div>

        {/* Dayanıklı ve Güvenilir Bölümü */}
        {(product.description1 || product.description2 || product.description3) && (
          <div className="space-y-12 mb-16">
            {/* İlk Açıklama */}
            {product.description1 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div 
                      className="prose max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.description1 }}
                    />
                  </div>
                  {product.image1Url && (
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={product.image1Url} 
                        alt="Ürün detay"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* İkinci Açıklama */}
            {product.description2 && (
              <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {product.image2Url && (
                    <div className="rounded-lg overflow-hidden shadow-lg lg:order-first">
                      <img 
                        src={product.image2Url} 
                        alt="Ürün detay"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  <div className={product.image2Url ? 'lg:order-last' : ''}>
                    <div 
                      className="prose max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.description2 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Üçüncü Açıklama */}
            {product.description3 && (
              <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div 
                      className="prose max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.description3 }}
                    />
                  </div>
                  {product.image3Url && (
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={product.image3Url} 
                        alt="Ürün detay"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tam ekran görsel modal'ı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={images[selectedImageIndex] || '/placeholder-product-1.jpg'}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {selectedImageIndex < images.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Teklif Al Modal'ı */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Teklif Al</h2>
              <button
                onClick={handleQuoteCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Adınızı girin"
                />
              </div>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Soyadınızı girin"
                />
              </div>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0555 123 45 67"
                />
              </div>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şehrinizi girin"
                />
              </div>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  value={quoteForm.description}
                  onChange={handleQuoteFormChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Ürün hakkında detaylı bilgi veya özel isteklerinizi yazabilirsiniz..."
                />
              </div>

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
                  className="flex-1 py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
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

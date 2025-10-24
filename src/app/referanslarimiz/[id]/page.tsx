"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Calendar, User, Eye, ArrowLeft, Share2, MapPin, Building, DollarSign, Clock, ChevronLeft, ChevronRight, X, Copy, Facebook, Twitter, Linkedin, MessageCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
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

export default function ReferansDetayPage() {
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [referans, setReferans] = useState<Reference | null>(null)
  const [loading, setLoading] = useState(true)
  const [dbCategories, setDbCategories] = useState<{name: string, color: string}[]>([])
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      const slugOrId = params.id as string
      try {
        setLoading(true)
        
        // Kategorileri çek
        const categoriesResponse = await fetch('/api/reference-categories')
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          setDbCategories(Array.isArray(categoriesData) ? categoriesData : [])
        } else {
          setDbCategories([])
        }
        
        // Önce slug ile dene
        try {
          const slugResponse = await fetch(`/api/references/${slugOrId}`)
          if (slugResponse.ok) {
            const referenceData = await slugResponse.json()
            setReferans(referenceData)
            // Görüntülenme sayısını artır
            try {
              await fetch(`/api/references/${referenceData.id}/view`, { method: 'POST' })
            } catch (error) {
              console.log('View count update failed:', error)
            }
            return
          }
        } catch (error) {
          console.log('Slug fetch failed, trying with ID:', error)
        }
        
        // Slug ile bulunamazsa, tüm referansları çekip ID ile ara
        const referencesResponse = await fetch('/api/references')
        if (referencesResponse.ok) {
          const references = await referencesResponse.json()
          const found = references.find((r: Reference) => String(r.id) === String(slugOrId))
          if (found) {
            setReferans(found)
            // Görüntülenme sayısını artır
            try {
              await fetch(`/api/references/${found.id}/view`, { method: 'POST' })
            } catch (error) {
              console.log('View count update failed:', error)
            }
          } else {
            // Veritabanında bulunamadı
            setReferans(null)
          }
        } else {
          console.error('Referanslar yüklenemedi:', referencesResponse.status)
          setReferans(null)
        }
      } catch (error) {
        console.error('Referans yüklenirken hata:', error)
        setReferans(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id])

  // Keyboard event listener for ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGalleryOpen) return
      
      if (event.key === 'Escape') {
        setIsGalleryOpen(false)
        setSelectedImageIndex(null)
      } else if (event.key === 'ArrowLeft') {
        navigateGallery('prev')
      } else if (event.key === 'ArrowRight') {
        navigateGallery('next')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isGalleryOpen, selectedImageIndex, referans])

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!referans?.gallery || selectedImageIndex === null) return
    
    const totalImages = referans.gallery.length
    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex === 0 ? totalImages - 1 : selectedImageIndex - 1)
    } else {
      setSelectedImageIndex(selectedImageIndex === totalImages - 1 ? 0 : selectedImageIndex + 1)
    }
  }

  const openGallery = (index: number) => {
    setSelectedImageIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    setSelectedImageIndex(null)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = (platform: string) => {
    const title = referans?.title || referans?.name || 'IPOS-Steel Referansı'
    const text = referans?.excerpt || `${referans?.client || referans?.name} projesi hakkında detaylar`
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' - ' + shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`
    }

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <MaxWidthWrapper>
          <div className='py-12'>
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (!referans) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <MaxWidthWrapper>
          <div className='py-12 text-center'>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
            <h1 className='font-neuropol text-2xl font-bold text-gray-900 mb-4'>
              Referans Bulunamadı
            </h1>
            <p className='text-gray-600 mb-8'>
              Aradığınız referans mevcut değil veya kaldırılmış olabilir.
            </p>
            <Link
              href='/referanslarimiz'
              className='inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
            >
              <ArrowLeft className='h-4 w-4' />
              Referanslarımıza Dön
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  const galleryImages = referans.gallery || []
  if (referans.mainImage && !galleryImages.includes(referans.mainImage)) {
    galleryImages.unshift(referans.mainImage)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Breadcrumb ve Geri Dön */}
      <div className='bg-white border-b border-gray-200'>
        <MaxWidthWrapper>
          <div className='py-6'>
            <nav className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
              <Link href='/' className='hover:text-gray-700 transition-colors'>Ana Sayfa</Link>
              <span>/</span>
              <Link href='/referanslarimiz' className='hover:text-gray-700 transition-colors'>Referanslarımız</Link>
              <span>/</span>
              <span className='text-gray-900'>{referans.title || 'Başlıksız Proje'}</span>
            </nav>
            
            <Link
              href='/referanslarimiz'
              className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors'
            >
              <ArrowLeft className='h-4 w-4' />
              Referanslarımıza Dön
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            
            {/* Sol Kolon - Ana İçerik */}
            <div className='lg:col-span-2'>
              
              {/* Başlık ve Meta Bilgiler */}
              <div className='mb-8'>
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(referans.category || referans.sector, dbCategories)}`}>
                      {referans.category || referans.sector}
                    </span>
                    {referans.featured && (
                      <span className='px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium'>
                        Öne Çıkan
                      </span>
                    )}
                  </div>
                  
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                      <Eye className='h-4 w-4' />
                      <span>{referans.views || 0}</span>
                    </div>
                    <button
                      onClick={() => setIsShareOpen(true)}
                      className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors'
                    >
                      <Share2 className='h-4 w-4' />
                      <span>Paylaş</span>
                    </button>
                  </div>
                </div>
                
                <h1 className='font-neuropol text-3xl lg:text-4xl font-bold text-slate-900 mb-4'>
                  {referans.title || 'Başlıksız Proje'}
                </h1>
                
                {referans.excerpt && (
                  <p className='text-xl text-gray-600 leading-relaxed mb-6'>
                    {referans.excerpt}
                  </p>
                )}
                
                <div className='flex items-center gap-6 text-sm text-gray-500'>
                  {referans.projectDate && (
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-4 w-4' />
                      <span>{new Date(referans.projectDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                  )}
                  {referans.location && (
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{referans.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ana Görsel */}
              {(referans.mainImage || galleryImages.length > 0) && (
                <div className='mb-8'>
                  <div 
                    className='relative aspect-video rounded-lg overflow-hidden cursor-pointer group'
                    onClick={() => openGallery(0)}
                  >
                    <Image
                      src={referans.mainImage || galleryImages[0] || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop'}
                      alt={referans.title || 'Proje Görseli'}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3'>
                        <Eye className='h-6 w-6 text-gray-900' />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Galeri */}
              {galleryImages.length > 1 && (
                <div className='mb-8'>
                  <h3 className='font-neuropol font-bold text-lg mb-4 text-slate-900'>Proje Galerisi</h3>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {galleryImages.slice(1, 7).map((image, index) => (
                      <div
                        key={index}
                        className='relative aspect-video rounded-lg overflow-hidden cursor-pointer group'
                        onClick={() => openGallery(index + 1)}
                      >
                        <Image
                          src={image}
                          alt={`${referans.title || 'Proje Görseli'} - Görsel ${index + 2}`}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300' />
                      </div>
                    ))}
                    {galleryImages.length > 7 && (
                      <div
                        className='relative aspect-video rounded-lg overflow-hidden cursor-pointer group bg-gray-900 flex items-center justify-center'
                        onClick={() => openGallery(7)}
                      >
                        <div className='text-white text-center'>
                          <span className='text-2xl font-bold'>+{galleryImages.length - 7}</span>
                          <p className='text-sm'>Daha fazla</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* İçerik */}
              <div className='bg-white rounded-lg shadow-sm p-8'>
                <div className='prose prose-lg max-w-none'>
                  <div dangerouslySetInnerHTML={{ __html: referans.content || `<p>${referans.excerpt || `${referans.sector} sektöründe gerçekleştirdiğimiz ${referans.name} projesi.`}</p>` }} />
                </div>

                {/* Etiketler */}
                {referans.tags && referans.tags.length > 0 && (
                  <div className='mt-8 pt-6 border-t border-gray-200'>
                    <h4 className='text-sm font-semibold text-gray-900 mb-3'>Etiketler</h4>
                    <div className='flex flex-wrap gap-2'>
                      {referans.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className='px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Paylaş */}
                <div className='mt-8 pt-6 border-t border-gray-200'>
                  <h4 className='text-sm font-semibold text-gray-900 mb-3'>Bu projeyi paylaş</h4>
                  <div className='flex gap-3'>
                    <button
                      onClick={() => handleShare('facebook')}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'
                    >
                      <Facebook className='h-4 w-4' />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className='flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm'
                    >
                      <Twitter className='h-4 w-4' />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm'
                    >
                      <Linkedin className='h-4 w-4' />
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-8 space-y-6'>
                
                {/* Proje Bilgileri */}
                <div className='bg-white rounded-lg shadow-sm p-6'>
                  <h3 className='font-neuropol font-bold text-lg mb-4 text-slate-900'>Proje Bilgileri</h3>
                  <div className='space-y-4'>
                    {referans.location && (
                      <div>
                        <div className='flex items-center gap-2 text-sm text-gray-500 mb-1'>
                          <MapPin className='h-4 w-4' />
                          <span>Konum</span>
                        </div>
                        <p className='font-medium text-gray-900'>{referans.location}</p>
                      </div>
                    )}
                    
                    {referans.projectDate && (
                      <div>
                        <div className='flex items-center gap-2 text-sm text-gray-500 mb-1'>
                          <Calendar className='h-4 w-4' />
                          <span>Proje Tarihi</span>
                        </div>
                        <p className='font-medium text-gray-900'>
                          {new Date(referans.projectDate).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* İletişim */}
                <div className='bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white'>
                  <h3 className='font-neuropol font-bold text-lg mb-3'>Benzer Bir Proje Mi İstiyorsunuz?</h3>
                  <p className='text-blue-100 mb-4 text-sm'>
                    Uzman ekibimizle iletişime geçin ve projeniz için özel çözümler keşfedin.
                  </p>
                  <Link
                    href='/iletisim'
                    className='inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm w-full justify-center'
                  >
                    <Mail className='h-4 w-4' />
                    İletişime Geç
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Galeri Modal */}
      {isGalleryOpen && selectedImageIndex !== null && (
        <div className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'>
          <div className='relative w-full h-full flex items-center justify-center p-4'>
            {/* Kapat Butonu */}
            <button
              onClick={closeGallery}
              className='absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors'
            >
              <X className='h-6 w-6 text-white' />
            </button>

            {/* Önceki Buton */}
            {galleryImages.length > 1 && (
              <button
                onClick={() => navigateGallery('prev')}
                className='absolute left-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors'
              >
                <ChevronLeft className='h-6 w-6 text-white' />
              </button>
            )}

            {/* Ana Görsel */}
            <div className='relative max-w-4xl max-h-full'>
              <Image
                src={galleryImages[selectedImageIndex]}
                alt={`${referans.title || referans.name} - Görsel ${selectedImageIndex + 1}`}
                width={1200}
                height={800}
                className='max-w-full max-h-full object-contain'
              />
            </div>

            {/* Sonraki Buton */}
            {galleryImages.length > 1 && (
              <button
                onClick={() => navigateGallery('next')}
                className='absolute right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors'
              >
                <ChevronRight className='h-6 w-6 text-white' />
              </button>
            )}

            {/* Görsel Sayacı */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 rounded-full px-4 py-2'>
              <span className='text-white text-sm'>
                {selectedImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Paylaş Modal */}
      {isShareOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-semibold text-lg'>Projeyi Paylaş</h3>
              <button
                onClick={() => setIsShareOpen(false)}
                className='text-gray-400 hover:text-gray-600'
              >
                <X className='h-5 w-5' />
              </button>
            </div>
            
            <div className='space-y-3'>
              <button
                onClick={() => handleShare('facebook')}
                className='w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'
              >
                <Facebook className='h-5 w-5 text-blue-600' />
                <span>Facebook'ta Paylaş</span>
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className='w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'
              >
                <Twitter className='h-5 w-5 text-sky-500' />
                <span>Twitter'da Paylaş</span>
              </button>
              
              <button
                onClick={() => handleShare('linkedin')}
                className='w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'
              >
                <Linkedin className='h-5 w-5 text-blue-700' />
                <span>LinkedIn'de Paylaş</span>
              </button>
              
              <button
                onClick={() => handleShare('whatsapp')}
                className='w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'
              >
                <MessageCircle className='h-5 w-5 text-green-600' />
                <span>WhatsApp'ta Paylaş</span>
              </button>
              
              <button
                onClick={() => handleShare('email')}
                className='w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors'
              >
                <Mail className='h-5 w-5 text-gray-600' />
                <span>E-posta ile Gönder</span>
              </button>
              
              <div className='border-t pt-3'>
                <div className='flex items-center gap-2'>
                  <input
                    type='text'
                    value={shareUrl}
                    readOnly
                    className='flex-1 p-2 border border-gray-200 rounded text-sm bg-gray-50'
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      copySuccess
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {copySuccess ? 'Kopyalandı!' : 'Kopyala'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
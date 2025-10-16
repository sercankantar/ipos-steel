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
  name: string
  sector: string
  logoUrl?: string
  title?: string
  excerpt?: string
  content?: string
  category?: string
  location?: string
  client?: string
  projectValue?: string
  duration?: string
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

// Fallback statik referanslar
const staticReferences = [
  {
    id: 1,
    title: 'Güneş Enerjisi Santrali Kablo Altyapısı',
    excerpt: 'Ankara\'da kurulu 50 MW güneş enerjisi santrali için kapsamlı kablo tavaları ve elektrik altyapı çözümleri sağladık.',
    content: `
      <p>IPOS-Steel olarak, Ankara'nın en büyük güneş enerjisi santrallerinden biri olan 50 MW kapasiteli projeye kapsamlı elektrik altyapı çözümleri sağladık.</p>
      
      <h3>Proje Detayları</h3>
      <p>Proje kapsamında toplam 15 km kablo tavaları, 200 adet destek sistemi ve özel tasarım montaj aksesuarları tedarik edildi. Tüm ürünler IP65 koruma sınıfında ve UV dayanımlı malzemelerden üretildi.</p>
      
      <p>Proje Müdürü Mehmet Yılmaz: "IPOS-Steel'in sağladığı çözümler sayesinde montaj süremizi %30 kısalttık ve maliyet tasarrufu sağladık."</p>
      
      <h3>Teknik Özellikler</h3>
      <p>Kullanılan kablo tavaları 600V gerilim seviyesine uygun, galvanizli çelik malzemeden üretildi. Özel anti-korozyon kaplama ile 25 yıl garanti verildi.</p>
      
      <h3>Çevresel Etki</h3>
      <p>Proje ile yılda 75.000 ton CO2 emisyon tasarrufu sağlanacak. Sürdürülebilir enerji üretiminde IPOS-Steel çözümleri kritik rol oynuyor.</p>
    `,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop'
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
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop'
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
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop'
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
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop'
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
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  // Paylaş fonksiyonları
  const handleShare = async () => {
    if (!referans) return
    
    const shareData = {
      title: referans.title || referans.name,
      text: referans.excerpt || `${referans.client || referans.name} projesi hakkında detaylar`,
      url: window.location.href
    }

    // Modern Web Share API varsa kullan
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Paylaşım iptal edildi')
      }
    } else {
      // Fallback: Paylaş menüsünü aç
      setShareMenuOpen(true)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link kopyalandı!')
      setShareMenuOpen(false)
    } catch (error) {
      console.error('Kopyalama hatası:', error)
    }
  }

  const shareToSocial = (platform: string) => {
    if (!referans) return
    
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(referans.title || referans.name)
    const text = encodeURIComponent(referans.excerpt || `${referans.client || referans.name} projesi`)
    
    let shareUrl = ''
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${url}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
      setShareMenuOpen(false)
    }
  }

  // Paylaş menüsünü dışarı tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuOpen && !(event.target as Element).closest('.share-menu')) {
        setShareMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [shareMenuOpen])

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
            // API'de bulunamadıysa statik veriden ara
            const staticFound = staticReferences.find(r => String(r.id) === String(slugOrId))
            setReferans(staticFound || null)
          }
        } else {
          // API hatası durumunda statik veri kullan
          const found = staticReferences.find(r => String(r.id) === String(slugOrId))
          setReferans(found || null)
        }
      } catch (error) {
        console.error('Referans yüklenirken hata:', error)
        // Hata durumunda statik veri kullan
        const found = staticReferences.find(r => String(r.id) === String(slugOrId))
        setReferans(found || null)
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
        closeGallery()
      }
      if (event.key === 'ArrowLeft' && referans?.gallery && referans.gallery.length > 1) {
        prevImage()
      }
      if (event.key === 'ArrowRight' && referans?.gallery && referans.gallery.length > 1) {
        nextImage()
      }
    }

    if (isGalleryOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isGalleryOpen, selectedImageIndex, referans])
  
  // Galeri fonksiyonları
  const openGallery = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    if (referans?.gallery && selectedImageIndex !== null && referans.gallery.length > 0) {
      setSelectedImageIndex((selectedImageIndex + 1) % referans.gallery.length)
    }
  }

  const prevImage = () => {
    if (referans?.gallery && selectedImageIndex !== null && referans.gallery.length > 0) {
      setSelectedImageIndex(selectedImageIndex === 0 ? referans.gallery.length - 1 : selectedImageIndex - 1)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  if (!referans) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Referans Bulunamadı</h1>
          <Link href='/referanslarimiz' className='text-blue-600 hover:text-blue-800'>
            Referanslar sayfasına dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-12'>
        <MaxWidthWrapper>
          <div className='text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/referanslarimiz' className='hover:text-white transition-colors'>Referanslarımız</Link>
              <span className='mx-2'>/</span>
              <span>{referans.title || referans.name}</span>
            </nav>
            
            <div className='flex items-center gap-4 mb-6'>
              <Link
                href='/referanslarimiz'
                className='flex items-center gap-2 text-gray-300 hover:text-white transition-colors'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Geri Dön</span>
              </Link>
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2'>
                <h1 className='font-neuropol text-3xl lg:text-4xl font-bold mb-4'>
                  {referans.title || referans.name}
                </h1>
                <p className='text-lg text-gray-300 mb-6'>
                  {referans.excerpt || `${referans.sector} sektöründe gerçekleştirdiğimiz ${referans.name} projesi.`}
                </p>
              </div>
              
              <div className='bg-gray-800 p-6 rounded-lg'>
                <h3 className='text-lg font-semibold mb-4'>Proje Bilgileri</h3>
                <div className='space-y-3 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Tarih:</span>
                    <span>{new Date(referans.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Konum:</span>
                    <span>{referans.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Building className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Müşteri:</span>
                    <span>{referans.client || referans.name}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <DollarSign className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Proje Değeri:</span>
                    <span>{referans.projectValue}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Süre:</span>
                    <span>{referans.duration}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Eye className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Görüntülenme:</span>
                    <span>{referans.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Ana İçerik */}
            <div className='lg:col-span-2'>
              {/* Ana Görsel */}
              <div className='mb-8'>
                <div className='relative h-96 rounded-lg overflow-hidden cursor-pointer' onClick={() => openGallery(0)}>
                  <Image
                    src={referans.gallery?.[0] || referans.mainImage || referans.image || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop'}
                    alt={referans.title || referans.name}
                    fill
                    className='object-cover hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300'></div>
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium'>
                    {referans.gallery?.length || 1} Fotoğraf
                  </div>
                </div>
              </div>

              {/* İçerik */}
              <div className='bg-white rounded-lg shadow-sm p-8'>
                <div className='prose prose-lg max-w-none'>
                  <div dangerouslySetInnerHTML={{ __html: referans.content }} />
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
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-semibold text-gray-900'>Bu projeyi paylaş</h4>
                    <div className='relative'>
                      <button 
                        onClick={handleShare}
                        className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                      >
                        <Share2 className='w-4 h-4' />
                        <span>Paylaş</span>
                      </button>

                      {/* Paylaş Menüsü */}
                      {shareMenuOpen && (
                        <div className='share-menu absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50'>
                          <div className='flex items-center justify-between mb-3'>
                            <h5 className='text-sm font-semibold text-gray-900'>Paylaş</h5>
                            <button 
                              onClick={() => setShareMenuOpen(false)}
                              className='text-gray-400 hover:text-gray-600'
                            >
                              <X className='w-4 h-4' />
                            </button>
                          </div>
                          
                          {/* Sosyal Medya Butonları */}
                          <div className='grid grid-cols-2 gap-2 mb-3'>
                            <button
                              onClick={() => shareToSocial('facebook')}
                              className='flex items-center gap-2 p-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                            >
                              <Facebook className='w-4 h-4' />
                              Facebook
                            </button>
                            <button
                              onClick={() => shareToSocial('twitter')}
                              className='flex items-center gap-2 p-2 text-sm text-sky-600 hover:bg-sky-50 rounded-md transition-colors'
                            >
                              <Twitter className='w-4 h-4' />
                              Twitter
                            </button>
                            <button
                              onClick={() => shareToSocial('linkedin')}
                              className='flex items-center gap-2 p-2 text-sm text-blue-700 hover:bg-blue-50 rounded-md transition-colors'
                            >
                              <Linkedin className='w-4 h-4' />
                              LinkedIn
                            </button>
                            <button
                              onClick={() => shareToSocial('whatsapp')}
                              className='flex items-center gap-2 p-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors'
                            >
                              <MessageCircle className='w-4 h-4' />
                              WhatsApp
                            </button>
                          </div>

                          {/* Email ve Link Kopyala */}
                          <div className='space-y-2 pt-3 border-t border-gray-100'>
                            <button
                              onClick={() => shareToSocial('email')}
                              className='w-full flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors'
                            >
                              <Mail className='w-4 h-4' />
                              E-posta ile gönder
                            </button>
                            <button
                              onClick={copyToClipboard}
                              className='w-full flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors'
                            >
                              <Copy className='w-4 h-4' />
                              Linki kopyala
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yan Panel */}
            <div className='space-y-6'>
              {/* Kategori */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Kategori</h3>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(referans.category || referans.sector, dbCategories)}`}>
                  {referans.category || referans.sector}
                </span>
              </div>

              {/* Galeri Önizleme */}
              {referans.gallery && referans.gallery.length > 1 && (
                <div className='bg-white rounded-lg shadow-sm p-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Proje Galerisi</h3>
                  <div className='grid grid-cols-2 gap-2'>
                    {referans.gallery.slice(0, 4).map((img: string, index: number) => (
                      <div
                        key={index}
                        className='relative h-20 rounded cursor-pointer overflow-hidden'
                        onClick={() => openGallery(index)}
                      >
                        <Image
                          src={img}
                          alt={`${referans.title} - ${index + 1}`}
                          fill
                          className='object-cover hover:scale-110 transition-transform duration-300'
                        />
                        {index === 3 && referans.gallery.length > 4 && (
                          <div className='absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-medium'>
                            +{referans.gallery.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* İletişim CTA */}
              <div className='bg-blue-50 rounded-lg p-6 border border-blue-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>Benzer Bir Proje mi İstiyorsunuz?</h3>
                <p className='text-gray-600 text-sm mb-4'>
                  Elektrik altyapı çözümlerimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.
                </p>
                <Link
                  href='/iletisim'
                  className='block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Galeri Modal */}
      {isGalleryOpen && referans?.gallery && selectedImageIndex !== null && referans.gallery[selectedImageIndex] && (
        <div 
          className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
          onClick={closeGallery}
        >
          <div 
            className='relative max-w-4xl max-h-full'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative h-[80vh] w-full min-w-[60vw]'>
              <Image
                src={referans.gallery[selectedImageIndex]}
                alt={`${referans.title} - ${selectedImageIndex + 1}`}
                fill
                className='object-contain'
                priority
              />
              
              {/* Close button inside the image container */}
              <button
                onClick={closeGallery}
                className='absolute top-4 right-4 text-white hover:text-gray-300 z-30 bg-black/70 hover:bg-black/90 rounded-full p-2 transition-all duration-200'
              >
                <X className='w-5 h-5' />
              </button>
              
              {/* Navigation buttons inside the image container */}
              {referans.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/70 hover:bg-black/90 rounded-full p-3 transition-all duration-200 z-20'
                  >
                    <ChevronLeft className='w-6 h-6' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/70 hover:bg-black/90 rounded-full p-3 transition-all duration-200 z-20'
                  >
                    <ChevronRight className='w-6 h-6' />
                  </button>
                </>
              )}
            </div>

            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-full font-medium'>
              {selectedImageIndex + 1} / {referans.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

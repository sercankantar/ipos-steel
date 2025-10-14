"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Calendar, User, Eye, ArrowLeft, Share2, MapPin, Building, DollarSign, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Statik referanslar (referanslarimiz/page.tsx ile aynı)
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

export default function ReferansDetayPage() {
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [referans, setReferans] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const id = params.id as string
      try {
        // API çağrısı burada olacak, şimdilik statik veri kullanıyoruz
        const found = staticReferences.find(r => String(r.id) === String(id))
        setReferans(found || null)
      } catch {
        setReferans(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id])
  
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
    if (referans?.gallery && selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % referans.gallery.length)
    }
  }

  const prevImage = () => {
    if (referans?.gallery && selectedImageIndex !== null) {
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
              <span>{referans.title}</span>
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
                  {referans.title}
                </h1>
                <p className='text-lg text-gray-300 mb-6'>
                  {referans.excerpt}
                </p>
              </div>
              
              <div className='bg-gray-800 p-6 rounded-lg'>
                <h3 className='text-lg font-semibold mb-4'>Proje Bilgileri</h3>
                <div className='space-y-3 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Tarih:</span>
                    <span>{new Date(referans.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Konum:</span>
                    <span>{referans.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Building className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-300'>Müşteri:</span>
                    <span>{referans.client}</span>
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
                    src={referans.image}
                    alt={referans.title}
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
                    <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                      <Share2 className='w-4 h-4' />
                      <span>Paylaş</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Yan Panel */}
            <div className='space-y-6'>
              {/* Kategori */}
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Kategori</h3>
                <span className='inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'>
                  {referans.category}
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
      {isGalleryOpen && referans.gallery && selectedImageIndex !== null && (
        <div className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'>
          <div className='relative max-w-4xl max-h-full'>
            <button
              onClick={closeGallery}
              className='absolute top-4 right-4 text-white hover:text-gray-300 z-10'
            >
              <X className='w-8 h-8' />
            </button>
            
            <div className='relative h-[80vh] w-full'>
              <Image
                src={referans.gallery[selectedImageIndex]}
                alt={`${referans.title} - ${selectedImageIndex + 1}`}
                fill
                className='object-contain'
              />
            </div>

            {referans.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300'
                >
                  <ChevronLeft className='w-8 h-8' />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300'
                >
                  <ChevronRight className='w-8 h-8' />
                </button>
              </>
            )}

            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm'>
              {selectedImageIndex + 1} / {referans.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

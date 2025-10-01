"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Calendar, User, Eye, ArrowLeft, Share2, BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Fallback statik içerik (API başarısız olursa)
const staticNews = [
  {
    id: 1,
    title: 'IPOS Steel Yeni Üretim Tesisini Açtı',
    excerpt: 'Kocaeli\'deki yeni tesisimizle üretim kapasitemizi %40 artırdık. Modern teknoloji ile donatılmış tesis, busbar sistemleri üretiminde Türkiye\'nin en büyük tesisi olma özelliğini taşıyor.',
    content: `
      <p>IPOS Steel, Kocaeli Dilovası'nda açtığı yeni üretim tesisiyle elektrik dağıtım sistemleri sektöründe önemli bir adım attı. 25 milyon TL yatırımla hayata geçirilen proje, şirketin üretim kapasitesini %40 oranında artırdı.</p>
      
      <h3>Modern Teknoloji ve Yüksek Kapasite</h3>
      <p>Yeni tesis, toplam 15.000 m² kapalı alana sahip olup, son teknoloji makinelerle donatıldı. Tesiste busbar sistemleri, kablo kanalları ve askı sistemleri üretimi gerçekleştiriliyor.</p>
      
      <p>Tesis Genel Müdürü Ahmet Kaya, "Bu yeni yatırımımızla Türkiye'nin en büyük busbar üretim tesisine sahip olduk. Günlük 500 km kablo kanalı üretim kapasitemiz var" dedi.</p>
      
      <h3>İstihdam ve İhracat Hedefleri</h3>
      <p>Yeni tesisle birlikte 150 kişilik yeni istihdam sağlandı. Şirket, 2025 yılında ihracat hedefini 15 milyon dolara çıkarmayı planlıyor.</p>
      
      <p>Avrupa ve Orta Doğu pazarlarına yönelik üretim yapan tesis, UL ve CE sertifikalarına sahip ürünler üretiyor.</p>
      
      <h3>Çevre Dostu Üretim</h3>
      <p>Tesis, ISO 14001 çevre yönetim sistemi kapsamında çevre dostu üretim prensiplerine uygun olarak tasarlandı. Enerji verimliliği %30 artırıldı.</p>
    `,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop'
    ],
    date: '2024-09-15',
    author: 'IPOS Steel Medya',
    category: 'Şirket Haberleri',
    views: 1250,
    featured: true,
    tags: ['yatırım', 'üretim', 'teknoloji', 'istihdam']
  },
  {
    id: 2,
    title: 'Avrupa Pazarına İhracat Başarısı',
    excerpt: 'Almanya ve Hollanda\'ya gerçekleştirdiğimiz ihracatlarla Avrupa pazarındaki varlığımızı güçlendiriyoruz. UL ve CE sertifikalarımız sayesinde uluslararası standartlarda üretim yapıyoruz.',
    content: `
      <p>IPOS Steel, Avrupa pazarındaki büyüme stratejisini hayata geçirmek için önemli adımlar atıyor. Almanya ve Hollanda'daki stratejik ortaklarımızla imzalanan yeni distribütörlük anlaşmaları, şirketin uluslararası varlığını güçlendiriyor.</p>
      
      <h3>Stratejik Ortaklıklar</h3>
      <p>Almanya'nın önde gelen elektrik dağıtım şirketi EuroElektrik ile imzalanan 5 yıllık anlaşma kapsamında, yıllık 2 milyon Euro değerinde ürün tedariki sağlanacak.</p>
      
      <p>Hollanda merkezli TechnoGrid şirketi ile de benzer bir anlaşma imzalandı. Bu anlaşma ile Benelüks ülkelerindeki pazar payı artırılacak.</p>
      
      <h3>Kalite Standartları</h3>
      <p>UL ve CE sertifikalarına sahip ürünlerimiz, Avrupa pazarının yüksek kalite standartlarını karşılıyor. Ürünlerimiz IEC 61439 standardına uygun olarak üretiliyor.</p>
      
      <h3>Gelecek Hedefleri</h3>
      <p>2025 yılında Avrupa pazarında %30 büyüme hedefleniyor. Fransa ve İtalya pazarlarına da giriş planlanıyor.</p>
    `,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=1200&h=800&fit=crop'
    ],
    date: '2024-09-10',
    author: 'İhracat Departmanı',
    category: 'İhracat',
    views: 890,
    featured: true,
    tags: ['ihracat', 'avrupa', 'ortaklık', 'büyüme']
  },
  {
    id: 3,
    title: 'Yeni Sismik Test Laboratuvarı Açıldı',
    excerpt: 'Ürünlerimizin deprem güvenliği testlerini kendi tesisimizde gerçekleştireceğimiz modern laboratuvar hizmete girdi. IEC 60068 standartlarında test imkanı sunuyor.',
    content: `
      <p>IPOS Steel, kalite kontrol süreçlerini geliştirmek amacıyla modern sismik test laboratuvarını hizmete aldı. Laboratuvar, ürünlerin deprem güvenliği testlerini IEC 60068 standartlarında gerçekleştiriyor.</p>
      
      <h3>Test Kapasiteleri</h3>
      <p>Yeni laboratuvarda 8.0 büyüklüğündeki depremleri simüle edebilen test cihazları bulunuyor. Busbar sistemleri ve kablo kanalları için kapsamlı dayanıklılık testleri yapılabiliyor.</p>
      
      <h3>Kalite Güvencesi</h3>
      <p>Kendi laboratuvarımızda test imkanı sayesinde, ürünlerimizin kalitesini daha etkin bir şekilde kontrol edebiliyoruz. Bu da müşterilerimize daha güvenilir ürünler sunmamızı sağlıyor.</p>
    `,
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=800&fit=crop'
    ],
    date: '2024-09-05',
    author: 'Ar-Ge Departmanı',
    category: 'Teknoloji',
    views: 670,
    featured: false,
    tags: ['test', 'kalite', 'laboratuvar', 'güvenlik']
  },
  {
    id: 4,
    title: 'Sürdürülebilirlik Projesinde Önemli Adım',
    excerpt: 'Çevre dostu üretim süreçleri ve geri dönüşümlü malzeme kullanımı ile sürdürülebilir üretim hedeflerimize ulaşıyoruz. ISO 14001 çevre yönetim sistemi sertifikamız yenilendi.',
    content: `
      <p>IPOS Steel, sürdürülebilirlik alanındaki çalışmalarını sürdürüyor. ISO 14001 çevre yönetim sistemi sertifikamızın yenilenmesi ile birlikte, çevre dostu üretim süreçlerimizi geliştirmeye devam ediyoruz.</p>
      
      <h3>Geri Dönüşüm Projeleri</h3>
      <p>Üretim süreçlerimizde geri dönüşümlü malzeme kullanım oranını %25 artırdık. Atık yönetimi konusunda da önemli ilerlemeler kaydettik.</p>
      
      <h3>Enerji Verimliliği</h3>
      <p>Yenilenebilir enerji kaynaklarından yararlanma oranımızı %40'a çıkardık. Karbon ayak izimizi %25 azalttık.</p>
    `,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop'
    ],
    date: '2024-08-28',
    author: 'Çevre Departmanı',
    category: 'Çevre',
    views: 520,
    featured: false,
    tags: ['sürdürülebilirlik', 'çevre', 'geri-dönüşüm', 'enerji']
  },
  {
    id: 5,
    title: 'Dijital Dönüşüm Projesi Tamamlandı',
    excerpt: 'Üretim süreçlerimizde dijitalleşme adımları ile Endüstri 4.0 teknolojilerini entegre ettik. IoT sensörler ve yapay zeka destekli kalite kontrol sistemleri devreye alındı.',
    content: `
      <p>IPOS Steel, dijital dönüşüm sürecinde önemli bir kilometre taşını geride bıraktı. Endüstri 4.0 teknolojilerinin entegrasyonu ile üretim süreçlerinde önemli gelişmeler sağlandı.</p>
      
      <h3>IoT ve Sensör Teknolojileri</h3>
      <p>Üretim hatlarına yerleştirilen IoT sensörler sayesinde gerçek zamanlı veri takibi yapılabiliyor. Bu da üretim verimliliğini %35 artırdı.</p>
      
      <h3>Yapay Zeka Destekli Kalite Kontrol</h3>
      <p>Makine öğrenmesi algoritmaları kullanılarak geliştirilen kalite kontrol sistemi, hatalı ürünleri %99 doğrulukla tespit edebiliyor.</p>
    `,
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=800&fit=crop'
    ],
    date: '2024-08-20',
    author: 'IT Departmanı',
    category: 'Teknoloji',
    views: 780,
    featured: false,
    tags: ['dijital-dönüşüm', 'endüstri-4.0', 'iot', 'yapay-zeka']
  },
  {
    id: 6,
    title: 'Genç Mühendis Programa Katılım',
    excerpt: 'Üniversite mezunu genç mühendislere yönelik eğitim ve gelişim programımız başladı. 6 aylık rotasyon programı ile farklı departmanlarda deneyim kazanma imkanı sunuyoruz.',
    content: `
      <p>IPOS Steel, genç yetenekleri sektöre kazandırmak için yeni bir eğitim programı başlattı. Üniversite mezunu genç mühendislere yönelik 12 aylık rotasyon programı, farklı departmanlarda deneyim kazanma imkanı sunuyor.</p>
      
      <h3>Program İçeriği</h3>
      <p>Program kapsamında katılımcılar, üretim, kalite kontrol, ar-ge ve ihracat departmanlarında rotasyon yaparak sektörel deneyim kazanıyor.</p>
      
      <h3>Mentörlük Sistemi</h3>
      <p>Her katılımcıya deneyimli bir mühendis mentor atanıyor. Bu sayede teorik bilgilerin pratiğe dönüştürülmesi sağlanıyor.</p>
    `,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'
    ],
    date: '2024-08-15',
    author: 'İnsan Kaynakları',
    category: 'İnsan Kaynakları',
    views: 450,
    featured: false,
    tags: ['eğitim', 'genç-mühendis', 'rotasyon', 'mentörlük']
  }
]

export default function HaberDetayPage() {
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [haber, setHaber] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const id = params.id as string
      try {
        const res = await fetch(`/api/news/${id}`, { cache: 'no-store' })
        if (res.ok) {
          const d = await res.json()
          setHaber({
            id: d.id,
            title: d.title,
            excerpt: d.summary || '',
            content: d.content || '',
            image: d.imageUrl || '',
            gallery: d.imageUrl ? [d.imageUrl] : [],
            date: d.publishedAt,
            author: 'IPOS Steel',
            category: d.category,
            views: 0,
            tags: []
          })
          return
        }
        // Eğer tekil endpoint başarısızsa listeden bulmayı dene
        const listRes = await fetch('/api/news', { cache: 'no-store' })
        if (listRes.ok) {
          const list = await listRes.json()
          const d = (list as any[]).find((n) => String(n.id) === String(id))
          if (d) {
            setHaber({
              id: d.id,
              title: d.title,
              excerpt: d.summary || '',
              content: d.content || '',
              image: d.imageUrl || '',
              gallery: d.imageUrl ? [d.imageUrl] : [],
              date: d.publishedAt,
              author: 'IPOS Steel',
              category: d.category,
              views: 0,
              tags: []
            })
            return
          }
        }
      } catch {}
      finally {
        setLoading(false)
      }
      const fb = staticNews.find(n => String(n.id) === String(params.id))
      setHaber(fb || null)
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
    if (selectedImageIndex !== null && haber?.gallery && haber.gallery.length > 0) {
      const nextIndex = (selectedImageIndex + 1) % haber.gallery.length
      setSelectedImageIndex(nextIndex)
    }
  }

  const prevImage = () => {
    if (selectedImageIndex !== null && haber?.gallery && haber.gallery.length > 0) {
      const prevIndex = selectedImageIndex === 0 ? haber.gallery.length - 1 : selectedImageIndex - 1
      setSelectedImageIndex(prevIndex)
    }
  }

  // ESC tuşu ile galeri kapatma
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeGallery()
      } else if (event.key === 'ArrowLeft') {
        prevImage()
      } else if (event.key === 'ArrowRight') {
        nextImage()
      }
    }

    if (isGalleryOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isGalleryOpen, selectedImageIndex])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <MaxWidthWrapper>
          <div className="py-12 max-w-4xl mx-auto">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="aspect-video w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (!haber) {
    return (
      <div className="min-h-screen bg-white">
        <MaxWidthWrapper>
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Haber Bulunamadı</h1>
            <Link href="/haberler" className="text-blue-600 hover:text-blue-700">
              Haberler sayfasına dön
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Ana Sayfa</Link>
            <span className="text-gray-300">/</span>
            <Link href="/haberler" className="text-gray-500 hover:text-gray-700">Haberler</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Haber Detayı</span>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-12">
        <MaxWidthWrapper>
          <div className="max-w-4xl mx-auto">
            
            {/* Geri Dön Butonu */}
            <div className="mb-8">
              <Link
                href="/haberler"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Haberler'e Dön
              </Link>
            </div>

            {/* Haber Başlığı ve Meta Bilgiler */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-500 text-white px-3 py-1 rounded text-sm font-medium uppercase">
                  {haber.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(haber.date).toLocaleDateString('tr-TR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{haber.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{haber.views || 0} görüntülenme</span>
                  </div>
                </div>
              </div>
              
              <h1 className="font-neuropol text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {haber.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {haber.excerpt}
              </p>
            </header>

            {/* Ana Görsel Carousel */}
            <div className="mb-10">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                {/* Carousel İçeriği */}
                <div className="relative w-full h-full">
                  <img 
                    src={(haber.gallery && haber.gallery.length > 0 && selectedImageIndex !== null) ? haber.gallery[selectedImageIndex] : haber.image} 
                    alt={`${haber.title}`}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  
                  {/* Overlay için gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Sol Navigation */}
                {haber.gallery && haber.gallery.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {/* Sağ Navigation */}
                {haber.gallery && haber.gallery.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}

                {/* Dots Navigation */}
                {haber.gallery && haber.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {haber.gallery.map((_: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === selectedImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Görsel Sayacı */}
                {haber.gallery && haber.gallery.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {(selectedImageIndex ?? 0) + 1} / {haber.gallery.length}
                  </div>
                )}

                {/* Büyütme İkonu */}
                <button 
                  onClick={() => setIsGalleryOpen(true)}
                  className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Haber İçeriği */}
            <article className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: haber.content }}
              />
            </article>

            {/* Etiketler */}
            {haber.tags && Array.isArray(haber.tags) && haber.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Etiketler:</h3>
                <div className="flex flex-wrap gap-2">
                  {haber.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Paylaş */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: haber.title,
                        text: haber.excerpt,
                        url: window.location.href,
                      }).catch(console.error);
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Haber linki kopyalandı!');
                      }).catch(() => {
                        alert('Link kopyalanamadı. Manuel olarak kopyalayın: ' + window.location.href);
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <Share2 className="h-5 w-5" />
                  Bu Haberi Paylaş
                </button>
              </div>
            </div>

            {/* İlgili Haberler */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                İlgili Haberler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(staticNews as any[])
                  .filter((h: any) => h.id !== haber.id && h.category === haber.category)
                  .slice(0, 2)
                  .map((ilgiliHaber: any) => (
                    <Link key={ilgiliHaber.id} href={`/haberler/${ilgiliHaber.id}`}>
                      <article className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="aspect-video rounded mb-3 overflow-hidden">
                          <img 
                            src={ilgiliHaber.image} 
                            alt={ilgiliHaber.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                          {ilgiliHaber.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {ilgiliHaber.excerpt}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          {new Date(ilgiliHaber.date).toLocaleDateString('tr-TR')}
                        </div>
                      </article>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Galeri Modal */}
      {isGalleryOpen && selectedImageIndex !== null && haber.gallery && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-full">
            
            {/* Kapat Butonu */}
            <button
              onClick={closeGallery}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Sol Ok */}
            {haber.gallery.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Sağ Ok */}
            {haber.gallery.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            {/* Ana Görsel */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <Image
                src={haber.gallery[selectedImageIndex]}
                alt={`${haber.title} - Görsel ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Görsel Bilgileri */}
            <div className="bg-white p-4 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-neuropol font-bold text-lg text-gray-900">
                    {haber.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Görsel {selectedImageIndex + 1} / {haber.gallery.length}
                  </p>
                </div>
                {haber.gallery && haber.gallery.length > 1 && (
                  <div className="flex items-center gap-2">
                    {haber.gallery.map((_: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === selectedImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Backdrop Kapatma */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeGallery}
          ></div>
        </div>
      )}
    </div>
  )
}

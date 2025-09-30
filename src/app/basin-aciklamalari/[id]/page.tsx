"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Calendar, ArrowLeft, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const fallbackItems = [
  {
    id: 1,
    title: 'IPOS Steel Kocaeli Tesisini Genişletiyor',
    date: '2024-09-20',
    summary: 'IPOS Steel, Kocaeli Dilovası\'ndaki üretim tesisini genişletme kararı aldığını açıkladı. 25 milyon TL yatırımla kapasite %50 artırılacak.',
    content: `
      <p>IPOS Steel Dış Ticaret A.Ş., elektrik dağıtım sistemleri sektöründeki büyümesini sürdürmek amacıyla Kocaeli Dilovası'ndaki ana üretim tesisini genişletme kararı aldığını açıkladı.</p>
      
      <h3>Yatırım Detayları</h3>
      <p>25 milyon TL tutarındaki yatırım kapsamında, mevcut üretim tesisine 8.000 m² kapalı alan eklenecek. Bu genişleme ile toplam üretim kapasitesi %50 oranında artırılacak.</p>
      
      <p>Şirket Genel Müdürü, "Bu yatırım ile busbar sistemleri üretiminde Türkiye'nin önder şirketlerinden biri olmayı hedefliyoruz" açıklamasında bulundu.</p>
      
      <h3>İstihdam Artışı</h3>
      <p>Tesis genişlemesi ile birlikte 75 kişilik yeni istihdam sağlanacak. Özellikle nitelikli işgücü alımına öncelik verilecek.</p>
      
      <h3>Teknolojik Yatırımlar</h3>
      <p>Yeni tesiste Industry 4.0 teknolojileri kullanılacak. Otomatize üretim hatları ve robotik sistemler devreye alınacak.</p>
      
      <h3>Pazar Hedefleri</h3>
      <p>Genişleme ile birlikte ihracat kapasitesi de artırılacak. 2025 yılında ihracat hedefi 20 milyon dolara çıkarılacak.</p>
      
      <h3>Çevre Dostu Üretim</h3>
      <p>Yeni tesis, LEED Gold sertifikası alacak şekilde tasarlanıyor. Güneş enerjisi panelleri ile enerji ihtiyacının %30'u karşılanacak.</p>
    `,
    pdfUrl: '/basin-aciklamalari/2024-09-20-tesis-genisletme.pdf',
    category: 'Yatırım',
    priority: 'high',
    tags: ['yatırım', 'genişleme', 'istihdam', 'teknoloji'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop'
  },
  {
    id: 2,
    title: 'Avrupa Pazarında Yeni İş Birlikleri',
    date: '2024-09-12',
    summary: 'Almanya ve Hollanda\'daki stratejik ortaklarımızla yeni distribütörlük anlaşmaları imzalandı. 2025 hedefi Avrupa\'da %30 büyüme.',
    content: `
      <p>IPOS Steel, Avrupa pazarındaki büyüme stratejisini hayata geçirmek için önemli adımlar atıyor. Almanya ve Hollanda'daki stratejik ortaklarımızla imzalanan yeni distribütörlük anlaşmaları, şirketin uluslararası varlığını güçlendiriyor.</p>
      
      <h3>Almanya Pazarı</h3>
      <p>Almanya'nın önde gelen elektrik dağıtım şirketi EuroElektrik ile 5 yıllık distribütörlük anlaşması imzalandı. Bu anlaşma kapsamında yıllık 3 milyon Euro değerinde ürün satışı öngörülüyor.</p>
      
      <h3>Hollanda ve Benelüks</h3>
      <p>Hollanda merkezli TechnoGrid şirketi ile imzalanan anlaşma, Benelüks ülkelerindeki dağıtım ağımızı güçlendirecek.</p>
      
      <h3>Kalite Standartları</h3>
      <p>Avrupa pazarına yönelik ürünlerimiz CE, UL ve VDE sertifikalarına sahip. IEC 61439 standardına uygun üretim yapılıyor.</p>
      
      <h3>2025 Hedefleri</h3>
      <p>2025 yılında Avrupa pazarında %30 büyüme hedefleniyor. Fransa, İtalya ve İspanya pazarlarına da giriş planlanıyor.</p>
    `,
    pdfUrl: '/basin-aciklamalari/2024-09-12-avrupa-ortaklik.pdf',
    category: 'İş Birliği',
    priority: 'high',
    tags: ['avrupa', 'ortaklık', 'distribütörlük', 'büyüme'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop'
  },
  {
    id: 3,
    title: 'Çevre Dostu Üretim Sertifikası Aldı',
    date: '2024-09-05',
    summary: 'ISO 14001 Çevre Yönetim Sistemi sertifikası yenilendi. Sürdürülebilir üretim süreçleriyle karbon ayak izini %25 azalttık.',
    content: `
      <p>IPOS Steel, çevre dostu üretim yaklaşımıyla sektörde öncü olmaya devam ediyor. ISO 14001 Çevre Yönetim Sistemi sertifikamızın yenilenmesi ile birlikte, sürdürülebilirlik hedeflerimizde önemli ilerlemeler kaydettik.</p>
      
      <h3>Çevresel Performans</h3>
      <p>Son 2 yılda karbon ayak izimizi %25 azalttık. Enerji verimliliği projelerimiz ile elektrik tüketimini %20 düşürdük.</p>
      
      <h3>Geri Dönüşüm Projeleri</h3>
      <p>Üretim süreçlerinde geri dönüşümlü malzeme kullanım oranını %40'a çıkardık. Atık metal geri dönüşüm sistemi devreye alındı.</p>
      
      <h3>Yenilenebilir Enerji</h3>
      <p>Tesisimizde kurulan güneş enerji santrali ile enerji ihtiyacımızın %35'ini karşılıyoruz.</p>
    `,
    pdfUrl: '/basin-aciklamalari/2024-09-05-cevre-sertifika.pdf',
    category: 'Çevre',
    priority: 'medium',
    tags: ['çevre', 'sürdürülebilirlik', 'sertifika', 'geri-dönüşüm'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop'
  }
  // Diğer açıklamalar...
]

export default function BasinAciklamaDetayPage() {
  const params = useParams()
  const [item, setItem] = useState<any | null>(null)

  useEffect(() => {
    const load = async () => {
      const id = params.id as string
      try {
        const res = await fetch(`/api/press-releases/${id}`, { cache: 'no-store' })
        if (res.ok) {
          const d = await res.json()
          setItem({
            title: d.title,
            date: d.publishedAt,
            summary: d.summary || '',
            content: d.content || '',
            category: d.category,
            image: d.imageUrl || ''
          })
          return
        }
      } catch {}
      const fallback = fallbackItems.find(a => String(a.id) === String(params.id))
      setItem(fallback || null)
    }
    load()
  }, [params.id])

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <MaxWidthWrapper>
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Basın Açıklaması Bulunamadı</h1>
            <Link href="/basin-aciklamalari" className="text-blue-600 hover:text-blue-700">
              Basın açıklamaları sayfasına dön
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
            <Link href="/basin-aciklamalari" className="text-gray-500 hover:text-gray-700">Basın Açıklamaları</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Açıklama Detayı</span>
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
                href="/basin-aciklamalari"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Basın Açıklamaları
              </Link>
            </div>

            {/* Başlık ve Meta Bilgiler */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).toLocaleDateString('tr-TR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>IPOS Steel</span>
                  </div>
                </div>
              </div>
              
              <h1 className="font-neuropol text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {item.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {item.summary}
              </p>
            </header>

            {/* Ana Görsel */}
            <div className="mb-10">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Açıklama İçeriği */}
            <article className="prose prose-lg max-w-none mb-10">
              <div 
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </article>

            {/* Etiketler */}
            {Array.isArray((item as any).tags) && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Etiketler:</h3>
                <div className="flex flex-wrap gap-2">
                  {(item as any).tags.map((tag: string, index: number) => (
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


          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}

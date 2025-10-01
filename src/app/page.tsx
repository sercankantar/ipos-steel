'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import VideoSlider from '@/components/VideoSlider'
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
  Phone,
  Mail,
  MapPin,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

// Ülke bilgileri
const countryData = {
  germany: {
    name: 'ALMANYA',
    company: 'IPOS-Steel Deutschland GmbH',
    address: 'Musterstraße 123, 12345 Berlin, Deutschland',
    phone: '+49 30 12345678',
    email: 'info@ipos-steel.de'
  },
  uk: {
    name: 'İNGİLTERE',
    company: 'IPOS-Steel UK Ltd',
    address: 'Durham Business Centre, Abbey Road, Durham, DH1 5J',
    phone: '+44 (0) 191 3753986 / +44 (0) 7394 399988',
    email: 'ukinfo@ipos-steel.com'
  },
  usa: {
    name: 'AMERİKA BİRLEŞİK DEVLETLERİ',
    company: 'IPOS-Steel USA Inc.',
    address: '123 Business Ave, New York, NY 10001, USA',
    phone: '+1 555 123 4567',
    email: 'info@ipos-steel.com'
  },
  turkey: {
    name: 'TÜRKİYE',
    company: 'IPOS-Steel Dış. Tic. A.Ş.',
    address: 'Merkez Ofis, İstanbul, Türkiye',
    phone: '+90 212 123 45 67',
    email: 'info@ipos-steel.com'
  },
  australia: {
    name: 'AVUSTRALYA',
    company: 'IPOS-Steel Australia Pty Ltd',
    address: '123 Business Street, Sydney, NSW 2000, Australia',
    phone: '+61 2 1234 5678',
    email: 'info@ipos-steel.com.au'
  }
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [categories, setCategories] = useState<{ name: string; slug: string; imageUrl?: string }[]>([])
  const [news, setNews] = useState<{ id: string; title: string; summary?: string; imageUrl?: string; category?: string; isActive?: boolean }[]>([])
  const [about, setAbout] = useState<{ title?: string; summary?: string; content?: string; imageUrl?: string } | null>(null)
  const desiredCategoryNames = [
    'Tel Kablo Kanalları',
    'Kablo Kanalları',
    'Kablo Merdivenleri',
    'Destek Sistemleri',
    'Solar Montaj Sistemleri',
  ]

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/product-categories', { cache: 'no-store' })
        if (!res.ok) return
        const data: { name: string; slug: string; imageUrl?: string }[] = await res.json()
        const normalize = (s: string) => s.trim().toLocaleLowerCase('tr-TR')
        const selected: { name: string; slug: string; imageUrl?: string }[] = []
        for (const name of desiredCategoryNames) {
          const found = data.find((d) => normalize(d.name) === normalize(name))
          if (found) selected.push(found)
        }
        // fallback: eğer bazıları bulunamazsa kalanları sırayla doldur
        if (selected.length < 5) {
          for (const item of data) {
            if (selected.find((s) => s.slug === item.slug)) continue
            selected.push(item)
            if (selected.length === 5) break
          }
        }
        setCategories(selected)
      } catch {}
    }
    load()
  }, [])

  // Haberleri yükle
  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch('/api/news', { cache: 'no-store' })
        if (!res.ok) return
        const data: { id: string; title: string; summary?: string; imageUrl?: string; category?: string; isActive?: boolean }[] = await res.json()
        const active = data.filter((n) => n.isActive !== false)
        setNews(active)
      } catch {}
    }
    loadNews()
  }, [])

  // Hakkımızda yükle
  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await fetch('/api/about', { cache: 'no-store' })
        if (!res.ok) return
        const data: any = await res.json()
        setAbout(data)
      } catch {}
    }
    loadAbout()
  }, [])

  return (
    <>
      
        <div className='pt-6'>
          <VideoSlider
            slides={[
              {
                src: 'https://eae-dokuman.s3.eu-west-1.amazonaws.com/sliders/future-solutions.webm',
                title: 'Yaratıcı çözümler için tasarlandı',
                description: 'Modern ve hızlı arayüzler, kusursuz deneyimler.',
                href: '/products',
              },
              {
                src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                title: 'Güçlü altyapı ve ölçeklenebilir mimari',
                description: 'Büyüyen ihtiyaçlarınız için güvenilir temel.',
                href: '/products',
              },
              {
                src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                title: 'Şıklık ve performans bir arada',
                description: 'Şık tasarım, yüksek performans ile buluşuyor.',
                href: '/products',
              },
            ]}
          />
        </div>
      

  
      <section className='py-14'>
        <MaxWidthWrapper>
          {/* Data */}
          {/* Üstte öne çıkan geniş kart (ilk kategori) */}
          {(categories && categories.length > 0) ? (
            <div className='grid grid-cols-1 gap-6'>
              <div className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className='relative h-48 md:h-full'>
                    <img
                      src={categories[0].imageUrl || '/thumbnail.jpg'}
                      alt={categories[0].name}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='p-6 flex flex-col justify-center'>
                    <h3 className='text-xl font-neuropol font-bold text-gray-900'>{categories[0].name}</h3>
                    <p className='mt-3 text-sm text-muted-foreground font-neuropol'>
                      {categories[0].name} ürün grubumuz; projelerinizde güvenilirlik ve hızlı montaj avantajı sunan, dayanıklı ve ölçeklenebilir çözümler içerir.
                    </p>
                    <div className='mt-5 flex items-center gap-6'>
                      <Link href={`/products?category=${encodeURIComponent(categories[0].slug)}`} className='text-sm font-neuropol font-semibold text-blue-600 hover:text-blue-700'>
                        Daha Fazlası →
                      </Link>
                      <Link href={`/products?category=${encodeURIComponent(categories[0].slug)}`} className='text-sm font-neuropol font-semibold text-red-500 hover:text-red-600'>
                        Ürünleri İncele →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-6'>
              <div className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                  <div className='relative h-48 md:h-full'>
                    <div className='h-full w-full bg-gray-200 animate-pulse' />
                  </div>
                  <div className='p-6 flex flex-col justify-center gap-3'>
                    <div className='h-6 w-48 bg-gray-200 rounded animate-pulse' />
                    <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                    <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse' />
                    <div className='mt-2 flex items-center gap-4'>
                      <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                      <div className='h-4 w-28 bg-gray-200 rounded animate-pulse' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Altta 2 sütun kartlar (sonraki 4 kategori) */}
          {(categories && categories.length > 1) ? (
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
              {categories.slice(1, 5).map((c, idx) => (
                <div key={`${c.slug}-${idx}`} className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
                  <div className='grid grid-cols-1 sm:grid-cols-3'>
                    <div className='relative sm:col-span-1 h-40 sm:h-full'>
                      <img src={c.imageUrl || '/thumbnail.jpg'} alt={c.name} className='h-full w-full object-cover' />
                    </div>
                    <div className='sm:col-span-2 p-5 flex flex-col justify-center'>
                      <h4 className='text-lg font-neuropol font-bold text-gray-900'>{c.name}</h4>
                      <p className='mt-2 text-sm text-muted-foreground font-neuropol'>
                        {c.name} için yüksek kalite standartlarıyla üretilmiş, montajı kolay ve dayanıklı ürün seçenekleri sunuyoruz.
                      </p>
                      <div className='mt-4 flex items-center gap-6'>
                        <Link href={`/products?category=${encodeURIComponent(c.slug)}`} className='text-sm font-neuropol font-semibold text-blue-600 hover:text-blue-700'>
                          Daha Fazlası →
                        </Link>
                        <Link href={`/products?category=${encodeURIComponent(c.slug)}`} className='text-sm font-neuropol font-semibold text-red-500 hover:text-red-600'>
                          Ürünleri İncele →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
                  <div className='grid grid-cols-1 sm:grid-cols-3'>
                    <div className='relative sm:col-span-1 h-40 sm:h-full'>
                      <div className='h-full w-full bg-gray-200 animate-pulse' />
                    </div>
                    <div className='sm:col-span-2 p-5 flex flex-col justify-center gap-3'>
                      <div className='h-5 w-40 bg-gray-200 rounded animate-pulse' />
                      <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                      <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse' />
                      <div className='mt-2 flex items-center gap-4'>
                        <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                        <div className='h-4 w-28 bg-gray-200 rounded animate-pulse' />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </MaxWidthWrapper>
      </section>
      <section className='py-16'>
        <MaxWidthWrapper>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Sol taraf - Metin içeriği */}
            <div className='space-y-6'>
              <div>
                <p className='text-sm font-neuropol font-semibold text-red-500 uppercase tracking-wider'>
                  Uzman Çözümleri
                </p>
                <h2 className='mt-2 text-2xl lg:text-3xl font-neuropol font-bold text-gray-900 leading-tight'>
                  Hakkımızda
                </h2>
              </div>
              
              <div className='space-y-4 text-gray-600 font-neuropol leading-relaxed'>
                {about?.summary ? (
                  <p className='text-lg'>{about.summary}</p>
                ) : (
                  <>
                    <p className='text-lg'>
                      35 yılı aşkın tecrübeye sahip, alanında uzman mühendis ve imalat personelinin vermiş olduğu güven sayesinde kuruluşundan bu yana onlarca projeye imza atan IPOS-Steel Dış. Tic. A.Ş. bünyesinde, yenilenen kimliğimiz ile faaliyetlerimizi geliştirip büyütmeye devam etmekteyiz.
                    </p>
                    <p className='text-lg'>
                      Kablo kanalı üreticisi olmanın yanında elektrik ve endüstriyel malzeme ihtiyaçlarınız için "Hepsi tek bir noktadan" çözümler sunmaktayız. Ana amacımız müşterilerimize rekabetçi fiyatlarla yüksek hizmet standartını en kaliteli ürünlerle sunmaktır.
                    </p>
                  </>
                )}
              </div>
              
              <div className='pt-4'>
                <Link 
                  href='/hakkimizda'
                  className='inline-flex items-center px-8 py-3 border-2 border-red-500 text-red-500 font-neuropol font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300'
                >
                  Kurumsal
                </Link>
              </div>
            </div>
            
            {/* Sağ taraf - Görsel içerik */}
            <div className='relative'>
              <div className=''>
                <div className='relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden'>
                  <img src={about?.imageUrl || 'https://www.ipos-steel.com/wp-content/uploads/2022/02/homepage-about.png'} alt='Hakkımızda' className='h-full w-full object-cover' />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className='py-16'>
        <MaxWidthWrapper>
          {/* Header */}
          <div className='text-center mb-12'>
            <p className='text-sm font-neuropol font-semibold text-red-500 uppercase tracking-wider mb-2'>
              İletişim
            </p>
            <h2 className='text-3xl lg:text-4xl font-neuropol font-bold text-gray-900 mb-4'>
              Yurt Dışı Şirketlerimiz
            </h2>
            <p className='text-lg text-gray-600 font-neuropol max-w-3xl mx-auto'>
              Farklı ülkelerde bulunan şirketlerimizle çeşitli ürün ve hizmet seçeneklerimizden yararlanabilirsiniz.
            </p>
          </div>

          {/* Ülke Seçici Dropdown */}
          <div className='mb-8 flex justify-center'>
            <div className='relative'>
              <select 
                className='appearance-none bg-white border border-gray-300 rounded-lg px-6 py-3 pr-10 text-gray-700 font-neuropol focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm'
                value={selectedCountry || ''}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
              >
                <option value=''>Ülke Seçiniz</option>
                <option value='germany'>ALMANYA</option>
                <option value='uk'>İNGİLTERE</option>
                <option value='usa'>AMERİKA BİRLEŞİK DEVLETLERİ</option>
                <option value='australia'>AVUSTRALYA</option>
                <option value='turkey'>TÜRKİYE</option>
              </select>
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </div>
            </div>
          </div>

                 {/* Interaktif Dünya Haritası */}
                 <div className='relative  p-8'>
                   <div className='relative  overflow-hidden rounded-xl'>
                     {/* Dünya Haritası Resmi */}
                     <img 
                       src="https://img.freepik.com/premium-vector/basic-earth-map-continents_78370-2988.jpg?semt=ais_hybrid&w=740&q=80"
                       alt="Dünya Haritası"
                       className="w-full h-full object-cover opacity-80"
                     />
                     
                     {/* Pin'ler */}
                     {/* Amerika - New York */}
                     <div 
                       className="absolute cursor-pointer group"
                       style={{ top: '25%', left: '15%' }}
                       onClick={() => setSelectedCountry('usa')}
                     >
                       <div className="relative">
                         <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                         </div>
                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           Amerika
                         </div>
                       </div>
                     </div>

                     {/* Almanya - Berlin */}
                     <div 
                       className="absolute cursor-pointer group"
                       style={{ top: '25%', left: '52%' }}
                       onClick={() => setSelectedCountry('germany')}
                     >
                       <div className="relative">
                         <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                         </div>
                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           Almanya
                         </div>
                       </div>
                     </div>

                     {/* İngiltere - London */}
                     <div 
                       className="absolute cursor-pointer group"
                       style={{ top: '22%', left: '45%' }}
                       onClick={() => setSelectedCountry('uk')}
                     >
                       <div className="relative">
                         <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                         </div>
                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           İngiltere
                         </div>
                       </div>
                     </div>

                     {/* Türkiye - İstanbul */}
                     <div 
                       className="absolute cursor-pointer group"
                       style={{ top: '32%', left: '56%' }}
                       onClick={() => setSelectedCountry('turkey')}
                     >
                       <div className="relative">
                         <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                         </div>
                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           Türkiye
                         </div>
                       </div>
                     </div>

                     {/* Avustralya - Sydney */}
                     <div 
                       className="absolute cursor-pointer group"
                       style={{ top: '70%', left: '88%' }}
                       onClick={() => setSelectedCountry('australia')}
                     >
                       <div className="relative">
                         <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                         </div>
                         <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           Avustralya
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
        </MaxWidthWrapper>
      </section>

      {/* Bilgi Kartı Modal */}
      {selectedCountry && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative'>
            <button
              onClick={() => setSelectedCountry(null)}
              className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X className='w-6 h-6' />
            </button>
            
            <div className='space-y-4'>
              <div>
                <h3 className='text-xl font-neuropol font-bold text-gray-900 mb-2'>
                  {countryData[selectedCountry as keyof typeof countryData].name}
                </h3>
                <p className='text-lg font-neuropol font-semibold text-gray-700'>
                  {countryData[selectedCountry as keyof typeof countryData].company}
                </p>
              </div>
              
              <div className='space-y-3'>
                <div className='flex items-start gap-3'>
                  <MapPin className='w-5 h-5 text-red-500 mt-0.5 flex-shrink-0' />
                  <p className='text-gray-600 font-neuropol'>
                    {countryData[selectedCountry as keyof typeof countryData].address}
                  </p>
                </div>
                
                <div className='flex items-center gap-3'>
                  <Phone className='w-5 h-5 text-red-500 flex-shrink-0' />
                  <p className='text-gray-600 font-neuropol'>
                    {countryData[selectedCountry as keyof typeof countryData].phone}
                  </p>
                </div>
                
                <div className='flex items-center gap-3'>
                  <Mail className='w-5 h-5 text-red-500 flex-shrink-0' />
                  <p className='text-gray-600 font-neuropol'>
                    {countryData[selectedCountry as keyof typeof countryData].email}
                  </p>
                </div>
              </div>
              
              <div className='pt-4 flex gap-3'>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-neuropol font-semibold py-2 px-4 rounded-lg transition-colors'
                >
                  Kapat
                </button>
                <button
                  onClick={() => {
                    // İletişim sayfasına yönlendirme
                    window.location.href = '/iletisim'
                  }}
                  className='flex-1 bg-red-500 hover:bg-red-600 text-white font-neuropol font-semibold py-2 px-4 rounded-lg transition-colors'
                >
                  İletişime Geç
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className='py-16 bg-gray-50'>
        <MaxWidthWrapper>
          {/* Header row */}
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-xs uppercase tracking-wider text-red-500'>Haberler</p>
              <h2 className='mt-2 text-3xl font-neuropol font-bold text-gray-900'>Güncel Haberler</h2>
              <p className='mt-3 text-sm text-muted-foreground max-w-3xl font-neuropol'>
                  Şirketimizin katıldığı etkinlikler, yer aldığı projeler ve sektörden gelişmeler gibi
                  güncel bilgiler haberleri üzerinden ulaşabilirsiniz.
              </p>
            </div>
            <Link
              href='/haberler'
              className='inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white text-sm font-neuropol font-semibold shadow hover:bg-red-600 transition'>
              Tümünü Görüntüle
              <span className='background-red-500' aria-hidden>→</span>
            </Link>
          </div>

          {/* Cards */}
          <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-3'>
            {news.length === 0 && (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
                    <div className='relative h-56'>
                      <div className='h-full w-full bg-gray-200 animate-pulse' />
                    </div>
                    <div className='p-4 space-y-3'>
                      <div className='h-3 w-16 bg-gray-200 rounded animate-pulse' />
                      <div className='h-5 w-3/4 bg-gray-200 rounded animate-pulse' />
                      <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                    </div>
                  </div>
                ))}
              </>
            )}
            {news.slice(0, 3).map((n) => (
              <Link key={n.id} href={`/haberler/${n.id}`} className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden group'>
                <div className='relative h-56'>
                  <img
                    src={n.imageUrl || '/thumbnail.jpg'}
                    alt={n.title}
                    className='h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300'
                  />
                </div>
                <div className='p-4'>
                  <p className='text-xs font-neuropol font-bold text-red-500'>{n.category || 'Haber'}</p>
                  <h3 className='mt-2 text-base font-neuropol font-bold text-gray-900 leading-snug'>
                    {n.title}
                  </h3>
                  <p className='mt-2 text-sm text-muted-foreground font-neuropol line-clamp-3'>
                    {n.summary || 'Detaylar için haberi görüntüleyin.'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

     


      {/* Contact CTA Section */}
      <section className='py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0' style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <MaxWidthWrapper className='relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            
            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-white/90 text-sm font-medium'>7/24 Destek Hattı Aktif</span>
            </div>

            {/* Main Title */}
            <h2 className='font-neuropol text-3xl lg:text-5xl font-bold mb-6 text-white leading-tight'>
              Projeleriniz İçin 
              <span className='block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent'>
                Bizimle İletişime Geçin
              </span>
            </h2>
            
            {/* Description */}
            <p className='text-lg lg:text-xl mb-10 max-w-3xl mx-auto text-white/80 leading-relaxed'>
              Uzman ekibimiz size en uygun çözümleri sunmak için hazır. 
              <span className='block mt-2 font-medium text-white/90'>
                Ücretsiz danışmanlık ve fiyat teklifi alın.
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
              <Link 
                href='/iletisim'
                className='group inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-slate-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105'
              >
                <svg className='w-5 h-5 group-hover:rotate-12 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                İletişime Geç
              </Link>
              
              <Link 
                href='tel:+902626744767'
                className='group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300'
              >
                <svg className='w-5 h-5 group-hover:animate-pulse' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
                (262) 674 47 67
              </Link>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/20'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-white mb-1'>25+</div>
                <div className='text-white/70 text-sm'>Yıl Deneyim</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-white mb-1'>500+</div>
                <div className='text-white/70 text-sm'>Başarılı Proje</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-white mb-1'>24/7</div>
                <div className='text-white/70 text-sm'>Teknik Destek</div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

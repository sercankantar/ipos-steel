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
} from 'lucide-react'
import Link from 'next/link'

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

export default function Home() {
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
          {/* Üstte öne çıkan geniş kart */}
          <div className='grid grid-cols-1 gap-6'>
            <div className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='relative h-48 md:h-full'>
                  <img
                    src='https://www.eae.com.tr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbusbars.af0ee396.webp&w=750&q=75'
                    alt='Busbar Sistemleri'
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='p-6 flex flex-col justify-center'>
                  <h3 className='text-xl font-neuropol font-bold text-gray-900'>Busbar Sistemleri</h3>
                  <p className='mt-3 text-sm text-muted-foreground font-neuropol'>
                    Busbar kanal sistemi; yüksek katlı binaların ve fabrikalarda değişen üretim teknolojilerinin bir ihtiyacı olarak ortaya çıkmıştır. Türkiye'de ise busbar kanal sistemi imalatı 1970'li yıllarda başlamıştır.
                  </p>
                  <div className='mt-5 flex items-center gap-6'>
                    <Link href='/products' className='text-sm font-neuropol font-semibold text-blue-600 hover:text-blue-700'>
                      Daha Fazlası →
                    </Link>
                    <Link href='/products' className='text-sm font-neuropol font-semibold text-red-500 hover:text-red-600'>
                      Ürünleri İncele →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Altta 2 sütun kartlar */}
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[ 
              {
                title: 'Askı Sistemleri',
                desc: 'E-Line A-A serisi ve E-Line Sismik askı sistemleri binalarda ve fabrikalarda; betonarme veya çelik yapılarda uygun olarak Busbar, Kablo Kanalı, Kablo Merdiveni vb. sistemleri taşımak üzere tasarlanmıştır.',
                img: 'https://www.eae.com.tr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fask%C4%B1.032595b0.webp&w=384&q=75'
              },
              {
                title: 'Kablo Kanalı Sistemleri',
                desc: "EAE kablo kanalları; otomatik üretim hatlarında 'ROLL FORMING' metoduyla seri olarak imal edilmektedir. Standart kanal boyu 3m'dir.",
                img: 'https://www.eae.com.tr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fask%C4%B1.032595b0.webp&w=384&q=75'
              },
              {
                title: 'İç Tesisat Çözümleri',
                desc: 'Ofislerde ve işletmelerde aydınlatma ve priz (Şebeke ve UPS) devreleri ile küçük enerji dağıtımı için esnek ve modüler çözümler sağlar.',
                img: 'https://www.eae.com.tr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fask%C4%B1.032595b0.webp&w=384&q=75'
              },
              {
                title: 'Trolley Busbar Sistemleri',
                desc: 'Trolley Busbar Enerji Dağıtım Sistemlerinden E‑Line TB ve E‑Line URC, hareket eden makinalara enerji vermek üzere tasarlanmıştır.',
                img: 'https://www.eae.com.tr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fask%C4%B1.032595b0.webp&w=384&q=75'
              },
            ].map((item, idx) => (
              <div key={idx} className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
                <div className='grid grid-cols-1 sm:grid-cols-3'>
                  <div className='relative sm:col-span-1 h-40 sm:h-full'>
                    <img src={item.img} alt={item.title} className='h-full w-full object-cover' />
                  </div>
                  <div className='sm:col-span-2 p-5 flex flex-col justify-center'>
                    <h4 className='text-lg font-neuropol font-bold text-gray-900'>{item.title}</h4>
                    <p className='mt-2 text-sm text-muted-foreground font-neuropol'>{item.desc}</p>
                    <div className='mt-4 flex items-center gap-6'>
                      <Link href='/products' className='text-sm font-neuropol font-semibold text-blue-600 hover:text-blue-700'>
                        Daha Fazlası →
                      </Link>
                      <Link href='/products' className='text-sm font-neuropol font-semibold text-red-500 hover:text-red-600'>
                        Ürünleri İncele →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
      <section className='py-16 bg-gray-50'>
        <MaxWidthWrapper>
          {/* Header row */}
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-xs uppercase tracking-wider text-red-500'>Blog</p>
              <h2 className='mt-2 text-3xl font-neuropol font-bold text-gray-900'>IPOS-STEEL Blog</h2>
              <p className='mt-3 text-sm text-muted-foreground max-w-3xl font-neuropol'>
                Şirketimizin katıldığı etkinlikler, yer aldığı projeler ve sektörden gelişmeler gibi
                güncel bilgilere EAE Blog platformumuz üzerinden ulaşabilirsiniz.
              </p>
            </div>
            <Link
              href='/products'
              className='inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white text-sm font-neuropol font-semibold shadow hover:bg-red-600 transition'>
              Tümünü Görüntüle
              <span className='background-red-500' aria-hidden>→</span>
            </Link>
          </div>

          {/* Cards */}
          <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-3'>
            {[
              {
                img:
                  'https://ipos.wscp.net/Upload/Sayfalar/yavuz-1.jpg',
                tag: 'Haber',
                title:
                  'Sürdürülebilirlik Çalışmalarımızla 2025 CDP Supplier Engagement Assessment (SEA) Listesinde Yer Aldık!',
                excerpt:
                  'EAE Elektrik, CDP tarafından yürütülen 2025 Supplier Engagement Assessment (SEA) kapsamında yapılan değerlendirmede A- puan alarak tedarik zinciri boyunca iklimle...'
              },
              {
                img:
                  'https://ipos.wscp.net/Upload/Sayfalar/yavuz-1.jpg',
                tag: 'Haber',
                title:
                  'Pan African Data Centres Fuarı’nda EAE Veri Merkezi Çözümlerimizi Tanıttık!',
                excerpt:
                  'Afrika’nın veri merkezi alanındaki en önemli etkinliklerinden biri olan Pan African Data Centres fuarına katıldık!'
              },
              {
                img:
                  'https://ipos.wscp.net/Upload/Sayfalar/yavuz-1.jpg',
                tag: 'Haber',
                title:
                  'En Prestijli Veri Merkezi Fuarı Data Centre World Frankfurt 2025’te EAE Olarak Yer Aldık!',
                excerpt:
                  "EAE olarak teknolojinin fuarı Data Centre World Frankfurt'taydık."
              }
            ].map((post, i) => (
              <article
                key={i}
                className='rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
                <div className='relative h-56'>
                  <img
                    src={post.img}
                    alt={post.title}
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='p-4'>
                  <p className='text-xs font-neuropol font-bold text-red-500'>{post.tag}</p>
                  <h3 className='mt-2 text-base font-neuropol font-bold text-gray-900 leading-snug'>
                    {post.title}
                  </h3>
                  <p className='mt-2 text-sm text-muted-foreground font-neuropol line-clamp-3'>
                    {post.excerpt}
                  </p>
                </div>
              </article>
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

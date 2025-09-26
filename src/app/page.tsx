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
                  <h3 className='text-xl font-semibold text-gray-900'>Busbar Sistemleri</h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    Busbar kanal sistemi; yüksek katlı binaların ve fabrikalarda değişen üretim teknolojilerinin bir ihtiyacı olarak ortaya çıkmıştır. Türkiye’de ise busbar kanal sistemi imalatı 1970’li yıllarda başlamıştır.
                  </p>
                  <div className='mt-5 flex items-center gap-6'>
                    <Link href='/products' className='text-sm font-medium text-blue-600 hover:text-blue-700'>
                      Daha Fazlası →
                    </Link>
                    <Link href='/products' className='text-sm font-medium text-red-500 hover:text-red-600'>
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
                    <h4 className='text-lg font-semibold text-gray-900'>{item.title}</h4>
                    <p className='mt-2 text-sm text-muted-foreground'>{item.desc}</p>
                    <div className='mt-4 flex items-center gap-6'>
                      <Link href='/products' className='text-sm font-medium text-blue-600 hover:text-blue-700'>
                        Daha Fazlası →
                      </Link>
                      <Link href='/products' className='text-sm font-medium text-red-500 hover:text-red-600'>
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
              <h2 className='mt-2 text-3xl font-bold text-gray-900'>IPOS-STEEL Blog</h2>
              <p className='mt-3 text-sm text-muted-foreground max-w-3xl'>
                Şirketimizin katıldığı etkinlikler, yer aldığı projeler ve sektörden gelişmeler gibi
                güncel bilgilere EAE Blog platformumuz üzerinden ulaşabilirsiniz.
              </p>
            </div>
            <Link
              href='/products'
              className='inline-flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white text-sm font-medium shadow hover:bg-red-600 transition'>
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
                  <p className='text-xs font-semibold text-red-500'>{post.tag}</p>
                  <h3 className='mt-2 text-base font-semibold text-gray-900 leading-snug'>
                    {post.title}
                  </h3>
                  <p className='mt-2 text-sm text-muted-foreground line-clamp-3'>
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

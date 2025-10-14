import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'

export default function InsanKaynaklariPolitikamiz() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <span>İnsan Kaynakları Politikamız</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              İnsan Kaynakları Politikamız
            </h1>
            <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
              İnsan odaklı yaklaşımımızla çalışanlarımızın gelişimine yatırım yapar, adil ve güvenli çalışma ortamı sağlarız
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-16'>
          {/* Yetenek Geliştirme Section */}
          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              İnsan Kaynağı Geliştirme ve Kariyer Planlaması
            </h2>
            
            <div className='grid lg:grid-cols-2 gap-8 items-center mb-8'>
              <div>
                <p className='text-gray-700 text-base leading-relaxed mb-6'>
                  IPOS Steel olarak çelik yapı sektöründe öncü konumumuzu korurken, en değerli varlığımız olan insan kaynağımızı geliştirmek için modern yaklaşımlar benimser ve şu hedefleri öncelikli olarak ele alırız:
                </p>

                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Doğru kişiyi doğru pozisyona yerleştirme</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Çalışanlarımızın teknik ve kişisel becerilerini sürekli geliştirme</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Bireysel kariyer hedeflerini destekleyerek yaşam boyu öğrenme kültürünü teşvik etme</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Mentorluk ve bilgi aktarımı ile tüm seviyelerde liderlik kapasitesi oluşturma</span>
                  </li>
                </ul>
              </div>
              
              <div className='relative'>
                <img 
                  src='https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center'
                  alt='Takım çalışması ve işbirliği'
                  className='w-full h-80 object-cover border border-gray-200'
                />
                <div className='absolute inset-0 bg-blue-900/10'></div>
              </div>
            </div>
          </div>

          {/* Değerler ve İnsan Kaynakları Yaklaşımı Section */}
          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              Kurumsal Kültür ve İnsan Kaynakları Felsefesi
            </h2>

            <div className='grid lg:grid-cols-2 gap-8 items-center mb-8'>
              <div className='relative order-2 lg:order-1'>
                <img 
                  src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&crop=center'
                  alt='Kurumsal değerler ve işbirliği'
                  className='w-full h-80 object-cover border border-gray-200'
                />
                <div className='absolute inset-0 bg-blue-900/10'></div>
              </div>
              
              <div className='order-1 lg:order-2'>
                <p className='text-gray-700 text-base leading-relaxed mb-6'>
                  IPOS Steel olarak, insan kaynağımızın şirketimizin en büyük zenginliği olduğuna inanıyor, şeffaflık, güven ve karşılıklı saygı temelinde, farklılıkları değer olarak gören ve inovasyonu destekleyen bir çalışma ortamı yaratıyoruz.
                </p>

                <div className='bg-gray-50 p-6 border-l-4 border-blue-600'>
                  <h3 className='font-semibold text-gray-900 mb-4'>IPOS Steel'in sürdürülebilir büyümesini sağlayan insan kaynakları stratejimizin temelleri:</h3>
                  <ul className='space-y-2'>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span className='text-gray-700'>Kurumsal değerlerimiz ve misyonumuz</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span className='text-gray-700'>Güçlü şirket kültürümüz ve takım ruhu</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span className='text-gray-700'>Etik iş anlayışımız ve dürüstlük ilkelerimiz</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                      <span className='text-gray-700'>Yasal mevzuata tam uyum ve sosyal sorumluluk bilincimizdir</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Hedef Odaklı ve Eğitimsel Yaklaşım Section */}
          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              Performans Odaklı Eğitim ve Gelişim Stratejisi
            </h2>

            <div className='grid lg:grid-cols-2 gap-8 items-center mb-8'>
              <div>
                <p className='text-gray-700 text-base leading-relaxed mb-6'>
                  İnsan kaynakları vizyonumuz; şirket amaçlarıyla uyumlu, işbirliği içinde çalışan, sürekli kendini yenileyen, yüksek motivasyon ve bağlılığa sahip, nitelikli bir iş gücü yaratmaktır. Kurumsal değerlerimizi liderlik tarzımıza entegre eder ve bu ilkeleri vazgeçilmez standartlarımız olarak benimseriz.
                </p>
                
                <div className='bg-blue-50 p-6 border border-blue-200'>
                  <p className='text-gray-700 text-base leading-relaxed font-medium'>
                    Çalışanlarımızı geleceğe hazırlamak için her seviyede kapsamlı eğitim programları düzenler, insan sermayesine yapılan yatırımı en önemli önceliğimiz olarak görürüz.
                  </p>
                </div>
              </div>
              
              <div className='relative'>
                <img 
                  src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center'
                  alt='Eğitim ve gelişim programları'
                  className='w-full h-80 object-cover border border-gray-200'
                />
                <div className='absolute inset-0 bg-blue-900/10'></div>
              </div>
            </div>
          </div>

          {/* Kurumsal Değerler Section */}
          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              Temel Değerlerimiz
            </h2>
            
            <p className='text-gray-700 text-base leading-relaxed mb-8'>
              Mükemmellik, güvenilirlik ve sürdürülebilirlik değerleriyle tüm iş ortaklarımız için tercih edilen çözüm ortağı olmayı hedefliyoruz.
            </p>

            <div className='grid md:grid-cols-3 gap-8 mb-8'>
              <div className='text-center p-6 border border-gray-200'>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>Mükemmellik</h3>
                <p className='text-gray-600 text-sm'>Her projede en yüksek standartları hedefleme</p>
              </div>
              
              <div className='text-center p-6 border border-gray-200'>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>Güvenilirlik</h3>
                <p className='text-gray-600 text-sm'>Sözümüzde duran, zamanında teslim eden</p>
              </div>
              
              <div className='text-center p-6 border border-gray-200'>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>Sürdürülebilirlik</h3>
                <p className='text-gray-600 text-sm'>Çevre ve gelecek nesillere saygılı üretim</p>
              </div>
            </div>

            <div className='bg-gray-50 p-6 border border-gray-200'>
              <p className='text-gray-700 text-base leading-relaxed'>
                IPOS Steel, ekip arkadaşlarıyla birlikte müşteri memnuniyetini en üst seviyede tutmayı, uluslararası kalite standartlarında ürün ve hizmet sunarak sürdürülebilir büyüme sağlamayı amaçlamaktadır. Müşterilerimiz, tedarikçilerimiz ve iş ortaklarımız dahil tüm paydaşlarımız için güven, süreklilik ve prestij sembolü olmaya odaklanıyoruz.
              </p>
            </div>
          </div>

        </div>
      </MaxWidthWrapper>
    </div>
  )
}

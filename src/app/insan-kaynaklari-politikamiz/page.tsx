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
              Güneş enerjisi altyapısı ve elektrik kablo yönetim sistemlerinde uzmanlaşmış ekibimizle, sürdürülebilir enerji geleceğinin inşasında insan kaynaklarımızı en stratejik varlığımız olarak görüyoruz
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
                  Güneş enerjisi panelleri için kablo tavası, elektrik altyapı çözümleri ve enerji iletim sistemlerinde öncü konumumuzu korurken, elektrik mühendislerimizden üretim uzmanlarımıza kadar tüm ekibimizin yenilikçi çözümler geliştirmesini destekliyoruz. İnsan kaynakları stratejimizin temel pilleri:
                </p>

                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Elektrik altyapısı ve güneş enerjisi sistemleri uzmanlığı gerektiren pozisyonlarda yetkinlik bazlı işe alım</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Elektrik sistemleri, kablo yönetimi ve güneş paneli montaj teknikleri eğitimleri</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Elektrik güvenlik sertifikaları ve yenilenebilir enerji standartlarına uyum eğitimleri</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                    <span className='text-gray-700'>Elektrik uzmanlarından yeni mezunlara deneyim aktarımı ve teknik liderlik geliştirme</span>
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
                  Güneş enerjisi sistemlerinin hızla yaygınlaşması ve elektrik altyapısının karmaşıklaşması, uzman ekipler gerektirir. IPOS Steel'de her çalışanımızı yenilenebilir enerji geleceğinin mimarları olarak görüyor, kablo tavası ve elektrik altyapı çözümlerinde inovasyon yapmalarını destekliyoruz.
                </p>

                <div className='bg-gray-50 p-6 border-l-4 border-blue-600'>
                         <h3 className='font-semibold text-gray-900 mb-4'>Güneş enerjisi altyapısında öncü konumumuzu destekleyen insan kaynakları yaklaşımımızın temelleri:</h3>
                  <ul className='space-y-2'>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                             <span className='text-gray-700'>Elektrik güvenliği, ürün kalitesi ve müşteri memnuniyeti odaklı çalışma anlayışımız</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                             <span className='text-gray-700'>Elektrik teknolojilerinde mükemmellik ve yenilenebilir enerji trendlerini takip etme kültürümüz</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                             <span className='text-gray-700'>Elektrik güvenlik standartları ve sürdürülebilir enerji bilinci</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold'>•</span>
                             <span className='text-gray-700'>Uluslararası elektrik standartlarına uyum ve çevre dostu üretim anlayışımızdır</span>
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
                  Güneş enerjisi sistemleri ve elektrik altyapı projelerinin teknik gereklilikleri, multidisipliner yaklaşım gerektirir. Elektrik mühendislerinden üretim uzmanlarına, kalite kontrol elemanlarından saha montaj ekiplerine kadar her seviyede uzmanlaşmış ekipler oluşturuyoruz. Hedefimiz, her çalışanımızın yenilenebilir enerji sektöründe uzman olmasıdır.
                </p>
                
                <div className='bg-blue-50 p-6 border border-blue-200'>
                  <p className='text-gray-700 text-base leading-relaxed font-medium'>
                    Elektrik teknolojilerindeki gelişmeleri yakından takip ederek, AutoCAD Electrical, ETAP analiz yazılımları ve modern kablo yönetim sistemlerinde sürekli eğitim programları düzenliyor, çalışanlarımızın güneş enerjisi sektöründeki yeniliklere uyum sağlamasını destekliyoruz.
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
                     Güneş enerjisi altyapısında elektrik güvenliği, ürün kalitesi ve zamanlı teslimat kritik başarı faktörleridir. Bu değerlerle hareket eden, elektrik teknolojilerinde yetkin ve sürekli gelişen bir ekip oluşturmayı hedefliyoruz.
                   </p>

                   <div className='grid md:grid-cols-3 gap-8 mb-8'>
                     <div className='text-center p-6 border border-gray-200'>
                       <h3 className='text-lg font-bold text-gray-900 mb-3'>Elektrik Mükemmelligi</h3>
                       <p className='text-gray-600 text-sm'>Her güneş enerjisi projesinde elektrik mühendisliği hassasiyeti ve kalite</p>
                     </div>
                     
                     <div className='text-center p-6 border border-gray-200'>
                       <h3 className='text-lg font-bold text-gray-900 mb-3'>Elektrik Güvenliği</h3>
                       <p className='text-gray-600 text-sm'>Elektrik güvenlik standartlarında öncü yaklaşım ve sıfır kaza hedefi</p>
                     </div>
                     
                     <div className='text-center p-6 border border-gray-200'>
                       <h3 className='text-lg font-bold text-gray-900 mb-3'>Yenilenebilir Enerji Vizyonu</h3>
                       <p className='text-gray-600 text-sm'>Güneş enerjisi teknolojilerinde yenilikçi çözümler ve sürdürülebilirlik</p>
                     </div>
                   </div>

            <div className='bg-gray-50 p-6 border border-gray-200'>
              <p className='text-gray-700 text-base leading-relaxed'>
                IPOS Steel, güneş enerjisi panelleri için kablo tavaları, elektrik altyapı çözümleri ve enerji iletim sistemlerinde uzmanlaşmış bir ekiple hizmet vermektedir. Güneş enerjisi santralları, endüstriyel tesisler ve ticari binaların elektrik altyapı projelerinde teknik ekibimizin uzmanlığı ve çalışanlarımızın sürekli gelişimi sayesinde sürdürülebilir enerji geleceğine katkı sağlamayı hedefliyoruz.
            </p>
          </div>
        </div>

      </div>
    </MaxWidthWrapper>
    </div>
  )
}

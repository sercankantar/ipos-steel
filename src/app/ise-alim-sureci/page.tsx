'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function IseAlimSureci() {
  const [activeSection, setActiveSection] = useState('amacimiz')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['amacimiz', 'aradigimiz-ozellikler', 'ise-alim-surecimiz']
      
      let currentSection = 'amacimiz'
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Bölüm viewport'un üst kısmında görünüyorsa aktif yap
          if (rect.top <= 150) {
            currentSection = section
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    // İlk yüklemede scroll pozisyonunu kontrol et
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Menü tıklama fonksiyonu
  const handleMenuClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Aktif bölümü hemen güncelle
      setActiveSection(sectionId)
      
      // Element'in pozisyonunu al
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      // 100px offset ile scroll yap (başlığın tam görünmesi için)
      const offsetPosition = elementPosition - 100
      
      // Smooth scroll ile offset'li pozisyona git
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
  return (
    <div className='min-h-screen bg-white scroll-smooth'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
    <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/kariyer' className='hover:text-white transition-colors'>Kariyer</Link>
              <span className='mx-2'>/</span>
              <span>İşe Alım Süreci</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
            İşe Alım Süreci
          </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              Güneş enerjisi ve elektrik altyapısı alanında en yetenekli uzmanları ekibimize katmak için 
              şeffaf, adil ve profesyonel bir işe alım süreci uyguluyoruz
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-16'>
          <div className='grid lg:grid-cols-4 gap-8'>
            {/* Sol Sidebar - İçindekiler */}
            <div className='lg:col-span-1'>
              <div className='sticky top-4 max-h-[calc(100vh-2rem)] overflow-hidden'>
                <div className='bg-white border border-gray-200 shadow-sm flex flex-col max-h-full'>
                  <div className='bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0'>
                    <h2 className='text-lg font-semibold text-gray-900'>İçindekiler</h2>
                  </div>
                  <nav className='p-4 overflow-y-auto flex-1'>
                    <ul className='space-y-2 text-sm'>
                      <li>
                        <button 
                          onClick={() => handleMenuClick('amacimiz')}
                          className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'amacimiz' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                        >
                          <span className={`w-6 font-medium ${activeSection === 'amacimiz' ? 'text-blue-600' : 'text-gray-400'}`}>1.</span>
                          <span>Amacımız</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleMenuClick('aradigimiz-ozellikler')}
                          className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'aradigimiz-ozellikler' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                        >
                          <span className={`w-6 font-medium ${activeSection === 'aradigimiz-ozellikler' ? 'text-blue-600' : 'text-gray-400'}`}>2.</span>
                          <span>Aradığımız Özellikler</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleMenuClick('ise-alim-surecimiz')}
                          className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'ise-alim-surecimiz' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                        >
                          <span className={`w-6 font-medium ${activeSection === 'ise-alim-surecimiz' ? 'text-blue-600' : 'text-gray-400'}`}>3.</span>
                          <span>İşe Alım Sürecimiz</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            {/* Sağ İçerik Alanı */}
            <div className='lg:col-span-3 space-y-12'>
              {/* Amacımız Section */}
              <section id='amacimiz' className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Amacımız</h2>
              <div className='w-24 h-1 bg-blue-600 mx-auto'></div>
            </div>

            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <div className='bg-blue-50 p-6 border-l-4 border-blue-600'>
                  <h3 className='text-xl font-bold text-gray-900 mb-3'>Misyonumuz</h3>
                  <p className='text-gray-700 leading-relaxed'>
                    Sektöründe lider olmak, rekabetçi ve sürdürülebilir büyüme potansiyelini paydaşlarına değer yaratacak şekilde yönetmek, 
                    işletme kaynaklarını sermayesini en üst seviyelere çıkarmak, şeffaflık, üstün iş ahlâkı ve dürüst çalışma ilkelerine uymak.
                  </p>
                </div>

                <div className='bg-gray-50 p-6 border border-gray-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Temel Değerlerimiz</h3>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Şirket kültürümüzün temelini oluşturan değerler, adaylarda aradığımız temel yetkinliklerdir:
                  </p>
                  
                  <div className='grid md:grid-cols-2 gap-4'>
                    <ul className='space-y-3'>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Elektrik güvenliği odaklılık</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Yenilenebilir enerji vizyonu</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Takım çalışması ve işbirliği</span>
                      </li>
                    </ul>
                    
                    <ul className='space-y-3'>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Sürekli öğrenme ve gelişim</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Proaktif problem çözme</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Teknolojik yeniliklere açıklık</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='relative'>
                <img 
                  src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center'
                  alt='Güneş enerjisi ekibi ve işe alım süreci'
                  className='w-full h-96 object-cover border border-gray-200 shadow-lg'
                />
                <div className='absolute inset-0 bg-blue-900/10'></div>
                
                <div className='absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 border border-gray-200'>
                  <p className='text-sm font-medium text-gray-900'>
                    Güneş enerjisi teknolojilerinde uzman ekibimizle geleceği inşa ediyoruz
                  </p>
                </div>
              </div>
            </div>
          </section>

              {/* Aradığımız Özellikler */}
              <section id='aradigimiz-ozellikler' className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Aradığımız Özellikler</h2>
              <div className='w-24 h-1 bg-blue-600 mx-auto mb-6'></div>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Güneş enerjisi ve elektrik altyapısı alanında başarılı olmak için adaylarda aradığımız temel özellikler
              </p>
            </div>

            <div className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='bg-white border border-gray-200 p-6 shadow-sm'>
                  <h3 className='text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2'>
                    Teknik Yetkinlik ve Uzmanlık
                  </h3>
                  <ul className='space-y-3 text-gray-700'>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Elektrik mühendisliği veya ilgili alanlarda eğitim geçmişi</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Güneş enerjisi sistemleri ve kablo yönetim teknolojilerine ilgi</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>AutoCAD Electrical, ETAP gibi teknik yazılımlarda deneyim</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Elektrik güvenlik standartları ve normlarına hakim olma</span>
                    </li>
                  </ul>
                </div>

                <div className='bg-white border border-gray-200 p-6 shadow-sm'>
                  <h3 className='text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2'>
                    Kişisel ve Mesleki Yetkinlikler
                  </h3>
                  <ul className='space-y-3 text-gray-700'>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Analitik düşünce ve problem çözme becerileri</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Proje yönetimi ve zaman planlaması yetkinliği</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Detaylara dikkat ve kalite odaklı çalışma anlayışı</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Sürekli öğrenme ve kendini geliştirme motivasyonu</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                <div className='bg-white border border-gray-200 p-6 shadow-sm'>
                  <h3 className='text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2'>
                    İletişim ve Takım Çalışması
                  </h3>
                  <ul className='space-y-3 text-gray-700'>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Teknik konuları net ve anlaşılır şekilde ifade etme yeteneği</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Multidisipliner ekiplerde etkili işbirliği yapabilme</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Müşteri ve tedarikçilerle profesyonel iletişim kurma</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>İngilizce teknik dokümantasyon okuma ve yazma yeteneği</span>
                    </li>
                  </ul>
                </div>

                <div className='bg-white border border-gray-200 p-6 shadow-sm'>
                  <h3 className='text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2'>
                    Adaptasyon ve Gelişim Odaklılık
                  </h3>
                  <ul className='space-y-3 text-gray-700'>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Hızla gelişen teknolojilere uyum sağlama kapasitesi</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Değişen iş süreçlerine esnek yaklaşım sergileme</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Yenilikçi çözümler geliştirme ve uygulama isteği</span>
                    </li>
                    <li className='flex items-start gap-3'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                      <span>Sektörel gelişmeleri takip etme ve uygulama becerisi</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

              {/* İşe Alım Süreci Adımları */}
              <section id='ise-alim-surecimiz' className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>İşe Alım Sürecimiz</h2>
              <div className='w-24 h-1 bg-blue-600 mx-auto mb-6'></div>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Şeffaf ve adil bir değerlendirme süreci ile en uygun adayları belirliyoruz
              </p>
            </div>

            <div className='space-y-8'>
              {/* Başvuru ve Ön Değerlendirme */}
              <div className='bg-white border border-gray-200 shadow-sm'>
                <div className='bg-gray-800 text-white px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      1
                    </div>
                    <h3 className='text-lg font-bold'>Başvuru ve Ön Değerlendirme</h3>
                  </div>
                </div>
                
                <div className='p-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>CV Değerlendirmesi</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Firmamıza iletilen tüm başvurular CV veri tabanımıza kaydedilir</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Gizlilik prensipleri çerçevesinde güvenli şekilde muhafaza edilir</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Açık pozisyonlar için öncelikle veri bankasından araştırma yapılır</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>İlan Yayını ve Havuz Oluşturma</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Farklı platformlarda iş ilanı yayınlanır</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Gerekli nitelik ve deneyimlere uygun adaylar belirlenir</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Aday havuzu oluşturularak işe alım süreci başlatılır</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* İnsan Kaynakları Görüşmesi */}
              <div className='bg-white border border-gray-200 shadow-sm'>
                <div className='bg-gray-700 text-white px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      2
                    </div>
                    <h3 className='text-lg font-bold'>İnsan Kaynakları Ön Görüşmesi</h3>
                  </div>
                </div>
                
                <div className='p-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>Değerlendirme Testleri</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Kişilik envanteri ve uyumluluk testi</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Pozisyon gerektirmesi halinde yabancı dil testi</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Elektrik teknolojileri yetenek ve bilgi testi</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>İlk Görüşme</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Şirket kültürü ve değerler uyumluluğu</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Kariyer hedefleri ve motivasyon değerlendirmesi</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Güneş enerjisi sektörüne olan ilgi ve bilgi seviyesi</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teknik Görüşme */}
              <div className='bg-white border border-gray-200 shadow-sm'>
                <div className='bg-gray-600 text-white px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      3
                    </div>
                    <h3 className='text-lg font-bold'>Teknik Değerlendirme Görüşmesi</h3>
                  </div>
                </div>
                
                <div className='p-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>Bölüm Yöneticisi Görüşmesi</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Teknik yetkinlik ve deneyim değerlendirmesi</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Pozisyona özel beceri ve bilgi kontrolü</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Problem çözme yaklaşımı ve analitik düşünce</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>Ortak Değerler Sorgulaması</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>İnsan Kaynakları ve bölüm yöneticisi birlikte değerlendirme</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Şirket değerleri ve yetkinlikleri sorgulama</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Takım çalışması ve uyum değerlendirmesi</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Üst Yönetim Görüşmesi */}
              <div className='bg-white border border-gray-200 shadow-sm'>
                <div className='bg-gray-500 text-white px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      4
                    </div>
                    <h3 className='text-lg font-bold'>Üst Yönetim Görüşmesi</h3>
                  </div>
                </div>
                
                <div className='p-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>Liderlik Değerlendirmesi</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Stratejik düşünce ve vizyon uyumluluğu</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Şirket kültürü ve değerlerle uyum</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Uzun vadeli kariyer planları ve hedefler</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>Final Karar</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Tüm değerlendirmeler sonucunda nihai karar</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Pozisyon için uygunluk onayı</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>İş teklifi hazırlığı ve onay süreci</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* İş Teklifi ve Başlangıç */}
              <div className='bg-white border border-gray-200 shadow-sm'>
                <div className='bg-gray-400 text-white px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      5
                    </div>
                    <h3 className='text-lg font-bold'>İş Teklifi ve İşe Başlangıç</h3>
                  </div>
                </div>
                
                <div className='p-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>Teklif Sunumu</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Ücret ve yan haklar hakkında detaylı bilgilendirme</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Kariyer gelişim fırsatları ve eğitim programları</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Çalışma koşulları ve şirket imkanları</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className='font-semibold text-gray-900 mb-3'>Oryantasyon Süreci</h4>
                      <ul className='space-y-2 text-gray-700 text-sm'>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Adayın mutabakatı ile işe giriş işlemleri</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Kapsamlı oryantasyon programı başlatılır</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span>Mentor atama ve ilk dönem takibi</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

              {/* CTA Section */}
              <section className='text-center'>
                <div className='bg-blue-50 p-12 border border-blue-200'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    Güneş Enerjisi Geleceğinde Yerinizi Alın
                  </h2>
                  <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
                    Elektrik teknolojilerinde uzmanlaşmak ve sürdürülebilir enerji sektöründe kariyer yapmak istiyorsanız, 
                    IPOS-Steel ailesine katılmak için başvurunuzu yapın.
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link 
                      href='/kariyer-firsatlari'
                      className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold transition-colors duration-200'
                    >
                      Açık Pozisyonları İncele
                    </Link>
                    <Link 
                      href='/iletisim'
                      className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 font-semibold transition-colors duration-200'
                    >
                      CV Gönder
                    </Link>
                  </div>
                </div>
              </section>

          </div>
        </div>
      </div>
    </MaxWidthWrapper>
    </div>
  )
}
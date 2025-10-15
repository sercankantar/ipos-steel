import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'

export default function UcretVeYanHaklarYonetimimiz() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
    <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/kariyer' className='hover:text-white transition-colors'>Kariyer</Link>
              <span className='mx-2'>/</span>
              <span>Ücret ve Yan Haklar Yönetimimiz</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
            Ücret ve Yan Haklar Yönetimimiz
          </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              Güneş enerjisi kablo tavası ve elektrik altyapı çözümlerinde uzmanlaşmış yetenekleri değerlendiren, elektrik teknolojilerindeki yetkinliği ödüllendiren ve sürekli gelişimi destekleyen ücret sistemiyle çalışanlarımızın başarısını teşvik ediyoruz
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-16'>
          {/* Ücretlendirme Politikası */}
          <section className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Ücretlendirme Politikamız</h2>
              <div className='w-24 h-1 bg-blue-600 mx-auto'></div>
            </div>

            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <div className='bg-blue-50 p-6 border-l-4 border-blue-600'>
                  <h3 className='text-xl font-bold text-gray-900 mb-3'>İş Değerleme Sistemi</h3>
                  <p className='text-gray-700 leading-relaxed'>
                    Güneş enerjisi sistemleri ve elektrik kablo yönetim projelerinin karmaşıklığı, uzmanlık seviyesine dayalı bir değerlendirme sistemi gerektirir. 
                    Elektrik mühendisliği sertifikası, kablo tava tasarımı yetkinliği, güneş enerjisi proje deneyimi gibi teknik kriterler ücret politikalarımızın temelini oluşturur.
                  </p>
                </div>

                <div className='bg-gray-50 p-6 border border-gray-200'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Stratejimiz</h3>
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    Yenilenebilir enerji sektöründeki uzman işgücünün kıtlığı ve elektrik teknolojilerindeki yetkinliklerin önemi göz önünde bulundurularak, 
                    sektörel standartların üzerinde rekabetçi ücretlendirme politikası uygularız.
                  </p>
                  
                  <div className='space-y-3'>
                    <h4 className='font-semibold text-gray-900'>Değerlendirme Kriterleri:</h4>
                    <ul className='space-y-2'>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                           <span className='text-gray-700'>Güneş enerjisi ve elektrik altyapı sektörüne özel ücret araştırmaları ve benchmark çalışmaları</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                           <span className='text-gray-700'>Yenilenebilir enerji sektörünün büyüme trendi ve güneş enerjisi proje hacmi</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Şirketin ödeyebilme gücü</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                           <span className='text-gray-700'>Elektrik teknolojileri yetkinliği, proje başarısı ve elektrik güvenlik performansı</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>Şirket içi dengeler ve adalet</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='relative'>
                <img 
                  src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&crop=center'
                  alt='Ücret ve performans yönetimi'
                  className='w-full h-96 object-cover border border-gray-200 shadow-lg'
                />
                <div className='absolute inset-0 bg-blue-900/10'></div>
                
                <div className='absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 border border-gray-200'>
                  <p className='text-sm font-medium text-gray-900'>
                    Personel baz ücretleri yılda bir kez kapsamlı olarak değerlendirilir
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Yan Haklar */}
          <section className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Yan Haklar</h2>
              <div className='w-24 h-1 bg-blue-600 mx-auto mb-6'></div>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Şirketimizin çalışanlarına sağladığı yan haklar, tüm personele sunulan genel olanaklar ve 
                görev gerekliliğine göre sağlanan özel haklar olmak üzere ikiye ayrılmaktadır.
              </p>
            </div>

            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Tüm Çalışanlara Sağlanan Olanaklar */}
              <div className='bg-white border border-gray-200 shadow-lg'>
                <div className='bg-gray-800 text-white px-6 py-6'>
                  <div className='flex items-center gap-3 mb-2'>
                    <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                    </svg>
                    <h3 className='text-xl font-bold'>
                      Tüm Çalışanlara Sağlanan Olanaklar
                    </h3>
                  </div>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    Tüm IPOS-Steel çalışanlarının yararlandığı temel haklar ve sosyal olanaklar
                  </p>
                </div>
                
                <div className='p-6'>
                  <ul className='space-y-4'>
                    <li className='p-4 bg-gray-50 border-l-4 border-blue-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Endüstriyel Sağlık Sigortası</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        Çelik yapı sektörünün iş sağlığı risklerini kapsayan özel sigorta paketi. 
                        Mesleki hastalıklar ve iş kazaları için genişletilmiş koruma.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-blue-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Bireysel Emeklilik Sistemi</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        Belirlenen kıdem süresini tamamlayan çalışanlar için özel emeklilik planı 
                        ve şirket katkı payı desteği.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-blue-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Sektörel Gelişim Destekleri</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        Teknik sertifikasyon sınavları, konferans katılımları ve mesleki gelişim etkinlikleri için mali destek. 
                        Çelik yapı uzmanlığını artıran eğitimlerde öncelik.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-blue-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Teknik Eğitim Programları</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        CAD yazılımları, BIM teknolojileri, kaynak teknikleri ve proje yönetimi eğitimleri. 
                        Uluslararası çelik yapı standartlarında uzmanlaşma fırsatları.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-blue-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Beslenme Hizmetleri</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        Kaliteli ve besleyici günlük öğle yemeği hizmeti. 
                        Dengeli menü seçenekleri ve hijyenik ortam.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-blue-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Personel Ulaşım Hizmeti</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        Güvenli ve konforlu personel servis hizmeti. 
                        Belirlenen güzergahlar üzerinden düzenli ulaşım desteği.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Görevi Gereği Çalışanlara Sağlanan Olanaklar */}
              <div className='bg-white border border-gray-200 shadow-lg'>
                <div className='bg-gray-700 text-white px-6 py-6'>
                  <div className='flex items-center gap-3 mb-2'>
                    <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6' />
                    </svg>
                    <h3 className='text-xl font-bold'>
                      Görevi Gereği Sağlanan Olanaklar
                    </h3>
                  </div>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    Pozisyon ve görev gereklilikleri doğrultusunda sağlanan özel haklar ve imkanlar
                  </p>
                </div>
                
                <div className='p-6'>
                  <ul className='space-y-4'>
                    <li className='p-4 bg-gray-50 border-l-4 border-orange-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Saha Araç Tahsisi</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        Şantiye ziyaretleri ve teknik denetimler için özel donanımlı araçlar. 
                        Güvenlik ekipmanları ve teknik ölçüm cihazları dahil tam donanım.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-orange-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Mobil İletişim Desteği</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        İş amaçlı kullanım için cep telefonu tahsisi ve hat ödemesi. 
                        Kurumsal iletişim altyapısı ve teknik destek.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-orange-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>İletişim Hattı Tahsisi</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        İş amaçlı iletişim için özel hat tahsisi ve aylık ödeme desteği. 
                        Sınırsız konuşma ve data paketi imkanları.
                      </p>
                    </li>
                    
                    <li className='p-4 bg-gray-50 border-l-4 border-orange-600'>
                      <h4 className='font-semibold text-gray-900 mb-2'>Beslenme Kartı Desteği</h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        Pozisyona özel yemek kartı ve aylık beslenme desteği. 
                        Geniş kullanım ağı ve esnek ödeme seçenekleri.
                      </p>
                    </li>
                  </ul>
                  
                  <div className='mt-6 p-4 bg-blue-50 border border-blue-200'>
                    <div className='flex items-start gap-3'>
                      <svg className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      <div>
                        <h4 className='font-semibold text-blue-900 mb-1 text-sm'>Önemli Bilgilendirme</h4>
                        <p className='text-xs text-blue-800 leading-relaxed'>
                          Çelik yapı projelerinin teknik gereklilikleri ve saha koşulları göz önünde bulundurularak belirlenen bu haklar, 
                          pozisyon seviyesi ve proje sorumluluklarına göre uygulanır. Detaylı bilgi için İnsan Kaynakları departmanı ile iletişime geçebilirsiniz.
            </p>
          </div>
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
                Güneş Enerjisi Uzmanları Arıyoruz
              </h2>
              <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
                Elektrik teknolojilerindeki yetkinliği ödüllendiren ücret sistemi ve sektörel gelişimi destekleyen yan haklar ile 
                güneş enerjisi ve elektrik altyapısı alanında uzmanlaşmak isteyen yetenekleri bekliyoruz.
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
                  İletişime Geç
                </Link>
              </div>
            </div>
          </section>

      </div>
    </MaxWidthWrapper>
    </div>
  )
}
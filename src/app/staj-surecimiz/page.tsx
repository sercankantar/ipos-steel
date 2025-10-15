'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function StajSurecimiz() {
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { id: 'genel-bilgiler', title: 'Genel Bilgiler' },
    { id: 'lise-stajlari', title: 'Lise Stajları' },
    { id: 'universite-stajlari', title: 'Üniversite Stajları' },
    { id: 'basvuru-sureci', title: 'Başvuru Süreci' },
    { id: 'degerlendirme', title: 'Değerlendirme Kriterleri' },
    { id: 'oryantasyon', title: 'Oryantasyon Programı' },
    { id: 'staj-alanlari', title: 'Staj Alanları' },
    { id: 'gerekli-belgeler', title: 'Gerekli Belgeler' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
    <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/kariyer-firsatlari' className='hover:text-white transition-colors'>Kariyer</Link>
              <span className='mx-2'>/</span>
              <span>Staj Sürecimiz</span>
            </nav>
            <h1 className='font-neuropol text-3xl lg:text-4xl font-bold mb-4'>
            Staj Sürecimiz
          </h1>
            <p className='text-lg text-gray-300 max-w-4xl mx-auto'>
              IPOS-Steel olarak geleceğin mühendislerine ve teknik personeline değerli deneyimler sunuyoruz
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <div className='flex flex-col lg:flex-row gap-12'>
            
            {/* Sol Sidebar - İçindekiler */}
            <div className='lg:w-1/4'>
              <div className='sticky top-8'>
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                  <h3 className='font-neuropol text-lg font-bold text-gray-900 mb-6'>
                    İçindekiler
                  </h3>
                  <nav className='space-y-2'>
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Ana İçerik */}
            <div className='lg:w-3/4'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-12'>
                
                {/* Genel Bilgiler */}
                <section id='genel-bilgiler'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Genel Bilgiler
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      IPOS-Steel olarak, öğrencilerin mesleki gelişimlerine katkıda bulunmak ve iş hayatına 
                      hazırlanmalarını desteklemek amacıyla kapsamlı staj programları sunmaktayız. Bu programlar, 
                      şirketimizin gelecekteki potansiyel insan kaynağını belirlemeyi ve sektörümüze nitelikli 
                      elemanlar kazandırmayı hedeflemektedir.
                    </p>
                    
                    <div className='grid md:grid-cols-3 gap-6 mb-8'>
                      <div className='bg-blue-50 p-6 rounded-lg text-center'>
                        <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Eğitim Odaklı</h3>
                        <p className='text-sm text-gray-600'>Teorik bilgilerin pratiğe dönüştürülmesi</p>
                      </div>
                      
                      <div className='bg-green-50 p-6 rounded-lg text-center'>
                        <div className='w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Mentörlük</h3>
                        <p className='text-sm text-gray-600'>Deneyimli uzmanlardan birebir rehberlik</p>
                      </div>
                      
                      <div className='bg-purple-50 p-6 rounded-lg text-center'>
                        <div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Sertifika</h3>
                        <p className='text-sm text-gray-600'>Başarılı staj tamamlama belgesi</p>
                      </div>
                    </div>

                    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200'>
                      <h3 className='font-semibold text-gray-900 mb-3'>Staj Programımızın Hedefleri</h3>
                      <ul className='space-y-2 text-gray-700'>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Güneş enerjisi ve elektrik altyapı sektörü hakkında derinlemesine bilgi edinme</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Gerçek projelerde yer alarak pratik deneyim kazanma</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Profesyonel iş ortamında takım çalışması becerilerini geliştirme</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Kariyer planlaması ve mesleki gelişim konularında rehberlik alma</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Lise Stajları */}
                <section id='lise-stajlari'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Lise Stajları
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='grid md:grid-cols-2 gap-8 mb-8'>
                      <div className='bg-orange-50 p-6 rounded-lg border border-orange-200'>
                        <h3 className='font-semibold text-orange-900 mb-4'>Başvuru Dönemi</h3>
                        <div className='space-y-3'>
                          <div className='flex items-center gap-3'>
                            <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                            <span className='text-orange-800'><strong>Mayıs - Haziran</strong> ayları arası</span>
                          </div>
                          <p className='text-sm text-orange-700'>
                            Her yıl belirlenen dönemde başvurular kabul edilir
                          </p>
                        </div>
                      </div>
                      
                      <div className='bg-green-50 p-6 rounded-lg border border-green-200'>
                        <h3 className='font-semibold text-green-900 mb-4'>Staj Dönemi</h3>
                        <div className='space-y-3'>
                          <div className='flex items-center gap-3'>
                            <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <span className='text-green-800'><strong>Eylül - Haziran</strong> okul dönemi</span>
                          </div>
                          <p className='text-sm text-green-700'>
                            Eğitim-öğretim yılı boyunca gerçekleştirilir
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='bg-gray-50 p-6 rounded-lg'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Lise Staj Süreci</h3>
                      <div className='space-y-4'>
                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0'>1</div>
                          <div>
                            <h4 className='font-medium text-gray-900'>İhtiyaç Belirleme</h4>
                            <p className='text-sm text-gray-600'>İnsan Kaynakları Departmanı, Nisan ayında bölümlerin stajyer ihtiyaçlarını belirler</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0'>2</div>
                          <div>
                            <h4 className='font-medium text-gray-900'>Okul İletişimi</h4>
                            <p className='text-sm text-gray-600'>Belirlenen kontenjanlar ilgili okul müdürlüklerine iletilir</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0'>3</div>
                          <div>
                            <h4 className='font-medium text-gray-900'>Sözleşme İmzalama</h4>
                            <p className='text-sm text-gray-600'>Staj yapması kesinleşen öğrencilerin meslek eğitim sözleşmeleri İnsan Kaynakları'na ulaştırılır</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-4'>
                          <div className='w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0'>4</div>
                          <div>
                            <h4 className='font-medium text-gray-900'>Oryantasyon</h4>
                            <p className='text-sm text-gray-600'>Stajın ilk haftasında öğrencilere şirket tanıtımı ve uygulamalarını içeren oryantasyon programı düzenlenir</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Üniversite Stajları */}
                <section id='universite-stajlari'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Üniversite Stajları
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='grid md:grid-cols-2 gap-8 mb-8'>
                      <div className='bg-purple-50 p-6 rounded-lg border border-purple-200'>
                        <h3 className='font-semibold text-purple-900 mb-4'>Başvuru Dönemi</h3>
                        <div className='space-y-3'>
                          <div className='flex items-center gap-3'>
                            <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                            <span className='text-purple-800'><strong>Mart - Mayıs</strong> ayları arası</span>
                          </div>
                          <p className='text-sm text-purple-700'>
                            Yaz stajları için başvurular bu dönemde alınır
                          </p>
                        </div>
                      </div>
                      
                      <div className='bg-indigo-50 p-6 rounded-lg border border-indigo-200'>
                        <h3 className='font-semibold text-indigo-900 mb-4'>Staj Süreleri</h3>
                        <div className='space-y-2'>
                          <div className='flex justify-between items-center'>
                            <span className='text-indigo-800'>Zorunlu Staj:</span>
                            <span className='font-medium text-indigo-900'>20-30 iş günü</span>
                          </div>
                          <div className='flex justify-between items-center'>
                            <span className='text-indigo-800'>Gönüllü Staj:</span>
                            <span className='font-medium text-indigo-900'>15-60 iş günü</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6'>
                      <h3 className='font-semibold text-blue-900 mb-4'>Öncelikli Bölümler</h3>
                      <div className='grid md:grid-cols-2 gap-4'>
                        <div>
                          <h4 className='font-medium text-blue-800 mb-2'>Mühendislik Bölümleri</h4>
                          <ul className='space-y-1 text-sm text-blue-700'>
                            <li>• Elektrik Mühendisliği</li>
                            <li>• Elektrik-Elektronik Mühendisliği</li>
                            <li>• Enerji Sistemleri Mühendisliği</li>
                            <li>• Endüstri Mühendisliği</li>
                            <li>• Makine Mühendisliği</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-blue-800 mb-2'>Diğer Bölümler</h4>
                          <ul className='space-y-1 text-sm text-blue-700'>
                            <li>• İşletme</li>
                            <li>• İktisat</li>
                            <li>• Bilgisayar Mühendisliği</li>
                            <li>• Çevre Mühendisliği</li>
                            <li>• İnsan Kaynakları</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Başvuru Süreci */}
                <section id='basvuru-sureci'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Başvuru Süreci
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 mb-8'>
                      <h3 className='font-semibold text-green-900 mb-4'>Başvuru Adımları</h3>
                      <div className='grid md:grid-cols-3 gap-6'>
                        <div className='text-center'>
                          <div className='w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold'>1</div>
                          <h4 className='font-medium text-green-900 mb-2'>Başvuru</h4>
                          <p className='text-sm text-green-700'>Online başvuru formu doldurma ve belge yükleme</p>
                        </div>
                        <div className='text-center'>
                          <div className='w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold'>2</div>
                          <h4 className='font-medium text-green-900 mb-2'>Değerlendirme</h4>
                          <p className='text-sm text-green-700'>Başvuruların incelenmesi ve ön değerlendirme</p>
                        </div>
                        <div className='text-center'>
                          <div className='w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold'>3</div>
                          <h4 className='font-medium text-green-900 mb-2'>Sonuç</h4>
                          <p className='text-sm text-green-700'>E-posta ile bilgilendirme ve staj yerleştirme</p>
                        </div>
                      </div>
                    </div>

                    <div className='bg-yellow-50 p-6 rounded-lg border border-yellow-200'>
                      <h3 className='font-semibold text-yellow-900 mb-4'>Önemli Notlar</h3>
                      <ul className='space-y-2 text-yellow-800'>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Staj başvuruları belirtilen dönemlerde İnsan Kaynakları Departmanına yapılmalıdır</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Başvuru sırasında gerekli belgelerin eksiksiz olarak sunulması gerekmektedir</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Başvurular belirlenen kriterler doğrultusunda değerlendirilerek adaylara geri bildirimde bulunulur</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Staj kontenjanları sınırlıdır ve başvuru sırası dikkate alınır</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Değerlendirme Kriterleri */}
                <section id='degerlendirme'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Değerlendirme Kriterleri
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='grid md:grid-cols-2 gap-8'>
                      <div className='bg-red-50 p-6 rounded-lg border border-red-200'>
                        <h3 className='font-semibold text-red-900 mb-4'>Akademik Kriterler</h3>
                        <ul className='space-y-2 text-red-800'>
                          <li className='flex items-center gap-2'>
                            <svg className='w-4 h-4 text-red-600' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Genel not ortalaması (min. 2.50/4.00)</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <svg className='w-4 h-4 text-red-600' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Öğrenim gördüğü bölümün uygunluğu</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <svg className='w-4 h-4 text-red-600' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Sınıf seviyesi (3. ve 4. sınıf öncelikli)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
                        <h3 className='font-semibold text-blue-900 mb-4'>Kişisel Kriterler</h3>
                        <ul className='space-y-2 text-blue-800'>
                          <li className='flex items-center gap-2'>
                            <svg className='w-4 h-4 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>İletişim becerileri</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <svg className='w-4 h-4 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Takım çalışmasına uygunluk</span>
                          </li>
                          <li className='flex items-center gap-2'>
                            <svg className='w-4 h-4 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Öğrenme motivasyonu</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Oryantasyon Programı */}
                <section id='oryantasyon'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Oryantasyon Programı
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      Tüm stajyer öğrencilerimiz için kapsamlı bir oryantasyon programı düzenlenmektedir. 
                      Bu program, öğrencilerin şirketimizi tanıması ve staj sürecine en iyi şekilde hazırlanması 
                      amacıyla tasarlanmıştır.
                    </p>
                    
                    <div className='bg-gray-50 p-6 rounded-lg'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Oryantasyon İçeriği</h3>
                      <div className='grid md:grid-cols-2 gap-6'>
                        <div>
                          <h4 className='font-medium text-gray-800 mb-3'>1. Gün - Şirket Tanıtımı</h4>
                          <ul className='space-y-1 text-sm text-gray-700'>
                            <li>• IPOS-Steel tarihçesi ve vizyonu</li>
                            <li>• Organizasyon yapısı</li>
                            <li>• Ürün ve hizmet portföyü</li>
                            <li>• Sektördeki konumumuz</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-800 mb-3'>2. Gün - İş Güvenliği</h4>
                          <ul className='space-y-1 text-sm text-gray-700'>
                            <li>• İş sağlığı ve güvenliği kuralları</li>
                            <li>• Acil durum prosedürleri</li>
                            <li>• Kişisel koruyucu donanım kullanımı</li>
                            <li>• Güvenlik sertifikası</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-800 mb-3'>3. Gün - Teknik Eğitim</h4>
                          <ul className='space-y-1 text-sm text-gray-700'>
                            <li>• Güneş enerjisi sistemleri</li>
                            <li>• Elektrik altyapı çözümleri</li>
                            <li>• Kablo tava sistemleri</li>
                            <li>• Üretim süreçleri</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-800 mb-3'>4. Gün - Departman Tanıtımı</h4>
                          <ul className='space-y-1 text-sm text-gray-700'>
                            <li>• Staj yapılacak departman tanıtımı</li>
                            <li>• Mentör ataması</li>
                            <li>• Staj planının belirlenmesi</li>
                            <li>• Hedef ve beklentilerin paylaşımı</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Staj Alanları */}
                <section id='staj-alanlari'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Staj Alanları
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                      <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
                        <div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-blue-900 mb-3'>Elektrik Mühendisliği</h3>
                        <ul className='space-y-1 text-sm text-blue-800'>
                          <li>• Sistem tasarımı</li>
                          <li>• Proje geliştirme</li>
                          <li>• Test ve ölçüm</li>
                          <li>• Teknik dokümantasyon</li>
                        </ul>
                      </div>
                      
                      <div className='bg-green-50 p-6 rounded-lg border border-green-200'>
                        <div className='w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-green-900 mb-3'>Ar-Ge</h3>
                        <ul className='space-y-1 text-sm text-green-800'>
                          <li>• Yenilikçi çözümler</li>
                          <li>• Ürün geliştirme</li>
                          <li>• Patent çalışmaları</li>
                          <li>• Teknoloji araştırması</li>
                        </ul>
                      </div>
                      
                      <div className='bg-purple-50 p-6 rounded-lg border border-purple-200'>
                        <div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-purple-900 mb-3'>Üretim</h3>
                        <ul className='space-y-1 text-sm text-purple-800'>
                          <li>• Üretim planlama</li>
                          <li>• Kalite kontrol</li>
                          <li>• Süreç iyileştirme</li>
                          <li>• Verimlilik analizi</li>
                        </ul>
                      </div>
                      
                      <div className='bg-orange-50 p-6 rounded-lg border border-orange-200'>
                        <div className='w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-orange-900 mb-3'>Satış & Pazarlama</h3>
                        <ul className='space-y-1 text-sm text-orange-800'>
                          <li>• Müşteri ilişkileri</li>
                          <li>• Pazar analizi</li>
                          <li>• Teknik satış</li>
                          <li>• Proje takibi</li>
                        </ul>
                      </div>
                      
                      <div className='bg-red-50 p-6 rounded-lg border border-red-200'>
                        <div className='w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-red-900 mb-3'>Finans</h3>
                        <ul className='space-y-1 text-sm text-red-800'>
                          <li>• Mali analiz</li>
                          <li>• Bütçe planlama</li>
                          <li>• Maliyet hesaplama</li>
                          <li>• Raporlama</li>
                        </ul>
                      </div>
                      
                      <div className='bg-indigo-50 p-6 rounded-lg border border-indigo-200'>
                        <div className='w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4'>
                          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                          </svg>
                        </div>
                        <h3 className='font-semibold text-indigo-900 mb-3'>İnsan Kaynakları</h3>
                        <ul className='space-y-1 text-sm text-indigo-800'>
                          <li>• Personel işlemleri</li>
                          <li>• Eğitim organizasyonu</li>
                          <li>• Performans yönetimi</li>
                          <li>• İşe alım süreçleri</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Gerekli Belgeler */}
                <section id='gerekli-belgeler'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Gerekli Belgeler
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='grid md:grid-cols-2 gap-8'>
                      <div className='bg-gray-50 p-6 rounded-lg'>
                        <h3 className='font-semibold text-gray-900 mb-4'>Lise Öğrencileri İçin</h3>
                        <ul className='space-y-2 text-gray-700'>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-green-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Staj başvuru formu</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-green-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Öğrenci belgesi</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-green-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Nüfus cüzdanı fotokopisi</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-green-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Okul onay yazısı</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-green-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Sağlık raporu</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className='bg-gray-50 p-6 rounded-lg'>
                        <h3 className='font-semibold text-gray-900 mb-4'>Üniversite Öğrencileri İçin</h3>
                        <ul className='space-y-2 text-gray-700'>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-blue-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Staj başvuru formu</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-blue-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Özgeçmiş (CV)</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-blue-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Öğrenci belgesi</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-blue-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Transkript</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-blue-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Staj defteri (varsa)</span>
                          </li>
                          <li className='flex items-start gap-2'>
                            <svg className='w-4 h-4 text-blue-600 mt-1' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Sigorta belgesi</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

              </div>

              {/* İletişim Bölümü */}
              <div className='mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>İletişim</h2>
                <p className='text-gray-700 mb-6'>
                  Staj programlarımız hakkında daha detaylı bilgi almak için İnsan Kaynakları Departmanımızla iletişime geçebilirsiniz:
                </p>
                <div className='grid md:grid-cols-3 gap-6'>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>E-posta</h3>
                    <a href='mailto:staj@ipossteel.com' className='text-blue-600 hover:text-blue-800'>
                      staj@ipossteel.com
                    </a>
                  </div>
                  
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Telefon</h3>
                    <a href='tel:+902623434343' className='text-blue-600 hover:text-blue-800'>
                      +90 (262) 343 43 43
                    </a>
                  </div>
                  
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Adres</h3>
                    <a 
                      href='https://maps.app.goo.gl/xyz123' 
                      target='_blank' 
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-800 text-sm'
                    >
                      Dilovası Organize Sanayi Bölgesi<br />
                      Kocaeli, Türkiye
                    </a>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
    </div>
  )
}
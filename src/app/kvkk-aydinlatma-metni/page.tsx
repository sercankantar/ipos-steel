'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function KVKKAydinlatmaMetni() {
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { id: 'veri-sorumlusu', title: 'Veri Sorumlusu' },
    { id: 'isleme-amaci', title: 'Kişisel Verilerinizin İşlenme Amacı' },
    { id: 'aktarilmasi', title: 'Kişisel Verilerinizin Aktarılması' },
    { id: 'toplama-yontemi', title: 'Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi' },
    { id: 'haklariniz', title: 'Kişisel Veri Sahibi Olarak Haklarınız' }
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
              <Link href='/kurumsal' className='hover:text-white transition-colors'>Kurumsal</Link>
              <span className='mx-2'>/</span>
              <span>KVKK Aydınlatma Metni</span>
            </nav>
            <h1 className='font-neuropol text-3xl lg:text-4xl font-bold mb-4'>
              Kişisel Verilere İlişkin Aydınlatma Metni
            </h1>
            <p className='text-lg text-gray-300 max-w-4xl mx-auto'>
              IPOS-Steel olarak kişisel verilerinizin işlenmesi konusunda sizi bilgilendiriyoruz
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
                
                {/* Veri Sorumlusu */}
                <section id='veri-sorumlusu'>
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
                    <h2 className='text-xl font-bold text-blue-900 mb-4'>
                      Veri Sorumlusu
                    </h2>
                    <p className='text-blue-800 font-medium'>
                      IPOS-Steel Güneş Enerjisi ve Elektrik Altyapı Çözümleri San. ve Tic. A.Ş.<br />
                      (Dilovası Organize Sanayi Bölgesi, Kocaeli, Türkiye)
                    </p>
                  </div>

                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      Biz, IPOS-Steel Güneş Enerjisi ve Elektrik Altyapı Çözümleri San. ve Tic. A.Ş. olarak; 
                      müşterilerimiz, tedarikçilerimiz ve çalışanlarımız dahil Şirketimiz ile ilişkili şahısların 
                      uhdemizde bulunan kişisel verilerinin Türkiye Cumhuriyeti Anayasası ve insan haklarına ilişkin 
                      ülkemizin tarafı olduğu uluslararası sözleşmeler ile 6698 sayılı Kişisel Verilerin Korunması 
                      Kanunu ("KVKK") başta olmak üzere ilgili mevzuat çerçevesinde; güvence altına alınması ve 
                      işlenmesi konusuna hassasiyetle yaklaşmaktayız.
                    </p>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      Bu çerçevede, <strong>KVKK kapsamında Veri Sorumlusu sıfatıyla</strong> sizleri aydınlatmak istiyoruz.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      Şirketimiz ile müşteri, tedarikçi veya çalışan sıfatı ile paylaştığınız kişisel verileriniz 
                      KVKK'ya uygun şekilde, faaliyet ve hizmet amaçlarımız ile bağlantılı ve ölçülü olarak işlenebilecek, 
                      yurt içi ve yurt dışındaki üçüncü kişilere aktarılabilecek, saklanacak, profilleme için 
                      kullanılabilecek ve sınıflandırılabilecektir.
                    </p>
                  </div>
                </section>

                {/* Kişisel Verilerinizin İşlenme Amacı */}
                <section id='isleme-amaci'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Kişisel Verilerinizin İşlenme Amacı
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      Kişisel verileriniz;
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-gray-700 mb-6'>
                      <li>Hukuka ve dürüstlük kuralının öngördüğü biçimde,</li>
                      <li>İşlenme amaçları ile bağlantılı, sınırlı ve ölçülü olarak,</li>
                      <li>Doğru ve güncel olarak,</li>
                      <li>Belirli, açık ve meşru amaçlar ile</li>
                    </ul>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      KVKK'nın 5 ve 6 numaralı maddelerinde listelenen kişisel verilerin işlenmesine ilişkin 
                      şartlara uygun olarak işlenecektir.
                    </p>
                    
                    <div className='bg-gray-50 p-6 rounded-lg mb-6'>
                      <h3 className='font-semibold text-gray-900 mb-4'>İşlenme Amaçları</h3>
                      <p className='text-gray-700 leading-relaxed mb-4'>
                        Veri sorumlusu olarak Şirketimiz tarafından kişisel verileriniz aşağıdaki amaçlarla işlenebilecektir:
                      </p>
                      <ul className='list-disc pl-6 space-y-2 text-gray-700'>
                        <li>Güneş enerjisi ve elektrik altyapı çözümleri ticari faaliyetlerinin yürütülmesi</li>
                        <li>İş stratejilerinin planlanması</li>
                        <li>Hizmet/ürün satış ve pazarlama süreçlerinin yürütülmesi</li>
                        <li>Satış sonrası destek hizmetlerinin yürütülmesi</li>
                        <li>Şirket birimlerinin çalışma, proje ve işlemlerinin gerçekleştirilmesi</li>
                        <li>İş ilişkisi içerisine girilen üçüncü kişilere bilgi temini sağlanması</li>
                        <li>Kanun ve mevzuat tarafından öngörülen raporlama, saklama yükümlülüklerinin yerine getirilmesi</li>
                        <li>Grup şirketleri olarak iş planı ve risk analizlerinin yürütülmesi</li>
                        <li>Sözleşmesel yükümlülüklerin yerine getirilmesi</li>
                      </ul>
                    </div>

                    <div className='bg-blue-50 p-6 rounded-lg'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Çalışan Verileri</h3>
                      <p className='text-gray-700 leading-relaxed'>
                        Çalışanlarımızın verileri; İş Kanunu, çalışma ve sosyal güvenlik mevzuatı ile yürürlükte 
                        olan diğer mevzuatın öngördüğü zorunlulukların yanı sıra, insan kaynakları politikamız 
                        dahilinde veya performans düzeyini ve çalışan memnuniyetini artırmak, iş güvenliği ve 
                        iş barışının sağlanması gibi işletmesel nedenlerle Şirketimiz, grup şirketlerimiz veya 
                        Şirketimizin iş birliği yaptığı ya da yetkilendirdiği gerçek veya tüzel kişiler tarafından 
                        işlenebilecektir.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Kişisel Verilerinizin Aktarılması */}
                <section id='aktarilmasi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Kişisel Verilerinizin Aktarılması
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      Kişisel verileriniz yukarıda sayılan amaçlar dahilinde, KVKK ve yürürlükte olan mevzuata 
                      uygun olarak, bağlı olduğumuz şirket ve iştirakleri/grup şirketleri ile de paylaşılabileceği 
                      gibi, sayılanlar ile sınırlı olmamak üzere aşağıdaki kişi ve kuruluşlarla paylaşılabilecektir:
                    </p>
                    
                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                      <div className='bg-green-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-3'>Yurt İçi Aktarım</h4>
                        <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                          <li>İş ortaklarımız</li>
                          <li>İş bağlantılarımız</li>
                          <li>Hizmet sağlayıcılarımız</li>
                          <li>İfa yardımcılarımız</li>
                          <li>Tedarikçilerimiz</li>
                          <li>Bayilerimiz</li>
                          <li>Alt yüklenicilerimiz</li>
                          <li>Düzenleyici denetleyici kurumlar</li>
                          <li>Resmi merciler</li>
                        </ul>
                      </div>
                      
                      <div className='bg-yellow-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-3'>Yurt Dışı Aktarım</h4>
                        <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                          <li>Açık rızanızın varlığı ile</li>
                          <li>Barındırma hizmeti alınan anlaşmalı firmalar</li>
                          <li>Yeterli korumanın bulunduğu ülkeler</li>
                          <li>KVKK izninin bulunduğu ülkeler</li>
                          <li>Yazılı taahhüt ile koruma sağlanan ülkeler</li>
                        </ul>
                      </div>
                    </div>

                    <div className='bg-orange-50 border border-orange-200 rounded-lg p-6'>
                      <h4 className='font-semibold text-gray-900 mb-3'>Açık Rıza ile İşleme</h4>
                      <p className='text-gray-700 leading-relaxed mb-3'>
                        Açık rızanızı vermeniz halinde kişisel verileriniz aşağıdaki amaçlarla işlenebilecektir:
                      </p>
                      <ul className='list-disc pl-6 space-y-2 text-gray-700'>
                        <li>Satış sonrası destek hizmetleri</li>
                        <li>Pazar araştırması ve müşteri memnuniyet çalışmaları</li>
                        <li>Anketlerin gerçekleştirilmesi</li>
                        <li>Ürün ve hizmetlerin beğenilerinize göre özelleştirilmesi</li>
                        <li>Tercih ettiğiniz iletişim kanalına reklam, promosyon, kampanya gönderilmesi</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi */}
                <section id='toplama-yontemi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      Kişisel verileriniz, KVKK'nın 5 ve 6 numaralı maddelerinde listelenen şartlara uygun olarak 
                      ve yukarıda belirtilen amaç ve kapsamda sözlü, yazılı veya elektronik olarak toplanabilir.
                    </p>
                    
                    <div className='bg-gray-50 p-6 rounded-lg'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Veri Toplama Kanalları</h3>
                      <p className='text-gray-700 leading-relaxed mb-4'>
                        Kişisel verileriniz, Şirketimiz veya Şirketimiz adına veri işleyen gerçek ya da tüzel 
                        kişiler tarafından sayılanlarla sınırlı olmamak üzere aşağıdaki kanallar aracılığıyla 
                        toplanmaktadır:
                      </p>
                      <div className='grid md:grid-cols-3 gap-4'>
                        <div>
                          <h4 className='font-medium text-gray-900 mb-2'>Dijital Kanallar</h4>
                          <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                            <li>Online formlar</li>
                            <li>İnternet sitesi</li>
                            <li>Mobil uygulamalar</li>
                            <li>Elektronik posta</li>
                            <li>Sosyal ağlar</li>
                            <li>Bültenler</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-900 mb-2'>Fiziksel Kanallar</h4>
                          <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                            <li>Basılı formlar</li>
                            <li>Sözleşmeler</li>
                            <li>Başvuru formları</li>
                            <li>Kartvizit</li>
                            <li>Şikayet formları</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-900 mb-2'>İletişim Kanalları</h4>
                          <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                            <li>Yazılı iletişimler</li>
                            <li>Sözlü iletişimler</li>
                            <li>Telefon görüşmeleri</li>
                            <li>Yüz yüze görüşmeler</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Kişisel Veri Sahibi Olarak Haklarınız */}
                <section id='haklariniz'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    Kişisel Veri Sahibi Olarak Haklarınız
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      KVKK ve yürürlükte bulunan diğer mevzuat çerçevesinde kalmak kaydıyla, aşağıdaki haklara sahipsiniz:
                    </p>
                    
                    <div className='grid gap-4 mb-8'>
                      {[
                        'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
                        'Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme',
                        'Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme',
                        'Yurtiçinde veya yurtdışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme',
                        'Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme',
                        'KVKK mevzuatında öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme',
                        'Düzeltme, silme veya yok etme işlemlerinin üçüncü kişilere bildirilmesini isteme',
                        'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
                        'Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde bu zararın giderilmesini talep etme'
                      ].map((hak, index) => (
                        <div key={index} className='flex items-start gap-3 p-4 bg-blue-50 rounded-lg'>
                          <span className='w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5'>
                            {index + 1}
                          </span>
                          <span className='text-gray-700'>{hak}</span>
                        </div>
                      ))}
                    </div>

                    <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
                      <h3 className='font-semibold text-green-900 mb-4'>Haklarınızı Nasıl Kullanabilirsiniz?</h3>
                      <p className='text-green-800 leading-relaxed mb-4'>
                        Bu haklarınızı kullanmak ile ilgili talebinizi yazılı olarak veya Kişisel Verileri Koruma 
                        Kurulu tarafından ayrı bir yöntem belirlenmesi halinde bu yönteme uygun olarak bize iletebilirsiniz.
                      </p>
                      
                      <div className='grid md:grid-cols-2 gap-4 mb-4'>
                        <div className='bg-white p-4 rounded border border-green-200'>
                          <h4 className='font-medium text-green-900 mb-2'>E-posta ile</h4>
                          <p className='text-sm text-green-800'>
                            <strong>kvkk@ipossteel.com</strong> adresine ıslak imzalı olarak gönderebilirsiniz.
                          </p>
                        </div>
                        <div className='bg-white p-4 rounded border border-green-200'>
                          <h4 className='font-medium text-green-900 mb-2'>KEP ile</h4>
                          <p className='text-sm text-green-800'>
                            <strong>ipossteel@hs01.kep.tr</strong> kayıtlı elektronik posta adresimize güvenli 
                            elektronik imza ile gönderebilirsiniz.
                          </p>
                        </div>
                      </div>

                      <div className='bg-white p-4 rounded border border-green-200'>
                        <h4 className='font-medium text-green-900 mb-2'>Başvuru Şartları</h4>
                        <ul className='list-disc pl-4 space-y-1 text-sm text-green-800'>
                          <li>Talep ettiğiniz hususun açık ve anlaşılır olması</li>
                          <li>Talep ettiğiniz konunun şahsınız ile ilgili olması</li>
                          <li>Başkası adına hareket ediyorsanız özel yetki belgelendirmesi</li>
                          <li>Kimlik ve adres bilgilerini içermesi</li>
                          <li>Kimliğinizi tevsik edici belgelerin eklenmesi</li>
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
                  Kişisel verilerinizle ilgili sorularınız ve KVKK başvurularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className='grid md:grid-cols-3 gap-6'>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>E-posta</h3>
                    <a href='mailto:kvkk@ipossteel.com' className='text-blue-600 hover:text-blue-800'>
                      kvkk@ipossteel.com
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

'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function KVKKGizlilikPolitikasi() {
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { id: 'amac', title: 'Amaç' },
    { id: 'kapsam', title: 'Kapsam' },
    { id: 'tanimlar', title: 'Tanım ve Kısaltmalar' },
    { id: 'roller', title: 'Rol ve Sorumluluklar' },
    { id: 'yukumlulukler', title: 'Hukuki Yükümlülükler' },
    { id: 'siniflandirma', title: 'Kişisel Verilerin Sınıflandırılması' },
    { id: 'islenmesi', title: 'Kişisel Verilerin İşlenmesi' },
    { id: 'aktarilmasi', title: 'Kişisel Verilerin Aktarılması' },
    { id: 'saklanmasi', title: 'Kişisel Verilerin Saklanması' },
    { id: 'guvenligi', title: 'Kişisel Verilerin Güvenliği' },
    { id: 'haklari', title: 'Kişisel Veri Sahibinin Hakları' },
    { id: 'gizlilik', title: 'Gizlilik Politikası' },
    { id: 'giris-cikis', title: 'Şirket Giriş-Çıkışları ve Kişisel Veriler' },
    { id: 'silinmesi', title: 'Kişisel Verilerin Silinmesi' },
    { id: 'yayinlanmasi', title: 'Dokümanın Yayınlanması' },
    { id: 'guncelleme', title: 'Güncelleme Periyodu' },
    { id: 'yururluk', title: 'Yürürlük' }
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
              <span>KVKK Gizlilik Politikası</span>
            </nav>
            <h1 className='font-neuropol text-3xl lg:text-4xl font-bold mb-4'>
              Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası
            </h1>
            <p className='text-lg text-gray-300 max-w-4xl mx-auto'>
              IPOS-Steel olarak kişisel verilerin korunması konusundaki yaklaşımımız ve uyguladığımız politikalar
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
                
                {/* 1. Amaç */}
                <section id='amac'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    1. Amaç
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel Güneş Enerjisi ve Elektrik Altyapı Çözümleri San. ve Tic. A.Ş. (kısaca "IPOS-Steel") olarak; 
                      müşterilerimiz, tedarikçilerimiz ve çalışanlarımız dahil gerçek kişilerin kişisel verilerinin Türkiye Cumhuriyeti 
                      Anayasası ve insan haklarına ilişkin ülkemizin tarafı olduğu uluslararası sözleşmeler ile 6698 sayılı Kişisel 
                      Verilerin Korunması Kanunu ("KVKK") başta olmak üzere ilgili mevzuata uygun olarak işlenmesi ve verisi işlenen 
                      ilgili kişilerin haklarını etkin şekilde kullanılmasının sağlanması önceliğimizdir.
                    </p>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      Bu nedenle, sayılanlarla sınırlı olmamak üzere; çalışanlarımızın, tedarikçilerimizin, müşterilerimizin, 
                      internet sitemizi ziyaret eden kullanıcılarımızın, kısacası faaliyetlerimiz sırasında edindiğimiz otomatik olan 
                      ya da herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilen tüm kişisel 
                      verilere ilişkin verinin işlenmesi, saklanması, aktarılmasına ilişkin işlemleri IPOS-Steel Kişisel Verilerin 
                      Korunması ve İşlenmesi Politikası'na (kısaca "Politika") göre gerçekleştirmekteyiz.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      Kişisel verilerin korunması ve kişisel verileri toplanan gerçek kişilerin temel hak ve hürriyetlerinin gözetilmesi 
                      kişisel verilerin işlenmesine ilişkin politikamızın temel prensibidir. Bu nedenle kişisel verinin işlendiği tüm 
                      faaliyetlerimizi, özel hayatın gizliliğinin korunması, haberleşmenin gizliliği, düşünce ve inanç özgürlüğü, 
                      etkili kanun yollarını kullanma haklarını gözeterek sürdürmekteyiz.
                    </p>
                  </div>
                </section>

                {/* 2. Kapsam */}
                <section id='kapsam'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    2. Kapsam
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      Müşterilerimiz, iş bağlantılarımız, iş ortaklarımız, çalışanlarımız, tedarikçilerimiz, potansiyel müşterilerimiz 
                      ve sair üçüncü kişiler de dahil olmak üzere Şirket tarafından işlenen tüm kişisel veriler bu Politika'nın kapsamındadır.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      Politikamız, Şirket'in sahibi olduğu ya da Şirket tarafından yönetilen, tüm kişisel verilerin işlenmesine yönelik 
                      faaliyetlerde uygulanmakta olup KVKK ve kişisel verilere ilişkin ilgili diğer mevzuat ve bu alandaki uluslararası 
                      standartlar gözetilerek ele alınmış ve hazırlanmıştır.
                    </p>
                  </div>
                </section>

                {/* 3. Tanım ve Kısaltmalar */}
                <section id='tanimlar'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    3. Tanım ve Kısaltmalar
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-6'>
                      Bu bölümde Politika'da geçen özel terim ve deyimler, kavramlar, kısaltmalar vb. kısaca açıklanır.
                    </p>
                    <div className='space-y-4'>
                      <div>
                        <strong className='text-gray-900'>Şirket:</strong>
                        <span className='text-gray-700 ml-2'>IPOS-Steel Güneş Enerjisi ve Elektrik Altyapı Çözümleri San. ve Tic. A.Ş.</span>
                      </div>
                      <div>
                        <strong className='text-gray-900'>Açık Rıza:</strong>
                        <span className='text-gray-700 ml-2'>Belirli bir konuya ilişkin, bilgilendirilmeye ve özgür iradeye dayanan, tereddüte yer bırakmayacak açıklıkta, sadece o işlemle sınırlı olarak verilen onay.</span>
                      </div>
                      <div>
                        <strong className='text-gray-900'>Çalışan:</strong>
                        <span className='text-gray-700 ml-2'>Şirket personeli</span>
                      </div>
                      <div>
                        <strong className='text-gray-900'>Kişisel Veri Sahibi (İlgili Kişi):</strong>
                        <span className='text-gray-700 ml-2'>Kişisel verisi işlenen gerçek kişi.</span>
                      </div>
                      <div>
                        <strong className='text-gray-900'>Kişisel Veri:</strong>
                        <span className='text-gray-700 ml-2'>Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi.</span>
                      </div>
                      <div>
                        <strong className='text-gray-900'>Özel Nitelikli Kişisel Veri:</strong>
                        <span className='text-gray-700 ml-2'>Kişilerin, ırkı, etnik kökeni, siyasi düşüncesi, felsefi inancı, dini, mezhebi, veya diğer inançları, kılık ve kıyafeti, dernek, vakıf ya da sendika üyeliği, sağlığı, cinsel hayatı, ceza mahkumiyeti, ve güvenlik tedbirleriyle ilgili verileri ile biyometrik ve genetik verileri.</span>
                      </div>
                      <div>
                        <strong className='text-gray-900'>KVKK:</strong>
                        <span className='text-gray-700 ml-2'>7 Nisan 2016 tarihli ve 29677 sayılı Resmi Gazetede yayımlanan Kişisel Verilerin Korunması Kanunu</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Rol ve Sorumluluklar */}
                <section id='roller'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    4. Rol ve Sorumluluklar
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel, kişisel verilerin işlenmesi konusunda veri sorumlusu sıfatını haizdir. Bu kapsamda, kişisel verilerin 
                      işleme amaçlarını ve vasıtalarını belirlemek, veri kayıt sisteminin kurulması ve yönetilmesinden sorumlu olmak 
                      gibi yükümlülükleri bulunmaktadır.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      Şirketimiz bünyesinde kişisel verilerin korunması ve işlenmesi konusunda gerekli organizasyonel yapı kurulmuş 
                      olup, bu konudaki sorumluluklar ilgili departmanlar arasında paylaştırılmıştır.
                    </p>
                  </div>
                </section>

                {/* 5. Hukuki Yükümlülükler */}
                <section id='yukumlulukler'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    5. Hukuki Yükümlülükler
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel, KVKK ve ilgili mevzuat kapsamında aşağıdaki hukuki yükümlülükleri yerine getirmektedir:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-gray-700'>
                      <li>Kişisel verilerin hukuka uygun işlenmesini sağlamak</li>
                      <li>Kişisel verilerin doğru ve gerektiğinde güncel olmasını sağlamak</li>
                      <li>Kişisel verilerin belirli, açık ve meşru amaçlarla işlenmesini sağlamak</li>
                      <li>İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olmalarını sağlamak</li>
                      <li>İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza etmek</li>
                    </ul>
                  </div>
                </section>

                {/* 6. Kişisel Verilerin Sınıflandırılması */}
                <section id='siniflandirma'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    6. Kişisel Verilerin Sınıflandırılması
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel tarafından işlenen kişisel veriler aşağıdaki şekilde sınıflandırılmaktadır:
                    </p>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div className='bg-blue-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-2'>Kimlik Verileri</h4>
                        <p className='text-sm text-gray-700'>Ad, soyad, T.C. kimlik numarası, pasaport numarası, doğum tarihi ve yeri</p>
                      </div>
                      <div className='bg-green-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-2'>İletişim Verileri</h4>
                        <p className='text-sm text-gray-700'>Adres, telefon numarası, e-posta adresi, faks numarası</p>
                      </div>
                      <div className='bg-yellow-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-2'>Müşteri İşlem Verileri</h4>
                        <p className='text-sm text-gray-700'>Sipariş bilgileri, ödeme bilgileri, hizmet geçmişi</p>
                      </div>
                      <div className='bg-purple-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-2'>Çalışan Verileri</h4>
                        <p className='text-sm text-gray-700'>Özlük dosyası bilgileri, performans değerlendirmeleri, eğitim kayıtları</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 7. Kişisel Verilerin İşlenmesi */}
                <section id='islenmesi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    7. Kişisel Verilerin İşlenmesi
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel, kişisel verileri aşağıdaki amaçlarla işlemektedir:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-gray-700 mb-6'>
                      <li>Güneş enerjisi ve elektrik altyapı çözümleri hizmetlerinin sunulması</li>
                      <li>Müşteri ilişkileri yönetimi ve müşteri memnuniyetinin sağlanması</li>
                      <li>Ürün ve hizmetlerin geliştirilmesi</li>
                      <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                      <li>İnsan kaynakları süreçlerinin yürütülmesi</li>
                      <li>Finansal işlemlerin gerçekleştirilmesi</li>
                      <li>Güvenlik tedbirlerinin alınması</li>
                    </ul>
                    <p className='text-gray-700 leading-relaxed'>
                      Kişisel veriler, KVKK'nın 5. ve 6. maddelerinde belirtilen işleme şartları dahilinde işlenmektedir.
                    </p>
                  </div>
                </section>

                {/* 8. Kişisel Verilerin Aktarılması */}
                <section id='aktarilmasi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    8. Kişisel Verilerin Aktarılması
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel, kişisel verileri aşağıdaki durumlarda üçüncü kişilerle paylaşabilir:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-gray-700 mb-6'>
                      <li>Yasal yükümlülüklerin yerine getirilmesi amacıyla kamu kurum ve kuruluşlarıyla</li>
                      <li>Hizmet sağlayıcılar ve iş ortakları ile sınırlı olarak</li>
                      <li>Denetim ve müşavirlik hizmetleri kapsamında</li>
                      <li>Mahkeme kararları ve yasal düzenlemeler gereğince</li>
                    </ul>
                    <p className='text-gray-700 leading-relaxed'>
                      Yurt dışına kişisel veri aktarımı, KVKK'nın 9. maddesi kapsamında ve Kişisel Verileri Koruma Kurulu'nun 
                      belirlediği yeterli koruma önlemleri alınarak gerçekleştirilir.
                    </p>
                  </div>
                </section>

                {/* 9. Kişisel Verilerin Saklanması */}
                <section id='saklanmasi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    9. Kişisel Verilerin Saklanması
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      Kişisel veriler, işlendikleri amaç için gerekli olan süre kadar ve ilgili mevzuatta öngörülen süreler 
                      dahilinde saklanmaktadır. Saklama süreleri aşağıdaki kriterlere göre belirlenmektedir:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-gray-700'>
                      <li>İlgili mevzuatta öngörülen saklama süreleri</li>
                      <li>İşlenme amacının gerektirdiği süre</li>
                      <li>Hukuki yükümlülüklerin yerine getirilmesi için gerekli süre</li>
                      <li>Zamanaşımı süreleri</li>
                    </ul>
                  </div>
                </section>

                {/* 10. Kişisel Verilerin Güvenliği */}
                <section id='guvenligi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    10. Kişisel Verilerin Güvenliği
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel, kişisel verilerin güvenliğini sağlamak amacıyla aşağıdaki teknik ve idari tedbirleri almaktadır:
                    </p>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        <h4 className='font-semibold text-gray-900 mb-3'>Teknik Tedbirler</h4>
                        <ul className='list-disc pl-6 space-y-1 text-gray-700 text-sm'>
                          <li>Güvenlik duvarı ve antivirüs sistemleri</li>
                          <li>Veri şifreleme teknolojileri</li>
                          <li>Erişim kontrol sistemleri</li>
                          <li>Yedekleme ve kurtarma sistemleri</li>
                          <li>Güvenlik açığı taramaları</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className='font-semibold text-gray-900 mb-3'>İdari Tedbirler</h4>
                        <ul className='list-disc pl-6 space-y-1 text-gray-700 text-sm'>
                          <li>Gizlilik sözleşmeleri</li>
                          <li>Çalışan eğitimleri</li>
                          <li>Erişim yetkilendirmeleri</li>
                          <li>Güvenlik politikaları</li>
                          <li>Düzenli güvenlik denetimleri</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 11. Kişisel Veri Sahibinin Hakları */}
                <section id='haklari'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    11. Kişisel Veri Sahibinin Hakları
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri aşağıdaki haklara sahiptir:
                    </p>
                    <div className='bg-gray-50 p-6 rounded-lg'>
                      <ul className='space-y-3 text-gray-700'>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Kişisel veri işlenip işlenmediğini öğrenme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesi halinde bu işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</span>
                        </li>
                        <li className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <span>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın giderilmesini talep etme</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 12. Gizlilik Politikası */}
                <section id='gizlilik'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    12. Gizlilik Politikası
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      IPOS-Steel, kişisel verilerin gizliliğini korumak amacıyla aşağıdaki ilkeleri benimser:
                    </p>
                    <ul className='list-disc pl-6 space-y-2 text-gray-700'>
                      <li>Kişisel veriler sadece yetkili personel tarafından erişilebilir</li>
                      <li>Gizlilik sözleşmeleri ile çalışanların sorumluluğu belirlenir</li>
                      <li>Üçüncü kişilerle paylaşım sadece yasal gereklilikler dahilinde yapılır</li>
                      <li>Veri güvenliği sürekli olarak izlenir ve geliştirilir</li>
                    </ul>
                  </div>
                </section>

                {/* 13. Şirket Giriş-Çıkışları */}
                <section id='giris-cikis'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    13. Şirket Giriş-Çıkışları ve Şirket İçinde Kişisel Verileri İşleme
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      Şirketimiz tarafından güvenliğin sağlanması ve işleyişin sürdürülebilmesi amacıyla, şirketimiz binalarında 
                      güvenlik kamerasıyla izleme faaliyeti ile ziyaretçi giriş çıkışlarının takibe alınması, Anayasa, KVKK ve 
                      ilgili diğer mevzuata uygun olarak kişisel veriler işlenmektedir.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      Güvenlik kamera kayıtları sadece güvenlik amacıyla kullanılmakta olup, yetkisiz erişimlere karşı korunmaktadır. 
                      Kayıtlar yasal saklama süreleri dahilinde muhafaza edilmekte ve süre sonunda güvenli şekilde imha edilmektedir.
                    </p>
                  </div>
                </section>

                {/* 14. Kişisel Verilerin Silinmesi */}
                <section id='silinmesi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    14. Kişisel Verilerin Silinmesi, Anonimleştirilmesi
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      KVKK madde 7 ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren 
                      sebeplerin ortadan kalkması halinde kişisel veriler, resen yani Şirket'in kararına istinaden veya kişisel veri 
                      sahibinin talebi ile veri sorumlusu tarafından silinir veya yok edilir.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      Silme veya yok etme işlemleri güvenli yöntemlerle gerçekleştirilmekte olup, verilerin kurtarılamayacak şekilde 
                      imha edilmesi sağlanmaktadır. Anonimleştirme işlemleri ise verilerin kimlik bilgilerinden arındırılarak 
                      istatistiksel amaçlarla kullanılabilir hale getirilmesi şeklinde yapılmaktadır.
                    </p>
                  </div>
                </section>

                {/* 15. Dokümanın Yayınlanması */}
                <section id='yayinlanmasi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    15. Dokümanın Yayınlanması ve Saklanması
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed'>
                      İşbu Politika basılı kağıt ve elektronik ortamda olmak üzere iki farklı ortamda saklanır. Politika, 
                      şirketimizin internet sitesinde yayınlanarak kamuoyunun erişimine sunulur.
                    </p>
                  </div>
                </section>

                {/* 16. Güncelleme Periyodu */}
                <section id='guncelleme'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    16. Güncelleme Periyodu
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed'>
                      İşbu Politika Şirket tarafından belirlenecek periyotlarda gözden geçirilir ve ihtiyaç halinde yasa ve 
                      yönetmeliklerle Şirket içi belirlenen esaslar dahilinde güncellenir.
                    </p>
                  </div>
                </section>

                {/* 17. Yürürlük */}
                <section id='yururluk'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    17. Yürürlük
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <p className='text-gray-700 leading-relaxed'>
                      İşbu Politika şirketimizin internet sitesinde yayınlanmasının ardından yürürlüğe girmiş kabul edilir.
                    </p>
                  </div>
                </section>

              </div>

              {/* İletişim Bölümü */}
              <div className='mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>İletişim</h2>
                <p className='text-gray-700 mb-6'>
                  Kişisel verilerinizle ilgili sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz:
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

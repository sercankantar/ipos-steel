'use client'

import { useEffect, useState } from 'react'

interface EthicsRules {
  id?: string
  heroTitle?: string
  section1Title?: string
  section1Content?: string
  section2Title?: string
  section2Content?: string
  section2Bullets?: string[]
  section3Title?: string
  section3Content?: string
  section3Subsections?: Array<{ title: string; bullets: string[] }>
  section4Title?: string
  section4Content?: string
  section4Bullets?: string[]
  section5Title?: string
  section5Content?: string
  section5Bullets?: string[]
  section6Title?: string
  section6Content?: string
  section6Bullets?: string[]
  section7Title?: string
  section7Subsections?: Array<{ title: string; content: string }>
  contactTitle?: string
  contactDescription?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  contactMapUrl?: string
}

interface EthicsClientProps {
  rules: EthicsRules | null
}

export default function EthicsClient({ rules }: EthicsClientProps) {
  const [activeSection, setActiveSection] = useState('giris')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['giris', 'calisan-iliskileri', 'sirket-disi-iliskiler', 'etik-davranis-kurallari', 'is-sagligi-guvenligi', 'siyasal-faaliyet-yasagi', 'uygulama-prensipleri']
      
      let currentSection = 'giris'
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            currentSection = section
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setActiveSection(sectionId)
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - 100
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      {/* 1. Giriş */}
      <section id='giris' className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
          {rules?.section1Title || '1. Giriş'}
        </h2>
        <div className='space-y-4 text-gray-700'>
          <p>
            {rules?.section1Content || 'IPOS-Steel, güneş enerjisi altyapısı ve elektrik kablo yönetim sistemlerinde kazandığı güven ve itibarı korumak için, tüm çalışanlarından yüksek etik standartlarda davranmalarını bekler. Güneş enerjisi projelerinde elektrik güvenliği, kalite kontrol ve çevresel duyarlılık süreçlerinin kritik önemi nedeniyle, etik davranış kurallarımız sadece iç işleyişimizi değil, müşteri güveni ve yenilenebilir enerji sektöründeki itibarımızı da doğrudan etkiler.'}
          </p>
        </div>
      </section>

      {/* 2. Çalışan İlişkileri */}
      <section id='calisan-iliskileri' className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
          {rules?.section2Title || '2. Çalışan İlişkileri'}
        </h2>
        <div className='space-y-4 text-gray-700'>
          <p>
            {rules?.section2Content || 'Çelik yapı sektörünün teknik karmaşıklığı ve güvenlik gereklilikleri, nitelikli ve motive çalışanlar gerektirir. IPOS-Steel olarak, mühendislerden sahada çalışan teknisyenlere kadar tüm ekibimizin haklarını korur ve mesleki gelişimlerini destekleriz. Çalışan ilişkilerimizin temel prensipleri;'}
          </p>
          {Array.isArray(rules?.section2Bullets) && rules.section2Bullets.length > 0 ? (
            <ul className='space-y-2 ml-6'>
              {rules.section2Bullets.map((bullet, index) => (
                <li key={index} className='flex items-start gap-2'>
                  <span className='text-blue-600 font-bold mt-1'>•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>İşe alımlarda liyakate dayalı seçim yapmak, ayrımcılık yapmadan fırsat eşitliği sağlamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Şirketimizi geleceğe taşıyacak nitelikli çalışanları bünyemize kazandırmak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çalışanların yeteneklerinden, gücünden ve yaratıcılığından azami faydalanmak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çalışanların eğitilmesi, yönlendirilmesi ve geliştirilmesi için imkan ve fırsat eşitliği sağlamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Adil ve rekabetçi ücret politikaları, etkin ve objektif performans değerlendirme sistemi ile başarıyı ödüllendirmek,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Kariyer imkanı ve ödüllendirmede fırsat eşitliği sağlayarak şirkete olan bağlılığını artırmak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çalışma barışını ve sürekliliği sağlamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çalışanlara temiz, sağlıklı ve her türlü iş güvenliği tedbirlerinin alındığı, güvenli çalışma koşulları sağlamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>İşbirliği ve dayanışmanın önemli bir unsur olduğu şeffaf ve karşılıklı saygıyı teşvik eden çalışma ortamını oluşturmak ve sürekliliğini sağlamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>İşyerinde taciz ve psikolojik bezdirmeye (mobbing) hiçbir şekilde müsaade etmemek,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çalışanların görüş ve önerilerini değerlendirmek, yanıtlamak ve motivasyon artırıcı tedbirler almak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çalışanlarla ilgili özel bilgileri, hukuki zorunluluk haricinde, çalışanın izni ve bilgisi olmadan üçüncü şahıslarla paylaşmamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>İnsan haklarına saygılı olmak.</span>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* 3. Şirket Dışı İlişkiler */}
      <section id='sirket-disi-iliskiler' className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
          {rules?.section3Title || '3. Şirket Dışı İlişkiler'}
        </h2>
        <div className='space-y-6 text-gray-700'>
          <p>
            {rules?.section3Content || 'IPOS-Steel\'in paydaşları ile ilişkilerini yönlendiren temel prensipler aşağıdaki gibidir;'}
          </p>

          {Array.isArray(rules?.section3Subsections) && rules.section3Subsections.length > 0 ? (
            rules.section3Subsections.map((subsection, index) => (
              <div key={index}>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>{subsection.title}</h3>
                <ul className='space-y-2 ml-6'>
                  {subsection.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className='flex items-start gap-2'>
                      <span className='text-blue-600 font-bold mt-1'>•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>3.1. Paydaşlarla İletişim</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Şirketimizi toplum nezdinde temsil etmek ve itibarını artırmak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Paydaşlarla iletişim kanallarını açık tutarak eleştiri ve önerileri değerlendirmek, olumlu ilişkiler kurmak ve sürdürmek,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Her türlü eleştiride kişisel görüş bildiriminden kaçınmak.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>3.2. Hissedar İlişkileri</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Şirketimizi toplum nezdinde temsil etmek ve itibarını artırmak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Şirketimizin süregelen güven ve dürüstlük ilkeleri çerçevesinde yönetilmesini sağlamak, sürdürülebilir büyüme ve karlılığı hedef alarak kaynaklarını, varlıklarını ve çalışma zamanını verimlilik bilinciyle yönetmek.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>3.3. Devlet İlişkileri</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Tüm işletme faaliyetlerini ve muhasebe sistemini yasalara göre tam ve uygun bir biçimde yönetmek, kayıt altına almak ve gerektiğinde raporlamak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Faaliyet gösterilen ve yeni yatırım yapılacak ülkelerdeki tüm yasa, kural ve düzenlemelere uymak.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>3.4. Sosyal Sorumluluk</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Ekonomik ve sosyal kalkınmaya katkıda bulunacak çalışmalara destek vermek,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Toplumu / ülkeyi ilgilendiren konulara duyarlılık göstermek ve toplumun olumlu yönde gelişimi için destek vermek.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>3.5. Müşteri İlişkileri</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Müşteriler için değer yaratmak, talep ve gereksinimlerini en üst düzeyde karşılamak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Kaliteli ürün ve hizmet sağlamak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Müşteriler ile ilişkilerde uzun vadeli bir güven ortamı oluşturmak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Satış ve sonrası süreçte müşteri memnuniyetini artırmak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Müşterilere yanıltıcı ve eksik bilgi vermemek.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>3.6. Tedarikçi ve Bayi İlişkileri</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Tedarikçilerle ve bayilerle iş ilişkilerinde karşılıklı değer yaratmak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Tedarikçilerle ve bayilerle iletişimi açık, doğrudan ve doğru bir şekilde yapmak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Tedarikçi ve bayi seçiminde objektif kriterler ile karar vermek,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Tedarikçi ve bayi denetimlerinde ve ziyaretlerinde tedarikçi/bayi tarafından talep edilen gizlilik ve iş güvenliği kurallarına uymak.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>3.7. Rakip ve Rekabet İlişkileri</h3>
                <ul className='space-y-2 ml-6'>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Mevzuatın izin verdiği sınırlar dışında, rakiplerle ya da diğer kişi ya da kuruluşlarla, doğrudan ya da dolaylı olarak rekabeti engelleme, bozma ya da kısıtlama amacını taşıyan veya bu etkiyi yaratan ya da yaratabilecek nitelikte olan anlaşmalar ve davranışları ne şekilde olursa olsun yapmamak,</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-blue-600 font-bold mt-1'>•</span>
                    <span>Belirli bir piyasada tek başına ya da teşebbüslerle birlikte hakim olduğu durumda, bu durumu kötüye kullanmamak.</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. Çalışanların Uyması Gereken Etik Davranış Kuralları */}
      <section id='etik-davranis-kurallari' className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
          {rules?.section4Title || '4. Çalışanların Uyması Gereken Etik Davranış Kuralları'}
        </h2>
        <div className='space-y-4 text-gray-700'>
          <p>
            {rules?.section4Content || 'IPOS-Steel çalışanları, şirketin itibarını korumak ve güçlendirmek amacıyla aşağıdaki etik davranış kurallarına uymakla yükümlüdürler:'}
          </p>
          {Array.isArray(rules?.section4Bullets) && rules.section4Bullets.length > 0 ? (
            <ul className='space-y-2 ml-6'>
              {rules.section4Bullets.map((bullet, index) => (
                <li key={index} className='flex items-start gap-2'>
                  <span className='text-blue-600 font-bold mt-1'>•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Şirket kaynaklarını verimli ve amacına uygun kullanmak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Şirket sırlarını korumak ve yetkisiz kişilerle paylaşmamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çıkar çatışmasından kaçınmak ve şeffaf davranmak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Rüşvet ve yolsuzlukla mücadele etmek,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Adil rekabet kurallarına uymak.</span>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* 5. İş Sağlığı ve İş Güvenliği */}
      <section id='is-sagligi-guvenligi' className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
          {rules?.section5Title || '5. İş Sağlığı ve İş Güvenliği'}
        </h2>
        <div className='space-y-4 text-gray-700'>
          <p>
            {rules?.section5Content || 'IPOS-Steel, çalışanlarının sağlığı ve güvenliği konusunda en yüksek standartları benimser:'}
          </p>
          {Array.isArray(rules?.section5Bullets) && rules.section5Bullets.length > 0 ? (
            <ul className='space-y-2 ml-6'>
              {rules.section5Bullets.map((bullet, index) => (
                <li key={index} className='flex items-start gap-2'>
                  <span className='text-blue-600 font-bold mt-1'>•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Güvenli çalışma ortamı sağlamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>İş güvenliği eğitimleri düzenlemek,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Kişisel koruyucu ekipman sağlamak,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>İş kazalarını önleyici tedbirler almak.</span>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* 6. Siyasal Faaliyet Yasağı */}
      <section id='siyasal-faaliyet-yasagi' className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
          {rules?.section6Title || '6. Siyasal Faaliyet Yasağı'}
        </h2>
        <div className='space-y-4 text-gray-700'>
          <p>
            {rules?.section6Content || 'IPOS-Steel çalışanları, şirket bünyesinde siyasi faaliyet yürütemezler:'}
          </p>
          {Array.isArray(rules?.section6Bullets) && rules.section6Bullets.length > 0 ? (
            <ul className='space-y-2 ml-6'>
              {rules.section6Bullets.map((bullet, index) => (
                <li key={index} className='flex items-start gap-2'>
                  <span className='text-blue-600 font-bold mt-1'>•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className='space-y-2 ml-6'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>İşyerinde siyasi propaganda yapmak yasaktır,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Şirket kaynaklarını siyasi amaçlarla kullanmak yasaktır,</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 font-bold mt-1'>•</span>
                <span>Çalışanların kişisel siyasi görüşlerine saygı gösterilir.</span>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* 7. Uygulama Prensipleri */}
      <section id='uygulama-prensipleri' className='mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
          {rules?.section7Title || '7. Uygulama Prensipleri'}
        </h2>
        <div className='space-y-6 text-gray-700'>
          {Array.isArray(rules?.section7Subsections) && rules.section7Subsections.length > 0 ? (
            rules.section7Subsections.map((subsection, index) => (
              <div key={index}>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>{subsection.title}</h3>
                <p>{subsection.content}</p>
              </div>
            ))
          ) : (
            <>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>7.1. Etik Kuralların Uygulanması</h3>
                <p>Bu etik kurallar tüm IPOS-Steel çalışanları için bağlayıcıdır ve ihlal durumunda disiplin işlemleri uygulanır.</p>
              </div>
              
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>7.2. Bildirim Sistemi</h3>
                <p>Etik ihlalleri güvenli bildirim kanalları aracılığıyla raporlanabilir ve gizlilik esasına göre değerlendirilir.</p>
              </div>
              
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>7.3. Eğitim ve Farkındalık</h3>
                <p>Düzenli etik eğitimleri ile çalışan farkındalığı artırılır ve etik kültür güçlendirilir.</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* İletişim Bilgileri */}
      <div className='bg-gray-50 border border-gray-200 mt-12'>
        <div className='bg-white border-b border-gray-200 px-8 py-6'>
          <h3 className='text-xl font-bold text-gray-900 mb-2'>
            {rules?.contactTitle || 'İletişim'}
          </h3>
          <p className='text-gray-600 text-sm'>
            {rules?.contactDescription || 'Sorularınız ve bildirimleriniz için aşağıdaki e-posta ve posta adreslerini kullanabilir veya Etik Kurul üyeleri ile direkt temasa geçebilirsiniz.'}
          </p>
        </div>
        
        <div className='px-8 py-6'>
          <div className='grid md:grid-cols-3 gap-6'>
            {/* E-posta */}
            <div className='bg-white p-4 border border-gray-200'>
              <h4 className='font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide'>E-posta</h4>
              <a 
                href={`mailto:${rules?.contactEmail || 'info@ipos-steel.com'}`}
                className='text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200'
              >
                {rules?.contactEmail || 'info@ipos-steel.com'}
              </a>
            </div>

            {/* Telefon */}
            <div className='bg-white p-4 border border-gray-200'>
              <h4 className='font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide'>Telefon</h4>
              <a 
                href={`tel:${rules?.contactPhone || '+902626744767'}`}
                className='text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200'
              >
                {rules?.contactPhone || '+90 (262) 674 47 67'}
              </a>
            </div>

            {/* Adres */}
            <div className='bg-white p-4 border border-gray-200'>
              <h4 className='font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide'>Adres</h4>
              <a 
                href={rules?.contactMapUrl || 'https://maps.app.goo.gl/6F7WkS5yQbDf4RW59'}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 block leading-relaxed'
              >
                {rules?.contactAddress || 'Kocaeli Kobi OSB, Organize Sanayi Bölgesi,\n3. Cd. No:52, 41455 Dilovası/Kocaeli'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

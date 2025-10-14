'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState } from 'react'

export default function MusteriMemnuniyetAnketi() {
  const [formData, setFormData] = useState({
    firmaUnvani: '',
    adSoyad: '',
    email: '',
    telefon: '',
    webSayfaYeterli: '',
    aktivitelerYeterli: '',
    nedenIpos: [],
    tekrarCalisma: '',
    istenilenUrunler: '',
    beklentiOneriler: '',
    kvkkOnay: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name === 'kvkkOnay') {
        setFormData(prev => ({ ...prev, [name]: checked }))
      } else {
        setFormData(prev => ({
          ...prev,
          nedenIpos: checked 
            ? [...prev.nedenIpos, value]
            : prev.nedenIpos.filter(item => item !== value)
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form gönderildi:', formData)
    // Form gönderme işlemi burada yapılacak
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
              <span>Müşteri Memnuniyet Anketi</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              Müşteri Memnuniyet Anketi
            </h1>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-16'>
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
              <div className='mb-8'>
                <p className='text-gray-700 text-lg leading-relaxed'>
                  Sizlere daha iyi hizmet sunmak ve ihtiyaçlarınıza daha doğru çözümler sağlamak amacıyla görüşleriniz bizim için önemlidir. 
                  Bu sebeple hazırlamış olduğumuz anketteki sorularımızı cevaplayarak, düşüncelerinizi yazarak geri bildirimde bulunmanızı rica etmekteyiz. 
                  Şimdiden vakit ayırdığınız için teşekkür ederiz.
                </p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Temel Bilgiler */}
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='firmaUnvani' className='block text-sm font-medium text-gray-900 mb-2'>
                      1. Firma Ünvanı *
                    </label>
                    <input
                      type='text'
                      id='firmaUnvani'
                      name='firmaUnvani'
                      value={formData.firmaUnvani}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor='adSoyad' className='block text-sm font-medium text-gray-900 mb-2'>
                      2. Ad Soyad / Ünvan *
                    </label>
                    <input
                      type='text'
                      id='adSoyad'
                      name='adSoyad'
                      value={formData.adSoyad}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-900 mb-2'>
                      3. Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor='telefon' className='block text-sm font-medium text-gray-900 mb-2'>
                      4. Telefon *
                    </label>
                    <input
                      type='tel'
                      id='telefon'
                      name='telefon'
                      value={formData.telefon}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                </div>

                {/* IPOS Steel Çalışanları Değerlendirmesi */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    5. IPOS Steel çalışanlarının, IPOS Steel markasını/firmayı temsil yeteneği
                  </h3>
                  <div className='space-y-4'>
                    {[
                      'Kılık Kıyafet',
                      'Konuşma (Telefon / Yüzyüze)',
                      'Teknik Yeterlilik (Ürün ve Standartlara Hakimiyet, Size Özel Çözüm Üretebilme)',
                      'IPOS Steel Personeline Ulaşım ve Geri Dönüş'
                    ].map((item, index) => (
                      <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                        <label className='block text-sm font-medium text-gray-900 mb-3'>{item}</label>
                        <div className='flex gap-4'>
                          {['Çok İyi', 'İyi', 'Orta', 'Kötü', 'Çok Kötü'].map((rating) => (
                            <label key={rating} className='flex items-center'>
                              <input
                                type='radio'
                                name={`rating_${index}`}
                                value={rating}
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                              />
                              <span className='ml-2 text-sm text-gray-700'>{rating}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hizmet Değerlendirmesi */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>6. Hizmet Değerlendirmesi</h3>
                  <div className='space-y-4'>
                    {[
                      'Bayilerimize ulaşım',
                      'Ziyaret sıklığı',
                      'Talepleriniz öngördüğünüz süre içerisinde karşılanıyor mu?',
                      'Ürün, palet, irsaliye, fatura üzerindeki tanımlamalar, sertifikalar, kataloglar ve uyarı etiketleri, montaj kılavuzları.'
                    ].map((item, index) => (
                      <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                        <label className='block text-sm font-medium text-gray-900 mb-3'>{item}</label>
                        <div className='flex gap-4'>
                          {['Çok İyi', 'İyi', 'Orta', 'Kötü', 'Çok Kötü'].map((rating) => (
                            <label key={rating} className='flex items-center'>
                              <input
                                type='radio'
                                name={`service_${index}`}
                                value={rating}
                                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                              />
                              <span className='ml-2 text-sm text-gray-700'>{rating}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Web Sayfası Değerlendirmesi */}
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-3'>
                    7. Web sayfamızın içeriğini yeterli buluyor musunuz? *
                  </label>
                  <div className='flex gap-6'>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='webSayfaYeterli'
                        value='Evet'
                        onChange={handleInputChange}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                        required
                      />
                      <span className='ml-2 text-sm text-gray-700'>Evet</span>
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='webSayfaYeterli'
                        value='Hayır'
                        onChange={handleInputChange}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                        required
                      />
                      <span className='ml-2 text-sm text-gray-700'>Hayır</span>
                    </label>
                  </div>
                </div>

                {/* Aktiviteler */}
                <div>
                  <label htmlFor='aktivitelerYeterli' className='block text-sm font-medium text-gray-900 mb-3'>
                    8. Reklam, Fuar, Workshop, seminer vb. aktivitelerimizi yeterli buluyor musunuz? *
                  </label>
                  <textarea
                    id='aktivitelerYeterli'
                    name='aktivitelerYeterli'
                    value={formData.aktivitelerYeterli}
                    onChange={handleInputChange}
                    rows={3}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    required
                  />
                </div>

                {/* Neden IPOS Steel */}
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-4'>9. Neden IPOS Steel?</label>
                  <div className='grid md:grid-cols-2 gap-3'>
                    {[
                      'Ürün çeşidinin fazla olması',
                      'Ürün fiyatlarının çok yüksek olmaması',
                      'Ürünlerin yüksek kalitede olması',
                      'Markaya güven duyulması',
                      'Markanın yenilikçi olması',
                      'Markanın teknolojik değişimlere uyumlu olması',
                      'Markanın dikkat çekici reklamlarının olması',
                      'Satın alma sonrası memnuniyete önem verilmesi',
                      'Markanın kolay bulunması',
                      'Servis ve garanti hizmetlerinin etkin olması',
                      'Markanın ürünlerinin prestijli olması',
                      'Hızlı teslimat yapması',
                      'Projelendirme hizmeti vermesi',
                      'Zorunlu kullanıyorum'
                    ].map((option) => (
                      <label key={option} className='flex items-center'>
                        <input
                          type='checkbox'
                          name='nedenIpos'
                          value={option}
                          onChange={handleInputChange}
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                        />
                        <span className='ml-2 text-sm text-gray-700'>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tekrar Çalışma */}
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-3'>
                    10. İhtiyacınız olduğunda bizimle tekrar çalışmak ister misiniz?
                  </label>
                  <div className='space-y-2'>
                    {[
                      'Kesinlikle çalışırım',
                      'Çalışmak isterim',
                      'Belki çalışırım',
                      'Çalışmak istemem',
                      'Kesinlikle çalışmam'
                    ].map((option) => (
                      <label key={option} className='flex items-center'>
                        <input
                          type='radio'
                          name='tekrarCalisma'
                          value={option}
                          onChange={handleInputChange}
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                        />
                        <span className='ml-2 text-sm text-gray-700'>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* İstenilen Ürünler */}
                <div>
                  <label htmlFor='istenilenUrunler' className='block text-sm font-medium text-gray-900 mb-3'>
                    11. IPOS Steel markası altında ürettiklerimizin dışında, IPOS Steel'de görmek istediğiniz ürünler/alanlar nelerdir? *
                  </label>
                  <textarea
                    id='istenilenUrunler'
                    name='istenilenUrunler'
                    value={formData.istenilenUrunler}
                    onChange={handleInputChange}
                    rows={4}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    required
                  />
                </div>

                {/* Beklenti ve Öneriler */}
                <div>
                  <label htmlFor='beklentiOneriler' className='block text-sm font-medium text-gray-900 mb-3'>
                    12. Beklenti ve Önerilerinizi lütfen belirtiniz *
                  </label>
                  <textarea
                    id='beklentiOneriler'
                    name='beklentiOneriler'
                    value={formData.beklentiOneriler}
                    onChange={handleInputChange}
                    rows={4}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    required
                  />
                </div>

                {/* KVKK Onayı */}
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
                  <label className='flex items-start gap-3'>
                    <input
                      type='checkbox'
                      name='kvkkOnay'
                      checked={formData.kvkkOnay}
                      onChange={handleInputChange}
                      className='mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                      required
                    />
                    <span className='text-sm text-gray-700 leading-relaxed'>
                      IPOS Steel Güneş Enerjisi ve Elektrik Altyapı Çözümleri San. ve Tic. A.Ş.'nin web sitesinde yer alan 
                      <Link href='/kvkk-aydinlatma-metni' className='text-blue-600 hover:text-blue-800 mx-1'>
                        Aydınlatma Metni'ni
                      </Link>
                      ve
                      <Link href='/kvkk-gizlilik-politikasi' className='text-blue-600 hover:text-blue-800 mx-1'>
                        Kişisel Verilerin Korunması Politikası'nı
                      </Link>
                      okudum, anladım ve onayladım.
                    </span>
                  </label>
                </div>

                {/* Gönder Butonu */}
                <div className='text-center pt-6'>
                  <button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-semibold text-lg transition-colors duration-200'
                  >
                    Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Radio button değerlerini topla
      const ratingData = {
        kilikKiyafet: getRadioValue('rating_0'),
        konusma: getRadioValue('rating_1'),
        teknikYeterlilik: getRadioValue('rating_2'),
        ulasimGeriDonus: getRadioValue('rating_3'),
        bayilerUlasim: getRadioValue('service_0'),
        ziyaretSikligi: getRadioValue('service_1'),
        talepKarsilama: getRadioValue('service_2'),
        dokumanlar: getRadioValue('service_3')
      }

      const surveyData = {
        ...formData,
        ...ratingData
      }

      console.log('Anket verileri gönderiliyor...', surveyData)

      const response = await fetch('/api/customer-satisfaction-surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      })

      if (response.ok) {
        console.log('Anket başarıyla gönderildi')
        setSubmitStatus('success')
      } else {
        const errorData = await response.json()
        console.error('API hatası:', errorData)
        throw new Error(errorData.error || 'Anket gönderilemedi')
      }
    } catch (error) {
      console.error('Anket gönderilirken hata:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRadioValue = (name: string): number | null => {
    const radio = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement
    if (!radio) return null
    
    const value = radio.value
    const ratingMap: { [key: string]: number } = {
      'Çok Kötü': 1,
      'Kötü': 2,
      'Orta': 3,
      'İyi': 4,
      'Çok İyi': 5
    }
    
    return ratingMap[value] || null
  }

  if (submitStatus === 'success') {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <MaxWidthWrapper>
          <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Anketiniz Alındı!</h2>
            <p className='text-gray-600 mb-6'>
              Değerli görüşleriniz için teşekkür ederiz. Geri bildirimleriniz bizim için çok önemlidir.
            </p>
            <div className='space-y-3'>
              <Link
                href='/'
                className='block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors'
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (submitStatus === 'error') {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <MaxWidthWrapper>
          <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <AlertCircle className='w-8 h-8 text-red-600' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Anket Gönderilemedi!</h2>
            <p className='text-gray-600 mb-6'>
              Anketiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.
            </p>
            <div className='space-y-3'>
              <button
                onClick={() => setSubmitStatus('idle')}
                className='block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors'
              >
                Tekrar Dene
              </button>
              <Link
                href='/'
                className='block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors'
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
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

                {/* IPOS-Steel Çalışanları Değerlendirmesi */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    5. IPOS-Steel çalışanlarının, IPOS-Steel markasını/firmayı temsil yeteneği
                  </h3>
                  <div className='space-y-4'>
                    {[
                      'Kılık Kıyafet',
                      'Konuşma (Telefon / Yüzyüze)',
                      'Teknik Yeterlilik (Ürün ve Standartlara Hakimiyet, Size Özel Çözüm Üretebilme)',
                      'IPOS-Steel Personeline Ulaşım ve Geri Dönüş'
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

                {/* Neden IPOS-Steel */}
                <div>
                  <label className='block text-sm font-medium text-gray-900 mb-4'>9. Neden IPOS-Steel?</label>
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
                    11. IPOS-Steel markası altında ürettiklerimizin dışında, IPOS-Steel'de görmek istediğiniz ürünler/alanlar nelerdir? *
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
                      IPOS-Steel Güneş Enerjisi ve Elektrik Altyapı Çözümleri San. ve Tic. A.Ş.'nin web sitesinde yer alan 
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
                    disabled={isSubmitting}
                    className='bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-12 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2 mx-auto'
                  >
                    {isSubmitting ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <CheckCircle className='w-5 h-5' />
                        Gönder
                      </>
                    )}
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

'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'

export default function StajSurecimiz() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-sm font-bold text-gray-600 mb-2">Kariyer</div>
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              Staj Sürecimiz
            </h1>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Sol Kolon - Metin İçeriği */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                
                {/* Giriş Paragrafı */}
                <p className="text-gray-700 leading-relaxed mb-8">
                  IPOS-Steel olarak; lise ve üniversite öğrencilerine sağladığımız staj olanağı ile öğrencilerin güneş enerjisi kablo tavaları ve elektrik altyapı çözümleri sektöründe gelişimine destek verip iş hayatına hazırlanmalarını sağlarken, şirketimizin gelecekteki potansiyel insan kaynağını belirlemeyi hedefliyoruz.
                </p>

                {/* Lise Stajları Bölümü */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Lise Stajlarında</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Lise staj başvuruları her yıl Mayıs-Haziran ayları içinde kabul edilir ve staj okul dönemi olan Eylül-Haziran ayları içinde gerçekleştirilir.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        İnsan kaynakları departmanı koordinasyonunda şirket genelinde her yılın Nisan ayında "Lise Stajyerleri Kontenjan Anketi" ile bölümlerin öğrenci sayısı, meslek alanı (elektrik, makine, endüstri mühendisliği vb.), staj günü talepleri belirlenir.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Anket sonucu belirlenen stajyer ihtiyacı, İnsan Kaynakları Departmanı tarafından konsolide edilerek, ilgili okul müdürlüklerine gönderilir.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Staj yapması kesinleşen öğrencilerin meslek eğitim sözleşmeleri ilgili okullardan eğitim öğretim yılı başlangıcında İnsan Kaynakları Departmanına ulaştırılarak staj süreci başlatılır.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Stajın ilk haftasında öğrencilere şirket tanıtımı, güneş enerjisi kablo tavaları ve elektrik altyapı çözümleri hakkında bilgilendirme ve uygulamalarını içeren oryantasyon programı uygulanır.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Üniversite Stajları Bölümü */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Üniversite Stajları</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>
                        Üniversite staj başvuruları her yıl, Mart-Mayıs tarihleri arasında gerçekleştirilir. Başvurular ön seçim kriterleri doğrultusunda değerlendirilerek uygun olan stajyer adayları stajyer olarak kabul edilir.
                      </span>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ön Seçim Kriterleri</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>
                          Öğrencinin öğrenim gördüğü bölümün güneş enerjisi, elektrik, makine mühendisliği veya ilgili alanlarda olması,
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>
                          Departman stajyer kontenjanları
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Sonuç Paragrafı */}
                <p className="text-gray-700 leading-relaxed">
                  Yukarıdaki kriterlere göre uygun bulunan adaylar, bölümlerin ihtiyaçlarına göre yerleştirilir. Adaylara staja kabul edilip edilmediği bilgisi e-mail ile verilir.
                </p>

              </div>
            </div>

            {/* Sağ Kolon - Görsel */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=600&fit=crop"
                    alt="IPOS-Steel staj süreci - profesyonel çalışma ortamı"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
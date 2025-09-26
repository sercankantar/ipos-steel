'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useState } from 'react'
import { ChevronDown, Award, Shield, CheckCircle, FileText, Download } from 'lucide-react'

const sertifikalar = [
  {
    id: 'ul-857',
    title: 'UL 857',
    description: 'UL 857 - Kablo Kanalı Sistemi Standartları',
    details: 'UL 857 standardına uygun olarak üretilen kablo kanalı sistemleri için geçerli sertifika. Bu standart, elektriksel güvenlik gereksinimlerini karşılamaktadır.',
    category: 'UL Sertifikaları',
    fileUrl: '/sertifikalar/ul-857.pdf',
    fileType: 'pdf',
    isActive: true
  },
  {
    id: 'ul-greenguard',
    title: 'UL Greenguard',
    description: 'UL Greenguard Çevre Sertifikası',
    details: 'Düşük kimyasal emisyon sertifikası. Ürünlerin iç hava kalitesi standartlarını karşıladığını ve çevre dostu olduğunu belgeler.',
    category: 'Çevre Sertifikaları',
    fileUrl: '/sertifikalar/ul-greenguard.jpg',
    fileType: 'jpg',
    isActive: true
  },
  {
    id: 'entegre-yonetim',
    title: 'Entegre Yönetim Sistemleri (ISO Sertifikaları)',
    description: 'ISO 9001, ISO 14001, ISO 45001 Entegre Yönetim Sistemi',
    details: 'Kalite, Çevre ve İş Sağlığı Güvenliği yönetim sistemlerinin entegre olarak uygulandığını belgeleyen sertifika.',
    category: 'ISO Sertifikaları',
    fileUrl: '/sertifikalar/iso-entegre-yonetim.pdf',
    fileType: 'pdf',
    isActive: true
  },
  {
    id: 'iecee-cb',
    title: 'IECEE 61439-6 – CB ŞEMASI',
    description: 'IEC 61439-6 CB Şema Sertifikası',
    details: 'Uluslararası elektroteknik standartlarına uygunluk için CB şema sertifikası. Busbar trunk sistemleri için geçerlidir.',
    category: 'Uluslararası Sertifikalar',
    fileUrl: '/sertifikalar/iecee-cb-semasi.jpeg',
    fileType: 'jpeg',
    isActive: false
  },
  {
    id: 'yangin-testleri',
    title: 'Yangın Testleri',
    description: 'Yangın Dayanıklılık Test Sertifikaları',
    details: 'Ürünlerin yangın güvenliği standartlarını karşıladığını belgeleyen test sertifikaları. IEC 60332 ve benzeri standartlar.',
    category: 'Güvenlik Sertifikaları',
    fileUrl: '/sertifikalar/yangin-testleri.pdf',
    fileType: 'pdf',
    isActive: true
  },
  {
    id: 'sismik-testler',
    title: 'Sismik Testler',
    description: 'Sismik Dayanıklılık Test Sertifikaları',
    details: 'Ürünlerin deprem ve titreşim koşullarında dayanıklılığını belgeleyen test sertifikaları.',
    category: 'Dayanıklılık Testleri',
    fileUrl: '/sertifikalar/sismik-testler.jpg',
    fileType: 'jpg',
    isActive: true
  },
  {
    id: 'kalay-kaplamadaki-kilcal',
    title: 'Kalay Kaplamadaki Kılcal Çapaklar',
    description: 'Kalay Kaplama Kalite Kontrol Sertifikası',
    details: 'Kalay kaplama işlemlerinin kalite standartlarına uygunluğunu belgeleyen test sertifikası.',
    category: 'Kaplama Sertifikaları',
    fileUrl: '/sertifikalar/kalay-kaplama-kalite.jpeg',
    fileType: 'jpeg',
    isActive: false
  },
  {
    id: 'kema-keur',
    title: 'KEMA KEUR',
    description: 'KEMA KEUR Güvenlik Sertifikası',
    details: 'Hollanda merkezli KEMA tarafından verilen elektriksel güvenlik sertifikası. Avrupa pazarı için önemli bir belge.',
    category: 'Avrupa Sertifikaları',
    fileUrl: '/sertifikalar/kema-keur.pdf',
    fileType: 'pdf',
    isActive: true
  },
  {
    id: 'iec-60068',
    title: 'IEC 60068 Çevre Testleri',
    description: 'IEC 60068 Çevresel Test Sertifikaları',
    details: 'Ürünlerin farklı çevresel koşullarda (sıcaklık, nem, titreşim) performansını belgeleyen test sertifikaları.',
    category: 'Çevresel Testler',
    fileUrl: '/sertifikalar/iec-60068-cevre-testleri.jpg',
    fileType: 'jpg',
    isActive: true
  }
]


export default function SertifikalarPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const kategoriler = Array.from(new Set(sertifikalar.map(s => s.category)))

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              Sertifikalarımız
            </h1>
          </div>
        </MaxWidthWrapper>
      </section>


      {/* Sertifika Listesi */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="font-neuropol text-3xl font-bold mb-6 text-slate-900">
                Sertifikalar ve Test Raporları
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Ürünlerimizin kalite, güvenlik ve performans standartlarına uygunluğunu belgeleyen 
                sertifika ve test raporlarımızı aşağıda bulabilirsiniz.
              </p>
            </div>


            {/* Sertifika Listesi */}
            <div className="space-y-4">
              {sertifikalar.map((sertifika) => (
                <div key={sertifika.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(sertifika.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-2 h-2 rounded-full ${sertifika.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <h3 className="font-neuropol font-bold text-lg text-slate-900">
                          {sertifika.title}
                        </h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {sertifika.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {sertifika.description}
                      </p>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        openItems.includes(sertifika.id) ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {openItems.includes(sertifika.id) && (
                    <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                      <div className="pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {sertifika.details}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-500">
                              <strong>Kategori:</strong> {sertifika.category}
                            </div>
                            <div className="text-sm text-gray-500">
                              <strong>Durum:</strong> 
                              <span className={sertifika.isActive ? "text-green-600" : "text-red-600"}>
                                {sertifika.isActive ? "Aktif" : "Pasif"}
                              </span>
                            </div>
                          </div>
                          <a
                            href={sertifika.fileUrl}
                            download
                            className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-900 transition-colors text-sm"
                          >
                            <Download className="h-4 w-4" />
                            Sertifika İndir ({sertifika.fileType.toUpperCase()})
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* İletişim Bilgisi */}
            <div className="mt-16 p-8 bg-slate-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <h3 className="font-neuropol text-xl font-bold mb-4 text-slate-900">
                  Sertifika Doğrulama
                </h3>
                <p className="text-gray-600 mb-6">
                  Sertifikalarımızın orijinalliğini doğrulamak veya detaylı bilgi almak için 
                  bizimle iletişime geçebilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:+902626744767"
                    className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    📞 +90 (262) 674 47 67
                  </a>
                  <a 
                    href="mailto:info@ipos-steel.com"
                    className="inline-flex items-center gap-2 bg-white text-slate-800 border border-slate-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    ✉️ info@ipos-steel.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

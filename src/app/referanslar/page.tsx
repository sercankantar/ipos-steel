'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'

const referanslar = [
  // Metal ve İnşaat Şirketleri
  { name: 'Eczacıbaşı Holding', logo: 'https://logo.clearbit.com/eczacibasi.com', category: 'Holding' },
  { name: 'Arçelik', logo: 'https://logo.clearbit.com/arcelik.com', category: 'Beyaz Eşya' },
  { name: 'Ford Otomotiv', logo: 'https://logo.clearbit.com/ford.com', category: 'Otomotiv' },
  { name: 'Bosch', logo: 'https://logo.clearbit.com/bosch.com', category: 'Teknoloji' },
  { name: 'Siemens', logo: 'https://logo.clearbit.com/siemens.com', category: 'Teknoloji' },
  
  // Metal İşleme ve Çelik Şirketleri
  { name: 'Erdemir Çelik', logo: 'https://logo.clearbit.com/erdemir.com.tr', category: 'Çelik' },
  { name: 'Kardemir', logo: 'https://logo.clearbit.com/kardemir.com', category: 'Çelik' },
  { name: 'Assan Alüminyum', logo: 'https://logo.clearbit.com/assan.com.tr', category: 'Alüminyum' },
  { name: 'Tekfen Holding', logo: 'https://logo.clearbit.com/tekfen.com', category: 'Holding' },
  { name: 'OYAK Çimento', logo: 'https://logo.clearbit.com/oyak.com.tr', category: 'Çimento' },
  
  // İnşaat ve Altyapı
  { name: 'Enka İnşaat', logo: 'https://logo.clearbit.com/enka.com', category: 'İnşaat' },
  { name: 'Rönesans Holding', logo: 'https://logo.clearbit.com/ronesans.com', category: 'İnşaat' },
  { name: 'Limak Holding', logo: 'https://logo.clearbit.com/limak.com.tr', category: 'İnşaat' },
  { name: 'Gama Holding', logo: 'https://logo.clearbit.com/gama.com.tr', category: 'İnşaat' },
  { name: 'TAV Havalimanları', logo: 'https://logo.clearbit.com/tav.aero', category: 'Havacılık' },
  
  // Enerji ve Elektrik
  { name: 'TEDAŞ', logo: 'https://logo.clearbit.com/tedas.gov.tr', category: 'Enerji' },
  { name: 'Enerjisa', logo: 'https://logo.clearbit.com/enerjisa.com.tr', category: 'Enerji' },
  { name: 'Aksa Enerji', logo: 'https://logo.clearbit.com/aksa.com.tr', category: 'Enerji' },
  { name: 'Zorlu Enerji', logo: 'https://logo.clearbit.com/zorluenerji.com.tr', category: 'Enerji' },
  { name: 'Kalyon Enerji', logo: 'https://logo.clearbit.com/kalyon.com.tr', category: 'Enerji' },
  
  // Maden ve Metal
  { name: 'Eti Maden', logo: 'https://logo.clearbit.com/etimaden.gov.tr', category: 'Maden' },
  { name: 'Tüpraş', logo: 'https://logo.clearbit.com/tupras.com.tr', category: 'Petrol' },
  { name: 'SASA Polyester', logo: 'https://logo.clearbit.com/sasa.com.tr', category: 'Kimya' },
  { name: 'Akçansa Çimento', logo: 'https://logo.clearbit.com/akcansa.com.tr', category: 'Çimento' },
  { name: 'İçdaş Çelik', logo: 'https://logo.clearbit.com/icdas.com.tr', category: 'Çelik' }
]

export default function ReferanslarPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              Referanslarımız
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Türkiye'nin önde gelen şirketleriyle gerçekleştirdiğimiz başarılı projeler
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Referanslar Grid */}
      <section className="py-20">
        <MaxWidthWrapper>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {referanslar.map((referans, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
              >
                {/* Logo */}
                <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center border border-gray-100 group-hover:bg-gray-100 transition-colors p-4">
                  <img
                    src={referans.logo}
                    alt={`${referans.name} Logo`}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="text-center hidden">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-gray-400 text-xs font-bold">
                        {referans.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      Logo
                    </p>
                  </div>
                </div>
                
                {/* Şirket Bilgileri */}
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900 text-sm mb-2 group-hover:text-slate-700 transition-colors">
                    {referans.name}
                  </h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {referans.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>


    </div>
  )
}

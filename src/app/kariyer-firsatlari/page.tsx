'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'

export default function KariyerFirsatlari() {

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
    <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <span>Kariyer</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              Kariyer
          </h1>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className='max-w-7xl'>
        <div className='py-20'>
          {/* Ana İçerik */}
          <div className='mx-auto'>
            {/* Başlık ve Açıklama Bölümü */}
            <div className='text-center mb-16'>
              <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-neuropol'>Kariyer Fırsatlarımız</h2>
              <div className='w-24 h-1 bg-blue-600 mx-auto mb-8'></div>
              <p className='text-gray-700 text-xl leading-relaxed max-w-4xl mx-auto'>
                IPOS Steel'de açılan pozisyonlar için aşağıdaki bağlantılardan bilgi alabilir ve başvuru yapabilirsiniz. 
                Paylaşılan bağlantılardan kendinize uygun bir iş ilanı mevcut değil ise iş başvurunuzu insan kaynakları 
                CV veri tabanına eklemek için "Genel Başvuru" üzerinden başvuru yapabilirsiniz.
              </p>
            </div>

            {/* Açık Pozisyonlar Grid - EAE Tarzı */}
            <div className='mb-20'>
              <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                {/* Kariyer.net */}
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                  <div className='h-64 bg-white flex items-center justify-center p-8'>
                    <img 
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Kariyer.net_logo.svg/2560px-Kariyer.net_logo.svg.png' 
                      alt='Kariyer.net'
                      className='max-w-full max-h-full object-contain'
                      onError={(e) => {
                        e.currentTarget.src = 'https://logo.clearbit.com/kariyer.net';
                        e.currentTarget.className = 'h-20 w-auto object-contain';
                      }}
                    />
                  </div>
                  <div className='p-6 text-center border-t border-gray-100'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Açık Pozisyonlar</h3>
                    <Link 
                      href='/acik-pozisyonlar'
                      className='inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors duration-200'
                    >
                      Sayfaya Git
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                  <div className='h-64 bg-white flex items-center justify-center p-8'>
                    <img 
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png' 
                      alt='LinkedIn'
                      className='max-w-full max-h-full object-contain'
                      onError={(e) => {
                        e.currentTarget.src = 'https://logo.clearbit.com/linkedin.com';
                        e.currentTarget.className = 'h-20 w-auto object-contain';
                      }}
                    />
                  </div>
                  <div className='p-6 text-center border-t border-gray-100'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Açık Pozisyonlar</h3>
                    <Link 
                      href='/acik-pozisyonlar'
                      className='inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors duration-200'
                    >
                      Sayfaya Git
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Elaman.net */}
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                  <div className='h-64 bg-white flex items-center justify-center p-8'>
                    <img 
                      src='https://www.elaman.net/images/elaman-logo.png' 
                      alt='Elaman.net'
                      className='max-w-full max-h-full object-contain'
                      onError={(e) => {
                        e.currentTarget.src = 'https://logo.clearbit.com/elaman.net';
                        e.currentTarget.className = 'h-20 w-auto object-contain';
                      }}
                    />
                  </div>
                  <div className='p-6 text-center border-t border-gray-100'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Açık Pozisyonlar</h3>
                    <Link 
                      href='/acik-pozisyonlar'
                      className='inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition-colors duration-200'
                    >
                      Sayfaya Git
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* KVKK Onay */}
            <div className='bg-blue-50 border border-blue-200 rounded-xl p-8 mb-20 max-w-4xl mx-auto text-center'>
              <p className='text-gray-700 leading-relaxed'>
                <span className='font-semibold text-blue-900'>* Aday Çalışan KVKK Açık Rıza Metni</span>, okudum, anladım ve onaylıyorum
              </p>
            </div>

          </div>
        </div>
      </MaxWidthWrapper>
      </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'

interface CareerOpportunitiesData {
  id: string
  heroTitle: string
  heroSubtitle?: string
  mainTitle: string
  mainSubtitle?: string
  mainDescription: string
  platformCards: Array<{
    title: string
    logoUrl: string
    buttonText: string
    buttonLink: string
    buttonColor: string
  }>
  kvkkTitle: string
  kvkkContent: string
}

export default function KariyerFirsatlariClient() {
  const [data, setData] = useState<CareerOpportunitiesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/career-opportunities')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Veri yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='bg-gray-900 py-16'>
          <MaxWidthWrapper>
            <div className='text-center text-white'>
              <div className='h-8 w-64 bg-gray-700 rounded animate-pulse mx-auto mb-4'></div>
              <div className='h-12 w-96 bg-gray-700 rounded animate-pulse mx-auto mb-4'></div>
            </div>
          </MaxWidthWrapper>
        </div>
        <MaxWidthWrapper className='max-w-7xl'>
          <div className='py-20'>
            <div className='h-96 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Veri Bulunamadı</h1>
          <p className='text-gray-600'>Kariyer fırsatları bilgileri yüklenemedi.</p>
        </div>
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
              <span>Kariyer</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              {data.heroTitle}
            </h1>
            {data.heroSubtitle && (
              <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
                {data.heroSubtitle}
              </p>
            )}
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper className='max-w-7xl'>
        <div className='py-20'>
          {/* Ana İçerik */}
          <div className='mx-auto'>
            {/* Başlık ve Açıklama Bölümü */}
            <div className='text-center mb-16'>
              <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-neuropol'>
                {data.mainTitle}
              </h2>
              <div className='w-24 h-1 bg-blue-600 mx-auto mb-8'></div>
              {data.mainSubtitle && (
                <h3 className='text-2xl font-semibold text-gray-800 mb-6'>
                  {data.mainSubtitle}
                </h3>
              )}
              <div 
                className='text-gray-700 text-xl leading-relaxed max-w-4xl mx-auto prose prose-lg prose-gray'
                dangerouslySetInnerHTML={{ __html: data.mainDescription }}
              />
            </div>

            {/* Açık Pozisyonlar Grid */}
            <div className='mb-20'>
              <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                {data.platformCards.map((card, index) => (
                  <div key={index} className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                    <div className='h-64 bg-white flex items-center justify-center p-8'>
                      <img 
                        src={card.logoUrl} 
                        alt={card.title}
                        className='max-w-full max-h-full object-contain'
                        onError={(e) => {
                          e.currentTarget.src = 'https://logo.clearbit.com/' + card.title.toLowerCase().replace(/\s+/g, '');
                          e.currentTarget.className = 'h-20 w-auto object-contain';
                        }}
                      />
                    </div>
                    <div className='p-6 text-center border-t border-gray-100'>
                      <h3 className='text-lg font-semibold text-gray-900 mb-4'>{card.title}</h3>
                      <Link 
                        href={card.buttonLink}
                        className={`inline-flex items-center gap-2 ${card.buttonColor} text-white px-6 py-2 rounded font-medium transition-colors duration-200`}
                      >
                        {card.buttonText}
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KVKK Onay */}
            <div className='bg-blue-50 border border-blue-200 rounded-xl p-8 mb-20 max-w-4xl mx-auto text-center'>
              <p className='text-gray-700 leading-relaxed'>
                <span className='font-semibold text-blue-900'>{data.kvkkTitle}</span>, {data.kvkkContent}
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

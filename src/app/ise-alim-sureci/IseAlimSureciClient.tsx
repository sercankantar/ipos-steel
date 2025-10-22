'use client'

import { useState, useEffect } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'

interface RecruitmentProcessData {
  id: string
  heroTitle: string
  heroSubtitle: string
  purposeTitle: string
  purposeMissionTitle: string
  purposeMissionContent: string
  purposeValuesTitle: string
  purposeValuesContent: string
  purposeValues: Array<{ title: string; description: string }>
  purposeImageUrl?: string
  purposeImageCaption?: string
  requirementsTitle: string
  requirementsSubtitle: string
  requirementsCategories: Array<{ title: string; items: string[] }>
  processTitle: string
  processSubtitle: string
  processSteps: Array<{
    stepNumber: number
    title: string
    leftTitle: string
    leftItems: string[]
    rightTitle: string
    rightItems: string[]
    bgColor: string
  }>
  ctaTitle: string
  ctaContent: string
  ctaButton1Text: string
  ctaButton1Link: string
  ctaButton2Text: string
  ctaButton2Link: string
}

export default function IseAlimSureciClient() {
  const [data, setData] = useState<RecruitmentProcessData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('amacimiz')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!data) return

    const handleScroll = () => {
      const sections = ['amacimiz', 'aradigimiz-ozellikler', 'ise-alim-surecimiz']
      
      let currentSection = 'amacimiz'
      
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
  }, [data])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/recruitment-process')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Veri yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

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

  if (loading) {
    return (
      <div className='min-h-screen bg-white'>
        <div className='bg-gray-900 py-16'>
          <MaxWidthWrapper>
            <div className='text-center text-white'>
              <div className='h-8 w-64 bg-gray-700 rounded animate-pulse mx-auto mb-4'></div>
              <div className='h-12 w-96 bg-gray-700 rounded animate-pulse mx-auto mb-4'></div>
              <div className='h-6 w-full max-w-3xl bg-gray-700 rounded animate-pulse mx-auto'></div>
            </div>
          </MaxWidthWrapper>
        </div>
        <MaxWidthWrapper>
          <div className='py-16'>
            <div className='h-96 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Veri Bulunamadı</h1>
          <p className='text-gray-600'>İşe alım süreci bilgileri yüklenemedi.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white scroll-smooth'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/kariyer' className='hover:text-white transition-colors'>Kariyer</Link>
              <span className='mx-2'>/</span>
              <span>İşe Alım Süreci</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              {data.heroTitle}
            </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              {data.heroSubtitle}
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-16'>
          <div className='grid lg:grid-cols-4 gap-8'>
            {/* Sol Sidebar - İçindekiler */}
            <div className='lg:col-span-1'>
              <div className='sticky top-4 max-h-[calc(100vh-2rem)] overflow-hidden'>
                <div className='bg-white border border-gray-200 shadow-sm flex flex-col max-h-full'>
                  <div className='bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0'>
                    <h2 className='text-lg font-semibold text-gray-900'>İçindekiler</h2>
                  </div>
                  <nav className='p-4 overflow-y-auto flex-1'>
                    <ul className='space-y-2 text-sm'>
                      <li>
                        <button 
                          onClick={() => handleMenuClick('amacimiz')}
                          className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'amacimiz' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                        >
                          <span className={`w-6 font-medium ${activeSection === 'amacimiz' ? 'text-blue-600' : 'text-gray-400'}`}>1.</span>
                          <span>Amacımız</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleMenuClick('aradigimiz-ozellikler')}
                          className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'aradigimiz-ozellikler' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                        >
                          <span className={`w-6 font-medium ${activeSection === 'aradigimiz-ozellikler' ? 'text-blue-600' : 'text-gray-400'}`}>2.</span>
                          <span>Aradığımız Özellikler</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => handleMenuClick('ise-alim-surecimiz')}
                          className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'ise-alim-surecimiz' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                        >
                          <span className={`w-6 font-medium ${activeSection === 'ise-alim-surecimiz' ? 'text-blue-600' : 'text-gray-400'}`}>3.</span>
                          <span>İşe Alım Sürecimiz</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            {/* Sağ İçerik Alanı */}
            <div className='lg:col-span-3 space-y-12'>
              {/* Amacımız Section */}
              <section id='amacimiz' className='mb-16'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-4'>{data.purposeTitle}</h2>
                  <div className='w-24 h-1 bg-blue-600 mx-auto'></div>
                </div>

                {/* Fotoğraf - Tek sütun en üstte */}
                <div className='relative mb-12'>
                  <img 
                    src={data.purposeImageUrl || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center'}
                    alt='Güneş enerjisi ekibi ve işe alım süreci'
                    className='w-full h-96 lg:h-[500px] object-cover border border-gray-200 shadow-lg'
                  />
                  <div className='absolute inset-0 bg-blue-900/10'></div>
                  
                  {data.purposeImageCaption && (
                    <div className='absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 border border-gray-200'>
                      <p className='text-sm font-medium text-gray-900'>
                        {data.purposeImageCaption}
                      </p>
                    </div>
                  )}
                </div>

                {/* Yazılar - Sol sağ düzeni */}
                <div className='grid lg:grid-cols-2 gap-8'>
                  <div className='bg-blue-50 p-6 border-l-4 border-blue-600'>
                    <h3 className='text-xl font-bold text-gray-900 mb-3'>{data.purposeMissionTitle}</h3>
                    <p className='text-gray-700 leading-relaxed'>
                      {data.purposeMissionContent}
                    </p>
                  </div>

                  <div className='bg-gray-50 p-6 border border-gray-200'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>{data.purposeValuesTitle}</h3>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      {data.purposeValuesContent}
                    </p>
                    
                    <div className='grid md:grid-cols-1 gap-4'>
                      {data.purposeValues.map((value, index) => (
                        <div key={index} className='flex items-start gap-3'>
                          <span className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                          <div>
                            <div className='font-semibold text-gray-900'>{value.title}</div>
                            <div className='text-sm text-gray-600'>{value.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Aradığımız Özellikler */}
              <section id='aradigimiz-ozellikler' className='mb-16'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-4'>{data.requirementsTitle}</h2>
                  <div className='w-24 h-1 bg-blue-600 mx-auto mb-6'></div>
                  <p className='text-gray-600 max-w-2xl mx-auto'>
                    {data.requirementsSubtitle}
                  </p>
                </div>

                <div className='space-y-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    {data.requirementsCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className='bg-white border border-gray-200 p-6 shadow-sm'>
                        <h3 className='text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2'>
                          {category.title}
                        </h3>
                        <ul className='space-y-3 text-gray-700'>
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className='flex items-start gap-3'>
                              <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* İşe Alım Süreci Adımları */}
              <section id='ise-alim-surecimiz' className='mb-16'>
                <div className='text-center mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-4'>{data.processTitle}</h2>
                  <div className='w-24 h-1 bg-blue-600 mx-auto mb-6'></div>
                  <p className='text-gray-600 max-w-2xl mx-auto'>
                    {data.processSubtitle}
                  </p>
                </div>

                <div className='space-y-8'>
                  {data.processSteps.map((step, stepIndex) => (
                    <div key={stepIndex} className='bg-white border border-gray-200 shadow-sm'>
                      <div className={`${step.bgColor} text-white px-6 py-4`}>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                            {step.stepNumber}
                          </div>
                          <h3 className='text-lg font-bold'>{step.title}</h3>
                        </div>
                      </div>
                      
                      <div className='p-6'>
                        <div className='grid md:grid-cols-2 gap-6'>
                          <div>
                            <h4 className='font-semibold text-gray-900 mb-3'>{step.leftTitle}</h4>
                            <ul className='space-y-2 text-gray-700 text-sm'>
                              {step.leftItems.map((item, itemIndex) => (
                                <li key={itemIndex} className='flex items-start gap-2'>
                                  <span className='text-blue-600 font-bold'>•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className='font-semibold text-gray-900 mb-3'>{step.rightTitle}</h4>
                            <ul className='space-y-2 text-gray-700 text-sm'>
                              {step.rightItems.map((item, itemIndex) => (
                                <li key={itemIndex} className='flex items-start gap-2'>
                                  <span className='text-blue-600 font-bold'>•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className='text-center'>
                <div className='bg-blue-50 p-12 border border-blue-200'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                    {data.ctaTitle}
                  </h2>
                  <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
                    {data.ctaContent}
                  </p>
                  <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link 
                      href={data.ctaButton1Link}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold transition-colors duration-200'
                    >
                      {data.ctaButton1Text}
                    </Link>
                    <Link 
                      href={data.ctaButton2Link}
                      className='border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 font-semibold transition-colors duration-200'
                    >
                      {data.ctaButton2Text}
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

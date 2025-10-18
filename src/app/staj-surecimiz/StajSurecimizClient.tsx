'use client'

import { useState, useEffect } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'

interface InternshipProcessData {
  id: string
  heroTitle: string
  heroSubtitle?: string
  mainDescription: string
  highSchoolTitle: string
  highSchoolBullets: string[]
  universityTitle: string
  universityBullets: string[]
  criteriaTitle: string
  criteriaBullets: string[]
  conclusionParagraph: string
  imageUrl?: string
  imageAlt?: string
}

export default function StajSurecimizClient() {
  const [data, setData] = useState<InternshipProcessData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/internship-process')
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
      <div className='min-h-screen bg-white'>
        {/* Hero Section Skeleton */}
        <section className="bg-white py-12 border-b border-gray-200">
          <MaxWidthWrapper>
            <div className="text-center max-w-4xl mx-auto">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
              <div className="h-10 w-80 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
          </MaxWidthWrapper>
        </section>

        {/* Content Skeleton */}
        <section className="py-16">
          <MaxWidthWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </MaxWidthWrapper>
        </section>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Veri Bulunamadı</h1>
          <p className="text-gray-600">Staj süreci bilgileri yüklenemedi.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-sm font-bold text-gray-600 mb-2">Kariyer</div>
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              {data.heroTitle}
            </h1>
            {data.heroSubtitle && (
              <p className="text-lg text-gray-600">{data.heroSubtitle}</p>
            )}
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
                  {data.mainDescription}
                </p>

                {/* Lise Stajları Bölümü */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{data.highSchoolTitle}</h2>
                  <ul className="space-y-3 text-gray-700">
                    {data.highSchoolBullets.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Üniversite Stajları Bölümü */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{data.universityTitle}</h2>
                  <ul className="space-y-3 text-gray-700">
                    {data.universityBullets.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{data.criteriaTitle}</h3>
                    <ul className="space-y-2 text-gray-700">
                      {data.criteriaBullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sonuç Paragrafı */}
                <p className="text-gray-700 leading-relaxed">
                  {data.conclusionParagraph}
                </p>

              </div>
            </div>

            {/* Sağ Kolon - Görsel */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                  {data.imageUrl ? (
                    <Image
                      src={data.imageUrl}
                      alt={data.imageAlt || "IPOS-Steel staj süreci - profesyonel çalışma ortamı"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=600&fit=crop"
                      alt="IPOS-Steel staj süreci - profesyonel çalışma ortamı"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}

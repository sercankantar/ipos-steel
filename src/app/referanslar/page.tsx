'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useEffect, useState } from 'react'

interface Reference {
  id: string
  name: string
  sector: string
  logoUrl?: string
  isActive: boolean
}

export default function ReferanslarPage() {
  const [items, setItems] = useState<Reference[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/references', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        setItems(data)
      } catch (e) {}
    }
    load()
  }, [])

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
            {items.map((referans) => (
              <div
                key={referans.id}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
              >
                {/* Logo */}
                <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center border border-gray-100 group-hover:bg-gray-100 transition-colors p-4">
                  <img
                    src={referans.logoUrl || ''}
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
                    {referans.sector}
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

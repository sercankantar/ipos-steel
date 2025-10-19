'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Download, FileText, Calendar, Eye, Tag, ChevronDown, ExternalLink, Monitor, Printer, Share2, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ManualClient from './ManualClient'

interface Manual {
  id: string
  title: string
  description: string
  category: {
    id: string
    name: string
    color: string
  }
  fileType: string
  fileSize: string
  imageUrl?: string
  pages?: number
  language: string
  version?: string
  publishDate: string
  downloadCount: number
  featured: boolean
}

interface Category {
  id: string
  name: string
  color: string
}

interface PageSettings {
  heroTitle: string
  heroSubtitle: string
}

export default function ElKitaplariMontajKilavuzlariPage() {
  const [manuals, setManuals] = useState<Manual[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pageSettings, setPageSettings] = useState<PageSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const [manualsRes, categoriesRes, settingsRes] = await Promise.all([
        fetch('/api/manuals', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }),
        fetch('/api/manual-categories', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }),
        fetch('/api/manual-page-settings', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
      ])

      if (manualsRes.ok) {
        const manualsData = await manualsRes.json()
        setManuals(manualsData)
      }
      
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)
      }
      
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json()
        setPageSettings(settingsData)
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    try {
      setRefreshing(true)
      await loadData()
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Sayfa focus olduğunda verileri yenile
  useEffect(() => {
    const handleFocus = () => {
      loadData()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              {pageSettings?.heroTitle || 'El Kitapları & Montaj Kılavuzları'}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {pageSettings?.heroSubtitle || 'Ürünlerimizin doğru montajı için detaylı el kitapları ve kılavuzları. Güvenlik standartları, montaj teknikleri ve uygulama örnekleri.'}
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-16">
        <MaxWidthWrapper>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">El kitapları yükleniyor...</p>
            </div>
          ) : (
            <ManualClient manuals={manuals} categories={categories} />
          )}
        </MaxWidthWrapper>
      </section>
    </div>
  )
}

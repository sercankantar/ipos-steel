'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import CatalogClient from './CatalogClient'

interface Catalog {
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

export default function KatalogBrosurlerPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pageSettings, setPageSettings] = useState<PageSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const [catalogsRes, categoriesRes, settingsRes] = await Promise.all([
        fetch('/api/catalogs', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }),
        fetch('/api/catalog-categories', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }),
        fetch('/api/catalog-page-settings', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
      ])

      if (catalogsRes.ok) {
        const catalogsData = await catalogsRes.json()
        setCatalogs(catalogsData)
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
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/indirme-merkezi' className='hover:text-white transition-colors'>İndirme Merkezi</Link>
              <span className='mx-2'>/</span>
              <span>Katalog & Broşürler</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              {pageSettings?.heroTitle || 'Katalog & Broşürler'}
            </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              {pageSettings?.heroSubtitle || 'Ürün gamımız hakkında detaylı bilgi edinmek için katalog ve broşürlerimizi indirebilirsiniz. Teknik özellikler, montaj detayları ve uygulama örnekleri ile kapsamlı dokümantasyon.'}
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Kataloglar yükleniyor...</p>
            </div>
          ) : (
            <CatalogClient catalogs={catalogs} categories={categories} />
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

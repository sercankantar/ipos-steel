'use client'

import { Download, FileText, Calendar, Eye, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import Image from 'next/image'

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

interface CatalogClientProps {
  catalogs: Catalog[]
  categories: Category[]
}

// Katalog kategori renk haritası
const getCatalogCategoryColor = (color: string) => {
  return color || 'bg-slate-600 text-white'
}

export default function CatalogClient({ catalogs, categories }: CatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())

  const filteredCatalogs = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? catalogs 
      : catalogs.filter(catalog => catalog.category.id === selectedCategory)
    
    if (searchTerm) {
      filtered = filtered.filter(catalog => 
        catalog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        catalog.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return filtered
  }, [selectedCategory, searchTerm, catalogs])

  const handleDownload = async (catalog: Catalog) => {
    try {
      setDownloadingIds(prev => new Set(prev).add(catalog.id))
      
      const response = await fetch(`/api/catalogs/${catalog.id}/download`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${catalog.title}.${catalog.fileType}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Download error:', error)
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(catalog.id)
        return newSet
      })
    }
  }

  const handleViewOption = async (catalog: Catalog, option: string) => {
    try {
      const response = await fetch(`/api/catalogs/${catalog.id}/download`)
      const data = await response.json()
      
      if (data.success && data.dataUrl) {
        window.open(data.dataUrl, '_blank')
      } else {
        console.error('PDF yüklenemedi:', data.error)
        alert('PDF açılamadı')
      }
    } catch (error) {
      console.error('PDF görüntüleme hatası:', error)
      alert('PDF açılamadı')
    }
  }

  return (
    <>
      {/* Arama ve Filtreler */}
      <div className='mb-8'>
        <div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
          {/* Arama */}
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Katalog ara...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          
          {/* Kategori Filtreleri */}
          <div className='flex flex-wrap gap-2'>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              Tümü
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tüm Kataloglar */}
      {filteredCatalogs.length > 0 && (
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Katalog & Broşürler</h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredCatalogs.map((catalog) => (
              <div key={catalog.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                <div className='relative h-48'>
                  <Image
                    src={catalog.imageUrl || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'}
                    alt={catalog.title}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute top-3 right-3'>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCatalogCategoryColor(catalog.category.color)}`}>
                      {catalog.category.name}
                    </span>
                  </div>
                </div>
                
                <div className='p-6'>
                  <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2'>
                    {catalog.title}
                  </h3>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                    {catalog.description}
                  </p>
                  
                  <div className='grid grid-cols-2 gap-4 text-xs text-gray-500 mb-4'>
                    <div className='flex items-center gap-1'>
                      <FileText className='w-3 h-3' />
                      <span>{catalog.pages || 0} sayfa</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      <span>{new Date(catalog.publishDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div>
                      <span>Boyut: {catalog.fileSize}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Eye className='w-3 h-3' />
                      <span>{catalog.downloadCount} indirme</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(catalog)}
                      disabled={downloadingIds.has(catalog.id)}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                        downloadingIds.has(catalog.id)
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {downloadingIds.has(catalog.id) ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          İndiriliyor...
                        </>
                      ) : (
                        <>
                          <Download className='w-4 h-4' />
                          İndir ({catalog.fileSize})
                        </>
                      )}
                    </button>
                    
                    {/* Görüntüle Butonu */}
                    <button
                      onClick={() => handleViewOption(catalog, 'browser')}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Görüntüle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sonuç Bulunamadı */}
      {filteredCatalogs.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4'>
            <FileText className='w-16 h-16 mx-auto' />
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>Katalog Bulunamadı</h3>
          <p className='text-gray-600'>Arama kriterlerinize uygun katalog bulunmamaktadır.</p>
        </div>
      )}
    </>
  )
}

'use client'

import { Download, FileText, Calendar, Tag } from 'lucide-react'
import { useState, useMemo } from 'react'
import Image from 'next/image'

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

interface ManualClientProps {
  manuals: Manual[]
  categories: Category[]
}

export default function ManualClient({ manuals, categories }: ManualClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const ITEMS_PER_PAGE = 6

  const filteredManuals = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? manuals 
      : manuals.filter(manual => manual.category.id === selectedCategory)
    
    return filtered
  }, [selectedCategory, manuals])

  // Pagination için el kitaplarını böl
  const paginatedManuals = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredManuals.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredManuals, currentPage])

  const totalPages = Math.ceil(filteredManuals.length / ITEMS_PER_PAGE)

  // Sayfa değiştiğinde scroll to top
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtreleme değiştiğinde sayfa sıfırla
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  const handleDownload = async (manual: Manual) => {
    try {
      setDownloadingIds(prev => new Set(prev).add(manual.id))
      
      const response = await fetch(`/api/manuals/${manual.id}/download`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${manual.title}.${manual.fileType}`
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
        newSet.delete(manual.id)
        return newSet
      })
    }
  }


  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Sol Kolon - El Kitapları */}
      <div className="lg:w-2/3">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-neuropol text-2xl font-bold text-slate-900">
              El Kitapları ve Kılavuzlar
            </h2>
            <span className="text-sm text-gray-500">
              {filteredManuals.length} kılavuz
            </span>
          </div>
          
          {/* Kategori Filtreleri */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600' 
                  : 'bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              Tümü
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600' 
                    : 'bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* El Kitapları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredManuals.length > 0 ? (
            filteredManuals.map((manual) => (
              <article
                key={manual.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200"
              >
                {/* El Kitabı Görseli */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image 
                    src={manual.imageUrl || 'https://www.eae.com.tr/storage/el-kitaplari/busbar-sistemleri/images/kx-manual.webp'} 
                    alt={manual.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Kategori Etiketi */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded text-xs font-medium uppercase tracking-wide ${manual.category.color || 'bg-gray-500 text-white'}`}>
                      {manual.category.name}
                    </span>
                  </div>
                </div>

                {/* El Kitabı İçeriği */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {manual.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {manual.description}
                  </p>

                        {/* İndir ve Görüntüle Butonları */}
                        <button
                          onClick={() => handleDownload(manual)}
                          disabled={downloadingIds.has(manual.id)}
                          className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                            downloadingIds.has(manual.id)
                              ? 'bg-gray-400 cursor-not-allowed text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {downloadingIds.has(manual.id) ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              İndiriliyor...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              İndir ({manual.fileSize})
                            </>
                          )}
                        </button>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 col-span-2">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">
                Bu kategoride kılavuz bulunamadı
              </h3>
              <p className="text-gray-500 text-sm">
                Seçilen kategoride henüz el kitabı bulunmuyor.
              </p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Tüm kılavuzları görüntüle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sağ Sidebar */}
      <div className="lg:w-1/3">
        <div className="sticky top-8 space-y-8">
          
          {/* Kategori İstatistikleri */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
              Kategoriler
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors text-left ${
                  selectedCategory === 'all'
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-white text-slate-700 hover:text-slate-900'
                }`}
              >
                <span className="text-sm font-medium">Tümü</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-white text-gray-500'
                }`}>
                  {manuals.length}
                </span>
              </button>
              {categories.map((category) => {
                const count = manuals.filter((m) => m.category.id === category.id).length
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors text-left ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-white text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-white text-gray-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Öne Çıkan El Kitapları */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
              Öne Çıkan Kılavuzlar
            </h3>
            <div className="space-y-4">
              {manuals.filter(m => m.featured).slice(0, 3).map((manual) => (
                <div
                  key={manual.id}
                  className="block group cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={manual.imageUrl || 'https://www.eae.com.tr/storage/el-kitaplari/busbar-sistemleri/images/kx-manual.webp'}
                        alt={manual.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                        {manual.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className={`px-2 py-0.5 rounded-full ${manual.category.color || 'bg-blue-100 text-blue-600'}`}>
                          {manual.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* İstatistikler */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-neuropol font-bold text-lg mb-4 text-slate-900">
              İstatistikler
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Toplam Kılavuz</span>
                <span className="font-semibold text-slate-900">{manuals.length}</span>
              </div>
              {categories.map((category) => {
                const count = manuals.filter(m => m.category.id === category.id).length
                return (
                  <div key={category.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{category.name}</span>
                    <span className="font-semibold text-slate-900">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

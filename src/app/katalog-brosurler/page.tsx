"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Download, FileText, Calendar, Eye, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import Image from 'next/image'

// Statik katalog ve broşür verileri
const staticCatalogs = [
  {
    id: 1,
    title: 'IPOS Steel Genel Ürün Kataloğu 2024',
    description: 'Tüm ürün gamımızı içeren kapsamlı katalog. Kablo tavaları, destek sistemleri ve montaj aksesuarları hakkında detaylı bilgiler.',
    category: 'Genel Katalog',
    fileSize: '15.2 MB',
    pages: 48,
    language: 'Türkçe',
    version: '2024.1',
    publishDate: '2024-01-15',
    downloadCount: 2450,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    fileUrl: '/downloads/ipos-steel-genel-katalog-2024.pdf',
    featured: true
  },
  {
    id: 2,
    title: 'Güneş Enerjisi Kablo Tavaları Kataloğu',
    description: 'Güneş enerjisi santralları için özel tasarlanmış kablo tava sistemleri ve montaj çözümleri.',
    category: 'Güneş Enerjisi',
    fileSize: '8.7 MB',
    pages: 24,
    language: 'Türkçe',
    version: '2024.2',
    publishDate: '2024-03-10',
    downloadCount: 1890,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    fileUrl: '/downloads/gunes-enerjisi-kablo-tavalari.pdf',
    featured: true
  },
  {
    id: 3,
    title: 'Endüstriyel Kablo Kanalları Broşürü',
    description: 'Endüstriyel tesisler için yüksek kapasiteli kablo kanalları ve destek sistemleri.',
    category: 'Endüstriyel',
    fileSize: '5.3 MB',
    pages: 16,
    language: 'Türkçe',
    version: '2024.1',
    publishDate: '2024-02-20',
    downloadCount: 1340,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    fileUrl: '/downloads/endustriyel-kablo-kanallari.pdf',
    featured: false
  },
  {
    id: 4,
    title: 'Kablo Merdivenleri Teknik Broşür',
    description: 'Çeşitli yük kapasitelerinde kablo merdivenleri ve montaj detayları.',
    category: 'Kablo Merdivenleri',
    fileSize: '4.1 MB',
    pages: 12,
    language: 'Türkçe',
    version: '2024.1',
    publishDate: '2024-01-30',
    downloadCount: 980,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
    fileUrl: '/downloads/kablo-merdivenleri.pdf',
    featured: false
  },
  {
    id: 5,
    title: 'Askı ve Destek Sistemleri Kataloğu',
    description: 'Sismik dayanımlı askı sistemleri ve özel destek çözümleri.',
    category: 'Destek Sistemleri',
    fileSize: '6.8 MB',
    pages: 20,
    language: 'Türkçe',
    version: '2024.1',
    publishDate: '2024-02-05',
    downloadCount: 1150,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    fileUrl: '/downloads/aski-destek-sistemleri.pdf',
    featured: false
  },
  {
    id: 6,
    title: 'IPOS Steel İngilizce Ürün Kataloğu',
    description: 'Complete product range catalog in English for international markets.',
    category: 'Genel Katalog',
    fileSize: '16.5 MB',
    pages: 52,
    language: 'İngilizce',
    version: '2024.1',
    publishDate: '2024-01-20',
    downloadCount: 1680,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    fileUrl: '/downloads/ipos-steel-catalog-english.pdf',
    featured: true
  }
]

const categories = ['Tümü', 'Genel Katalog', 'Güneş Enerjisi', 'Endüstriyel', 'Kablo Merdivenleri', 'Destek Sistemleri']

export default function KatalogBrosurlerPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCatalogs = useMemo(() => {
    let filtered = selectedCategory === 'Tümü' 
      ? staticCatalogs 
      : staticCatalogs.filter(catalog => catalog.category === selectedCategory)
    
    if (searchTerm) {
      filtered = filtered.filter(catalog => 
        catalog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        catalog.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return filtered
  }, [selectedCategory, searchTerm])

  const featuredCatalogs = filteredCatalogs.filter(catalog => catalog.featured)
  const regularCatalogs = filteredCatalogs.filter(catalog => !catalog.featured)

  const handleDownload = (catalog: any) => {
    // Gerçek uygulamada dosya indirme işlemi burada yapılacak
    console.log(`İndiriliyor: ${catalog.title}`)
    // İndirme sayısını artır (gerçek uygulamada API çağrısı)
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
              <Link href='/indirme-merkezi' className='hover:text-white transition-colors'>İndirme Merkezi</Link>
              <span className='mx-2'>/</span>
              <span>Katalog & Broşürler</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              Katalog & Broşürler
            </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              Ürün gamımız hakkında detaylı bilgi edinmek için katalog ve broşürlerimizi indirebilirsiniz. 
              Teknik özellikler, montaj detayları ve uygulama örnekleri ile kapsamlı dokümantasyon.
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
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
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Öne Çıkan Kataloglar */}
          {featuredCatalogs.length > 0 && (
            <div className='mb-12'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Öne Çıkan Kataloglar</h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {featuredCatalogs.map((catalog) => (
                  <div key={catalog.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                    <div className='relative h-48'>
                      <Image
                        src={catalog.image}
                        alt={catalog.title}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute top-3 left-3'>
                        <span className='bg-red-500 text-white px-2 py-1 rounded text-xs font-medium'>
                          ÖNE ÇIKAN
                        </span>
                      </div>
                      <div className='absolute top-3 right-3'>
                        <span className='bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium'>
                          {catalog.category}
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
                          <span>{catalog.pages} sayfa</span>
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
                      
                      <button
                        onClick={() => handleDownload(catalog)}
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                      >
                        <Download className='w-4 h-4' />
                        İndir ({catalog.fileSize})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diğer Kataloglar */}
          {regularCatalogs.length > 0 && (
            <div>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Tüm Kataloglar</h2>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {regularCatalogs.map((catalog) => (
                  <div key={catalog.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                    <div className='relative h-40'>
                      <Image
                        src={catalog.image}
                        alt={catalog.title}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute top-3 right-3'>
                        <span className='bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium'>
                          {catalog.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className='p-5'>
                      <h3 className='text-md font-bold text-gray-900 mb-2 line-clamp-2'>
                        {catalog.title}
                      </h3>
                      <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                        {catalog.description}
                      </p>
                      
                      <div className='flex justify-between text-xs text-gray-500 mb-3'>
                        <span>{catalog.pages} sayfa</span>
                        <span>{catalog.downloadCount} indirme</span>
                      </div>
                      
                      <button
                        onClick={() => handleDownload(catalog)}
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2'
                      >
                        <Download className='w-3 h-3' />
                        İndir
                      </button>
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
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

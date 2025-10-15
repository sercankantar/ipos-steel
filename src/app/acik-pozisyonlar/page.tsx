'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, MapPin, Clock, Users, ChevronRight } from 'lucide-react'

// Statik iş ilanları
const jobListings = [
  {
    id: 1,
    title: 'Elektrik Mühendisi',
    department: 'Mühendislik',
    location: 'Kocaeli, Dilovası',
    type: 'Tam Zamanlı',
    experience: '2-5 yıl',
    publishDate: '2024-01-15',
    description: 'Güneş enerjisi projelerinde elektrik sistem tasarımı ve kablo tava çözümleri geliştirmek.',
    requirements: [
      'Elektrik Mühendisliği mezunu',
      'AutoCAD Electrical deneyimi',
      'Güneş enerjisi sistemleri bilgisi',
      'İngilizce orta seviye'
    ],
    featured: true
  },
  {
    id: 2,
    title: 'Üretim Planlama Uzmanı',
    department: 'Üretim',
    location: 'Kocaeli, Dilovası',
    type: 'Tam Zamanlı',
    experience: '3-7 yıl',
    publishDate: '2024-01-10',
    description: 'Kablo tavaları ve elektrik altyapı ürünlerinin üretim planlaması ve koordinasyonu.',
    requirements: [
      'Endüstri Mühendisliği mezunu',
      'ERP sistemleri deneyimi',
      'Üretim planlama deneyimi',
      'Analitik düşünme yetisi'
    ],
    featured: false
  },
  {
    id: 3,
    title: 'Satış Temsilcisi',
    department: 'Satış',
    location: 'İstanbul',
    type: 'Tam Zamanlı',
    experience: '1-3 yıl',
    publishDate: '2024-01-08',
    description: 'Elektrik altyapı çözümleri satışı ve müşteri ilişkileri yönetimi.',
    requirements: [
      'Üniversite mezunu',
      'Satış deneyimi',
      'Müşteri odaklı yaklaşım',
      'Sürücü belgesi'
    ],
    featured: false
  },
  {
    id: 4,
    title: 'Kalite Kontrol Uzmanı',
    department: 'Kalite',
    location: 'Kocaeli, Dilovası',
    type: 'Tam Zamanlı',
    experience: '2-4 yıl',
    publishDate: '2024-01-05',
    description: 'Üretim süreçlerinde kalite kontrol ve test işlemlerinin yürütülmesi.',
    requirements: [
      'Makine/Elektrik Mühendisliği',
      'Kalite sistemleri bilgisi',
      'ISO standartları deneyimi',
      'Detay odaklı çalışma'
    ],
    featured: true
  }
]

const departments = ['Tümü', 'Mühendislik', 'Üretim', 'Satış', 'Kalite']

export default function AcikPozisyonlar() {
  const [selectedDepartment, setSelectedDepartment] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredJobs = jobListings.filter(job => {
    const matchesDepartment = selectedDepartment === 'Tümü' || job.department === selectedDepartment
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDepartment && matchesSearch
  })

  const featuredJobs = filteredJobs.filter(job => job.featured)
  const regularJobs = filteredJobs.filter(job => !job.featured)

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/kariyer-firsatlari' className='hover:text-white transition-colors'>Kariyer</Link>
              <span className='mx-2'>/</span>
              <span>Açık Pozisyonlar</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              Açık Pozisyonlar
            </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              IPOS-Steel'de kariyer fırsatları keşfedin. Güneş enerjisi ve elektrik altyapısı sektöründe 
              yeteneklerinizi geliştirin ve geleceğinizi şekillendirin.
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
                <input
                  type='text'
                  placeholder='Pozisyon ara...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              
              {/* Departman Filtreleri */}
              <div className='flex flex-wrap gap-2'>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedDepartment === dept
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 
          {featuredJobs.length > 0 && (
            <div className='mb-12'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Öne Çıkan Pozisyonlar</h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {featuredJobs.map((job) => (
                  <div key={job.id} className='bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <span className='inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded mb-2'>
                          ÖNE ÇIKAN
                        </span>
                        <h3 className='text-xl font-bold text-gray-900 mb-2'>{job.title}</h3>
                        <p className='text-blue-600 font-medium'>{job.department}</p>
                      </div>
                    </div>
                    
                    <p className='text-gray-600 mb-4 line-clamp-2'>{job.description}</p>
                    
                    <div className='grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='w-4 h-4' />
                        <span>{job.location}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>{job.type}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Users className='w-4 h-4' />
                        <span>{job.experience}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>{new Date(job.publishDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                    
                    <div className='flex justify-between items-center'>
                      <Link
                        href={`/acik-pozisyonlar/${job.id}`}
                        className='text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1'
                      >
                        Detayları Gör
                        <ChevronRight className='w-4 h-4' />
                      </Link>
                      <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'>
                        Başvur
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
            Öne Çıkan Pozisyonlar */}

          {/* Diğer Pozisyonlar */}
          {regularJobs.length > 0 && (
            <div>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Tüm Pozisyonlar</h2>
              <div className='space-y-4'>
                {regularJobs.map((job) => (
                  <div key={job.id} className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300'>
                    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-3 mb-2'>
                          <h3 className='text-lg font-bold text-gray-900'>{job.title}</h3>
                          <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded'>
                            {job.department}
                          </span>
                        </div>
                        <p className='text-gray-600 mb-3 line-clamp-1'>{job.description}</p>
                        <div className='flex flex-wrap gap-4 text-sm text-gray-500'>
                          <div className='flex items-center gap-1'>
                            <MapPin className='w-3 h-3' />
                            <span>{job.location}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Clock className='w-3 h-3' />
                            <span>{job.type}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Users className='w-3 h-3' />
                            <span>{job.experience}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            <span>{new Date(job.publishDate).toLocaleDateString('tr-TR')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className='flex items-center gap-3'>
                        <Link
                          href={`/acik-pozisyonlar/${job.id}`}
                          className='text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1'
                        >
                          Detayları Gör
                          <ChevronRight className='w-4 h-4' />
                        </Link>
                        <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'>
                          Başvur
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sonuç Bulunamadı */}
          {filteredJobs.length === 0 && (
            <div className='text-center py-12'>
              <div className='text-gray-400 mb-4'>
                <Users className='w-16 h-16 mx-auto' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Pozisyon Bulunamadı</h3>
              <p className='text-gray-600'>Arama kriterlerinize uygun pozisyon bulunmamaktadır.</p>
            </div>
          )}

          {/* Genel Başvuru CTA */}
          <div className='mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8 text-center'>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Uygun Pozisyon Bulamadınız mı?</h3>
            <p className='text-gray-600 mb-6'>
              Kendinize uygun bir pozisyon bulamadıysanız, CV'nizi insan kaynakları veri tabanımıza 
              eklemek için genel başvuru yapabilirsiniz.
            </p>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200'>
              Genel Başvuru Yap
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

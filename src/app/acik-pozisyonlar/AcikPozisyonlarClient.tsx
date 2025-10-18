'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, Users, ChevronRight } from 'lucide-react'

interface Department {
  id: string
  name: string
  color: string
  isActive: boolean
}

interface JobPosition {
  id: string
  title: string
  departmentId: string
  department: Department
  location: string
  type: string
  experience: string
  publishDate: string
  description: string
  responsibilities: string[]
  qualifications: string[]
  benefits: string[]
  salary?: string
  workingHours?: string
  reportingTo?: string
  featured: boolean
  isActive: boolean
  slug?: string
}

// Departman renk haritası
const getDepartmentColor = (department: Department) => {
  return department.color || 'bg-gray-100 text-gray-800'
}

export default function AcikPozisyonlarClient() {
  const [jobs, setJobs] = useState<JobPosition[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDepartment, setSelectedDepartment] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchJobs()
    fetchDepartments()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/job-positions')
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('İş pozisyonları yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments')
      const data = await response.json()
      setDepartments(data)
    } catch (error) {
      console.error('Departmanlar yüklenirken hata:', error)
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'Tümü' || job.department.name === selectedDepartment
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDepartment && matchesSearch
  })

  const featuredJobs = filteredJobs.filter(job => job.featured)
  const regularJobs = filteredJobs.filter(job => !job.featured)

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50'>
        {/* Hero Section Skeleton */}
        <div className='bg-gray-900 py-16'>
          <MaxWidthWrapper>
            <div className='text-center text-white'>
              <div className="h-6 w-32 bg-gray-700 rounded animate-pulse mx-auto mb-6" />
              <div className="h-12 w-96 bg-gray-700 rounded animate-pulse mx-auto mb-4" />
              <div className="h-6 w-full max-w-3xl bg-gray-700 rounded animate-pulse mx-auto" />
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Content Skeleton */}
        <MaxWidthWrapper>
          <div className='py-12'>
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
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
                {['Tümü', ...departments.map(d => d.name)].map((dept) => (
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
                          <span className={`${getDepartmentColor(job.department)} text-xs font-medium px-2 py-1 rounded`}>
                            {job.department.name}
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
                        <Link
                          href='/basvuru'
                          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 inline-block text-center'
                        >
                          Başvur
                        </Link>
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
            <Link
              href='/basvuru'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-block'
            >
              Genel Başvuru Yap
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, ChevronLeft, Building, Mail, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'

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

interface JobDetailClientProps {
  jobId: string
}

export default function JobDetailClient({ jobId }: JobDetailClientProps) {
  const [job, setJob] = useState<JobPosition | null>(null)
  const [loading, setLoading] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  useEffect(() => {
    fetchJob()
  }, [jobId])

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/job-positions/${jobId}`)
      if (response.ok) {
        const data = await response.json()
        setJob(data)
      }
    } catch (error) {
      console.error('İş pozisyonu yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className="text-center">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>İş İlanı Bulunamadı</h1>
          <Link href='/acik-pozisyonlar' className='text-blue-600 hover:text-blue-800'>
            Açık Pozisyonlara Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-12'>
        <MaxWidthWrapper>
          <div className='text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/kariyer-firsatlari' className='hover:text-white transition-colors'>Kariyer</Link>
              <span className='mx-2'>/</span>
              <Link href='/acik-pozisyonlar' className='hover:text-white transition-colors'>Açık Pozisyonlar</Link>
              <span className='mx-2'>/</span>
              <span>{job.title}</span>
            </nav>
            
            <Link 
              href='/acik-pozisyonlar'
              className='inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors'
            >
              <ChevronLeft className='w-4 h-4' />
              Açık Pozisyonlara Dön
            </Link>
            
            <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
              <div>
                {job.featured && (
                  <span className='inline-block bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-3'>
                    ÖNE ÇIKAN POZİSYON
                  </span>
                )}
                <h1 className='font-neuropol text-3xl lg:text-4xl font-bold mb-2'>
                  {job.title}
                </h1>
                <p className='text-xl text-blue-400 font-medium'>{job.department.name}</p>
              </div>
              
              <div className='flex gap-3'>
                <button 
                  onClick={() => setShowApplicationForm(true)}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200'
                >
                  Başvur
                </button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <div className='grid lg:grid-cols-3 gap-12'>
            
            {/* Ana İçerik */}
            <div className='lg:col-span-2 space-y-8'>
              
              {/* Pozisyon Bilgileri */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <h2 className='text-xl font-bold text-gray-900 mb-4'>Pozisyon Hakkında</h2>
                <p className='text-gray-700 leading-relaxed mb-6'>{job.description}</p>
                
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <MapPin className='w-5 h-5 text-blue-600' />
                      <div>
                        <span className='font-medium text-gray-900'>Lokasyon:</span>
                        <p>{job.location}</p>
                      </div>
                    </div>
                    
                    <div className='flex items-center gap-3 text-gray-600'>
                      <Clock className='w-5 h-5 text-blue-600' />
                      <div>
                        <span className='font-medium text-gray-900'>Çalışma Şekli:</span>
                        <p>{job.type}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3 text-gray-600'>
                      <Users className='w-5 h-5 text-blue-600' />
                      <div>
                        <span className='font-medium text-gray-900'>Deneyim:</span>
                        <p>{job.experience}</p>
                      </div>
                    </div>
                    
                    <div className='flex items-center gap-3 text-gray-600'>
                      <Calendar className='w-5 h-5 text-blue-600' />
                      <div>
                        <span className='font-medium text-gray-900'>İlan Tarihi:</span>
                        <p>{new Date(job.publishDate).toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sorumluluklar */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>Sorumluluklar</h2>
                  <ul className='space-y-3'>
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0'></div>
                        <span className='text-gray-700'>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Aranan Özellikler */}
              {job.qualifications && job.qualifications.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>Aranan Özellikler</h2>
                  <ul className='space-y-3'>
                    {job.qualifications.map((qualification, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0'></div>
                        <span className='text-gray-700'>{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sağlanan Haklar */}
              {job.benefits && job.benefits.length > 0 && (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                  <h2 className='text-xl font-bold text-gray-900 mb-4'>Sağlanan Haklar</h2>
                  <ul className='space-y-3'>
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0'></div>
                        <span className='text-gray-700'>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              
              {/* Hızlı Bilgiler */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8'>
                <h3 className='text-lg font-bold text-gray-900 mb-4'>Pozisyon Detayları</h3>
                <div className='space-y-4'>
                  
                  {job.salary && (
                    <div>
                      <span className='text-sm font-medium text-gray-500'>Maaş Aralığı</span>
                      <p className='text-gray-900 font-semibold'>{job.salary}</p>
                    </div>
                  )}
                  
                  {job.workingHours && (
                    <div>
                      <span className='text-sm font-medium text-gray-500'>Çalışma Saatleri</span>
                      <p className='text-gray-900'>{job.workingHours}</p>
                    </div>
                  )}
                  
                  {job.reportingTo && (
                    <div>
                      <span className='text-sm font-medium text-gray-500'>Bağlı Olduğu Pozisyon</span>
                      <p className='text-gray-900'>{job.reportingTo}</p>
                    </div>
                  )}
                  
                  <div>
                    <span className='text-sm font-medium text-gray-500'>Departman</span>
                    <p className='text-gray-900'>{job.department.name}</p>
                  </div>
                  
                </div>
                
                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <button 
                    onClick={() => setShowApplicationForm(true)}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200 mb-3'
                  >
                    Bu Pozisyona Başvur
                  </button>
                  <Link 
                    href='/acik-pozisyonlar'
                    className='block w-full text-center border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium transition-colors duration-200'
                  >
                    Diğer Pozisyonları Gör
                  </Link>
                </div>
              </div>

              {/* İletişim */}
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-4'>İletişim</h3>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-5 h-5 text-blue-600' />
                    <div>
                      <p className='text-sm text-gray-600'>E-posta</p>
                      <a href='mailto:kariyer@ipossteel.com' className='text-blue-600 hover:text-blue-800 font-medium'>
                        kariyer@ipossteel.com
                      </a>
                    </div>
                  </div>
                  
                  <div className='flex items-center gap-3'>
                    <Phone className='w-5 h-5 text-blue-600' />
                    <div>
                      <p className='text-sm text-gray-600'>Telefon</p>
                      <a href='tel:+902623434343' className='text-blue-600 hover:text-blue-800 font-medium'>
                        +90 (262) 343 43 43
                      </a>
                    </div>
                  </div>
                  
                  <div className='flex items-start gap-3'>
                    <Building className='w-5 h-5 text-blue-600 mt-0.5' />
                    <div>
                      <p className='text-sm text-gray-600'>Adres</p>
                      <p className='text-gray-900 text-sm'>
                        IPOS-Steel Güneş Enerjisi ve Elektrik Altyapı Çözümleri<br />
                        Dilovası Organize Sanayi Bölgesi<br />
                        Kocaeli, Türkiye
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Başvuru Formu Modal */}
      {showApplicationForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg max-w-md w-full p-6'>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>Başvuru Formu</h3>
            <p className='text-gray-600 mb-6'>
              <strong>{job.title}</strong> pozisyonu için başvurunuz alınmıştır. 
              CV'nizi ve ek belgelerinizi kariyer@ipossteel.com adresine gönderebilirsiniz.
            </p>
            <div className='flex gap-3'>
              <button 
                onClick={() => setShowApplicationForm(false)}
                className='flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors'
              >
                Kapat
              </button>
              <a 
                href={`mailto:kariyer@ipossteel.com?subject=Başvuru: ${job.title}&body=Merhaba, ${job.title} pozisyonu için başvuru yapmak istiyorum.`}
                className='flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors'
              >
                E-posta Gönder
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

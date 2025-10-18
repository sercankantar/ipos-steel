'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState } from 'react'
import { Upload, FileText, User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, CheckCircle, AlertCircle } from 'lucide-react'

export default function BasvuruFormu() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    birthDate: '',
    position: '',
    experience: '',
    education: '',
    coverLetter: '',
    cvFile: null as File | null,
    portfolioFile: null as File | null,
    consent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, [fieldName]: file }))
  }

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      console.log('Dosya yükleniyor:', file.name, 'Boyut:', file.size, 'Tip:', file.type)
      
      // Dosya boyutu kontrolü (2MB limit)
      const maxSize = 2 * 1024 * 1024 // 2MB
      if (file.size > maxSize) {
        console.error('Dosya çok büyük:', file.size, 'bytes')
        alert('Dosya boyutu 2MB\'dan küçük olmalıdır')
        return null
      }
      
      // Base64 encoding kullan
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result as string
          console.log('Dosya base64 olarak hazırlandı, boyut:', base64.length)
          resolve(base64)
        }
        reader.onerror = () => {
          console.error('Dosya okuma hatası')
          resolve(null)
        }
        reader.readAsDataURL(file)
      })
      
      // Cloudinary yükleme (şimdilik devre dışı)
      /*
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'job_applications')
      formData.append('resource_type', 'raw')
      formData.append('folder', 'job-applications')

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      if (!cloudName) {
        console.error('Cloudinary cloud name bulunamadı')
        throw new Error('Cloudinary cloud name bulunamadı')
      }

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        return data.secure_url
      } else {
        const errorData = await response.json()
        console.error('Cloudinary yükleme hatası:', errorData)
        return null
      }
      */
    } catch (error) {
      console.error('Dosya yükleme hatası:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Dosyaları yükle (opsiyonel)
      let cvFileUrl = null
      let portfolioFileUrl = null

      if (formData.cvFile) {
        console.log('CV dosyası yükleniyor...')
        cvFileUrl = await uploadFile(formData.cvFile)
        if (!cvFileUrl) {
          console.warn('CV dosyası yüklenemedi, dosya olmadan devam ediliyor')
        }
      }

      if (formData.portfolioFile) {
        console.log('Portfolyo dosyası yükleniyor...')
        portfolioFileUrl = await uploadFile(formData.portfolioFile)
        if (!portfolioFileUrl) {
          console.warn('Portfolyo dosyası yüklenemedi, dosya olmadan devam ediliyor')
        }
      }

      // Başvuru verilerini gönder
      const applicationData = {
        positionTitle: formData.position,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        birthDate: formData.birthDate,
        experience: formData.experience,
        education: formData.education,
        cvFileName: formData.cvFile?.name,
        cvFileUrl: cvFileUrl,
        portfolioFileName: formData.portfolioFile?.name,
        portfolioFileUrl: portfolioFileUrl,
        coverLetter: formData.coverLetter,
        consentGiven: formData.consent
      }

      console.log('Başvuru verileri gönderiliyor...', applicationData)

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      })

      if (response.ok) {
        console.log('Başvuru başarıyla gönderildi')
        setSubmitStatus('success')
      } else {
        const errorData = await response.json()
        console.error('API hatası:', errorData)
        throw new Error(errorData.error || 'Başvuru gönderilemedi')
      }
    } catch (error) {
      console.error('Başvuru gönderilirken hata:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <MaxWidthWrapper>
          <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Başvurunuz Alındı!</h2>
            <p className='text-gray-600 mb-6'>
              Başvurunuz başarıyla iletildi. İnsan kaynakları ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </p>
            <div className='space-y-3'>
              <Link
                href='/acik-pozisyonlar'
                className='block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors'
              >
                Diğer Pozisyonları İncele
              </Link>
              <Link
                href='/'
                className='block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors'
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (submitStatus === 'error') {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <MaxWidthWrapper>
          <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <AlertCircle className='w-8 h-8 text-red-600' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Başvuru Gönderilemedi!</h2>
            <p className='text-gray-600 mb-6'>
              Başvurunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.
            </p>
            <div className='space-y-3'>
              <button
                onClick={() => setSubmitStatus('idle')}
                className='block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors'
              >
                Tekrar Dene
              </button>
              <Link
                href='/acik-pozisyonlar'
                className='block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors'
              >
                Açık Pozisyonlara Dön
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-900 to-blue-800 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-blue-200 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/acik-pozisyonlar' className='hover:text-white transition-colors'>Açık Pozisyonlar</Link>
              <span className='mx-2'>/</span>
              <span>Başvuru Formu</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              İş Başvurusu
            </h1>
            <p className='text-lg text-blue-100 max-w-3xl mx-auto'>
              IPOS-Steel ailesine katılmak için başvuru formunu doldurun. 
              Profesyonel kariyerinizde yeni bir sayfa açın.
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <div className='max-w-4xl mx-auto'>
            
            {/* Form Başlığı */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <Briefcase className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-gray-900'>Başvuru Formu</h2>
                  <p className='text-gray-600 text-sm'>Lütfen tüm alanları eksiksiz doldurunuz</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-8'>
              
              {/* Kişisel Bilgiler */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='flex items-center gap-2 mb-6'>
                  <User className='w-5 h-5 text-blue-600' />
                  <h3 className='text-lg font-semibold text-gray-900'>Kişisel Bilgiler</h3>
                </div>
                
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
                      Ad *
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                      placeholder='Adınızı giriniz'
                    />
                  </div>
                  
                  <div>
                    <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
                      Soyad *
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                      placeholder='Soyadınızı giriniz'
                    />
                  </div>
                  
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                      E-posta *
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        placeholder='ornek@email.com'
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
                      Telefon *
                    </label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        placeholder='0532 123 45 67'
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor='city' className='block text-sm font-medium text-gray-700 mb-2'>
                      Şehir *
                    </label>
                    <div className='relative'>
                      <MapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='text'
                        id='city'
                        name='city'
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        placeholder='İstanbul'
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor='birthDate' className='block text-sm font-medium text-gray-700 mb-2'>
                      Doğum Tarihi *
                    </label>
                    <div className='relative'>
                      <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='date'
                        id='birthDate'
                        name='birthDate'
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        required
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profesyonel Bilgiler */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='flex items-center gap-2 mb-6'>
                  <GraduationCap className='w-5 h-5 text-blue-600' />
                  <h3 className='text-lg font-semibold text-gray-900'>Profesyonel Bilgiler</h3>
                </div>
                
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='position' className='block text-sm font-medium text-gray-700 mb-2'>
                      Başvurduğunuz Pozisyon *
                    </label>
                    <select
                      id='position'
                      name='position'
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    >
                      <option value=''>Pozisyon seçiniz</option>
                      <option value='Elektrik Mühendisi'>Elektrik Mühendisi</option>
                      <option value='Üretim Planlama Uzmanı'>Üretim Planlama Uzmanı</option>
                      <option value='Satış Temsilcisi'>Satış Temsilcisi</option>
                      <option value='Kalite Kontrol Uzmanı'>Kalite Kontrol Uzmanı</option>
                      <option value='İnsan Kaynakları Uzmanı'>İnsan Kaynakları Uzmanı</option>
                      <option value='Ar-Ge Mühendisi'>Ar-Ge Mühendisi</option>
                      <option value='Diğer'>Diğer</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor='experience' className='block text-sm font-medium text-gray-700 mb-2'>
                      Deneyim Süresi *
                    </label>
                    <select
                      id='experience'
                      name='experience'
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    >
                      <option value=''>Deneyim seçiniz</option>
                      <option value='0-1 yıl'>0-1 yıl</option>
                      <option value='1-3 yıl'>1-3 yıl</option>
                      <option value='3-5 yıl'>3-5 yıl</option>
                      <option value='5-10 yıl'>5-10 yıl</option>
                      <option value='10+ yıl'>10+ yıl</option>
                    </select>
                  </div>
                  
                  <div className='md:col-span-2'>
                    <label htmlFor='education' className='block text-sm font-medium text-gray-700 mb-2'>
                      Eğitim Durumu *
                    </label>
                    <input
                      type='text'
                      id='education'
                      name='education'
                      value={formData.education}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                      placeholder='Üniversite, Bölüm, Mezuniyet Yılı'
                    />
                  </div>
                </div>
              </div>

              {/* Dosya Yükleme */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='flex items-center gap-2 mb-6'>
                  <Upload className='w-5 h-5 text-blue-600' />
                  <h3 className='text-lg font-semibold text-gray-900'>Dosya Yükleme</h3>
                </div>
                
                <div className='grid md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='cvFile' className='block text-sm font-medium text-gray-700 mb-2'>
                      CV Dosyası * (PDF, DOC, DOCX)
                    </label>
                    <div className='relative'>
                      <input
                        type='file'
                        id='cvFile'
                        name='cvFile'
                        accept='.pdf,.doc,.docx'
                        onChange={(e) => handleFileChange(e, 'cvFile')}
                        required
                        className='hidden'
                      />
                      <label
                        htmlFor='cvFile'
                        className='w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all'
                      >
                        <FileText className='w-8 h-8 text-gray-400 mx-auto mb-2' />
                        <p className='text-sm text-gray-600'>
                          {formData.cvFile ? formData.cvFile.name : 'CV dosyanızı seçin veya sürükleyin'}
                        </p>
                        <p className='text-xs text-gray-400 mt-1'>Maksimum 2MB</p>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor='portfolioFile' className='block text-sm font-medium text-gray-700 mb-2'>
                      Portfolyo (Opsiyonel)
                    </label>
                    <div className='relative'>
                      <input
                        type='file'
                        id='portfolioFile'
                        name='portfolioFile'
                        accept='.pdf,.doc,.docx'
                        onChange={(e) => handleFileChange(e, 'portfolioFile')}
                        className='hidden'
                      />
                      <label
                        htmlFor='portfolioFile'
                        className='w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all'
                      >
                        <Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
                        <p className='text-sm text-gray-600'>
                          {formData.portfolioFile ? formData.portfolioFile.name : 'Portfolyo dosyanızı seçin'}
                        </p>
                        <p className='text-xs text-gray-400 mt-1'>Maksimum 2MB</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ön Yazı */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='flex items-center gap-2 mb-6'>
                  <FileText className='w-5 h-5 text-blue-600' />
                  <h3 className='text-lg font-semibold text-gray-900'>Ön Yazı</h3>
                </div>
                
                <div>
                  <label htmlFor='coverLetter' className='block text-sm font-medium text-gray-700 mb-2'>
                    Kendinizi Tanıtın
                  </label>
                  <textarea
                    id='coverLetter'
                    name='coverLetter'
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={6}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none'
                    placeholder='Neden IPOS-Steel için uygun bir aday olduğunuzu, deneyimlerinizi ve hedeflerinizi kısaca açıklayın...'
                  />
                  <p className='text-xs text-gray-500 mt-1'>Maksimum 500 karakter</p>
                </div>
              </div>

              {/* Onay ve Gönder */}
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <input
                      type='checkbox'
                      id='consent'
                      name='consent'
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                      className='mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                    />
                    <label htmlFor='consent' className='text-sm text-gray-700 leading-relaxed'>
                      <Link href='/kvkk-aydinlatma-metni' className='text-blue-600 hover:text-blue-800'>
                        KVKK Aydınlatma Metni
                      </Link>'ni okudum ve kişisel verilerimin işlenmesine onay veriyorum. *
                    </label>
                  </div>
                  
                  <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2'
                    >
                      {isSubmitting ? (
                        <>
                          <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <CheckCircle className='w-5 h-5' />
                          Başvuruyu Gönder
                        </>
                      )}
                    </button>
                    
                    <Link
                      href='/acik-pozisyonlar'
                      className='flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors text-center'
                    >
                      İptal
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

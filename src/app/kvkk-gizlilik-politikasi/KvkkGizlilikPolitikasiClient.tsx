'use client'

import { useState, useEffect } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'

interface KvkkPrivacyPolicy {
  id: string
  title: string
  lastUpdated: string
  amac: string
  kapsam: string
  tanimlar: string
  roller: string
  yukumlulukler: string
  siniflandirma: string
  islenmesi: string
  aktarilmasi: string
  saklanmasi: string
  guvenligi: string
  haklari: string
  gizlilik: string
  girisCikis: string
  silinmesi: string
  yayinlanmasi: string
  guncelleme: string
  yururluk: string
  email: string
  telefon: string
  adres: string
  isActive: boolean
}

export default function KvkkGizlilikPolitikasiClient() {
  const [policy, setPolicy] = useState<KvkkPrivacyPolicy | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('')

  const [sections, setSections] = useState([
    { id: 'amac', title: 'Amaç' },
    { id: 'kapsam', title: 'Kapsam' },
    { id: 'tanimlar', title: 'Tanım ve Kısaltmalar' },
    { id: 'roller', title: 'Rol ve Sorumluluklar' },
    { id: 'yukumlulukler', title: 'Hukuki Yükümlülükler' },
    { id: 'siniflandirma', title: 'Kişisel Verilerin Sınıflandırılması' },
    { id: 'islenmesi', title: 'Kişisel Verilerin İşlenmesi' },
    { id: 'aktarilmasi', title: 'Kişisel Verilerin Aktarılması' },
    { id: 'saklanmasi', title: 'Kişisel Verilerin Saklanması' },
    { id: 'guvenligi', title: 'Kişisel Verilerin Güvenliği' },
    { id: 'haklari', title: 'Kişisel Veri Sahibinin Hakları' },
    { id: 'gizlilik', title: 'Gizlilik Politikası' },
    { id: 'giris-cikis', title: 'Şirket Giriş-Çıkışları ve Kişisel Veriler' },
    { id: 'silinmesi', title: 'Kişisel Verilerin Silinmesi' },
    { id: 'yayinlanmasi', title: 'Dokümanın Yayınlanması' },
    { id: 'guncelleme', title: 'Güncelleme Periyodu' },
    { id: 'yururluk', title: 'Yürürlük' }
  ])

  useEffect(() => {
    fetchPolicy()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [policy])

  const fetchPolicy = async () => {
    try {
      const response = await fetch('/api/kvkk-privacy-policy')
      if (response.ok) {
        const data = await response.json()
        setPolicy(data)
        
        // Dinamik bölüm başlıklarını güncelle
        if (data) {
          setSections([
            { id: 'amac', title: data.amacTitle || 'Amaç' },
            { id: 'kapsam', title: data.kapsamTitle || 'Kapsam' },
            { id: 'tanimlar', title: data.tanimlarTitle || 'Tanım ve Kısaltmalar' },
            { id: 'roller', title: data.rollerTitle || 'Rol ve Sorumluluklar' },
            { id: 'yukumlulukler', title: data.yukumluluklerTitle || 'Hukuki Yükümlülükler' },
            { id: 'siniflandirma', title: data.siniflandirmaTitle || 'Kişisel Verilerin Sınıflandırılması' },
            { id: 'islenmesi', title: data.islenmesiTitle || 'Kişisel Verilerin İşlenmesi' },
            { id: 'aktarilmasi', title: data.aktarilmasiTitle || 'Kişisel Verilerin Aktarılması' },
            { id: 'saklanmasi', title: data.saklanmasiTitle || 'Kişisel Verilerin Saklanması' },
            { id: 'guvenligi', title: data.guvenligiTitle || 'Kişisel Verilerin Güvenliği' },
            { id: 'haklari', title: data.haklariTitle || 'Kişisel Veri Sahibinin Hakları' },
            { id: 'gizlilik', title: data.gizlilikTitle || 'Gizlilik Politikası' },
            { id: 'giris-cikis', title: data.girisCikisTitle || 'Şirket Giriş-Çıkışları ve Kişisel Veriler' },
            { id: 'silinmesi', title: data.silinmesiTitle || 'Kişisel Verilerin Silinmesi' },
            { id: 'yayinlanmasi', title: data.yayinlanmasiTitle || 'Dokümanın Yayınlanması' },
            { id: 'guncelleme', title: data.guncellemeTitle || 'Güncelleme Periyodu' },
            { id: 'yururluk', title: data.yururlukTitle || 'Yürürlük' }
          ])
        }
      } else {
        console.error('KVKK politikası yüklenemedi')
      }
    } catch (error) {
      console.error('API hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const renderSection = (id: string, title: string, content: string, index: number) => {
    if (!content) return null

    return (
      <section key={id} id={id}>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
          {index + 1}. {title}
        </h2>
        <div className='prose prose-gray max-w-none'>
          <div 
            className='text-gray-700 leading-relaxed'
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
          />
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!policy) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className="text-center">
          <p className="text-gray-600">KVKK Gizlilik Politikası bulunamadı</p>
        </div>
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
              <Link href='/kurumsal' className='hover:text-white transition-colors'>Kurumsal</Link>
              <span className='mx-2'>/</span>
              <span>KVKK Gizlilik Politikası</span>
            </nav>
            <h1 className='font-neuropol text-3xl lg:text-4xl font-bold mb-4'>
              {policy.title}
            </h1>
            <p className='text-lg text-gray-300 max-w-4xl mx-auto'>
              IPOS-Steel olarak kişisel verilerin korunması konusundaki yaklaşımımız ve uyguladığımız politikalar
            </p>
            <p className='text-sm text-gray-400 mt-2'>
              Son güncelleme: {new Date(policy.lastUpdated).toLocaleDateString('tr-TR')}
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <div className='flex flex-col lg:flex-row gap-12'>
            
            {/* Sol Sidebar - İçindekiler */}
            <div className='lg:w-1/4'>
              <div className='sticky top-8'>
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                  <h3 className='font-neuropol text-lg font-bold text-gray-900 mb-6'>
                    İçindekiler
                  </h3>
                  <nav className='space-y-2'>
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Ana İçerik */}
            <div className='lg:w-3/4'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-12'>
                
                {renderSection('amac', 'Amaç', policy.amac, 0)}
                {renderSection('kapsam', 'Kapsam', policy.kapsam, 1)}
                {renderSection('tanimlar', 'Tanım ve Kısaltmalar', policy.tanimlar, 2)}
                {renderSection('roller', 'Rol ve Sorumluluklar', policy.roller, 3)}
                {renderSection('yukumlulukler', 'Hukuki Yükümlülükler', policy.yukumlulukler, 4)}
                {renderSection('siniflandirma', 'Kişisel Verilerin Sınıflandırılması', policy.siniflandirma, 5)}
                {renderSection('islenmesi', 'Kişisel Verilerin İşlenmesi', policy.islenmesi, 6)}
                {renderSection('aktarilmasi', 'Kişisel Verilerin Aktarılması', policy.aktarilmasi, 7)}
                {renderSection('saklanmasi', 'Kişisel Verilerin Saklanması', policy.saklanmasi, 8)}
                {renderSection('guvenligi', 'Kişisel Verilerin Güvenliği', policy.guvenligi, 9)}
                {renderSection('haklari', 'Kişisel Veri Sahibinin Hakları', policy.haklari, 10)}
                {renderSection('gizlilik', 'Gizlilik Politikası', policy.gizlilik, 11)}
                {renderSection('giris-cikis', 'Şirket Giriş-Çıkışları ve Kişisel Veriler', policy.girisCikis, 12)}
                {renderSection('silinmesi', 'Kişisel Verilerin Silinmesi', policy.silinmesi, 13)}
                {renderSection('yayinlanmasi', 'Dokümanın Yayınlanması', policy.yayinlanmasi, 14)}
                {renderSection('guncelleme', 'Güncelleme Periyodu', policy.guncelleme, 15)}
                {renderSection('yururluk', 'Yürürlük', policy.yururluk, 16)}

              </div>

              {/* İletişim Bölümü */}
              <div className='mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>İletişim</h2>
                <p className='text-gray-700 mb-6'>
                  Kişisel verilerinizle ilgili sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz:
                </p>
                <div className='grid md:grid-cols-3 gap-6'>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>E-posta</h3>
                    <a href={`mailto:${policy.email}`} className='text-blue-600 hover:text-blue-800'>
                      {policy.email}
                    </a>
                  </div>
                  
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Telefon</h3>
                    <a href={`tel:${policy.telefon}`} className='text-blue-600 hover:text-blue-800'>
                      {policy.telefon}
                    </a>
                  </div>
                  
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Adres</h3>
                    <div className='text-blue-600 text-sm'>
                      {policy.adres}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

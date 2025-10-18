'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface KvkkDisclosureText {
  id: string
  title: string
  lastUpdated: string
  heroTitle: string
  heroSubtitle: string
  veriSorumlusuTitle: string
  veriSorumlusuContent: string
  islemeAmaciTitle: string
  islemeAmaciContent: string
  islemeAmaciBullets: string[]
  calisanVerileriTitle: string
  calisanVerileriContent: string
  aktarilmaTitle: string
  aktarilmaContent: string
  yurtIciAktarim: string[]
  yurtDisiAktarim: string[]
  acikRizaTitle: string
  acikRizaContent: string
  acikRizaBullets: string[]
  toplamaYontemiTitle: string
  toplamaYontemiContent: string
  dijitalKanallar: string[]
  fizikselKanallar: string[]
  iletisimKanallari: string[]
  haklarTitle: string
  haklarContent: string
  haklarListesi: string[]
  haklarKullanimTitle: string
  haklarKullanimContent: string
  emailIletisim: string
  kepIletisim: string
  basvuruSartlari: string[]
  iletisimTitle: string
  iletisimContent: string
  email: string
  telefon: string
  adres: string
  mapUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface KvkkAydinlatmaMetniClientProps {
  disclosureText: KvkkDisclosureText
}

export default function KvkkAydinlatmaMetniClient({ disclosureText }: KvkkAydinlatmaMetniClientProps) {
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { id: 'veri-sorumlusu', title: disclosureText.veriSorumlusuTitle },
    { id: 'isleme-amaci', title: disclosureText.islemeAmaciTitle },
    { id: 'aktarilmasi', title: disclosureText.aktarilmaTitle },
    { id: 'toplama-yontemi', title: disclosureText.toplamaYontemiTitle },
    { id: 'haklariniz', title: disclosureText.haklarTitle }
  ]

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
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
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
              <span>KVKK Aydınlatma Metni</span>
            </nav>
            <h1 className='font-neuropol text-3xl lg:text-4xl font-bold mb-4'>
              {disclosureText.heroTitle}
            </h1>
            <p className='text-lg text-gray-300 max-w-4xl mx-auto'>
              {disclosureText.heroSubtitle}
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
                
                {/* Veri Sorumlusu */}
                <section id='veri-sorumlusu'>
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
                    <h2 className='text-xl font-bold text-blue-900 mb-4'>
                      {disclosureText.veriSorumlusuTitle}
                    </h2>
                    <div className='text-blue-800 font-medium' dangerouslySetInnerHTML={{ __html: disclosureText.veriSorumlusuContent }} />
                  </div>
                </section>

                {/* Kişisel Verilerinizin İşlenme Amacı */}
                <section id='isleme-amaci'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    {disclosureText.islemeAmaciTitle}
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='text-gray-700 leading-relaxed mb-6' dangerouslySetInnerHTML={{ __html: disclosureText.islemeAmaciContent }} />
                    
                    {disclosureText.islemeAmaciBullets.length > 0 && (
                      <ul className='list-disc pl-6 space-y-2 text-gray-700 mb-6'>
                        {disclosureText.islemeAmaciBullets.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    <div className='bg-blue-50 p-6 rounded-lg'>
                      <h3 className='font-semibold text-gray-900 mb-4'>{disclosureText.calisanVerileriTitle}</h3>
                      <div className='text-gray-700 leading-relaxed' dangerouslySetInnerHTML={{ __html: disclosureText.calisanVerileriContent }} />
                    </div>
                  </div>
                </section>

                {/* Kişisel Verilerinizin Aktarılması */}
                <section id='aktarilmasi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    {disclosureText.aktarilmaTitle || "Kişisel Verilerinizin Aktarılması"}
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='text-gray-700 leading-relaxed mb-6' dangerouslySetInnerHTML={{ __html: disclosureText.aktarilmaContent }} />
                    
                    <div className='grid md:grid-cols-2 gap-6 mb-6'>
                      <div className='bg-green-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-3'>Yurt İçi Aktarım</h4>
                        <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                          {disclosureText.yurtIciAktarim.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className='bg-yellow-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-gray-900 mb-3'>Yurt Dışı Aktarım</h4>
                        <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                          {disclosureText.yurtDisiAktarim.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className='bg-orange-50 border border-orange-200 rounded-lg p-6'>
                      <h4 className='font-semibold text-gray-900 mb-3'>{disclosureText.acikRizaTitle || "Açık Rıza ile İşleme"}</h4>
                      <div className='text-gray-700 leading-relaxed mb-3' dangerouslySetInnerHTML={{ __html: disclosureText.acikRizaContent }} />
                      <ul className='list-disc pl-6 space-y-2 text-gray-700'>
                        {disclosureText.acikRizaBullets.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi */}
                <section id='toplama-yontemi'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    {disclosureText.toplamaYontemiTitle || "Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebebi"}
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='text-gray-700 leading-relaxed mb-6' dangerouslySetInnerHTML={{ __html: disclosureText.toplamaYontemiContent }} />
                    
                    <div className='bg-gray-50 p-6 rounded-lg'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Veri Toplama Kanalları</h3>
                      <div className='grid md:grid-cols-3 gap-4'>
                        <div>
                          <h4 className='font-medium text-gray-900 mb-2'>Dijital Kanallar</h4>
                          <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                            {disclosureText.dijitalKanallar.map((channel, index) => (
                              <li key={index}>{channel}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-900 mb-2'>Fiziksel Kanallar</h4>
                          <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                            {disclosureText.fizikselKanallar.map((channel, index) => (
                              <li key={index}>{channel}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-900 mb-2'>İletişim Kanalları</h4>
                          <ul className='list-disc pl-4 space-y-1 text-sm text-gray-700'>
                            {disclosureText.iletisimKanallari.map((channel, index) => (
                              <li key={index}>{channel}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Kişisel Veri Sahibi Olarak Haklarınız */}
                <section id='haklariniz'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200'>
                    {disclosureText.haklarTitle || "Kişisel Veri Sahibi Olarak Haklarınız"}
                  </h2>
                  <div className='prose prose-gray max-w-none'>
                    <div className='text-gray-700 leading-relaxed mb-6' dangerouslySetInnerHTML={{ __html: disclosureText.haklarContent }} />
                    
                    <div className='grid gap-4 mb-8'>
                      {disclosureText.haklarListesi.map((hak, index) => (
                        <div key={index} className='flex items-start gap-3 p-4 bg-blue-50 rounded-lg'>
                          <span className='w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5'>
                            {index + 1}
                          </span>
                          <span className='text-gray-700'>{hak}</span>
                        </div>
                      ))}
                    </div>

                    <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
                      <h3 className='font-semibold text-green-900 mb-4'>{disclosureText.haklarKullanimTitle || "Haklarınızı Nasıl Kullanabilirsiniz?"}</h3>
                      <div className='text-green-800 leading-relaxed mb-4' dangerouslySetInnerHTML={{ __html: disclosureText.haklarKullanimContent }} />
                      
                      <div className='grid md:grid-cols-2 gap-4 mb-4'>
                        <div className='bg-white p-4 rounded border border-green-200'>
                          <h4 className='font-medium text-green-900 mb-2'>E-posta ile</h4>
                          <p className='text-sm text-green-800'>
                            <strong>{disclosureText.emailIletisim}</strong> adresine ıslak imzalı olarak gönderebilirsiniz.
                          </p>
                        </div>
                        <div className='bg-white p-4 rounded border border-green-200'>
                          <h4 className='font-medium text-green-900 mb-2'>KEP ile</h4>
                          <p className='text-sm text-green-800'>
                            <strong>{disclosureText.kepIletisim}</strong> kayıtlı elektronik posta adresimize güvenli 
                            elektronik imza ile gönderebilirsiniz.
                          </p>
                        </div>
                      </div>

                      <div className='bg-white p-4 rounded border border-green-200'>
                        <h4 className='font-medium text-green-900 mb-2'>Başvuru Şartları</h4>
                        <ul className='list-disc pl-4 space-y-1 text-sm text-green-800'>
                          {disclosureText.basvuruSartlari.map((sart, index) => (
                            <li key={index}>{sart}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

              </div>

              {/* İletişim Bölümü */}
              <div className='mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>{disclosureText.iletisimTitle || "İletişim"}</h2>
                <div className='text-gray-700 mb-6' dangerouslySetInnerHTML={{ __html: disclosureText.iletisimContent }} />
                <div className='grid md:grid-cols-3 gap-6'>
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>E-posta</h3>
                    <a href={`mailto:${disclosureText.email}`} className='text-blue-600 hover:text-blue-800'>
                      {disclosureText.email}
                    </a>
                  </div>
                  
                  <div className='text-center'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                      </svg>
                    </div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Telefon</h3>
                    <a href={`tel:${disclosureText.telefon}`} className='text-blue-600 hover:text-blue-800'>
                      {disclosureText.telefon}
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
                    {disclosureText.mapUrl ? (
                      <a 
                        href={disclosureText.mapUrl} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 text-sm'
                      >
                        {disclosureText.adres}
                      </a>
                    ) : (
                      <span className='text-blue-600 text-sm'>{disclosureText.adres}</span>
                    )}
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

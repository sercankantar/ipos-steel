'use client'

import { useEffect, useState } from 'react'

interface EthicsSidebarProps {
  content?: string
}

export default function EthicsSidebar({ content }: EthicsSidebarProps) {
  const [activeSection, setActiveSection] = useState('giris')
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])

  // HTML content'ten heading'leri çıkar (sadece H1 ve H2)
  useEffect(() => {
    if (content) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(content, 'text/html')
      const h1Elements = doc.querySelectorAll('h1')
      const h2Elements = doc.querySelectorAll('h2')
      const extractedHeadings: Array<{ id: string; text: string; level: number }> = []
      
      // H1'leri ekle
      h1Elements.forEach((h1, index) => {
        const id = `heading-${index}`
        extractedHeadings.push({
          id,
          text: h1.textContent || '',
          level: 1
        })
      })
      
      // H2'leri ekle
      h2Elements.forEach((h2, index) => {
        const id = `heading-h2-${index}`
        extractedHeadings.push({
          id,
          text: h2.textContent || '',
          level: 2
        })
      })
      
      setHeadings(extractedHeadings)
    }
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      if (content && headings.length > 0) {
        // Yeni content varsa heading'lere göre scroll tracking
        let currentSection = headings[0]?.id || 'giris'
        
        for (const heading of headings) {
          const element = document.getElementById(heading.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 150) {
              currentSection = heading.id
            }
          }
        }
        
        setActiveSection(currentSection)
      } else {
        // Eski yapı için scroll tracking
        const sections = ['giris', 'calisan-iliskileri', 'sirket-disi-iliskiler', 'etik-davranis-kurallari', 'is-sagligi-guvenligi', 'siyasal-faaliyet-yasagi', 'uygulama-prensipleri']
        
        let currentSection = 'giris'
        
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 150) {
              currentSection = section
            }
          }
        }
        
        setActiveSection(currentSection)
      }
    }

    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [content, headings])

  const handleMenuClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      setActiveSection(sectionId)
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - 100
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className='sticky top-4 max-h-[calc(100vh-2rem)] overflow-hidden'>
      <div className='bg-white border border-gray-200 shadow-sm flex flex-col max-h-full'>
        <div className='bg-gray-50 px-4 py-3 border-b border-gray-200 flex-shrink-0'>
          <h2 className='text-lg font-semibold text-gray-900'>İçindekiler</h2>
        </div>
        <nav className='p-4 overflow-y-auto flex-1'>
          <ul className='space-y-2 text-sm'>
            {content && headings.length > 0 ? (
              // Yeni content varsa heading'leri göster
              headings.map((heading) => (
                <li key={heading.id}>
                  <button 
                    onClick={() => handleMenuClick(heading.id)}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === heading.id ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'} ${heading.level === 2 ? 'ml-4 text-sm' : ''}`}
                  >
                    <span>{heading.text}</span>
                  </button>
                </li>
              ))
            ) : (
              // Eski yapıyı göster
              <>
                <li>
                  <button 
                    onClick={() => handleMenuClick('giris')}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'giris' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                  >
                    <span className={`w-6 font-medium ${activeSection === 'giris' ? 'text-blue-600' : 'text-gray-400'}`}>1.</span>
                    <span>Giriş</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuClick('calisan-iliskileri')}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'calisan-iliskileri' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                  >
                    <span className={`w-6 font-medium ${activeSection === 'calisan-iliskileri' ? 'text-blue-600' : 'text-gray-400'}`}>2.</span>
                    <span>Çalışan İlişkileri</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuClick('sirket-disi-iliskiler')}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'sirket-disi-iliskiler' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                  >
                    <span className={`w-6 font-medium ${activeSection === 'sirket-disi-iliskiler' ? 'text-blue-600' : 'text-gray-400'}`}>3.</span>
                    <span>Şirket Dışı İlişkiler</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuClick('etik-davranis-kurallari')}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'etik-davranis-kurallari' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                  >
                    <span className={`w-6 font-medium ${activeSection === 'etik-davranis-kurallari' ? 'text-blue-600' : 'text-gray-400'}`}>4.</span>
                    <span>Çalışanların Uyması Gereken Etik Davranış Kuralları</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuClick('is-sagligi-guvenligi')}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'is-sagligi-guvenligi' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                  >
                    <span className={`w-6 font-medium ${activeSection === 'is-sagligi-guvenligi' ? 'text-blue-600' : 'text-gray-400'}`}>5.</span>
                    <span>İş Sağlığı ve İş Güvenliği</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuClick('siyasal-faaliyet-yasagi')}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'siyasal-faaliyet-yasagi' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                  >
                    <span className={`w-6 font-medium ${activeSection === 'siyasal-faaliyet-yasagi' ? 'text-blue-600' : 'text-gray-400'}`}>6.</span>
                    <span>Siyasal Faaliyet Yasağı</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleMenuClick('uygulama-prensipleri')}
                    className={`w-full flex items-center py-2 px-3 transition-colors duration-200 border-l-2 text-left ${activeSection === 'uygulama-prensipleri' ? 'bg-blue-50 text-blue-700 border-blue-600' : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'}`}
                  >
                    <span className={`w-6 font-medium ${activeSection === 'uygulama-prensipleri' ? 'text-blue-600' : 'text-gray-400'}`}>7.</span>
                    <span>Uygulama Prensipleri</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function EthicsSidebar() {
  const [activeSection, setActiveSection] = useState('giris')

  useEffect(() => {
    const handleScroll = () => {
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

    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          </ul>
        </nav>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [requestCount, setRequestCount] = useState(0)

  useEffect(() => {
    // LocalStorage'dan istek listesi sayısını al
    const updateRequestCount = () => {
      const savedItems = localStorage.getItem('requestList')
      if (savedItems) {
        const items = JSON.parse(savedItems)
        setRequestCount(items.length)
      } else {
        setRequestCount(0)
      }
    }

    updateRequestCount()

    // LocalStorage değişikliklerini dinle
    const handleStorageChange = () => {
      updateRequestCount()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Custom event listener for same-tab updates
    window.addEventListener('requestListUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('requestListUpdated', handleStorageChange)
    }
  }, [])
  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <MobileNav />

              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <img src="/logoipos.svg" alt="IPOS-Steel" className='h-10 w-auto' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {/* Sepet İkonu */}
                  <Link 
                    href="/istek-listesi"
                    className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {requestCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {requestCount > 99 ? '99+' : requestCount}
                      </span>
                    )}
                  </Link>
                  
                  <div className='ml-4 flow-root lg:ml-6'>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar

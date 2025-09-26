'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen)
      document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>
    )

  return (
    <div>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </div>

      <div className='fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex'>
        <div className='w-4/5'>
          <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
            <div className='flex px-4 pb-2 pt-5'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>

            <div className='mt-2'>
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li
                    key={category.label}
                    className='space-y-10 px-4 pb-8 pt-10'>
                    <div className='border-b border-blue-100 bg-blue-50 rounded-lg p-4 mb-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                        <p className='text-blue-900 flex-1 whitespace-nowrap text-base font-bold font-neuropol'>
                          {category.label}
                        </p>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-y-10 gap-x-4'>
                      {category.featured.map((item) => (
                        <div
                          key={item.name}
                          className='group relative text-sm'>
                          <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                            <Image
                              fill
                              src={item.imageSrc}
                              alt='product category image'
                              className='object-cover object-center'
                            />
                          </div>
                          <Link
                            href={item.href}
                            className='mt-6 block font-medium text-gray-900'>
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className='space-y-4 border-t border-gray-200 px-4 py-6 bg-gray-50'>
              {/* İletişim Linki */}
              <div className='flow-root'>
                <Link
                  onClick={() => closeOnCurrent('/iletisim')}
                  href='/iletisim'
                  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 block text-center font-neuropol shadow-sm'>
                  İletişim
                </Link>
              </div>
              <div className='flow-root'>
                <Link
                  onClick={() => closeOnCurrent('/sign-in')}
                  href='/sign-in'
                  className='border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold px-4 py-3 rounded-lg transition-all duration-200 block text-center font-neuropol bg-white'>
                  Yönetici Girişi
                </Link>
              </div>
              <div className='flow-root'>
                <div className='border-2 border-gray-300 text-gray-700 font-medium px-4 py-3 rounded-lg bg-white text-center font-neuropol'>
                  Dil: <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav

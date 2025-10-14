'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Menu, X, ChevronDown, ChevronRight, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [productItems, setProductItems] = useState<{ name: string; href: string }[]>([])

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

  // Allow background scrolling when mobile menu is open

  // load product categories for mobile menu
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/product-categories', { cache: 'no-store' })
        if (!res.ok) return
        const data: { name: string; slug: string }[] = await res.json()
        setProductItems(
          data.map((c) => ({
            name: c.name,
            href: `/products?category=${encodeURIComponent(c.slug)}`,
          }))
        )
      } catch {}
    }
    load()
  }, [])

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-600'>
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>
    )

  return (
    <>
      {/* Backdrop */}
      <div 
        className='fixed inset-0 z-40 lg:hidden bg-black/30 backdrop-blur-sm'
        onClick={() => setIsOpen(false)}
      />
      
      {/* Slide-out Menu */}
      <div className='fixed top-0 left-0 z-50 lg:hidden w-80 h-full bg-[#003054] text-white overflow-y-auto shadow-2xl transform transition-transform duration-300 ease-in-out'>
        <div className='px-6 pt-6 pb-10'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-lg font-neuropol font-bold'>Menü</h2>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors'>
              <X className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>

        <nav className='mt-6'>
          <ul className='space-y-4'>
            {PRODUCT_CATEGORIES.map((category) => {
              const isExpanded = expanded[category.label]
              return (
                <li key={category.label}>
                  <button
                    type='button'
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [category.label]: !prev[category.label],
                      }))
                    }
                    className='w-full flex items-center justify-between py-3 text-base font-neuropol'>
                    <span className='font-semibold'>{category.label}</span>
                    {isExpanded ? (
                      <ChevronDown className='h-5 w-5' />
                    ) : (
                      <ChevronRight className='h-5 w-5' />
                    )}
                  </button>

                  {isExpanded && (
                    <ul className='mt-2 pl-3 space-y-3 border-l border-white/30'>
                      {(category.label === 'Ürünler'
                        ? (productItems.length ? productItems : [])
                        : category.featured
                      ).map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className='block py-1.5 text-white/90 hover:text-white'>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}

           
            <li>
              <Link
                href='/iletisim'
                onClick={() => setIsOpen(false)}
                className='block py-3 text-base font-neuropol font-semibold'>
                İletişim
              </Link>
            </li>
          </ul>
        </nav>

        <div className='mt-10 flex items-center gap-4'>
          
          <div className='px-1 py-2 rounded-full bg-white text-blue-700 font-semibold'>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MobileNav

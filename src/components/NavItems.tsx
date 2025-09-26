'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import Link from 'next/link'

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<
    null | number
  >(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const isAnyOpen = activeIndex !== null

  const navRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null)
          } else {
            setActiveIndex(i)
          }
        }

        const close = () => setActiveIndex(null)

        const isOpen = i === activeIndex

        return (
          <NavItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
      
      {/* İletişim - düz link olarak */}
      <div className='flex items-center'>
        <Link
          href='/iletisim'
          className='font-neuropol font-semibold text-gray-700 hover:text-primary-blue transition-colors duration-200 px-3 py-2 rounded-md relative group'
        >
          İletişim
          <span className='absolute -bottom-1 left-3 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-[calc(100%-24px)]'></span>
        </Link>
      </div>
    </div>
  )
}

export default NavItems

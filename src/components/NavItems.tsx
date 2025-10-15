'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import NavItem from './NavItem'
import Link from 'next/link'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

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
  const pathname = usePathname()

  useOnClickOutside(navRef, () => setActiveIndex(null))

  // sayfa değiştiğinde menüyü kapat
  useEffect(() => {
    setActiveIndex(null)
  }, [pathname])

  return (
    <div className='flex gap-2 h-full' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          setActiveIndex(i)
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
      
      {/* İletişim - diğer menü öğeleriyle aynı stil */}
      <div className='flex items-center'>
        <Button
          asChild
          variant='ghost'
          className='gap-1.5 font-neuropol font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-200 transition-all duration-200 px-4 py-2'
        >
          <Link href='/iletisim'>
            İletişim
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NavItems

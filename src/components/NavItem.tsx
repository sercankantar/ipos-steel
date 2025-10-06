'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavItemProps {
  category: Category
  handleOpen: () => void
  close: () => void
  isOpen: boolean
  isAnyOpen: boolean
}

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
}: NavItemProps) => {
  const [dynamicFeatured, setDynamicFeatured] = useState(category.featured)

  useEffect(() => {
    const load = async () => {
      if (category.label !== 'Ürünler') return
      try {
        const res = await fetch('/api/product-categories', { cache: 'no-store' })
        if (!res.ok) return
        const data: { name: string; slug: string; imageUrl?: string }[] = await res.json()
        setDynamicFeatured(
          data.map((c) => ({
            name: c.name,
            href: `/products?category=${encodeURIComponent(c.slug)}`,
            imageSrc: c.imageUrl || '/nav/ui-kits/mixed.jpg',
          }))
        )
      } catch {}
    }
    load()
  }, [category.label])
  return (
    <div className='flex relative'>
      <div className='relative flex items-center'>
        <Button
          className={cn(
            'gap-1.5 font-neuropol font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-200 transition-all duration-200 px-4 py-2',
            {
              'text-blue-600 bg-blue-50 border-blue-200': isOpen,
            }
          )}
          onClick={handleOpen}
          variant='ghost'>
          {category.label}
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-all duration-200',
              {
                '-rotate-180 text-blue-600': isOpen,
                'text-gray-500': !isOpen,
              }
            )}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            'absolute top-full left-0 text-sm text-muted-foreground z-50',
            {
              'animate-in fade-in-10 slide-in-from-top-5':
                !isAnyOpen,
            }
          )}>
          <div className='relative bg-white border border-gray-200 shadow-lg rounded-md'>
            <div className='py-2 min-w-[200px]'>
              <div className='flex flex-col'>
                {(category.label === 'Ürünler' ? dynamicFeatured : category.featured).map((item) => (
                  <Link
                    href={item.href}
                    onClick={() => close()}
                    key={item.name}
                    className='block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-neuropol whitespace-nowrap'>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NavItem

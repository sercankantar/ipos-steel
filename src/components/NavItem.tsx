'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
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
    <div className='flex' onMouseEnter={handleOpen} onMouseLeave={close}>
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
          onClick={() => close()}
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            {
              'animate-in fade-in-10 slide-in-from-top-5':
                !isAnyOpen,
            }
          )}>
          <div
            className='absolute inset-0 top-1/2 bg-white shadow-xl border-t border-gray-100'
            aria-hidden='true'
          />

          <div className='relative bg-white border-t border-gray-100 shadow-lg'>
            <div className='mx-auto max-w-6xl px-6'>
              <div className='py-8'>
                <div className='grid grid-cols-3 gap-6'>
                  {(category.label === 'Ürünler' ? dynamicFeatured : category.featured).map((item) => (
                    <Link
                      href={item.href}
                      onClick={() => close()}
                      key={item.name}
                      className='group relative block p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200'>
                      <div className='relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 mb-3'>
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          className='object-cover object-center rounded-lg group-hover:scale-105 transition-transform duration-300'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'></div>
                      </div>

                      <div className='text-center'>
                        <h3 className='font-neuropol font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-sm'>
                          {item.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NavItem

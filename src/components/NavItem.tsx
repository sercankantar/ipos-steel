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
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

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

  const shouldShowMenu = isOpen || isHovered
  
  const handleClick = () => {
    setIsClicked(!isClicked)
    if (!isClicked) {
      handleOpen()
    } else {
      close()
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!isClicked) {
      handleOpen()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isClicked) {
      close()
    }
  }

  return (
    <div 
      className='flex relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='relative flex items-center'>
        <Button
          className={cn(
            'gap-1.5 font-neuropol font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-200 transition-all duration-200 px-4 py-2',
            {
              'text-blue-600 bg-blue-50 border-blue-200': shouldShowMenu,
            }
          )}
          onClick={handleClick}
          variant='ghost'>
          {category.label}
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-all duration-200',
              {
                '-rotate-180 text-blue-600': shouldShowMenu,
                'text-gray-500': !shouldShowMenu,
              }
            )}
          />
        </Button>
      </div>

      {shouldShowMenu ? (
        <>
          {/* Backdrop with blur */}
          <div 
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
            onClick={() => {
              setIsClicked(false)
              close()
            }}
          />
          
          <div
            className={cn(
              'absolute top-full left-0 text-sm text-muted-foreground z-50',
              {
                'animate-in fade-in-10 slide-in-from-top-5':
                  !isAnyOpen,
              }
            )}>
            <div className='relative bg-white border border-gray-200 shadow-lg rounded-md'>
            {category.label === 'Kurumsal' ? (
              // Temiz kurumsal menü
              <div className='py-6 min-w-[800px] bg-white'>
                <div className='px-8'>
                  <div className='grid grid-cols-3 gap-12'>
                    {/* Hakkımızda */}
                    <div>
                      <h3 className='text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide'>
                        Hakkımızda
                      </h3>
                      <div className='space-y-3'>
                        <Link
                          href='/hakkimizda'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          IPOS Steel Hakkında
                        </Link>
                        <Link
                          href='/misyon-vizyon'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          Misyonumuz ve Vizyonumuz
                        </Link>
                        <Link
                          href='/sertifikalar'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          Sertifikalarımız
                        </Link>
                        <Link
                          href='/referanslarimiz'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          Referanslarımız
                        </Link>
                      </div>
                    </div>

                    {/* Medya Merkezi */}
                    <div>
                      <h3 className='text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide'>
                        Medya Merkezi
                      </h3>
                      <div className='space-y-3'>
                        <Link
                          href='/haberler'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          IPOS Haberler
                        </Link>
                        <Link
                          href='/basin-aciklamalari'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          Basın Açıklamaları
                        </Link>
                        <Link
                          href='/galeri'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          Galeri
                        </Link>
                        <Link
                          href='/musteri-memnuniyet-anketi'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          Müşteri Memnuniyet Anketi
                        </Link>
                      </div>
                    </div>

                    {/* KVKK */}
                    <div>
                      <h3 className='text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200 uppercase tracking-wide'>
                        Kişisel Verilerin Korunması
                      </h3>
                      <div className='space-y-3'>
                        <Link
                          href='/kvkk-gizlilik-politikasi'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200 leading-relaxed'>
                          Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası
                        </Link>
                        <Link
                          href='/kvkk-aydinlatma-metni'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          Kişisel Verilere İlişkin Aydınlatma Metni
                        </Link>
                        <Link
                          href='/kvkk-basvuru-formu'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition-all duration-200'>
                          KVKK Başvuru Formu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Diğer menüler için normal düzen
              <div className='py-2 min-w-[200px]'>
                <div className='flex flex-col'>
                  {(category.label === 'Ürünler' ? dynamicFeatured : category.featured).map((item) => (
                      <Link
                        href={item.href}
                      onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                      key={item.name}
                      className='block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-neuropol whitespace-nowrap'>
                        {item.name}
                      </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </>
      ) : null}
    </div>
  )
}

export default NavItem

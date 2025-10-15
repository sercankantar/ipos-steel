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
  const [isClicked, setIsClicked] = useState(false)
  const [selectedProductCategory, setSelectedProductCategory] = useState('kablo-kanal-sistemleri')

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

  // Diğer menüler açıldığında isClicked state'ini sıfırla
  useEffect(() => {
    if (!isOpen && isClicked) {
      setIsClicked(false)
    }
  }, [isOpen, isClicked])

  const shouldShowMenu = isOpen || isClicked
  
  const handleClick = () => {
    if (isOpen) {
      // Eğer menü zaten açıksa kapat
      setIsClicked(false)
      close()
    } else {
      // Menü kapalıysa aç
      setIsClicked(true)
      handleOpen()
    }
  }

  return (
    <div 
      className='flex relative'
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
          <div
            className={cn(
              'absolute top-full left-1/2 transform -translate-x-1/4 text-sm text-muted-foreground z-50',
              {
                'animate-in fade-in-10 slide-in-from-top-5':
                  !isAnyOpen,
              }
            )}>
            <div className='relative bg-white border border-gray-200 shadow-lg rounded-md'>
            {category.label === 'Ürünler' ? (
              // Modern ürünler menü - EAE tarzında
              <div className={cn(
                'py-4 min-w-[1400px] bg-white shadow-lg',
                selectedProductCategory === 'kablo-kanal-sistemleri' ? 'max-h-[650px]' : 'max-h-[500px]'
              )}>
                <div className='flex'>
                  {/* Sol taraf - Kategoriler */}
                  <div className='w-80 bg-gray-50 border-r border-gray-200 p-4'>
                    <h3 className='text-lg font-bold text-gray-900 mb-4'>Ürünlerimiz</h3>
                    <div className='space-y-2'>
                      {/* Kablo Kanal Sistemleri */}
                      <button
                        onClick={() => setSelectedProductCategory('kablo-kanal-sistemleri')}
                        className={cn(
                          'w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left',
                          selectedProductCategory === 'kablo-kanal-sistemleri'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        )}
                      >
                        <div className='w-8 h-8 mr-3 flex items-center justify-center'>
                          <div className={cn(
                            'w-6 h-6 bg-gray-300 rounded',
                            selectedProductCategory === 'kablo-kanal-sistemleri' ? 'bg-white' : 'bg-gray-400'
                          )}>📦</div>
                        </div>
                        <div>
                          <div className='font-semibold text-sm'>Kablo Kanal Sistemleri</div>
                          <div className='text-xs opacity-75 mt-1'>Kablo yönetimi çözümleri</div>
                        </div>
                      </button>

                      {/* Askı Sistemleri */}
                      <button
                        onClick={() => setSelectedProductCategory('aski-sistemleri')}
                        className={cn(
                          'w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left',
                          selectedProductCategory === 'aski-sistemleri'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        )}
                      >
                        <div className='w-8 h-8 mr-3 flex items-center justify-center'>
                          <div className={cn(
                            'w-6 h-6 bg-gray-300 rounded',
                            selectedProductCategory === 'aski-sistemleri' ? 'bg-white' : 'bg-gray-400'
                          )}>🔗</div>
                        </div>
                        <div>
                          <div className='font-semibold text-sm'>Askı Sistemleri</div>
                          <div className='text-xs opacity-75 mt-1'>Montaj ve askı çözümleri</div>
                        </div>
                      </button>

                      {/* Solar Montaj Sistemleri */}
                      <button
                        onClick={() => setSelectedProductCategory('solar-montaj-sistemleri')}
                        className={cn(
                          'w-full flex items-center p-3 rounded-lg transition-all duration-200 text-left',
                          selectedProductCategory === 'solar-montaj-sistemleri'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        )}
                      >
                        <div className='w-8 h-8 mr-3 flex items-center justify-center'>
                          <div className={cn(
                            'w-6 h-6 bg-gray-300 rounded',
                            selectedProductCategory === 'solar-montaj-sistemleri' ? 'bg-white' : 'bg-gray-400'
                          )}>☀️</div>
                        </div>
                        <div>
                          <div className='font-semibold text-sm'>Solar Montaj Sistemleri</div>
                          <div className='text-xs opacity-75 mt-1'>Güneş enerjisi montajı</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Sağ taraf - Seçilen kategoriye göre ürünler */}
                  <div className='flex-1 p-4 overflow-y-auto'>
                    {selectedProductCategory === 'kablo-kanal-sistemleri' && (
                      <>
                        <div className='mb-6'>
                          <h3 className='text-lg font-bold text-gray-900 mb-3'>Kablo Kanalı Genel Bilgi</h3>
                          <div className='flex items-start space-x-4'>
                            <div className='w-48 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center'>
                              <div className='text-gray-400 text-3xl'>📦</div>
                            </div>
                            <div className='flex-1'>
                              <p className='text-gray-600 leading-relaxed mb-3 text-sm'>
                                IPOS kablo kanalları; otomatik üretim hatlarında 'ROLL FORMING' metoduyla seri olarak imal edilmektedir. 
                                Yüksek kaliteli çelik malzemeden üretilen kanallarımız, dayanıklılık ve güvenilirlik sunar.
                              </p>
                              <Link
                                href='/products?category=kablo-kanal-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className='text-base font-bold text-gray-900 mb-3'>Kablo Kanal Sistemleri Kategorileri</h4>
                          <div className='grid grid-cols-3 gap-3'>
                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md mb-2 flex items-center justify-center'>
                                <div className='text-blue-600 text-xl'>📦</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Kablo Kanalları</h5>
                              <Link
                                href='/products?category=kablo-kanallari'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-md mb-2 flex items-center justify-center'>
                                <div className='text-green-600 text-xl'>🪜</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Kablo Merdivenleri</h5>
                              <Link
                                href='/products?category=kablo-merdivenleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-purple-600 text-xl'>🔗</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Tel Kablo Kanalları</h5>
                              <Link
                                href='/products?category=tel-kablo-kanallari'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-orange-600 text-xl'>🛡️</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>GRP Kablo Kanalı</h5>
                              <Link
                                href='/products?category=grp-kablo-kanali'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-red-600 text-xl'>📋</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>TKS Kablo Kanalları</h5>
                              <Link
                                href='/products?category=tks-kablo-kanallari'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-indigo-600 text-xl'>⚡</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Alüminyum Kablo Kanalları</h5>
                              <Link
                                href='/products?category=aluminyum-kablo-kanallari'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {selectedProductCategory === 'aski-sistemleri' && (
                      <>
                        <div className='mb-6'>
                          <h3 className='text-lg font-bold text-gray-900 mb-3'>Askı Sistemleri Genel Bilgi</h3>
                          <div className='flex items-start space-x-4'>
                            <div className='w-48 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center'>
                              <div className='text-gray-400 text-3xl'>🔗</div>
                            </div>
                            <div className='flex-1'>
                              <p className='text-gray-600 leading-relaxed mb-3 text-sm'>
                                IPOS askı sistemleri; endüstriyel tesislerde güvenli ve dayanıklı montaj çözümleri sunar. 
                                Yüksek mukavemetli malzemelerden üretilen askı sistemlerimiz, uzun ömürlü performans garantisi verir.
                              </p>
                              <Link
                                href='/products?category=aski-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className='text-base font-bold text-gray-900 mb-3'>Askı Sistemleri Kategorileri</h4>
                          <div className='grid grid-cols-3 gap-3'>
                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-blue-600 text-xl'>🔗</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Dübel Askı Sistemleri</h5>
                              <Link
                                href='/products?category=dubel-aski-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-green-600 text-xl'>🏗️</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Konstrüksiyon Askı Sistemleri</h5>
                              <Link
                                href='/products?category=konstruksiyon-aski-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-purple-600 text-xl'>⚓</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Ankraj Askı Sistemleri</h5>
                              <Link
                                href='/products?category=ankraj-aski-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {selectedProductCategory === 'solar-montaj-sistemleri' && (
                      <>
                        <div className='mb-6'>
                          <h3 className='text-lg font-bold text-gray-900 mb-3'>Solar Montaj Sistemleri Genel Bilgi</h3>
                          <div className='flex items-start space-x-4'>
                            <div className='w-48 h-32 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-lg flex items-center justify-center'>
                              <div className='text-yellow-500 text-3xl'>☀️</div>
                            </div>
                            <div className='flex-1'>
                              <p className='text-gray-600 leading-relaxed mb-3 text-sm'>
                                IPOS solar montaj sistemleri; güneş enerjisi panellerinin güvenli ve verimli montajı için 
                                özel olarak tasarlanmış çözümler sunar. Dayanıklı alüminyum ve galvanizli çelik malzemelerden üretilir.
                              </p>
                              <Link
                                href='/products?category=solar-montaj-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className='text-base font-bold text-gray-900 mb-3'>Solar Montaj Sistemleri Kategorileri</h4>
                          <div className='grid grid-cols-3 gap-3'>
                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-yellow-600 text-xl'>🏠</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Çatı Montaj Sistemleri</h5>
                              <Link
                                href='/products?category=cati-montaj-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-orange-600 text-xl'>🏗️</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Karakol Montaj Sistemleri</h5>
                              <Link
                                href='/products?category=karakol-montaj-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'>
                              <div className='w-full h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-md mb-3 flex items-center justify-center'>
                                <div className='text-red-600 text-xl'>⚡</div>
                              </div>
                              <h5 className='font-semibold text-gray-900 mb-1 text-sm'>Toprak Montaj Sistemleri</h5>
                              <Link
                                href='/products?category=toprak-montaj-sistemleri'
                                onClick={() => {
                                  setIsClicked(false)
                                  close()
                                }}
                                className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Hakkında daha fazlası →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : category.label === 'Kurumsal' ? (
              // Modern kurumsal menü - EAE tarzında
              <div className='py-8 min-w-[1200px] bg-white shadow-lg'>
                <div className='px-12'>
                  <div className='grid grid-cols-4 gap-12'>
                    {/* Hakkımızda */}
                    <div className='col-span-1'>
                      <h3 className='text-sm font-bold text-blue-600 mb-6 pb-2 border-b-2 border-blue-600 uppercase tracking-wide'>
                        Hakkımızda
                      </h3>
                      <div className='space-y-4'>
                        <Link
                          href='/hakkimizda'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          IPOS-Steel Hakkında
                        </Link>
                        <Link
                          href='/misyon-vizyon'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Misyonumuz ve Vizyonumuz
                        </Link>
                        <Link
                          href='/sertifikalar'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Sertifikalarımız
                        </Link>
                        <Link
                          href='/referanslarimiz'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Referanslarımız
                        </Link>
                        <Link
                          href='/katalog-brosurler'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Katalog & Broşürler
                        </Link>
                      </div>
                    </div>

                    {/* Medya Merkezi */}
                    <div className='col-span-1'>
                      <h3 className='text-sm font-bold text-blue-600 mb-6 pb-2 border-b-2 border-blue-600 uppercase tracking-wide'>
                        Medya Merkezi
                      </h3>
                      <div className='space-y-4'>
                        <Link
                          href='/haberler'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          IPOS Haberler
                        </Link>
                        <Link
                          href='/basin-aciklamalari'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Basın Açıklamaları
                        </Link>
                        <Link
                          href='/galeri'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Galeri
                        </Link>
                        <Link
                          href='/musteri-memnuniyet-anketi'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Müşteri Memnuniyet Anketi
                        </Link>
                      </div>
                    </div>

                    {/* KVKK */}
                    <div className='col-span-1'>
                      <h3 className='text-sm font-bold text-blue-600 mb-6 pb-2 border-b-2 border-blue-600 uppercase tracking-wide'>
                        Kişisel Verilerin Korunması
                      </h3>
                      <div className='space-y-4'>
                        <Link
                          href='/kvkk-gizlilik-politikasi'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium leading-relaxed'>
                          Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası
                        </Link>
                        <Link
                          href='/kvkk-aydinlatma-metni'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200 font-medium'>
                          Kişisel Verilere İlişkin Aydınlatma Metni
                        </Link>
                      </div>
                    </div>

                    {/* Promosyonel Blok */}
                    <div className='col-span-1'>
                      {/* IPOS Blog */}
                      <div className='bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg border border-blue-200 h-full'>
                        <div className='w-full h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-md mb-4 flex items-center justify-center'>
                          <div className='text-white text-3xl'>📱</div>
                        </div>
                        <h4 className='font-bold text-gray-900 text-base mb-3'>IPOS Gündem</h4>
                        <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
                          IPOS Gündem sayfası ile güncel haberlerimize kolay ve hızlıca ulaşın.
                        </p>
                        <Link
                          href='/haberler'
                          onClick={() => {
                            setIsClicked(false)
                            close()
                          }}
                          className='text-sm text-blue-600 hover:text-blue-800 font-medium'>
                          Daha fazla bilgi için →
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
      ) : null}
    </div>
  )
}

export default NavItem

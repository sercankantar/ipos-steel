'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { Phone, Mail, MapPin, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

const Footer = () => {
  const pathname = usePathname()
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({})

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/product-categories', { cache: 'no-store' })
        if (!res.ok) return
        const data: { name: string; slug: string }[] = await res.json()
        const normalize = (s: string) => s.toLocaleLowerCase('tr-TR')
        const map: Record<string, string> = {}
        for (const c of data) {
          const n = normalize(c.name)
          if (n.includes('busbar')) map['busbar'] = `/products?category=${encodeURIComponent(c.slug)}`
          if (n.includes('askı') || n.includes('aski')) map['aski'] = `/products?category=${encodeURIComponent(c.slug)}`
          if (n.includes('kablo kanalı') || n.includes('kablo kanalları')) map['kablo-kanali'] = `/products?category=${encodeURIComponent(c.slug)}`
          if (n.includes('iç tesisat') || n.includes('ic tesisat')) map['ic-tesisat'] = `/products?category=${encodeURIComponent(c.slug)}`
          if (n.includes('trolley')) map['trolley'] = `/products?category=${encodeURIComponent(c.slug)}`
        }
        setCategoryMap(map)
      } catch {}
    }
    load()
  }, [])
  const pathsToMinimize = [
    '/verify-email',
    '/sign-up',
    '/sign-in',
  ]

  if (pathsToMinimize.includes(pathname)) {
    return (
      <footer className='bg-gray-50 border-t border-gray-200'>
        <MaxWidthWrapper>
          <div className='py-6 text-center'>
            <p className='text-sm text-gray-600'>
              &copy; {new Date().getFullYear()} IPOS Steel. Tüm hakları saklıdır.
            </p>
          </div>
        </MaxWidthWrapper>
      </footer>
    )
  }

  return (
    <footer className='bg-slate-900 text-white'>
      <MaxWidthWrapper>
        <div className='py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            
            {/* Şirket Bilgileri */}
            <div className='md:col-span-2 lg:col-span-2'>
              <div className='mb-4'>
                <img src="/logoipos.svg" alt="IPOS Steel" className='h-10 w-auto mb-3 filter brightness-0 invert' />
                <h3 className='font-neuropol text-lg font-bold mb-3'>IPOS Steel</h3>
                <p className='text-gray-300 text-sm leading-relaxed mb-4'>
                  Elektrik dağıtım sistemleri alanında güvenilir çözümler.
                </p>
              </div>
              
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Phone className='h-4 w-4 text-gray-400' />
                  <a href='tel:+902626744767' className='text-gray-300 hover:text-white transition-colors text-sm'>
                    +90 (262) 674 47 67
                  </a>
                </div>
                <div className='flex items-center gap-3'>
                  <Mail className='h-4 w-4 text-gray-400' />
                  <a href='mailto:info@ipos-steel.com' className='text-gray-300 hover:text-white transition-colors text-sm'>
                    info@ipos-steel.com
                  </a>
                </div>
                <div className='flex items-start gap-3'>
                  <MapPin className='h-4 w-4 text-gray-400 mt-0.5' />
                  <span className='text-gray-300 text-sm'>
                    Köseler, Kocaeli Kafe OSB, 1. Cd. No:22, 41420 Dilovası/Kocaeli
                  </span>
                </div>
              </div>
            </div>

            {/* Hızlı Linkler ve Ürünler - Mobilde yan yana */}
            <div className='grid grid-cols-2 gap-6 md:col-span-2 lg:col-span-2'>
              {/* Hızlı Linkler */}
              <div>
                <h4 className='font-neuropol font-bold mb-4 text-sm'>Hızlı Linkler</h4>
                <ul className='space-y-2'>
                  <li>
                    <Link href='/' className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Ana Sayfa
                    </Link>
                  </li>
                  <li>
                    <Link href='/products' className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Ürünler
                    </Link>
                  </li>
                  <li>
                    <Link href='/iletisim' className='text-gray-300 hover:text-white transition-colors text-sm'>
                      İletişim
                    </Link>
                  </li>
                  <li>
                    <Link href='/hakkimizda' className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Hakkımızda
                    </Link>
                  </li>
                  <li>
                    <Link href='/referanslar' className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Referanslar
                    </Link>
                  </li>
                  <li>
                    <Link href='/haberler' className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Haberler
                    </Link>
                  </li>
                  <li>
                    <Link href='/basin-aciklamalari' className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Basın Açıklamaları
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Ürünler */}
              <div>
                <h4 className='font-neuropol font-bold mb-4 text-sm'>Ürünlerimiz</h4>
                <ul className='space-y-2'>
                  <li>
                    <Link href={categoryMap['busbar'] || '/products'} className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Busbar Sistemleri
                    </Link>
                  </li>
                  <li>
                    <Link href={categoryMap['aski'] || '/products'} className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Askı Sistemleri
                    </Link>
                  </li>
                  <li>
                    <Link href={categoryMap['kablo-kanali'] || '/products'} className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Kablo Kanalı Sistemleri
                    </Link>
                  </li>
                  <li>
                    <Link href={categoryMap['ic-tesisat'] || '/products'} className='text-gray-300 hover:text-white transition-colors text-sm'>
                      İç Tesisat Çözümleri
                    </Link>
                  </li>
                  <li>
                    <Link href={categoryMap['trolley'] || '/products'} className='text-gray-300 hover:text-white transition-colors text-sm'>
                      Trolley Busbar
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className='border-t border-gray-700 py-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div className='text-center md:text-left mb-4 md:mb-0'>
              <p className='text-gray-400 text-sm'>
                &copy; {new Date().getFullYear()} IPOS Steel. Tüm hakları saklıdır.
              </p>
            </div>

            <div className='flex items-center justify-center md:justify-end space-x-6'>
              <Link
                href='/kvkk-gizlilik-politikasi'
                className='text-gray-400 hover:text-white text-sm transition-colors'>
                Gizlilik Politikası
              </Link>
              <Link
                href='/kvkk-gizlilik-politikasi'
                className='text-gray-400 hover:text-white text-sm transition-colors'>
                KVKK
              </Link>
              <Link
                href='/is-etigi-kurallarimiz'
                className='text-gray-400 hover:text-white text-sm transition-colors'>
                Şartlar
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer

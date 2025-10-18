import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { headers } from 'next/headers'
import CatalogClient from './CatalogClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getCatalogs() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/catalogs`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

async function getCategories() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/catalog-categories`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

async function getPageSettings() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/catalog-page-settings`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function KatalogBrosurlerPage() {
  const catalogs = await getCatalogs()
  const categories = await getCategories()
  const pageSettings = await getPageSettings()

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white transition-colors'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <Link href='/indirme-merkezi' className='hover:text-white transition-colors'>İndirme Merkezi</Link>
              <span className='mx-2'>/</span>
              <span>Katalog & Broşürler</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              {pageSettings?.heroTitle || 'Katalog & Broşürler'}
            </h1>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
              {pageSettings?.heroSubtitle || 'Ürün gamımız hakkında detaylı bilgi edinmek için katalog ve broşürlerimizi indirebilirsiniz. Teknik özellikler, montaj detayları ve uygulama örnekleri ile kapsamlı dokümantasyon.'}
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-12'>
          <CatalogClient catalogs={catalogs} categories={categories} />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

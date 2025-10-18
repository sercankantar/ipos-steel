import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { headers } from 'next/headers'
import EthicsClient from './EthicsClient'
import EthicsSidebar from './EthicsSidebar'

async function getEthicsRules() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/business-ethics-rules`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function IsEtigiKurallarimiz() {
  const rules = await getEthicsRules()

  return (
    <div className='min-h-screen bg-white scroll-smooth'>
      {/* Hero Section */}
      <div className='bg-gray-900 py-16'>
    <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <span>İş Etiği Kurallarımız</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              {rules?.heroTitle || 'İş Etiği Kurallarımız'}
          </h1>
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-16'>
          <div className='grid lg:grid-cols-4 gap-8'>
            {/* Sol Sidebar - İçindekiler */}
            <div className='lg:col-span-1'>
              <EthicsSidebar />
            </div>

            {/* Sağ İçerik Alanı */}
            <div className='lg:col-span-3'>
              <EthicsClient rules={rules} />
            </div>

          </div>
        </div>
    </MaxWidthWrapper>
      </div>
  )
}
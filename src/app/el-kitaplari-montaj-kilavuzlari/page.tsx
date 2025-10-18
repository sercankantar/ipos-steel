import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Download, FileText, Calendar, Eye, Tag, ChevronDown, ExternalLink, Monitor, Printer, Share2 } from 'lucide-react'
import Link from 'next/link'
import { headers } from 'next/headers'
import ManualClient from './ManualClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getManuals() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/manuals`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

async function getCategories() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/manual-categories`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

async function getPageSettings() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/manual-page-settings`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function ElKitaplariMontajKilavuzlariPage() {
  const manuals = await getManuals()
  const categories = await getCategories()
  const pageSettings = await getPageSettings()
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold mb-6 text-slate-900">
              {pageSettings?.heroTitle || 'El Kitapları & Montaj Kılavuzları'}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {pageSettings?.heroSubtitle || 'Ürünlerimizin doğru montajı için detaylı el kitapları ve kılavuzları. Güvenlik standartları, montaj teknikleri ve uygulama örnekleri.'}
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İçerik */}
      <section className="py-16">
        <MaxWidthWrapper>
          <ManualClient manuals={manuals} categories={categories} />
        </MaxWidthWrapper>
      </section>
    </div>
  )
}

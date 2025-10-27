"use client"

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ArrowLeft, Download, Calendar, FileText } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// PDF Flipbook Viewer'ı dynamic import ile yükle (sadece client-side)
const PdfFlipbookViewer = dynamic(() => import('@/components/PdfFlipbookViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">PDF flipbook yükleniyor...</p>
    </div>
  ),
})

interface Catalog {
  id: string
  title: string
  description: string
  category: {
    id: string
    name: string
    color: string
  }
  fileType: string
  fileSize: string
  imageUrl?: string
  pages?: number
  language: string
  version?: string
  publishDate: string
  downloadCount: number
  featured: boolean
  fileUrl?: string
  fileData?: string
  heyzineUrl?: string
}

export default function KatalogDetayPage() {
  const params = useParams()
  const [catalog, setCatalog] = useState<Catalog | null>(null)
  const [loading, setLoading] = useState(true)
  const [pdfUrl, setPdfUrl] = useState<string>('')

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const id = params.id as string
        
        // Katalog bilgilerini al
        const catalogRes = await fetch(`/api/catalogs/${id}`, { cache: 'no-store' })
        if (catalogRes.ok) {
          const catalogData = await catalogRes.json()
          
          // PDF'yi al
          const pdfRes = await fetch(`/api/catalogs/${id}/download`, { 
            method: 'GET',
            cache: 'no-store' 
          })
          
          if (pdfRes.ok) {
            const pdfData = await pdfRes.json()
            console.log('PDF Data:', pdfData)
            
            const url = pdfData.dataUrl || pdfData.fileUrl || ''
            console.log('PDF URL:', url)
            
            // TEST: Heyzine URL'si - Geçici
            setCatalog({
              ...catalogData,
              fileUrl: url,
              heyzineUrl: 'https://heyzine.com/flip-book/17a7e63991.html'
            })
            setPdfUrl(url)
          } else {
            // TEST: Heyzine URL'si - Geçici
            setCatalog({
              ...catalogData,
              heyzineUrl: 'https://heyzine.com/flip-book/17a7e63991.html'
            })
          }
        }
      } catch (error) {
        console.error('Katalog yükleme hatası:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadCatalog()
  }, [params.id])


  const downloadPdf = async () => {
    if (!catalog) return
    
    try {
      const response = await fetch(`/api/catalogs/${catalog.id}/download`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${catalog.title}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('İndirme hatası:', error)
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MaxWidthWrapper>
          <div className="py-12 max-w-4xl mx-auto">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-8" />
            <div className="aspect-[8/11] w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  if (!catalog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MaxWidthWrapper>
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Katalog Bulunamadı</h1>
            <Link href="/katalog-brosurler" className="text-blue-600 hover:text-blue-700">
              Kataloglar sayfasına dön
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Ana Sayfa</Link>
              <span className="text-gray-300">/</span>
              <Link href="/katalog-brosurler" className="text-gray-500 hover:text-gray-700">Katalog & Broşürler</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">{catalog.title}</span>
            </div>

            {/* Title and Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="font-neuropol text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {catalog.title}
                </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(catalog.publishDate).toLocaleDateString('tr-TR')}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {catalog.pages || 0} sayfa
                  </span>
                  <span>{catalog.fileSize}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href="/katalog-brosurler"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-gray-900 font-medium transition-colors border border-gray-200 hover:border-gray-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Geri
                </Link>
                <button
                  onClick={downloadPdf}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  İndir
                </button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* PDF Viewer */}
      <MaxWidthWrapper>
        <div className="py-8">
          {(pdfUrl || catalog.heyzineUrl) && (
            <PdfFlipbookViewer 
              pdfUrl={pdfUrl} 
              heyzineUrl={catalog.heyzineUrl}
            />
          )}

          {/* PDF URL Yoksa Uyarı */}
          {!pdfUrl && !catalog.heyzineUrl && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                PDF Görüntülenemiyor
              </h3>
              <p className="text-gray-600 mb-6">
                PDF dosyası mevcut değil veya yüklenemedi.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={downloadPdf}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  PDF'yi İndir
                </button>
                <Link
                  href="/katalog-brosurler"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-gray-900 font-medium transition-colors border border-gray-200 hover:border-gray-300"
                >
                  Kataloglar Sayfasına Dön
                </Link>
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>

    </div>
  )
}


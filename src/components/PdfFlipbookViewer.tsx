"use client"

import { useState, useEffect } from 'react'
import { Maximize2, X } from 'lucide-react'

interface PdfFlipbookViewerProps {
  pdfUrl?: string
  heyzineUrl?: string
}

export default function PdfFlipbookViewer({ pdfUrl, heyzineUrl }: PdfFlipbookViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [blobUrl, setBlobUrl] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Heyzine URL varsa direkt kullan
    if (heyzineUrl) {
      setLoading(false)
      return
    }

    // PDF URL işle
    if (!pdfUrl) {
      setLoading(false)
      return
    }

    if (pdfUrl.startsWith('data:')) {
      fetch(pdfUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob)
          setBlobUrl(url)
          setLoading(false)
        })
        .catch(err => {
          console.error('PDF blob oluşturma hatası:', err)
          setLoading(false)
        })
    } else {
      setBlobUrl(pdfUrl)
      setLoading(false)
    }

    return () => {
      if (blobUrl && blobUrl.startsWith('blob:')) {
        window.URL.revokeObjectURL(blobUrl)
      }
    }
  }, [pdfUrl, heyzineUrl])

  useEffect(() => {
    return () => {
      if (blobUrl && blobUrl.startsWith('blob:')) {
        window.URL.revokeObjectURL(blobUrl)
      }
    }
  }, [blobUrl])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Klavye kısayolları
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">PDF yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Controls */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 px-6 py-5 flex justify-end items-center shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-lg bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
              <span className="text-blue-300">📖</span> PDF Görüntüleyici
            </div>
            
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white backdrop-blur-sm border border-white/10"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* PDF Container - Flipbook Style */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100" style={{ minHeight: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px' }}>
          <div className="relative w-full max-w-4xl mx-auto p-8">
            <div 
              className="relative shadow-2xl transition-all duration-300 hover:shadow-3xl"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Book Shadow */}
              <div className="absolute inset-0 bg-gray-900/20 rounded-lg blur-2xl -z-10" 
                   style={{ transform: 'translateY(10px) scale(0.95)' }} />
              
              {/* PDF Container - Iframe with Flipbook Style */}
              <div 
                className="relative overflow-hidden rounded-lg border-8 border-white shadow-2xl"
                style={{
                  transform: 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(90deg, rgba(245,245,245,0.95) 0%, rgba(255,255,255,1) 50%, rgba(245,245,245,0.95) 100%)',
                  minHeight: '800px',
                }}
              >
                {heyzineUrl ? (
                  <iframe
                    allowFullScreen
                    allow="clipboard-write"
                    scrolling="no"
                    className="fp-iframe"
                    style={{
                      border: '1px solid lightgray',
                      width: '100%',
                      height: '800px',
                      display: 'block',
                      userSelect: 'none',
                    }}
                    src={heyzineUrl}
                  />
                ) : blobUrl ? (
                  <iframe
                    src={blobUrl}
                    className="w-full h-[800px] border-0"
                    title="PDF Viewer"
                    style={{ 
                      display: 'block',
                      userSelect: 'none',
                    }}
                  />
                ) : null}
                
                {/* Page Edge Highlight */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-l from-transparent via-white to-transparent opacity-20 pointer-events-none"></div>
              </div>
              
              {/* Flipbook Corner Decoration */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-300 rounded-tl-full opacity-30 transform rotate-45 pointer-events-none" style={{ boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-300 rounded-br-full opacity-30 transform rotate-45 pointer-events-none" style={{ boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}></div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💡 PDF içinde zoom ve sayfa geçiş özelliklerini kullanabilirsiniz
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-black/90 px-4 py-3 flex justify-end items-center">
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-gray-900 overflow-hidden">
              {heyzineUrl ? (
                <iframe
                  allowFullScreen
                  allow="clipboard-write"
                  scrolling="no"
                  className="fp-iframe"
                  style={{
                    border: '1px solid lightgray',
                    width: '100%',
                    height: '100%',
                  }}
                  src={heyzineUrl}
                />
              ) : blobUrl ? (
                <iframe
                  src={blobUrl}
                  className="w-full h-full border-0"
                  title="PDF Viewer"
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

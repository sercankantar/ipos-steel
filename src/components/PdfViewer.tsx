"use client"

import { useState, useEffect } from 'react'
import { Maximize2, X } from 'lucide-react'

interface PdfViewerProps {
  pdfUrl: string
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [blobUrl, setBlobUrl] = useState<string>('')

  useEffect(() => {
    if (!pdfUrl) return

    let newBlobUrl = ''

    // Eğer data URL ise blob URL'e çevir
    if (pdfUrl.startsWith('data:')) {
      fetch(pdfUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob)
          setBlobUrl(url)
        })
        .catch(err => console.error('PDF blob oluşturma hatası:', err))
    } else {
      // Normal URL ise direkt kullan
      setBlobUrl(pdfUrl)
    }

    // Cleanup
    return () => {
      if (newBlobUrl && newBlobUrl.startsWith('blob:')) {
        window.URL.revokeObjectURL(newBlobUrl)
      }
    }
  }, [pdfUrl])

  // Blob URL cleanup
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

  if (!blobUrl) {
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
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Container */}
        <div className="bg-gray-100" style={{ minHeight: '800px' }}>
          <iframe
            src={blobUrl}
            className="w-full h-[800px] border-0"
            title="PDF Viewer"
          />
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💡 PDF'de zoom ve sayfa geçiş özelliklerini kullanmak için PDF'in içindeki kontrolleri kullanın
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-black/90 px-4 py-3 flex justify-between items-center">
              <h3 className="text-white font-semibold">PDF Görüntüleyici</h3>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-gray-900">
              <iframe
                src={blobUrl}
                className="w-full h-full border-0"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}


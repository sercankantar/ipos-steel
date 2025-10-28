"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, BookOpen, Maximize2 } from 'lucide-react'

interface CanvasBookViewerProps {
  imagePrefix: string
  totalPages: number
  chapters?: { title: string; startPage: number }[]
}

export default function CanvasBookViewer({ 
  imagePrefix, 
  totalPages,
  chapters = []
}: CanvasBookViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Sayfa numaralarını hesapla
  // İlk sayfa tek gösterilir (kapak), sonrası çift
  const leftPage = currentPage === 1 ? 1 : currentPage
  const rightPage = currentPage === 1 ? 0 : currentPage + 1

  // İki kanvas oluştur (sol ve sağ sayfa)
  const leftCanvasRef = useRef<HTMLCanvasElement>(null)
  const rightCanvasRef = useRef<HTMLCanvasElement>(null)

  // Tüm resimleri yükle
  useEffect(() => {
    const loadImages = async () => {
      const promises = []
      for (let i = 1; i <= totalPages; i++) {
        const img = new Image()
        img.src = `/katalog-foto/${imagePrefix}_page-${String(i).padStart(4, '0')}.jpg`
        const promise = new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
        })
        imagesRef.current[i] = img
        promises.push(promise)
      }
      try {
        await Promise.all(promises)
        setImagesLoaded(true)
      } catch (error) {
        console.error('Resim yükleme hatası:', error)
      }
    }
    
    loadImages()
  }, [imagePrefix, totalPages])

  // Canvas'ları çiz
  useEffect(() => {
    if (!imagesLoaded) return

    const drawPage = (canvas: HTMLCanvasElement | null, pageNum: number) => {
      if (!canvas) return

      const img = imagesRef.current[pageNum]
      if (!img) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Canvas boyutlarını ayarla
      const displayWidth = 500
      const displayHeight = 650
      
      // Retina display desteği
      const scale = window.devicePixelRatio || 1
      canvas.width = displayWidth * scale
      canvas.height = displayHeight * scale
      
      canvas.style.width = displayWidth + 'px'
      canvas.style.height = displayHeight + 'px'

      ctx.scale(scale, scale)

      // Arka plan - sayfa beyazı
      ctx.fillStyle = '#fefefe'
      ctx.fillRect(0, 0, displayWidth, displayHeight)
      
      // Hafif gölge efekti (kenar)
      const gradient = ctx.createLinearGradient(0, 0, displayWidth, 0)
      gradient.addColorStop(0, 'rgba(0,0,0,0.03)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, displayWidth, displayHeight)
      
      // Resmi boyutlandır ve çiz - tam sayfa doldur
      ctx.drawImage(img, 0, 0, displayWidth, displayHeight)
    }

    // Sol ve sağ sayfaları çiz
    drawPage(leftCanvasRef.current, leftPage)
    drawPage(rightCanvasRef.current, rightPage)
  }, [imagesLoaded, leftPage, rightPage])

  // Klavye ile sayfa değiştirme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevPage()
      if (e.key === 'ArrowRight') goToNextPage()
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, isFullscreen])

  const goToNextPage = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      if (currentPage === 1) {
        // İlk sayfadan ikinci sayfaya geç (tek -> çift)
        setCurrentPage(2)
      } else if (currentPage + 2 > totalPages) {
        // Son sayfaya geç
        setCurrentPage(totalPages)
      } else {
        // İkili sayfalara geç
        setCurrentPage(currentPage + 2)
      }
      setIsTransitioning(false)
    }, 300)
  }

  const goToPrevPage = () => {
    if (isTransitioning || currentPage <= 1) return
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      if (currentPage === 2) {
        // Kapak sayfasına dön
        setCurrentPage(1)
      } else if (currentPage <= 4) {
        // Kapak sayfasına dön
        setCurrentPage(1)
      } else {
        // İki sayfa geri git
        setCurrentPage(currentPage - 2)
      }
      setIsTransitioning(false)
    }, 300)
  }

  const goToPage = (page: number) => {
    if (isTransitioning || page < 1 || page > totalPages) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header - Controls */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 px-6 py-5 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-lg bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
              <span className="text-blue-300">📖</span> E-Katalog
            </div>
            <div className="text-white/70 text-sm">
              Sayfa {currentPage} - {rightPage > totalPages ? totalPages : rightPage} / {totalPages}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1 || isTransitioning}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white backdrop-blur-sm border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={rightPage >= totalPages || isTransitioning}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white backdrop-blur-sm border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white backdrop-blur-sm border border-white/10"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="flex bg-gradient-to-br from-amber-50 via-gray-100 to-amber-50" style={{ minHeight: '900px' }}>
          {/* Sol Sütun - İçindekiler */}
          <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 p-6 overflow-y-auto" style={{ maxHeight: '900px' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              İçindekiler
            </h2>
            
            <div className="space-y-2">
              {chapters.length > 0 ? (
                chapters.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(chapter.startPage)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium border-l-4 ${
                      currentPage === chapter.startPage 
                        ? 'bg-blue-100 text-blue-700 border-blue-600 font-semibold' 
                        : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'
                    }`}
                  >
                    {chapter.title}
                  </button>
                ))
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => goToPage(1)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium border-l-4 ${
                      currentPage === 1 
                        ? 'bg-blue-100 text-blue-700 border-blue-600 font-semibold' 
                        : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'
                    }`}
                  >
                    Kapak
                  </button>
                  <button
                    onClick={() => goToPage(2)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium border-l-4 ${
                      currentPage === 2 
                        ? 'bg-blue-100 text-blue-700 border-blue-600 font-semibold' 
                        : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'
                    }`}
                  >
                    Bölüm 1
                  </button>
                  <button
                    onClick={() => goToPage(3)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium border-l-4 ${
                      currentPage === 3 
                        ? 'bg-blue-100 text-blue-700 border-blue-600 font-semibold' 
                        : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'
                    }`}
                  >
                    Bölüm 2
                  </button>
                  <button
                    onClick={() => goToPage(4)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium border-l-4 ${
                      currentPage === 4 
                        ? 'bg-blue-100 text-blue-700 border-blue-600 font-semibold' 
                        : 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600'
                    }`}
                  >
                    Bölüm 3
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Orta ve Sağ Sütun - Kitap Sayfaları */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div 
              className={`relative flex gap-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
              style={{ perspective: '2000px' }}
            >
              {/* Sol Sayfa */}
              <div 
                className="relative transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(5deg)'
                }}
              >
                {leftPage <= totalPages && leftPage > 0 ? (
                  <div 
                    className="relative overflow-hidden"
                    style={{
                      boxShadow: '0 30px 80px rgba(0,0,0,0.3), inset -5px 0 15px rgba(0,0,0,0.1)',
                      borderRadius: '8px'
                    }}
                  >
                    <canvas
                      ref={leftCanvasRef}
                      className="block"
                    />
                    {/* Sayfa kenarı efekti */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent pointer-events-none"></div>
                  </div>
                ) : (
                  <div 
                    className="w-[500px] h-[650px] bg-gradient-to-br from-gray-50 to-white flex items-center justify-center"
                    style={{
                      boxShadow: '0 30px 80px rgba(0,0,0,0.3), inset -5px 0 15px rgba(0,0,0,0.1)',
                      borderRadius: '8px'
                    }}
                  >
                    <div className="text-gray-400 text-center">
                      <p className="text-sm">Boş Sayfa</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sağ Sayfa */}
              {rightPage > 0 && (
                <div 
                  className="relative transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateY(-5deg)'
                  }}
                >
                  {rightPage <= totalPages ? (
                    <div 
                      className="relative overflow-hidden"
                      style={{
                        boxShadow: '0 30px 80px rgba(0,0,0,0.3), inset 5px 0 15px rgba(0,0,0,0.1)',
                        borderRadius: '8px'
                      }}
                    >
                      <canvas
                        ref={rightCanvasRef}
                        className="block"
                      />
                      {/* Sayfa kenarı efekti */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent pointer-events-none"></div>
                    </div>
                  ) : (
                    <div 
                      className="w-[500px] h-[650px] bg-gradient-to-br from-gray-50 to-white flex items-center justify-center"
                      style={{
                        boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
                        borderRadius: '8px'
                      }}
                    >
                      <div className="text-gray-400 text-center">
                        <p className="text-sm">Katalog Bitti</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💡 Sayfa çevirmek için ok tuşlarını (← →) veya içindekiler bölümünü kullanın
          </p>
        </div>
      </div>

      {/* Fullscreen Modal - Basit toggle */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="text-white mb-4 absolute top-4 left-1/2 transform -translate-x-1/2">
            {currentPage} / {totalPages} - ESC ile çık
          </div>
        </div>
      )}
    </>
  )
}


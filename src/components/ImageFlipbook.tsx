"use client"

import { useMemo } from 'react'
import dynamic from 'next/dynamic'

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false }) as any

interface ImageFlipbookProps {
  imagePrefix: string
  totalPages: number
  className?: string
}

export default function ImageFlipbook({ imagePrefix, totalPages, className }: ImageFlipbookProps) {
  const pages = useMemo(() => {
    const list: string[] = []
    for (let i = 1; i <= totalPages; i++) {
      const src = `/katalog-foto/${imagePrefix}_page-${String(i).padStart(4, '0')}.jpg`
      list.push(src)
    }
    return list
  }, [imagePrefix, totalPages])

  return (
    <div className={className}>
      <div className="w-full flex items-center justify-center">
        <HTMLFlipBook
          width={410}
          height={690}
          size="stretch"
          minWidth={280}
          maxWidth={1200}
          minHeight={300}
          maxHeight={900}
          mobileScrollSupport={true}
          style={{ 
            transition: 'all 0s ease', 
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            width: '100%',
            maxWidth: 900,
            aspectRatio: '410/690'
          }}
          maxShadowOpacity={0.2}
          drawShadow={false}
          showCover={false}
          usePortrait={true}
          autoSize={true}
          className="shadow-sm"
        >
          {pages.map((src, idx) => (
            <div key={idx} className="relative select-none bg-white">
              <img
                src={src}
                alt={`Sayfa ${idx + 1}`}
                className="block w-full h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  )
}



'use client'

import { useScrollToTop } from '@/hooks/use-scroll-to-top'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const ScrollToTopButton = () => {
  const { isVisible, scrollToTop } = useScrollToTop()

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'bg-blue-600 hover:bg-blue-700 text-white',
        'w-12 h-12 rounded-lg',
        'flex items-center justify-center',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300 ease-in-out',
        'transform hover:scale-105 active:scale-95',
        'lg:hidden' // Sadece mobil görünümde göster
      )}
      aria-label="Sayfanın başına git"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}

export default ScrollToTopButton

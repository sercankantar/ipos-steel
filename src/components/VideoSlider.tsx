"use client"

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type SwiperType from 'swiper'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

type VideoSlide = {
  src: string
  title: string
  description: string
  href: string
}

interface VideoSliderProps {
  slides: VideoSlide[]
}

const VideoSlider = ({ slides }: VideoSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (slides.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (slides.length ?? 0) - 1,
      })
    })
  }, [swiper, slides])

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-10 w-10 z-50 place-items-center rounded-full border bg-white/90 border-zinc-300 shadow'
  const inactiveStyles = 'hidden text-gray-400'

  return (
    <div className='group relative overflow-hidden p-2'>
      {/* Arrows */}
      <div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext()
          }}
          className={cn(activeStyles, 'right-3 transition', {
            [inactiveStyles]: slideConfig.isEnd,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isEnd,
          })}
          aria-label='next video'>
          <ChevronRight className='h-5 w-5 text-zinc-700' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isBeginning,
          })}
          aria-label='previous video'>
          <ChevronLeft className='h-5 w-5 text-zinc-700' />
        </button>
      </div>

      <Swiper onSwiper={(s) => setSwiper(s)} slidesPerView={1} className='h-[420px] w-full sm:h-[520px]'>
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className='relative h-full w-full'>
            {/* Video */}
            <video
              className='h-full w-full object-cover'
              src={slide.src}
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-black/50' />

            {/* Content overlay */}
            <div className='absolute inset-0 flex items-center'>
              <div className='px-6 sm:px-10 md:px-16 max-w-3xl'>
                <h2 className='text-white text-3xl sm:text-5xl font-bold tracking-tight'>
                  {slide.title}
                </h2>
                <p className='mt-4 text-white/90 text-base sm:text-lg'>
                  {slide.description}
                </p>
                <div className='mt-6'>
                  <Link href={slide.href} className={buttonVariants()}>
                    İncele
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default VideoSlider



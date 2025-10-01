'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function AdminLoading() {
  return (
    <div className='min-h-[50vh] flex items-center justify-center'>
      <MaxWidthWrapper>
        <div className='flex items-center justify-center gap-3 text-gray-600'>
          <div className='h-3 w-3 rounded-full bg-gray-300 animate-bounce [animation-delay:-0.2s]'></div>
          <div className='h-3 w-3 rounded-full bg-gray-300 animate-bounce [animation-delay:-0.1s]'></div>
          <div className='h-3 w-3 rounded-full bg-gray-300 animate-bounce'></div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}



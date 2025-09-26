import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    //md md:px-20ydi
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-2',
        className
      )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper

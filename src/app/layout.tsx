import Navbar from '@/components/Navbar'
import { cn, constructMetadata } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import Footer from '@/components/Footer'
import SiteChrome from '@/components/SiteChrome'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={cn(
          'relative h-full font-neuropol antialiased',
          inter.className,
          inter.variable
        )}>
        <main className='relative flex flex-col min-h-screen'>
          <SiteChrome>
            {children}
          </SiteChrome>
        </main>

        <Toaster position='top-center' richColors />
      </body>
    </html>
  )
}

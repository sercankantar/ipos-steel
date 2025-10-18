import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import KvkkAydinlatmaMetniClient from './KvkkAydinlatmaMetniClient'

async function getDisclosureText() {
  try {
    const disclosureText = await prisma.kvkkDisclosureText.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })

    return disclosureText
  } catch (error) {
    console.error('KVKK Aydınlatma Metni getirme hatası:', error)
    return null
  }
}

export default async function KVKKAydinlatmaMetni() {
  const disclosureText = await getDisclosureText()

  if (!disclosureText) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>KVKK Aydınlatma Metni Bulunamadı</h1>
          <p className='text-gray-600'>Lütfen daha sonra tekrar deneyiniz.</p>
        </div>
      </div>
    )
  }

  return <KvkkAydinlatmaMetniClient disclosureText={disclosureText} />
}

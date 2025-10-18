import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.catalogPageSettings.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Catalog page settings getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

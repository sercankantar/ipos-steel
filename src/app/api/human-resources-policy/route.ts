import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const policy = await prisma.humanResourcesPolicy.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(policy, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('HR policy getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}



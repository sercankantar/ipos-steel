import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const policy = await prisma.humanResourcesPolicy.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(policy)
  } catch (error) {
    console.error('HR policy getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}



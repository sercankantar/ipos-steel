import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const missionVision = await prisma.missionVision.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(missionVision)
  } catch (error) {
    console.error('Misyon-vizyon getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

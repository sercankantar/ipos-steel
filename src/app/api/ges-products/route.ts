import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const gesProducts = await prisma.gesProduct.findMany({
      where: {
        isActive: true
      },
      include: { 
        category: true,
        catalog: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(gesProducts, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('GES ürünleri getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

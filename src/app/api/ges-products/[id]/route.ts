import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gesProduct = await prisma.gesProduct.findUnique({
      where: { 
        id: params.id,
        isActive: true
      },
      include: { 
        category: true,
        catalog: true
      }
    })

    if (!gesProduct) {
      return NextResponse.json({ error: 'GES ürünü bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(gesProduct, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('GES ürünü getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

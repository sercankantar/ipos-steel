import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        description: true,
        series: true,
        material: true,
        coatingType: true,
        thickness: true,
        width: true,
        height: true,
        imageUrl: true,
        generalInfo: true,
        technicalInfo: true,
        category: {
          select: {
            id: true,
            name: true
          }
        },
        catalog: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true
          }
        },
        images: {
          select: {
            id: true,
            imageUrl: true,
            order: true
          },
          orderBy: { order: 'asc' }
        }
      },
    })
    if (!product) return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    return NextResponse.json(product, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}



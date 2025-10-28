import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get('category') || undefined

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(categorySlug ? { category: { slug: categorySlug, isActive: true } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: { 
        category: true,
        images: {
          select: {
            id: true,
            imageUrl: true,
            imagePublicId: true,
            order: true
          },
          orderBy: { order: 'asc' }
        }
      },
    })

    return NextResponse.json(products, {
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



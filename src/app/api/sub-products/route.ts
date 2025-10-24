import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: 'Ürün ID gerekli' },
        { status: 400 }
      )
    }

    const subProducts = await prisma.subProduct.findMany({
      where: {
        productId: productId,
        isActive: true
      },
      include: {
        product: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(subProducts)
  } catch (error) {
    console.error('Alt ürünler yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Alt ürünler yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}
